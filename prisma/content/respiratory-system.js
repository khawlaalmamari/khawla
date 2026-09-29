// Real, written-from-scratch educational content for the Respiratory
// System module (Anatomy course). Facts are drawn from standard, widely
// taught anatomy knowledge; further reading references point to open
// academic resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 22: The Respiratory System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Thorax, Lungs\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK470197/",
  },
];

const lessons = [
  {
    slug: "respiratory-introduction",
    order: 1,
    titleEn: "Introduction to the Respiratory System",
    titleAr: "مقدمة عن الجهاز التنفسي",
    objectivesEn: [
      "Describe the main functions of the respiratory system.",
      "Distinguish between the upper and lower respiratory tracts.",
      "Distinguish between the conducting zone and the respiratory zone.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز التنفسي.",
      "التمييز بين المجرى التنفسي العلوي والسفلي.",
      "التمييز بين المنطقة الناقلة والمنطقة التنفسية.",
    ],
    contentEn: `## Overview
The respiratory system's central job is **gas exchange**: bringing oxygen into the body and removing carbon dioxide, a waste product of cellular metabolism. It also contributes to regulating blood pH, producing sound (vocalization), and sensing smell.

## Main Functions
1. **Gas exchange** – Oxygen moves from inhaled air into the blood, and carbon dioxide moves from the blood into air to be exhaled.
2. **pH regulation** – By adjusting how much carbon dioxide is exhaled, the respiratory system helps keep blood pH within a narrow normal range.
3. **Vocalization** – Air moving past the vocal cords in the larynx produces sound.
4. **Olfaction (smell)** – Olfactory receptors in the upper nasal cavity detect airborne chemicals.
5. **Protection** – Hairs, mucus, and cilia in the airway trap and remove inhaled particles and pathogens.

## Upper vs. Lower Respiratory Tract
- **Upper respiratory tract**: nose, nasal cavity, pharynx (throat), and larynx (voice box) — warms, humidifies, and filters incoming air.
- **Lower respiratory tract**: trachea, bronchi, bronchioles, and lungs (including the alveoli) — continues conducting air and is where gas exchange finally takes place.

## Conducting Zone vs. Respiratory Zone
- **Conducting zone**: all the airway passages that simply move air (nose through terminal bronchioles) without participating in gas exchange. This portion also warms, humidifies, and filters air.
- **Respiratory zone**: the respiratory bronchioles, alveolar ducts, and alveoli — the only structures thin-walled enough for actual gas exchange with the surrounding capillaries.`,
    contentAr: `## نظرة عامة
تتمثل المهمة المركزية للجهاز التنفسي في **تبادل الغازات**: إدخال الأكسجين إلى الجسم والتخلص من ثاني أكسيد الكربون، وهو ناتج فضلات الاستقلاب الخلوي. كما يساهم الجهاز التنفسي في تنظيم درجة حموضة الدم، وإنتاج الصوت (النطق)، والإحساس بالشم.

## الوظائف الرئيسية
1. **تبادل الغازات** – ينتقل الأكسجين من الهواء المستنشق إلى الدم، وينتقل ثاني أكسيد الكربون من الدم إلى الهواء ليتم زفيره.
2. **تنظيم درجة الحموضة** – عبر تعديل كمية ثاني أكسيد الكربون المزفور، يساعد الجهاز التنفسي في إبقاء درجة حموضة الدم ضمن نطاق طبيعي ضيق.
3. **النطق** – ينتج الصوت عن مرور الهواء بجانب الحبال الصوتية في الحنجرة.
4. **الشم** – تكشف المستقبلات الشمية في الجزء العلوي من التجويف الأنفي المواد الكيميائية المحمولة جوًا.
5. **الحماية** – تحبس الأشعار والمخاط والأهداب في المجرى الهوائي الجسيمات ومسببات الأمراض المستنشقة وتخرجها.

## المجرى التنفسي العلوي مقابل السفلي
- **المجرى التنفسي العلوي**: الأنف والتجويف الأنفي والبلعوم (الحلق) والحنجرة (صندوق الصوت) — يُدفّئ الهواء الداخل ويرطّبه ويرشّحه.
- **المجرى التنفسي السفلي**: القصبة الهوائية والقصبات والقصيبات والرئتان (بما فيها الأسناخ) — يواصل نقل الهواء وهو الموضع الذي يحدث فيه تبادل الغازات فعليًا.

## المنطقة الناقلة مقابل المنطقة التنفسية
- **المنطقة الناقلة**: جميع الممرات الهوائية التي تنقل الهواء فقط (من الأنف حتى القصيبات الطرفية) دون المشاركة في تبادل الغازات. يقوم هذا الجزء أيضًا بتدفئة الهواء وترطيبه وترشيحه.
- **المنطقة التنفسية**: القصيبات التنفسية والقنوات السنخية والأسناخ — وهي البنى الوحيدة الرقيقة بما يكفي لحدوث تبادل الغازات الفعلي مع الشعيرات الدموية المحيطة.`,
    terms: [
      { en: "Gas exchange", ar: "تبادل الغازات" },
      { en: "Conducting zone", ar: "المنطقة الناقلة" },
      { en: "Respiratory zone", ar: "المنطقة التنفسية" },
      { en: "Larynx", ar: "الحنجرة" },
      { en: "Alveoli", ar: "الأسناخ" },
    ],
    summaryEn:
      "The respiratory system performs gas exchange, helps regulate pH, enables vocalization and smell, and protects against inhaled particles. It is divided into upper and lower tracts, and into a conducting zone (air movement only) and a respiratory zone (actual gas exchange).",
    summaryAr:
      "يقوم الجهاز التنفسي بتبادل الغازات، ويساعد في تنظيم درجة الحموضة، ويتيح النطق والشم، ويحمي من الجسيمات المستنشقة. ينقسم إلى مجرى علوي وسفلي، وإلى منطقة ناقلة (نقل الهواء فقط) ومنطقة تنفسية (تبادل الغازات الفعلي).",
  },
  {
    slug: "respiratory-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures of the Airway",
    titleAr: "البنى التشريحية للمجرى الهوائي",
    objectivesEn: [
      "Identify the structures of the upper respiratory tract.",
      "Describe the structure of the trachea and its supporting cartilage.",
      "Describe the alveolus as the functional unit of gas exchange.",
    ],
    objectivesAr: [
      "تحديد بنى المجرى التنفسي العلوي.",
      "وصف بنية القصبة الهوائية والغضروف الداعم لها.",
      "وصف السنخ بوصفه الوحدة الوظيفية لتبادل الغازات.",
    ],
    contentEn: `## Upper Tract Structures
- **Nose and nasal cavity**: air enters here, warmed and humidified by a rich blood supply, and filtered by hairs and mucus.
- **Pharynx**: shared passage for both air and food, divided into the nasopharynx, oropharynx, and laryngopharynx.
- **Larynx**: the voice box; houses the **vocal cords**, which vibrate as air passes to produce sound. Its uppermost cartilage flap, the **epiglottis**, folds down during swallowing to direct food into the esophagus and away from the airway.

## The Trachea
The trachea ("windpipe") extends from the larynx down into the thorax, where it splits into the right and left main bronchi. Its wall is reinforced by 16–20 **C-shaped rings of hyaline cartilage**, which keep the airway open while the open (posterior) part of each "C" — made of smooth muscle — allows the esophagus, directly behind it, to expand during swallowing.

## Bronchial Tree
The trachea branches into the **right and left main (primary) bronchi**, which enter each lung and continue branching into progressively smaller **secondary (lobar) bronchi**, **tertiary (segmental) bronchi**, and finally tiny **bronchioles**. As the airways get smaller, cartilage support decreases and disappears, while smooth muscle content increases, allowing bronchioles to constrict or dilate to regulate airflow.

## The Alveolus: The Functional Unit
Each terminal bronchiole leads to a cluster of **alveoli**, tiny thin-walled air sacs where gas exchange with the surrounding capillary network actually happens. Alveolar walls contain two main cell types:
- **Type I pneumocytes**: extremely thin cells that make up most of the alveolar surface, optimized for gas diffusion.
- **Type II pneumocytes**: produce **surfactant**, a fluid that reduces surface tension inside the alveoli, preventing them from collapsing between breaths.`,
    contentAr: `## بنى المجرى العلوي
- **الأنف والتجويف الأنفي**: يدخل الهواء من هنا، حيث يُدفّأ ويُرطّب بفضل تروية دموية غنية، ويُرشَّح بواسطة الأشعار والمخاط.
- **البلعوم**: ممر مشترك للهواء والطعام، وينقسم إلى البلعوم الأنفي والبلعوم الفموي والبلعوم الحنجري.
- **الحنجرة**: صندوق الصوت؛ وتحتوي على **الحبال الصوتية**، التي تهتز مع مرور الهواء لإنتاج الصوت. ويطوى الغضروف العلوي فيها، **لسان المزمار**، إلى الأسفل أثناء البلع لتوجيه الطعام إلى المريء بعيدًا عن المجرى الهوائي.

## القصبة الهوائية
تمتد القصبة الهوائية من الحنجرة نزولًا إلى الصدر، حيث تنقسم إلى القصبتين الرئيسيتين اليمنى واليسرى. ويتعزّز جدارها بـ 16–20 **حلقة غضروفية زجاجية على شكل حرف C**، تُبقي المجرى الهوائي مفتوحًا، بينما يسمح الجزء المفتوح (الخلفي) من كل حلقة — المكوّن من عضلات ملساء — للمريء، الواقع خلفها مباشرة، بالتمدد أثناء البلع.

## الشجرة القصبية
تتفرّع القصبة الهوائية إلى **القصبتين الرئيسيتين اليمنى واليسرى**، اللتين تدخلان كل رئة وتستمران في التفرّع إلى **قصبات فصية** ثم **قصبات قطعية** أصغر تدريجيًا، وأخيرًا إلى **قصيبات** دقيقة. ومع تصاغر الممرات الهوائية، يقل الدعم الغضروفي ثم يختفي، بينما يزداد محتوى العضلات الملساء، مما يتيح للقصيبات التقلص أو الاتساع لتنظيم تدفق الهواء.

## السنخ: الوحدة الوظيفية
تؤدي كل قصيبة طرفية إلى مجموعة من **الأسناخ**، وهي أكياس هوائية دقيقة رقيقة الجدار يحدث فيها تبادل الغازات فعليًا مع شبكة الشعيرات الدموية المحيطة. تحتوي جدران الأسناخ على نوعين رئيسيين من الخلايا:
- **الخلايا السنخية من النوع الأول**: خلايا رقيقة للغاية تشكّل معظم سطح السنخ، وهي مُحسَّنة لانتشار الغازات.
- **الخلايا السنخية من النوع الثاني**: تنتج **الفاعل بالسطح**، وهو سائل يقلل التوتر السطحي داخل الأسناخ، ويمنع انهيارها بين الأنفاس.`,
    terms: [
      { en: "Epiglottis", ar: "لسان المزمار" },
      { en: "Vocal cords", ar: "الحبال الصوتية" },
      { en: "Bronchiole", ar: "القصيبة" },
      { en: "Alveolus", ar: "السنخ" },
      { en: "Surfactant", ar: "الفاعل بالسطح" },
    ],
    summaryEn:
      "Air passes from the nose/pharynx through the larynx (with the epiglottis protecting the airway during swallowing), down the cartilage-supported trachea, through the branching bronchial tree, to the alveoli — the thin-walled sacs where gas exchange occurs, kept open by surfactant.",
    summaryAr:
      "يمر الهواء من الأنف/البلعوم عبر الحنجرة (حيث يحمي لسان المزمار المجرى الهوائي أثناء البلع)، فينزل عبر القصبة الهوائية المدعومة بالغضروف، ثم عبر الشجرة القصبية المتفرعة، وصولًا إلى الأسناخ — الأكياس رقيقة الجدار التي يحدث فيها تبادل الغازات، والتي يبقيها الفاعل بالسطح مفتوحة.",
  },
  {
    slug: "respiratory-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Describe the lobar structure of each lung.",
      "Describe the pleura and pleural cavity.",
      "Identify the diaphragm's location and role as the primary breathing muscle.",
    ],
    objectivesAr: [
      "وصف التركيب الفصي لكل رئة.",
      "وصف الجنبة والتجويف الجنبي.",
      "تحديد موقع الحجاب الحاجز ودوره كعضلة تنفس أساسية.",
    ],
    contentEn: `## The Lungs
The lungs occupy most of the thoracic cavity, on either side of the mediastinum (which houses the heart). They are not identical:
- The **right lung** has **three lobes** (superior, middle, inferior) and is slightly larger.
- The **left lung** has only **two lobes** (superior, inferior), being smaller to make room for the heart, which tilts toward the left side of the chest. It also has a concave notch, the **cardiac notch**, that accommodates the heart.
Each lung's medial surface has a **hilum**, the region where the main bronchus, pulmonary artery, pulmonary veins, and nerves enter and exit.

## Pleura and Pleural Cavity
Each lung is enclosed by a two-layered serous membrane, the **pleura**:
- **Visceral pleura**: adheres directly to the lung's surface.
- **Parietal pleura**: lines the inner wall of the thoracic cavity.
Between them is the thin, fluid-filled **pleural cavity**, which reduces friction during breathing and creates a slight suction that helps hold the lungs against the chest wall.

## The Diaphragm
The **diaphragm** is a dome-shaped skeletal muscle that separates the thoracic cavity from the abdominal cavity, and is the primary muscle of breathing. During inhalation, it contracts and flattens, increasing the volume of the thoracic cavity and drawing air into the lungs; during relaxed exhalation, it simply relaxes back into its dome shape. The diaphragm is innervated by the **phrenic nerve**, which originates from cervical spinal nerve roots (C3–C5) — a long path that is clinically important, since diaphragm function can be affected by injuries at that level of the spinal cord.

## Accessory Muscles of Breathing
During quiet breathing, the diaphragm (with some help from the external intercostal muscles) does most of the work. During forceful or labored breathing, **accessory muscles** — including the sternocleidomastoid and scalene muscles of the neck, and internal intercostal muscles for forced exhalation — assist by further expanding or compressing the thoracic cavity.`,
    contentAr: `## الرئتان
تشغل الرئتان معظم التجويف الصدري، على جانبي المنصف (الذي يحتوي على القلب). وهما ليستا متطابقتين:
- تحتوي **الرئة اليمنى** على **ثلاثة فصوص** (علوي وأوسط وسفلي)، وهي أكبر قليلًا.
- تحتوي **الرئة اليسرى** على **فصّين فقط** (علوي وسفلي)، إذ تكون أصغر لإفساح المجال للقلب، الذي يميل نحو الجانب الأيسر من الصدر. كما تحتوي على تجويف مقعّر يسمى **الشق القلبي** يستوعب القلب.
يحتوي السطح الإنسي لكل رئة على **نقير الرئة**، وهي المنطقة التي تدخل وتخرج منها القصبة الرئيسية والشريان الرئوي والأوردة الرئوية والأعصاب.

## الجنبة والتجويف الجنبي
تحيط بكل رئة غشاء مصلي مزدوج الطبقة يسمى **الجنبة**:
- **الجنبة الحشوية**: تلتصق مباشرة بسطح الرئة.
- **الجنبة الجدارية**: تبطّن الجدار الداخلي للتجويف الصدري.
وبينهما يوجد **التجويف الجنبي** الرقيق المملوء بالسائل، الذي يقلل الاحتكاك أثناء التنفس ويُحدث شفطًا طفيفًا يساعد على إبقاء الرئتين ملتصقتين بجدار الصدر.

## الحجاب الحاجز
**الحجاب الحاجز** عضلة هيكلية مقببة الشكل تفصل التجويف الصدري عن التجويف البطني، وهي العضلة الأساسية للتنفس. أثناء الشهيق، تنقبض وتتسطح، مما يزيد حجم التجويف الصدري ويسحب الهواء إلى الرئتين؛ وأثناء الزفير المسترخي، تسترخي فقط لتعود إلى شكلها المقبب. يُعصِّب الحجاب الحاجز **العصب الحجابي**، الذي ينشأ من جذور الأعصاب الشوكية العنقية (C3–C5) — وهو مسار طويل له أهمية سريرية، إذ يمكن أن تتأثر وظيفة الحجاب الحاجز بإصابات عند ذلك المستوى من النخاع الشوكي.

## عضلات التنفس المساعدة
أثناء التنفس الهادئ، يقوم الحجاب الحاجز (بمساعدة بسيطة من العضلات الوربية الخارجية) بمعظم العمل. أما أثناء التنفس القسري أو الشاق، فتساعد **العضلات المساعدة** — ومنها العضلة القصية الترقوية الخشائية والعضلات الأخمعية في الرقبة، والعضلات الوربية الداخلية للزفير القسري — عبر توسيع التجويف الصدري أو ضغطه بشكل إضافي.`,
    terms: [
      { en: "Hilum (lung)", ar: "نقير الرئة" },
      { en: "Pleura", ar: "الجنبة" },
      { en: "Pleural cavity", ar: "التجويف الجنبي" },
      { en: "Diaphragm", ar: "الحجاب الحاجز" },
      { en: "Phrenic nerve", ar: "العصب الحجابي" },
    ],
    summaryEn:
      "The right lung has three lobes, the left has two (plus a cardiac notch). Each lung is wrapped in visceral and parietal pleura with a fluid-filled pleural cavity between them. The diaphragm, innervated by the phrenic nerve, is the primary muscle of breathing.",
    summaryAr:
      "تحتوي الرئة اليمنى على ثلاثة فصوص، بينما تحتوي اليسرى على فصّين (إضافة إلى الشق القلبي). تُغلَّف كل رئة بجنبة حشوية وجدارية مع تجويف جنبي مملوء بالسائل بينهما. الحجاب الحاجز، الذي يعصّبه العصب الحجابي، هو العضلة الأساسية للتنفس.",
  },
  {
    slug: "respiratory-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Describe the anatomical relationship between the respiratory and cardiovascular systems.",
      "Describe the nervous system's role in controlling breathing.",
      "Explain the mechanical relationship between the rib cage, diaphragm, and lung volume.",
    ],
    objectivesAr: [
      "وصف العلاقة التشريحية بين الجهازين التنفسي والقلبي الوعائي.",
      "وصف دور الجهاز العصبي في التحكم بالتنفس.",
      "شرح العلاقة الميكانيكية بين القفص الصدري والحجاب الحاجز وحجم الرئة.",
    ],
    contentEn: `## Relationship with the Cardiovascular System
The respiratory and cardiovascular systems meet directly at the **alveolar-capillary membrane**: the thin wall of each alveolus lies right against a network of pulmonary capillaries, and gas exchange happens by diffusion across this shared boundary. This relationship is also anatomical at a larger scale — the right ventricle exists specifically to pump blood through the lungs before it returns, oxygenated, to the left side of the heart.

## Nervous Control of Breathing
Although breathing can be voluntarily controlled for a time (e.g., holding your breath, speaking), its automatic rhythm is generated by respiratory centers in the **medulla oblongata and pons** of the brainstem. These centers send signals down the spinal cord and, via the **phrenic nerve**, to the diaphragm, and via **intercostal nerves** to the muscles between the ribs — coordinating the muscular contractions that drive breathing without conscious effort.

## Rib Cage and Lung Volume
The lungs themselves have no muscle to expand or contract; their volume changes passively, following the volume of the thoracic cavity around them, because the pleural cavity holds them against the chest wall. When the diaphragm contracts and flattens, and the rib cage is lifted upward and outward by the external intercostal muscles, the thoracic cavity's volume increases, its internal pressure drops, and air is drawn into the lungs. The reverse — relaxation of these muscles, allowing the elastic recoil of the lungs and rib cage — produces normal, passive exhalation.`,
    contentAr: `## العلاقة بالجهاز القلبي الوعائي
يلتقي الجهازان التنفسي والقلبي الوعائي مباشرة عند **الغشاء السنخي الشعري**: إذ يقع الجدار الرقيق لكل سنخ مباشرة أمام شبكة من الشعيرات الرئوية، ويحدث تبادل الغازات بالانتشار عبر هذه الحدود المشتركة. وتظهر هذه العلاقة أيضًا على نطاق أوسع — إذ يوجد البطين الأيمن تحديدًا ليضخ الدم عبر الرئتين قبل أن يعود، مؤكسجًا، إلى الجانب الأيسر من القلب.

## التحكم العصبي بالتنفس
رغم إمكانية التحكم الإرادي بالتنفس لفترة (كحبس النفس أو التحدث)، فإن إيقاعه التلقائي تولّده مراكز تنفسية في **النخاع المستطيل والجسر** ضمن جذع الدماغ. وترسل هذه المراكز إشارات عبر النخاع الشوكي، وعبر **العصب الحجابي** إلى الحجاب الحاجز، وعبر **الأعصاب الوربية** إلى العضلات الواقعة بين الأضلاع — منسّقةً بذلك الانقباضات العضلية التي تحرّك عملية التنفس دون جهد واعٍ.

## القفص الصدري وحجم الرئة
لا تمتلك الرئتان نفسهما عضلات للتمدد أو الانقباض؛ إذ يتغيّر حجمهما بشكل سلبي تبعًا لحجم التجويف الصدري المحيط بهما، لأن التجويف الجنبي يبقيهما ملتصقتين بجدار الصدر. فعندما ينقبض الحجاب الحاجز ويتسطح، ويرتفع القفص الصدري إلى الأعلى والخارج بفعل العضلات الوربية الخارجية، يزداد حجم التجويف الصدري، وينخفض ضغطه الداخلي، فيُسحب الهواء إلى الرئتين. أما العكس — استرخاء هذه العضلات، مما يسمح بالارتداد المرن للرئتين والقفص الصدري — فينتج عنه الزفير الطبيعي السلبي.`,
    terms: [
      { en: "Alveolar-capillary membrane", ar: "الغشاء السنخي الشعري" },
      { en: "Medulla oblongata", ar: "النخاع المستطيل" },
      { en: "Intercostal nerve", ar: "العصب الوربي" },
      { en: "Elastic recoil", ar: "الارتداد المرن" },
      { en: "Thoracic cavity", ar: "التجويف الصدري" },
    ],
    summaryEn:
      "The respiratory and cardiovascular systems meet at the alveolar-capillary membrane. Breathing's automatic rhythm is generated in the brainstem and carried to the diaphragm and intercostal muscles via nerves. Lung volume changes passively with the thoracic cavity, driven by the diaphragm and rib cage.",
    summaryAr:
      "يلتقي الجهازان التنفسي والقلبي الوعائي عند الغشاء السنخي الشعري. يُولَّد الإيقاع التلقائي للتنفس في جذع الدماغ وينتقل إلى الحجاب الحاجز والعضلات الوربية عبر الأعصاب. يتغيّر حجم الرئة بشكل سلبي مع التجويف الصدري، بفعل الحجاب الحاجز والقفص الصدري.",
  },
  {
    slug: "respiratory-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Describe the standard lung fields assessed during auscultation.",
      "Identify the anatomical landmark used for cricothyrotomy.",
      "Describe the triangle of safety used for chest tube insertion.",
    ],
    objectivesAr: [
      "وصف مجالات الرئة القياسية التي تُقيَّم أثناء الإصغاء.",
      "تحديد المعلم التشريحي المستخدم لشق الغشاء الحلقي الدرقي.",
      "وصف مثلث الأمان المستخدم لإدخال أنبوب الصدر.",
    ],
    contentEn: `## Lung Auscultation
Nurses assess lung sounds by listening systematically over the anterior, posterior, and lateral chest, comparing side to side at each level, from the apices (above the clavicles) down to the bases of the lungs. Because the lungs' lobes are stacked and overlapping, a single stethoscope position can pick up sound from more than one lobe — which is why a full, systematic pattern across multiple points is used rather than a single listening point.

## The Cricothyroid Membrane
The **cricothyroid membrane** is a thin membrane located between the thyroid cartilage (above) and the cricoid cartilage (below) in the front of the neck — palpable as a small depression just below the larger laryngeal prominence ("Adam's apple"). It is the anatomical landmark for an emergency **cricothyrotomy**, a procedure to create an airway when the upper airway is obstructed and other methods are not possible.

## Triangle of Safety (Chest Tube Insertion)
When inserting a chest tube to drain air or fluid from the pleural cavity, clinicians use the **triangle of safety** to avoid injuring major structures. It is bordered by:
- The lateral edge of the pectoralis major muscle (anteriorly).
- The lateral edge of the latissimus dorsi muscle (posteriorly).
- A horizontal line at the level of the nipple (roughly the 5th intercostal space).
Working within this triangle helps avoid the heart, great vessels, and major chest wall muscles.

## Oxygen Therapy and Airway Anatomy
Understanding airway anatomy is directly relevant to common nursing tasks — for example, correctly sizing and positioning a nasal cannula or face mask depends on knowing the nasal and oral airway anatomy, and safe suctioning depends on knowing how far the trachea extends before branching into the bronchi, to avoid entering just one lung.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## الإصغاء إلى الرئتين
يقيّم الممرضون أصوات الرئة بالإصغاء بشكل منهجي فوق الصدر الأمامي والخلفي والجانبي، مقارنين بين الجانبين عند كل مستوى، من القمم (فوق الترقوتين) نزولًا إلى قاعدتي الرئتين. ونظرًا لأن فصوص الرئتين متراكبة ومتداخلة، فإن موضعًا واحدًا لسماعة الطبيب قد يلتقط صوتًا من أكثر من فصّ — لذا يُستخدم نمط منهجي وشامل عبر نقاط متعددة بدلًا من نقطة إصغاء واحدة.

## الغشاء الحلقي الدرقي
**الغشاء الحلقي الدرقي** غشاء رقيق يقع بين الغضروف الدرقي (أعلاه) والغضروف الحلقي (أسفله) في مقدمة الرقبة — ويمكن جسّه كتجويف صغير أسفل النتوء الحنجري الأكبر ("تفاحة آدم") مباشرة. وهو المعلم التشريحي لإجراء **شق الغشاء الحلقي الدرقي** الطارئ، وهو إجراء لإنشاء مجرى هوائي عندما يكون المجرى العلوي مسدودًا وتتعذّر الطرق الأخرى.

## مثلث الأمان (لإدخال أنبوب الصدر)
عند إدخال أنبوب صدري لتصريف الهواء أو السائل من التجويف الجنبي، يستخدم الأطباء **مثلث الأمان** لتجنّب إصابة البنى الرئيسية. ويحدّه:
- الحافة الجانبية لعضلة الصدر الكبرى (من الأمام).
- الحافة الجانبية لعضلة الظهر العريضة (من الخلف).
- خط أفقي عند مستوى الحلمة (تقريبًا المسافة الوربية الخامسة).
والعمل ضمن هذا المثلث يساعد على تجنّب القلب والأوعية الكبرى والعضلات الرئيسية لجدار الصدر.

## العلاج بالأكسجين وتشريح المجرى الهوائي
يرتبط فهم تشريح المجرى الهوائي ارتباطًا مباشرًا بمهام تمريضية شائعة — فمثلًا، يعتمد اختيار وتوضيع القنية الأنفية أو قناع الوجه بشكل صحيح على معرفة تشريح المجرى الأنفي والفموي، ويعتمد الشفط الآمن على معرفة المسافة التي تمتد إليها القصبة الهوائية قبل أن تتفرّع إلى القصبات، لتجنّب دخول رئة واحدة فقط.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Auscultation (lung)", ar: "الإصغاء (الرئوي)" },
      { en: "Cricothyroid membrane", ar: "الغشاء الحلقي الدرقي" },
      { en: "Triangle of safety", ar: "مثلث الأمان" },
      { en: "Nasal cannula", ar: "القنية الأنفية" },
      { en: "Suctioning", ar: "الشفط" },
    ],
    summaryEn:
      "Lung auscultation follows a systematic pattern across anterior, posterior, and lateral chest fields. The cricothyroid membrane is the landmark for emergency cricothyrotomy, and the triangle of safety guides safe chest tube placement.",
    summaryAr:
      "يتبع الإصغاء إلى الرئتين نمطًا منهجيًا عبر مجالات الصدر الأمامية والخلفية والجانبية. يُعدّ الغشاء الحلقي الدرقي المعلم لإجراء شق الغشاء الحلقي الدرقي الطارئ، ويوجّه مثلث الأمان إلى الوضع الآمن لأنبوب الصدر.",
  },
].map((lesson) => ({ ...lesson, references: lesson.references ?? REFERENCES }));

const questions = [
  {
    lessonSlug: "respiratory-introduction",
    type: "MCQ",
    textEn: "Which zone of the respiratory tract is where gas exchange actually occurs?",
    textAr: "في أي منطقة من المجرى التنفسي يحدث تبادل الغازات فعليًا؟",
    choices: [
      { id: "a", en: "Conducting zone", ar: "المنطقة الناقلة" },
      { id: "b", en: "Respiratory zone", ar: "المنطقة التنفسية" },
      { id: "c", en: "Upper respiratory tract only", ar: "المجرى التنفسي العلوي فقط" },
      { id: "d", en: "The larynx", ar: "الحنجرة" },
    ],
    correct: "b",
    explanationEn:
      "The respiratory zone (respiratory bronchioles, alveolar ducts, and alveoli) is thin-walled enough for actual gas exchange; the conducting zone only moves air.",
    explanationAr:
      "المنطقة التنفسية (القصيبات التنفسية والقنوات السنخية والأسناخ) رقيقة الجدار بما يكفي لحدوث تبادل الغازات فعليًا، بينما تكتفي المنطقة الناقلة بنقل الهواء.",
  },
  {
    lessonSlug: "respiratory-introduction",
    type: "TRUE_FALSE",
    textEn: "The pharynx is a shared passage for both air and food.",
    textAr: "البلعوم ممر مشترك لكل من الهواء والطعام.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "The pharynx serves both the respiratory and digestive systems as a shared passageway before air and food take separate paths.",
    explanationAr:
      "يخدم البلعوم كلًا من الجهازين التنفسي والهضمي كممر مشترك قبل أن يسلك الهواء والطعام مسارين منفصلين.",
  },
  {
    lessonSlug: "respiratory-anatomical-structures",
    type: "MCQ",
    textEn: "What is the function of the epiglottis?",
    textAr: "ما وظيفة لسان المزمار؟",
    choices: [
      { id: "a", en: "Produces sound", ar: "إنتاج الصوت" },
      { id: "b", en: "Warms incoming air", ar: "تدفئة الهواء الداخل" },
      { id: "c", en: "Directs food away from the airway during swallowing", ar: "توجيه الطعام بعيدًا عن المجرى الهوائي أثناء البلع" },
      { id: "d", en: "Produces surfactant", ar: "إنتاج الفاعل بالسطح" },
    ],
    correct: "c",
    explanationEn:
      "The epiglottis folds down during swallowing to direct food into the esophagus and protect the airway.",
    explanationAr:
      "يطوى لسان المزمار إلى الأسفل أثناء البلع لتوجيه الطعام إلى المريء وحماية المجرى الهوائي.",
  },
  {
    lessonSlug: "respiratory-anatomical-structures",
    type: "MCQ",
    textEn: "What keeps the trachea open while still allowing the esophagus behind it to expand?",
    textAr: "ما الذي يبقي القصبة الهوائية مفتوحة مع السماح للمريء خلفها بالتمدد؟",
    choices: [
      { id: "a", en: "Smooth muscle alone", ar: "العضلات الملساء وحدها" },
      { id: "b", en: "C-shaped cartilage rings", ar: "الحلقات الغضروفية على شكل حرف C" },
      { id: "c", en: "The epiglottis", ar: "لسان المزمار" },
      { id: "d", en: "Surfactant", ar: "الفاعل بالسطح" },
    ],
    correct: "b",
    explanationEn:
      "The trachea's C-shaped cartilage rings keep it open, while the open posterior part of each ring (smooth muscle) allows the adjacent esophagus to expand during swallowing.",
    explanationAr:
      "تُبقي الحلقات الغضروفية على شكل حرف C القصبة الهوائية مفتوحة، بينما يسمح الجزء الخلفي المفتوح من كل حلقة (العضلات الملساء) للمريء المجاور بالتمدد أثناء البلع.",
  },
  {
    lessonSlug: "respiratory-anatomical-structures",
    type: "MCQ",
    textEn: "Which alveolar cell type produces surfactant?",
    textAr: "أي نوع من الخلايا السنخية ينتج الفاعل بالسطح؟",
    choices: [
      { id: "a", en: "Type I pneumocytes", ar: "الخلايا السنخية من النوع الأول" },
      { id: "b", en: "Type II pneumocytes", ar: "الخلايا السنخية من النوع الثاني" },
      { id: "c", en: "Goblet cells", ar: "الخلايا الكأسية" },
      { id: "d", en: "Cilia", ar: "الأهداب" },
    ],
    correct: "b",
    explanationEn:
      "Type II pneumocytes produce surfactant, which reduces surface tension and prevents alveolar collapse between breaths.",
    explanationAr:
      "تنتج الخلايا السنخية من النوع الثاني الفاعل بالسطح، الذي يقلل التوتر السطحي ويمنع انهيار الأسناخ بين الأنفاس.",
  },
  {
    lessonSlug: "respiratory-organs-locations",
    type: "MCQ",
    textEn: "How many lobes does the right lung have?",
    textAr: "كم عدد فصوص الرئة اليمنى؟",
    choices: [
      { id: "a", en: "Two", ar: "اثنان" },
      { id: "b", en: "Three", ar: "ثلاثة" },
      { id: "c", en: "Four", ar: "أربعة" },
      { id: "d", en: "One", ar: "واحد" },
    ],
    correct: "b",
    explanationEn:
      "The right lung has three lobes (superior, middle, inferior); the left lung has only two, being smaller to accommodate the heart.",
    explanationAr:
      "تحتوي الرئة اليمنى على ثلاثة فصوص (علوي وأوسط وسفلي)؛ بينما تحتوي الرئة اليسرى على فصّين فقط، لكونها أصغر لإفساح المجال للقلب.",
  },
  {
    lessonSlug: "respiratory-organs-locations",
    type: "MCQ",
    textEn: "What is the function of the fluid-filled pleural cavity?",
    textAr: "ما وظيفة التجويف الجنبي المملوء بالسائل؟",
    choices: [
      { id: "a", en: "Produces surfactant", ar: "إنتاج الفاعل بالسطح" },
      { id: "b", en: "Reduces friction and helps hold the lung against the chest wall", ar: "تقليل الاحتكاك والمساعدة على إبقاء الرئة ملتصقة بجدار الصدر" },
      { id: "c", en: "Warms inhaled air", ar: "تدفئة الهواء المستنشق" },
      { id: "d", en: "Filters inhaled particles", ar: "ترشيح الجسيمات المستنشقة" },
    ],
    correct: "b",
    explanationEn:
      "The pleural cavity, between the visceral and parietal pleura, reduces friction during breathing and creates slight suction holding the lung against the chest wall.",
    explanationAr:
      "يقلل التجويف الجنبي، الواقع بين الجنبة الحشوية والجدارية، الاحتكاك أثناء التنفس ويُحدث شفطًا طفيفًا يُبقي الرئة ملتصقة بجدار الصدر.",
  },
  {
    lessonSlug: "respiratory-organs-locations",
    type: "CASE_BASED",
    textEn:
      "A patient has weakness of the diaphragm following a high cervical spinal cord injury. Which nerve's function is most likely impaired?",
    textAr: "يعاني مريض من ضعف في الحجاب الحاجز بعد إصابة عنقية عالية في النخاع الشوكي. أي عصب من المرجح أن تتأثر وظيفته؟",
    choices: [
      { id: "a", en: "Vagus nerve", ar: "العصب المبهم" },
      { id: "b", en: "Phrenic nerve", ar: "العصب الحجابي" },
      { id: "c", en: "Intercostal nerve", ar: "العصب الوربي" },
      { id: "d", en: "Olfactory nerve", ar: "العصب الشمي" },
    ],
    correct: "b",
    explanationEn:
      "The phrenic nerve, which originates from cervical spinal nerve roots C3–C5, innervates the diaphragm. A high cervical injury at this level can impair diaphragm function.",
    explanationAr:
      "يعصّب العصب الحجابي، الناشئ من جذور الأعصاب الشوكية العنقية C3–C5، الحجاب الحاجز. ويمكن أن تؤثر إصابة عنقية عالية عند هذا المستوى على وظيفة الحجاب الحاجز.",
  },
  {
    lessonSlug: "respiratory-anatomical-relationships",
    type: "MCQ",
    textEn: "Where does the respiratory system directly meet the cardiovascular system for gas exchange?",
    textAr: "أين يلتقي الجهاز التنفسي مباشرة بالجهاز القلبي الوعائي لتبادل الغازات؟",
    choices: [
      { id: "a", en: "At the trachea", ar: "عند القصبة الهوائية" },
      { id: "b", en: "At the alveolar-capillary membrane", ar: "عند الغشاء السنخي الشعري" },
      { id: "c", en: "At the larynx", ar: "عند الحنجرة" },
      { id: "d", en: "At the diaphragm", ar: "عند الحجاب الحاجز" },
    ],
    correct: "b",
    explanationEn:
      "The alveolar-capillary membrane, where thin alveolar walls meet pulmonary capillaries, is where gas exchange by diffusion actually occurs.",
    explanationAr:
      "يحدث تبادل الغازات بالانتشار فعليًا عند الغشاء السنخي الشعري، حيث تلتقي جدران الأسناخ الرقيقة بالشعيرات الرئوية.",
  },
  {
    lessonSlug: "respiratory-anatomical-relationships",
    type: "MCQ",
    textEn: "Where in the brain are the automatic respiratory rhythm centers located?",
    textAr: "أين تقع مراكز الإيقاع التنفسي التلقائي في الدماغ؟",
    choices: [
      { id: "a", en: "Cerebellum", ar: "المخيخ" },
      { id: "b", en: "Medulla oblongata and pons", ar: "النخاع المستطيل والجسر" },
      { id: "c", en: "Occipital lobe", ar: "الفص القذالي" },
      { id: "d", en: "Hypothalamus", ar: "الوطاء" },
    ],
    correct: "b",
    explanationEn:
      "The respiratory centers in the medulla oblongata and pons (both in the brainstem) generate the automatic rhythm of breathing.",
    explanationAr:
      "تولّد المراكز التنفسية في النخاع المستطيل والجسر (وكلاهما في جذع الدماغ) الإيقاع التلقائي للتنفس.",
  },
  {
    lessonSlug: "respiratory-anatomical-relationships",
    type: "TRUE_FALSE",
    textEn: "The lungs contain their own muscle tissue to actively expand and contract.",
    textAr: "تحتوي الرئتان على نسيج عضلي خاص بهما للتمدد والانقباض بشكل نشط.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "false",
    explanationEn:
      "The lungs have no muscle to expand or contract themselves; their volume changes passively with the thoracic cavity, driven by the diaphragm and rib cage muscles.",
    explanationAr:
      "لا تمتلك الرئتان عضلات للتمدد أو الانقباض بنفسيهما؛ إذ يتغيّر حجمهما بشكل سلبي مع التجويف الصدري، بفعل الحجاب الحاجز وعضلات القفص الصدري.",
  },
  {
    lessonSlug: "respiratory-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "What is the anatomical landmark for an emergency cricothyrotomy?",
    textAr: "ما المعلم التشريحي لإجراء شق الغشاء الحلقي الدرقي الطارئ؟",
    choices: [
      { id: "a", en: "The sternal angle", ar: "زاوية القص" },
      { id: "b", en: "The cricothyroid membrane", ar: "الغشاء الحلقي الدرقي" },
      { id: "c", en: "The hilum of the lung", ar: "نقير الرئة" },
      { id: "d", en: "The carina", ar: "شوكة القصبة" },
    ],
    correct: "b",
    explanationEn:
      "The cricothyroid membrane, between the thyroid and cricoid cartilages, is the landmark used for an emergency cricothyrotomy.",
    explanationAr:
      "الغشاء الحلقي الدرقي، الواقع بين الغضروفين الدرقي والحلقي، هو المعلم المستخدم لإجراء شق الغشاء الحلقي الدرقي الطارئ.",
  },
  {
    lessonSlug: "respiratory-clinical-anatomy-basics",
    type: "CASE_BASED",
    textEn: "A clinician is inserting a chest tube and stays within the triangle of safety. What is the primary purpose of this landmark?",
    textAr: "يُدخل طبيب أنبوبًا صدريًا ملتزمًا بحدود مثلث الأمان. ما الغرض الأساسي من هذا المعلم؟",
    choices: [
      { id: "a", en: "To locate the trachea for intubation", ar: "لتحديد موقع القصبة الهوائية للتنبيب" },
      { id: "b", en: "To avoid injuring the heart, great vessels, and major chest muscles", ar: "لتجنّب إصابة القلب والأوعية الكبرى وعضلات الصدر الرئيسية" },
      { id: "c", en: "To measure blood pressure", ar: "لقياس ضغط الدم" },
      { id: "d", en: "To assess bowel sounds", ar: "لتقييم أصوات الأمعاء" },
    ],
    correct: "b",
    explanationEn:
      "The triangle of safety, bordered by the pectoralis major, latissimus dorsi, and a line at the nipple level, helps clinicians avoid major structures when inserting a chest tube.",
    explanationAr:
      "يساعد مثلث الأمان، المحدود بعضلة الصدر الكبرى وعضلة الظهر العريضة وخط عند مستوى الحلمة، الأطباء على تجنّب البنى الرئيسية عند إدخال أنبوب الصدر.",
  },
];

module.exports = { lessons, questions, REFERENCES };
