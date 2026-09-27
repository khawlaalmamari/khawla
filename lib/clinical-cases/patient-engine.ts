// Deterministic, offline patient-response engine (Step 4). No AI provider
// call of any kind — this must work identically whether or not
// AI_PROVIDER_API_KEY is set, and must never invent clinical information:
// every response is either a scripted line from the case's own
// hiddenData/visibleData, or the fixed "not sure" fallback below.

import type { AssessmentType, Bilingual, HiddenCaseData, QuestionCategory, VisibleCaseData } from "./types";
import { ASSESSMENT_TYPES, QUESTION_CATEGORIES } from "./types";
import { encodeVitalSigns } from "./assessment-format";

const NOT_SURE: Bilingual = {
  en: "I'm not sure about that.",
  ar: "لست متأكدًا من ذلك.",
};

// Simple, deterministic keyword matching per category (English + Arabic).
// Not a general-purpose NLP system (Step 6) — just enough to run a
// structured clinical interview against the sample case. Checked in this
// order, first match wins, so more specific categories are listed before
// more general ones that share a keyword.
const KEYWORDS: Record<QuestionCategory, string[]> = {
  SEVERITY: ["severe", "scale", "1 to 10", "how bad", "شدة", "شدته", "من 1 الى 10", "قوي"],
  AGGRAVATING_FACTORS: ["worse", "worsen", "aggravat", "trigger", "يزيد", "يسوء", "يشتد"],
  RELIEVING_FACTORS: ["better", "relieve", "help", "ease", "يخف", "يتحسن", "يهدئ", "راحة"],
  ONSET: ["when did", "start", "began", "onset", "متى بدأ", "بدأ", "منذ متى"],
  LOCATION: ["where", "location", "which part", "أين", "مكان", "موضع"],
  DURATION: ["how long", "duration", "still hurt", "كم من الوقت", "مدة", "لا يزال"],
  CHARACTER: ["what does it feel", "describe the pain", "type of pain", "كيف تشعر", "صف الألم", "طبيعة الألم"],
  TIMING: ["constant", "come and go", "all the time", "مستمر", "يجي ويروح", "متقطع"],
  ASSOCIATED_SYMPTOMS: ["other symptoms", "anything else", "along with", "أعراض أخرى", "أي شيء آخر"],
  MEDICAL_HISTORY: ["medical history", "any conditions", "diagnosed with", "تاريخ مرضي", "أمراض سابقة", "تشخيص"],
  MEDICATION_HISTORY: ["medication", "medicine", "taking any drugs", "دواء", "أدوية"],
  ALLERGIES: ["allerg", "حساسية"],
  FAMILY_HISTORY: ["family history", "father", "mother", "parents", "تاريخ عائلي", "الوالد", "الوالدة", "العائلة"],
  SOCIAL_HISTORY: ["smoke", "alcohol", "job", "occupation", "lifestyle", "تدخين", "كحول", "وظيفة", "نمط حياة"],
  CHIEF_COMPLAINT: ["what's wrong", "what brings you", "why are you here", "ما بك", "ما الذي أتى بك", "لماذا أنت هنا"],
};

/** Deterministic classifier: lowercases and substring-matches against the
 * keyword lists above. Returns null if nothing matches. */
export function classifyQuestion(text: string): QuestionCategory | null {
  const normalized = text.toLowerCase();
  for (const category of QUESTION_CATEGORIES) {
    if (KEYWORDS[category].some((kw) => normalized.includes(kw.toLowerCase()))) {
      return category;
    }
  }
  return null;
}

function joinBilingual(items: Bilingual[]): Bilingual | null {
  if (items.length === 0) return null;
  return {
    en: items.map((i) => i.en).join(" "),
    ar: items.map((i) => i.ar).join(" "),
  };
}

/**
 * Builds the patient's in-character answer for a matched category, using
 * ONLY the given case's own visible/hidden data. Never fabricates content
 * outside it — an unmatched or unscripted category returns the fixed
 * "not sure" line instead of guessing.
 */
export function buildPatientResponse(
  visibleData: VisibleCaseData,
  hiddenData: HiddenCaseData,
  category: QuestionCategory | null,
): Bilingual {
  if (!category) return NOT_SURE;

  const scripted = hiddenData.interviewResponses[category];
  if (scripted) return scripted;

  switch (category) {
    case "CHIEF_COMPLAINT":
      return visibleData.chiefComplaint;
    case "ASSOCIATED_SYMPTOMS":
      return joinBilingual(visibleData.presentingSymptoms) ?? NOT_SURE;
    case "MEDICAL_HISTORY":
      return joinBilingual(hiddenData.medicalHistory) ?? NOT_SURE;
    case "MEDICATION_HISTORY":
      return joinBilingual(hiddenData.medications) ?? NOT_SURE;
    case "ALLERGIES":
      return joinBilingual(hiddenData.allergies) ?? NOT_SURE;
    case "FAMILY_HISTORY":
      return joinBilingual(hiddenData.familyHistory) ?? NOT_SURE;
    case "SOCIAL_HISTORY":
      return joinBilingual(hiddenData.socialHistory) ?? NOT_SURE;
    default:
      return NOT_SURE;
  }
}

export type EmotionalState = "CALM" | "ANXIOUS" | "UNCOMFORTABLE";

// Lightweight, deterministic nudge (Step 7) — categories that touch on
// how bad/threatening things are read as mildly distressing to ask about;
// everything else leaves the current state alone. Intentionally simple:
// no decay/recovery logic, no personality modeling.
const DISTRESSING_CATEGORIES: ReadonlySet<QuestionCategory> = new Set([
  "SEVERITY",
  "AGGRAVATING_FACTORS",
]);

export function nextEmotionalState(
  current: EmotionalState,
  category: QuestionCategory | null,
): EmotionalState {
  if (category && DISTRESSING_CATEGORIES.has(category) && current === "CALM") {
    return "ANXIOUS";
  }
  return current;
}

// ---------------------------------------------------------------------
// Phase 2C — Vital Signs + Physical Examination (Step 4-8)
// ---------------------------------------------------------------------

// Fixed, generic action phrasing for the student's side of an assessment
// request (Step 8's example transcript pairs a "Student:" line with a
// "System:" result line, same as the interview turns above). Not
// case-specific — every case uses the same action wording; only the
// finding that follows is case-specific.
export const ASSESSMENT_ACTION_LABELS: Record<AssessmentType, Bilingual> = {
  VITAL_SIGNS: { en: "Please measure the vital signs.", ar: "من فضلك، قِس العلامات الحيوية." },
  GENERAL_INSPECTION: { en: "Let me perform a general inspection.", ar: "دعني أقوم بفحص عام للمريض." },
  RESPIRATORY: { en: "Let me perform a respiratory assessment.", ar: "دعني أقوم بتقييم الجهاز التنفسي." },
  CARDIOVASCULAR: { en: "Let me perform a cardiovascular assessment.", ar: "دعني أقوم بتقييم القلب والأوعية الدموية." },
  PAIN: { en: "Let me assess the pain.", ar: "دعني أقيّم الألم." },
  PALPATION: { en: "Let me palpate the area.", ar: "دعني أفحص المنطقة بالجس." },
  AUSCULTATION: { en: "Let me listen with a stethoscope.", ar: "دعني أستمع بواسطة السماعة الطبية." },
};

/** Step 6/14 — an assessment type is only "supported" if this specific
 * case's own hiddenData actually defines a result for it. Never assume
 * every case supports every type. */
export function isAssessmentSupported(hiddenData: HiddenCaseData, type: AssessmentType): boolean {
  if (type === "VITAL_SIGNS") return !!hiddenData.assessments.vitalSigns;
  return !!hiddenData.assessments.physicalExaminations[type];
}

/** Which assessment buttons a case's own data actually supports — for the
 * UI to only ever show valid actions (Step 6), never a fixed list. */
export function getAvailableAssessments(hiddenData: HiddenCaseData): AssessmentType[] {
  return ASSESSMENT_TYPES.filter((type) => isAssessmentSupported(hiddenData, type));
}

/**
 * Builds the locale-resolved result text for a supported assessment,
 * using ONLY this case's own data — a plain finding, never a diagnosis or
 * interpretation (Step 7). Vital signs are encoded as JSON so the exact
 * numbers survive a reload; physical-exam findings are plain resolved
 * text, same as an interview response. Returns null if unsupported —
 * callers must check isAssessmentSupported first and never call this as a
 * substitute for that check.
 */
export function buildAssessmentResult(
  hiddenData: HiddenCaseData,
  type: AssessmentType,
  locale: "ar" | "en",
): string | null {
  if (type === "VITAL_SIGNS") {
    const vitals = hiddenData.assessments.vitalSigns;
    return vitals ? encodeVitalSigns(vitals) : null;
  }
  const finding = hiddenData.assessments.physicalExaminations[type];
  if (!finding) return null;
  return locale === "ar" ? finding.ar : finding.en;
}
