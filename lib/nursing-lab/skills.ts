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
        rationaleEn:
          "Confirming identity before any procedure prevents performing the wrong assessment on the wrong patient — a core patient-safety check before any clinical contact.",
        rationaleAr:
          "التحقق من الهوية قبل أي إجراء يمنع إجراء التقييم الخاطئ على مريضة أخرى — وهو تحقق أساسي لسلامة المريضة قبل أي تلامس سريري.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the procedure to the patient.",
        instructionAr: "اشرحي الإجراء للمريضة.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
        rationaleEn:
          "Explaining what you are about to do respects the patient's autonomy, reduces anxiety, and secures her informed cooperation before you begin.",
        rationaleAr:
          "شرح ما ستقومين به يحترم استقلالية المريضة، ويقلّل من قلقها، ويضمن تعاونها الواعي قبل البدء.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
        rationaleEn:
          "Hand hygiene is the single most effective action for preventing the spread of microorganisms and reducing healthcare-associated infections.",
        rationaleAr:
          "نظافة اليدين هي الإجراء الأكثر فعالية لمنع انتقال الميكروبات وتقليل العدوى المرتبطة بالرعاية الصحية.",
      },
      {
        stepNumber: 4,
        instructionEn: "Prepare the equipment at the bedside.",
        instructionAr: "جهّزي الأدوات بجانب السرير.",
        requiredActionEn: "Arrange the thermometer, stethoscope, cuff, and oximeter within reach.",
        requiredActionAr: "رتّبي ميزان الحرارة والسماعة وجهاز الضغط وجهاز التأكسج في متناول يدك.",
        rationaleEn:
          "Arranging equipment within reach avoids interrupting the procedure to search for tools, keeping your attention on the patient throughout.",
        rationaleAr:
          "ترتيب الأدوات في متناول اليد يمنع مقاطعة الإجراء للبحث عنها، ويبقي تركيزك على المريضة طوال الوقت.",
      },
      {
        stepNumber: 5,
        instructionEn: "Measure and record each vital sign.",
        instructionAr: "قيسي وسجّلي كل علامة حيوية.",
        requiredActionEn: "Record temperature, heart rate, respiratory rate, blood pressure, and SpO2.",
        requiredActionAr: "سجّلي درجة الحرارة، ومعدل ضربات القلب، ومعدل التنفس، وضغط الدم، وتشبع الأكسجين.",
        isObservationStep: true,
        rationaleEn:
          "Measuring and recording every vital sign — not only the ones that seem relevant — builds a complete picture of the patient's physiological status.",
        rationaleAr:
          "قياس وتسجيل كل علامة حيوية — وليس فقط ما يبدو ذا صلة — يُكوّن صورة كاملة عن الحالة الفيزيولوجية للمريضة.",
      },
      {
        stepNumber: 6,
        instructionEn: "Compare the findings to normal adult ranges.",
        instructionAr: "قارني النتائج بالمعدلات الطبيعية للبالغين.",
        requiredActionEn: "Note whether each value falls within the expected range.",
        requiredActionAr: "لاحظي ما إذا كانت كل قيمة ضمن النطاق المتوقع.",
        // Built at render time from this attempt's actual generated vitals
        // (see lib/nursing-lab/vitals-generator.ts) so the prompt and each
        // option's explanation stay accurate whatever was randomly drawn.
        dynamicChoicePromptKind: "interpretVitals",
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
        // See the note on step 6 above — same reasoning applies to whether
        // documenting-and-continuing or escalating is the right call.
        dynamicChoicePromptKind: "respondToVitals",
      },
    ],
    // valueEn/valueAr below are a fallback only; vitalKey means the actual
    // displayed/recorded value comes from this attempt's freshly generated
    // vitals instead (see lib/nursing-lab/vitals-generator.ts).
    observations: [
      {
        id: "temperature",
        labelEn: "Temperature",
        labelAr: "درجة الحرارة",
        valueEn: "37.0°C",
        valueAr: "37.0° س",
        vitalKey: "temperature",
      },
      {
        id: "heart-rate",
        labelEn: "Heart Rate",
        labelAr: "معدل ضربات القلب",
        valueEn: "78 bpm",
        valueAr: "78 نبضة/دقيقة",
        vitalKey: "heartRate",
      },
      {
        id: "respiratory-rate",
        labelEn: "Respiratory Rate",
        labelAr: "معدل التنفس",
        valueEn: "16/min",
        valueAr: "16/دقيقة",
        vitalKey: "respiratoryRate",
      },
      {
        id: "blood-pressure",
        labelEn: "Blood Pressure",
        labelAr: "ضغط الدم",
        valueEn: "118/76 mmHg",
        valueAr: "118/76 مم زئبق",
        vitalKey: "bloodPressure",
      },
      { id: "spo2", labelEn: "SpO2", labelAr: "تشبع الأكسجين", valueEn: "98%", valueAr: "98%", vitalKey: "spo2" },
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
        rationaleEn:
          "Confirming identity before any procedure prevents performing the wrong assessment on the wrong patient — a core patient-safety check before any clinical contact.",
        rationaleAr:
          "التحقق من الهوية قبل أي إجراء يمنع إجراء التقييم الخاطئ على مريض آخر — وهو تحقق أساسي لسلامة المريض قبل أي تلامس سريري.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the respiratory assessment to the patient.",
        instructionAr: "اشرحي التقييم التنفسي للمريض.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
        rationaleEn:
          "Explaining what you are about to do respects the patient's autonomy, reduces anxiety, and secures his informed cooperation before you begin.",
        rationaleAr:
          "شرح ما ستقومين به يحترم استقلالية المريض، ويقلّل من قلقه، ويضمن تعاونه الواعي قبل البدء.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
        rationaleEn:
          "Hand hygiene is the single most effective action for preventing the spread of microorganisms and reducing healthcare-associated infections.",
        rationaleAr:
          "نظافة اليدين هي الإجراء الأكثر فعالية لمنع انتقال الميكروبات وتقليل العدوى المرتبطة بالرعاية الصحية.",
      },
      {
        stepNumber: 4,
        instructionEn: "Observe the rate, rhythm, and depth of breathing.",
        instructionAr: "لاحظي معدل التنفس ونظمه وعمقه.",
        requiredActionEn: "Watch chest rise and fall for a full minute without alerting the patient.",
        requiredActionAr: "راقبي ارتفاع الصدر وانخفاضه لمدة دقيقة كاملة دون لفت انتباه المريض.",
        rationaleEn:
          "Observing breathing before touching the patient or drawing attention to it gives a truer picture of his natural, unaltered breathing pattern.",
        rationaleAr:
          "ملاحظة التنفس قبل لمس المريض أو لفت انتباهه إليه تعطي صورة أصدق عن نمط تنفسه الطبيعي غير المتأثر بالملاحظة.",
      },
      {
        stepNumber: 5,
        instructionEn: "Record the respiratory observations.",
        instructionAr: "سجّلي الملاحظات التنفسية.",
        requiredActionEn: "Record respiratory rate, breath sounds, SpO2, and use of accessory muscles.",
        requiredActionAr: "سجّلي معدل التنفس، وأصوات التنفس، وتشبع الأكسجين، واستخدام العضلات المساعدة للتنفس.",
        isObservationStep: true,
        rationaleEn:
          "Recording rate, sound, oxygenation, and effort together gives a fuller respiratory picture than any single value alone.",
        rationaleAr:
          "تسجيل المعدل والصوت والتأكسج والجهد التنفسي معًا يُعطي صورة تنفسية أشمل من أي قيمة منفردة.",
      },
      {
        stepNumber: 6,
        instructionEn: "Note any signs of respiratory distress.",
        instructionAr: "لاحظي أي علامات لضيق التنفس.",
        requiredActionEn: "Check for labored breathing, unusual color, or abnormal sounds.",
        requiredActionAr: "تحققي من وجود صعوبة في التنفس، أو لون غير طبيعي، أو أصوات غير معتادة.",
        choicePrompt: {
          promptEn:
            "You observed: Respiratory Rate 16/min, breath sounds clear bilaterally, SpO2 97%, and no use of accessory muscles. How would you interpret these findings?",
          promptAr:
            "لاحظتِ: معدل تنفس 16/دقيقة، وأصوات تنفس صافية على الجانبين، وتشبع أكسجين 97%، ودون استخدام للعضلات المساعدة للتنفس. كيف تفسّرين هذه النتائج؟",
          options: [
            {
              id: "unlabored",
              labelEn: "Breathing is unlabored and within the normal range for an adult at rest.",
              labelAr: "التنفس غير مجهد وضمن المعدل الطبيعي لبالغ في حالة راحة.",
              explanationEn:
                "A respiratory rate of 12–20 breaths per minute, clear bilateral breath sounds, an SpO2 of 95% or above, and no accessory muscle use together describe comfortable, effective breathing — exactly what you'd expect from someone recovering well from a mild chest cold.",
              explanationAr:
                "معدل تنفس بين 12-20 نفسًا في الدقيقة، وأصوات تنفس صافية على الجانبين، وتشبع أكسجين 95% فأعلى، ودون استخدام للعضلات المساعدة، كلها تصف تنفسًا مريحًا وفعالًا — تمامًا كما يُتوقع من شخص يتعافى جيدًا من نزلة صدرية خفيفة.",
            },
            {
              id: "under-breathing",
              labelEn: "The absence of accessory muscle use suggests the patient is not breathing enough.",
              labelAr: "عدم استخدام العضلات المساعدة يشير إلى أن المريض لا يتنفس بشكل كافٍ.",
              explanationEn:
                "It's actually the opposite: accessory muscles (in the neck and shoulders) only become active when normal breathing muscles can't keep up, such as in significant respiratory distress. Their absence here is a reassuring sign, not a concerning one.",
              explanationAr:
                "الأمر عكس ذلك تمامًا: العضلات المساعدة (في الرقبة والكتفين) تنشط فقط عندما لا تستطيع عضلات التنفس الطبيعية مواكبة الحاجة، كما في ضيق التنفس الشديد. غيابها هنا علامة مطمئنة وليست مقلقة.",
            },
            {
              id: "no-further-need",
              labelEn: "Clear breath sounds mean no further respiratory assessment is ever needed.",
              labelAr: "الأصوات التنفسية الصافية تعني أنه لا حاجة لأي تقييم تنفسي لاحق أبدًا.",
              explanationEn:
                "Clear breath sounds at this moment are a good sign, but a patient's respiratory status can change — especially one recovering from a recent illness. Continued observation over time, not a single clear reading, is what confirms ongoing respiratory stability.",
              explanationAr:
                "الأصوات التنفسية الصافية في هذه اللحظة علامة جيدة، لكن حالة المريض التنفسية قد تتغيّر — خاصة وهو يتعافى من مرض حديث. المراقبة المستمرة عبر الوقت، وليس قراءة واحدة صافية، هي ما يؤكد استقرار التنفس المستمر.",
            },
          ],
        },
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
        choicePrompt: {
          promptEn: "Based on this reassuring respiratory assessment, what is the most appropriate next step?",
          promptAr: "بناءً على هذا التقييم التنفسي المطمئن، ما الخطوة التالية الأنسب؟",
          options: [
            {
              id: "document-continue",
              labelEn: "Document the findings and continue routine reassessment as scheduled.",
              labelAr: "توثيق النتائج والاستمرار في إعادة التقييم الروتيني حسب الجدول.",
              explanationEn:
                "Reassuring findings still need to be recorded — they form the baseline that would make any future change easier to recognize — and routine reassessment continues on its normal schedule.",
              explanationAr:
                "النتائج المطمئنة تحتاج إلى تسجيل أيضًا — فهي تُشكّل خط الأساس الذي يجعل أي تغيّر مستقبلي أسهل ملاحظة — وتستمر إعادة التقييم الروتيني وفق جدولها الطبيعي.",
            },
            {
              id: "supplemental-oxygen",
              labelEn: "Apply supplemental oxygen as a precaution.",
              labelAr: "إعطاء أكسجين إضافي كإجراء احترازي.",
              explanationEn:
                "Supplemental oxygen is a treatment for low oxygen saturation or respiratory distress, neither of which is present here (SpO2 97%, no distress). Applying oxygen without a clinical indication is not standard practice and should always follow an assessment that actually shows a need for it.",
              explanationAr:
                "الأكسجين الإضافي علاج لانخفاض تشبع الأكسجين أو ضيق التنفس، وكلاهما غير موجود هنا (تشبع 97% ودون ضيق). إعطاء الأكسجين دون مؤشر سريري ليس ممارسة معيارية، ويجب أن يأتي دائمًا بعد تقييم يُظهر فعلاً حاجة له.",
            },
            {
              id: "force-breathing",
              labelEn: "Ask the patient to breathe deeply and rapidly to confirm the reading.",
              labelAr: "طلب من المريض التنفس بعمق وسرعة للتأكد من القراءة.",
              explanationEn:
                "Asking a patient to deliberately change their breathing pattern would change the very thing you are trying to measure. A respiratory assessment should always observe a patient's natural, resting breathing pattern.",
              explanationAr:
                "طلب تغيير نمط التنفس عمدًا يُغيّر بالضبط ما تحاولين قياسه. يجب أن يلاحظ التقييم التنفسي دائمًا نمط التنفس الطبيعي للمريض أثناء الراحة.",
            },
          ],
        },
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
        rationaleEn:
          "Confirming identity before any procedure prevents performing the wrong assessment on the wrong patient — a core patient-safety check before any clinical contact.",
        rationaleAr:
          "التحقق من الهوية قبل أي إجراء يمنع إجراء التقييم الخاطئ على مريضة أخرى — وهو تحقق أساسي لسلامة المريضة قبل أي تلامس سريري.",
      },
      {
        stepNumber: 2,
        instructionEn: "Explain the cardiovascular assessment to the patient.",
        instructionAr: "اشرحي التقييم القلبي الوعائي للمريضة.",
        requiredActionEn: "State clearly what you are about to do and why.",
        requiredActionAr: "وضّحي بشكل واضح ما ستقومين به وسبب ذلك.",
        rationaleEn:
          "Explaining what you are about to do respects the patient's autonomy, reduces anxiety, and secures her informed cooperation before you begin.",
        rationaleAr:
          "شرح ما ستقومين به يحترم استقلالية المريضة، ويقلّل من قلقها، ويضمن تعاونها الواعي قبل البدء.",
      },
      {
        stepNumber: 3,
        instructionEn: "Perform hand hygiene.",
        instructionAr: "قومي بنظافة اليدين.",
        requiredActionEn: "Wash or sanitize your hands before any contact.",
        requiredActionAr: "اغسلي يديك أو عقّميهما قبل أي تلامس.",
        rationaleEn:
          "Hand hygiene is the single most effective action for preventing the spread of microorganisms and reducing healthcare-associated infections.",
        rationaleAr:
          "نظافة اليدين هي الإجراء الأكثر فعالية لمنع انتقال الميكروبات وتقليل العدوى المرتبطة بالرعاية الصحية.",
      },
      {
        stepNumber: 4,
        instructionEn: "Locate the radial or apical pulse.",
        instructionAr: "حدّدي موضع النبض الرسغي أو القمي.",
        requiredActionEn: "Position your fingers or stethoscope to feel or hear the pulse clearly.",
        requiredActionAr: "ضعي أصابعك أو السماعة بشكل صحيح للإحساس بالنبض أو سماعه بوضوح.",
        rationaleEn: "Correctly locating the pulse first ensures an accurate reading rather than a rushed or misplaced one.",
        rationaleAr: "تحديد موضع النبض بدقة أولًا يضمن قراءة صحيحة بدلاً من قراءة متسرّعة أو في موضع خاطئ.",
      },
      {
        stepNumber: 5,
        instructionEn: "Record the cardiovascular observations.",
        instructionAr: "سجّلي الملاحظات القلبية الوعائية.",
        requiredActionEn: "Record heart rate, blood pressure, apical rhythm, peripheral pulses, and capillary refill.",
        requiredActionAr: "سجّلي معدل ضربات القلب، وضغط الدم، ونظم النبض القمي، والنبض الطرفي، وزمن امتلاء الشعيرات الدموية.",
        isObservationStep: true,
        rationaleEn:
          "Recording rate, pressure, rhythm, and perfusion together — not just one number — reflects how the whole cardiovascular system is functioning.",
        rationaleAr:
          "تسجيل المعدل والضغط والنظم والتروية معًا — وليس رقمًا واحدًا فقط — يعكس كيفية عمل الجهاز القلبي الوعائي ككل.",
      },
      {
        stepNumber: 6,
        instructionEn: "Assess peripheral circulation.",
        instructionAr: "قيّمي الدورة الدموية الطرفية.",
        requiredActionEn: "Check the color, warmth, and pulses of the extremities.",
        requiredActionAr: "تحققي من لون الأطراف ودفئها ونبضها.",
        choicePrompt: {
          promptEn:
            "You recorded: Heart Rate 82 bpm, Blood Pressure 122/80 mmHg, a regular apical rhythm, strong and equal peripheral pulses, and capillary refill under 2 seconds. How would you interpret these findings?",
          promptAr:
            "لقد سجّلتِ: معدل ضربات قلب 82 نبضة/دقيقة، وضغط دم 122/80 مم زئبق، ونظم نبض قمي منتظم، ونبض طرفي قوي ومتساوٍ، وزمن امتلاء شعيرات دموية أقل من ثانيتين. كيف تفسّرين هذه النتائج؟",
          options: [
            {
              id: "normal",
              labelEn: "Cardiovascular status appears normal for a resting adult.",
              labelAr: "الحالة القلبية الوعائية تبدو طبيعية لبالغة في حالة راحة.",
              explanationEn:
                "A heart rate of 60–100 bpm, blood pressure below 130/80 mmHg, a regular rhythm, strong equal pulses, and capillary refill under 2–3 seconds together describe healthy circulatory function at rest — exactly what is expected for a calm, resting patient.",
              explanationAr:
                "معدل ضربات قلب بين 60-100، وضغط دم أقل من 130/80، ونظم منتظم، ونبض قوي ومتساوٍ، وزمن امتلاء شعيرات أقل من 2-3 ثوانٍ، كلها تصف وظيفة دورانية سليمة أثناء الراحة — تمامًا كما يُتوقع من مريضة هادئة ومستريحة.",
            },
            {
              id: "bp-emergency",
              labelEn: "The blood pressure reading is dangerously high and needs immediate treatment.",
              labelAr: "قراءة ضغط الدم مرتفعة بشكل خطير وتحتاج علاجًا فوريًا.",
              explanationEn:
                "122/80 mmHg falls within the normal blood pressure range for an adult; it is not elevated. Treating a normal reading as a hypertensive emergency would expose the patient to unnecessary intervention.",
              explanationAr:
                "قراءة 122/80 ضمن المعدل الطبيعي لضغط الدم عند البالغين، وليست مرتفعة. التعامل مع قراءة طبيعية كحالة ارتفاع ضغط طارئة يُعرّض المريضة لتدخل غير ضروري.",
            },
            {
              id: "poor-perfusion",
              labelEn: "Capillary refill under 2 seconds is a warning sign of poor circulation.",
              labelAr: "زمن امتلاء الشعيرات أقل من ثانيتين علامة تحذيرية لضعف الدورة الدموية.",
              explanationEn:
                "It's the opposite: a capillary refill time under 2 seconds is the normal, reassuring finding. A prolonged refill time (generally over 2–3 seconds) is what would raise concern about peripheral circulation.",
              explanationAr:
                "الأمر عكس ذلك: زمن امتلاء الشعيرات أقل من ثانيتين هو النتيجة الطبيعية والمطمئنة. الزمن المطوّل (عادة أكثر من 2-3 ثوانٍ) هو ما يُثير القلق بشأن الدورة الدموية الطرفية.",
            },
          ],
        },
      },
      {
        stepNumber: 7,
        instructionEn: "Continue to the next assessment.",
        instructionAr: "انتقلي إلى التقييم التالي.",
        requiredActionEn: "Decide whether any finding needs to be reported or reassessed.",
        requiredActionAr: "حدّدي ما إذا كانت أي نتيجة بحاجة إلى الإبلاغ عنها أو إعادة تقييمها.",
        choicePrompt: {
          promptEn: "Given these normal cardiovascular findings, what is the most appropriate next action?",
          promptAr: "بالنظر إلى هذه النتائج القلبية الوعائية الطبيعية، ما الإجراء التالي الأنسب؟",
          options: [
            {
              id: "document-continue",
              labelEn: "Document the findings and proceed with the routine care plan.",
              labelAr: "توثيق النتائج والمتابعة وفق خطة الرعاية الروتينية.",
              explanationEn:
                "Normal cardiovascular findings are documented just like abnormal ones — the record supports continuity of care — and the patient continues with her scheduled, routine plan.",
              explanationAr:
                "تُوثَّق النتائج القلبية الطبيعية تمامًا كغير الطبيعية — فالسجل يدعم استمرارية الرعاية — وتستمر المريضة في خطتها الروتينية المجدولة.",
            },
            {
              id: "repeat-bp",
              labelEn: "Repeat the blood pressure twice more in immediate succession to be certain.",
              labelAr: "إعادة قياس ضغط الدم مرتين متتاليتين فورًا للتأكد.",
              explanationEn:
                "Repeating a measurement immediately and repeatedly, without a specific reason to doubt the first reading, is not standard practice and can itself raise the patient's anxiety, which may then affect the next reading. A single, correctly taken measurement is sufficient when there's no indication it was inaccurate.",
              explanationAr:
                "إعادة القياس فورًا ومرارًا دون سبب محدد للشك بالقراءة الأولى ليست ممارسة معيارية، وقد تُثير قلق المريضة بحد ذاتها، مما يؤثر على القراءة التالية. قياس واحد صحيح يكفي عندما لا يوجد ما يشير إلى عدم دقته.",
            },
            {
              id: "fluid-advice",
              labelEn: "Advise the patient to reduce fluid intake based on this result.",
              labelAr: "نصح المريضة بتقليل تناول السوائل بناءً على هذه النتيجة.",
              explanationEn:
                "Nothing in these findings indicates a fluid-balance problem, and specific dietary or fluid advice should come from a full clinical assessment and the care team's plan — not be improvised from a single set of normal vital signs.",
              explanationAr:
                "لا شيء في هذه النتائج يشير إلى مشكلة في توازن السوائل، والنصائح الغذائية أو المتعلقة بالسوائل يجب أن تصدر عن تقييم سريري كامل وخطة فريق الرعاية — وليس ارتجالاً بناءً على مجموعة طبيعية واحدة من العلامات الحيوية.",
            },
          ],
        },
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
