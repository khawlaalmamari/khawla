// Shapes for ClinicalCase.visibleDataJson / hiddenDataJson and
// ClinicalCaseAttempt.interactionLogJson / finalDecisionJson. All patient
// content is fictional and educational — see prisma/content/clinical-cases.js.

export type Bilingual = { en: string; ar: string };

/** Safe to show a student before/at case start. */
export type VisibleCaseData = {
  patientProfile: {
    age: number;
    gender: "male" | "female";
    setting: Bilingual; // e.g. "Emergency department"
  };
  chiefComplaint: Bilingual;
  presentingSymptoms: Bilingual[];
  baselineVitals: {
    heartRate: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    respiratoryRate: number;
    temperatureCelsius: number;
    oxygenSaturation: number;
  };
  learningObjectives: Bilingual[];
};

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
};

/** One logged event during a future simulation attempt. Shape is
 * intentionally loose (`data` is free-form) since no interaction UI
 * exists yet to constrain it. */
export type CaseInteractionEvent = {
  type: "question_asked" | "clue_discovered" | "assessment_requested" | "decision_made";
  at: string; // ISO timestamp
  data: unknown;
};

export type CaseFinalDecision = {
  diagnosis: string;
  reasoning: string;
  mistakes: string[];
  feedback: Bilingual;
};
