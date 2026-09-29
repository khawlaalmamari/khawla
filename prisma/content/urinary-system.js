// Real, written-from-scratch educational content for the Urinary System
// module (Anatomy course). Facts are drawn from standard, widely taught
// anatomy knowledge; further reading references point to open academic
// resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 25: The Urinary System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/25-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Abdomen and Pelvis: Kidneys\"",
    url: "https://www.ncbi.nlm.nih.gov/sites/books/NBK482385/",
  },
];

const lessons = [
  {
    slug: "urinary-introduction",
    order: 1,
    titleEn: "Introduction to the Urinary System",
    titleAr: "مقدمة عن الجهاز البولي",
    objectivesEn: [
      "Describe the main functions of the urinary system.",
      "List the four main organs of the urinary system.",
      "Explain the basic path urine follows from formation to elimination.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز البولي.",
      "سرد الأعضاء الأربعة الرئيسية للجهاز البولي.",
      "شرح المسار الأساسي للبول من تكوّنه حتى طرحه.",
    ],
    contentEn: `## Overview
The urinary system filters the blood to remove waste products and excess substances, forming urine, while also playing a central role in maintaining the body's internal balance.

## Main Functions
1. **Waste removal** – Filters out metabolic waste products, such as urea, from the blood.
2. **Fluid and electrolyte balance** – Regulates the volume and composition of body fluids by adjusting how much water and which ions are excreted or retained.
3. **Acid-base balance** – Helps regulate blood pH by excreting hydrogen ions and reabsorbing bicarbonate as needed.
4. **Blood pressure regulation** – The kidneys help regulate blood pressure partly through fluid balance and partly by releasing the hormone renin.
5. **Hormone production** – Produces **erythropoietin** (stimulates red blood cell production) and helps activate **vitamin D**.

## The Four Main Organs
- **Kidneys** (two): filter the blood and form urine.
- **Ureters** (two): muscular tubes that carry urine from each kidney to the bladder.
- **Urinary bladder** (one): a muscular, expandable organ that stores urine.
- **Urethra** (one): the tube through which urine leaves the body.

## Basic Path of Urine
Blood is filtered within each kidney's nephrons, forming urine, which drains into the renal pelvis, then travels down the ureter (via peristaltic contractions, much like the GI tract) into the bladder for temporary storage, and finally exits the body through the urethra during urination (micturition).`,
    contentAr: `## نظرة عامة
يرشّح الجهاز البولي الدم للتخلص من نواتج الفضلات والمواد الزائدة، مكوّنًا البول، بينما يؤدي أيضًا دورًا محوريًا في الحفاظ على التوازن الداخلي للجسم.

## الوظائف الرئيسية
1. **التخلص من الفضلات** – يرشّح نواتج الفضلات الاستقلابية، مثل اليوريا، من الدم.
2. **توازن السوائل والشوارد** – ينظّم حجم سوائل الجسم وتركيبها عبر تعديل كمية الماء والشوارد التي تُطرح أو تُحتجز.
3. **توازن الحموضة والقاعدية** – يساعد على تنظيم درجة حموضة الدم عبر طرح أيونات الهيدروجين وإعادة امتصاص البيكربونات عند الحاجة.
4. **تنظيم ضغط الدم** – تساعد الكليتان في تنظيم ضغط الدم جزئيًا عبر توازن السوائل وجزئيًا عبر إفراز هرمون الرينين.
5. **إنتاج الهرمونات** – تنتج **الإريثروبويتين** (يحفّز إنتاج خلايا الدم الحمراء) وتساعد على تنشيط **فيتامين د**.

## الأعضاء الأربعة الرئيسية
- **الكليتان** (اثنتان): ترشّحان الدم وتكوّنان البول.
- **الحالبان** (اثنان): أنبوبان عضليان ينقلان البول من كل كلية إلى المثانة.
- **المثانة البولية** (واحدة): عضو عضلي قابل للتمدد يخزّن البول.
- **الإحليل** (واحد): الأنبوب الذي يخرج البول من خلاله من الجسم.

## المسار الأساسي للبول
يُرشَّح الدم داخل نُبيبات كل كلية، مكوّنًا البول، الذي يصب في حوض الكلية، ثم ينزل عبر الحالب (بانقباضات تمعجية، مشابهة لتلك في القناة الهضمية) إلى المثانة للتخزين المؤقت، وأخيرًا يخرج من الجسم عبر الإحليل أثناء التبول.`,
    terms: [
      { en: "Nephron", ar: "النُّبيب الكلوي (النفرون)" },
      { en: "Ureter", ar: "الحالب" },
      { en: "Urethra", ar: "الإحليل" },
      { en: "Erythropoietin", ar: "الإريثروبويتين" },
      { en: "Micturition", ar: "التبول" },
    ],
    summaryEn:
      "The urinary system filters blood, balances fluid/electrolytes/pH, helps regulate blood pressure, and produces hormones. Its four organs — kidneys, ureters, bladder, urethra — form, transport, store, and eliminate urine in that order.",
    summaryAr:
      "يرشّح الجهاز البولي الدم، ويوازن السوائل والشوارد ودرجة الحموضة، ويساعد على تنظيم ضغط الدم، وينتج الهرمونات. تقوم أعضاؤه الأربعة — الكليتان والحالبان والمثانة والإحليل — بتكوين البول ونقله وتخزينه وطرحه بهذا الترتيب.",
  },
  {
    slug: "urinary-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures of the Kidney",
    titleAr: "البنى التشريحية للكلية",
    objectivesEn: [
      "Describe the gross internal structure of the kidney.",
      "Identify the nephron as the kidney's functional unit.",
      "List the main parts of a nephron in order.",
    ],
    objectivesAr: [
      "وصف البنية الداخلية العامة للكلية.",
      "تحديد النُّبيب الكلوي بوصفه الوحدة الوظيفية للكلية.",
      "سرد الأجزاء الرئيسية للنُّبيب الكلوي بالترتيب.",
    ],
    contentEn: `## Gross Internal Structure
On a cross-section, each kidney shows three main regions:
- **Renal cortex**: the outer region, granular in appearance, containing most of the filtering structures.
- **Renal medulla**: the inner region, made up of cone-shaped **renal pyramids**, whose tips (papillae) point toward the center of the kidney.
- **Renal pelvis**: a funnel-shaped chamber that collects urine draining from the pyramids' papillae via cup-like structures called **calyces**, before it flows into the ureter.

## The Nephron: The Functional Unit
Each kidney contains roughly a million **nephrons**, the microscopic functional units where blood filtration and urine formation actually happen. Each nephron has two main parts:
- **Renal corpuscle**: consists of the **glomerulus** (a tangled knot of capillaries) surrounded by the cup-shaped **Bowman's capsule**, where blood is initially filtered.
- **Renal tubule**: a long, winding tube that carries and modifies the filtrate, in order: the **proximal convoluted tubule**, the **loop of Henle** (descending and ascending limbs, dipping toward the medulla), and the **distal convoluted tubule**.

## From Nephron to Urine
Fluid leaving the distal convoluted tubule enters a shared **collecting duct**, where final adjustments to water and ion content occur before the resulting urine drains into the minor calyces, major calyces, and finally the renal pelvis.`,
    contentAr: `## البنية الداخلية العامة
عند مقطع عرضي، تُظهر كل كلية ثلاث مناطق رئيسية:
- **القشرة الكلوية**: المنطقة الخارجية، ذات مظهر حبيبي، وتحتوي على معظم بنى الترشيح.
- **النخاع الكلوي**: المنطقة الداخلية، وتتكوّن من **أهرامات كلوية** مخروطية الشكل، تتجه قممها (الحليمات) نحو مركز الكلية.
- **حوض الكلية**: حجرة على شكل قمع تجمع البول المتدفق من حليمات الأهرامات عبر بنى كأسية الشكل تسمى **الكؤيسات**، قبل أن يتدفق إلى الحالب.

## النُّبيب الكلوي: الوحدة الوظيفية
تحتوي كل كلية على نحو مليون **نُبيب كلوي (نفرون)**، وهي الوحدات الوظيفية المجهرية التي يحدث فيها ترشيح الدم وتكوّن البول فعليًا. ويتكوّن كل نُبيب كلوي من جزأين رئيسيين:
- **الجسيم الكلوي**: يتكوّن من **الكُبَيبة** (عقدة متشابكة من الشعيرات الدموية) محاطة بـ**محفظة بومان** الكأسية الشكل، حيث يُرشَّح الدم مبدئيًا.
- **النُّبيب الكلوي (الأنبوب)**: أنبوب طويل ملتفّ ينقل الرشيح ويعدّله، بالترتيب: **الأنبوب الملتف القريب**، ثم **عروة هنلي** (الفرعان النازل والصاعد، تنغمس باتجاه النخاع)، ثم **الأنبوب الملتف البعيد**.

## من النُّبيب الكلوي إلى البول
يدخل السائل الخارج من الأنبوب الملتف البعيد إلى **قناة تجميع** مشتركة، حيث تحدث التعديلات النهائية على محتوى الماء والشوارد قبل أن يصب البول الناتج في الكؤيسات الصغرى ثم الكبرى، وأخيرًا حوض الكلية.`,
    terms: [
      { en: "Renal cortex", ar: "القشرة الكلوية" },
      { en: "Renal pyramid", ar: "الهرم الكلوي" },
      { en: "Glomerulus", ar: "الكُبَيبة" },
      { en: "Bowman's capsule", ar: "محفظة بومان" },
      { en: "Loop of Henle", ar: "عروة هنلي" },
    ],
    summaryEn:
      "The kidney's gross structure includes the cortex, medulla (renal pyramids), and renal pelvis. Its functional unit, the nephron, consists of a renal corpuscle (glomerulus + Bowman's capsule) and a renal tubule (proximal tubule, loop of Henle, distal tubule), draining into collecting ducts and then the renal pelvis.",
    summaryAr:
      "تشمل البنية العامة للكلية القشرة والنخاع (الأهرامات الكلوية) وحوض الكلية. تتكوّن وحدتها الوظيفية، النُّبيب الكلوي، من جسيم كلوي (الكُبَيبة ومحفظة بومان) وأنبوب كلوي (الأنبوب القريب، وعروة هنلي، والأنبوب البعيد)، يصبّان في قنوات التجميع ثم حوض الكلية.",
  },
  {
    slug: "urinary-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Describe the location of the kidneys relative to the vertebral column.",
      "Describe the path of the ureters and the location of the bladder.",
      "Describe the anatomical difference in urethral length between males and females.",
    ],
    objectivesAr: [
      "وصف موقع الكليتين بالنسبة إلى العمود الفقري.",
      "وصف مسار الحالبين وموقع المثانة.",
      "وصف الفرق التشريحي في طول الإحليل بين الذكور والإناث.",
    ],
    contentEn: `## Location of the Kidneys
The kidneys are **retroperitoneal** organs, located against the posterior abdominal wall on either side of the vertebral column, roughly between the **T12 and L3 vertebrae**. The right kidney sits slightly lower than the left, because the liver occupies space directly above it on the right side. Each kidney is capped by an **adrenal gland**, though these are functionally part of the endocrine system rather than the urinary system.

## Ureters and Bladder
Each **ureter** runs from the renal pelvis down the posterior abdominal wall and into the pelvic cavity, entering the bladder at an oblique angle that helps create a one-way valve effect, preventing urine from flowing backward toward the kidney as the bladder fills. The **urinary bladder** sits in the pelvic cavity, behind the pubic symphysis. Its smooth, triangular base, the **trigone**, is bounded by the two ureteral openings and the internal urethral opening, and tends to be more sensitive to distension than the rest of the bladder wall.

## Urethral Differences
The **urethra** carries urine from the bladder to outside the body, but its length and course differ notably between sexes, which is clinically relevant (e.g., for catheterization):
- In **females**, the urethra is short (about 3–5 cm), running a fairly straight path to an opening located between the clitoris and the vaginal opening.
- In **males**, the urethra is much longer (about 18–20 cm), passing through the prostate gland, the pelvic floor, and the length of the penis, and also serves as a shared passage for semen during ejaculation.`,
    contentAr: `## موقع الكليتين
الكليتان عضوان **خلف الصفاق**، يقعان ملاصقين لجدار البطن الخلفي على جانبي العمود الفقري، تقريبًا بين الفقرتين **T12 وL3**. وتقع الكلية اليمنى أدنى قليلًا من اليسرى، لأن الكبد يشغل الحيّز فوقها مباشرة على الجانب الأيمن. ويعلو كل كلية **غدة كظرية**، رغم أن هذه الغدد تُعدّ وظيفيًا جزءًا من الجهاز الصمّاوي وليس الجهاز البولي.

## الحالبان والمثانة
يمتد كل **حالب** من حوض الكلية نزولًا عبر جدار البطن الخلفي وإلى التجويف الحوضي، ليدخل المثانة بزاوية مائلة تساعد على إحداث تأثير صمام أحادي الاتجاه، يمنع رجوع البول نحو الكلية مع امتلاء المثانة. تقع **المثانة البولية** في التجويف الحوضي، خلف الارتفاق العاني. وتُحدّ قاعدتها الملساء المثلثة، **المثلث المثاني**، فتحتا الحالبين وفتحة الإحليل الداخلية، وتميل إلى أن تكون أكثر حساسية للتمدد من بقية جدار المثانة.

## الفروق في الإحليل
ينقل **الإحليل** البول من المثانة إلى خارج الجسم، لكن طوله ومساره يختلفان بشكل ملحوظ بين الجنسين، وهو أمر ذو أهمية سريرية (كما في القسطرة البولية):
- لدى **الإناث**، الإحليل قصير (حوالي 3–5 سم)، ويسلك مسارًا مستقيمًا نسبيًا إلى فتحة تقع بين البظر وفتحة المهبل.
- لدى **الذكور**، الإحليل أطول بكثير (حوالي 18–20 سم)، ويمر عبر غدة البروستاتا وأرضية الحوض وطول القضيب، ويُستخدم أيضًا كممر مشترك للسائل المنوي أثناء القذف.`,
    terms: [
      { en: "Retroperitoneal", ar: "خلف الصفاق" },
      { en: "Trigone", ar: "المثلث المثاني" },
      { en: "Adrenal gland", ar: "الغدة الكظرية" },
      { en: "Urethra", ar: "الإحليل" },
      { en: "Pelvic cavity", ar: "التجويف الحوضي" },
    ],
    summaryEn:
      "The kidneys are retroperitoneal, roughly at vertebral levels T12–L3, with the right slightly lower. Ureters carry urine to the pelvic bladder via an oblique, one-way entry. The urethra is much shorter in females than in males, an anatomical difference relevant to catheterization.",
    summaryAr:
      "تقع الكليتان خلف الصفاق، تقريبًا عند مستوى الفقرات T12–L3، مع كون اليمنى أدنى قليلًا. تنقل الحالبان البول إلى المثانة الحوضية عبر دخول مائل أحادي الاتجاه. الإحليل أقصر بكثير لدى الإناث منه لدى الذكور، وهو فرق تشريحي ذو صلة بالقسطرة البولية.",
  },
  {
    slug: "urinary-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Describe the blood supply to and from the kidney.",
      "Explain the nervous system's role in the micturition reflex.",
      "Describe the structural basis of the kidney's role in blood pressure regulation.",
    ],
    objectivesAr: [
      "وصف التروية الدموية الداخلة إلى الكلية والخارجة منها.",
      "شرح دور الجهاز العصبي في منعكس التبول.",
      "وصف الأساس البنيوي لدور الكلية في تنظيم ضغط الدم.",
    ],
    contentEn: `## Blood Supply
Each kidney receives blood directly from a **renal artery**, a short, wide branch of the abdominal aorta — a reflection of how much blood the kidneys filter (roughly a fifth of the heart's total output at rest). Filtered blood leaves via the **renal vein**, which drains into the inferior vena cava. This direct connection to the aorta and vena cava is what anatomically links the urinary and cardiovascular systems.

## Nervous Control of Micturition
The bladder wall contains smooth muscle (the **detrusor muscle**), and its outlet is controlled by two sphincters: an **internal urethral sphincter** (smooth muscle, involuntary) and an **external urethral sphincter** (skeletal muscle, voluntary). As the bladder fills, stretch receptors in its wall send signals via the autonomic nervous system, triggering the **micturition reflex**: the detrusor muscle contracts and the internal sphincter relaxes involuntarily, while the external sphincter can still be consciously controlled — allowing a person to delay urination until it is socially appropriate, up to the bladder's physical capacity.

## Kidney and Blood Pressure
The kidneys' role in blood pressure regulation is structurally tied to specialized cells near the glomerulus, the **juxtaglomerular apparatus**, which senses blood pressure and sodium levels. When blood pressure drops, these cells release **renin**, an enzyme that starts a hormonal pathway leading to blood vessel constriction and sodium/water retention — anatomically linking the kidney, blood vessels, and adrenal glands in blood pressure control.`,
    contentAr: `## التروية الدموية
تستقبل كل كلية الدم مباشرة من **الشريان الكلوي**، وهو فرع قصير وعريض من الأبهر البطني — مما يعكس كمية الدم الكبيرة التي ترشّحها الكليتان (نحو خُمس ناتج القلب الكلي أثناء الراحة). ويخرج الدم المرشَّح عبر **الوريد الكلوي**، الذي يصب في الوريد الأجوف السفلي. وهذا الاتصال المباشر بالأبهر والوريد الأجوف هو ما يربط تشريحيًا بين الجهازين البولي والقلبي الوعائي.

## التحكم العصبي بالتبول
يحتوي جدار المثانة على عضلة ملساء (**العضلة النافصة**)، ويتحكم بمخرجها عاصرتان: **عاصرة إحليلية داخلية** (عضلة ملساء، لا إرادية) و**عاصرة إحليلية خارجية** (عضلة هيكلية، إرادية). ومع امتلاء المثانة، ترسل مستقبلات التمدد في جدارها إشارات عبر الجهاز العصبي الذاتي، مما يحفّز **منعكس التبول**: تنقبض العضلة النافصة وتسترخي العاصرة الداخلية لا إراديًا، بينما يمكن التحكم بالعاصرة الخارجية بشكل واعٍ — مما يتيح للشخص تأجيل التبول حتى يكون مناسبًا اجتماعيًا، ضمن حدود السعة الفعلية للمثانة.

## الكلية وضغط الدم
يرتبط دور الكليتين في تنظيم ضغط الدم بنيويًا بخلايا متخصصة بالقرب من الكُبَيبة، تُسمى **الجهاز المجاور للكُبَيبة**، وتستشعر ضغط الدم ومستويات الصوديوم. وعندما ينخفض ضغط الدم، تفرز هذه الخلايا **الرينين**، وهو إنزيم يبدأ مسارًا هرمونيًا يؤدي إلى تضيّق الأوعية الدموية واحتجاز الصوديوم والماء — مما يربط تشريحيًا بين الكلية والأوعية الدموية والغدد الكظرية في التحكم بضغط الدم.`,
    terms: [
      { en: "Renal artery", ar: "الشريان الكلوي" },
      { en: "Detrusor muscle", ar: "العضلة النافصة" },
      { en: "Micturition reflex", ar: "منعكس التبول" },
      { en: "Juxtaglomerular apparatus", ar: "الجهاز المجاور للكُبَيبة" },
      { en: "Renin", ar: "الرينين" },
    ],
    summaryEn:
      "The renal artery (from the aorta) and renal vein (to the vena cava) directly link the kidneys to the cardiovascular system. Micturition is coordinated by autonomic control of the detrusor muscle and internal sphincter, with voluntary control retained at the external sphincter. The juxtaglomerular apparatus links the kidney to blood pressure regulation via renin.",
    summaryAr:
      "يربط الشريان الكلوي (من الأبهر) والوريد الكلوي (إلى الوريد الأجوف) الكليتين مباشرة بالجهاز القلبي الوعائي. يُنسَّق التبول عبر تحكم ذاتي بالعضلة النافصة والعاصرة الداخلية، مع بقاء تحكم إرادي عند العاصرة الخارجية. يربط الجهاز المجاور للكُبَيبة الكلية بتنظيم ضغط الدم عبر الرينين.",
  },
  {
    slug: "urinary-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Identify anatomical landmarks relevant to urinary catheterization.",
      "Describe the costovertebral angle and its clinical significance.",
      "Explain basic anatomical considerations for bladder assessment.",
    ],
    objectivesAr: [
      "تحديد المعالم التشريحية ذات الصلة بالقسطرة البولية.",
      "وصف زاوية الفقار الضلعي وأهميتها السريرية.",
      "شرح الاعتبارات التشريحية الأساسية لتقييم المثانة.",
    ],
    contentEn: `## Catheterization Landmarks
Correctly locating the **urethral meatus** (external opening of the urethra) is the essential first step in inserting a urinary catheter:
- In females, the meatus lies between the clitoris (superiorly) and the vaginal opening (inferiorly) — a position that can be easily confused in an unfamiliar exam, making careful visualization important.
- In males, the meatus is at the tip of the glans penis, and the much longer urethral path (through the prostate and pelvic floor) requires a longer catheter and gentle, steady advancement.

## Costovertebral Angle
The **costovertebral angle (CVA)** is the angle formed on the back between the lowest rib and the spine, roughly overlying the kidneys. Tenderness when this area is percussed (**CVA tenderness**) is a classic clinical sign of kidney involvement, such as pyelonephritis (kidney infection), because the kidneys lie just deep to this landmark.

## Bladder Assessment
Because the bladder lies low in the pelvis behind the pubic bone, an empty bladder usually cannot be felt or percussed. However, when significantly distended (e.g., in urinary retention), it rises above the pubic symphysis and becomes palpable and percussible as a dull, rounded mass in the lower abdomen — a useful anatomical basis for assessing suspected urinary retention.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## معالم القسطرة البولية
يُعدّ تحديد **الفوهة الإحليلية** (الفتحة الخارجية للإحليل) بدقة الخطوة الأولى الأساسية عند إدخال قسطرة بولية:
- لدى الإناث، تقع الفوهة بين البظر (أعلاها) وفتحة المهبل (أسفلها) — وهو موضع يمكن الخلط فيه بسهولة في فحص غير مألوف، مما يجعل التصوّر البصري الدقيق أمرًا مهمًا.
- لدى الذكور، تقع الفوهة عند طرف حشفة القضيب، ويتطلب المسار الإحليلي الأطول بكثير (عبر البروستاتا وأرضية الحوض) قسطرة أطول وتقدمًا لطيفًا وثابتًا.

## زاوية الفقار الضلعي
**زاوية الفقار الضلعي** هي الزاوية المتشكّلة على الظهر بين أدنى ضلع والعمود الفقري، وتقع تقريبًا فوق الكليتين. ويُعدّ الألم عند النقر على هذه المنطقة (**ألم زاوية الفقار الضلعي**) علامة سريرية كلاسيكية لتأثر الكلية، كما في التهاب الحويضة والكلية (عدوى الكلية)، لأن الكليتين تقعان أسفل هذا المعلم مباشرة.

## تقييم المثانة
نظرًا لأن المثانة تقع منخفضة في الحوض خلف عظم العانة، لا يمكن عادةً جسّ المثانة الفارغة أو النقر عليها. لكن عندما تكون متمددة بشكل ملحوظ (كما في احتباس البول)، ترتفع فوق الارتفاق العاني وتصبح قابلة للجسّ والنقر ككتلة مستديرة كليلة في أسفل البطن — وهو أساس تشريحي مفيد لتقييم الاشتباه باحتباس البول.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Urethral meatus", ar: "الفوهة الإحليلية" },
      { en: "Costovertebral angle", ar: "زاوية الفقار الضلعي" },
      { en: "Pyelonephritis", ar: "التهاب الحويضة والكلية" },
      { en: "Urinary retention", ar: "احتباس البول" },
      { en: "Urinary catheter", ar: "القسطرة البولية" },
    ],
    summaryEn:
      "Correct catheterization depends on locating the urethral meatus, which differs in position and depth between sexes. CVA tenderness suggests kidney involvement. A significantly distended bladder rises above the pubic symphysis and becomes palpable.",
    summaryAr:
      "تعتمد القسطرة الصحيحة على تحديد موقع الفوهة الإحليلية، التي تختلف في موقعها وعمقها بين الجنسين. يشير ألم زاوية الفقار الضلعي إلى تأثر الكلية. ترتفع المثانة المتمددة بشكل ملحوظ فوق الارتفاق العاني وتصبح قابلة للجسّ.",
  },
].map((lesson) => ({ ...lesson, references: lesson.references ?? REFERENCES }));

const questions = [
  {
    lessonSlug: "urinary-introduction",
    type: "MCQ",
    textEn: "Which hormone produced by the kidneys stimulates red blood cell production?",
    textAr: "أي هرمون تنتجه الكليتان يحفّز إنتاج خلايا الدم الحمراء؟",
    choices: [
      { id: "a", en: "Renin", ar: "الرينين" },
      { id: "b", en: "Erythropoietin", ar: "الإريثروبويتين" },
      { id: "c", en: "Insulin", ar: "الإنسولين" },
      { id: "d", en: "Aldosterone", ar: "الألدوستيرون" },
    ],
    correct: "b",
    explanationEn:
      "Erythropoietin, produced by the kidneys, stimulates red blood cell production in the bone marrow.",
    explanationAr:
      "يحفّز الإريثروبويتين، الذي تنتجه الكليتان، إنتاج خلايا الدم الحمراء في نخاع العظم.",
  },
  {
    lessonSlug: "urinary-introduction",
    type: "MCQ",
    textEn: "Which organ stores urine before elimination?",
    textAr: "أي عضو يخزّن البول قبل طرحه؟",
    choices: [
      { id: "a", en: "Kidney", ar: "الكلية" },
      { id: "b", en: "Ureter", ar: "الحالب" },
      { id: "c", en: "Urinary bladder", ar: "المثانة البولية" },
      { id: "d", en: "Urethra", ar: "الإحليل" },
    ],
    correct: "c",
    explanationEn:
      "The urinary bladder is the muscular, expandable organ that stores urine before it is eliminated through the urethra.",
    explanationAr:
      "المثانة البولية هي العضو العضلي القابل للتمدد الذي يخزّن البول قبل طرحه عبر الإحليل.",
  },
  {
    lessonSlug: "urinary-anatomical-structures",
    type: "MCQ",
    textEn: "What is the functional unit of the kidney called?",
    textAr: "ما اسم الوحدة الوظيفية للكلية؟",
    choices: [
      { id: "a", en: "Nephron", ar: "النُّبيب الكلوي (النفرون)" },
      { id: "b", en: "Calyx", ar: "الكؤيس" },
      { id: "c", en: "Renal pyramid", ar: "الهرم الكلوي" },
      { id: "d", en: "Renal pelvis", ar: "حوض الكلية" },
    ],
    correct: "a",
    explanationEn:
      "The nephron is the microscopic functional unit of the kidney, where blood filtration and urine formation take place.",
    explanationAr:
      "النُّبيب الكلوي (النفرون) هو الوحدة الوظيفية المجهرية للكلية، حيث يحدث ترشيح الدم وتكوّن البول.",
  },
  {
    lessonSlug: "urinary-anatomical-structures",
    type: "MCQ",
    textEn: "Where does initial blood filtration occur within the nephron?",
    textAr: "أين يحدث الترشيح الأولي للدم داخل النُّبيب الكلوي؟",
    choices: [
      { id: "a", en: "Loop of Henle", ar: "عروة هنلي" },
      { id: "b", en: "Collecting duct", ar: "قناة التجميع" },
      { id: "c", en: "Renal corpuscle (glomerulus and Bowman's capsule)", ar: "الجسيم الكلوي (الكُبَيبة ومحفظة بومان)" },
      { id: "d", en: "Distal convoluted tubule", ar: "الأنبوب الملتف البعيد" },
    ],
    correct: "c",
    explanationEn:
      "Initial filtration occurs at the renal corpuscle, where the glomerulus (a capillary knot) is surrounded by Bowman's capsule.",
    explanationAr:
      "يحدث الترشيح الأولي عند الجسيم الكلوي، حيث تحاط الكُبَيبة (عقدة شعرية) بمحفظة بومان.",
  },
  {
    lessonSlug: "urinary-organs-locations",
    type: "MCQ",
    textEn: "The kidneys are located approximately at which vertebral levels?",
    textAr: "تقع الكليتان تقريبًا عند أي مستوى فقري؟",
    choices: [
      { id: "a", en: "C1–C7", ar: "C1–C7" },
      { id: "b", en: "T12–L3", ar: "T12–L3" },
      { id: "c", en: "L4–L5", ar: "L4–L5" },
      { id: "d", en: "S1–S5", ar: "S1–S5" },
    ],
    correct: "b",
    explanationEn:
      "The kidneys are retroperitoneal organs located roughly between the T12 and L3 vertebrae, with the right kidney slightly lower due to the liver.",
    explanationAr:
      "الكليتان عضوان خلف الصفاق، يقعان تقريبًا بين الفقرتين T12 وL3، وتقع الكلية اليمنى أدنى قليلًا بسبب الكبد.",
  },
  {
    lessonSlug: "urinary-organs-locations",
    type: "CASE_BASED",
    textEn: "A nurse is preparing to catheterize a male patient. Compared with a female patient, what anatomical difference is most clinically relevant?",
    textAr: "تستعد ممرضة لقسطرة مريض ذكر. مقارنة بالمريضة الأنثى، ما الفرق التشريحي الأكثر أهمية سريريًا؟",
    choices: [
      { id: "a", en: "The male urethra is much longer and passes through the prostate", ar: "الإحليل لدى الذكر أطول بكثير ويمر عبر البروستاتا" },
      { id: "b", en: "The male bladder is located in the abdomen, not the pelvis", ar: "تقع مثانة الذكر في البطن وليس الحوض" },
      { id: "c", en: "Males have two urethras", ar: "يمتلك الذكور إحليلين" },
      { id: "d", en: "There is no meaningful anatomical difference", ar: "لا يوجد فرق تشريحي ذو أهمية" },
    ],
    correct: "a",
    explanationEn:
      "The male urethra (about 18–20 cm) is much longer than the female urethra (about 3–5 cm) and passes through the prostate gland, requiring a longer catheter and careful technique.",
    explanationAr:
      "الإحليل لدى الذكر (حوالي 18–20 سم) أطول بكثير من إحليل الأنثى (حوالي 3–5 سم) ويمر عبر غدة البروستاتا، مما يتطلب قسطرة أطول وتقنية دقيقة.",
  },
  {
    lessonSlug: "urinary-anatomical-relationships",
    type: "MCQ",
    textEn: "Which vessel supplies blood directly to the kidney from the aorta?",
    textAr: "أي وعاء يزوّد الكلية بالدم مباشرة من الأبهر؟",
    choices: [
      { id: "a", en: "Renal vein", ar: "الوريد الكلوي" },
      { id: "b", en: "Renal artery", ar: "الشريان الكلوي" },
      { id: "c", en: "Inferior vena cava", ar: "الوريد الأجوف السفلي" },
      { id: "d", en: "Hepatic artery", ar: "الشريان الكبدي" },
    ],
    correct: "b",
    explanationEn:
      "The renal artery, a short, wide branch of the abdominal aorta, supplies blood directly to each kidney.",
    explanationAr:
      "يزوّد الشريان الكلوي، وهو فرع قصير وعريض من الأبهر البطني، كل كلية بالدم مباشرة.",
  },
  {
    lessonSlug: "urinary-anatomical-relationships",
    type: "MCQ",
    textEn: "Which muscle contracts to expel urine from the bladder during micturition?",
    textAr: "أي عضلة تنقبض لطرد البول من المثانة أثناء التبول؟",
    choices: [
      { id: "a", en: "External urethral sphincter", ar: "العاصرة الإحليلية الخارجية" },
      { id: "b", en: "Detrusor muscle", ar: "العضلة النافصة" },
      { id: "c", en: "Diaphragm", ar: "الحجاب الحاجز" },
      { id: "d", en: "Pyloric sphincter", ar: "العضلة العاصرة البوابية" },
    ],
    correct: "b",
    explanationEn:
      "The detrusor muscle, the smooth muscle of the bladder wall, contracts during the micturition reflex to expel urine.",
    explanationAr:
      "تنقبض العضلة النافصة، وهي العضلة الملساء في جدار المثانة، أثناء منعكس التبول لطرد البول.",
  },
  {
    lessonSlug: "urinary-anatomical-relationships",
    type: "TRUE_FALSE",
    textEn: "The external urethral sphincter is under voluntary control.",
    textAr: "تخضع العاصرة الإحليلية الخارجية لتحكم إرادي.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "The external urethral sphincter is skeletal muscle under voluntary control, allowing a person to delay urination.",
    explanationAr:
      "العاصرة الإحليلية الخارجية عضلة هيكلية تخضع لتحكم إرادي، مما يتيح للشخص تأجيل التبول.",
  },
  {
    lessonSlug: "urinary-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Tenderness at the costovertebral angle is classically associated with which condition?",
    textAr: "يرتبط الألم عند زاوية الفقار الضلعي بشكل كلاسيكي بأي حالة؟",
    choices: [
      { id: "a", en: "Appendicitis", ar: "التهاب الزائدة الدودية" },
      { id: "b", en: "Pyelonephritis (kidney infection)", ar: "التهاب الحويضة والكلية (عدوى الكلية)" },
      { id: "c", en: "Gallstones", ar: "الحصى المرارية" },
      { id: "d", en: "Peptic ulcer", ar: "القرحة الهضمية" },
    ],
    correct: "b",
    explanationEn:
      "Costovertebral angle tenderness is a classic sign of kidney involvement, such as pyelonephritis, since the kidneys lie just deep to this landmark.",
    explanationAr:
      "يُعدّ ألم زاوية الفقار الضلعي علامة كلاسيكية لتأثر الكلية، كما في التهاب الحويضة والكلية، لأن الكليتين تقعان أسفل هذا المعلم مباشرة.",
  },
  {
    lessonSlug: "urinary-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "A significantly distended bladder becomes palpable above which landmark?",
    textAr: "تصبح المثانة المتمددة بشكل ملحوظ قابلة للجسّ فوق أي معلم؟",
    choices: [
      { id: "a", en: "Xiphoid process", ar: "الناتئ الرهابي" },
      { id: "b", en: "Iliac crest", ar: "قمة الحرقفة" },
      { id: "c", en: "Pubic symphysis", ar: "الارتفاق العاني" },
      { id: "d", en: "Costovertebral angle", ar: "زاوية الفقار الضلعي" },
    ],
    correct: "c",
    explanationEn:
      "A significantly distended bladder rises above the pubic symphysis, becoming palpable and percussible in the lower abdomen.",
    explanationAr:
      "ترتفع المثانة المتمددة بشكل ملحوظ فوق الارتفاق العاني، فتصبح قابلة للجسّ والنقر في أسفل البطن.",
  },
];

module.exports = { lessons, questions, REFERENCES };
