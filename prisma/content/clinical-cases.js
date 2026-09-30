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
        // Name/age only — never gender (this case's hiddenData is written
        // in male-gendered Arabic, e.g. المريض/يده, throughout). Picked
        // once per attempt in startCaseAttempt so replaying this same case
        // doesn't always show "Ahmed, 58" — see types.ts nameAgeVariants.
        nameAgeVariants: [
          { name: { en: "Salim", ar: "سالم" }, age: 55 },
          { name: { en: "Khalid", ar: "خالد" }, age: 61 },
        ],
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
      //
      // Two authored readings (a short-interval trend), not one: the
      // student's own "Reassess vital signs shortly to check for a trend"
      // decision option (decision-points.ts, DECISION_POST_VITALS) only
      // means something if re-measuring actually shows something different.
      // The second reading is a small, same-direction continuation of the
      // first (nothing here has been treated yet at that point in the
      // interaction) — still tachycardic/hypertensive/mildly tachypneic/
      // mildly low SpO2, just slightly more so. See patient-engine.ts /
      // buildAssessmentResult for how the reading index advances.
      assessments: {
        vitalSigns: [
          {
            temperatureCelsius: 37.1,
            heartRate: 102,
            bloodPressureSystolic: 148,
            bloodPressureDiastolic: 92,
            respiratoryRate: 22,
            oxygenSaturation: 95,
          },
          {
            temperatureCelsius: 37.1,
            heartRate: 108,
            bloodPressureSystolic: 152,
            bloodPressureDiastolic: 94,
            respiratoryRate: 23,
            oxygenSaturation: 94,
          },
        ],
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
        // Name/age only — never gender (this case's hiddenData is written
        // in female-gendered Arabic, e.g. المريضة, throughout). See
        // types.ts nameAgeVariants and the chest-pain-adult case above.
        nameAgeVariants: [
          { name: { en: "Noor", ar: "نور" }, age: 22 },
          { name: { en: "Reem", ar: "ريم" }, age: 27 },
        ],
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
      // Two authored readings (a short-interval trend) — same rationale as
      // chest-pain-adult above: the "Reassess vital signs shortly" decision
      // option (DECISION_RESP_POST_VITALS) needs a real second reading to
      // reveal. Still tachypneic/mildly tachycardic/mildly low SpO2, just
      // slightly more so — nothing has been treated yet at that point.
      assessments: {
        vitalSigns: [
          {
            temperatureCelsius: 37.0,
            heartRate: 108,
            bloodPressureSystolic: 122,
            bloodPressureDiastolic: 78,
            respiratoryRate: 26,
            oxygenSaturation: 93,
          },
          {
            temperatureCelsius: 37.0,
            heartRate: 114,
            bloodPressureSystolic: 124,
            bloodPressureDiastolic: 80,
            respiratoryRate: 28,
            oxygenSaturation: 92,
          },
        ],
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
  {
    // Third case — deliberately a different learning pattern from the
    // first two: an abdominal (not cardiac/respiratory) presentation,
    // where the single most important clue is the pain's LOCATION
    // changing over the interview (migrating from the navel to the right
    // lower quadrant), not just its severity. Vital signs are only mildly
    // abnormal on their own (low-grade fever, mild tachycardia) — the
    // point is that the pattern of findings together, not one striking
    // number, is what calls for prompt communication.
    slug: "abdominal-pain-adult",
    titleEn: "Acute Abdominal Pain — Adult Patient",
    titleAr: "ألم بطني حاد — مريضة بالغة",
    descriptionEn:
      "A fictional educational case: a young adult presents with worsening abdominal pain that has migrated over several hours. Practice structured pain history-taking and recognizing a pattern that calls for prompt escalation.",
    descriptionAr:
      "حالة تعليمية افتراضية: مريضة بالغة شابة تصل وهي تعاني من ألم بطني متزايد انتقل مكانه خلال عدة ساعات. تدرّبي على أخذ تاريخ منظم للألم والتعرّف على النمط الذي يستدعي تصعيدًا سريعًا.",
    difficulty: "INTERMEDIATE",
    category: "GASTROINTESTINAL",
    order: 3,
    visibleData: {
      patientProfile: {
        age: 27,
        gender: "female",
        setting: { en: "Emergency department", ar: "قسم الطوارئ" },
        name: { en: "Salma", ar: "سلمى" },
        personality: { en: "Cooperative but in visible discomfort", ar: "متعاونة لكن يبدو عليها الانزعاج بوضوح" },
        communicationStyle: {
          en: "Lies still, winces and pauses when the pain spikes",
          ar: "تستلقي ساكنة، وتتألم وتتوقف عن الكلام عند اشتداد الألم",
        },
        initialEmotionalState: "UNCOMFORTABLE",
        // Name/age only — never gender (this case's hiddenData is written
        // in female-gendered Arabic throughout). See types.ts
        // nameAgeVariants.
        nameAgeVariants: [
          { name: { en: "Aisha", ar: "عائشة" }, age: 24 },
          { name: { en: "Muna", ar: "منى" }, age: 31 },
        ],
      },
      chiefComplaint: {
        en: "\"I have this awful pain in my lower belly, and it keeps getting worse.\"",
        ar: "«عندي ألم رهيب في أسفل بطني، وهو يزداد سوءًا.»",
      },
      presentingSymptoms: [
        { en: "Abdominal pain, started about 6 hours ago", ar: "ألم بطني بدأ منذ حوالي 6 ساعات" },
        { en: "Nausea with one episode of vomiting", ar: "غثيان مع نوبة تقيؤ واحدة" },
        { en: "Loss of appetite", ar: "فقدان الشهية" },
        { en: "Feels warm/feverish", ar: "تشعر بالسخونة/الحمى" },
        { en: "Pain worse with movement or coughing", ar: "يزداد الألم مع الحركة أو السعال" },
      ],
      learningObjectives: [
        {
          en: "Recognize why the location and pattern of abdominal pain (not just its severity) matters in a first assessment.",
          ar: "التعرّف على أهمية مكان الألم البطني ونمط تطوّره (لا شدته فقط) أثناء التقييم الأولي.",
        },
        {
          en: "Take a structured, symptom-focused pain history.",
          ar: "أخذ تاريخ منظم يركّز على أعراض الألم.",
        },
        {
          en: "Practice prioritizing a safe nursing action based on the combined pattern of findings, not one reassuring vital sign alone.",
          ar: "التدرّب على تحديد أولوية إجراء تمريضي آمن بناءً على نمط النتائج مجتمعة، لا علامة حيوية واحدة مطمئنة بمفردها.",
        },
      ],
    },
    hiddenData: {
      medicalHistory: [{ en: "No significant past medical history", ar: "لا يوجد تاريخ مرضي سابق ذو أهمية" }],
      medications: [{ en: "Occasional paracetamol for headaches", ar: "باراسيتامول بين الحين والآخر للصداع" }],
      allergies: [{ en: "No known drug allergies", ar: "لا توجد حساسية دوائية معروفة" }],
      familyHistory: [{ en: "No family history of gastrointestinal disease", ar: "لا يوجد تاريخ عائلي لأمراض الجهاز الهضمي" }],
      socialHistory: [
        { en: "University student, non-smoker", ar: "طالبة جامعية، غير مدخّنة" },
        { en: "Lives with family", ar: "تسكن مع عائلتها" },
      ],
      clinicalClues: [
        {
          en: "Pain reportedly started around the navel and has since moved toward the right lower abdomen",
          ar: "بدأ الألم حول السرّة على حد قولها ثم انتقل نحو أسفل يمين البطن",
        },
        {
          en: "Pain worsens with movement, coughing, or pressing on the area",
          ar: "يزداد الألم مع الحركة أو السعال أو الضغط على المنطقة",
        },
      ],
      redFlags: [
        {
          en: "Localized right lower quadrant tenderness together with a migrating pain pattern, low-grade fever, and vomiting together suggest a condition requiring prompt physician evaluation, not routine observation",
          ar: "الألم الموضعي في أسفل يمين البطن مع نمط الألم المهاجر والحمى الخفيفة والتقيؤ مجتمعة تشير إلى حالة تستدعي تقييمًا طبيًا سريعًا لا مجرد ملاحظة روتينية",
        },
      ],
      possibleDiagnoses: [
        { en: "Acute appendicitis", ar: "التهاب الزائدة الدودية الحاد" },
        { en: "Gastroenteritis", ar: "التهاب المعدة والأمعاء" },
        { en: "Ovarian cyst (torsion or rupture)", ar: "كيس مبيضي (التواء أو تمزق)" },
        { en: "Urinary tract infection", ar: "التهاب المسالك البولية" },
      ],
      expectedQuestions: [
        { en: "When exactly did the pain start, and where did it begin?", ar: "متى بدأ الألم بالضبط، وأين بدأ؟" },
        { en: "Has the pain moved or changed since it started?", ar: "هل تغيّر مكان الألم أو طبيعته منذ أن بدأ؟" },
        { en: "Have you had any nausea, vomiting, or changes in appetite?", ar: "هل شعرتِ بغثيان أو تقيؤ أو تغيّر في الشهية؟" },
        { en: "Is there any chance you could be pregnant?", ar: "هل هناك احتمال أن تكوني حاملاً؟" },
      ],
      debriefing: {
        en: "This presentation — pain that started around the navel and migrated to the right lower quadrant, together with nausea, vomiting, and a low-grade fever — is a classic pattern nursing education asks you to recognize as needing prompt physician evaluation rather than reassurance or routine monitoring. This is a fictional educational scenario, not medical guidance for a real patient.",
        ar: "هذا العرض — الألم الذي بدأ حول السرّة وانتقل إلى أسفل يمين البطن، مع الغثيان والتقيؤ وحمى خفيفة — هو نمط كلاسيكي يطلب منكِ التعليم التمريضي التعرّف عليه كحالة تستدعي تقييمًا طبيًا سريعًا بدلاً من الطمأنة أو المراقبة الروتينية. هذا سيناريو تعليمي افتراضي، وليس توجيهًا طبيًا لحالة مريضة حقيقية.",
      },
      interviewResponses: {
        ONSET: { en: "It started about 6 hours ago, first around my belly button.", ar: "بدأ منذ حوالي 6 ساعات، حول سرّتي أولاً." },
        LOCATION: {
          en: "It was around my navel at first, but now it's more toward my lower right side.",
          ar: "كان حول سرّتي في البداية، لكنه الآن أكثر نحو أسفل جانبي الأيمن.",
        },
        DURATION: { en: "It's been going on for about 6 hours and keeps getting worse.", ar: "استمر لحوالي 6 ساعات ويزداد سوءًا باستمرار." },
        CHARACTER: { en: "It's a constant, dull ache that gets sharp when I move.", ar: "إنه ألم خفيف مستمر يصبح حادًا عندما أتحرك." },
        SEVERITY: { en: "It's really bad now, maybe 8 out of 10.", ar: "إنه سيء جدًا الآن، ربما 8 من 10." },
        TIMING: { en: "It hasn't stopped since it started, just gotten worse.", ar: "لم يتوقف منذ أن بدأ، فقط ازداد سوءًا." },
        AGGRAVATING_FACTORS: { en: "Walking, coughing, and pressing on my belly all make it worse.", ar: "المشي والسعال والضغط على بطني كلها تزيد الألم." },
        RELIEVING_FACTORS: { en: "Staying still and curling up a little helps a bit.", ar: "البقاء ساكنة والانحناء قليلاً يساعد شوي." },
        CHIEF_COMPLAINT: {
          en: "I have this awful pain in my lower belly and it keeps getting worse.",
          ar: "عندي ألم رهيب في أسفل بطني وهو يزداد سوءًا.",
        },
      },
      // Two authored readings (a short-interval trend) — same rationale as
      // the other two cases: the "Reassess" decision option needs a real
      // second reading to reveal. Mild fever/tachycardia, both nudging
      // slightly further in the same direction on reassessment.
      assessments: {
        vitalSigns: [
          {
            temperatureCelsius: 37.8,
            heartRate: 96,
            bloodPressureSystolic: 118,
            bloodPressureDiastolic: 76,
            respiratoryRate: 18,
            oxygenSaturation: 98,
          },
          {
            temperatureCelsius: 38.1,
            heartRate: 102,
            bloodPressureSystolic: 116,
            bloodPressureDiastolic: 74,
            respiratoryRate: 20,
            oxygenSaturation: 97,
          },
        ],
        physicalExaminations: {
          GENERAL_INSPECTION: {
            en: "The patient is lying still with her knees drawn up, wincing with movement.",
            ar: "تستلقي المريضة ساكنة وركبتاها مثنيتان، وتتألم عند الحركة.",
          },
          RESPIRATORY: {
            en: "Respiratory effort is normal, with clear breath sounds bilaterally.",
            ar: "الجهد التنفسي طبيعي، مع أصوات تنفس صافية في الجانبين.",
          },
          CARDIOVASCULAR: {
            en: "Heart rate is mildly elevated with a regular rhythm. Peripheral pulses are strong and equal.",
            ar: "معدل ضربات القلب مرتفع بشكل طفيف مع انتظام النظم. النبضات المحيطية قوية ومتساوية.",
          },
          PAIN: {
            en: "The patient rates the pain as 8 out of 10, localized to the right lower abdomen, worse with movement.",
            ar: "تصف المريضة الألم بأنه 8 من 10، موضعي في أسفل يمين البطن، ويزداد مع الحركة.",
          },
          PALPATION: {
            en: "Tenderness on palpation of the right lower quadrant, with guarding. No palpable masses.",
            ar: "ألم عند الجس في أسفل يمين البطن، مع تيبّس وقائي (Guarding). لا توجد كتل محسوسة.",
          },
          AUSCULTATION: {
            en: "Bowel sounds are present but reduced in frequency.",
            ar: "أصوات الأمعاء موجودة لكن بتكرار أقل من الطبيعي.",
          },
        },
      },
    },
  },
];

module.exports = { clinicalCases };
