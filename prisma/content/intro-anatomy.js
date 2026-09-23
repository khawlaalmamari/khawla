// Real, written-from-scratch educational content for "Introduction to Human
// Anatomy" (Anatomy course, module 1). Same sourcing approach as
// skeletal-system.js: standard textbook-level anatomy knowledge, with
// further-reading references to open resources rather than any claim of
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 1: An Introduction to the Human Body",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Patient Positioning\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK513320/",
  },
];

const lessons = [
  {
    slug: "intro-anatomy-overview",
    order: 1,
    titleEn: "What Is Anatomy?",
    titleAr: "ما هو علم التشريح؟",
    objectivesEn: [
      "Define anatomy and distinguish its major branches.",
      "List the levels of structural organization of the human body.",
      "Explain why studying anatomy is essential to nursing practice.",
    ],
    objectivesAr: [
      "تعريف علم التشريح والتمييز بين فروعه الرئيسية.",
      "سرد مستويات التنظيم البنيوي لجسم الإنسان.",
      "شرح أهمية دراسة التشريح للممارسة التمريضية.",
    ],
    contentEn: `## What Is Anatomy?
**Anatomy** is the scientific study of the structure of the body and the relationships among its parts. It answers the question "what is it, and where is it?" — complementing physiology, which asks "how does it work?"

## Branches of Anatomy
- **Gross (macroscopic) anatomy**: structures visible to the naked eye.
  - *Regional anatomy*: studying all structures in one body region at once (e.g., the abdomen).
  - *Systemic anatomy*: studying the body system by system (e.g., the entire cardiovascular system).
  - *Surface anatomy*: studying external, visible landmarks to understand internal structures (important for physical examination).
- **Microscopic anatomy**: structures too small to see without magnification, including **cytology** (study of cells) and **histology** (study of tissues).

## Levels of Structural Organization
The body is organized into increasingly complex levels:
1. **Chemical level** – atoms combine to form molecules (e.g., water, proteins, DNA).
2. **Cellular level** – molecules form cells, the smallest units of life.
3. **Tissue level** – groups of similar cells performing a common function.
4. **Organ level** – two or more tissue types working together for a specific function (e.g., the heart).
5. **Organ system level** – organs that work together for a common purpose (e.g., the cardiovascular system).
6. **Organismal level** – all systems combine to make a functioning individual.

## Why Anatomy Matters for Nursing Practice
Nurses use anatomical knowledge every day: to correctly locate landmarks for physical assessment, to understand where symptoms likely originate, to safely perform procedures, and to communicate precisely with other providers using standard terminology.`,
    contentAr: `## ما هو علم التشريح؟
**علم التشريح** هو الدراسة العلمية لتركيب الجسم والعلاقات بين أجزائه. يجيب عن سؤال "ما هو، وأين يقع؟" — وهو مكمّل لعلم وظائف الأعضاء الذي يجيب عن سؤال "كيف يعمل؟"

## فروع علم التشريح
- **التشريح العياني (الكلي)**: البنى المرئية بالعين المجردة.
  - *التشريح الإقليمي*: دراسة جميع البنى في منطقة واحدة من الجسم في آنٍ واحد (مثل البطن).
  - *التشريح الجهازي*: دراسة الجسم جهازًا بجهاز (مثل الجهاز القلبي الوعائي بالكامل).
  - *تشريح السطح*: دراسة المعالم الخارجية المرئية لفهم البنى الداخلية (مهم للفحص السريري).
- **التشريح المجهري**: البنى الصغيرة جدًا التي لا تُرى دون تكبير، ويشمل **علم الخلية** (دراسة الخلايا) و**علم الأنسجة** (دراسة الأنسجة).

## مستويات التنظيم البنيوي
يُنظَّم الجسم في مستويات متزايدة التعقيد:
1. **المستوى الكيميائي** – تتحد الذرات لتشكّل الجزيئات (مثل الماء والبروتينات والحمض النووي).
2. **المستوى الخلوي** – تشكّل الجزيئات الخلايا، وهي أصغر وحدات الحياة.
3. **مستوى الأنسجة** – مجموعات من الخلايا المتشابهة تؤدي وظيفة مشتركة.
4. **مستوى الأعضاء** – نوعان أو أكثر من الأنسجة تعمل معًا لأداء وظيفة محددة (مثل القلب).
5. **مستوى الأجهزة** – أعضاء تعمل معًا لتحقيق غرض مشترك (مثل الجهاز القلبي الوعائي).
6. **المستوى الكائني** – تجتمع جميع الأجهزة لتكوين فرد يعمل بشكل متكامل.

## لماذا يهم علم التشريح الممارسة التمريضية؟
يستخدم الممرضون المعرفة التشريحية يوميًا: لتحديد المعالم بدقة أثناء الفحص السريري، ولفهم مصدر الأعراض على الأرجح، ولأداء الإجراءات بأمان، وللتواصل بدقة مع مقدمي الرعاية الآخرين باستخدام مصطلحات موحدة.`,
    terms: [
      { en: "Gross anatomy", ar: "التشريح العياني" },
      { en: "Histology", ar: "علم الأنسجة" },
      { en: "Cytology", ar: "علم الخلية" },
      { en: "Organ system", ar: "الجهاز العضوي" },
      { en: "Systemic anatomy", ar: "التشريح الجهازي" },
    ],
    summaryEn:
      "Anatomy studies body structure at levels from chemical to organismal, through gross and microscopic branches. This knowledge underlies safe, precise nursing practice.",
    summaryAr:
      "يدرس علم التشريح بنية الجسم عبر مستويات من الكيميائي إلى الكائني، من خلال فرعيه العياني والمجهري. هذه المعرفة أساس الممارسة التمريضية الآمنة والدقيقة.",
  },
  {
    slug: "intro-anatomy-terminology-planes",
    order: 2,
    titleEn: "Anatomical Terminology and Body Planes",
    titleAr: "المصطلحات التشريحية والمستويات الجسدية",
    objectivesEn: [
      "Describe the standard anatomical position and explain its purpose.",
      "Use directional terms correctly to describe body locations.",
      "Identify the three main body planes and the sections they produce.",
    ],
    objectivesAr: [
      "وصف الوضعية التشريحية القياسية وشرح الغرض منها.",
      "استخدام المصطلحات الاتجاهية بشكل صحيح لوصف مواقع الجسم.",
      "تحديد المستويات الجسدية الثلاثة الرئيسية والمقاطع الناتجة عنها.",
    ],
    contentEn: `## Anatomical Position
The **anatomical position** is the standard reference position: standing upright, feet slightly apart, arms at the sides, palms facing forward, head and eyes facing forward. All directional terms describe locations *as if* the body were in this position, regardless of its actual position — avoiding confusion, e.g., between "left/right" from the patient's perspective versus the observer's.

## Directional Terms
- **Superior / Inferior** – toward the head / toward the feet.
- **Anterior (ventral) / Posterior (dorsal)** – toward the front / toward the back.
- **Medial / Lateral** – toward the midline / away from the midline.
- **Proximal / Distal** – closer to / farther from the point of attachment of a limb.
- **Superficial / Deep** – closer to / farther from the body surface.

## Body Planes and Sections
- **Sagittal plane**: divides the body into right and left parts (a *midsagittal* plane divides it evenly).
- **Frontal (coronal) plane**: divides the body into anterior and posterior parts.
- **Transverse (horizontal) plane**: divides the body into superior and inferior parts — commonly seen in CT scan images.

Using standard terminology and planes lets healthcare professionals worldwide describe the exact same location or image orientation without ambiguity.`,
    contentAr: `## الوضعية التشريحية
**الوضعية التشريحية** هي وضعية المرجع القياسية: الوقوف منتصبًا، مع تباعد بسيط بين القدمين، والذراعان بجانب الجسم، وراحتا اليدين متجهتان للأمام، والرأس والعينان متجهتان للأمام. تصف جميع المصطلحات الاتجاهية المواقع *كما لو* كان الجسم في هذه الوضعية، بغض النظر عن وضعيته الفعلية — وهذا يمنع الالتباس بين "اليسار" و"اليمين" من منظور المريض مقابل المُلاحِظ.

## المصطلحات الاتجاهية
- **علوي / سفلي** – باتجاه الرأس / باتجاه القدمين.
- **أمامي (بطني) / خلفي (ظهري)** – باتجاه الأمام / باتجاه الخلف.
- **إنسي / وحشي** – باتجاه خط المنتصف / بعيدًا عنه.
- **قريب / بعيد** – أقرب إلى / أبعد عن نقطة ارتباط الطرف.
- **سطحي / عميق** – أقرب إلى / أبعد عن سطح الجسم.

## المستويات والمقاطع الجسدية
- **المستوى السهمي**: يقسم الجسم إلى جزء أيمن وأيسر (المستوى السهمي المتوسط يقسمه بالتساوي).
- **المستوى الجبهي (الإكليلي)**: يقسم الجسم إلى جزء أمامي وخلفي.
- **المستوى المستعرض (الأفقي)**: يقسم الجسم إلى جزء علوي وسفلي — ويُستخدم كثيرًا في صور الأشعة المقطعية.

يتيح استخدام المصطلحات والمستويات القياسية لمقدمي الرعاية الصحية حول العالم وصف الموقع أو اتجاه الصورة نفسه دون أي لبس.`,
    terms: [
      { en: "Anatomical position", ar: "الوضعية التشريحية" },
      { en: "Sagittal plane", ar: "المستوى السهمي" },
      { en: "Frontal (coronal) plane", ar: "المستوى الجبهي (الإكليلي)" },
      { en: "Transverse plane", ar: "المستوى المستعرض" },
      { en: "Proximal", ar: "قريب (داني)" },
    ],
    summaryEn:
      "The anatomical position is the standard reference for describing body locations using directional terms and body planes (sagittal, frontal, transverse).",
    summaryAr:
      "الوضعية التشريحية هي المرجع القياسي لوصف مواقع الجسم باستخدام المصطلحات الاتجاهية والمستويات الجسدية (السهمي والجبهي والمستعرض).",
  },
  {
    slug: "intro-anatomy-cavities-regions",
    order: 3,
    titleEn: "Body Cavities and Regions",
    titleAr: "التجاويف والمناطق الجسدية",
    objectivesEn: [
      "Identify the two main body cavities and their subdivisions.",
      "Describe the organs contained within each cavity.",
      "Explain the abdominopelvic quadrant/region system used clinically.",
    ],
    objectivesAr: [
      "تحديد التجويفين الجسديين الرئيسيين وتقسيماتهما.",
      "وصف الأعضاء الموجودة داخل كل تجويف.",
      "شرح نظام أرباع/مناطق البطن والحوض المستخدم سريريًا.",
    ],
    contentEn: `## Dorsal and Ventral Body Cavities
The body has two main closed cavities:
- **Dorsal cavity** (posterior): protects the nervous system.
  - *Cranial cavity*: contains the brain.
  - *Vertebral (spinal) canal*: contains the spinal cord.
- **Ventral cavity** (anterior): larger, contains organs collectively called viscera.
  - *Thoracic cavity*: divided into two *pleural cavities* (each surrounding a lung) and the *mediastinum* (heart, esophagus, trachea, major vessels).
  - *Abdominopelvic cavity*: subdivided into the *abdominal cavity* (stomach, liver, intestines, spleen, kidneys) and *pelvic cavity* (bladder, reproductive organs, rectum), with no physical wall separating them.

## Describing the Abdomen: Quadrants and Regions
For quick clinical communication, the abdomen is commonly divided into **four quadrants**: RUQ, LUQ, RLQ, LLQ, using the umbilicus as the center point. A more detailed **nine-region** system is used for more precise anatomical description.

These systems let a nurse quickly document exactly where a patient reports pain — for example, appendicitis pain classically localizes to the RLQ.`,
    contentAr: `## التجويفان الجسديان الظهري والبطني
يحتوي الجسم على تجويفين مغلقين رئيسيين:
- **التجويف الظهري** (الخلفي): يحمي الجهاز العصبي.
  - *التجويف القحفي*: يحتوي على الدماغ.
  - *القناة الفقرية (الشوكية)*: تحتوي على النخاع الشوكي.
- **التجويف البطني** (الأمامي): أكبر حجمًا، ويحتوي على أعضاء تُعرف مجتمعة بالأحشاء.
  - *التجويف الصدري*: ينقسم إلى *تجويفين جنبيين* (يحيط كل منهما برئة) و*المنصف* (القلب، المريء، القصبة الهوائية، الأوعية الكبرى).
  - *التجويف البطني الحوضي*: ينقسم إلى *التجويف البطني* (المعدة، الكبد، الأمعاء، الطحال، الكليتان) و*التجويف الحوضي* (المثانة، الأعضاء التناسلية، المستقيم)، دون جدار فاصل بينهما.

## وصف البطن: الأرباع والمناطق
للتواصل السريري السريع، يُقسَّم البطن عادةً إلى **أربعة أرباع**، باستخدام السرة كنقطة مركزية. يُستخدم نظام أكثر تفصيلاً من **تسع مناطق** لوصف تشريحي أكثر دقة.

تتيح هذه الأنظمة للممرض توثيق موقع ألم المريض بسرعة ووضوح — فمثلًا، يتمركز ألم الزائدة الدودية عادةً في الربع السفلي الأيمن.`,
    terms: [
      { en: "Dorsal cavity", ar: "التجويف الظهري" },
      { en: "Ventral cavity", ar: "التجويف البطني" },
      { en: "Mediastinum", ar: "المنصف" },
      { en: "Viscera", ar: "الأحشاء" },
      { en: "RLQ (right lower quadrant)", ar: "الربع السفلي الأيمن" },
    ],
    summaryEn:
      "The dorsal cavity (cranial + spinal) protects the nervous system; the ventral cavity (thoracic + abdominopelvic) houses the viscera. The abdomen is described using four quadrants or nine regions.",
    summaryAr:
      "يحمي التجويف الظهري (القحفي والشوكي) الجهاز العصبي، بينما يحوي التجويف البطني (الصدري والبطني الحوضي) الأحشاء. يُوصف البطن باستخدام أربعة أرباع أو تسع مناطق.",
  },
  {
    slug: "intro-anatomy-homeostasis",
    order: 4,
    titleEn: "Homeostasis and Body Systems Overview",
    titleAr: "الاتزان الداخلي ونظرة عامة على أجهزة الجسم",
    objectivesEn: [
      "Define homeostasis and explain its importance to health.",
      "Distinguish between negative and positive feedback mechanisms.",
      "Describe how organ systems cooperate to maintain the internal environment.",
    ],
    objectivesAr: [
      "تعريف الاتزان الداخلي وشرح أهميته للصحة.",
      "التمييز بين آليتي التغذية الراجعة السلبية والإيجابية.",
      "وصف كيفية تعاون الأجهزة العضوية للحفاظ على البيئة الداخلية.",
    ],
    contentEn: `## What Is Homeostasis?
**Homeostasis** is the body's ability to maintain a relatively stable internal environment (temperature, pH, blood glucose, fluid balance) despite external changes. Nearly every organ system contributes to it, and failure to maintain it underlies most disease processes.

## Feedback Mechanisms
- **Negative feedback**: the most common mechanism; a change triggers a response that reverses the change (e.g., insulin lowers blood glucose after it rises).
- **Positive feedback**: a change triggers a response that amplifies the change further, rather than reversing it — less common and normally self-limiting (e.g., contractions during childbirth intensify until delivery).

## How Body Systems Work Together
No organ system works in isolation:
- The **cardiovascular system** transports oxygen (from the **respiratory system**) and nutrients (from the **digestive system**) to all cells.
- The **nervous** and **endocrine systems** both regulate other systems — the nervous system acts fast and briefly, the endocrine system slower but longer-lasting.
- The **urinary system** removes waste and helps regulate fluid and electrolyte balance.

Recognizing these interdependencies helps explain why a problem in one system (e.g., kidney failure) can cause symptoms in seemingly unrelated systems.`,
    contentAr: `## ما هو الاتزان الداخلي؟
**الاتزان الداخلي** هو قدرة الجسم على الحفاظ على بيئة داخلية مستقرة نسبيًا (درجة الحرارة، الرقم الهيدروجيني، سكر الدم، توازن السوائل) رغم التغيرات الخارجية. يساهم كل جهاز تقريبًا في ذلك، والفشل في الحفاظ عليه هو أساس معظم العمليات المرضية.

## آليات التغذية الراجعة
- **التغذية الراجعة السلبية**: الآلية الأكثر شيوعًا؛ يؤدي التغيّر إلى استجابة تعكسه (مثلًا، يخفض الإنسولين سكر الدم بعد ارتفاعه).
- **التغذية الراجعة الإيجابية**: يؤدي التغيّر إلى استجابة تُضخِّمه بدلًا من عكسه — أقل شيوعًا وعادةً ذاتية الحد (مثلًا، تصبح تقلصات الولادة أقوى حتى تتم الولادة).

## كيف تعمل أجهزة الجسم معًا؟
لا يعمل أي جهاز بمعزل عن غيره:
- ينقل **الجهاز القلبي الوعائي** الأكسجين (من **الجهاز التنفسي**) والمغذيات (من **الجهاز الهضمي**) إلى جميع الخلايا.
- ينظّم كل من **الجهاز العصبي** و**الجهاز الصماوي** الأجهزة الأخرى — يعمل العصبي بسرعة ولفترة قصيرة، ويعمل الصماوي بشكل أبطأ ولكن أطول.
- يزيل **الجهاز البولي** الفضلات ويساعد على تنظيم توازن السوائل والكهارل.

يساعد إدراك هذا الترابط على تفسير سبب تسبب مشكلة في جهاز واحد (مثل الفشل الكلوي) في ظهور أعراض في أجهزة تبدو غير مرتبطة.`,
    terms: [
      { en: "Homeostasis", ar: "الاتزان الداخلي" },
      { en: "Negative feedback", ar: "التغذية الراجعة السلبية" },
      { en: "Positive feedback", ar: "التغذية الراجعة الإيجابية" },
      { en: "Endocrine system", ar: "الجهاز الصماوي" },
      { en: "Electrolyte balance", ar: "توازن الكهارل" },
    ],
    summaryEn:
      "Homeostasis is the maintenance of a stable internal environment, mainly through negative feedback. All organ systems cooperate to maintain it, so disruption in one can affect others.",
    summaryAr:
      "الاتزان الداخلي هو الحفاظ على بيئة داخلية مستقرة، غالبًا عبر التغذية الراجعة السلبية. تتعاون جميع الأجهزة للحفاظ عليه، لذا فإن خللًا في جهاز واحد قد يؤثر على غيره.",
  },
  {
    slug: "intro-anatomy-clinical-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics: Positioning and Terminology",
    titleAr: "أساسيات التشريح السريري: الوضعيات والمصطلحات",
    objectivesEn: [
      "Apply directional and regional terminology to nursing documentation scenarios.",
      "Identify common patient positions used in nursing care and their purposes.",
      "Explain why precise anatomical language reduces medical errors.",
    ],
    objectivesAr: [
      "تطبيق المصطلحات الاتجاهية والإقليمية في سيناريوهات التوثيق التمريضي.",
      "تحديد وضعيات المريض الشائعة في الرعاية التمريضية والغرض منها.",
      "شرح سبب تقليل اللغة التشريحية الدقيقة للأخطاء الطبية.",
    ],
    contentEn: `## Common Patient Positions in Nursing Practice
- **Supine**: lying flat on the back, face up — common for exams and many procedures.
- **Prone**: lying flat on the stomach, face down — used for certain assessments and to relieve pressure elsewhere.
- **Lateral (recumbent)**: lying on one side — used to relieve pressure, aid drainage, or assist certain exams.
- **Fowler's position**: sitting up with the head of the bed elevated (semi-Fowler's ~30°, high Fowler's ~90°) — eases breathing and assists eating.
- **Trendelenburg position**: supine with the body tilted so the head is lower than the feet — used in specific clinical situations under provider direction.

## Applying Terminology in Documentation
Precise anatomical language prevents dangerous ambiguity. Compare: "pain near the stomach" versus "pain localized to the right lower quadrant, radiating toward the right iliac region" — the second gives far more diagnostic information.

## Why This Matters for Patient Safety
Using standardized directional terms, plane references, and cavity/region names — rather than vague everyday language — reduces the risk of miscommunication between shifts, departments, and even between countries.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## الوضعيات الشائعة للمرضى في الممارسة التمريضية
- **الاستلقاء الظهري**: على الظهر مع الوجه للأعلى — شائع في الفحوصات والعديد من الإجراءات.
- **الانبطاح**: على البطن مع الوجه للأسفل — لبعض التقييمات ولتخفيف الضغط عن مناطق أخرى.
- **الوضعية الجانبية**: على أحد الجانبين — لتخفيف الضغط أو المساعدة في التصريف أو فحوصات معينة.
- **وضعية فاولر**: الجلوس مع رفع رأس السرير (فاولر النصفية ~30 درجة، والعالية ~90 درجة) — تسهّل التنفس وتساعد أثناء الأكل.
- **وضعية ترندلينبيرغ**: استلقاء ظهري مع إمالة الجسم بحيث يكون الرأس أخفض من القدمين — تُستخدم في حالات محددة بتوجيه من مقدم الرعاية.

## تطبيق المصطلحات في التوثيق
تمنع اللغة التشريحية الدقيقة الغموض الخطير. قارن بين: "ألم قرب المعدة" و"ألم موضعي في الربع السفلي الأيمن، ينتشر باتجاه المنطقة الحرقفية اليمنى" — تقدّم الجملة الثانية معلومات تشخيصية أكبر بكثير.

## لماذا يهم هذا سلامة المريض؟
يقلل استخدام المصطلحات الموحدة من خطر سوء التواصل بين النوبات والأقسام بل وحتى بين الدول.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Supine position", ar: "الاستلقاء الظهري" },
      { en: "Prone position", ar: "وضعية الانبطاح" },
      { en: "Fowler's position", ar: "وضعية فاولر" },
      { en: "Trendelenburg position", ar: "وضعية ترندلينبيرغ" },
      { en: "Lateral recumbent", ar: "الوضعية الجانبية" },
    ],
    summaryEn:
      "Standard patient positions (supine, prone, lateral, Fowler's, Trendelenburg) and precise anatomical terminology are essential nursing tools that reduce ambiguity and improve patient safety.",
    summaryAr:
      "تُعد وضعيات المريض القياسية (الظهرية، الانبطاح، الجانبية، فاولر، ترندلينبيرغ) والمصطلحات التشريحية الدقيقة أدوات تمريضية أساسية تقلل الغموض وتحسّن سلامة المريض.",
  },
].map((lesson) => ({ ...lesson, references: REFERENCES }));

const questions = [
  {
    lessonSlug: "intro-anatomy-overview",
    type: "MCQ",
    textEn: "Which branch of anatomy studies structures too small to see without magnification?",
    textAr: "أي فرع من فروع التشريح يدرس البنى الصغيرة جدًا التي لا تُرى دون تكبير؟",
    choices: [
      { id: "a", en: "Gross anatomy", ar: "التشريح العياني" },
      { id: "b", en: "Microscopic anatomy", ar: "التشريح المجهري" },
      { id: "c", en: "Surface anatomy", ar: "تشريح السطح" },
      { id: "d", en: "Regional anatomy", ar: "التشريح الإقليمي" },
    ],
    correct: "b",
    explanationEn:
      "Microscopic anatomy studies structures invisible to the naked eye, including cytology (cells) and histology (tissues). Gross anatomy studies structures visible without magnification.",
    explanationAr:
      "يدرس التشريح المجهري البنى غير المرئية بالعين المجردة، ويشمل علم الخلية وعلم الأنسجة. أما التشريح العياني فيدرس البنى المرئية دون تكبير.",
  },
  {
    lessonSlug: "intro-anatomy-overview",
    type: "MCQ",
    textEn: "Which level of structural organization comes immediately after the cellular level?",
    textAr: "أي مستوى من مستويات التنظيم البنيوي يأتي مباشرة بعد المستوى الخلوي؟",
    choices: [
      { id: "a", en: "Chemical level", ar: "المستوى الكيميائي" },
      { id: "b", en: "Tissue level", ar: "مستوى الأنسجة" },
      { id: "c", en: "Organ level", ar: "مستوى الأعضاء" },
      { id: "d", en: "Organ system level", ar: "مستوى الأجهزة" },
    ],
    correct: "b",
    explanationEn:
      "The order is chemical → cellular → tissue → organ → organ system → organismal. Tissues are groups of similar cells performing a common function.",
    explanationAr:
      "الترتيب هو: كيميائي ← خلوي ← أنسجة ← أعضاء ← أجهزة ← كائني. الأنسجة هي مجموعات من الخلايا المتشابهة تؤدي وظيفة مشتركة.",
  },
  {
    lessonSlug: "intro-anatomy-overview",
    type: "TRUE_FALSE",
    textEn: "Systemic anatomy studies all structures within one body region at once.",
    textAr: "يدرس التشريح الجهازي جميع البنى داخل منطقة واحدة من الجسم في آنٍ واحد.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "false",
    explanationEn:
      "That describes regional anatomy. Systemic anatomy studies the body system by system, such as the entire cardiovascular system.",
    explanationAr:
      "هذا وصف للتشريح الإقليمي. أما التشريح الجهازي فيدرس الجسم جهازًا بجهاز، مثل دراسة الجهاز القلبي الوعائي بالكامل.",
  },
  {
    lessonSlug: "intro-anatomy-terminology-planes",
    type: "MCQ",
    textEn: "In the anatomical position, which way do the palms face?",
    textAr: "في الوضعية التشريحية، إلى أين تتجه راحتا اليدين؟",
    choices: [
      { id: "a", en: "Backward", ar: "للخلف" },
      { id: "b", en: "Forward", ar: "للأمام" },
      { id: "c", en: "Toward the body", ar: "نحو الجسم" },
      { id: "d", en: "Downward", ar: "للأسفل" },
    ],
    correct: "b",
    explanationEn: "In the standard anatomical position, the body stands upright with palms facing forward.",
    explanationAr: "في الوضعية التشريحية القياسية، يقف الجسم منتصبًا وراحتا اليدين متجهتان للأمام.",
  },
  {
    lessonSlug: "intro-anatomy-terminology-planes",
    type: "MCQ",
    textEn: "Which directional term means \"closer to the midline of the body\"?",
    textAr: "أي مصطلح اتجاهي يعني \"أقرب إلى خط منتصف الجسم\"؟",
    choices: [
      { id: "a", en: "Lateral", ar: "وحشي" },
      { id: "b", en: "Medial", ar: "إنسي" },
      { id: "c", en: "Proximal", ar: "قريب" },
      { id: "d", en: "Superficial", ar: "سطحي" },
    ],
    correct: "b",
    explanationEn: "Medial means toward the midline; lateral means away from the midline.",
    explanationAr: "إنسي يعني باتجاه خط المنتصف؛ ووحشي يعني بعيدًا عنه.",
  },
  {
    lessonSlug: "intro-anatomy-terminology-planes",
    type: "MCQ",
    textEn: "Which plane divides the body into superior and inferior parts?",
    textAr: "أي مستوى يقسم الجسم إلى جزء علوي وسفلي؟",
    choices: [
      { id: "a", en: "Sagittal", ar: "السهمي" },
      { id: "b", en: "Frontal (coronal)", ar: "الجبهي (الإكليلي)" },
      { id: "c", en: "Transverse", ar: "المستعرض" },
      { id: "d", en: "Midsagittal", ar: "السهمي المتوسط" },
    ],
    correct: "c",
    explanationEn:
      "The transverse (horizontal) plane divides the body into upper (superior) and lower (inferior) parts, and is commonly seen in CT images.",
    explanationAr:
      "يقسم المستوى المستعرض (الأفقي) الجسم إلى جزء علوي وسفلي، ويظهر كثيرًا في صور الأشعة المقطعية.",
  },
  {
    lessonSlug: "intro-anatomy-cavities-regions",
    type: "MCQ",
    textEn: "Which structure is located within the mediastinum?",
    textAr: "أي بنية تقع داخل المنصف؟",
    choices: [
      { id: "a", en: "Lungs", ar: "الرئتان" },
      { id: "b", en: "Heart", ar: "القلب" },
      { id: "c", en: "Kidneys", ar: "الكليتان" },
      { id: "d", en: "Stomach", ar: "المعدة" },
    ],
    correct: "b",
    explanationEn:
      "The mediastinum, between the two pleural cavities, contains the heart, esophagus, trachea, and major blood vessels. The lungs sit within the pleural cavities, not the mediastinum.",
    explanationAr:
      "يحتوي المنصف، الواقع بين التجويفين الجنبيين، على القلب والمريء والقصبة الهوائية والأوعية الكبرى. أما الرئتان فتقعان داخل التجويفين الجنبيين وليس المنصف.",
  },
  {
    lessonSlug: "intro-anatomy-cavities-regions",
    type: "MCQ",
    textEn: "Which body cavity contains the spinal cord?",
    textAr: "أي تجويف جسدي يحتوي على النخاع الشوكي؟",
    choices: [
      { id: "a", en: "Cranial cavity", ar: "التجويف القحفي" },
      { id: "b", en: "Vertebral (spinal) canal", ar: "القناة الفقرية (الشوكية)" },
      { id: "c", en: "Thoracic cavity", ar: "التجويف الصدري" },
      { id: "d", en: "Abdominal cavity", ar: "التجويف البطني" },
    ],
    correct: "b",
    explanationEn:
      "The vertebral (spinal) canal, part of the dorsal cavity, contains and protects the spinal cord. The cranial cavity contains the brain.",
    explanationAr:
      "تحتوي القناة الفقرية (الشوكية)، وهي جزء من التجويف الظهري، على النخاع الشوكي وتحميه. أما التجويف القحفي فيحتوي على الدماغ.",
  },
  {
    lessonSlug: "intro-anatomy-cavities-regions",
    type: "CASE_BASED",
    textEn:
      "A patient reports pain classically associated with appendicitis. In which abdominal quadrant would the nurse expect to document this finding?",
    textAr: "أبلغ مريض عن ألم يرتبط عادةً بالتهاب الزائدة الدودية. في أي ربع بطني يُتوقع أن يوثّق الممرض هذه النتيجة؟",
    choices: [
      { id: "a", en: "Right upper quadrant (RUQ)", ar: "الربع العلوي الأيمن" },
      { id: "b", en: "Left upper quadrant (LUQ)", ar: "الربع العلوي الأيسر" },
      { id: "c", en: "Right lower quadrant (RLQ)", ar: "الربع السفلي الأيمن" },
      { id: "d", en: "Left lower quadrant (LLQ)", ar: "الربع السفلي الأيسر" },
    ],
    correct: "c",
    explanationEn:
      "Appendicitis pain classically localizes to the right lower quadrant (RLQ), where the appendix is located.",
    explanationAr:
      "يتمركز ألم التهاب الزائدة الدودية عادةً في الربع السفلي الأيمن، حيث تقع الزائدة الدودية.",
  },
  {
    lessonSlug: "intro-anatomy-homeostasis",
    type: "MCQ",
    textEn:
      "Which feedback mechanism is most common in the body and works by reversing a change to restore normal range?",
    textAr: "أي آلية تغذية راجعة هي الأكثر شيوعًا في الجسم وتعمل عبر عكس التغيّر لإعادة المتغيّر إلى مجاله الطبيعي؟",
    choices: [
      { id: "a", en: "Positive feedback", ar: "التغذية الراجعة الإيجابية" },
      { id: "b", en: "Negative feedback", ar: "التغذية الراجعة السلبية" },
      { id: "c", en: "Neutral feedback", ar: "التغذية الراجعة المحايدة" },
      { id: "d", en: "Amplifying feedback", ar: "التغذية الراجعة المضخِّمة" },
    ],
    correct: "b",
    explanationEn:
      "Negative feedback is the most common homeostatic mechanism; it reverses a change to bring a variable back toward its normal range, such as insulin lowering blood glucose after it rises.",
    explanationAr:
      "التغذية الراجعة السلبية هي الآلية الأكثر شيوعًا للاتزان الداخلي؛ فهي تعكس التغيّر لإعادة المتغيّر إلى مجاله الطبيعي، مثل خفض الإنسولين لسكر الدم بعد ارتفاعه.",
  },
  {
    lessonSlug: "intro-anatomy-homeostasis",
    type: "MCQ",
    textEn: "Which of the following is an example of positive feedback?",
    textAr: "أي مما يلي مثال على التغذية الراجعة الإيجابية؟",
    choices: [
      { id: "a", en: "Insulin lowering blood glucose after a meal", ar: "خفض الإنسولين لسكر الدم بعد الوجبة" },
      { id: "b", en: "Contractions intensifying during childbirth until delivery", ar: "تقوّي تقلصات الولادة حتى تتم الولادة" },
      { id: "c", en: "Sweating to cool the body when overheated", ar: "التعرّق لتبريد الجسم عند ارتفاع حرارته" },
      { id: "d", en: "Shivering to generate heat when cold", ar: "الارتجاف لتوليد الحرارة عند البرد" },
    ],
    correct: "b",
    explanationEn:
      "Childbirth contractions are a classic example of positive feedback: the response amplifies the original stimulus until birth occurs, rather than reversing it.",
    explanationAr:
      "تُعد تقلصات الولادة مثالًا كلاسيكيًا على التغذية الراجعة الإيجابية: تُضخِّم الاستجابة المؤثر الأصلي حتى تتم الولادة، بدلًا من عكسه.",
  },
  {
    lessonSlug: "intro-anatomy-homeostasis",
    type: "TRUE_FALSE",
    textEn: "The nervous and endocrine systems both help regulate other body systems.",
    textAr: "يساعد كل من الجهازين العصبي والصماوي في تنظيم أجهزة الجسم الأخرى.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "Both systems regulate other systems, but differently: the nervous system acts quickly via electrical signals, while the endocrine system acts more slowly but for longer periods via hormones.",
    explanationAr:
      "ينظّم كلا الجهازين أجهزة أخرى، لكن بطرق مختلفة: يعمل العصبي بسرعة عبر إشارات كهربائية، بينما يعمل الصماوي بشكل أبطأ ولكن لفترة أطول عبر الهرمونات.",
  },
  {
    lessonSlug: "intro-anatomy-clinical-basics",
    type: "MCQ",
    textEn: "Which patient position involves lying flat on the back, face up?",
    textAr: "أي وضعية للمريض تتضمن الاستلقاء على الظهر مع الوجه للأعلى؟",
    choices: [
      { id: "a", en: "Prone", ar: "الانبطاح" },
      { id: "b", en: "Supine", ar: "الاستلقاء الظهري" },
      { id: "c", en: "Lateral", ar: "الجانبية" },
      { id: "d", en: "Trendelenburg", ar: "ترندلينبيرغ" },
    ],
    correct: "b",
    explanationEn:
      "Supine position means lying flat on the back with the face up. Prone is the opposite — lying face down.",
    explanationAr: "الاستلقاء الظهري يعني الاستلقاء على الظهر مع الوجه للأعلى. أما الانبطاح فهو عكس ذلك، أي الاستلقاء على البطن.",
  },
  {
    lessonSlug: "intro-anatomy-clinical-basics",
    type: "MCQ",
    textEn:
      "Which position is commonly used to ease a patient's breathing and for eating, with the head of the bed elevated?",
    textAr: "أي وضعية تُستخدم عادةً لتسهيل تنفس المريض وأثناء تناول الطعام، مع رفع رأس السرير؟",
    choices: [
      { id: "a", en: "Prone", ar: "الانبطاح" },
      { id: "b", en: "Trendelenburg", ar: "ترندلينبيرغ" },
      { id: "c", en: "Fowler's position", ar: "وضعية فاولر" },
      { id: "d", en: "Lateral recumbent", ar: "الوضعية الجانبية" },
    ],
    correct: "c",
    explanationEn:
      "Fowler's position (semi- or high-Fowler's) raises the head of the bed and is commonly used to ease breathing and assist with eating.",
    explanationAr: "ترفع وضعية فاولر (النصفية أو العالية) رأس السرير، وتُستخدم عادةً لتسهيل التنفس والمساعدة أثناء الأكل.",
  },
  {
    lessonSlug: "intro-anatomy-clinical-basics",
    type: "CLINICAL_REASONING",
    textEn:
      "A nurse documents a wound as located \"5 cm distal to the lateral epicondyle\" rather than \"a bit below the elbow, on the outside.\" Why is this preferred?",
    textAr: "وثّق ممرض موقع جرح بأنه \"يبعد 5 سم بعيدًا عن اللقيمة الوحشية\" بدلًا من \"تحت المرفق قليلًا، من الخارج\". لماذا يُفضَّل هذا الأسلوب؟",
    choices: [
      { id: "a", en: "It uses simpler language for patients", ar: "يستخدم لغة أبسط للمرضى" },
      { id: "b", en: "It provides precise, unambiguous location understood by any healthcare provider", ar: "يوفر موقعًا دقيقًا وغير غامض يفهمه أي مقدم رعاية صحية" },
      { id: "c", en: "It is required only for legal reasons", ar: "مطلوب لأسباب قانونية فقط" },
      { id: "d", en: "It has no real clinical benefit", ar: "لا فائدة سريرية حقيقية منه" },
    ],
    correct: "b",
    explanationEn:
      "Standardized anatomical terminology removes ambiguity and ensures any healthcare provider, regardless of language or institution, understands the exact location being described — reducing the risk of miscommunication and error.",
    explanationAr:
      "تزيل المصطلحات التشريحية الموحدة الغموض وتضمن فهم أي مقدم رعاية صحية للموقع الدقيق المقصود، بصرف النظر عن اللغة أو المؤسسة، مما يقلل من خطر سوء التواصل والأخطاء.",
  },
  {
    lessonSlug: "intro-anatomy-overview",
    type: "MCQ",
    textEn: "Which of the following best describes histology?",
    textAr: "أي مما يلي يصف علم الأنسجة بشكل أفضل؟",
    choices: [
      { id: "a", en: "Study of cells", ar: "دراسة الخلايا" },
      { id: "b", en: "Study of tissues", ar: "دراسة الأنسجة" },
      { id: "c", en: "Study of organs", ar: "دراسة الأعضاء" },
      { id: "d", en: "Study of whole-body regions", ar: "دراسة مناطق الجسم بالكامل" },
    ],
    correct: "b",
    explanationEn:
      "Histology is the study of tissues, a branch of microscopic anatomy. Cytology studies cells specifically.",
    explanationAr: "علم الأنسجة هو دراسة الأنسجة، وهو فرع من التشريح المجهري. أما علم الخلية فيدرس الخلايا تحديدًا.",
  },
  {
    lessonSlug: "intro-anatomy-overview",
    type: "MCQ",
    textEn: "Surface anatomy is most useful for which purpose?",
    textAr: "ما الغرض الأساسي من تشريح السطح؟",
    choices: [
      { id: "a", en: "Studying molecules", ar: "دراسة الجزيئات" },
      { id: "b", en: "Identifying external landmarks to infer internal structures", ar: "تحديد المعالم الخارجية لاستنتاج البنى الداخلية" },
      { id: "c", en: "Studying single cells under a microscope", ar: "دراسة خلية واحدة تحت المجهر" },
      { id: "d", en: "Classifying diseases", ar: "تصنيف الأمراض" },
    ],
    correct: "b",
    explanationEn:
      "Surface anatomy studies visible external landmarks to help locate and understand internal structures, useful in physical examination.",
    explanationAr:
      "يدرس تشريح السطح المعالم الخارجية المرئية للمساعدة في تحديد وفهم البنى الداخلية، وهو مفيد في الفحص السريري.",
  },
  {
    lessonSlug: "intro-anatomy-terminology-planes",
    type: "MCQ",
    textEn: "Which term describes a structure located away from the point of attachment of a limb?",
    textAr: "أي مصطلح يصف بنية تقع بعيدًا عن نقطة ارتباط الطرف؟",
    choices: [
      { id: "a", en: "Proximal", ar: "قريب" },
      { id: "b", en: "Distal", ar: "بعيد" },
      { id: "c", en: "Superior", ar: "علوي" },
      { id: "d", en: "Medial", ar: "إنسي" },
    ],
    correct: "b",
    explanationEn:
      "Distal means farther from the point of attachment (e.g., the hand is distal to the elbow).",
    explanationAr: "بعيد يعني أبعد عن نقطة الارتباط (مثلًا، اليد بعيدة عن المرفق).",
  },
  {
    lessonSlug: "intro-anatomy-terminology-planes",
    type: "MCQ",
    textEn: "The frontal (coronal) plane divides the body into which two parts?",
    textAr: "إلى أي جزأين يقسم المستوى الجبهي (الإكليلي) الجسم؟",
    choices: [
      { id: "a", en: "Right and left", ar: "أيمن وأيسر" },
      { id: "b", en: "Anterior and posterior", ar: "أمامي وخلفي" },
      { id: "c", en: "Superior and inferior", ar: "علوي وسفلي" },
      { id: "d", en: "Proximal and distal", ar: "قريب وبعيد" },
    ],
    correct: "b",
    explanationEn:
      "The frontal (coronal) plane divides the body into anterior (front) and posterior (back) portions.",
    explanationAr: "يقسم المستوى الجبهي (الإكليلي) الجسم إلى جزء أمامي وجزء خلفي.",
  },
  {
    lessonSlug: "intro-anatomy-cavities-regions",
    type: "MCQ",
    textEn: "Which organ is located within the pelvic cavity?",
    textAr: "أي عضو يقع داخل التجويف الحوضي؟",
    choices: [
      { id: "a", en: "Liver", ar: "الكبد" },
      { id: "b", en: "Stomach", ar: "المعدة" },
      { id: "c", en: "Urinary bladder", ar: "المثانة البولية" },
      { id: "d", en: "Lungs", ar: "الرئتان" },
    ],
    correct: "c",
    explanationEn:
      "The urinary bladder, along with reproductive organs and the rectum, lies within the pelvic cavity.",
    explanationAr: "تقع المثانة البولية، إلى جانب الأعضاء التناسلية والمستقيم، داخل التجويف الحوضي.",
  },
  {
    lessonSlug: "intro-anatomy-cavities-regions",
    type: "MCQ",
    textEn: "How many regions does the more detailed abdominal region system use?",
    textAr: "كم منطقة يستخدم النظام التفصيلي لمناطق البطن؟",
    choices: [
      { id: "a", en: "Two", ar: "اثنتان" },
      { id: "b", en: "Four", ar: "أربع" },
      { id: "c", en: "Six", ar: "ست" },
      { id: "d", en: "Nine", ar: "تسع" },
    ],
    correct: "d",
    explanationEn:
      "The nine-region system divides the abdomen into regions such as the epigastric, umbilical, hypogastric, and the paired hypochondriac, lumbar, and iliac regions.",
    explanationAr:
      "يقسم نظام التسع مناطق البطن إلى مناطق مثل الشرسوفية والسرية وتحت المعدة، والمناطق المزدوجة تحت الضلعية والقطنية والحرقفية.",
  },
  {
    lessonSlug: "intro-anatomy-homeostasis",
    type: "MCQ",
    textEn: "Which of the following best defines homeostasis?",
    textAr: "أي مما يلي يُعرّف الاتزان الداخلي بشكل أفضل؟",
    choices: [
      { id: "a", en: "The body's growth process", ar: "عملية نمو الجسم" },
      { id: "b", en: "The body's ability to maintain a stable internal environment", ar: "قدرة الجسم على الحفاظ على بيئة داخلية مستقرة" },
      { id: "c", en: "The formation of new cells", ar: "تكوّن خلايا جديدة" },
      { id: "d", en: "The breakdown of nutrients", ar: "تفكيك المغذيات" },
    ],
    correct: "b",
    explanationEn:
      "Homeostasis refers to maintaining a relatively stable internal environment despite external changes.",
    explanationAr: "يشير الاتزان الداخلي إلى الحفاظ على بيئة داخلية مستقرة نسبيًا رغم التغيرات الخارجية.",
  },
  {
    lessonSlug: "intro-anatomy-homeostasis",
    type: "MCQ",
    textEn:
      "Which system regulates the body mainly through hormones acting more slowly but for a longer duration?",
    textAr: "أي جهاز ينظّم الجسم غالبًا عبر هرمونات تعمل بشكل أبطأ ولكن لفترة أطول؟",
    choices: [
      { id: "a", en: "Nervous system", ar: "الجهاز العصبي" },
      { id: "b", en: "Endocrine system", ar: "الجهاز الصماوي" },
      { id: "c", en: "Skeletal system", ar: "الجهاز الهيكلي" },
      { id: "d", en: "Integumentary system", ar: "الجهاز الغلافي" },
    ],
    correct: "b",
    explanationEn:
      "The endocrine system regulates body functions using hormones, which act more slowly than nerve signals but have longer-lasting effects.",
    explanationAr:
      "ينظّم الجهاز الصماوي وظائف الجسم باستخدام الهرمونات، التي تعمل بشكل أبطأ من الإشارات العصبية لكن بتأثير أطول.",
  },
  {
    lessonSlug: "intro-anatomy-clinical-basics",
    type: "MCQ",
    textEn: "Which position tilts the body so the head is lower than the feet?",
    textAr: "أي وضعية تُميل الجسم بحيث يكون الرأس أخفض من القدمين؟",
    choices: [
      { id: "a", en: "Fowler's position", ar: "وضعية فاولر" },
      { id: "b", en: "Supine position", ar: "الاستلقاء الظهري" },
      { id: "c", en: "Trendelenburg position", ar: "وضعية ترندلينبيرغ" },
      { id: "d", en: "Prone position", ar: "وضعية الانبطاح" },
    ],
    correct: "c",
    explanationEn:
      "Trendelenburg position involves lying supine with the body tilted so the head is lower than the feet, used in specific clinical situations.",
    explanationAr:
      "تتضمن وضعية ترندلينبيرغ الاستلقاء الظهري مع إمالة الجسم بحيث يكون الرأس أخفض من القدمين، وتُستخدم في حالات سريرية محددة.",
  },
  {
    lessonSlug: "intro-anatomy-clinical-basics",
    type: "CLINICAL_REASONING",
    textEn: "Why is standardized anatomical terminology important in multinational healthcare teams?",
    textAr: "لماذا تُعد المصطلحات التشريحية الموحدة مهمة في فرق الرعاية الصحية متعددة الجنسيات؟",
    choices: [
      { id: "a", en: "It looks more professional", ar: "تبدو أكثر احترافية" },
      { id: "b", en: "It ensures precise, unambiguous communication regardless of language or institution", ar: "تضمن تواصلاً دقيقًا وغير غامض بصرف النظر عن اللغة أو المؤسسة" },
      { id: "c", en: "It is only a legal requirement", ar: "مطلوبة لأسباب قانونية فقط" },
      { id: "d", en: "It has no real impact on patient safety", ar: "ليس لها تأثير حقيقي على سلامة المريض" },
    ],
    correct: "b",
    explanationEn:
      "Standardized terminology ensures any provider, regardless of language or institution, understands the exact location or finding described, reducing miscommunication.",
    explanationAr:
      "تضمن المصطلحات الموحدة فهم أي مقدم رعاية، بصرف النظر عن اللغة أو المؤسسة، للموقع أو النتيجة الموصوفة بدقة، مما يقلل من سوء التواصل.",
  },
];

module.exports = { lessons, questions, REFERENCES };
