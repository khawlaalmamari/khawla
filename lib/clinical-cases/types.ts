// Shapes for ClinicalCase.visibleDataJson / hiddenDataJson and
// ClinicalCaseAttempt.finalDecisionJson (the student's Phase 2D clinical-
// reasoning notes) / interactionLogJson (the student's Phase 2E post-
// attempt reflection). All patient content is fictional and educational
// — see prisma/content/clinical-cases.js.

export type Bilingual = { en: string; ar: string };

export type InitialEmotionalState = "CALM" | "ANXIOUS" | "UNCOMFORTABLE";

/** Safe to show a student before/at case start. */
export type VisibleCaseData = {
  patientProfile: {
    age: number;
    gender: "male" | "female";
    setting: Bilingual; // e.g. "Emergency department"
    // Phase 2B — Virtual Patient persona (Step 3). Kept inside the same
    // visible JSON blob rather than new columns, since it's exactly the
    // kind of flexible, display-only content that blob already holds.
    name: Bilingual;
    personality: Bilingual; // short descriptor, e.g. "Cooperative but worried"
    communicationStyle: Bilingual; // e.g. "Direct, short answers"
    initialEmotionalState: InitialEmotionalState;
  };
  chiefComplaint: Bilingual;
  presentingSymptoms: Bilingual[];
  learningObjectives: Bilingual[];
};

/**
 * Phase 2C — a case's exact vital-sign values. Lives in hiddenData (not
 * visible), because Step 3 requires them hidden until the student
 * explicitly requests them ("Measure Vital Signs"), unlike the
 * always-visible fields above. Always server-defined for a specific case
 * — never randomized, never client-supplied.
 */
export type VitalSigns = {
  temperatureCelsius: number;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  respiratoryRate: number;
  oxygenSaturation: number;
};

/**
 * The fixed set of physical-examination types the UI can offer (Step 6).
 * Which ones are actually offered for a given case is determined by which
 * keys that case's hiddenData.assessments.physicalExaminations defines —
 * not every case needs to support all of them.
 */
export const PHYSICAL_EXAM_TYPES = [
  "GENERAL_INSPECTION",
  "RESPIRATORY",
  "CARDIOVASCULAR",
  "PAIN",
  "PALPATION",
  "AUSCULTATION",
] as const;

export type PhysicalExamType = (typeof PHYSICAL_EXAM_TYPES)[number];

/** Vital signs plus every physical-exam type — one unified "request an
 * assessment" action set (Step 5/6 share one mechanism). */
export const ASSESSMENT_TYPES = ["VITAL_SIGNS", ...PHYSICAL_EXAM_TYPES] as const;

export type AssessmentType = (typeof ASSESSMENT_TYPES)[number];

/**
 * The fixed set of structured clinical-interview categories the
 * deterministic patient-response engine recognizes (Step 6). Not a
 * general-purpose NLP intent set — just enough to run the sample case's
 * scripted interview.
 */
export const QUESTION_CATEGORIES = [
  "CHIEF_COMPLAINT",
  "ONSET",
  "LOCATION",
  "DURATION",
  "CHARACTER",
  "SEVERITY",
  "TIMING",
  "AGGRAVATING_FACTORS",
  "RELIEVING_FACTORS",
  "ASSOCIATED_SYMPTOMS",
  "MEDICAL_HISTORY",
  "MEDICATION_HISTORY",
  "ALLERGIES",
  "FAMILY_HISTORY",
  "SOCIAL_HISTORY",
] as const;

export type QuestionCategory = (typeof QUESTION_CATEGORIES)[number];

/**
 * Server-only until a future simulation phase reveals it progressively.
 * Never send this to an unauthenticated or unauthorized client — see
 * lib/clinical-cases/queries.ts.
 */
export type HiddenCaseData = {
  medicalHistory: Bilingual[];
  medications: Bilingual[];
  allergies: Bilingual[];
  familyHistory: Bilingual[];
  socialHistory: Bilingual[];
  clinicalClues: Bilingual[];
  redFlags: Bilingual[];
  possibleDiagnoses: Bilingual[];
  expectedQuestions: Bilingual[];
  debriefing: Bilingual;
  // Phase 2B — scripted, in-character answers the deterministic patient
  // engine returns for a matched QuestionCategory (Step 4/5/6). Categories
  // with no entry here fall back to the engine's generic "not sure"
  // response rather than inventing an answer. Categories like
  // MEDICAL_HISTORY/MEDICATION_HISTORY/ALLERGIES/FAMILY_HISTORY/
  // SOCIAL_HISTORY are usually derived from the arrays above instead of
  // needing an entry here — see lib/clinical-cases/patient-engine.ts.
  interviewResponses: Partial<Record<QuestionCategory, Bilingual>>;
  // Phase 2C — Vital Signs + Physical Examination (Step 2/6/7). Findings
  // are plain observations, never a diagnosis or interpretation (Step 7).
  // vitalSigns/each exam entry is optional: only the ones a case defines
  // are "supported by the case" and offered to the student.
  assessments: {
    // A single fixed reading (most cases), or an authored array of readings
    // representing a short-interval trend (e.g. what "Reassess vital signs
    // shortly to check for a trend" — see decision-points.ts — is meant to
    // reveal). Each re-measurement in the same attempt advances to the next
    // reading; the last reading repeats after that. Always authored content,
    // never randomized or client-supplied — see patient-engine.ts.
    vitalSigns?: VitalSigns | VitalSigns[];
    physicalExaminations: Partial<Record<PhysicalExamType, Bilingual>>;
  };
};

/**
 * Phase 2E — the student's own post-attempt reflection (Step 5/6). Free
 * text and entirely student-authored, same non-evaluative spirit as
 * ClinicalReasoningResponse below — the server never scores or comments
 * on these. Persisted in the (previously unused)
 * ClinicalCaseAttempt.interactionLogJson column; only ever saved once the
 * attempt is COMPLETED (Step 3).
 */
export type DebriefReflection = {
  mostImportantFindings: string;
  additionalInformationWanted: string;
  whatToReassess: string;
  whatToDoDifferently: string;
  updatedAt: string;
};

/**
 * Phase 2D — the student's own structured clinical-reasoning notes,
 * organized from the evidence they personally discovered (interview
 * answers + assessment findings). Free-text and entirely student-authored
 * — the server never fills these in, scores them, or reveals whether they
 * match hiddenData.possibleDiagnoses. Persisted in the (previously
 * unused) ClinicalCaseAttempt.finalDecisionJson column.
 */
export type ClinicalReasoningResponse = {
  keyFindings: string;
  hypotheses: string;
  supportingEvidence: string;
  missingInformation: string;
  recommendedNextAction: string;
  updatedAt: string;
};

/** A single conversation or assessment turn as sent to the client — never
 * includes hiddenData, only what was actually said/found. A STUDENT/
 * PATIENT pair with a QuestionCategory is an interview turn (Phase 2B); a
 * STUDENT/SYSTEM pair with an AssessmentType is an assessment request
 * (Phase 2C) — see lib/clinical-cases/queries.ts. */
export type ConversationMessageDTO = {
  id: string;
  role: "STUDENT" | "PATIENT" | "SYSTEM";
  message: string;
  category: QuestionCategory | AssessmentType | null;
  sequence: number;
  createdAt: string;
};

/** Step 10 — shown when the student ends the interview. No scoring or
 * diagnosis correctness here; that's Phase 2D. */
export type InterviewSummary = {
  questionsAsked: number;
  informationDiscovered: QuestionCategory[];
  assessmentsPerformed: AssessmentType[];
  durationSeconds: number | null;
  completionStatus: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
};
