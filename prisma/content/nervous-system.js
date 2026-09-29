// Real, written-from-scratch educational content for the Nervous System
// module (Anatomy course). Facts are drawn from standard, widely taught
// anatomy knowledge; further reading references point to open academic
// resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 12: The Nervous System and Nervous Tissue",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction",
  },
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 13: Anatomy of the Nervous System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Neuroanatomy, Cerebral Cortex\"",
    url: "https://www.ncbi.nlm.nih.gov/sites/books/NBK537247/",
  },
];

const lessons = [
  {
    slug: "nervous-introduction",
    order: 1,
    titleEn: "Introduction to the Nervous System",
    titleAr: "مقدمة عن الجهاز العصبي",
    objectivesEn: [
      "Describe the main functions of the nervous system.",
      "Distinguish between the central and peripheral nervous systems.",
      "Distinguish between the somatic and autonomic divisions of the peripheral nervous system.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز العصبي.",
      "التمييز بين الجهازين العصبيين المركزي والمحيطي.",
      "التمييز بين الجزأين الجسدي والذاتي من الجهاز العصبي المحيطي.",
    ],
    contentEn: `## Overview
The nervous system is the body's primary control and communication network, using rapid electrical and chemical signals to sense the environment, process information, and coordinate a response.

## Main Functions
1. **Sensory input** – Detecting internal and external stimuli (touch, temperature, pain, body position, and the special senses).
2. **Integration** – Processing and interpreting sensory information, and deciding on an appropriate response.
3. **Motor output** – Sending signals to muscles and glands to carry out the chosen response.

## Central vs. Peripheral Nervous System
- **Central nervous system (CNS)**: the brain and spinal cord, which integrate and process information and issue commands. It is the body's main control center.
- **Peripheral nervous system (PNS)**: all the nerves and ganglia (clusters of nerve cell bodies) outside the CNS, which carry signals to and from the CNS.

## Somatic vs. Autonomic Nervous System
The PNS is further divided by function:
- **Somatic nervous system**: carries sensory information from skin, muscles, and joints to the CNS, and voluntary motor commands from the CNS to skeletal muscles.
- **Autonomic nervous system**: controls largely involuntary functions — smooth muscle, cardiac muscle, and glands — and is itself divided into the **sympathetic** division (generally prepares the body for activity, the "fight-or-flight" response) and the **parasympathetic** division (generally promotes rest and digestion).`,
    contentAr: `## نظرة عامة
الجهاز العصبي هو شبكة التحكم والتواصل الرئيسية في الجسم، ويستخدم إشارات كهربائية وكيميائية سريعة لاستشعار البيئة ومعالجة المعلومات وتنسيق الاستجابة.

## الوظائف الرئيسية
1. **الإدخال الحسّي** – كشف المحفزات الداخلية والخارجية (اللمس، الحرارة، الألم، وضعية الجسم، والحواس الخاصة).
2. **التكامل** – معالجة المعلومات الحسّية وتفسيرها، وتحديد الاستجابة المناسبة.
3. **الإخراج الحركي** – إرسال إشارات إلى العضلات والغدد لتنفيذ الاستجابة المختارة.

## الجهاز العصبي المركزي مقابل المحيطي
- **الجهاز العصبي المركزي**: يضم الدماغ والنخاع الشوكي، ويتولى دمج المعلومات ومعالجتها وإصدار الأوامر. وهو مركز التحكم الرئيسي في الجسم.
- **الجهاز العصبي المحيطي**: يضم جميع الأعصاب والعقد العصبية (تجمعات أجسام الخلايا العصبية) خارج الجهاز العصبي المركزي، وينقل الإشارات إليه ومنه.

## الجهاز العصبي الجسدي مقابل الذاتي
ينقسم الجهاز العصبي المحيطي كذلك حسب الوظيفة:
- **الجهاز العصبي الجسدي**: ينقل المعلومات الحسّية من الجلد والعضلات والمفاصل إلى الجهاز العصبي المركزي، والأوامر الحركية الإرادية منه إلى العضلات الهيكلية.
- **الجهاز العصبي الذاتي**: يتحكم بالوظائف اللاإرادية إلى حد كبير — العضلات الملساء والعضلة القلبية والغدد — وينقسم بدوره إلى الجزء **الودي** (يُهيّئ الجسم عمومًا للنشاط، استجابة "الكرّ أو الفرّ") والجزء **نظير الودي** (يعزز عمومًا الراحة والهضم).`,
    terms: [
      { en: "Central nervous system (CNS)", ar: "الجهاز العصبي المركزي" },
      { en: "Peripheral nervous system (PNS)", ar: "الجهاز العصبي المحيطي" },
      { en: "Somatic nervous system", ar: "الجهاز العصبي الجسدي" },
      { en: "Sympathetic division", ar: "الجزء الودي" },
      { en: "Parasympathetic division", ar: "الجزء نظير الودي" },
    ],
    summaryEn:
      "The nervous system senses, integrates, and responds to stimuli. It is divided into the CNS (brain, spinal cord) and PNS (nerves, ganglia), and the PNS is further divided into somatic (voluntary) and autonomic (involuntary, with sympathetic and parasympathetic divisions) components.",
    summaryAr:
      "يستشعر الجهاز العصبي المحفزات ويدمجها ويستجيب لها. وينقسم إلى الجهاز المركزي (الدماغ والنخاع الشوكي) والجهاز المحيطي (الأعصاب والعقد العصبية)، وينقسم الجهاز المحيطي كذلك إلى مكوّن جسدي (إرادي) وآخر ذاتي (لا إرادي، بجزأيه الودي ونظير الودي).",
  },
  {
    slug: "nervous-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures: Neurons and Meninges",
    titleAr: "البنى التشريحية: الخلايا العصبية والسحايا",
    objectivesEn: [
      "Identify the main structural parts of a neuron.",
      "Describe the role of myelin and the synapse.",
      "Describe the three layers of the meninges and the role of cerebrospinal fluid.",
    ],
    objectivesAr: [
      "تحديد الأجزاء البنيوية الرئيسية للخلية العصبية.",
      "وصف دور النخاعين والمشبك العصبي.",
      "وصف الطبقات الثلاث للسحايا ودور السائل الدماغي الشوكي.",
    ],
    contentEn: `## Structure of a Neuron
The **neuron** is the basic structural and functional cell of the nervous system, specialized to generate and transmit electrical signals. Its main parts are:
- **Cell body (soma)**: contains the nucleus and most organelles.
- **Dendrites**: branching extensions that receive signals from other neurons and carry them toward the cell body.
- **Axon**: a single, often long, extension that carries signals away from the cell body toward the next cell.
- **Myelin sheath**: a fatty covering, produced by specialized glial cells, that insulates many axons and dramatically speeds up signal conduction.
- **Synapse**: the junction where an axon's end communicates with the next neuron (or a muscle/gland), typically by releasing chemical messengers called neurotransmitters across a small gap.

## Supporting Cells: Neuroglia
Neurons are supported by several types of **neuroglia** (glial cells), which do not transmit signals themselves but provide structural support, insulation (myelin), nutrient supply, and immune defense within nervous tissue.

## The Meninges
The brain and spinal cord are covered by three protective connective tissue layers, the **meninges**, from outermost to innermost:
- **Dura mater**: the tough, outermost layer.
- **Arachnoid mater**: a thin, web-like middle layer.
- **Pia mater**: a delicate layer that adheres directly to the surface of the brain and spinal cord.

## Cerebrospinal Fluid
**Cerebrospinal fluid (CSF)** is produced within the brain's **ventricles** (a connected system of fluid-filled cavities) and circulates around the brain and spinal cord within the subarachnoid space (between the arachnoid and pia mater). It cushions the CNS against mechanical injury, provides some nutrients, and removes waste.`,
    contentAr: `## بنية الخلية العصبية
**الخلية العصبية** هي الوحدة البنيوية والوظيفية الأساسية للجهاز العصبي، ومتخصصة في توليد الإشارات الكهربائية ونقلها. وتشمل أجزاؤها الرئيسية:
- **جسم الخلية**: يحتوي على النواة ومعظم العُضيات.
- **التغصنات**: امتدادات متفرعة تستقبل الإشارات من خلايا عصبية أخرى وتنقلها نحو جسم الخلية.
- **المحور العصبي**: امتداد واحد، غالبًا طويل، ينقل الإشارات بعيدًا عن جسم الخلية نحو الخلية التالية.
- **غمد النخاعين**: غطاء دهني، تنتجه خلايا دبقية متخصصة، يعزل العديد من المحاور العصبية ويسرّع بشكل كبير من توصيل الإشارة.
- **المشبك العصبي**: نقطة الاتصال التي تتواصل فيها نهاية المحور العصبي مع الخلية العصبية التالية (أو عضلة/غدة)، عادةً عبر إطلاق رسل كيميائية تسمى النواقل العصبية عبر فجوة صغيرة.

## الخلايا الداعمة: الخلايا الدبقية العصبية
تُدعَم الخلايا العصبية بعدة أنواع من **الخلايا الدبقية العصبية**، التي لا تنقل الإشارات بنفسها لكنها توفر الدعم البنيوي والعزل (النخاعين) وإمداد العناصر الغذائية والدفاع المناعي داخل النسيج العصبي.

## السحايا
يُغطّى الدماغ والنخاع الشوكي بثلاث طبقات واقية من النسيج الضام، تسمى **السحايا**، من الخارج إلى الداخل:
- **الأم الجافية**: الطبقة الخارجية القوية.
- **الأم العنكبوتية**: طبقة وسطى رقيقة شبكية الشكل.
- **الأم الحنون**: طبقة رقيقة تلتصق مباشرة بسطح الدماغ والنخاع الشوكي.

## السائل الدماغي الشوكي
يُنتَج **السائل الدماغي الشوكي** داخل **بطينات** الدماغ (نظام مترابط من التجاويف المملوءة بالسائل)، ويدور حول الدماغ والنخاع الشوكي داخل الحيّز تحت العنكبوتية (بين الأم العنكبوتية والأم الحنون). ويوفر هذا السائل وسادة تحمي الجهاز العصبي المركزي من الإصابات الميكانيكية، ويمدّه ببعض العناصر الغذائية، ويزيل الفضلات.`,
    terms: [
      { en: "Axon", ar: "المحور العصبي" },
      { en: "Myelin sheath", ar: "غمد النخاعين" },
      { en: "Synapse", ar: "المشبك العصبي" },
      { en: "Meninges", ar: "السحايا" },
      { en: "Cerebrospinal fluid (CSF)", ar: "السائل الدماغي الشوكي" },
    ],
    summaryEn:
      "Neurons have a cell body, dendrites, and an axon (often myelinated), communicating at synapses. The brain and spinal cord are protected by three meningeal layers (dura, arachnoid, pia mater) and cushioned by cerebrospinal fluid circulating in the subarachnoid space.",
    summaryAr:
      "تمتلك الخلايا العصبية جسمًا وتغصنات ومحورًا عصبيًا (غالبًا مغطى بالنخاعين)، وتتواصل عبر المشابك العصبية. يُحمى الدماغ والنخاع الشوكي بثلاث طبقات سحائية (الجافية والعنكبوتية والحنون) ويوسّدهما السائل الدماغي الشوكي الذي يدور في الحيّز تحت العنكبوتية.",
  },
  {
    slug: "nervous-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Identify the major regions of the brain and their general location.",
      "Describe the location and extent of the spinal cord.",
      "State the number of cranial and spinal nerve pairs.",
    ],
    objectivesAr: [
      "تحديد المناطق الرئيسية للدماغ ومواقعها العامة.",
      "وصف موقع النخاع الشوكي ومداه.",
      "ذكر عدد أزواج الأعصاب القحفية والشوكية.",
    ],
    contentEn: `## Major Regions of the Brain
- **Cerebrum**: the largest part of the brain, filling most of the cranial cavity; divided into left and right hemispheres, each with **frontal, parietal, temporal, and occipital lobes**. Its outer layer, the **cerebral cortex**, handles higher functions such as conscious thought, voluntary movement, and language.
- **Cerebellum**: located posterior and inferior to the cerebrum, at the back of the skull; coordinates movement, balance, and posture.
- **Brainstem**: connects the cerebrum to the spinal cord, and consists (from superior to inferior) of the **midbrain**, **pons**, and **medulla oblongata**; controls many automatic functions, including breathing and heart rate regulation.
- **Diencephalon**: located centrally, between the cerebrum and brainstem; includes the **thalamus** (relays most sensory information to the cerebral cortex) and the **hypothalamus** (regulates body temperature, hunger, thirst, and links the nervous and endocrine systems).

## The Spinal Cord
The **spinal cord** extends from the base of the brain (continuous with the medulla oblongata) down through the vertebral canal, ending at approximately the **L1–L2 vertebral level** in most adults — notably shorter than the vertebral column itself, which continues down to the sacrum. Below this point, a bundle of nerve roots called the **cauda equina** continues within the vertebral canal.

## Cranial and Spinal Nerves
- **12 pairs of cranial nerves** arise directly from the brain (mostly the brainstem) and primarily serve the head and neck, though some extend further (e.g., the vagus nerve reaches the abdomen).
- **31 pairs of spinal nerves** arise from the spinal cord (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, and 1 coccygeal pair) and carry sensory and motor signals to and from the rest of the body.`,
    contentAr: `## المناطق الرئيسية للدماغ
- **المخ**: أكبر جزء في الدماغ، يملأ معظم التجويف القحفي؛ وينقسم إلى نصفي كرة أيمن وأيسر، ولكل منهما **فصوص أمامية وجدارية وصدغية وقذالية**. وتتولى طبقته الخارجية، **القشرة المخية**، الوظائف العليا مثل التفكير الواعي والحركة الإرادية واللغة.
- **المخيخ**: يقع خلف المخ وأسفله، في مؤخرة الجمجمة؛ وينسّق الحركة والتوازن والقوام.
- **جذع الدماغ**: يصل المخ بالنخاع الشوكي، ويتكوّن (من الأعلى إلى الأسفل) من **الدماغ المتوسط** و**الجسر** و**النخاع المستطيل**؛ ويتحكم بالعديد من الوظائف التلقائية، بما فيها تنظيم التنفس ومعدل ضربات القلب.
- **الدماغ البيني**: يقع مركزيًا، بين المخ وجذع الدماغ؛ ويشمل **المهاد** (يُرحّل معظم المعلومات الحسّية إلى القشرة المخية) و**الوطاء** (ينظّم درجة حرارة الجسم والجوع والعطش، ويربط بين الجهازين العصبي والصمّاوي).

## النخاع الشوكي
يمتد **النخاع الشوكي** من قاعدة الدماغ (متصلًا بالنخاع المستطيل) نزولًا عبر القناة الفقرية، وينتهي تقريبًا عند مستوى الفقرتين **القطنيتين الأولى والثانية (L1–L2)** لدى معظم البالغين — وهو أقصر بشكل ملحوظ من العمود الفقري نفسه، الذي يستمر نزولًا حتى العجز. وأسفل هذه النقطة، تستمر حزمة من الجذور العصبية تسمى **ذيل الفرس** داخل القناة الفقرية.

## الأعصاب القحفية والشوكية
- تنشأ **12 زوجًا من الأعصاب القحفية** مباشرة من الدماغ (غالبًا من جذع الدماغ) وتخدم أساسًا الرأس والرقبة، رغم أن بعضها يمتد أبعد من ذلك (كالعصب المبهم الذي يصل إلى البطن).
- تنشأ **31 زوجًا من الأعصاب الشوكية** من النخاع الشوكي (8 عنقية، و12 صدرية، و5 قطنية، و5 عجزية، وزوج عصعصي واحد)، وتنقل الإشارات الحسّية والحركية إلى بقية الجسم ومنه.`,
    terms: [
      { en: "Cerebral cortex", ar: "القشرة المخية" },
      { en: "Cerebellum", ar: "المخيخ" },
      { en: "Brainstem", ar: "جذع الدماغ" },
      { en: "Thalamus", ar: "المهاد" },
      { en: "Cauda equina", ar: "ذيل الفرس" },
    ],
    summaryEn:
      "The brain consists of the cerebrum (with four lobes), cerebellum, brainstem (midbrain, pons, medulla), and diencephalon (thalamus, hypothalamus). The spinal cord extends from the brainstem to about L1–L2. There are 12 pairs of cranial nerves and 31 pairs of spinal nerves.",
    summaryAr:
      "يتكوّن الدماغ من المخ (بفصوصه الأربعة) والمخيخ وجذع الدماغ (الدماغ المتوسط والجسر والنخاع المستطيل) والدماغ البيني (المهاد والوطاء). يمتد النخاع الشوكي من جذع الدماغ حتى مستوى L1–L2 تقريبًا. توجد 12 زوجًا من الأعصاب القحفية و31 زوجًا من الأعصاب الشوكية.",
  },
  {
    slug: "nervous-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Describe the relationship between the brain and the skull.",
      "Describe the relationship between the spinal cord and the vertebral column.",
      "Explain the structural basis of the blood-brain barrier.",
    ],
    objectivesAr: [
      "وصف العلاقة بين الدماغ والجمجمة.",
      "وصف العلاقة بين النخاع الشوكي والعمود الفقري.",
      "شرح الأساس البنيوي للحاجز الدموي الدماغي.",
    ],
    contentEn: `## Brain and Skull
The brain's soft, delicate tissue is enclosed and protected by the bony **cranium**, with the meninges and cerebrospinal fluid providing additional cushioning between brain and bone. This close structural relationship is also a clinical vulnerability: because the skull is rigid, any process that increases pressure inside it (bleeding, swelling) has limited room to expand, which is why monitoring for signs of rising intracranial pressure is a nursing priority after head injury.

## Spinal Cord and Vertebral Column
The spinal cord is protected in a similar way by the bony vertebral column, running through the **vertebral (spinal) canal** formed by the stacked vertebrae — the same vertebral column studied in the Skeletal System module. Pairs of spinal nerves exit at each vertebral level through openings called **intervertebral foramina**. This close relationship explains why vertebral fractures or dislocations can directly injure the spinal cord, and why spinal precautions are taken whenever such an injury is suspected.

## The Blood-Brain Barrier
Capillaries within the brain have unusually tight junctions between their endothelial cells, forming the **blood-brain barrier**. This structural feature tightly restricts which substances can pass from the blood into brain tissue, protecting the brain from many circulating toxins and pathogens — but it also means many medications must be specifically designed to cross it to have an effect on the brain.`,
    contentAr: `## الدماغ والجمجمة
يُحاط النسيج الرخو والدقيق للدماغ ويُحمى بواسطة **القحف** العظمي، مع توفير السحايا والسائل الدماغي الشوكي وسادة إضافية بين الدماغ والعظم. وتُعدّ هذه العلاقة البنيوية الوثيقة أيضًا نقطة ضعف سريرية: فنظرًا لصلابة الجمجمة، فإن أي عملية تزيد الضغط داخلها (نزيف، تورم) تجد مجالًا محدودًا للتمدد، وهو ما يجعل مراقبة علامات ارتفاع الضغط داخل القحف أولوية تمريضية بعد إصابات الرأس.

## النخاع الشوكي والعمود الفقري
يُحمى النخاع الشوكي بطريقة مماثلة بواسطة العمود الفقري العظمي، ويمر عبر **القناة الفقرية (الشوكية)** المتشكّلة من الفقرات المتراصة — وهو نفس العمود الفقري الذي دُرس في موديل الجهاز الهيكلي. وتخرج أزواج الأعصاب الشوكية عند كل مستوى فقري عبر فتحات تسمى **الثقب بين الفقرية**. وتفسّر هذه العلاقة الوثيقة سبب إمكانية أن تؤدي كسور أو خلع الفقرات إلى إصابة مباشرة للنخاع الشوكي، ولماذا تُتّخذ احتياطات العمود الفقري عند الاشتباه بمثل هذه الإصابة.

## الحاجز الدموي الدماغي
تمتلك الشعيرات الدموية داخل الدماغ وصلات محكمة بشكل غير معتاد بين خلاياها البطانية، مشكّلةً **الحاجز الدموي الدماغي**. وتقيّد هذه السمة البنيوية بشكل صارم المواد التي يمكنها الانتقال من الدم إلى نسيج الدماغ، مما يحمي الدماغ من العديد من السموم ومسببات الأمراض المنتشرة في الدم — لكنه يعني أيضًا أن العديد من الأدوية يجب أن تُصمَّم خصيصًا لعبور هذا الحاجز لتحدث تأثيرها على الدماغ.`,
    terms: [
      { en: "Cranium", ar: "القحف" },
      { en: "Intervertebral foramen", ar: "الثقبة بين الفقرية" },
      { en: "Vertebral canal", ar: "القناة الفقرية" },
      { en: "Blood-brain barrier", ar: "الحاجز الدموي الدماغي" },
      { en: "Intracranial pressure", ar: "الضغط داخل القحف" },
    ],
    summaryEn:
      "The rigid skull and vertebral column protect the brain and spinal cord, respectively, but this rigidity limits room for swelling or bleeding, making pressure monitoring clinically important. The blood-brain barrier, formed by tight capillary junctions, tightly regulates what reaches brain tissue from the blood.",
    summaryAr:
      "تحمي الجمجمة الصلبة والعمود الفقري الدماغ والنخاع الشوكي على التوالي، لكن هذه الصلابة تحدّ من مساحة التورم أو النزيف، مما يجعل مراقبة الضغط أمرًا مهمًا سريريًا. ينظّم الحاجز الدموي الدماغي، المتشكّل من وصلات شعرية محكمة، بشكل صارم ما يصل إلى نسيج الدماغ من الدم.",
  },
  {
    slug: "nervous-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Describe the anatomical basis of the Glasgow Coma Scale assessment.",
      "Describe the cranial nerves involved in the pupillary light reflex.",
      "Identify the anatomical landmark used for lumbar puncture.",
    ],
    objectivesAr: [
      "وصف الأساس التشريحي لتقييم مقياس غلاسكو للغيبوبة.",
      "وصف الأعصاب القحفية المشاركة في منعكس تفاعل الحدقة للضوء.",
      "تحديد المعلم التشريحي المستخدم للبزل القطني.",
    ],
    contentEn: `## Glasgow Coma Scale (Structural Basis)
The **Glasgow Coma Scale (GCS)** assesses level of consciousness by scoring three types of response — eye opening, verbal response, and motor response — each reflecting the integrity of different brain regions and pathways, from the brainstem's arousal centers to the cerebral cortex's higher functions. A lower score indicates more impaired consciousness, and structurally reflects more widespread or severe dysfunction across these systems.

## Pupillary Light Reflex
Shining a light into one eye should cause both pupils to constrict. This reflex depends on two cranial nerves:
- **Cranial nerve II (optic nerve)**: carries the sensory signal (light detected) from the retina to the brainstem.
- **Cranial nerve III (oculomotor nerve)**: carries the motor signal back to the muscles that constrict the pupil, in both eyes.
An abnormal pupillary response (e.g., one pupil failing to react, or a fixed and dilated pupil) can indicate pressure on the oculomotor nerve, often from rising intracranial pressure — making this a key nursing neurological check.

## Lumbar Puncture Landmark
A **lumbar puncture** (spinal tap) collects cerebrospinal fluid from the subarachnoid space, performed safely below the spinal cord's termination (around L1–L2) to avoid injuring it. The needle is typically inserted at the **L3–L4 or L4–L5 interspace**, located using the **iliac crests** as a landmark: an imaginary line drawn between the top of the two iliac crests (Tuffier's line) usually crosses the spine at approximately the L4 level.

## Basic Reflex Arc
A simple reflex (e.g., the knee-jerk reflex) follows a basic anatomical pathway: a sensory receptor detects a stimulus, a sensory neuron carries the signal to the spinal cord, it connects (sometimes directly) to a motor neuron, and the motor neuron carries a signal back out to a muscle — allowing a rapid protective response without needing to wait for the brain to process it.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## مقياس غلاسكو للغيبوبة (الأساس البنيوي)
يقيّم **مقياس غلاسكو للغيبوبة** مستوى الوعي عبر تسجيل ثلاثة أنواع من الاستجابة — فتح العينين والاستجابة اللفظية والاستجابة الحركية — يعكس كل منها سلامة مناطق ومسارات دماغية مختلفة، من مراكز اليقظة في جذع الدماغ إلى الوظائف العليا في القشرة المخية. وتشير الدرجة الأقل إلى وعي أكثر تأثرًا، وتعكس بنيويًا خللًا أوسع انتشارًا أو أشد في هذه الأنظمة.

## منعكس تفاعل الحدقة للضوء
يجب أن يؤدي تسليط الضوء على إحدى العينين إلى انقباض كلتا الحدقتين. ويعتمد هذا المنعكس على عصبين قحفيين:
- **العصب القحفي الثاني (العصب البصري)**: ينقل الإشارة الحسّية (الضوء المكتشف) من الشبكية إلى جذع الدماغ.
- **العصب القحفي الثالث (العصب المحرك للعين)**: ينقل الإشارة الحركية عائدة إلى العضلات التي تقبض الحدقة، في كلتا العينين.
يمكن أن تشير الاستجابة غير الطبيعية للحدقة (كفشل إحداهما في التفاعل، أو ثبات حدقة متسعة) إلى ضغط على العصب المحرك للعين، غالبًا بسبب ارتفاع الضغط داخل القحف — مما يجعل هذا الفحص العصبي أولوية تمريضية رئيسية.

## معلم البزل القطني
يجمع **البزل القطني** (السحب الشوكي) السائل الدماغي الشوكي من الحيّز تحت العنكبوتية، ويُجرى بأمان أسفل نهاية النخاع الشوكي (حوالي L1–L2) لتجنّب إصابته. وتُدخَل الإبرة عادةً عند **المسافة بين الفقرتين L3–L4 أو L4–L5**، ويُحدَّد موقعها باستخدام **قمتي الحرقفة** كمعلم: إذ يعبر خط وهمي يُرسَم بين قمتي الحرقفتين (خط توفييه) العمود الفقري عادةً عند مستوى L4 تقريبًا.

## قوس المنعكس الأساسي
يتبع منعكس بسيط (كمنعكس ارتداد الركبة) مسارًا تشريحيًا أساسيًا: يكتشف مستقبل حسّي محفزًا، وتنقل خلية عصبية حسّية الإشارة إلى النخاع الشوكي، حيث تتصل (أحيانًا مباشرة) بخلية عصبية حركية، وتنقل الخلية الحركية إشارة عائدة إلى عضلة — مما يتيح استجابة وقائية سريعة دون الحاجة لانتظار معالجة الدماغ لها.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Glasgow Coma Scale", ar: "مقياس غلاسكو للغيبوبة" },
      { en: "Pupillary light reflex", ar: "منعكس تفاعل الحدقة للضوء" },
      { en: "Lumbar puncture", ar: "البزل القطني" },
      { en: "Reflex arc", ar: "قوس المنعكس" },
      { en: "Oculomotor nerve", ar: "العصب المحرك للعين" },
    ],
    summaryEn:
      "The Glasgow Coma Scale reflects the integrity of brainstem and cortical function through eye, verbal, and motor responses. The pupillary light reflex depends on cranial nerves II and III. Lumbar puncture is performed at L3–L4 or L4–L5, located via the iliac crests, safely below the spinal cord's end.",
    summaryAr:
      "يعكس مقياس غلاسكو للغيبوبة سلامة وظائف جذع الدماغ والقشرة المخية عبر استجابات العين واللفظ والحركة. يعتمد منعكس تفاعل الحدقة للضوء على العصبين القحفيين الثاني والثالث. يُجرى البزل القطني عند L3–L4 أو L4–L5، ويُحدَّد موقعه عبر قمتي الحرقفة، بأمان أسفل نهاية النخاع الشوكي.",
  },
].map((lesson) => ({ ...lesson, references: lesson.references ?? REFERENCES }));

const questions = [
  {
    lessonSlug: "nervous-introduction",
    type: "MCQ",
    textEn: "Which structures make up the central nervous system?",
    textAr: "ما البنى التي تشكّل الجهاز العصبي المركزي؟",
    choices: [
      { id: "a", en: "Brain and spinal cord", ar: "الدماغ والنخاع الشوكي" },
      { id: "b", en: "All peripheral nerves", ar: "جميع الأعصاب المحيطية" },
      { id: "c", en: "Cranial nerves only", ar: "الأعصاب القحفية فقط" },
      { id: "d", en: "Ganglia only", ar: "العقد العصبية فقط" },
    ],
    correct: "a",
    explanationEn:
      "The central nervous system (CNS) consists of the brain and spinal cord, which integrate information and issue commands.",
    explanationAr:
      "يتكوّن الجهاز العصبي المركزي من الدماغ والنخاع الشوكي، اللذين يدمجان المعلومات ويصدران الأوامر.",
  },
  {
    lessonSlug: "nervous-introduction",
    type: "MCQ",
    textEn: "Which division of the autonomic nervous system generally prepares the body for the \"fight-or-flight\" response?",
    textAr: "أي جزء من الجهاز العصبي الذاتي يُهيّئ الجسم عمومًا لاستجابة \"الكرّ أو الفرّ\"؟",
    choices: [
      { id: "a", en: "Somatic nervous system", ar: "الجهاز العصبي الجسدي" },
      { id: "b", en: "Parasympathetic division", ar: "الجزء نظير الودي" },
      { id: "c", en: "Sympathetic division", ar: "الجزء الودي" },
      { id: "d", en: "Enteric nervous system", ar: "الجهاز العصبي المعوي" },
    ],
    correct: "c",
    explanationEn:
      "The sympathetic division of the autonomic nervous system generally prepares the body for activity, known as the fight-or-flight response.",
    explanationAr:
      "يُهيّئ الجزء الودي من الجهاز العصبي الذاتي الجسم عمومًا للنشاط، وهو ما يُعرف باستجابة الكرّ أو الفرّ.",
  },
  {
    lessonSlug: "nervous-anatomical-structures",
    type: "MCQ",
    textEn: "Which part of a neuron typically receives signals from other neurons?",
    textAr: "أي جزء من الخلية العصبية يستقبل عادةً الإشارات من خلايا عصبية أخرى؟",
    choices: [
      { id: "a", en: "Axon", ar: "المحور العصبي" },
      { id: "b", en: "Dendrites", ar: "التغصنات" },
      { id: "c", en: "Myelin sheath", ar: "غمد النخاعين" },
      { id: "d", en: "Synapse", ar: "المشبك العصبي" },
    ],
    correct: "b",
    explanationEn:
      "Dendrites are branching extensions that receive signals from other neurons and carry them toward the cell body.",
    explanationAr:
      "التغصنات امتدادات متفرعة تستقبل الإشارات من خلايا عصبية أخرى وتنقلها نحو جسم الخلية.",
  },
  {
    lessonSlug: "nervous-anatomical-structures",
    type: "MCQ",
    textEn: "Which meningeal layer is the toughest and most superficial?",
    textAr: "أي طبقة سحائية هي الأقوى والأكثر سطحية؟",
    choices: [
      { id: "a", en: "Pia mater", ar: "الأم الحنون" },
      { id: "b", en: "Arachnoid mater", ar: "الأم العنكبوتية" },
      { id: "c", en: "Dura mater", ar: "الأم الجافية" },
      { id: "d", en: "Periosteum", ar: "السمحاق" },
    ],
    correct: "c",
    explanationEn:
      "The dura mater is the tough, outermost of the three meningeal layers covering the brain and spinal cord.",
    explanationAr:
      "الأم الجافية هي الطبقة الخارجية القوية من بين الطبقات السحائية الثلاث المغطية للدماغ والنخاع الشوكي.",
  },
  {
    lessonSlug: "nervous-anatomical-structures",
    type: "TRUE_FALSE",
    textEn: "Cerebrospinal fluid circulates within the subarachnoid space, between the arachnoid and pia mater.",
    textAr: "يدور السائل الدماغي الشوكي داخل الحيّز تحت العنكبوتية، بين الأم العنكبوتية والأم الحنون.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "Cerebrospinal fluid circulates within the subarachnoid space, cushioning the brain and spinal cord.",
    explanationAr:
      "يدور السائل الدماغي الشوكي داخل الحيّز تحت العنكبوتية، ويوسّد الدماغ والنخاع الشوكي.",
  },
  {
    lessonSlug: "nervous-organs-locations",
    type: "MCQ",
    textEn: "Which brain structure is primarily responsible for coordinating balance and posture?",
    textAr: "أي بنية دماغية مسؤولة أساسًا عن تنسيق التوازن والقوام؟",
    choices: [
      { id: "a", en: "Cerebrum", ar: "المخ" },
      { id: "b", en: "Cerebellum", ar: "المخيخ" },
      { id: "c", en: "Thalamus", ar: "المهاد" },
      { id: "d", en: "Hypothalamus", ar: "الوطاء" },
    ],
    correct: "b",
    explanationEn:
      "The cerebellum, located posterior and inferior to the cerebrum, coordinates movement, balance, and posture.",
    explanationAr:
      "يقع المخيخ خلف المخ وأسفله، وينسّق الحركة والتوازن والقوام.",
  },
  {
    lessonSlug: "nervous-organs-locations",
    type: "MCQ",
    textEn: "Approximately where does the adult spinal cord end?",
    textAr: "أين ينتهي النخاع الشوكي لدى البالغ تقريبًا؟",
    choices: [
      { id: "a", en: "At the sacrum", ar: "عند العجز" },
      { id: "b", en: "At approximately L1–L2", ar: "عند مستوى L1–L2 تقريبًا" },
      { id: "c", en: "At the base of the skull", ar: "عند قاعدة الجمجمة" },
      { id: "d", en: "At the coccyx", ar: "عند العصعص" },
    ],
    correct: "b",
    explanationEn:
      "In most adults, the spinal cord ends at approximately the L1–L2 vertebral level, well short of the vertebral column's full length.",
    explanationAr:
      "ينتهي النخاع الشوكي لدى معظم البالغين عند مستوى الفقرتين L1–L2 تقريبًا، أي قبل نهاية العمود الفقري بمسافة.",
  },
  {
    lessonSlug: "nervous-organs-locations",
    type: "MCQ",
    textEn: "How many pairs of spinal nerves are there?",
    textAr: "كم عدد أزواج الأعصاب الشوكية؟",
    choices: [
      { id: "a", en: "12", ar: "12" },
      { id: "b", en: "24", ar: "24" },
      { id: "c", en: "31", ar: "31" },
      { id: "d", en: "43", ar: "43" },
    ],
    correct: "c",
    explanationEn:
      "There are 31 pairs of spinal nerves (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal), compared with 12 pairs of cranial nerves.",
    explanationAr:
      "هناك 31 زوجًا من الأعصاب الشوكية (8 عنقية، و12 صدرية، و5 قطنية، و5 عجزية، وزوج عصعصي واحد)، مقارنة بـ12 زوجًا من الأعصاب القحفية.",
  },
  {
    lessonSlug: "nervous-anatomical-relationships",
    type: "MCQ",
    textEn: "Spinal nerves exit the vertebral column through which structure?",
    textAr: "تخرج الأعصاب الشوكية من العمود الفقري عبر أي بنية؟",
    choices: [
      { id: "a", en: "Intervertebral foramina", ar: "الثقب بين الفقرية" },
      { id: "b", en: "Foramen magnum", ar: "الثقبة العظمى" },
      { id: "c", en: "Central canal", ar: "القناة المركزية" },
      { id: "d", en: "Sacral hiatus", ar: "الفرجة العجزية" },
    ],
    correct: "a",
    explanationEn:
      "Spinal nerves exit at each vertebral level through openings called intervertebral foramina.",
    explanationAr:
      "تخرج الأعصاب الشوكية عند كل مستوى فقري عبر فتحات تسمى الثقب بين الفقرية.",
  },
  {
    lessonSlug: "nervous-anatomical-relationships",
    type: "MCQ",
    textEn: "What structural feature forms the blood-brain barrier?",
    textAr: "ما السمة البنيوية التي تشكّل الحاجز الدموي الدماغي؟",
    choices: [
      { id: "a", en: "Thick arterial walls", ar: "جدران شريانية سميكة" },
      { id: "b", en: "Tight junctions between brain capillary endothelial cells", ar: "وصلات محكمة بين الخلايا البطانية للشعيرات الدموية الدماغية" },
      { id: "c", en: "The dura mater", ar: "الأم الجافية" },
      { id: "d", en: "Myelin sheaths", ar: "أغمدة النخاعين" },
    ],
    correct: "b",
    explanationEn:
      "Unusually tight junctions between the endothelial cells of brain capillaries form the blood-brain barrier, restricting what passes from blood into brain tissue.",
    explanationAr:
      "تشكّل الوصلات المحكمة بشكل غير معتاد بين الخلايا البطانية للشعيرات الدموية الدماغية الحاجز الدموي الدماغي، الذي يقيّد ما ينتقل من الدم إلى نسيج الدماغ.",
  },
  {
    lessonSlug: "nervous-anatomical-relationships",
    type: "CASE_BASED",
    textEn: "A patient sustains a fracture-dislocation of a cervical vertebra. Which structure is at greatest anatomical risk?",
    textAr: "يتعرّض مريض لكسر وخلع في فقرة عنقية. أي بنية معرّضة لأكبر خطر تشريحي؟",
    choices: [
      { id: "a", en: "Spinal cord", ar: "النخاع الشوكي" },
      { id: "b", en: "Cerebellum", ar: "المخيخ" },
      { id: "c", en: "Hypothalamus", ar: "الوطاء" },
      { id: "d", en: "Optic nerve", ar: "العصب البصري" },
    ],
    correct: "a",
    explanationEn:
      "Because the spinal cord runs directly through the vertebral canal, a vertebral fracture-dislocation can directly injure it — the basis for spinal precautions.",
    explanationAr:
      "نظرًا لأن النخاع الشوكي يمر مباشرة عبر القناة الفقرية، يمكن لكسر وخلع فقري أن يصيبه مباشرة — وهو الأساس الذي تقوم عليه احتياطات العمود الفقري.",
  },
  {
    lessonSlug: "nervous-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which cranial nerve carries the motor signal for pupillary constriction?",
    textAr: "أي عصب قحفي ينقل الإشارة الحركية لانقباض الحدقة؟",
    choices: [
      { id: "a", en: "Cranial nerve I (olfactory)", ar: "العصب القحفي الأول (الشمي)" },
      { id: "b", en: "Cranial nerve II (optic)", ar: "العصب القحفي الثاني (البصري)" },
      { id: "c", en: "Cranial nerve III (oculomotor)", ar: "العصب القحفي الثالث (المحرك للعين)" },
      { id: "d", en: "Cranial nerve X (vagus)", ar: "العصب القحفي العاشر (المبهم)" },
    ],
    correct: "c",
    explanationEn:
      "The oculomotor nerve (cranial nerve III) carries the motor signal to the muscles that constrict the pupil.",
    explanationAr:
      "ينقل العصب المحرك للعين (العصب القحفي الثالث) الإشارة الحركية إلى العضلات التي تقبض الحدقة.",
  },
  {
    lessonSlug: "nervous-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which landmark is used to locate the correct interspace for a lumbar puncture?",
    textAr: "أي معلم يُستخدم لتحديد المسافة الصحيحة للبزل القطني؟",
    choices: [
      { id: "a", en: "Iliac crests", ar: "قمتا الحرقفة" },
      { id: "b", en: "Sternal angle", ar: "زاوية القص" },
      { id: "c", en: "Costovertebral angle", ar: "زاوية الفقار الضلعي" },
      { id: "d", en: "Acromion process", ar: "الناتئ الأخرمي" },
    ],
    correct: "a",
    explanationEn:
      "An imaginary line between the tops of the iliac crests (Tuffier's line) typically crosses the spine near L4, guiding safe lumbar puncture placement at L3–L4 or L4–L5.",
    explanationAr:
      "يعبر خط وهمي بين قمتي الحرقفتين (خط توفييه) العمود الفقري عادةً قرب L4، مما يوجّه الموضع الآمن للبزل القطني عند L3–L4 أو L4–L5.",
  },
  {
    lessonSlug: "nervous-clinical-anatomy-basics",
    type: "TRUE_FALSE",
    textEn: "The Glasgow Coma Scale is based on eye opening, verbal response, and motor response.",
    textAr: "يستند مقياس غلاسكو للغيبوبة إلى فتح العينين والاستجابة اللفظية والاستجابة الحركية.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "The Glasgow Coma Scale scores three types of response — eye opening, verbal response, and motor response — to assess level of consciousness.",
    explanationAr:
      "يسجّل مقياس غلاسكو للغيبوبة ثلاثة أنواع من الاستجابة — فتح العينين والاستجابة اللفظية والاستجابة الحركية — لتقييم مستوى الوعي.",
  },
];

module.exports = { lessons, questions, REFERENCES };
