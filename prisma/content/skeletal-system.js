// Real, written-from-scratch educational content for the Skeletal System
// module (Anatomy course). Facts are drawn from standard, widely taught
// anatomy knowledge; further reading references point to open academic
// resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 6: Bone Tissue and the Skeletal System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/6-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Bones\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK537199/",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Fracture Healing Overview\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK551678/",
  },
];

const lessons = [
  {
    slug: "skeletal-introduction",
    order: 1,
    titleEn: "Introduction to the Skeletal System",
    titleAr: "مقدمة عن الجهاز الهيكلي",
    objectivesEn: [
      "Describe the main functions of the skeletal system.",
      "Distinguish between the axial and appendicular skeleton.",
      "State the approximate number of bones in the adult human skeleton.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز الهيكلي.",
      "التمييز بين الهيكل المحوري والهيكل الطرفي.",
      "ذكر العدد التقريبي لعظام الهيكل لدى الإنسان البالغ.",
    ],
    contentEn: `## Overview
The skeletal system is the framework of the human body, composed of bones, cartilage, ligaments, and joints. In an adult, it typically consists of **206 bones**, though infants are born with roughly 270–300 bones and cartilage pieces that fuse together during growth.

## Main Functions
1. **Support** – Bones form the structural framework that supports the body and maintains its shape.
2. **Protection** – The skull protects the brain, the rib cage protects the heart and lungs, and the vertebral column protects the spinal cord.
3. **Movement** – Bones act as levers that muscles pull on via tendons, enabling movement at joints.
4. **Mineral storage and homeostasis** – Bones store calcium and phosphate and release them into the blood when needed.
5. **Blood cell production (hematopoiesis)** – Red bone marrow, found in certain bones, produces red blood cells, white blood cells, and platelets.
6. **Fat storage** – Yellow bone marrow stores triglycerides as an energy reserve.

## Two Major Divisions
- **Axial skeleton** (80 bones): skull, vertebral column, and rib cage/sternum — forms the vertical, central axis of the body and also serves as the attachment site for muscles that move the head, neck, and back.
- **Appendicular skeleton** (126 bones): bones of the upper limbs, lower limbs, and the girdles that attach them to the axial skeleton. Its lower portion is specialized for stability during walking or running, while its upper portion has greater mobility, allowing you to lift and carry objects.

![Diagram of the human skeleton with the axial skeleton highlighted](https://commons.wikimedia.org/wiki/Special:FilePath/Axial_skeleton_diagram.svg)
*Axial skeleton diagram, by Mariana Ruiz Villarreal (LadyofHats), public domain, via Wikimedia Commons.*

Understanding this division helps organize the study of anatomy: the axial skeleton primarily protects vital organs, while the appendicular skeleton primarily enables movement — a distinction that is clinically relevant when assessing trauma or planning patient positioning.

## Bone as an Endocrine Organ
Beyond mineral storage, bone tissue itself acts as an endocrine organ. Osteocytes secrete **FGF23**, a hormone that acts on the kidneys to regulate phosphate and vitamin D metabolism, while osteoblasts secrete **osteocalcin**, which promotes insulin secretion and improves glucose metabolism — a reminder that bone health is connected to endocrine and metabolic health, not just structural support.`,
    contentAr: `## نظرة عامة
الجهاز الهيكلي هو الإطار الداعم لجسم الإنسان، ويتكوّن من العظام والغضاريف والأربطة والمفاصل. يتكوّن هيكل الشخص البالغ عادةً من **206 عظمة**، بينما يولد الرضيع بحوالي 270–300 عظمة وقطعة غضروفية تندمج مع النمو لتشكّل العدد النهائي.

## الوظائف الرئيسية
1. **الدعم** – توفر العظام الإطار الهيكلي الذي يدعم الجسم ويحافظ على شكله.
2. **الحماية** – تحمي الجمجمة الدماغ، ويحمي القفص الصدري القلب والرئتين، ويحمي العمود الفقري النخاع الشوكي.
3. **الحركة** – تعمل العظام كروافع تشدّها العضلات عبر الأوتار، مما يتيح الحركة عند المفاصل.
4. **تخزين المعادن وتنظيم توازنها** – تخزّن العظام الكالسيوم والفوسفات وتُطلقهما في الدم عند الحاجة.
5. **إنتاج خلايا الدم (تكوين الدم)** – ينتج نخاع العظم الأحمر، الموجود في عظام معينة، خلايا الدم الحمراء والبيضاء والصفائح الدموية.
6. **تخزين الدهون** – يخزّن نخاع العظم الأصفر الدهون الثلاثية كمخزون للطاقة.

## التقسيمان الرئيسيان
- **الهيكل المحوري** (80 عظمة): الجمجمة والعمود الفقري والقفص الصدري/عظم القص — يشكّل المحور المركزي للجسم.
- **الهيكل الطرفي** (126 عظمة): عظام الأطراف العلوية والسفلية، وأحزمة ربطها بالهيكل المحوري.

فهم هذا التقسيم يساعد على تنظيم دراسة التشريح: يهتم الهيكل المحوري أساسًا بحماية الأعضاء الحيوية، بينما يهتم الهيكل الطرفي أساسًا بالحركة — وهو تمييز له أهمية سريرية عند تقييم الإصابات أو تخطيط وضعية المريض.`,
    terms: [
      { en: "Axial skeleton", ar: "الهيكل المحوري" },
      { en: "Appendicular skeleton", ar: "الهيكل الطرفي" },
      { en: "Hematopoiesis", ar: "تكوين الدم" },
      { en: "Bone marrow", ar: "نخاع العظم" },
      { en: "Ossification", ar: "التعظّم" },
    ],
    summaryEn:
      "The skeletal system supports, protects, and moves the body, stores minerals and fat, and produces blood cells. It is divided into the axial skeleton (skull, spine, rib cage) and appendicular skeleton (limbs and girdles).",
    summaryAr:
      "يدعم الجهاز الهيكلي الجسم ويحميه ويحرّكه، ويخزّن المعادن والدهون، وينتج خلايا الدم. ينقسم إلى الهيكل المحوري (الجمجمة، العمود الفقري، القفص الصدري) والهيكل الطرفي (الأطراف والأحزمة).",
  },
  {
    slug: "skeletal-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures of Bone",
    titleAr: "البنى التشريحية للعظام",
    objectivesEn: [
      "Classify bones by shape into long, short, flat, irregular, and sesamoid bones.",
      "Describe the microscopic organization of compact and spongy bone.",
      "Identify the parts of a typical long bone.",
    ],
    objectivesAr: [
      "تصنيف العظام حسب الشكل إلى طويلة وقصيرة ومسطحة وغير منتظمة وسمسمانية.",
      "وصف التنظيم المجهري للعظم المتراص والعظم الإسفنجي.",
      "تحديد أجزاء العظم الطويل النموذجي.",
    ],
    contentEn: `## Classification of Bones by Shape
- **Long bones**: longer than they are wide (e.g., femur, humerus). Function mainly in leverage and movement.
- **Short bones**: roughly cube-shaped (e.g., carpals, tarsals). Provide stability with limited movement.
- **Flat bones**: thin, often curved (e.g., sternum, scapula, cranial bones). Provide protection and broad surfaces for muscle attachment.
- **Irregular bones**: complex shapes that fit none of the other categories (e.g., vertebrae, facial bones).
- **Sesamoid bones**: small, rounded bones embedded within tendons (e.g., the patella), which reduce friction and change the angle of muscle pull.

## Bone Tissue Types
- **Compact (cortical) bone**: dense outer layer providing strength, organized into structural units called **osteons (Haversian systems)**, each with a central canal carrying blood vessels and nerves.
- **Spongy (cancellous) bone**: found at the ends of long bones and inside flat/irregular bones; made of a lattice of trabeculae, lighter in weight, and houses red bone marrow.

## Structure of a Typical Long Bone
- **Diaphysis**: the shaft; mostly compact bone surrounding a **medullary cavity** containing yellow marrow in adults.
- **Epiphysis** (proximal and distal): the wider ends, mostly spongy bone, covered with **articular cartilage** where the bone forms a joint.
- **Metaphysis**: the region between diaphysis and epiphysis; site of the growth plate in growing bones.
- **Periosteum**: tough connective tissue membrane covering the outer surface, containing nerves, blood vessels, and cells responsible for bone growth and repair.
- **Endosteum**: thin membrane lining the internal marrow cavity.`,
    contentAr: `## تصنيف العظام حسب الشكل
- **العظام الطويلة**: طولها أكبر من عرضها (مثل عظم الفخذ وعظم العضد). وظيفتها الأساسية الرفع والحركة.
- **العظام القصيرة**: شبه مكعبة الشكل (مثل عظام الرسغ والكاحل). توفر ثباتًا مع حركة محدودة.
- **العظام المسطحة**: رقيقة وغالبًا منحنية (مثل عظم القص ولوح الكتف وعظام الجمجمة). توفر الحماية ومساحات واسعة لارتباط العضلات.
- **العظام غير المنتظمة**: ذات أشكال معقدة لا تندرج ضمن الفئات الأخرى (مثل الفقرات وعظام الوجه).
- **العظام السمسمانية**: عظيمات صغيرة مستديرة مدمجة داخل الأوتار (مثل الرضفة)، تقلل الاحتكاك وتغيّر زاوية شد العضلة.

## أنواع النسيج العظمي
- **العظم المتراص (القشري)**: طبقة خارجية كثيفة توفر القوة، وينظّم في وحدات بنائية تسمى **الأسياخ العظمية (أنظمة هافرس)**، ولكل منها قناة مركزية تحمل الأوعية الدموية والأعصاب.
- **العظم الإسفنجي**: يوجد في أطراف العظام الطويلة وداخل العظام المسطحة وغير المنتظمة، ويتكوّن من شبكة من الحُوَيصلات العظمية، وهو أخف وزنًا، ويحتوي على نخاع العظم الأحمر.

## تركيب العظم الطويل النموذجي
- **جسم العظم (الديافيز)**: الجزء الأوسط الطويل، غالبيته عظم متراص يحيط بـ **التجويف النخاعي** الذي يحتوي على النخاع الأصفر لدى البالغين.
- **المشاش (القريب والبعيد)**: الأطراف العريضة، غالبيته عظم إسفنجي، ومغطى بـ **الغضروف المفصلي** حيث يشكّل العظم مفصلًا.
- **المنطقة الكردوسية (الميتافيز)**: المنطقة بين الديافيز والمشاش، وهي موضع صفيحة النمو لدى العظام النامية.
- **السمحاق**: غشاء ضام قوي يغطي السطح الخارجي، ويحتوي على أعصاب وأوعية دموية وخلايا مسؤولة عن نمو العظم وإصلاحه.
- **الشغاف العظمي**: غشاء رقيق يبطّن التجويف النخاعي الداخلي.`,
    terms: [
      { en: "Osteon", ar: "السيخ العظمي" },
      { en: "Diaphysis", ar: "الديافيز (جسم العظم)" },
      { en: "Epiphysis", ar: "المشاش" },
      { en: "Periosteum", ar: "السمحاق" },
      { en: "Medullary cavity", ar: "التجويف النخاعي" },
    ],
    summaryEn:
      "Bones are classified by shape (long, short, flat, irregular, sesamoid) and made of compact and spongy tissue. A long bone has a diaphysis, epiphyses, metaphysis, periosteum, and endosteum.",
    summaryAr:
      "تُصنَّف العظام حسب الشكل (طويلة، قصيرة، مسطحة، غير منتظمة، سمسمانية) وتتكوّن من نسيج متراص وإسفنجي. يتكوّن العظم الطويل من الديافيز والمشاش والمنطقة الكردوسية والسمحاق والشغاف العظمي.",
  },
  {
    slug: "skeletal-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Identify the major bones of the axial skeleton and their general locations.",
      "Identify the major bones and regions of the appendicular skeleton.",
      "Relate the location of key bones to clinical nursing landmarks.",
    ],
    objectivesAr: [
      "تحديد العظام الرئيسية في الهيكل المحوري ومواقعها العامة.",
      "تحديد العظام والمناطق الرئيسية في الهيكل الطرفي.",
      "ربط مواقع العظام الرئيسية بالمعالم السريرية المستخدمة تمريضيًا.",
    ],
    contentEn: `## Axial Skeleton
- **Skull**: cranium (8 bones protecting the brain) and facial bones (14 bones, e.g., mandible, maxilla, zygomatic bones).
- **Vertebral column**: 26 bones total — 7 cervical, 12 thoracic, 5 lumbar vertebrae, plus the sacrum and coccyx.
- **Thoracic cage**: sternum and 12 pairs of ribs (7 "true" ribs attached directly to the sternum, 3 pairs of "false" ribs attached indirectly, and 2 pairs of "floating" ribs).

## Appendicular Skeleton
- **Pectoral (shoulder) girdle**: clavicle and scapula, connecting the upper limb to the axial skeleton.
- **Upper limb**: humerus (arm), radius and ulna (forearm), carpals (wrist), metacarpals and phalanges (hand and fingers).
- **Pelvic girdle**: the hip bones (each formed by fusion of the ilium, ischium, and pubis), connecting the lower limb to the axial skeleton.
- **Lower limb**: femur (thigh), patella (kneecap), tibia and fibula (leg), tarsals (ankle), metatarsals and phalanges (foot and toes).

## Why Location Matters Clinically
Knowing precisely where each bone sits allows a nurse to describe pain location accurately, recognize anatomical landmarks used for procedures (e.g., the iliac crest for intramuscular injections or bone marrow aspiration), and understand which organs a given bone protects when assessing trauma.`,
    contentAr: `## الهيكل المحوري
- **الجمجمة**: القحف (8 عظام تحمي الدماغ) وعظام الوجه (14 عظمة، مثل الفك السفلي والفك العلوي وعظام الوجنة).
- **العمود الفقري**: 26 عظمة إجمالًا — 7 فقرات عنقية، و12 فقرة صدرية، و5 فقرات قطنية، بالإضافة إلى العجز والعصعص.
- **القفص الصدري**: عظم القص و12 زوجًا من الأضلاع (7 أزواج "حقيقية" متصلة مباشرة بعظم القص، و3 أزواج "كاذبة"، وزوجان "عائمان").

## الهيكل الطرفي
- **الحزام الصدري (الكتف)**: عظم الترقوة ولوح الكتف، ويربطان الطرف العلوي بالهيكل المحوري.
- **الطرف العلوي**: عظم العضد، الكعبرة والزند، عظام الرسغ، عظام المشط والسلاميات.
- **الحزام الحوضي**: عظما الورك (يتشكّل كل منهما من اندماج الحرقفة والإسك والعانة)، ويربطان الطرف السفلي بالهيكل المحوري.
- **الطرف السفلي**: عظم الفخذ، الرضفة، الظنبوب والشظية، عظام الكاحل، عظام المشط والسلاميات.

## أهمية الموقع من الناحية السريرية
معرفة الموقع الدقيق لكل عظمة تتيح للممرض وصف مكان الألم بدقة، والتعرّف على المعالم التشريحية المستخدمة في الإجراءات (مثل قمة الحرقفة للحقن العضلي أو سحب نخاع العظم)، وفهم أي الأعضاء تحميها عظمة معينة عند تقييم الإصابات.`,
    terms: [
      { en: "Cranium", ar: "القحف" },
      { en: "Vertebral column", ar: "العمود الفقري" },
      { en: "Pectoral girdle", ar: "الحزام الصدري" },
      { en: "Pelvic girdle", ar: "الحزام الحوضي" },
      { en: "Iliac crest", ar: "قمة الحرقفة" },
    ],
    summaryEn:
      "The axial skeleton (skull, vertebral column, thoracic cage) protects vital organs; the appendicular skeleton (girdles and limbs) enables movement. Precise knowledge of bone location supports clinical assessment and procedures.",
    summaryAr:
      "يحمي الهيكل المحوري (الجمجمة والعمود الفقري والقفص الصدري) الأعضاء الحيوية، بينما يتيح الهيكل الطرفي (الأحزمة والأطراف) الحركة. تدعم المعرفة الدقيقة بمواقع العظام التقييم السريري والإجراءات.",
  },
  {
    slug: "skeletal-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Classify joints structurally and functionally.",
      "Describe how the skeletal system interacts with the muscular system.",
      "Explain the relationship between bone and the nervous/circulatory systems.",
    ],
    objectivesAr: [
      "تصنيف المفاصل بنيويًا ووظيفيًا.",
      "وصف تفاعل الجهاز الهيكلي مع الجهاز العضلي.",
      "شرح العلاقة بين العظم والجهازين العصبي والدوري.",
    ],
    contentEn: `## Classifying Joints
**Structural classification** (by connecting tissue):
- **Fibrous joints**: bones connected by dense connective tissue, little/no movement (e.g., skull sutures).
- **Cartilaginous joints**: bones connected by cartilage, slight movement (e.g., intervertebral discs, pubic symphysis).
- **Synovial joints**: a fluid-filled joint cavity allows free movement (e.g., knee, shoulder, elbow) — the most common and clinically significant type.

**Functional classification** (by movement allowed):
- **Synarthroses**: immovable joints.
- **Amphiarthroses**: slightly movable joints.
- **Diarthroses**: freely movable joints (all synovial joints).

## Skeletal–Muscular Relationship
Muscles attach to bones via **tendons**. When a muscle contracts, it pulls on the bone it is attached to, and the bone acts as a lever pivoting at a joint, producing movement. The attachment point on the more stationary bone is the **origin**; the attachment point on the bone that moves is the **insertion**.

## Skeletal–Nervous and Skeletal–Circulatory Relationships
- Bones contain **foramina** (openings) through which nerves and blood vessels pass to reach deeper structures (e.g., the foramen magnum for the spinal cord).
- Red bone marrow, housed within spongy bone, participates directly in blood cell production, linking the skeletal system to hematology.
- Bone tissue is richly supplied by blood vessels entering through the periosteum, essential for healing after a fracture.`,
    contentAr: `## تصنيف المفاصل
**التصنيف البنيوي** (حسب نوع النسيج الرابط):
- **المفاصل الليفية**: عظام متصلة بنسيج ضام كثيف، بحركة قليلة أو معدومة (مثل الدروز الجمجمية).
- **المفاصل الغضروفية**: عظام متصلة بغضروف، بحركة طفيفة (مثل الأقراص الفقرية والارتفاق العاني).
- **المفاصل الزليلية**: تجويف مفصلي مملوء بسائل يسمح بحركة حرة (مثل الركبة والكتف والمرفق) — وهي الأكثر شيوعًا وأهمية سريرية.

**التصنيف الوظيفي** (حسب مدى الحركة):
- **مفاصل ثابتة**: غير قابلة للحركة.
- **مفاصل شبه متحركة**: بحركة محدودة.
- **مفاصل متحركة**: حرة الحركة (جميع المفاصل الزليلية).

## العلاقة بين الجهاز الهيكلي والعضلي
ترتبط العضلات بالعظام عبر **الأوتار**. عند تقلّص العضلة، تشدّ العظمة المرتبطة بها، وتعمل العظمة كرافعة تدور حول المفصل، مما ينتج الحركة. تسمى نقطة ارتباط العضلة بالعظمة الأقل حركة **المنشأ**، ونقطة ارتباطها بالعظمة المتحركة **الاندراج**.

## العلاقة بالجهازين العصبي والدوري
- تحتوي العظام على **ثقوب (فتحات)** تمر عبرها الأعصاب والأوعية الدموية للوصول إلى البنى الأعمق (مثل الثقبة العظمى التي يمر عبرها النخاع الشوكي).
- يشارك نخاع العظم الأحمر، الموجود داخل العظم الإسفنجي، مباشرة في إنتاج خلايا الدم، مما يربط الجهاز الهيكلي بعلم الدم.
- يحصل النسيج العظمي على تروية دموية غنية عبر السمحاق، وهو أمر ضروري للشفاء بعد الكسور.`,
    terms: [
      { en: "Synovial joint", ar: "المفصل الزليلي" },
      { en: "Origin (muscle)", ar: "منشأ العضلة" },
      { en: "Insertion (muscle)", ar: "اندراج العضلة" },
      { en: "Foramen", ar: "الثقبة" },
      { en: "Tendon", ar: "الوتر" },
    ],
    summaryEn:
      "Joints are classified structurally (fibrous, cartilaginous, synovial) and functionally (synarthroses, amphiarthroses, diarthroses). Muscles move bones via tendons at origin/insertion points, and bones interact with the nervous and circulatory systems through foramina and bone marrow.",
    summaryAr:
      "تُصنَّف المفاصل بنيويًا (ليفية، غضروفية، زليلية) ووظيفيًا (ثابتة، شبه متحركة، متحركة). تحرّك العضلات العظام عبر الأوتار عند نقطتي المنشأ والاندراج، وتتفاعل العظام مع الجهازين العصبي والدوري عبر الثقوب ونخاع العظم.",
  },
  {
    slug: "skeletal-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Describe common types of bone fractures relevant to nursing practice.",
      "Explain the basic stages of fracture healing.",
      "Identify anatomical landmarks used in common nursing procedures.",
      "Recognize risk factors and nursing considerations for osteoporosis.",
    ],
    objectivesAr: [
      "وصف الأنواع الشائعة لكسور العظام ذات الصلة بالممارسة التمريضية.",
      "شرح المراحل الأساسية لالتئام الكسور.",
      "تحديد المعالم التشريحية المستخدمة في الإجراءات التمريضية الشائعة.",
      "التعرّف على عوامل الخطر والاعتبارات التمريضية لهشاشة العظام.",
    ],
    contentEn: `## Common Fracture Types
- **Closed (simple) fracture**: the bone breaks but the overlying skin remains intact.
- **Open (compound) fracture**: the broken bone penetrates the skin, carrying a high risk of infection.
- **Greenstick fracture**: an incomplete break, common in children whose bones are more flexible.
- **Comminuted fracture**: the bone shatters into three or more fragments.
- **Stress fracture**: a small crack caused by repetitive force rather than a single traumatic event.

## Basic Stages of Fracture Healing
1. **Hematoma formation** (first few days): a blood clot forms at the fracture site.
2. **Fibrocartilaginous callus formation** (about 1–3 weeks): soft callus bridges the fracture.
3. **Bony callus formation** (about 3–4 months): the soft callus is replaced by hard, spongy bone.
4. **Bone remodeling** (months to years): the bony callus is remodeled into compact bone resembling the bone's original shape.

## Anatomical Landmarks in Nursing Practice
- **Iliac crest**: landmark for ventrogluteal intramuscular injections and bone marrow aspiration.
- **Deltoid tuberosity area / acromion process**: used to locate the deltoid intramuscular injection site.
- **Vertebral spinous processes**: landmarks for lumbar puncture and epidural procedures.
- **Sternal angle**: a palpable landmark used to count ribs and intercostal spaces.

## Osteoporosis: A Key Clinical Consideration
Osteoporosis is a condition in which bone density decreases and bone tissue becomes more porous and fragile, increasing fracture risk — most commonly at the hip, spine, and wrist. Risk factors include older age, female sex (especially post-menopause), low calcium/vitamin D intake, sedentary lifestyle, and smoking. Nursing considerations include fall-prevention measures, patient education, and careful handling during positioning and transfers.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## أنواع الكسور الشائعة
- **الكسر المغلق (البسيط)**: ينكسر العظم بينما يبقى الجلد المغطي له سليمًا.
- **الكسر المفتوح (المركّب)**: يخترق العظم المكسور الجلد، مما يحمل خطرًا عاليًا للعدوى.
- **الكسر الغصني الأخضر**: كسر غير مكتمل، شائع لدى الأطفال الذين تكون عظامهم أكثر مرونة.
- **الكسر المفتت**: يتشظى العظم إلى ثلاث قطع أو أكثر.
- **كسر الإجهاد**: شق صغير ناتج عن قوة متكررة وليس عن حادث رضحي واحد.

## المراحل الأساسية لالتئام الكسر
1. **تكوّن الورم الدموي** (الأيام القليلة الأولى): تتشكّل خثرة دموية في موضع الكسر.
2. **تكوّن الكالس الليفي الغضروفي** (حوالي 1–3 أسابيع): كالس لين يربط بين طرفي الكسر.
3. **تكوّن الكالس العظمي** (حوالي 3–4 أشهر): يُستبدل الكالس اللين بعظم إسفنجي صلب.
4. **إعادة تشكّل العظم** (أشهر إلى سنوات): يُعاد تشكيل الكالس العظمي ليصبح عظمًا متراصًا يشبه الشكل الأصلي.

## المعالم التشريحية في الممارسة التمريضية
- **قمة الحرقفة**: معلم للحقن العضلي الإلوي الأمامي ولسحب نخاع العظم.
- **منطقة درنة الدالية / الناتئ الأخرمي**: تُستخدم لتحديد موضع الحقن العضلي في عضلة الدالية.
- **النواتئ الشوكية للفقرات**: معالم للبزل القطني وإجراءات فوق الجافية.
- **زاوية القص**: معلم يمكن جسّه يُستخدم لعدّ الأضلاع والمسافات الوربية.

## هشاشة العظام: اعتبار سريري مهم
هشاشة العظام حالة تنخفض فيها كثافة العظم ويصبح النسيج العظمي أكثر مسامية وهشاشة، مما يزيد من خطر الكسور — وأكثرها شيوعًا عند الورك والعمود الفقري والرسغ. تشمل عوامل الخطر التقدم في العمر، والجنس الأنثوي (خاصة بعد انقطاع الطمث)، وانخفاض تناول الكالسيوم وفيتامين د، ونمط الحياة الخامل، والتدخين. تشمل الاعتبارات التمريضية الوقاية من السقوط، وتثقيف المريض، والتعامل بحذر أثناء التموضع والنقل.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Fracture", ar: "الكسر" },
      { en: "Callus (bone)", ar: "الكالس العظمي" },
      { en: "Osteoporosis", ar: "هشاشة العظام" },
      { en: "Sternal angle", ar: "زاوية القص" },
      { en: "Ventrogluteal site", ar: "الموضع الإلوي الأمامي" },
    ],
    summaryEn:
      "Fractures are classified as closed, open, greenstick, comminuted, or stress fractures, and heal through hematoma formation, callus formation, and remodeling. Nurses use bone landmarks for common procedures and must consider osteoporosis risk in patient care.",
    summaryAr:
      "تُصنَّف الكسور إلى مغلقة ومفتوحة وغصنية خضراء ومفتتة وإجهادية، وتلتئم عبر تكوّن الورم الدموي ثم الكالس ثم إعادة التشكّل. يستخدم الممرضون المعالم العظمية في الإجراءات الشائعة، ويجب مراعاة خطر هشاشة العظام في رعاية المرضى.",
  },
].map((lesson) => ({ ...lesson, references: REFERENCES }));

const questions = [
  {
    lessonSlug: "skeletal-introduction",
    type: "MCQ",
    textEn: "How many bones does the typical adult human skeleton contain?",
    textAr: "كم عدد عظام الهيكل لدى الإنسان البالغ عادةً؟",
    choices: [
      { id: "a", en: "126", ar: "126" },
      { id: "b", en: "206", ar: "206" },
      { id: "c", en: "270", ar: "270" },
      { id: "d", en: "300", ar: "300" },
    ],
    correct: "b",
    explanationEn:
      "The adult skeleton typically has 206 bones. Infants have more (roughly 270–300) because some bones fuse together during growth.",
    explanationAr:
      "يحتوي هيكل الشخص البالغ عادةً على 206 عظمة. يمتلك الرضّع عددًا أكبر (حوالي 270–300) لأن بعض العظام تندمج مع بعضها أثناء النمو.",
  },
  {
    lessonSlug: "skeletal-introduction",
    type: "MCQ",
    textEn: "Which of the following is NOT one of the primary functions of the skeletal system?",
    textAr: "أي مما يلي ليس من الوظائف الرئيسية للجهاز الهيكلي؟",
    choices: [
      { id: "a", en: "Support", ar: "الدعم" },
      { id: "b", en: "Protection", ar: "الحماية" },
      { id: "c", en: "Digestion of food", ar: "هضم الطعام" },
      { id: "d", en: "Mineral storage", ar: "تخزين المعادن" },
    ],
    correct: "c",
    explanationEn:
      "Digestion is carried out by the digestive system, not the skeletal system. The skeleton supports, protects, enables movement, stores minerals, and produces blood cells.",
    explanationAr:
      "يقوم الجهاز الهضمي بعملية الهضم وليس الجهاز الهيكلي. يقوم الهيكل بالدعم والحماية وتمكين الحركة وتخزين المعادن وإنتاج خلايا الدم.",
  },
  {
    lessonSlug: "skeletal-introduction",
    type: "TRUE_FALSE",
    textEn: "The axial skeleton includes the bones of the arms and legs.",
    textAr: "يشمل الهيكل المحوري عظام الذراعين والساقين.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "false",
    explanationEn:
      "The axial skeleton includes the skull, vertebral column, and thoracic cage. Arm and leg bones belong to the appendicular skeleton.",
    explanationAr:
      "يشمل الهيكل المحوري الجمجمة والعمود الفقري والقفص الصدري. أما عظام الذراعين والساقين فتنتمي إلى الهيكل الطرفي.",
  },
  {
    lessonSlug: "skeletal-anatomical-structures",
    type: "MCQ",
    textEn: "Which bone shape category includes the patella (kneecap)?",
    textAr: "إلى أي فئة من أشكال العظام تنتمي الرضفة؟",
    choices: [
      { id: "a", en: "Long bone", ar: "عظمة طويلة" },
      { id: "b", en: "Short bone", ar: "عظمة قصيرة" },
      { id: "c", en: "Sesamoid bone", ar: "عظمة سمسمانية" },
      { id: "d", en: "Flat bone", ar: "عظمة مسطحة" },
    ],
    correct: "c",
    explanationEn:
      "The patella is a sesamoid bone — a small bone embedded within a tendon that reduces friction and changes the angle of muscle pull.",
    explanationAr:
      "الرضفة عظمة سمسمانية — وهي عظمة صغيرة مدمجة داخل وتر، تقلل الاحتكاك وتغيّر زاوية شد العضلة.",
  },
  {
    lessonSlug: "skeletal-anatomical-structures",
    type: "MCQ",
    textEn: "What is the shaft of a long bone called?",
    textAr: "ما اسم الجزء الأوسط (جسم) العظم الطويل؟",
    choices: [
      { id: "a", en: "Epiphysis", ar: "المشاش" },
      { id: "b", en: "Diaphysis", ar: "الديافيز" },
      { id: "c", en: "Periosteum", ar: "السمحاق" },
      { id: "d", en: "Metaphysis", ar: "المنطقة الكردوسية" },
    ],
    correct: "b",
    explanationEn:
      "The diaphysis is the long, central shaft of a long bone, composed mostly of compact bone surrounding the medullary cavity.",
    explanationAr:
      "الديافيز هو الجزء المركزي الطويل من العظم، ويتكوّن غالبًا من عظم متراص يحيط بالتجويف النخاعي.",
  },
  {
    lessonSlug: "skeletal-anatomical-structures",
    type: "MCQ",
    textEn: "Which structural unit is characteristic of compact bone tissue?",
    textAr: "ما الوحدة البنائية المميزة للنسيج العظمي المتراص؟",
    choices: [
      { id: "a", en: "Trabeculae", ar: "الحُوَيصلات العظمية" },
      { id: "b", en: "Osteon (Haversian system)", ar: "السيخ العظمي (نظام هافرس)" },
      { id: "c", en: "Growth plate", ar: "صفيحة النمو" },
      { id: "d", en: "Marrow cavity", ar: "التجويف النخاعي" },
    ],
    correct: "b",
    explanationEn:
      "Compact bone is organized into osteons (Haversian systems), cylindrical units each built around a central canal carrying blood vessels and nerves. Trabeculae are characteristic of spongy bone.",
    explanationAr:
      "يُنظَّم العظم المتراص في وحدات أسطوانية تسمى الأسياخ العظمية (أنظمة هافرس)، ولكل منها قناة مركزية تحمل الأوعية الدموية والأعصاب. أما الحُوَيصلات العظمية فهي سمة العظم الإسفنجي.",
  },
  {
    lessonSlug: "skeletal-organs-locations",
    type: "MCQ",
    textEn: "How many pairs of ribs are classified as \"true ribs\"?",
    textAr: "كم عدد أزواج الأضلاع المصنّفة كـ\"أضلاع حقيقية\"؟",
    choices: [
      { id: "a", en: "5", ar: "5" },
      { id: "b", en: "7", ar: "7" },
      { id: "c", en: "10", ar: "10" },
      { id: "d", en: "12", ar: "12" },
    ],
    correct: "b",
    explanationEn:
      "There are 7 pairs of true ribs, which attach directly to the sternum via their own costal cartilage.",
    explanationAr:
      "هناك 7 أزواج من الأضلاع الحقيقية، وتتصل مباشرة بعظم القص عبر غضروفها الضلعي الخاص.",
  },
  {
    lessonSlug: "skeletal-organs-locations",
    type: "MCQ",
    textEn: "Which bones make up the pectoral (shoulder) girdle?",
    textAr: "ما العظام التي تشكّل الحزام الصدري (الكتف)؟",
    choices: [
      { id: "a", en: "Ilium and ischium", ar: "الحرقفة والإسك" },
      { id: "b", en: "Clavicle and scapula", ar: "الترقوة ولوح الكتف" },
      { id: "c", en: "Radius and ulna", ar: "الكعبرة والزند" },
      { id: "d", en: "Tibia and fibula", ar: "الظنبوب والشظية" },
    ],
    correct: "b",
    explanationEn:
      "The pectoral girdle consists of the clavicle and scapula, connecting the upper limb to the axial skeleton.",
    explanationAr:
      "يتكوّن الحزام الصدري من عظم الترقوة ولوح الكتف، ويربطان الطرف العلوي بالهيكل المحوري.",
  },
  {
    lessonSlug: "skeletal-organs-locations",
    type: "CASE_BASED",
    textEn:
      "A nurse needs to locate a safe site for a ventrogluteal intramuscular injection. Which bony landmark is most relevant?",
    textAr: "يحتاج الممرض إلى تحديد موضع آمن للحقن العضلي الإلوي الأمامي. أي معلم عظمي هو الأكثر صلة؟",
    choices: [
      { id: "a", en: "Sternal angle", ar: "زاوية القص" },
      { id: "b", en: "Iliac crest", ar: "قمة الحرقفة" },
      { id: "c", en: "Acromion process", ar: "الناتئ الأخرمي" },
      { id: "d", en: "Patella", ar: "الرضفة" },
    ],
    correct: "b",
    explanationEn:
      "The iliac crest is the key bony landmark used to identify the ventrogluteal site, a common and safe location for intramuscular injections.",
    explanationAr:
      "قمة الحرقفة هي المعلم العظمي الأساسي المستخدم لتحديد الموضع الإلوي الأمامي، وهو موقع شائع وآمن للحقن العضلي.",
  },
  {
    lessonSlug: "skeletal-anatomical-relationships",
    type: "MCQ",
    textEn: "Which type of joint allows the freest range of movement?",
    textAr: "أي نوع من المفاصل يسمح بأكبر مدى للحركة؟",
    choices: [
      { id: "a", en: "Fibrous joint", ar: "مفصل ليفي" },
      { id: "b", en: "Cartilaginous joint", ar: "مفصل غضروفي" },
      { id: "c", en: "Synovial joint", ar: "مفصل زليلي" },
      { id: "d", en: "Suture", ar: "درز" },
    ],
    correct: "c",
    explanationEn:
      "Synovial joints contain a fluid-filled cavity that allows free movement, such as at the knee, shoulder, and elbow. Fibrous joints (like sutures) allow little or no movement.",
    explanationAr:
      "تحتوي المفاصل الزليلية على تجويف مملوء بسائل يسمح بحركة حرة، كما في الركبة والكتف والمرفق. أما المفاصل الليفية (مثل الدروز) فتسمح بحركة قليلة أو معدومة.",
  },
  {
    lessonSlug: "skeletal-anatomical-relationships",
    type: "MCQ",
    textEn:
      "The point where a muscle attaches to the bone that remains relatively stationary during a movement is called the:",
    textAr: "تُسمى نقطة ارتباط العضلة بالعظمة الأقل حركة أثناء الحركة بـ:",
    choices: [
      { id: "a", en: "Insertion", ar: "الاندراج" },
      { id: "b", en: "Origin", ar: "المنشأ" },
      { id: "c", en: "Foramen", ar: "الثقبة" },
      { id: "d", en: "Periosteum", ar: "السمحاق" },
    ],
    correct: "b",
    explanationEn:
      "The origin is the attachment point on the more stationary bone; the insertion is the attachment point on the bone that moves.",
    explanationAr:
      "المنشأ هو نقطة الارتباط بالعظمة الأقل حركة، بينما الاندراج هو نقطة الارتباط بالعظمة المتحركة.",
  },
  {
    lessonSlug: "skeletal-anatomical-relationships",
    type: "TRUE_FALSE",
    textEn: "Nerves and blood vessels can pass through openings in bones called foramina.",
    textAr: "يمكن للأعصاب والأوعية الدموية أن تمر عبر فتحات في العظام تسمى الثقوب.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "Foramina are natural openings in bone that allow nerves and blood vessels to pass through to reach deeper structures, such as the foramen magnum at the base of the skull.",
    explanationAr:
      "الثقوب هي فتحات طبيعية في العظم تسمح بمرور الأعصاب والأوعية الدموية للوصول إلى بنى أعمق، مثل الثقبة العظمى عند قاعدة الجمجمة.",
  },
  {
    lessonSlug: "skeletal-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "A fracture in which the bone breaks but does not pierce the skin is called a:",
    textAr: "يُسمى الكسر الذي ينكسر فيه العظم دون أن يخترق الجلد بـ:",
    choices: [
      { id: "a", en: "Open fracture", ar: "كسر مفتوح" },
      { id: "b", en: "Closed fracture", ar: "كسر مغلق" },
      { id: "c", en: "Comminuted fracture", ar: "كسر مفتت" },
      { id: "d", en: "Stress fracture", ar: "كسر إجهاد" },
    ],
    correct: "b",
    explanationEn:
      "A closed (simple) fracture is one where the skin remains intact over the fracture site. An open fracture involves a break in the skin.",
    explanationAr:
      "الكسر المغلق (البسيط) هو الذي يبقى فيه الجلد سليمًا فوق موضع الكسر. أما الكسر المفتوح فيترافق مع اختراق الجلد.",
  },
  {
    lessonSlug: "skeletal-clinical-anatomy-basics",
    type: "MCQ",
    textEn:
      "Which stage of fracture healing involves replacement of the soft callus with hard, spongy bone?",
    textAr: "أي مرحلة من مراحل التئام الكسر يُستبدل فيها الكالس اللين بعظم إسفنجي صلب؟",
    choices: [
      { id: "a", en: "Hematoma formation", ar: "تكوّن الورم الدموي" },
      { id: "b", en: "Fibrocartilaginous callus formation", ar: "تكوّن الكالس الليفي الغضروفي" },
      { id: "c", en: "Bony callus formation", ar: "تكوّن الكالس العظمي" },
      { id: "d", en: "Bone remodeling", ar: "إعادة تشكّل العظم" },
    ],
    correct: "c",
    explanationEn:
      "During bony callus formation (roughly 3–4 months after injury), the soft fibrocartilaginous callus is replaced by hard, spongy bone.",
    explanationAr:
      "خلال مرحلة تكوّن الكالس العظمي (بعد حوالي 3–4 أشهر من الإصابة)، يُستبدل الكالس الليفي الغضروفي اللين بعظم إسفنجي صلب.",
  },
  {
    lessonSlug: "skeletal-clinical-anatomy-basics",
    type: "CLINICAL_REASONING",
    textEn:
      "An elderly post-menopausal patient reports a wrist fracture after a minor fall. Which condition should the nurse consider as a likely contributing risk factor?",
    textAr: "أبلغت مريضة مسنّة بعد انقطاع الطمث عن كسر في الرسغ بعد سقوط بسيط. أي حالة يجب أن يأخذها الممرض بعين الاعتبار كعامل خطر محتمل؟",
    choices: [
      { id: "a", en: "Osteoarthritis", ar: "الفصال العظمي" },
      { id: "b", en: "Osteoporosis", ar: "هشاشة العظام" },
      { id: "c", en: "Rheumatoid arthritis", ar: "التهاب المفاصل الروماتويدي" },
      { id: "d", en: "Gout", ar: "النقرس" },
    ],
    correct: "b",
    explanationEn:
      "Osteoporosis reduces bone density and increases fracture risk from minor trauma, and is especially common in post-menopausal women due to decreased estrogen. It commonly affects the hip, spine, and wrist.",
    explanationAr:
      "تُقلّل هشاشة العظام من كثافة العظم وتزيد من خطر الكسور الناتجة عن إصابات بسيطة، وهي شائعة بشكل خاص لدى النساء بعد انقطاع الطمث بسبب انخفاض الإستروجين، وتصيب غالبًا الورك والعمود الفقري والرسغ.",
  },
  {
    lessonSlug: "skeletal-introduction",
    type: "MCQ",
    textEn: "Which of the following is a function of red bone marrow?",
    textAr: "أي مما يلي وظيفة لنخاع العظم الأحمر؟",
    choices: [
      { id: "a", en: "Producing blood cells", ar: "إنتاج خلايا الدم" },
      { id: "b", en: "Storing fat as an energy reserve", ar: "تخزين الدهون كمخزون للطاقة" },
      { id: "c", en: "Producing muscle fibers", ar: "إنتاج الألياف العضلية" },
      { id: "d", en: "Conducting nerve impulses", ar: "نقل النبضات العصبية" },
    ],
    correct: "a",
    explanationEn:
      "Red bone marrow, found within spongy bone, is responsible for hematopoiesis — the production of red blood cells, white blood cells, and platelets.",
    explanationAr:
      "يقع نخاع العظم الأحمر داخل العظم الإسفنجي، وهو مسؤول عن تكوين الدم — إنتاج خلايا الدم الحمراء والبيضاء والصفائح الدموية.",
  },
  {
    lessonSlug: "skeletal-introduction",
    type: "MCQ",
    textEn: "Approximately how many bones make up the appendicular skeleton?",
    textAr: "كم عدد العظام التي يتكوّن منها الهيكل الطرفي تقريبًا؟",
    choices: [
      { id: "a", en: "80", ar: "80" },
      { id: "b", en: "106", ar: "106" },
      { id: "c", en: "126", ar: "126" },
      { id: "d", en: "206", ar: "206" },
    ],
    correct: "c",
    explanationEn:
      "The appendicular skeleton, consisting of the limbs and girdles, contains approximately 126 bones, while the axial skeleton contains about 80.",
    explanationAr:
      "يحتوي الهيكل الطرفي، المكوَّن من الأطراف والأحزمة، على حوالي 126 عظمة، بينما يحتوي الهيكل المحوري على حوالي 80 عظمة.",
  },
  {
    lessonSlug: "skeletal-anatomical-structures",
    type: "MCQ",
    textEn: "Which part of a long bone is covered with articular cartilage?",
    textAr: "أي جزء من العظم الطويل مغطى بالغضروف المفصلي؟",
    choices: [
      { id: "a", en: "Diaphysis", ar: "الديافيز" },
      { id: "b", en: "Epiphysis", ar: "المشاش" },
      { id: "c", en: "Periosteum", ar: "السمحاق" },
      { id: "d", en: "Medullary cavity", ar: "التجويف النخاعي" },
    ],
    correct: "b",
    explanationEn:
      "The epiphysis, the wider end of a long bone, is covered with articular cartilage where it forms a joint with another bone.",
    explanationAr:
      "المشاش، وهو الطرف الأعرض من العظم الطويل، مغطى بالغضروف المفصلي حيث يشكّل مفصلًا مع عظمة أخرى.",
  },
  {
    lessonSlug: "skeletal-anatomical-structures",
    type: "MCQ",
    textEn: "Which membrane lines the internal marrow cavity of a bone?",
    textAr: "أي غشاء يبطّن التجويف النخاعي الداخلي للعظم؟",
    choices: [
      { id: "a", en: "Periosteum", ar: "السمحاق" },
      { id: "b", en: "Endosteum", ar: "الشغاف العظمي" },
      { id: "c", en: "Synovial membrane", ar: "الغشاء الزليلي" },
      { id: "d", en: "Pleura", ar: "الجنبة" },
    ],
    correct: "b",
    explanationEn:
      "The endosteum is the thin membrane lining the internal marrow cavity, while the periosteum covers the external surface of the bone.",
    explanationAr:
      "الشغاف العظمي هو الغشاء الرقيق الذي يبطّن التجويف النخاعي الداخلي، بينما يغطي السمحاق السطح الخارجي للعظم.",
  },
  {
    lessonSlug: "skeletal-organs-locations",
    type: "MCQ",
    textEn: "Which bones form the pelvic girdle?",
    textAr: "ما العظام التي تشكّل الحزام الحوضي؟",
    choices: [
      { id: "a", en: "Clavicle and scapula", ar: "الترقوة ولوح الكتف" },
      { id: "b", en: "Hip bones (ilium, ischium, pubis)", ar: "عظما الورك (الحرقفة والإسك والعانة)" },
      { id: "c", en: "Radius and ulna", ar: "الكعبرة والزند" },
      { id: "d", en: "Tibia and fibula", ar: "الظنبوب والشظية" },
    ],
    correct: "b",
    explanationEn:
      "The pelvic girdle consists of the two hip bones, each formed by the fusion of the ilium, ischium, and pubis.",
    explanationAr: "يتكوّن الحزام الحوضي من عظمي الورك، ويتشكّل كل منهما من اندماج الحرقفة والإسك والعانة.",
  },
  {
    lessonSlug: "skeletal-organs-locations",
    type: "MCQ",
    textEn: "How many cervical vertebrae are in the vertebral column?",
    textAr: "كم عدد الفقرات العنقية في العمود الفقري؟",
    choices: [
      { id: "a", en: "5", ar: "5" },
      { id: "b", en: "7", ar: "7" },
      { id: "c", en: "12", ar: "12" },
      { id: "d", en: "26", ar: "26" },
    ],
    correct: "b",
    explanationEn:
      "There are 7 cervical vertebrae in the neck region, part of the total 26 bones making up the vertebral column.",
    explanationAr: "توجد 7 فقرات عنقية في منطقة الرقبة، وهي جزء من إجمالي 26 عظمة تشكّل العمود الفقري.",
  },
  {
    lessonSlug: "skeletal-anatomical-relationships",
    type: "MCQ",
    textEn: "Which classification describes a joint that is completely immovable?",
    textAr: "أي تصنيف يصف مفصلاً غير قابل للحركة إطلاقًا؟",
    choices: [
      { id: "a", en: "Synarthrosis", ar: "مفصل ثابت" },
      { id: "b", en: "Amphiarthrosis", ar: "مفصل شبه متحرك" },
      { id: "c", en: "Diarthrosis", ar: "مفصل متحرك" },
      { id: "d", en: "Synovial joint", ar: "مفصل زليلي" },
    ],
    correct: "a",
    explanationEn:
      "Synarthroses are immovable joints, such as the sutures of the skull. Amphiarthroses allow slight movement, and diarthroses (synovial joints) allow free movement.",
    explanationAr:
      "المفاصل الثابتة (السينارثروز) غير قابلة للحركة، مثل دروز الجمجمة. أما شبه المتحركة فتسمح بحركة طفيفة، والمتحركة (الزليلية) تسمح بحركة حرة.",
  },
  {
    lessonSlug: "skeletal-anatomical-relationships",
    type: "MCQ",
    textEn: "An example of a cartilaginous joint is:",
    textAr: "مثال على المفصل الغضروفي هو:",
    choices: [
      { id: "a", en: "The knee joint", ar: "مفصل الركبة" },
      { id: "b", en: "A skull suture", ar: "درز الجمجمة" },
      { id: "c", en: "An intervertebral disc", ar: "القرص الفقري" },
      { id: "d", en: "The shoulder joint", ar: "مفصل الكتف" },
    ],
    correct: "c",
    explanationEn:
      "Intervertebral discs are cartilaginous joints, connecting vertebrae with cartilage and allowing slight movement.",
    explanationAr: "الأقراص الفقرية مفاصل غضروفية تربط الفقرات بواسطة الغضروف وتسمح بحركة طفيفة.",
  },
  {
    lessonSlug: "skeletal-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which type of fracture involves the bone shattering into three or more fragments?",
    textAr: "أي نوع من الكسور يتضمن تشظي العظم إلى ثلاث قطع أو أكثر؟",
    choices: [
      { id: "a", en: "Greenstick fracture", ar: "الكسر الغصني الأخضر" },
      { id: "b", en: "Comminuted fracture", ar: "الكسر المفتت" },
      { id: "c", en: "Stress fracture", ar: "كسر الإجهاد" },
      { id: "d", en: "Closed fracture", ar: "الكسر المغلق" },
    ],
    correct: "b",
    explanationEn:
      "A comminuted fracture occurs when the bone shatters into three or more fragments, often from high-impact trauma.",
    explanationAr: "يحدث الكسر المفتت عندما يتشظى العظم إلى ثلاث قطع أو أكثر، غالبًا نتيجة إصابة شديدة الأثر.",
  },
  {
    lessonSlug: "skeletal-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which anatomical landmark is used to count ribs and intercostal spaces during a physical exam?",
    textAr: "أي معلم تشريحي يُستخدم لعدّ الأضلاع والمسافات الوربية أثناء الفحص السريري؟",
    choices: [
      { id: "a", en: "Iliac crest", ar: "قمة الحرقفة" },
      { id: "b", en: "Sternal angle", ar: "زاوية القص" },
      { id: "c", en: "Acromion process", ar: "الناتئ الأخرمي" },
      { id: "d", en: "Patella", ar: "الرضفة" },
    ],
    correct: "b",
    explanationEn:
      "The sternal angle is a palpable landmark used to count ribs and intercostal spaces, useful for locating heart auscultation points.",
    explanationAr: "زاوية القص معلم يمكن جسّه يُستخدم لعدّ الأضلاع والمسافات الوربية، ويفيد في تحديد نقاط تسمّع القلب.",
  },
];

module.exports = { lessons, questions, REFERENCES };
