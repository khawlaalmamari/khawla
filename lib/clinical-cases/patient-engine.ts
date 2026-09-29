// Deterministic, offline patient-response engine (Step 4). No AI provider
// call of any kind — this must work identically whether or not
// AI_PROVIDER_API_KEY is set, and must never invent clinical information:
// every response is either a scripted line from the case's own
// hiddenData/visibleData, or the fixed "not sure" fallback below.

import type { AssessmentType, Bilingual, HiddenCaseData, QuestionCategory, VisibleCaseData } from "./types";
import { ASSESSMENT_TYPES, QUESTION_CATEGORIES } from "./types";
import { encodeVitalSigns } from "./assessment-format";
import { DECISION_POINTS } from "./decision-points";

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

// ---------------------------------------------------------------------
// Phase 3E — Branching Clinical Case Interaction
// ---------------------------------------------------------------------

// Server-only: the clinical explanation for each decision option, keyed
// by "<decisionId>:<optionId>". Deliberately NOT exported from
// decision-points.ts (which the client component also imports) — this
// file is only ever imported by lib/clinical-cases/queries.ts, a
// server-only module, so this text never reaches the client bundle until
// a student actually picks an option and it comes back as an ordinary
// persisted conversation message (same reveal-on-request pattern as
// buildAssessmentResult above). Every explanation is real commentary on
// this case's own existing findings — no diagnosis is named, and no
// option is marked correct or incorrect.
const DECISION_EXPLANATIONS: Record<string, Bilingual> = {
  "DECISION_POST_VITALS:reassess": {
    en: "Repeating vital signs after a short interval helps determine whether a finding is stable, improving, or worsening — especially useful here, where the initial reading already showed an elevated heart rate, elevated blood pressure, an increased respiratory rate, and mildly reduced oxygen saturation.",
    ar: "إعادة قياس العلامات الحيوية بعد فترة قصيرة تساعد على معرفة ما إذا كانت النتيجة مستقرة أو تتحسن أو تزداد سوءًا — وهذا مفيد بشكل خاص هنا، حيث أظهرت القراءة الأولية معدل ضربات قلب مرتفعًا، وضغط دم مرتفعًا، ومعدل تنفس متزايدًا، وتشبع أكسجين منخفضًا قليلاً.",
  },
  "DECISION_POST_VITALS:cardio-assess": {
    en: "A focused cardiovascular assessment (use the Cardiovascular Assessment button above) adds information — heart sounds, peripheral pulses, signs of fluid overload — that vital signs alone don't provide, and is a logical next step when the initial vitals raise a cardiovascular question.",
    ar: "التقييم القلبي الوعائي المركّز (استخدمي زر «تقييم القلب والأوعية الدموية» أعلاه) يضيف معلومات — كأصوات القلب والنبض الطرفي وعلامات احتقان السوائل — لا توفرها العلامات الحيوية وحدها، وهو خطوة منطقية تالية عندما تثير العلامات الحيوية الأولية تساؤلاً قلبيًا وعائيًا.",
  },
  "DECISION_POST_VITALS:escalate": {
    en: "Communicating findings promptly is appropriate when a patient's presentation and vital signs together raise concern, as they do here: chest pain together with an elevated heart rate, elevated blood pressure, increased respiratory rate, and mildly reduced oxygen saturation. Early communication keeps the wider care team informed rather than one nurse deciding alone whether to act.",
    ar: "التواصل الفوري بشأن النتائج مناسب عندما تثير حالة المريض وعلاماته الحيوية معًا القلق، كما هو الحال هنا: ألم في الصدر مع معدل ضربات قلب مرتفع، وضغط دم مرتفع، ومعدل تنفس متزايد، وتشبع أكسجين منخفض قليلاً. التواصل المبكر يُبقي فريق الرعاية الأوسع على اطّلاع بدلاً من أن تقرر ممرضة واحدة بمفردها ما إذا كان ينبغي التصرف.",
  },
  "DECISION_POST_VITALS:monitor": {
    en: "Routine monitoring alone is usually appropriate when findings are reassuring. Here, however, the patient's chest pain together with this specific set of vital sign changes is the kind of combination nursing education asks you to actively communicate and further assess, rather than waiting for the next scheduled check.",
    ar: "المراقبة الروتينية وحدها تكون مناسبة عادةً عندما تكون النتائج مطمئنة. أما هنا، فألم الصدر إلى جانب هذه المجموعة تحديدًا من التغيرات في العلامات الحيوية هو بالضبط نوع التوليفات الذي يطلب منكِ التعليم التمريضي التواصل بشأنه وتقييمه بشكل أكبر بفعالية، بدلاً من انتظار الفحص المجدول التالي.",
  },
};

/** Returns null for an unknown decision/option id pair — callers must
 * treat that as "not supported" (Step 14), never fall back to guessing. */
export function getDecisionExplanation(decisionId: string, optionId: string): Bilingual | null {
  return DECISION_EXPLANATIONS[`${decisionId}:${optionId}`] ?? null;
}

// Phase 3F — names the clinical-thinking skill the student's chosen
// option practiced (never whether it was "correct"). Only ever revealed
// by lib/clinical-cases/queries.ts once the student has also saved their
// Clinical Reasoning notes for this attempt — the same reveal-on-earned-
// progress principle as DECISION_EXPLANATIONS above, so a curious client
// can't read every option's insight before choosing. Grounded in the same
// scripted vital signs as DECISION_EXPLANATIONS; no diagnosis is named,
// and "monitor" explains why closer follow-up is worth considering here
// without ever labeling the choice wrong.
const DECISION_LEARNING_INSIGHTS: Record<string, Bilingual> = {
  "DECISION_POST_VITALS:reassess": {
    en: "This decision practiced trend monitoring: recognizing that one set of vital signs is a single snapshot, and that a short repeat measurement helps you tell whether a finding is stable, improving, or worsening.",
    ar: "هذا القرار درّبكِ على مهارة متابعة التطوّر: إدراك أن قياسًا واحدًا للعلامات الحيوية هو لحظة واحدة فقط، وأن إعادة القياس بعد فترة قصيرة تساعدكِ على معرفة ما إذا كانت النتيجة مستقرة أو تتحسن أو تزداد سوءًا.",
  },
  "DECISION_POST_VITALS:cardio-assess": {
    en: "This decision practiced focused assessment: choosing a targeted cardiovascular exam to gather more specific evidence before deciding what to do next, rather than acting on vital signs alone.",
    ar: "هذا القرار درّبكِ على مهارة التقييم المركّز: اختيار فحص قلبي وعائي محدد لجمع أدلة أكثر دقة قبل اتخاذ القرار التالي، بدلاً من الاعتماد على العلامات الحيوية وحدها.",
  },
  "DECISION_POST_VITALS:escalate": {
    en: "This decision practiced clinical communication: recognizing findings — chest pain together with several changed vital signs — that call for informing the wider care team promptly, rather than one nurse deciding alone whether to act.",
    ar: "هذا القرار درّبكِ على مهارة التواصل السريري: إدراك أن وجود ألم في الصدر مع عدة تغيّرات في العلامات الحيوية معًا يستدعي إبلاغ فريق الرعاية الأوسع فورًا، بدلاً من أن تقرر ممرضة واحدة بمفردها ما إذا كان ينبغي التصرف.",
  },
  "DECISION_POST_VITALS:monitor": {
    en: "This decision practiced routine monitoring. Clinical thinking also means weighing whether combined findings — like chest pain together with this specific set of vital-sign changes — call for more active follow-up than waiting for the next scheduled check, which is worth considering here.",
    ar: "هذا القرار درّبكِ على المراقبة الروتينية. يتضمن التفكير السريري أيضًا تقييم ما إذا كانت النتائج مجتمعة — كألم الصدر مع هذه المجموعة تحديدًا من التغيرات في العلامات الحيوية — تستدعي متابعة أكثر فاعلية من انتظار الفحص المجدول التالي، وهو أمر يستحق التفكير فيه هنا.",
  },
};

/** Returns null for an unknown decision/option id pair, or when this
 * option simply has no authored insight yet — callers must treat that as
 * "nothing to show", never invent generic filler (Step 15). */
export function getDecisionInsight(decisionId: string, optionId: string): Bilingual | null {
  return DECISION_LEARNING_INSIGHTS[`${decisionId}:${optionId}`] ?? null;
}

const ALL_DECISION_IDS = new Set(Object.values(DECISION_POINTS).flat().map((p) => p.id));

/** True if `category` is one of this app's decision-point ids — used by
 * getInterviewSummary to keep decision turns out of the existing
 * questionsAsked/discovered-information counts, the same way assessment
 * categories are already excluded there. */
export function isDecisionCategory(category: string): boolean {
  return ALL_DECISION_IDS.has(category);
}
