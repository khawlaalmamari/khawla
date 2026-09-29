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
  {
    // Phase 3G-2 — second case, deliberately a different learning pattern
    // from chest-pain-adult: a young, otherwise well, known-asthmatic
    // patient with an acute asthma exacerbation. Vital signs and exam
    // findings are respiratory-led (tachypnea, mild tachycardia from
    // effort, mildly reduced SpO2, near-normal blood pressure) rather than
    // the cardiovascular-led pattern of chest-pain-adult, so the same
    // "observe -> assess -> decide -> explain -> reason -> reflect" loop
    // exercises a genuinely different set of findings and a different
    // (non-cardiac) safe nursing action.
    slug: "shortness-of-breath-adult",
    titleEn: "Shortness of Breath — Adult Patient",
    titleAr: "ضيق التنفس — مريضة بالغة",
    descriptionEn:
      "A fictional educational case: a young adult with known asthma presents with acute shortness of breath and wheezing. Practice structured respiratory assessment and safe nursing decision-making.",
    descriptionAr:
      "حالة تعليمية افتراضية: مريضة بالغة شابة معروف أنها مصابة بالربو تصل وهي تعاني من ضيق تنفس حاد وصفير في الصدر. تدرّبي على التقييم التنفسي المنظم واتخاذ قرار تمريضي آمن.",
    difficulty: "BEGINNER",
    category: "RESPIRATORY",
    order: 2,
    visibleData: {
      patientProfile: {
        age: 24,
        gender: "female",
        setting: { en: "Outpatient/walk-in clinic", ar: "عيادة المراجعين الخارجية" },
        name: { en: "Maha", ar: "مها" },
        personality: { en: "Cooperative but visibly anxious", ar: "متعاونة لكنها قلقة بوضوح" },
        communicationStyle: {
          en: "Speaks in short phrases, pauses to catch her breath",
          ar: "تتحدث بعبارات قصيرة، وتتوقف لالتقاط أنفاسها",
        },
        initialEmotionalState: "ANXIOUS",
      },
      chiefComplaint: {
        en: "\"I can't... catch my breath... my chest feels tight.\"",
        ar: "«لا أستطيع... التقاط أنفاسي... صدري يشعر بضيق.»",
      },
      presentingSymptoms: [
        { en: "Shortness of breath, started about 30 minutes ago", ar: "ضيق في التنفس بدأ منذ نحو 30 دقيقة" },
        { en: "Audible wheeze when breathing out", ar: "صفير مسموع عند الزفير" },
        { en: "Chest tightness", ar: "شعور بضيق في الصدر" },
        { en: "Mild dry cough", ar: "سعال جاف خفيف" },
        { en: "Used her reliever inhaler at home with only partial relief", ar: "استخدمت بخاخها المخفف في المنزل دون تحسّن كامل" },
      ],
      learningObjectives: [
        {
          en: "Recognize observable signs of respiratory distress during a first assessment.",
          ar: "التعرّف على العلامات الظاهرة لضيق التنفس أثناء التقييم الأولي.",
        },
        {
          en: "Take a structured, symptom-focused respiratory history.",
          ar: "أخذ تاريخ مرضي منظم يركّز على أعراض الجهاز التنفسي.",
        },
        {
          en: "Practice prioritizing a safe nursing action based on combined findings, not a single value alone.",
          ar: "التدرّب على تحديد أولوية إجراء تمريضي آمن بناءً على مجموع النتائج، لا قيمة واحدة بمفردها.",
        },
      ],
    },
    hiddenData: {
      medicalHistory: [
        { en: "Asthma, diagnosed in childhood, usually well controlled", ar: "الربو، تم تشخيصه في الطفولة، وعادة ما يكون مضبوطًا جيدًا" },
      ],
      medications: [
        { en: "Salbutamol inhaler (reliever), as needed", ar: "بخاخ سالبوتامول (موسّع للشعب الهوائية، للاستخدام عند الحاجة)" },
        { en: "Fluticasone inhaler (preventer), twice daily", ar: "بخاخ فلوتيكازون (وقائي)، مرتين يوميًا" },
      ],
      allergies: [{ en: "No known drug allergies", ar: "لا توجد حساسية دوائية معروفة" }],
      familyHistory: [{ en: "Mother also has asthma", ar: "الوالدة مصابة بالربو أيضًا" }],
      socialHistory: [
        { en: "University student, non-smoker", ar: "طالبة جامعية، غير مدخّنة" },
        { en: "Lives in an older building with noticeable dust", ar: "تسكن في مبنى قديم فيه غبار ملحوظ" },
      ],
      clinicalClues: [
        { en: "Symptoms began while cleaning a dusty room, shortly after climbing stairs", ar: "بدأت الأعراض أثناء تنظيف غرفة مليئة بالغبار، بعد صعود السلالم بوقت قصير" },
        { en: "Only partial relief from her usual reliever inhaler so far", ar: "لم تشعر إلا بتحسّن جزئي من بخاخها المخفف المعتاد حتى الآن" },
      ],
      redFlags: [
        {
          en: "Speaking in short phrases, visible use of accessory neck muscles, and mildly reduced oxygen saturation together suggest at least a moderate asthma exacerbation",
          ar: "التحدث بعبارات قصيرة، مع استخدام واضح لعضلات الرقبة المساعدة على التنفس، وانخفاض طفيف في تشبع الأكسجين — كلها معًا تشير إلى نوبة ربو متوسطة الشدة على الأقل",
        },
      ],
      possibleDiagnoses: [
        { en: "Acute asthma exacerbation", ar: "نوبة ربو حادة" },
        { en: "Allergic reaction with bronchospasm", ar: "تفاعل تحسسي مصحوب بتشنج قصبي" },
        { en: "Anxiety-related hyperventilation", ar: "فرط تهوية مرتبط بالقلق" },
        { en: "Early respiratory infection", ar: "عدوى تنفسية مبكرة" },
      ],
      expectedQuestions: [
        { en: "When exactly did the breathlessness start, and what were you doing?", ar: "متى بدأ ضيق التنفس بالضبط، وما كنتِ تفعلين؟" },
        { en: "Have you used your inhaler, and did it help?", ar: "هل استخدمتِ بخاخكِ، وهل ساعدك؟" },
        { en: "Do you have a history of asthma or other breathing problems?", ar: "هل لديكِ تاريخ من الربو أو مشاكل تنفسية أخرى؟" },
        { en: "Is there anything around you that may have triggered this, like dust or an allergen?", ar: "هل يوجد شيء حولكِ قد يكون سببًا لهذا، كالغبار أو مسبب حساسية؟" },
      ],
      debriefing: {
        en: "This presentation — audible wheeze, chest tightness, short-phrase speech, accessory muscle use, and only partial relief from her usual reliever inhaler — is consistent with a moderate asthma exacerbation that needs active nursing follow-up rather than routine observation alone. This is a fictional educational scenario, not medical guidance for a real patient.",
        ar: "هذا العرض — الصفير المسموع، وضيق الصدر، والتحدث بعبارات قصيرة، واستخدام عضلات التنفس المساعدة، والتحسّن الجزئي فقط من بخاخها المخفف المعتاد — يتوافق مع نوبة ربو متوسطة الشدة تحتاج متابعة تمريضية فعّالة لا مجرد ملاحظة روتينية. هذا سيناريو تعليمي افتراضي، وليس توجيهًا طبيًا لحالة مريضة حقيقية.",
      },
      interviewResponses: {
        ONSET: { en: "It started about 30 minutes ago, while I was cleaning.", ar: "بدأ منذ حوالي 30 دقيقة، بينما كنت أنظّف." },
        LOCATION: { en: "The tightness is across my whole chest.", ar: "الضيق منتشر في كل صدري." },
        DURATION: { en: "It's been going on for about half an hour now.", ar: "استمر الأمر منذ نحو نصف ساعة الآن." },
        CHARACTER: { en: "My chest feels tight, and I can hear myself wheezing.", ar: "أشعر بضيق في صدري، وأسمع صفيرًا عندما أتنفس." },
        SEVERITY: { en: "It's pretty bad, I can only say a few words at a time.", ar: "الأمر سيء إلى حد ما، لا أستطيع قول سوى كلمات قليلة في المرة الواحدة." },
        TIMING: { en: "It hasn't gone away since it started.", ar: "لم يختفِ منذ أن بدأ." },
        AGGRAVATING_FACTORS: { en: "Moving around or talking too much makes it worse.", ar: "الحركة أو الكلام الكثير يزيد الأمر سوءًا." },
        RELIEVING_FACTORS: { en: "My inhaler helped a little, but not completely.", ar: "بخاخي ساعدني قليلاً، لكن ليس بشكل كامل." },
        CHIEF_COMPLAINT: {
          en: "I can't catch my breath and my chest feels tight.",
          ar: "لا أستطيع التقاط أنفاسي وصدري يشعر بضيق.",
        },
      },
      assessments: {
        vitalSigns: {
          temperatureCelsius: 37.0,
          heartRate: 108,
          bloodPressureSystolic: 122,
          bloodPressureDiastolic: 78,
          respiratoryRate: 26,
          oxygenSaturation: 93,
        },
        physicalExaminations: {
          GENERAL_INSPECTION: {
            en: "The patient is sitting upright, leaning slightly forward, speaking in short phrases with visible use of accessory neck muscles.",
            ar: "تجلس المريضة منتصبة ومائلة قليلاً إلى الأمام، تتحدث بعبارات قصيرة مع استخدام واضح لعضلات الرقبة المساعدة على التنفس.",
          },
          RESPIRATORY: {
            en: "Bilateral expiratory wheeze on auscultation, with a prolonged expiratory phase. No crackles.",
            ar: "صفير زفيري ثنائي الجانب عند التسمّع، مع إطالة في مرحلة الزفير. لا توجد أصوات فرقعة (Crackles).",
          },
          CARDIOVASCULAR: {
            en: "Heart rate is mildly elevated with a regular rhythm. Peripheral pulses are strong and equal.",
            ar: "معدل ضربات القلب مرتفع بشكل طفيف مع انتظام النظم. النبضات المحيطية قوية ومتساوية.",
          },
          PAIN: {
            en: "The patient describes chest tightness rather than sharp pain, worsened by the effort of breathing.",
            ar: "تصف المريضة شعورًا بالضيق في الصدر وليس ألمًا حادًا، ويزداد مع جهد التنفس.",
          },
          PALPATION: {
            en: "Chest wall is non-tender, with equal and symmetric chest expansion.",
            ar: "جدار الصدر غير مؤلم عند الجس، مع تمدد متساوٍ ومتناظر للصدر.",
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
