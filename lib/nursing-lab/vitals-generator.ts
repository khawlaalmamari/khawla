// Dynamic vital-sign generation for the Nursing Lab's "Vital Signs
// Assessment" skill. Each attempt draws a fresh, realistic reading instead
// of the single hardcoded example this skill used to show — but the
// interpretation exercise (procedure steps 6-7) must stay honest about
// whatever was actually drawn, so buildInterpretStepPrompt/
// buildRespondStepPrompt below compute their prompt text and each option's
// explanation from the real numbers rather than assuming they're normal.

import type { GeneratedVitals, PatientVitalState, VitalKey, ClinicalChoicePrompt } from "./types";

type Range = [number, number];

type StateRanges = {
  temperatureC: Range;
  heartRateBpm: Range;
  respiratoryRateBrpm: Range;
  bloodPressureSystolic: Range;
  bloodPressureDiastolic: Range;
  spo2Percent: Range;
};

// "stable" mirrors the normal-adult reference ranges shown on the case
// detail page (see lib/i18n/dictionaries.ts's normal*Range strings) — it
// also doubles as the definition of "normal" used by isVitalWithinNormalRange
// below. "fever" shifts temperature up and adds the mild tachycardia and
// tachypnea a real fever commonly produces, while leaving blood pressure
// within normal limits — nothing here is invented; it is a deliberately
// narrow, textbook-typical presentation.
const STATE_RANGES: Record<PatientVitalState, StateRanges> = {
  stable: {
    temperatureC: [36.1, 37.2],
    heartRateBpm: [60, 100],
    respiratoryRateBrpm: [12, 20],
    bloodPressureSystolic: [95, 120],
    bloodPressureDiastolic: [60, 80],
    spo2Percent: [96, 100],
  },
  fever: {
    temperatureC: [38.0, 39.5],
    heartRateBpm: [95, 115],
    respiratoryRateBrpm: [18, 24],
    bloodPressureSystolic: [95, 118],
    bloodPressureDiastolic: [60, 80],
    spo2Percent: [94, 98],
  },
};

function randomInRange([min, max]: Range, decimals = 0): number {
  const value = min + Math.random() * (max - min);
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function generateVitalSigns(state: PatientVitalState = "stable"): GeneratedVitals {
  const ranges = STATE_RANGES[state];
  return {
    temperatureC: randomInRange(ranges.temperatureC, 1),
    heartRateBpm: randomInRange(ranges.heartRateBpm),
    respiratoryRateBrpm: randomInRange(ranges.respiratoryRateBrpm),
    bloodPressureSystolic: randomInRange(ranges.bloodPressureSystolic),
    bloodPressureDiastolic: randomInRange(ranges.bloodPressureDiastolic),
    spo2Percent: randomInRange(ranges.spo2Percent),
  };
}

export function isVitalWithinNormalRange(key: VitalKey, vitals: GeneratedVitals): boolean {
  const normal = STATE_RANGES.stable;
  switch (key) {
    case "temperature":
      return vitals.temperatureC >= normal.temperatureC[0] && vitals.temperatureC <= normal.temperatureC[1];
    case "heartRate":
      return vitals.heartRateBpm >= normal.heartRateBpm[0] && vitals.heartRateBpm <= normal.heartRateBpm[1];
    case "respiratoryRate":
      return (
        vitals.respiratoryRateBrpm >= normal.respiratoryRateBrpm[0] &&
        vitals.respiratoryRateBrpm <= normal.respiratoryRateBrpm[1]
      );
    case "bloodPressure":
      return (
        vitals.bloodPressureSystolic >= normal.bloodPressureSystolic[0] &&
        vitals.bloodPressureSystolic <= normal.bloodPressureSystolic[1] &&
        vitals.bloodPressureDiastolic >= normal.bloodPressureDiastolic[0] &&
        vitals.bloodPressureDiastolic <= normal.bloodPressureDiastolic[1]
      );
    case "spo2":
      return vitals.spo2Percent >= normal.spo2Percent[0];
  }
}

export function formatVitalValue(key: VitalKey, vitals: GeneratedVitals, locale: "ar" | "en"): string {
  switch (key) {
    case "temperature":
      return locale === "ar" ? `${vitals.temperatureC.toFixed(1)}° س` : `${vitals.temperatureC.toFixed(1)}°C`;
    case "heartRate":
      return locale === "ar" ? `${vitals.heartRateBpm} نبضة/دقيقة` : `${vitals.heartRateBpm} bpm`;
    case "respiratoryRate":
      return locale === "ar" ? `${vitals.respiratoryRateBrpm}/دقيقة` : `${vitals.respiratoryRateBrpm}/min`;
    case "bloodPressure":
      return locale === "ar"
        ? `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic} مم زئبق`
        : `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic} mmHg`;
    case "spo2":
      return `${vitals.spo2Percent}%`;
  }
}

const VITAL_LABELS: Record<VitalKey, { en: string; ar: string }> = {
  temperature: { en: "Temperature", ar: "درجة الحرارة" },
  heartRate: { en: "Heart Rate", ar: "معدل ضربات القلب" },
  respiratoryRate: { en: "Respiratory Rate", ar: "معدل التنفس" },
  bloodPressure: { en: "Blood Pressure", ar: "ضغط الدم" },
  spo2: { en: "SpO2", ar: "تشبع الأكسجين" },
};

const VITAL_ORDER: VitalKey[] = ["temperature", "heartRate", "respiratoryRate", "bloodPressure", "spo2"];

function joinEn(items: string[]): string {
  return items.join(", ");
}
function joinAr(items: string[]): string {
  return items.join("، و");
}

/** Step 6 ("Compare the findings to normal adult ranges"). Grounded
 * entirely in isVitalWithinNormalRange's own computed result for this
 * attempt's actual vitals — never assumes the reading is normal. */
export function buildInterpretStepPrompt(vitals: GeneratedVitals): ClinicalChoicePrompt {
  const abnormalKeys = VITAL_ORDER.filter((key) => !isVitalWithinNormalRange(key, vitals));
  const allNormal = abnormalKeys.length === 0;

  const measuredEn = joinEn(VITAL_ORDER.map((k) => `${VITAL_LABELS[k].en} ${formatVitalValue(k, vitals, "en")}`));
  const measuredAr = joinAr(VITAL_ORDER.map((k) => `${VITAL_LABELS[k].ar} ${formatVitalValue(k, vitals, "ar")}`));
  const abnormalEn = joinEn(abnormalKeys.map((k) => `${VITAL_LABELS[k].en} (${formatVitalValue(k, vitals, "en")})`));
  const abnormalAr = joinAr(abnormalKeys.map((k) => `${VITAL_LABELS[k].ar} (${formatVitalValue(k, vitals, "ar")})`));
  const verbEn = abnormalKeys.length === 1 ? "falls" : "fall";

  return {
    promptEn: `You measured: ${measuredEn}. How would you interpret this set of findings?`,
    promptAr: `لقد قِستِ: ${measuredAr}. كيف تفسّرين هذه المجموعة من النتائج؟`,
    options: [
      {
        id: "within-normal",
        labelEn: "All five values fall within normal adult ranges.",
        labelAr: "جميع القيم الخمس ضمن المعدلات الطبيعية للبالغين.",
        explanationEn: allNormal
          ? "This is the correct reading: a temperature near 37°C, a heart rate of 60–100 bpm, a respiratory rate of 12–20/min, a blood pressure below 120/80 mmHg, and an SpO2 of 95% or higher are all within normal limits for a resting adult. Recognizing a normal set of vitals is just as important a skill as recognizing an abnormal one — it tells you the patient does not need an urgent response right now."
          : `Looking again at the actual numbers, ${abnormalEn} ${verbEn} outside the normal adult range, so this reading is not accurate here — recognizing when a value is abnormal is exactly what this exercise is practicing.`,
        explanationAr: allNormal
          ? "هذه هي القراءة الصحيحة: درجة حرارة قريبة من 37°، ومعدل ضربات قلب بين 60-100 نبضة/دقيقة، ومعدل تنفس بين 12-20/دقيقة، وضغط دم أقل من 120/80، وتشبع أكسجين 95% فأعلى، كلها ضمن الحدود الطبيعية لبالغة في حالة راحة. التعرّف على مجموعة طبيعية من العلامات الحيوية مهارة لا تقل أهمية عن التعرّف على مجموعة غير طبيعية — فهي تخبرك أن المريضة لا تحتاج إلى استجابة عاجلة الآن."
          : `بالنظر مرة أخرى إلى الأرقام الفعلية، ${abnormalAr} خارج المعدل الطبيعي للبالغين، لذا هذه القراءة غير دقيقة هنا — والتعرّف على القيمة غير الطبيعية هو بالضبط ما تتدرّبين عليه في هذا التمرين.`,
      },
      {
        id: "concerning",
        labelEn: "At least one value looks concerning and needs urgent follow-up.",
        labelAr: "قيمة واحدة على الأقل تبدو مقلقة وتحتاج متابعة عاجلة.",
        explanationEn: allNormal
          ? `Looking again at the numbers — ${measuredEn} — none actually fall outside the normal adult range. It's a good habit to check every value against its reference range before deciding something is concerning: treating normal findings as urgent can create unnecessary alarm and delay attention to genuinely abnormal findings elsewhere.`
          : `This is the correct reading here: ${abnormalEn} ${verbEn} outside the normal adult range, so this set of findings does need follow-up rather than being treated as routine.`,
        explanationAr: allNormal
          ? `بالنظر مرة أخرى إلى الأرقام — ${measuredAr} — لا توجد قيمة تخرج فعليًا عن المعدل الطبيعي للبالغين. من العادات الجيدة مقارنة كل قيمة بمعدلها المرجعي قبل الحكم بأنها مقلقة: التعامل مع نتائج طبيعية على أنها عاجلة قد يُحدث قلقًا غير ضروري ويؤخّر الانتباه لنتائج غير طبيعية فعلية في مكان آخر.`
          : `هذه هي القراءة الصحيحة هنا: ${abnormalAr} خارج المعدل الطبيعي للبالغين، لذا هذه المجموعة من النتائج تحتاج فعلاً إلى متابعة ولا يجب التعامل معها كروتينية.`,
      },
      {
        id: "repeat",
        labelEn: "I would need to repeat the measurements before drawing any conclusion.",
        labelAr: "أحتاج إلى إعادة القياس قبل استخلاص أي استنتاج.",
        explanationEn:
          "Repeating a measurement is reasonable when you have a specific reason to doubt it — for example, if the patient moved during the reading or the equipment seemed faulty. Here, the readings were taken correctly and there is no such reason, so a value does not need to be repeated automatically just because it is being reviewed — whether it turns out normal or abnormal.",
        explanationAr:
          "إعادة القياس أمر منطقي عندما يكون لديك سبب محدد للشك فيه — كأن تتحرك المريضة أثناء القياس أو يبدو الجهاز معطلاً. هنا، أُخذت القراءات بشكل صحيح ولا يوجد سبب كهذا، لذا لا تحتاج القيمة إلى إعادة تلقائية لمجرد مراجعتها — سواء تبيّن أنها طبيعية أو غير طبيعية.",
      },
    ],
  };
}

/** Step 7 ("Continue to the next assessment"). Whether documentation alone
 * or escalation is the right call flips with the same allNormal check used
 * in step 6, so both steps of this attempt always agree with each other. */
export function buildRespondStepPrompt(vitals: GeneratedVitals): ClinicalChoicePrompt {
  const allNormal = VITAL_ORDER.every((key) => isVitalWithinNormalRange(key, vitals));

  return {
    promptEn: allNormal
      ? "Given that all five vital signs are within normal limits, what is the most appropriate next action?"
      : "Given that one or more vital signs fall outside normal limits, what is the most appropriate next action?",
    promptAr: allNormal
      ? "بما أن جميع العلامات الحيوية الخمس ضمن الحدود الطبيعية، ما الإجراء التالي الأنسب؟"
      : "بما أن إحدى العلامات الحيوية أو أكثر خارج الحدود الطبيعية، ما الإجراء التالي الأنسب؟",
    options: [
      {
        id: "document-continue",
        labelEn: "Document the findings accurately and continue routine monitoring.",
        labelAr: "توثيق النتائج بدقة والاستمرار في المراقبة الروتينية.",
        explanationEn: allNormal
          ? "This is the standard response to a normal set of vital signs: accurate documentation creates a baseline for comparison at the next check, and routine monitoring continues without unnecessary escalation."
          : "Documentation is always necessary, but on its own it is not enough here: at least one value is outside the normal range and should be communicated now, not left for routine monitoring alone.",
        explanationAr: allNormal
          ? "هذا هو الإجراء المعياري لمجموعة طبيعية من العلامات الحيوية: التوثيق الدقيق يُنشئ خط أساس للمقارنة في الفحص التالي، وتستمر المراقبة الروتينية دون تصعيد غير ضروري."
          : "التوثيق ضروري دائمًا، لكنه وحده لا يكفي هنا: إحدى القيم على الأقل خارج المعدل الطبيعي ويجب إبلاغها الآن، وليس الاكتفاء بالمراقبة الروتينية.",
      },
      {
        id: "escalate",
        labelEn: "Immediately notify the physician or charge nurse.",
        labelAr: "إبلاغ الطبيب أو الممرضة المسؤولة فورًا.",
        explanationEn: allNormal
          ? "Escalation is reserved for findings that are abnormal, trending in a concerning direction, or inconsistent with how the patient looks and feels. Escalating every normal set of vitals uses up limited clinical attention needed for patients who truly need it, and can undermine confidence in future, genuinely urgent reports."
          : "This is the appropriate response here: with a genuinely abnormal finding, notifying the supervising nurse or physician promptly — after accurate documentation — is exactly what patient safety requires.",
        explanationAr: allNormal
          ? "التصعيد مخصّص للنتائج غير الطبيعية أو المتجهة نحو اتجاه مقلق أو غير المتّسقة مع مظهر المريضة وحالتها. تصعيد كل مجموعة طبيعية من العلامات الحيوية يستنزف انتباهًا سريريًا محدودًا تحتاجه مريضات أخريات فعلاً، وقد يُضعف الثقة في البلاغات العاجلة الحقيقية لاحقًا."
          : "هذا هو الإجراء المناسب هنا: مع وجود نتيجة غير طبيعية فعليًا، فإن إبلاغ الممرضة المسؤولة أو الطبيب فورًا — بعد التوثيق الدقيق — هو بالضبط ما تتطلبه سلامة المريضة.",
      },
      {
        id: "withhold",
        labelEn: "Withhold documentation until the next scheduled check.",
        labelAr: "تأجيل التوثيق حتى الفحص المجدول التالي.",
        explanationEn:
          "Every set of vital signs should be documented as soon as it is measured, whether normal or abnormal — it is the permanent record other members of the care team rely on, and delaying it risks the information being forgotten or lost.",
        explanationAr:
          "يجب توثيق كل مجموعة من العلامات الحيوية فور قياسها، سواء كانت طبيعية أو غير طبيعية — فهي السجل الدائم الذي يعتمد عليه بقية أعضاء فريق الرعاية، وتأجيلها يُعرّض المعلومة لخطر النسيان أو الضياع.",
      },
    ],
  };
}
