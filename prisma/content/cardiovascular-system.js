// Real, written-from-scratch educational content for the Cardiovascular
// System module (Anatomy course). Facts are drawn from standard, widely
// taught anatomy knowledge; further reading references point to open
// academic resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 19: The Cardiovascular System: The Heart",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-introduction",
  },
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 20: The Cardiovascular System: Blood Vessels and Circulation",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Thorax, Heart\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK470256/",
  },
];

const lessons = [
  {
    slug: "cardiovascular-introduction",
    order: 1,
    titleEn: "Introduction to the Cardiovascular System",
    titleAr: "مقدمة عن الجهاز القلبي الوعائي",
    objectivesEn: [
      "Describe the main functions of the cardiovascular system.",
      "Identify the three main components of the cardiovascular system.",
      "Distinguish between the pulmonary and systemic circuits.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز القلبي الوعائي.",
      "تحديد المكونات الثلاثة الرئيسية للجهاز القلبي الوعائي.",
      "التمييز بين الدورة الدموية الرئوية والدورة الدموية الجهازية.",
    ],
    contentEn: `## Overview
The cardiovascular system is a closed transport network made of three main components: the **heart** (a muscular pump), **blood vessels** (the pipeline), and **blood** (the transported fluid). Together they move oxygen, nutrients, hormones, and waste products throughout the body.

## Main Functions
1. **Transport** – Carries oxygen and nutrients to tissues, and carbon dioxide and metabolic waste away from them.
2. **Regulation** – Helps regulate body temperature (by adjusting blood flow to the skin) and fluid/pH balance.
3. **Protection** – Circulates white blood cells and antibodies for immune defense, and clotting factors to limit blood loss after injury.

## Two Circuits
- **Pulmonary circuit**: carries deoxygenated blood from the right side of the heart to the lungs for gas exchange, and returns oxygenated blood to the left side of the heart.
- **Systemic circuit**: carries oxygenated blood from the left side of the heart to all body tissues, and returns deoxygenated blood to the right side of the heart.

The right side of the heart drives the pulmonary circuit, while the left side drives the systemic circuit — the two circuits are connected in series, so blood flows continuously through both with every heartbeat.

## Blood as a Component of the System
Blood itself is a connective tissue made of plasma (the fluid portion) and formed elements (red blood cells, white blood cells, and platelets). Its continuous, one-way movement through the vessels is what makes the transport functions above possible — a topic explored in more depth alongside the heart and vessels in later lessons.`,
    contentAr: `## نظرة عامة
الجهاز القلبي الوعائي هو شبكة نقل مغلقة تتكوّن من ثلاثة مكونات رئيسية: **القلب** (مضخة عضلية)، و**الأوعية الدموية** (شبكة الأنابيب)، و**الدم** (السائل المنقول). تعمل هذه المكونات معًا على نقل الأكسجين والعناصر الغذائية والهرمونات ونواتج الفضلات إلى جميع أنحاء الجسم.

## الوظائف الرئيسية
1. **النقل** – ينقل الأكسجين والعناصر الغذائية إلى الأنسجة، وينقل ثاني أكسيد الكربون والفضلات الاستقلابية بعيدًا عنها.
2. **التنظيم** – يساعد في تنظيم درجة حرارة الجسم (عبر تعديل تدفق الدم إلى الجلد) وتوازن السوائل ودرجة الحموضة.
3. **الحماية** – ينقل خلايا الدم البيضاء والأجسام المضادة للدفاع المناعي، وعوامل التخثر للحد من فقدان الدم بعد الإصابة.

## الدورتان الدمويتان
- **الدورة الرئوية**: تنقل الدم غير المؤكسج من الجانب الأيمن من القلب إلى الرئتين لتبادل الغازات، وتعيد الدم المؤكسج إلى الجانب الأيسر من القلب.
- **الدورة الجهازية**: تنقل الدم المؤكسج من الجانب الأيسر من القلب إلى جميع أنسجة الجسم، وتعيد الدم غير المؤكسج إلى الجانب الأيمن من القلب.

يقود الجانب الأيمن من القلب الدورة الرئوية، بينما يقود الجانب الأيسر الدورة الجهازية — وترتبط الدورتان على التوالي، بحيث يتدفق الدم باستمرار عبرهما مع كل نبضة قلب.

## الدم كأحد مكونات الجهاز
الدم بحد ذاته نسيج ضام يتكوّن من البلازما (الجزء السائل) والعناصر المُشكَّلة (خلايا الدم الحمراء والبيضاء والصفائح الدموية). وحركته المستمرة أحادية الاتجاه عبر الأوعية هي ما يجعل وظائف النقل المذكورة أعلاه ممكنة — وهو موضوع سنتناوله بمزيد من التفصيل مع القلب والأوعية في الدروس القادمة.`,
    terms: [
      { en: "Pulmonary circuit", ar: "الدورة الرئوية" },
      { en: "Systemic circuit", ar: "الدورة الجهازية" },
      { en: "Plasma", ar: "البلازما" },
      { en: "Formed elements", ar: "العناصر المُشكَّلة" },
      { en: "Cardiovascular system", ar: "الجهاز القلبي الوعائي" },
    ],
    summaryEn:
      "The cardiovascular system consists of the heart, blood vessels, and blood, and transports gases, nutrients, hormones, and waste. The right heart drives the pulmonary circuit to the lungs; the left heart drives the systemic circuit to the body.",
    summaryAr:
      "يتكوّن الجهاز القلبي الوعائي من القلب والأوعية الدموية والدم، وينقل الغازات والعناصر الغذائية والهرمونات والفضلات. يقود الجانب الأيمن من القلب الدورة الرئوية إلى الرئتين، ويقود الجانب الأيسر الدورة الجهازية إلى الجسم.",
  },
  {
    slug: "cardiovascular-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures of the Heart",
    titleAr: "البنى التشريحية للقلب",
    objectivesEn: [
      "Describe the three layers of the heart wall.",
      "Identify the four chambers of the heart.",
      "Identify the four valves of the heart and their general function.",
    ],
    objectivesAr: [
      "وصف الطبقات الثلاث لجدار القلب.",
      "تحديد الحجرات الأربع للقلب.",
      "تحديد الصمامات الأربعة للقلب ووظيفتها العامة.",
    ],
    contentEn: `## Layers of the Heart Wall
- **Pericardium**: a double-layered sac enclosing the heart; the outer fibrous layer anchors the heart in place, while the inner serous layer (with a small amount of fluid between its two sublayers) reduces friction as the heart beats.
- **Epicardium**: the outermost layer of the heart wall itself (the visceral layer of the serous pericardium).
- **Myocardium**: the thick, middle layer made of cardiac muscle tissue — responsible for the heart's pumping contractions. It is thickest in the left ventricle, which must generate the most force.
- **Endocardium**: the thin inner layer lining the heart's chambers and valves, continuous with the lining of blood vessels.

## The Four Chambers
- **Right atrium**: receives deoxygenated blood returning from the body via the superior and inferior vena cavae.
- **Right ventricle**: pumps deoxygenated blood into the pulmonary trunk toward the lungs.
- **Left atrium**: receives oxygenated blood returning from the lungs via the pulmonary veins.
- **Left ventricle**: pumps oxygenated blood into the aorta toward the rest of the body; its wall is the thickest of the four chambers.

The atria and ventricles are separated internally by the **interatrial septum** and **interventricular septum**, which normally keep oxygenated and deoxygenated blood from mixing.

## The Four Valves
- **Tricuspid valve**: between the right atrium and right ventricle.
- **Pulmonary valve**: between the right ventricle and the pulmonary trunk.
- **Mitral (bicuspid) valve**: between the left atrium and left ventricle.
- **Aortic valve**: between the left ventricle and the aorta.

These valves are one-way: the atrioventricular valves (tricuspid, mitral) prevent backflow into the atria during ventricular contraction, while the semilunar valves (pulmonary, aortic) prevent backflow into the ventricles once blood has been ejected.`,
    contentAr: `## طبقات جدار القلب
- **التامور**: كيس مزدوج الطبقة يحيط بالقلب؛ تُثبّت الطبقة الليفية الخارجية القلب في مكانه، بينما تقلل الطبقة المصلية الداخلية (مع كمية قليلة من السائل بين طبقتيها الفرعيتين) الاحتكاك أثناء نبض القلب.
- **النخاب**: الطبقة الخارجية لجدار القلب نفسه (الطبقة الحشوية من التامور المصلي).
- **عضلة القلب (الميوكارد)**: الطبقة الوسطى السميكة المكوّنة من نسيج العضلة القلبية — وهي المسؤولة عن انقباضات ضخ الدم. وهي أكثر سماكة في البطين الأيسر، الذي يحتاج إلى توليد أكبر قوة.
- **الشغاف**: الطبقة الداخلية الرقيقة التي تبطّن حجرات القلب وصماماته، وتتصل ببطانة الأوعية الدموية.

## الحجرات الأربع
- **الأذين الأيمن**: يستقبل الدم غير المؤكسج العائد من الجسم عبر الوريدين الأجوفين العلوي والسفلي.
- **البطين الأيمن**: يضخ الدم غير المؤكسج إلى الجذع الرئوي باتجاه الرئتين.
- **الأذين الأيسر**: يستقبل الدم المؤكسج العائد من الرئتين عبر الأوردة الرئوية.
- **البطين الأيسر**: يضخ الدم المؤكسج إلى الأبهر باتجاه بقية الجسم؛ وجداره هو الأكثر سماكة بين الحجرات الأربع.

يفصل بين الأذينين والبطينين داخليًا **الحاجز بين الأذينين** و**الحاجز بين البطينين**، اللذان يمنعان عادةً اختلاط الدم المؤكسج بغير المؤكسج.

## الصمامات الأربعة
- **الصمام ثلاثي الشرف**: بين الأذين الأيمن والبطين الأيمن.
- **الصمام الرئوي**: بين البطين الأيمن والجذع الرئوي.
- **الصمام التاجي (ثنائي الشرف)**: بين الأذين الأيسر والبطين الأيسر.
- **الصمام الأبهري**: بين البطين الأيسر والأبهر.

هذه الصمامات أحادية الاتجاه: تمنع الصمامات الأذينية البطينية (ثلاثي الشرف والتاجي) رجوع الدم إلى الأذينين أثناء انقباض البطينين، بينما تمنع الصمامات الهلالية (الرئوي والأبهري) رجوع الدم إلى البطينين بعد طرده.`,
    terms: [
      { en: "Myocardium", ar: "عضلة القلب (الميوكارد)" },
      { en: "Pericardium", ar: "التامور" },
      { en: "Interventricular septum", ar: "الحاجز بين البطينين" },
      { en: "Mitral valve", ar: "الصمام التاجي" },
      { en: "Semilunar valve", ar: "الصمام الهلالي" },
    ],
    summaryEn:
      "The heart wall has three layers (epicardium, myocardium, endocardium) surrounded by the pericardium. It has four chambers (right/left atria and ventricles) separated by septa, and four one-way valves (tricuspid, pulmonary, mitral, aortic) that keep blood flowing in one direction.",
    summaryAr:
      "يتكوّن جدار القلب من ثلاث طبقات (النخاب وعضلة القلب والشغاف) يحيط بها التامور. يحتوي القلب على أربع حجرات (الأذينان والبطينان) يفصل بينها حواجز، وأربعة صمامات أحادية الاتجاه (ثلاثي الشرف والرئوي والتاجي والأبهري) تحافظ على تدفق الدم في اتجاه واحد.",
  },
  {
    slug: "cardiovascular-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Describe the location and orientation of the heart within the thorax.",
      "Identify the major vessels entering and leaving the heart.",
      "Describe the general layout of the coronary arteries supplying the heart itself.",
    ],
    objectivesAr: [
      "وصف موقع القلب واتجاهه داخل الصدر.",
      "تحديد الأوعية الرئيسية الداخلة إلى القلب والخارجة منه.",
      "وصف التوزيع العام للشرايين التاجية التي تغذّي القلب نفسه.",
    ],
    contentEn: `## Location of the Heart
The heart lies within the **mediastinum**, the central compartment of the thoracic cavity between the two lungs, resting on the diaphragm. It sits obliquely: about two-thirds of its mass lies to the left of the body's midline. The broad, superior part is called the **base**; the pointed, inferior tip — formed mostly by the left ventricle — is the **apex**, which points toward the left hip and is where the heartbeat can often be felt or heard most strongly (roughly at the fifth intercostal space, midclavicular line).

## Major Vessels
- **Superior and inferior vena cavae**: bring deoxygenated blood from the upper and lower body into the right atrium.
- **Pulmonary trunk**: carries deoxygenated blood from the right ventricle, dividing into left and right pulmonary arteries toward the lungs.
- **Pulmonary veins**: (four total, two from each lung) return oxygenated blood to the left atrium.
- **Aorta**: the body's largest artery, carrying oxygenated blood from the left ventricle to the systemic circuit. It arches over the heart (the aortic arch) before descending through the thorax and abdomen, giving off branches along the way to the head, arms, and trunk organs.

## Coronary Circulation
The heart muscle needs its own dedicated blood supply, provided by the **coronary arteries**, which branch from the very start of the aorta, just above the aortic valve:
- The **left coronary artery** divides into the anterior interventricular (left anterior descending) branch and the circumflex branch, together supplying most of the left ventricle and interventricular septum.
- The **right coronary artery** supplies the right atrium, right ventricle, and (in most people) the posterior part of the interventricular septum.

Deoxygenated blood from the heart muscle drains mainly into the **coronary sinus**, which empties into the right atrium.`,
    contentAr: `## موقع القلب
يقع القلب داخل **المنصف**، وهو الحيّز المركزي في التجويف الصدري بين الرئتين، ويستقر على الحجاب الحاجز. يتخذ القلب وضعًا مائلًا: إذ تقع نحو ثلثي كتلته إلى يسار خط منتصف الجسم. يُسمّى الجزء العلوي العريض **قاعدة القلب**، بينما يُسمّى الطرف السفلي المدبب — والمكوّن أساسًا من البطين الأيسر — **قمة القلب**، وتتجه نحو الورك الأيسر، وهي المكان الذي غالبًا ما يُسمع أو يُجسّ فيه نبض القلب بوضوح (تقريبًا عند المسافة الوربية الخامسة على خط منتصف الترقوة).

## الأوعية الرئيسية
- **الوريدان الأجوفان العلوي والسفلي**: ينقلان الدم غير المؤكسج من الجزأين العلوي والسفلي من الجسم إلى الأذين الأيمن.
- **الجذع الرئوي**: ينقل الدم غير المؤكسج من البطين الأيمن، وينقسم إلى شريانين رئويين أيمن وأيسر باتجاه الرئتين.
- **الأوردة الرئوية**: (أربعة أوردة إجمالًا، وريدان من كل رئة) تعيد الدم المؤكسج إلى الأذين الأيسر.
- **الأبهر**: أكبر شريان في الجسم، ينقل الدم المؤكسج من البطين الأيسر إلى الدورة الجهازية. يقوس فوق القلب (قوس الأبهر) قبل أن ينزل عبر الصدر والبطن، مصدرًا فروعًا في طريقه إلى الرأس والذراعين وأعضاء الجذع.

## الدورة التاجية
تحتاج عضلة القلب إلى إمداد دموي خاص بها، توفّره **الشرايين التاجية**، التي تتفرّع من بداية الأبهر مباشرة، فوق الصمام الأبهري تمامًا:
- ينقسم **الشريان التاجي الأيسر** إلى الفرع بين البطينين الأمامي (النازل الأمامي الأيسر) والفرع المنعطف، ويغذّيان معًا معظم البطين الأيسر والحاجز بين البطينين.
- يغذّي **الشريان التاجي الأيمن** الأذين الأيمن والبطين الأيمن، وفي معظم الأشخاص الجزء الخلفي من الحاجز بين البطينين.

يصرف الدم غير المؤكسج من عضلة القلب أساسًا إلى **الجيب التاجي**، الذي يصب في الأذين الأيمن.`,
    terms: [
      { en: "Mediastinum", ar: "المنصف" },
      { en: "Apex of the heart", ar: "قمة القلب" },
      { en: "Coronary artery", ar: "الشريان التاجي" },
      { en: "Coronary sinus", ar: "الجيب التاجي" },
      { en: "Aortic arch", ar: "قوس الأبهر" },
    ],
    summaryEn:
      "The heart sits in the mediastinum, tilted so most of it lies left of midline, with its apex near the fifth intercostal space. Major vessels (venae cavae, pulmonary trunk/veins, aorta) connect to its chambers, and the heart muscle itself is supplied by the left and right coronary arteries.",
    summaryAr:
      "يقع القلب داخل المنصف، مائلًا بحيث يقع معظمه يسار خط المنتصف، وتكون قمته قرب المسافة الوربية الخامسة. تتصل الأوعية الرئيسية (الوريدان الأجوفان، والجذع والأوردة الرئوية، والأبهر) بحجراته، بينما تُغذّى عضلة القلب نفسها بالشريانين التاجيين الأيمن والأيسر.",
  },
  {
    slug: "cardiovascular-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Describe the heart's electrical conduction pathway.",
      "Explain the anatomical relationship between the cardiovascular and respiratory systems.",
      "Distinguish arteries, veins, and capillaries by structure and function.",
    ],
    objectivesAr: [
      "وصف مسار التوصيل الكهربائي في القلب.",
      "شرح العلاقة التشريحية بين الجهازين القلبي الوعائي والتنفسي.",
      "التمييز بين الشرايين والأوردة والشعيرات الدموية من حيث البنية والوظيفة.",
    ],
    contentEn: `## The Cardiac Conduction System
The heartbeat is coordinated by a specialized pathway of cardiac muscle cells that generate and conduct electrical signals:
1. **Sinoatrial (SA) node**: in the right atrium; the heart's natural pacemaker, initiating each heartbeat.
2. **Atrioventricular (AV) node**: near the floor of the right atrium; briefly delays the signal, allowing the atria to finish contracting before the ventricles begin.
3. **Bundle of His (atrioventricular bundle)**: carries the signal from the AV node into the interventricular septum, dividing into left and right bundle branches.
4. **Purkinje fibers**: spread the signal rapidly throughout the ventricular walls, producing a coordinated ventricular contraction.

This pathway ensures the atria contract first, then the ventricles — the sequence responsible for a normal, efficient heartbeat.

## Relationship with the Respiratory System
The cardiovascular and respiratory systems are structurally and functionally linked through the **pulmonary circuit**: the right ventricle pumps blood to the lungs specifically so it can pick up oxygen and release carbon dioxide across the thin walls of the pulmonary capillaries and alveoli. Because of this close relationship, cardiovascular and respiratory problems frequently affect one another clinically.

## Blood Vessel Types
- **Arteries**: carry blood away from the heart, generally under higher pressure; their walls are thicker and more muscular/elastic to withstand this pressure.
- **Veins**: carry blood back toward the heart, under lower pressure; many contain one-way valves (especially in the limbs) to prevent backflow against gravity.
- **Capillaries**: the smallest vessels, with walls only one cell thick, allowing the actual exchange of gases, nutrients, and waste between blood and tissue — the functional destination that arteries lead to and veins lead away from.`,
    contentAr: `## نظام التوصيل الكهربائي للقلب
يُنسَّق نبض القلب عبر مسار متخصص من خلايا العضلة القلبية التي تولّد الإشارات الكهربائية وتوصّلها:
1. **العقدة الجيبية الأذينية**: في الأذين الأيمن؛ وهي الناظم الطبيعي للقلب، وتبدأ كل نبضة قلبية.
2. **العقدة الأذينية البطينية**: قرب قاع الأذين الأيمن؛ تؤخّر الإشارة قليلًا، مما يتيح للأذينين إكمال انقباضهما قبل أن تبدأ البطينات.
3. **حزمة هيس (الحزمة الأذينية البطينية)**: تنقل الإشارة من العقدة الأذينية البطينية إلى الحاجز بين البطينين، وتنقسم إلى فرعين أيمن وأيسر.
4. **ألياف بركنجي**: توزّع الإشارة بسرعة في جميع أنحاء جدران البطينين، مما ينتج انقباضًا بطينيًا منسقًا.

يضمن هذا المسار انقباض الأذينين أولًا، ثم البطينين — وهو التسلسل المسؤول عن نبضة قلب طبيعية وفعّالة.

## العلاقة بالجهاز التنفسي
يرتبط الجهازان القلبي الوعائي والتنفسي بنيويًا ووظيفيًا عبر **الدورة الرئوية**: يضخ البطين الأيمن الدم إلى الرئتين تحديدًا ليتمكن من اكتساب الأكسجين والتخلص من ثاني أكسيد الكربون عبر الجدران الرقيقة للشعيرات الرئوية والأسناخ. ونظرًا لهذه العلاقة الوثيقة، غالبًا ما تؤثر مشكلات القلب والتنفس على بعضها سريريًا.

## أنواع الأوعية الدموية
- **الشرايين**: تنقل الدم بعيدًا عن القلب، وعادةً تحت ضغط أعلى؛ لذا جدرانها أكثر سماكة وعضلية/مرونة لتحمّل هذا الضغط.
- **الأوردة**: تنقل الدم عائدًا إلى القلب، تحت ضغط أقل؛ ويحتوي الكثير منها على صمامات أحادية الاتجاه (خصوصًا في الأطراف) لمنع رجوع الدم بفعل الجاذبية.
- **الشعيرات الدموية**: أصغر الأوعية، وجدرانها بسماكة خلية واحدة فقط، مما يتيح التبادل الفعلي للغازات والعناصر الغذائية والفضلات بين الدم والأنسجة — وهي الوجهة الوظيفية التي تقود إليها الشرايين وتبتعد عنها الأوردة.`,
    terms: [
      { en: "Sinoatrial (SA) node", ar: "العقدة الجيبية الأذينية" },
      { en: "Atrioventricular (AV) node", ar: "العقدة الأذينية البطينية" },
      { en: "Bundle of His", ar: "حزمة هيس" },
      { en: "Purkinje fibers", ar: "ألياف بركنجي" },
      { en: "Capillary", ar: "الشعيرة الدموية" },
    ],
    summaryEn:
      "Each heartbeat follows the SA node → AV node → Bundle of His → Purkinje fibers pathway, ensuring atria contract before ventricles. The heart and lungs are linked via the pulmonary circuit, and blood travels through arteries, capillaries (the site of exchange), and veins.",
    summaryAr:
      "تتبع كل نبضة قلبية مسار العقدة الجيبية الأذينية ← العقدة الأذينية البطينية ← حزمة هيس ← ألياف بركنجي، مما يضمن انقباض الأذينين قبل البطينين. يرتبط القلب بالرئتين عبر الدورة الرئوية، ويتنقل الدم عبر الشرايين والشعيرات الدموية (موضع التبادل) والأوردة.",
  },
  {
    slug: "cardiovascular-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Identify common pulse points used in clinical assessment.",
      "Describe the four auscultation points for heart sounds.",
      "Identify the anatomical basis for blood pressure measurement at the brachial artery.",
    ],
    objectivesAr: [
      "تحديد نقاط النبض الشائعة المستخدمة في التقييم السريري.",
      "وصف نقاط الأربع للإصغاء إلى أصوات القلب.",
      "تحديد الأساس التشريحي لقياس ضغط الدم عند الشريان العضدي.",
    ],
    contentEn: `## Common Pulse Points
A pulse can be felt wherever a superficial artery passes over a bone or firm tissue, close enough to the skin to be palpated. Common assessment sites include:
- **Radial** – at the wrist, most commonly used site for routine pulse checks.
- **Carotid** – at the neck, often used in emergencies (e.g., checking for a pulse during resuscitation).
- **Brachial** – in the antecubital fossa (inner elbow), used for blood pressure measurement and infant pulse checks.
- **Femoral** – in the groin, a strong central pulse used when peripheral pulses are difficult to find.
- **Popliteal, posterior tibial, and dorsalis pedis** – behind the knee, behind the medial ankle, and on top of the foot, respectively — used to assess circulation to the lower limb.

## Auscultation Points for Heart Sounds
Heart sounds are best heard where each valve's sound radiates, not necessarily directly over the valve itself. Four standard auscultation points, generally assessed in this order, are:
1. **Aortic area** – second intercostal space, right sternal border.
2. **Pulmonic area** – second intercostal space, left sternal border.
3. **Tricuspid area** – fourth or fifth intercostal space, left sternal border.
4. **Mitral (apical) area** – fifth intercostal space, midclavicular line — corresponding to the heart's apex, and typically where heart sounds are loudest.

## Blood Pressure Measurement
Blood pressure is most commonly measured over the **brachial artery** in the antecubital fossa, using a cuff placed around the upper arm. The brachial artery's relatively superficial position at this location, directly over bone, makes it an ideal site to hear the Korotkoff sounds produced as the cuff pressure is released — the anatomical reason this site was adopted as the clinical standard.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## نقاط النبض الشائعة
يمكن جسّ النبض في أي موضع يمر فيه شريان سطحي فوق عظم أو نسيج متماسك، بالقرب الكافي من الجلد ليتم جسّه. وتشمل مواضع التقييم الشائعة:
- **الشريان الكعبري (الرسغي)** – عند الرسغ، وهو الموضع الأكثر استخدامًا لفحص النبض الروتيني.
- **الشريان السباتي** – عند الرقبة، ويُستخدم غالبًا في الحالات الطارئة (مثل التحقق من النبض أثناء الإنعاش).
- **الشريان العضدي** – في الحفرة المرفقية (داخل المرفق)، ويُستخدم لقياس ضغط الدم وفحص نبض الرضّع.
- **الشريان الفخذي** – في المنطقة الأربية، وهو نبض مركزي قوي يُستخدم عندما يصعب إيجاد النبضات الطرفية.
- **الشرايين المأبضية والظنبوبية الخلفية وظهر القدم** – خلف الركبة، وخلف الكاحل الإنسي، وأعلى القدم على التوالي — وتُستخدم لتقييم الدورة الدموية في الطرف السفلي.

## نقاط الإصغاء لأصوات القلب
تُسمع أصوات القلب بوضوح أكبر في المواضع التي تنتقل إليها موجة الصوت من كل صمام، وليس بالضرورة فوق الصمام نفسه مباشرة. وتشمل نقاط الإصغاء الأربع القياسية، والتي تُقيَّم عادةً بهذا الترتيب:
1. **المنطقة الأبهرية** – المسافة الوربية الثانية، عند الحافة القصية اليمنى.
2. **المنطقة الرئوية** – المسافة الوربية الثانية، عند الحافة القصية اليسرى.
3. **المنطقة ثلاثية الشرف** – المسافة الوربية الرابعة أو الخامسة، عند الحافة القصية اليسرى.
4. **المنطقة التاجية (القمية)** – المسافة الوربية الخامسة، على خط منتصف الترقوة — وتقابل قمة القلب، وعادةً ما تكون أصوات القلب فيها الأعلى.

## قياس ضغط الدم
يُقاس ضغط الدم عادةً فوق **الشريان العضدي** في الحفرة المرفقية، باستخدام كفة توضع حول الجزء العلوي من الذراع. ويجعل الموقع السطحي نسبيًا للشريان العضدي في هذه المنطقة، فوق العظم مباشرة، منه موضعًا مثاليًا لسماع أصوات كوروتكوف الناتجة عند تحرير ضغط الكفة — وهو السبب التشريحي وراء اعتماد هذا الموضع كمعيار سريري.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Radial pulse", ar: "النبض الكعبري (الرسغي)" },
      { en: "Apical pulse", ar: "النبض القمي" },
      { en: "Auscultation", ar: "الإصغاء" },
      { en: "Brachial artery", ar: "الشريان العضدي" },
      { en: "Korotkoff sounds", ar: "أصوات كوروتكوف" },
    ],
    summaryEn:
      "Common pulse points include the radial, carotid, brachial, femoral, and pedal arteries. Heart sounds are assessed at four points (aortic, pulmonic, tricuspid, mitral/apical), and blood pressure is measured at the brachial artery.",
    summaryAr:
      "تشمل نقاط النبض الشائعة الشرايين الكعبرية والسباتية والعضدية والفخذية وشرايين القدم. تُقيَّم أصوات القلب عند أربع نقاط (الأبهرية والرئوية وثلاثية الشرف والتاجية/القمية)، ويُقاس ضغط الدم عند الشريان العضدي.",
  },
].map((lesson) => ({ ...lesson, references: lesson.references ?? REFERENCES }));

const questions = [
  {
    lessonSlug: "cardiovascular-introduction",
    type: "MCQ",
    textEn: "Which side of the heart drives the pulmonary circuit?",
    textAr: "أي جانب من القلب يقود الدورة الرئوية؟",
    choices: [
      { id: "a", en: "Left side", ar: "الجانب الأيسر" },
      { id: "b", en: "Right side", ar: "الجانب الأيمن" },
      { id: "c", en: "Both sides equally", ar: "كلا الجانبين بالتساوي" },
      { id: "d", en: "Neither side", ar: "لا هذا ولا ذاك" },
    ],
    correct: "b",
    explanationEn:
      "The right side of the heart pumps deoxygenated blood to the lungs (the pulmonary circuit); the left side pumps oxygenated blood to the body (the systemic circuit).",
    explanationAr:
      "يضخ الجانب الأيمن من القلب الدم غير المؤكسج إلى الرئتين (الدورة الرئوية)، بينما يضخ الجانب الأيسر الدم المؤكسج إلى الجسم (الدورة الجهازية).",
  },
  {
    lessonSlug: "cardiovascular-introduction",
    type: "TRUE_FALSE",
    textEn: "Blood is considered a type of connective tissue.",
    textAr: "يُعدّ الدم نوعًا من الأنسجة الضامة.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "Blood is classified as a connective tissue, made of plasma (fluid matrix) and formed elements (red cells, white cells, platelets).",
    explanationAr:
      "يُصنَّف الدم كنسيج ضام، ويتكوّن من البلازما (المادة السائلة) والعناصر المُشكَّلة (خلايا الدم الحمراء والبيضاء والصفائح الدموية).",
  },
  {
    lessonSlug: "cardiovascular-anatomical-structures",
    type: "MCQ",
    textEn: "Which heart chamber has the thickest muscular wall?",
    textAr: "أي حجرة من حجرات القلب تمتلك أسمك جدار عضلي؟",
    choices: [
      { id: "a", en: "Right atrium", ar: "الأذين الأيمن" },
      { id: "b", en: "Right ventricle", ar: "البطين الأيمن" },
      { id: "c", en: "Left atrium", ar: "الأذين الأيسر" },
      { id: "d", en: "Left ventricle", ar: "البطين الأيسر" },
    ],
    correct: "d",
    explanationEn:
      "The left ventricle has the thickest wall because it must generate enough force to pump blood through the entire systemic circuit.",
    explanationAr:
      "يمتلك البطين الأيسر أسمك جدار لأنه يحتاج إلى توليد قوة كافية لضخ الدم عبر الدورة الجهازية بأكملها.",
  },
  {
    lessonSlug: "cardiovascular-anatomical-structures",
    type: "MCQ",
    textEn: "Which valve lies between the left atrium and the left ventricle?",
    textAr: "أي صمام يقع بين الأذين الأيسر والبطين الأيسر؟",
    choices: [
      { id: "a", en: "Tricuspid valve", ar: "الصمام ثلاثي الشرف" },
      { id: "b", en: "Pulmonary valve", ar: "الصمام الرئوي" },
      { id: "c", en: "Mitral valve", ar: "الصمام التاجي" },
      { id: "d", en: "Aortic valve", ar: "الصمام الأبهري" },
    ],
    correct: "c",
    explanationEn:
      "The mitral (bicuspid) valve lies between the left atrium and left ventricle, preventing backflow into the atrium during ventricular contraction.",
    explanationAr:
      "يقع الصمام التاجي (ثنائي الشرف) بين الأذين الأيسر والبطين الأيسر، ويمنع رجوع الدم إلى الأذين أثناء انقباض البطين.",
  },
  {
    lessonSlug: "cardiovascular-anatomical-structures",
    type: "MCQ",
    textEn: "Which layer of the heart wall is made of cardiac muscle tissue?",
    textAr: "أي طبقة من جدار القلب تتكوّن من نسيج العضلة القلبية؟",
    choices: [
      { id: "a", en: "Epicardium", ar: "النخاب" },
      { id: "b", en: "Myocardium", ar: "عضلة القلب (الميوكارد)" },
      { id: "c", en: "Endocardium", ar: "الشغاف" },
      { id: "d", en: "Pericardium", ar: "التامور" },
    ],
    correct: "b",
    explanationEn:
      "The myocardium is the thick, middle layer of cardiac muscle tissue responsible for the heart's pumping contractions.",
    explanationAr:
      "عضلة القلب (الميوكارد) هي الطبقة الوسطى السميكة من نسيج العضلة القلبية، وهي المسؤولة عن انقباضات ضخ الدم.",
  },
  {
    lessonSlug: "cardiovascular-organs-locations",
    type: "MCQ",
    textEn: "The heart is located within which body cavity?",
    textAr: "يقع القلب ضمن أي تجويف من تجاويف الجسم؟",
    choices: [
      { id: "a", en: "The abdominal cavity", ar: "التجويف البطني" },
      { id: "b", en: "The mediastinum", ar: "المنصف" },
      { id: "c", en: "The pelvic cavity", ar: "التجويف الحوضي" },
      { id: "d", en: "The cranial cavity", ar: "التجويف القحفي" },
    ],
    correct: "b",
    explanationEn:
      "The heart lies in the mediastinum, the central compartment of the thoracic cavity between the lungs.",
    explanationAr:
      "يقع القلب في المنصف، وهو الحيّز المركزي في التجويف الصدري بين الرئتين.",
  },
  {
    lessonSlug: "cardiovascular-organs-locations",
    type: "MCQ",
    textEn: "Which vessels return oxygenated blood to the left atrium?",
    textAr: "أي الأوعية تعيد الدم المؤكسج إلى الأذين الأيسر؟",
    choices: [
      { id: "a", en: "Pulmonary arteries", ar: "الشرايين الرئوية" },
      { id: "b", en: "Pulmonary veins", ar: "الأوردة الرئوية" },
      { id: "c", en: "Venae cavae", ar: "الأوردة الأجوفة" },
      { id: "d", en: "Coronary arteries", ar: "الشرايين التاجية" },
    ],
    correct: "b",
    explanationEn:
      "The four pulmonary veins carry freshly oxygenated blood from the lungs back to the left atrium.",
    explanationAr:
      "تنقل الأوردة الرئوية الأربعة الدم المؤكسج حديثًا من الرئتين عائدًا إلى الأذين الأيسر.",
  },
  {
    lessonSlug: "cardiovascular-organs-locations",
    type: "CASE_BASED",
    textEn:
      "A patient has a blockage in the left anterior descending branch of the left coronary artery. Which structure is most directly affected?",
    textAr: "لدى مريض انسداد في الفرع النازل الأمامي الأيسر من الشريان التاجي الأيسر. أي بنية تتأثر بشكل مباشر؟",
    choices: [
      { id: "a", en: "Right atrium", ar: "الأذين الأيمن" },
      { id: "b", en: "Left ventricle and interventricular septum", ar: "البطين الأيسر والحاجز بين البطينين" },
      { id: "c", en: "Right lung", ar: "الرئة اليمنى" },
      { id: "d", en: "Liver", ar: "الكبد" },
    ],
    correct: "b",
    explanationEn:
      "The left anterior descending branch of the left coronary artery supplies most of the left ventricle and the interventricular septum, making blockages here especially significant.",
    explanationAr:
      "يغذّي الفرع النازل الأمامي الأيسر من الشريان التاجي الأيسر معظم البطين الأيسر والحاجز بين البطينين، مما يجعل انسداده في هذا الموضع ذا أهمية خاصة.",
  },
  {
    lessonSlug: "cardiovascular-anatomical-relationships",
    type: "MCQ",
    textEn: "Which structure is the heart's natural pacemaker?",
    textAr: "أي بنية تُعدّ الناظم الطبيعي للقلب؟",
    choices: [
      { id: "a", en: "Atrioventricular (AV) node", ar: "العقدة الأذينية البطينية" },
      { id: "b", en: "Bundle of His", ar: "حزمة هيس" },
      { id: "c", en: "Sinoatrial (SA) node", ar: "العقدة الجيبية الأذينية" },
      { id: "d", en: "Purkinje fibers", ar: "ألياف بركنجي" },
    ],
    correct: "c",
    explanationEn:
      "The sinoatrial (SA) node, located in the right atrium, initiates each heartbeat and is known as the heart's natural pacemaker.",
    explanationAr:
      "تبدأ العقدة الجيبية الأذينية، الموجودة في الأذين الأيمن، كل نبضة قلبية، وتُعرف بالناظم الطبيعي للقلب.",
  },
  {
    lessonSlug: "cardiovascular-anatomical-relationships",
    type: "MCQ",
    textEn: "Where does gas exchange actually occur between blood and tissue?",
    textAr: "أين يحدث تبادل الغازات فعليًا بين الدم والأنسجة؟",
    choices: [
      { id: "a", en: "In arteries", ar: "في الشرايين" },
      { id: "b", en: "In veins", ar: "في الأوردة" },
      { id: "c", en: "In capillaries", ar: "في الشعيرات الدموية" },
      { id: "d", en: "In the heart chambers", ar: "في حجرات القلب" },
    ],
    correct: "c",
    explanationEn:
      "Capillary walls are only one cell thick, allowing gases, nutrients, and waste to be exchanged between blood and surrounding tissue.",
    explanationAr:
      "جدران الشعيرات الدموية بسماكة خلية واحدة فقط، مما يتيح تبادل الغازات والعناصر الغذائية والفضلات بين الدم والأنسجة المحيطة.",
  },
  {
    lessonSlug: "cardiovascular-anatomical-relationships",
    type: "TRUE_FALSE",
    textEn: "The AV node normally delays the electrical signal before it reaches the ventricles.",
    textAr: "تؤخّر العقدة الأذينية البطينية عادةً الإشارة الكهربائية قبل وصولها إلى البطينين.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "The AV node briefly delays the signal so the atria finish contracting and emptying into the ventricles before the ventricles themselves contract.",
    explanationAr:
      "تؤخّر العقدة الأذينية البطينية الإشارة قليلًا لضمان اكتمال انقباض الأذينين وتفريغهما في البطينين قبل أن تنقبض البطينات نفسها.",
  },
  {
    lessonSlug: "cardiovascular-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Where is the apical pulse typically auscultated?",
    textAr: "أين يُصغى عادةً إلى النبض القمي؟",
    choices: [
      { id: "a", en: "Second intercostal space, right sternal border", ar: "المسافة الوربية الثانية عند الحافة القصية اليمنى" },
      { id: "b", en: "Fifth intercostal space, midclavicular line", ar: "المسافة الوربية الخامسة على خط منتصف الترقوة" },
      { id: "c", en: "At the carotid artery", ar: "عند الشريان السباتي" },
      { id: "d", en: "At the radial artery", ar: "عند الشريان الكعبري" },
    ],
    correct: "b",
    explanationEn:
      "The apical (mitral) area is at the fifth intercostal space, midclavicular line — corresponding to the heart's apex, where sounds are typically loudest.",
    explanationAr:
      "تقع المنطقة القمية (التاجية) عند المسافة الوربية الخامسة على خط منتصف الترقوة — وهو ما يقابل قمة القلب، حيث تكون الأصوات عادةً في أعلى مستوياتها.",
  },
  {
    lessonSlug: "cardiovascular-clinical-anatomy-basics",
    type: "CASE_BASED",
    textEn: "A nurse is preparing to measure a patient's blood pressure with a manual cuff. Over which artery is the cuff and stethoscope typically positioned?",
    textAr: "تستعد الممرضة لقياس ضغط دم مريض باستخدام كفة يدوية. فوق أي شريان توضع الكفة وسماعة الطبيب عادةً؟",
    choices: [
      { id: "a", en: "Radial artery", ar: "الشريان الكعبري" },
      { id: "b", en: "Femoral artery", ar: "الشريان الفخذي" },
      { id: "c", en: "Brachial artery", ar: "الشريان العضدي" },
      { id: "d", en: "Carotid artery", ar: "الشريان السباتي" },
    ],
    correct: "c",
    explanationEn:
      "Blood pressure is conventionally measured over the brachial artery in the antecubital fossa, a superficial site directly over bone that makes Korotkoff sounds easy to hear.",
    explanationAr:
      "يُقاس ضغط الدم عادةً فوق الشريان العضدي في الحفرة المرفقية، وهو موضع سطحي فوق العظم مباشرة يسهّل سماع أصوات كوروتكوف.",
  },
  {
    lessonSlug: "cardiovascular-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which pulse point is most commonly checked during adult CPR to confirm cardiac arrest?",
    textAr: "أي نقطة نبض تُفحص غالبًا أثناء الإنعاش القلبي الرئوي للبالغين للتأكد من توقف القلب؟",
    choices: [
      { id: "a", en: "Radial", ar: "الكعبري" },
      { id: "b", en: "Carotid", ar: "السباتي" },
      { id: "c", en: "Popliteal", ar: "المأبضي" },
      { id: "d", en: "Dorsalis pedis", ar: "ظهر القدم" },
    ],
    correct: "b",
    explanationEn:
      "The carotid pulse, at the neck, is the standard site checked in adults during resuscitation because it remains palpable even when peripheral pulses are weak.",
    explanationAr:
      "يُعدّ النبض السباتي، عند الرقبة، الموضع المعياري الذي يُفحص لدى البالغين أثناء الإنعاش لأنه يبقى قابلًا للجسّ حتى عندما تضعف النبضات الطرفية.",
  },
];

module.exports = { lessons, questions, REFERENCES };
