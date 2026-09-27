// Sample clinical case content for Phase 2A (Clinical Case Engine
// Foundation). Entirely fictional and written for nursing-education
// purposes only — not a real patient, chart, or record.
//
// Each entry's `visibleData` is safe to show a student before/at case
// start; `hiddenData` must stay server-only until a future simulation
// phase reveals it progressively (see lib/clinical-cases/types.ts for the
// exact shapes, and lib/clinical-cases/queries.ts for the access split).

const clinicalCases = [
  {
    slug: "chest-pain-adult",
    titleEn: "Chest Pain — Adult Patient",
    titleAr: "ألم في الصدر — مريض بالغ",
    descriptionEn:
      "A fictional educational case: an adult presents to the emergency department with chest pain. Practice structured history-taking and clinical reasoning.",
    descriptionAr:
      "حالة تعليمية افتراضية: مريض بالغ يصل إلى قسم الطوارئ يشكو من ألم في الصدر. تدرّب على أخذ التاريخ المرضي المنظم والتفكير السريري.",
    difficulty: "INTERMEDIATE",
    category: "CARDIOVASCULAR",
    order: 1,
    visibleData: {
      patientProfile: {
        age: 58,
        gender: "male",
        setting: { en: "Emergency department", ar: "قسم الطوارئ" },
        name: { en: "Ahmed", ar: "أحمد" },
        personality: { en: "Cooperative but worried", ar: "متعاون لكنه قلق" },
        communicationStyle: { en: "Direct, gives short answers", ar: "مباشر، يعطي إجابات قصيرة" },
        initialEmotionalState: "ANXIOUS",
      },
      chiefComplaint: {
        en: "\"I've had this crushing pain in my chest for the last hour.\"",
        ar: "«أشعر بألم ضاغط في صدري منذ ساعة تقريبًا.»",
      },
      presentingSymptoms: [
        { en: "Crushing central chest pain, started ~1 hour ago", ar: "ألم ضاغط في وسط الصدر بدأ منذ نحو ساعة" },
        { en: "Pain radiating to the left arm", ar: "الألم ينتشر إلى الذراع اليسرى" },
        { en: "Shortness of breath", ar: "ضيق في التنفس" },
        { en: "Sweating (diaphoresis)", ar: "تعرّق شديد" },
        { en: "Mild nausea", ar: "غثيان خفيف" },
      ],
      learningObjectives: [
        {
          en: "Take a structured, symptom-focused history for a patient with chest pain.",
          ar: "أخذ تاريخ مرضي منظم يركّز على أعراض ألم الصدر.",
        },
        {
          en: "Recognize red-flag features that suggest an acute coronary event.",
          ar: "التعرّف على العلامات الخطرة التي تشير إلى حدث قلبي حاد.",
        },
        {
          en: "Practice forming a differential diagnosis before jumping to conclusions.",
          ar: "التدرّب على تكوين تشخيص تفريقي قبل القفز إلى الاستنتاجات.",
        },
      ],
    },
    hiddenData: {
      medicalHistory: [
        { en: "Hypertension, diagnosed 6 years ago", ar: "ارتفاع ضغط الدم، تم تشخيصه منذ 6 سنوات" },
        { en: "Type 2 diabetes mellitus, diagnosed 3 years ago", ar: "داء السكري من النوع الثاني، تم تشخيصه منذ 3 سنوات" },
      ],
      medications: [
        { en: "Amlodipine 5mg daily", ar: "أملوديبين 5 ملغ يوميًا" },
        { en: "Metformin 500mg twice daily", ar: "ميتفورمين 500 ملغ مرتين يوميًا" },
      ],
      allergies: [{ en: "No known drug allergies", ar: "لا توجد حساسية دوائية معروفة" }],
      familyHistory: [
        { en: "Father had a heart attack at age 60", ar: "الوالد أصيب بنوبة قلبية في عمر الستين" },
      ],
      socialHistory: [
        { en: "Smokes about 10 cigarettes/day for 20 years", ar: "يدخّن نحو 10 سجائر يوميًا منذ 20 عامًا" },
        { en: "Sedentary office job", ar: "وظيفة مكتبية قليلة الحركة" },
      ],
      clinicalClues: [
        { en: "Pain worsens with exertion, unrelieved by rest so far", ar: "يزداد الألم مع الجهد ولم يخف بالراحة حتى الآن" },
        { en: "No relief with antacids (rules against simple indigestion)", ar: "لم يتحسّن الألم بمضادات الحموضة (يستبعد عسر الهضم البسيط)" },
      ],
      redFlags: [
        { en: "Radiation to the arm + diaphoresis + exertional onset — classic acute coronary syndrome pattern", ar: "الانتشار إلى الذراع مع التعرّق وبدء الألم بالجهد — نمط كلاسيكي لمتلازمة الشريان التاجي الحادة" },
      ],
      possibleDiagnoses: [
        { en: "Acute coronary syndrome (unstable angina / myocardial infarction)", ar: "متلازمة الشريان التاجي الحادة (الذبحة غير المستقرة / احتشاء عضلة القلب)" },
        { en: "Gastroesophageal reflux disease", ar: "مرض الارتجاع المعدي المريئي" },
        { en: "Musculoskeletal chest wall pain", ar: "ألم في جدار الصدر ذو منشأ عضلي هيكلي" },
        { en: "Anxiety / panic attack", ar: "نوبة قلق أو هلع" },
      ],
      expectedQuestions: [
        { en: "When exactly did the pain start, and what were you doing?", ar: "متى بدأ الألم بالضبط، وما كنت تفعل؟" },
        { en: "Does anything make the pain better or worse?", ar: "هل يوجد ما يخفف الألم أو يزيده؟" },
        { en: "Have you ever had chest pain like this before?", ar: "هل سبق أن شعرت بألم كهذا من قبل؟" },
        { en: "Do you smoke, and do you have any heart-related family history?", ar: "هل تدخّن، وهل يوجد تاريخ عائلي مرتبط بالقلب؟" },
      ],
      debriefing: {
        en: "This presentation — exertional onset, radiation to the arm, diaphoresis, and cardiac risk factors (smoking, hypertension, diabetes, family history) — should raise strong suspicion for acute coronary syndrome and prompt urgent escalation rather than reassurance. This is a fictional educational scenario, not medical guidance for a real patient.",
        ar: "هذا العرض — بدء الألم مع الجهد، وانتشاره إلى الذراع، والتعرّق، وعوامل الخطر القلبية (التدخين، ارتفاع الضغط، السكري، التاريخ العائلي) — يجب أن يرفع الشك بقوة تجاه متلازمة الشريان التاجي الحادة، ويستدعي تصعيدًا عاجلاً لا طمأنة المريض. هذا سيناريو تعليمي افتراضي، وليس توجيهًا طبيًا لحالة مريض حقيقي.",
      },
      // Phase 2B — scripted, in-character answers for the deterministic
      // patient engine (Step 4/5/6). Only categories with a distinct
      // scripted line beyond the raw data arrays above need an entry
      // here; history-type categories are derived automatically instead
      // (see lib/clinical-cases/patient-engine.ts).
      interviewResponses: {
        ONSET: { en: "It started this morning, while I was walking.", ar: "بدأ هذا الصباح وأنا أمشي." },
        LOCATION: { en: "It is in the center of my chest.", ar: "هو في وسط صدري." },
        DURATION: { en: "It's been about an hour now, it hasn't gone away.", ar: "منذ حوالي ساعة الآن، ولم يختفِ." },
        CHARACTER: { en: "It feels like something heavy is pressing on my chest.", ar: "أشعر كأن شيئًا ثقيلًا يضغط على صدري." },
        SEVERITY: { en: "It's quite bad — I'd say around 7 out of 10.", ar: "إنه شديد إلى حد ما — أقول حوالي 7 من 10." },
        TIMING: { en: "It's been constant since it started, not coming and going.", ar: "مستمر منذ أن بدأ، لا يجي ويروح." },
        AGGRAVATING_FACTORS: { en: "It gets worse when I walk or move around.", ar: "يزداد سوءًا عندما أمشي أو أتحرك." },
        RELIEVING_FACTORS: { en: "Resting a bit seems to help slightly, but it doesn't go away.", ar: "الراحة قليلاً تساعد بعض الشيء، لكنه لا يختفي." },
        CHIEF_COMPLAINT: { en: "I've had this crushing pain in my chest for the last hour.", ar: "أشعر بألم ضاغط في صدري منذ ساعة تقريبًا." },
      },
      // Phase 2C — hidden until explicitly requested via "Measure Vital
      // Signs" / a physical-examination action (Step 2/3/6/7). Values are
      // fixed and clinically consistent with this case's narrative
      // (tachycardic, hypertensive, mildly tachypneic, mildly low SpO2,
      // no fever) — never randomized, never client-supplied. Findings are
      // plain observations only, with no diagnosis or interpretation.
      assessments: {
        vitalSigns: {
          temperatureCelsius: 37.1,
          heartRate: 102,
          bloodPressureSystolic: 148,
          bloodPressureDiastolic: 92,
          respiratoryRate: 22,
          oxygenSaturation: 95,
        },
        physicalExaminations: {
          GENERAL_INSPECTION: {
            en: "The patient appears anxious and diaphoretic, holding a hand over the center of his chest.",
            ar: "يبدو على المريض القلق والتعرّق، ويضع يده على وسط صدره.",
          },
          RESPIRATORY: {
            en: "Crackles heard in the lower lung fields. Respiratory effort is otherwise normal.",
            ar: "سُمعت أصوات فرقعة (Crackles) في قاعدتي الرئتين. الجهد التنفسي طبيعي فيما عدا ذلك.",
          },
          CARDIOVASCULAR: {
            en: "Heart rate is elevated. Peripheral pulses are strong and equal. No visible jugular venous distension.",
            ar: "معدل ضربات القلب مرتفع. النبضات المحيطية قوية ومتساوية. لا يوجد احتقان وريدي وداجي ظاهر.",
          },
          PAIN: {
            en: "The patient continues to rate the pain as severe (7 out of 10), unrelieved by rest or position change.",
            ar: "لا يزال المريض يصف الألم بأنه شديد (7 من 10)، ولم يتحسّن بالراحة أو تغيير الوضعية.",
          },
          PALPATION: {
            en: "No chest wall tenderness, swelling, or masses on palpation.",
            ar: "لا يوجد ألم عند الجس، ولا تورّم أو كتل في جدار الصدر.",
          },
          AUSCULTATION: {
            en: "Heart sounds S1 and S2 are normal, with no murmurs, rubs, or gallops.",
            ar: "صوتا القلب S1 و S2 طبيعيان، دون أي لغط أو أصوات احتكاك أو أصوات إضافية.",
          },
        },
      },
    },
  },
];

module.exports = { clinicalCases };
