// Phase 3B-4 — Virtual Nursing Lab Foundation. Three first-year-appropriate
// practice skills, each grounded in existing Anatomy structures (see
// lib/anatomy-3d/structures.ts) and using the same fictional-patient,
// educational-only spirit as lib/clinical-cases content. This is a practice
// layer, not a replacement for the Clinical Case simulation system.
//
// Phase 3C-1 — `relatedClinicalCaseSlug` links a skill to a genuinely
// matching, already-existing Clinical Case (see
// prisma/content/clinical-cases.js). Only one case exists in this content
// set today: "chest-pain-adult" (CARDIOVASCULAR, INTERMEDIATE) — an adult
// with tachycardia, hypertension, mild tachypnea, and mildly low SpO2, so
// it is a genuine fit for both Vital Signs Assessment (its own worked
// example of "an adult case with abnormal vital signs") and Cardiovascular
// Assessment (matching category and presentation). Respiratory Assessment
// is deliberately left unmapped: the only existing case is categorized and
// written as a cardiovascular presentation, not a respiratory one, and
// connecting it there would misrepresent it — no new case was created to
// avoid that (see the Phase 3C-1 final report).

import type { NursingSkill } from "./types";

export const NURSING_SKILLS: NursingSkill[] = [
  {
    id: "vital-signs-assessment",
    titleEn: "Vital Signs Assessment",
    titleAr: "تقييم العلامات الحيوية",
    descriptionEn:
      "Practice performing a complete set of vital signs on a simulated patient, in the correct sequence.",
    descriptionAr: "تدرّبي على قياس مجموعة كاملة من العلامات الحيوية لمريضة افتراضية، وفق التسلسل الصحيح.",
    relevantSystems: ["CARDIOVASCULAR", "RESPIRATORY"],
    relevantStructureIds: ["heart", "aorta", "lungs"],
    difficulty: "BEGINNER",
    estimatedMinutes: 15,
    prerequisitesEn: [],
    prerequisitesAr: [],
    learningObjectivesEn: [
      "Perform a full set of vital signs in the correct sequence.",
      "Identify the five core vital signs and their normal adult ranges.",
      "Practice accurate recording of clinical observations.",
    ],
    learningObjectivesAr: [
      "أداء مجموعة كاملة من العلامات الحيوية وفق التسلسل الصحيح.",
      "التعرّف على العلامات الحيوية الخمس الأساسية ومعدلاتها الطبيعية عند البالغين.",
      "التدرّب على تسجيل الملاحظات السريرية بدقة.",
    ],
    requiredEquipmentEn: ["Thermometer", "Stethoscope", "Blood pressure cuff (sphygmomanometer)", "Pulse oximeter", "Watch or timer"],
    requiredEquipmentAr: ["ميزان حرارة", "سماعة طبية", "جهاز قياس ضغط الدم", "جهاز قياس تشبع الأكسجين", "ساعة أو مؤقّت"],
    patient: {
      nameEn: "Layla",
      nameAr: "ليلى",
      age: 34,
      gender: "female",
      scenarioEn: "A simulated patient admitted for routine observation — alert, comfortable, and cooperative.",
      scenarioAr: "مريضة افتراضية تم إدخالها للمراقبة الروتينية — واعية ومرتاحة ومتعاونة.",
      communicationStateEn: "Calm and able to answer clearly.",
      communicationStateAr: "هادئة وقادرة على الإجابة بوضوح.",
    },
    preparationStepsEn: [
      "Gather all equipment and confirm it is clean and functioning.",
      "Ensure the simulated patient has been resting for at least 5 minutes before measurement.",
      "Explain the procedure to the simulated patient and confirm her consent.",
    ],
    preparationStepsAr: [
      "تجهيز جميع الأدوات والتأكد من نظافتها وصلاحيتها للعمل.",
      "التأكد من أن المريضة الافتراضية في حالة راحة لمدة 5 دقائق على الأقل قبل القياس.",
      "شرح الإجراء للمريضة الافتراضية والتأكد من موافقتها.",
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        instructionEn: "Verify the simulated patient's identity.",
        instructionAr: "تحققي من هوية المريضة الافتراضية.",
        requiredActionEn: "Confirm the patient's name and identifying details.",
        requiredActionAr: "تأكدي من اسم المريضة وبياناتها التعريفية.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the procedure to the patient.",
        instructionAr: "اشرحي الإجراء للمريضة.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
      },
      {
        stepNumber: 4,
        instructionEn: "Prepare the equipment at the bedside.",
        instructionAr: "جهّزي الأدوات بجانب السرير.",
        requiredActionEn: "Arrange the thermometer, stethoscope, cuff, and oximeter within reach.",
        requiredActionAr: "رتّبي ميزان الحرارة والسماعة وجهاز الضغط وجهاز التأكسج في متناول يدك.",
      },
      {
        stepNumber: 5,
        instructionEn: "Measure and record each vital sign.",
        instructionAr: "قيسي وسجّلي كل علامة حيوية.",
        requiredActionEn: "Record temperature, heart rate, respiratory rate, blood pressure, and SpO2.",
        requiredActionAr: "سجّلي درجة الحرارة، ومعدل ضربات القلب، ومعدل التنفس، وضغط الدم، وتشبع الأكسجين.",
        isObservationStep: true,
      },
      {
        stepNumber: 6,
        instructionEn: "Compare the findings to normal adult ranges.",
        instructionAr: "قارني النتائج بالمعدلات الطبيعية للبالغين.",
        requiredActionEn: "Note whether each value falls within the expected range.",
        requiredActionAr: "لاحظي ما إذا كانت كل قيمة ضمن النطاق المتوقع.",
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
      },
    ],
    observations: [
      { id: "temperature", labelEn: "Temperature", labelAr: "درجة الحرارة", valueEn: "37.0°C", valueAr: "37.0° س" },
      { id: "heart-rate", labelEn: "Heart Rate", labelAr: "معدل ضربات القلب", valueEn: "78 bpm", valueAr: "78 نبضة/دقيقة" },
      { id: "respiratory-rate", labelEn: "Respiratory Rate", labelAr: "معدل التنفس", valueEn: "16/min", valueAr: "16/دقيقة" },
      { id: "blood-pressure", labelEn: "Blood Pressure", labelAr: "ضغط الدم", valueEn: "118/76 mmHg", valueAr: "118/76 مم زئبق" },
      { id: "spo2", labelEn: "SpO2", labelAr: "تشبع الأكسجين", valueEn: "98%", valueAr: "98%" },
    ],
    relatedClinicalCaseSlug: "chest-pain-adult",
  },
  {
    id: "respiratory-assessment",
    titleEn: "Respiratory Assessment",
    titleAr: "التقييم التنفسي",
    descriptionEn: "Practice a focused respiratory assessment on a simulated patient recovering from a mild chest cold.",
    descriptionAr: "تدرّبي على إجراء تقييم تنفسي مركّز لمريض افتراضي يتعافى من نزلة صدرية خفيفة.",
    relevantSystems: ["RESPIRATORY"],
    relevantStructureIds: ["lungs", "trachea", "diaphragm"],
    difficulty: "BEGINNER",
    estimatedMinutes: 12,
    prerequisitesEn: ["Vital Signs Assessment (recommended)"],
    prerequisitesAr: ["تقييم العلامات الحيوية (يُستحسن إكمالها أولًا)"],
    learningObjectivesEn: [
      "Recognize a normal respiratory rate and breathing pattern.",
      "Practice observing chest movement and breathing effort.",
      "Connect respiratory anatomy to what is being assessed.",
    ],
    learningObjectivesAr: [
      "التعرّف على معدل التنفس الطبيعي ونمط التنفس السليم.",
      "التدرّب على ملاحظة حركة الصدر وجهد التنفس.",
      "ربط تشريح الجهاز التنفسي بما يتم تقييمه.",
    ],
    requiredEquipmentEn: ["Stethoscope", "Pulse oximeter", "Watch or timer"],
    requiredEquipmentAr: ["سماعة طبية", "جهاز قياس تشبع الأكسجين", "ساعة أو مؤقّت"],
    patient: {
      nameEn: "Omar",
      nameAr: "عمر",
      age: 45,
      gender: "male",
      scenarioEn: "A simulated patient recovering from a mild chest cold, breathing comfortably at rest.",
      scenarioAr: "مريض افتراضي يتعافى من نزلة صدرية خفيفة، ويتنفس بارتياح أثناء الراحة.",
      communicationStateEn: "Cooperative, answers in short sentences.",
      communicationStateAr: "متعاون، يجيب بجمل قصيرة.",
    },
    preparationStepsEn: [
      "Confirm the patient is seated comfortably, ideally upright.",
      "Expose the chest area appropriately while maintaining privacy.",
      "Explain the assessment to the patient before beginning.",
    ],
    preparationStepsAr: [
      "التأكد من أن المريض جالس بارتياح، ويُفضَّل بوضعية مستقيمة.",
      "كشف منطقة الصدر بالقدر المناسب مع الحفاظ على الخصوصية.",
      "شرح التقييم للمريض قبل البدء.",
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        instructionEn: "Verify the simulated patient's identity.",
        instructionAr: "تحققي من هوية المريض الافتراضي.",
        requiredActionEn: "Confirm the patient's name and identifying details.",
        requiredActionAr: "تأكدي من اسم المريض وبياناته التعريفية.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the respiratory assessment to the patient.",
        instructionAr: "اشرحي التقييم التنفسي للمريض.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
      },
      {
        stepNumber: 4,
        instructionEn: "Observe the rate, rhythm, and depth of breathing.",
        instructionAr: "لاحظي معدل التنفس ونظمه وعمقه.",
        requiredActionEn: "Watch chest rise and fall for a full minute without alerting the patient.",
        requiredActionAr: "راقبي ارتفاع الصدر وانخفاضه لمدة دقيقة كاملة دون لفت انتباه المريض.",
      },
      {
        stepNumber: 5,
        instructionEn: "Record the respiratory observations.",
        instructionAr: "سجّلي الملاحظات التنفسية.",
        requiredActionEn: "Record respiratory rate, breath sounds, SpO2, and use of accessory muscles.",
        requiredActionAr: "سجّلي معدل التنفس، وأصوات التنفس، وتشبع الأكسجين، واستخدام العضلات المساعدة للتنفس.",
        isObservationStep: true,
      },
      {
        stepNumber: 6,
        instructionEn: "Note any signs of respiratory distress.",
        instructionAr: "لاحظي أي علامات لضيق التنفس.",
        requiredActionEn: "Check for labored breathing, unusual color, or abnormal sounds.",
        requiredActionAr: "تحققي من وجود صعوبة في التنفس، أو لون غير طبيعي، أو أصوات غير معتادة.",
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
      },
    ],
    observations: [
      { id: "respiratory-rate", labelEn: "Respiratory Rate", labelAr: "معدل التنفس", valueEn: "16/min", valueAr: "16/دقيقة" },
      {
        id: "breath-sounds",
        labelEn: "Breath Sounds",
        labelAr: "أصوات التنفس",
        valueEn: "Clear bilaterally, no adventitious sounds",
        valueAr: "صافية على الجانبين، دون أصوات غير طبيعية",
      },
      { id: "spo2", labelEn: "SpO2", labelAr: "تشبع الأكسجين", valueEn: "97%", valueAr: "97%" },
      {
        id: "accessory-muscles",
        labelEn: "Use of Accessory Muscles",
        labelAr: "استخدام العضلات المساعدة للتنفس",
        valueEn: "None observed",
        valueAr: "لم يُلاحَظ استخدامها",
      },
    ],
    // No relatedClinicalCaseSlug: the only existing Clinical Case
    // ("chest-pain-adult") is categorized and written as a cardiovascular
    // presentation, not a respiratory one. Connecting it here would
    // misrepresent it as a respiratory case, so this mapping is left
    // empty rather than forced (see the Phase 3C-1 final report).
  },
  {
    id: "cardiovascular-assessment",
    titleEn: "Cardiovascular Assessment",
    titleAr: "التقييم القلبي الوعائي",
    descriptionEn: "Practice a focused cardiovascular assessment on a simulated patient scheduled for a routine check.",
    descriptionAr: "تدرّبي على إجراء تقييم قلبي وعائي مركّز لمريضة افتراضية مجدولة لفحص روتيني.",
    relevantSystems: ["CARDIOVASCULAR"],
    relevantStructureIds: ["heart", "aorta"],
    difficulty: "INTERMEDIATE",
    estimatedMinutes: 15,
    prerequisitesEn: ["Vital Signs Assessment (recommended)"],
    prerequisitesAr: ["تقييم العلامات الحيوية (يُستحسن إكمالها أولًا)"],
    learningObjectivesEn: [
      "Practice measuring heart rate and blood pressure accurately.",
      "Recognize a normal heart rhythm and peripheral pulses.",
      "Connect basic heart anatomy to what is being assessed.",
    ],
    learningObjectivesAr: [
      "التدرّب على قياس معدل ضربات القلب وضغط الدم بدقة.",
      "التعرّف على نظم القلب الطبيعي والنبض الطرفي.",
      "ربط تشريح القلب الأساسي بما يتم تقييمه.",
    ],
    requiredEquipmentEn: ["Stethoscope", "Blood pressure cuff (sphygmomanometer)", "Watch or timer"],
    requiredEquipmentAr: ["سماعة طبية", "جهاز قياس ضغط الدم", "ساعة أو مؤقّت"],
    patient: {
      nameEn: "Huda",
      nameAr: "هدى",
      age: 52,
      gender: "female",
      scenarioEn: "A simulated patient scheduled for a routine cardiovascular check, resting quietly.",
      scenarioAr: "مريضة افتراضية مجدولة لفحص قلبي وعائي روتيني، تستريح بهدوء.",
      communicationStateEn: "Slightly anxious but cooperative.",
      communicationStateAr: "قلقة بعض الشيء لكنها متعاونة.",
    },
    preparationStepsEn: [
      "Ensure the patient has been resting for at least 5 minutes.",
      "Position the patient's arm at heart level for blood pressure measurement.",
      "Explain the assessment to the patient before beginning.",
    ],
    preparationStepsAr: [
      "التأكد من أن المريضة في حالة راحة لمدة 5 دقائق على الأقل.",
      "وضع ذراع المريضة بمستوى القلب لقياس ضغط الدم.",
      "شرح التقييم للمريضة قبل البدء.",
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        instructionEn: "Verify the simulated patient's identity.",
        instructionAr: "تحققي من هوية المريضة الافتراضية.",
        requiredActionEn: "Confirm the patient's name and identifying details.",
        requiredActionAr: "تأكدي من اسم المريضة وبياناتها التعريفية.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the cardiovascular assessment to the patient.",
        instructionAr: "اشرحي التقييم القلبي الوعائي للمريضة.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
      },
      {
        stepNumber: 4,
        instructionEn: "Locate the radial or apical pulse.",
        instructionAr: "حدّدي موضع النبض الرسغي أو القمي.",
        requiredActionEn: "Position your fingers or stethoscope to feel or hear the pulse clearly.",
        requiredActionAr: "ضعي أصابعك أو السماعة بشكل صحيح للإحساس بالنبض أو سماعه بوضوح.",
      },
      {
        stepNumber: 5,
        instructionEn: "Record the cardiovascular observations.",
        instructionAr: "سجّلي الملاحظات القلبية الوعائية.",
        requiredActionEn: "Record heart rate, blood pressure, apical rhythm, peripheral pulses, and capillary refill.",
        requiredActionAr: "سجّلي معدل ضربات القلب، وضغط الدم، ونظم النبض القمي، والنبض الطرفي، وزمن امتلاء الشعيرات الدموية.",
        isObservationStep: true,
      },
      {
        stepNumber: 6,
        instructionEn: "Assess peripheral circulation.",
        instructionAr: "قيّمي الدورة الدموية الطرفية.",
        requiredActionEn: "Check the color, warmth, and pulses of the extremities.",
        requiredActionAr: "تحققي من لون الأطراف ودفئها ونبضها.",
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
      },
    ],
    observations: [
      { id: "heart-rate", labelEn: "Heart Rate", labelAr: "معدل ضربات القلب", valueEn: "82 bpm", valueAr: "82 نبضة/دقيقة" },
      { id: "blood-pressure", labelEn: "Blood Pressure", labelAr: "ضغط الدم", valueEn: "122/80 mmHg", valueAr: "122/80 مم زئبق" },
      { id: "apical-rhythm", labelEn: "Apical Pulse Rhythm", labelAr: "نظم النبض القمي", valueEn: "Regular", valueAr: "منتظم" },
      {
        id: "peripheral-pulses",
        labelEn: "Peripheral Pulses",
        labelAr: "النبض الطرفي",
        valueEn: "Strong and equal bilaterally",
        valueAr: "قوي ومتساوٍ على الجانبين",
      },
      {
        id: "capillary-refill",
        labelEn: "Capillary Refill",
        labelAr: "زمن امتلاء الشعيرات الدموية",
        valueEn: "Less than 2 seconds",
        valueAr: "أقل من ثانيتين",
      },
    ],
    relatedClinicalCaseSlug: "chest-pain-adult",
  },
];

export function getAllSkills(): NursingSkill[] {
  return NURSING_SKILLS;
}

export function getSkillById(id: string): NursingSkill | undefined {
  return NURSING_SKILLS.find((s) => s.id === id);
}
