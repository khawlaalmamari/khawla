import { prisma } from "@/lib/db";
import type { CaseCategory, CaseDifficulty, ConversationRole } from "@prisma/client";
import type {
  AssessmentType,
  Bilingual,
  ClinicalReasoningResponse,
  ConversationMessageDTO,
  DebriefReflection,
  HiddenCaseData,
  InterviewSummary,
  QuestionCategory,
  VisibleCaseData,
} from "./types";
import { ASSESSMENT_TYPES, QUESTION_CATEGORIES } from "./types";
import {
  ASSESSMENT_ACTION_LABELS,
  buildAssessmentResult,
  getAvailableAssessments,
  getDecisionExplanation,
  getDecisionInsight,
  isAssessmentSupported,
  isDecisionCategory,
  nextEmotionalState,
} from "./patient-engine";
import { getDecisionPointSummaries } from "./decision-points";
import { resolvePatientReply } from "./ai-patient";
import { getReflectionGuidance } from "./reflection-coach";

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
  // Phase 2E — the student's own saved post-attempt reflection, if any.
  reflection: DebriefReflection | null;
  // Phase 3F — a small, non-scoring educational note per answered decision
  // point (keyed by decision id), naming the clinical-thinking skill that
  // choice practiced. Only populated once the student has also saved
  // their Clinical Reasoning notes for this attempt (see
  // buildDecisionInsights) — never sent before that, so it can't be used
  // to skip straight to "the answer" without reasoning first.
  decisionInsights: Record<string, Bilingual>;
};

/**
 * Phase 3G-4 — the single rule for picking which of a student's (possibly
 * several) attempts at something represents their current standing: a
 * completed attempt if any exists (most recently completed first),
 * otherwise their most recently started in-progress one, otherwise none.
 * ABANDONED attempts are never picked (an honest "didn't finish" rather
 * than invented partial credit) — this is the exact selection rule
 * getLearningJourney already used for its single cross-case "primary"
 * attempt; extracted here so the new per-case Dashboard breakdown (same
 * file, see getLearningJourney in lib/dashboard/queries.ts) applies it
 * identically instead of redefining it.
 */
export function pickRepresentativeAttempt<
  T extends { status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED"; startedAt: Date; completedAt: Date | null },
>(attempts: T[]): T | null {
  const completed = attempts
    .filter((a) => a.status === "COMPLETED")
    .sort((a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0));
  if (completed.length > 0) return completed[0];
  const inProgress = attempts
    .filter((a) => a.status === "IN_PROGRESS")
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  return inProgress[0] ?? null;
}

/** Phase 3G-4 — a single Clinical Case's progress for one student, derived
 * entirely from their existing ClinicalCaseAttempt data (see
 * pickRepresentativeAttempt above) — no new persistence. REASONING_COMPLETED
 * sits between IN_PROGRESS and COMPLETED: the student has saved Clinical
 * Reasoning notes but hasn't ended the interview yet. */
export type ClinicalCaseProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "REASONING_COMPLETED" | "COMPLETED";

export type ClinicalCaseProgressSummary = {
  slug: string;
  titleEn: string;
  titleAr: string;
  status: ClinicalCaseProgressStatus;
  /** True once a Learning Insight (Phase 3F) has actually been earned for
   * this case's representative attempt — never sent to the client before
   * that, mirroring decisionInsights above. */
  learningInsightUnlocked: boolean;
  /** The representative attempt's id, for a direct "continue" link — null
   * only when status is NOT_STARTED. */
  attemptId: string | null;
};

/**
 * Phase 3F — recovers which option a student chose at a decision point
 * from the STUDENT turn's own persisted text (recordClinicalDecision
 * never stores the option id itself, only its bilingual label — see
 * Phase 3E). Matching against both locales means this works regardless
 * of which language was active when the choice was made.
 */
function findChosenOptionId(
  point: ReturnType<typeof getDecisionPointSummaries>[number],
  studentMessage: string,
): string | null {
  return point.options.find((o) => o.label.en === studentMessage || o.label.ar === studentMessage)?.id ?? null;
}

/**
 * Phase 3F — computes the Learning Insight for every decision point in
 * this case that the student has both answered AND (per hasReasoning)
 * saved Clinical Reasoning notes for. Returns {} before that — this is
 * the one gate that decides whether insight text reaches the client at
 * all, so it must be applied here, not left to the UI to hide.
 */
function buildDecisionInsights(
  caseSlug: string,
  messages: { role: ConversationRole; category: string | null; message: string }[],
  hasReasoning: boolean,
): Record<string, Bilingual> {
  if (!hasReasoning) return {};
  const insights: Record<string, Bilingual> = {};
  for (const point of getDecisionPointSummaries(caseSlug)) {
    const studentMsg = messages.find((m) => m.role === "STUDENT" && m.category === point.id);
    if (!studentMsg) continue;
    const optionId = findChosenOptionId(point, studentMsg.message);
    if (!optionId) continue;
    const insight = getDecisionInsight(point.id, optionId);
    if (insight) insights[point.id] = insight;
  }
  return insights;
}

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
    reflection: attempt.interactionLogJson
      ? (JSON.parse(attempt.interactionLogJson) as DebriefReflection)
      : null,
    decisionInsights: buildDecisionInsights(attempt.case.slug, attempt.messages, attempt.finalDecisionJson !== null),
  };
}

/**
 * Phase 3F — recomputes decisionInsights right after a successful
 * saveClinicalReasoning call, so the client can reveal Learning Insight
 * immediately without waiting for a full page reload. Independently
 * re-checks ownership via the userId filter (Step 14: never trusts that
 * the caller already validated this attempt belongs to the session user).
 */
export async function getDecisionInsightsForAttempt(
  attemptId: string,
  userId: string,
): Promise<Record<string, Bilingual>> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId },
    include: { case: true, messages: true },
  });
  if (!attempt) return {};
  return buildDecisionInsights(attempt.case.slug, attempt.messages, attempt.finalDecisionJson !== null);
}

/**
 * Classifies the student's question and resolves the patient's reply (see
 * resolvePatientReply in ai-patient.ts — AI-phrased when configured, else
 * the deterministic engine in patient-engine.ts), persists both turns, and
 * nudges the attempt's emotional state. Ownership-checked via the userId
 * filter on the initial lookup; returns null for a nonexistent/foreign/
 * already-ended attempt.
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

  const { category, text: patientText } = await resolvePatientReply(
    visibleData,
    hiddenData,
    studentText,
    locale,
    attempt.emotionalState,
  );
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

  const priorVitalSignsChecks =
    type === "VITAL_SIGNS"
      ? await prisma.clinicalCaseConversationMessage.count({
          where: { attemptId, role: "SYSTEM", category: "VITAL_SIGNS" },
        })
      : 0;
  const resultText = buildAssessmentResult(hiddenData, type, locale, priorVitalSignsChecks);
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

/**
 * Phase 3E — records the student's choice at a bounded branching decision
 * point (Step "Choose next action" -> "Receive clinical explanation") as
 * an ordinary STUDENT/SYSTEM turn pair in the existing conversation-
 * message table — the exact same persistence and shape as
 * requestAssessment above, with a decision-point id in place of an
 * AssessmentType. No new Prisma model or field.
 *
 * Enforces, in order (Step 14): authenticated user (caller's job, via
 * userId), attempt exists + belongs to this user + is active, this case
 * actually defines the given decision point, that its trigger assessment
 * has genuinely been performed in THIS attempt (never trusts the
 * client's own gating of which buttons it chose to show), the option
 * exists, and the decision hasn't already been answered (Step "bounded":
 * once made, a decision is permanent — it isn't re-explorable the way a
 * Nursing Lab drill is, matching how the rest of this interview's record
 * is a permanent transcript, not a scratchpad).
 */
export async function recordClinicalDecision(
  attemptId: string,
  userId: string,
  decisionId: string,
  optionId: string,
  locale: "ar" | "en",
): Promise<
  | { error: "notFound" }
  | { error: "notSupported" }
  | { error: "alreadyAnswered" }
  | { studentMessage: ConversationMessageDTO; resultMessage: ConversationMessageDTO }
> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    include: { case: true, messages: true },
  });
  if (!attempt) return { error: "notFound" };

  const point = getDecisionPointSummaries(attempt.case.slug).find((p) => p.id === decisionId);
  if (!point) return { error: "notSupported" };

  const performedAssessments = new Set(
    attempt.messages
      .filter((m) => m.role === "SYSTEM" && m.category && (ASSESSMENT_TYPES as readonly string[]).includes(m.category))
      .map((m) => m.category as AssessmentType),
  );
  if (!performedAssessments.has(point.triggerAssessment)) return { error: "notSupported" };

  if (attempt.messages.some((m) => m.category === decisionId)) return { error: "alreadyAnswered" };

  const option = point.options.find((o) => o.id === optionId);
  if (!option) return { error: "notSupported" };

  const explanation = getDecisionExplanation(decisionId, optionId);
  if (!explanation) return { error: "notSupported" };

  const studentText = locale === "ar" ? option.label.ar : option.label.en;
  const resultText = locale === "ar" ? explanation.ar : explanation.en;
  const priorCount = attempt.messages.length;

  const [studentMessage, resultMessage] = await prisma.$transaction([
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "STUDENT", message: studentText, category: decisionId, sequence: priorCount + 1 },
    }),
    prisma.clinicalCaseConversationMessage.create({
      data: { attemptId, role: "SYSTEM", message: resultText, category: decisionId, sequence: priorCount + 2 },
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

/**
 * Phase 2E — saves the student's post-attempt reflection (Step 6/7).
 * Unlike saveClinicalReasoning, this only succeeds once the attempt is
 * COMPLETED (Step 3: the debrief is a post-attempt feature) — ownership
 * and that state check are enforced together by the updateMany filter.
 */
export async function saveDebriefReflection(
  attemptId: string,
  userId: string,
  data: Omit<DebriefReflection, "updatedAt">,
): Promise<boolean> {
  const reflection: DebriefReflection = { ...data, updatedAt: new Date().toISOString() };
  const result = await prisma.clinicalCaseAttempt.updateMany({
    where: { id: attemptId, userId, status: "COMPLETED" },
    data: { interactionLogJson: JSON.stringify(reflection) },
  });
  return result.count > 0;
}

/**
 * Non-evaluative feedback on a student's already-saved reflection (must
 * call saveDebriefReflection first — returns null if nothing's saved yet).
 * Always returns this case's own expert-authored debriefing (hiddenData.
 * debriefing — deterministic, never previously surfaced to students) plus,
 * when AI_PROVIDER_API_KEY is configured, AI-guided feedback grounded only
 * in that debriefing and the student's own words (see reflection-coach.ts).
 * Never a correct/incorrect verdict — this only helps a student compare
 * their own thinking against the expert summary.
 */
export async function getReflectionFeedback(
  attemptId: string,
  userId: string,
  locale: "ar" | "en",
): Promise<{ expertDebriefing: string; aiGuidance: string | null } | null> {
  const attempt = await prisma.clinicalCaseAttempt.findFirst({
    where: { id: attemptId, userId, status: "COMPLETED" },
    include: { case: true },
  });
  if (!attempt || !attempt.interactionLogJson) return null;

  const reflection = JSON.parse(attempt.interactionLogJson) as DebriefReflection;
  const hiddenData = JSON.parse(attempt.case.hiddenDataJson) as HiddenCaseData;
  const expertDebriefing = locale === "ar" ? hiddenData.debriefing.ar : hiddenData.debriefing.en;

  const { guidance } = await getReflectionGuidance(reflection, expertDebriefing);
  return { expertDebriefing, aiGuidance: guidance ?? null };
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
    // Phase 3E reuses this same message table for decision-point turns
    // (role STUDENT/SYSTEM, category a decision-point id) — keep those
    // out of both questionsAsked and assessmentsPerformed, the same way
    // assessment categories are already kept out of questionsAsked below.
    if (isDecisionCategory(m.category)) continue;
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
