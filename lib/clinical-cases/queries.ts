import { prisma } from "@/lib/db";
import type { CaseCategory, CaseDifficulty, ConversationRole } from "@prisma/client";
import type {
  AssessmentType,
  ClinicalReasoningResponse,
  ConversationMessageDTO,
  HiddenCaseData,
  InterviewSummary,
  QuestionCategory,
  VisibleCaseData,
} from "./types";
import { ASSESSMENT_TYPES, QUESTION_CATEGORIES } from "./types";
import {
  ASSESSMENT_ACTION_LABELS,
  buildAssessmentResult,
  buildPatientResponse,
  classifyQuestion,
  getAvailableAssessments,
  isAssessmentSupported,
  nextEmotionalState,
} from "./patient-engine";

/** Listing-safe fields only — never includes hiddenDataJson. */
const metadataSelect = {
  id: true,
  slug: true,
  titleEn: true,
  titleAr: true,
  descriptionEn: true,
  descriptionAr: true,
  difficulty: true,
  category: true,
  order: true,
} as const;

export type CaseMetadata = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  difficulty: CaseDifficulty;
  category: CaseCategory;
  order: number;
};

/** Published case metadata, optionally filtered — for student-facing listings. */
export async function getPublishedCases(filter?: {
  difficulty?: CaseDifficulty;
  category?: CaseCategory;
}): Promise<CaseMetadata[]> {
  return prisma.clinicalCase.findMany({
    where: {
      isPublished: true,
      difficulty: filter?.difficulty,
      category: filter?.category,
    },
    select: metadataSelect,
    orderBy: { order: "asc" },
  });
}

export async function getCasesByDifficulty(difficulty: CaseDifficulty): Promise<CaseMetadata[]> {
  return getPublishedCases({ difficulty });
}

export async function getCasesByCategory(category: CaseCategory): Promise<CaseMetadata[]> {
  return getPublishedCases({ category });
}

/**
 * Metadata + visible case content for a student — never includes
 * hiddenDataJson. Returns null if the case doesn't exist or (for a
 * non-admin) isn't published, mirroring the quiz route's
 * `!mod.isPublished && user.role !== "admin"` check.
 */
export async function getCaseMetadataById(
  id: string,
  opts: { isAdmin: boolean },
): Promise<(CaseMetadata & { isPublished: boolean; visibleData: VisibleCaseData }) | null> {
  const found = await prisma.clinicalCase.findUnique({
    where: { id },
    select: { ...metadataSelect, isPublished: true, visibleDataJson: true },
  });
  if (!found) return null;
  if (!found.isPublished && !opts.isAdmin) return null;

  const { visibleDataJson, ...rest } = found;
  return { ...rest, visibleData: JSON.parse(visibleDataJson) as VisibleCaseData };
}

/** Same as getCaseMetadataById, but by slug — for the case-detail page route. */
export async function getCaseMetadataBySlug(
  slug: string,
  opts: { isAdmin: boolean },
): Promise<(CaseMetadata & { isPublished: boolean; visibleData: VisibleCaseData }) | null> {
  const found = await prisma.clinicalCase.findUnique({
    where: { slug },
    select: { ...metadataSelect, isPublished: true, visibleDataJson: true },
  });
  if (!found) return null;
  if (!found.isPublished && !opts.isAdmin) return null;

  const { visibleDataJson, ...rest } = found;
  return { ...rest, visibleData: JSON.parse(visibleDataJson) as VisibleCaseData };
}

/**
 * Full case row, including hiddenDataJson — for future authorized
 * simulation logic only. Callers must perform their own auth check before
 * calling this; it does not check publish state or role itself. Never
 * return this value (or hiddenData) directly from an API route to an
 * unauthenticated or unauthorized client.
 */
export async function getCaseForSimulation(id: string) {
  const found = await prisma.clinicalCase.findUnique({ where: { id } });
  if (!found) return null;

  return {
    ...found,
    visibleData: JSON.parse(found.visibleDataJson) as VisibleCaseData,
    hiddenData: JSON.parse(found.hiddenDataJson) as HiddenCaseData,
  };
}

// ---------------------------------------------------------------------
// Phase 2B — Virtual Patient Conversation
// ---------------------------------------------------------------------

function toMessageDTO(m: {
  id: string;
  role: ConversationRole;
  message: string;
  category: string | null;
  sequence: number;
  createdAt: Date;
}): ConversationMessageDTO {
  return {
    id: m.id,
    role: m.role,
    message: m.message,
    category: (m.category as QuestionCategory | AssessmentType | null) ?? null,
    sequence: m.sequence,
    createdAt: m.createdAt.toISOString(),
  };
}

export type AttemptView = {
  id: string;
  caseSlug: string;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  emotionalState: "CALM" | "ANXIOUS" | "UNCOMFORTABLE";
  notes: string | null;
  startedAt: string;
  completedAt: string | null;
  visibleData: VisibleCaseData;
  messages: ConversationMessageDTO[];
  // Phase 2C — which assessment buttons this case actually supports
  // (Step 6). Never includes the findings themselves, only which types
  // are askable — the values stay hidden until requested.
  availableAssessments: AssessmentType[];
  // Phase 2D — the student's own saved reasoning notes, if any. Purely
  // student-authored (see ClinicalReasoningResponse) — never derived from
  // or checked against hiddenData.
  reasoning: ClinicalReasoningResponse | null;
};

/**
 * Starts a new attempt for a published case, seeding the patient's
 * emotional state from the case's own persona data. Returns null if the
 * case doesn't exist or isn't published — never trusts a caller-provided
 * case id, only the slug looked up server-side.
 */
export async function startCaseAttempt(userId: string, slug: string) {
  const found = await prisma.clinicalCase.findUnique({ where: { slug } });
  if (!found || !found.isPublished) return null;

  const visibleData = JSON.parse(found.visibleDataJson) as VisibleCaseData;

  return prisma.clinicalCaseAttempt.create({
    data: {
      userId,
      caseId: found.id,
      emotionalState: visibleData.patientProfile.initialEmotionalState,
    },
  });
}

/**
 * Ownership-checked read of an attempt for the conversation UI — never
 * includes hiddenData. Returns null if the attempt doesn't exist or
 * doesn't belong to this user (Step 14: a student must never be able to
 * access another student's attempt), never distinguishing the two cases
 * in the response so existence can't be probed.
 */
export async function getAttemptView(attemptId: string, userId: string): Promise<AttemptView | null> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId },
    include: { case: true, messages: { orderBy: [{ sequence: "asc" }, { createdAt: "asc" }] } },
  });
  if (!attempt) return null;

  // hiddenDataJson is parsed only to compute which assessment buttons are
  // valid for this case (Step 6) — the parsed object itself, and its
  // findings, are never included in the returned AttemptView.
  const hiddenData = JSON.parse(attempt.case.hiddenDataJson) as HiddenCaseData;

  return {
    id: attempt.id,
    caseSlug: attempt.case.slug,
    status: attempt.status,
    emotionalState: attempt.emotionalState,
    notes: attempt.notes,
    startedAt: attempt.startedAt.toISOString(),
    completedAt: attempt.completedAt ? attempt.completedAt.toISOString() : null,
    visibleData: JSON.parse(attempt.case.visibleDataJson) as VisibleCaseData,
    messages: attempt.messages.map(toMessageDTO),
    availableAssessments: getAvailableAssessments(hiddenData),
    reasoning: attempt.finalDecisionJson
      ? (JSON.parse(attempt.finalDecisionJson) as ClinicalReasoningResponse)
      : null,
  };
}

/**
 * Classifies the student's question, generates the patient's deterministic
 * reply from the case's own data (see patient-engine.ts), persists both
 * turns, and nudges the attempt's emotional state. Ownership-checked via
 * the userId filter on the initial lookup; returns null for a
 * nonexistent/foreign/already-ended attempt.
 */
export async function addConversationTurn(
  attemptId: string,
  userId: string,
  studentText: string,
  locale: "ar" | "en",
) {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    include: { case: true },
  });
  if (!attempt) return null;

  const visibleData = JSON.parse(attempt.case.visibleDataJson) as VisibleCaseData;
  const hiddenData = JSON.parse(attempt.case.hiddenDataJson) as HiddenCaseData;

  const category = classifyQuestion(studentText);
  const responseBilingual = buildPatientResponse(visibleData, hiddenData, category);
  const patientText = locale === "ar" ? responseBilingual.ar : responseBilingual.en;
  const newEmotionalState = nextEmotionalState(attempt.emotionalState, category);

  const priorCount = await prisma.clinicalCaseConversationMessage.count({ where: { attemptId } });

  const [studentMessage, patientMessage] = await prisma.$transaction([
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "STUDENT", message: studentText, category, sequence: priorCount + 1 },
    }),
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "PATIENT", message: patientText, category, sequence: priorCount + 2 },
    }),
  ]);

  if (newEmotionalState !== attempt.emotionalState) {
    await prisma.clinicalCaseAttempt.update({
      where: { id: attemptId },
      data: { emotionalState: newEmotionalState },
    });
  }

  return {
    studentMessage: toMessageDTO(studentMessage),
    patientMessage: toMessageDTO(patientMessage),
    emotionalState: newEmotionalState,
  };
}

/**
 * Phase 2C — requests a vital-signs or physical-examination assessment.
 * Enforces, in order (Step 14): authenticated user (caller's job, via
 * userId), attempt exists + belongs to this user + is active (the
 * findFirst filter below), and the assessment type is supported by this
 * specific case's own data (isAssessmentSupported) — never assumed valid
 * just because it's a recognized enum value. The result text comes only
 * from the case's own hiddenData; nothing here is client-supplied,
 * AI-generated, or randomized.
 */
export async function requestAssessment(
  attemptId: string,
  userId: string,
  type: AssessmentType,
  locale: "ar" | "en",
): Promise<
  | { error: "notFound" }
  | { error: "notSupported" }
  | { studentMessage: ConversationMessageDTO; resultMessage: ConversationMessageDTO }
> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    include: { case: true },
  });
  if (!attempt) return { error: "notFound" };

  const hiddenData = JSON.parse(attempt.case.hiddenDataJson) as HiddenCaseData;
  if (!isAssessmentSupported(hiddenData, type)) return { error: "notSupported" };

  const resultText = buildAssessmentResult(hiddenData, type, locale);
  if (resultText === null) return { error: "notSupported" };

  const requestText = ASSESSMENT_ACTION_LABELS[type][locale];
  const priorCount = await prisma.clinicalCaseConversationMessage.count({ where: { attemptId } });

  const [studentMessage, resultMessage] = await prisma.$transaction([
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "STUDENT", message: requestText, category: type, sequence: priorCount + 1 },
    }),
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "SYSTEM", message: resultText, category: type, sequence: priorCount + 2 },
    }),
  ]);

  return {
    studentMessage: toMessageDTO(studentMessage),
    resultMessage: toMessageDTO(resultMessage),
  };
}

/** Ownership enforced via the userId filter in the update itself — a
 * foreign attemptId simply updates zero rows. */
export async function updateAttemptNotes(
  attemptId: string,
  userId: string,
  notes: string,
): Promise<boolean> {
  const result = await prisma.clinicalCaseAttempt.updateMany({
    where: { id: attemptId, userId },
    data: { notes },
  });
  return result.count > 0;
}

/**
 * Phase 2D — saves the student's structured reasoning notes. Ownership
 * and "not yet completed" are enforced atomically by the updateMany
 * filter (Step 10/12): a foreign, nonexistent, or already-completed
 * attempt simply matches zero rows and this returns false, with no way
 * for the caller to tell which of those it was.
 */
export async function saveClinicalReasoning(
  attemptId: string,
  userId: string,
  data: Omit<ClinicalReasoningResponse, "updatedAt">,
): Promise<boolean> {
  const reasoning: ClinicalReasoningResponse = { ...data, updatedAt: new Date().toISOString() };
  const result = await prisma.clinicalCaseAttempt.updateMany({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    data: { finalDecisionJson: JSON.stringify(reasoning) },
  });
  return result.count > 0;
}

export async function getInterviewSummary(
  attemptId: string,
  userId: string,
): Promise<InterviewSummary | null> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId },
    include: { messages: true },
  });
  if (!attempt) return null;

  const discovered = new Set<QuestionCategory>();
  const assessmentsPerformed = new Set<AssessmentType>();
  let questionsAsked = 0;
  for (const m of attempt.messages) {
    if (!m.category) continue;
    // Phase 2C reuses this same message table for assessment requests
    // (role SYSTEM, category an AssessmentType) — keep those out of the
    // Phase 2B interview-category count, and STUDENT-role assessment
    // "requests" out of questionsAsked, so this summary's existing
    // contract is unchanged for interview turns.
    if ((ASSESSMENT_TYPES as readonly string[]).includes(m.category)) {
      assessmentsPerformed.add(m.category as AssessmentType);
      continue;
    }
    if (m.role === "STUDENT") questionsAsked += 1;
    if ((QUESTION_CATEGORIES as readonly string[]).includes(m.category)) {
      discovered.add(m.category as QuestionCategory);
    }
  }

  const durationSeconds = attempt.completedAt
    ? Math.round((attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000)
    : null;

  return {
    questionsAsked,
    informationDiscovered: Array.from(discovered),
    assessmentsPerformed: Array.from(assessmentsPerformed),
    durationSeconds,
    completionStatus: attempt.status,
  };
}

/** Ends the interview (idempotent) and returns its summary. Ownership
 * enforced the same way as updateAttemptNotes. */
export async function endInterview(
  attemptId: string,
  userId: string,
): Promise<InterviewSummary | null> {
  await prisma.clinicalCaseAttempt.updateMany({
    where: { id: attemptId, userId, status: { not: "COMPLETED" } },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
  return getInterviewSummary(attemptId, userId);
}
