// Real, written-from-scratch educational content for the Digestive System
// module (Anatomy course). Facts are drawn from standard, widely taught
// anatomy knowledge; further reading references point to open academic
// resources (OpenStax, NCBI Bookshelf) rather than claiming any
// institutional accreditation.

const REFERENCES = [
  {
    label: "OpenStax, Anatomy and Physiology 2e — Chapter 23: The Digestive System",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/23-introduction",
  },
  {
    label: "NCBI Bookshelf, StatPearls — \"Anatomy, Abdomen and Pelvis: Stomach\"",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK482334/",
  },
];

const lessons = [
  {
    slug: "digestive-introduction",
    order: 1,
    titleEn: "Introduction to the Digestive System",
    titleAr: "مقدمة عن الجهاز الهضمي",
    objectivesEn: [
      "Describe the main functions of the digestive system.",
      "Distinguish between the gastrointestinal (GI) tract and accessory digestive organs.",
      "List the organs of the alimentary canal in order.",
    ],
    objectivesAr: [
      "وصف الوظائف الرئيسية للجهاز الهضمي.",
      "التمييز بين القناة الهضمية والأعضاء الهضمية الملحقة.",
      "سرد أعضاء القناة الهضمية بالترتيب.",
    ],
    contentEn: `## Overview
The digestive system breaks down food into forms the body can absorb and use for energy, growth, and repair, then eliminates what cannot be used.

## Main Functions
1. **Ingestion** – Taking food into the mouth.
2. **Propulsion** – Moving food along the tract, mainly through **peristalsis** (coordinated waves of muscle contraction).
3. **Mechanical digestion** – Physically breaking food into smaller pieces (chewing, churning in the stomach).
4. **Chemical digestion** – Breaking down large molecules (carbohydrates, proteins, fats) into absorbable units using enzymes and acids.
5. **Absorption** – Moving digested nutrients from the GI tract into the blood or lymph.
6. **Defecation** – Eliminating indigestible or unabsorbed waste as feces.

## GI Tract vs. Accessory Organs
- **Gastrointestinal (GI) tract** (also called the alimentary canal): the continuous muscular tube food actually passes through — mouth, pharynx, esophagus, stomach, small intestine, large intestine, rectum, and anus.
- **Accessory digestive organs**: organs that support digestion but that food does not pass through directly — the teeth, tongue, salivary glands, liver, gallbladder, and pancreas. They contribute enzymes, bile, or mechanical help rather than being part of the food's actual pathway.

## The Alimentary Canal, in Order
Mouth → pharynx → esophagus → stomach → small intestine (duodenum, jejunum, ileum) → large intestine (cecum, colon, rectum) → anus. Each segment is specialized for particular tasks along this one continuous pathway, which in an adult is several meters long.`,
    contentAr: `## نظرة عامة
يفكّك الجهاز الهضمي الطعام إلى أشكال يمكن للجسم امتصاصها واستخدامها للطاقة والنمو والإصلاح، ثم يتخلص مما لا يمكن الاستفادة منه.

## الوظائف الرئيسية
1. **الابتلاع** – إدخال الطعام إلى الفم.
2. **الدفع** – تحريك الطعام عبر القناة، أساسًا عبر **التمعج** (موجات منسقة من انقباض العضلات).
3. **الهضم الميكانيكي** – تفتيت الطعام فيزيائيًا إلى قطع أصغر (المضغ، والخض في المعدة).
4. **الهضم الكيميائي** – تفكيك الجزيئات الكبيرة (الكربوهيدرات والبروتينات والدهون) إلى وحدات قابلة للامتصاص باستخدام الإنزيمات والأحماض.
5. **الامتصاص** – نقل العناصر الغذائية المهضومة من القناة الهضمية إلى الدم أو اللمف.
6. **التغوّط** – التخلص من الفضلات غير القابلة للهضم أو غير الممتصة على شكل براز.

## القناة الهضمية مقابل الأعضاء الملحقة
- **القناة الهضمية**: الأنبوب العضلي المستمر الذي يمر عبره الطعام فعليًا — الفم والبلعوم والمريء والمعدة والأمعاء الدقيقة والأمعاء الغليظة والمستقيم والشرج.
- **الأعضاء الهضمية الملحقة**: أعضاء تدعم عملية الهضم لكن الطعام لا يمر عبرها مباشرة — الأسنان واللسان والغدد اللعابية والكبد والمرارة والبنكرياس. وتساهم هذه الأعضاء بالإنزيمات أو الصفراء أو المساعدة الميكانيكية بدلًا من أن تكون جزءًا من مسار الطعام الفعلي.

## القناة الهضمية بالترتيب
الفم ← البلعوم ← المريء ← المعدة ← الأمعاء الدقيقة (الاثنا عشر، الصائم، اللفائفي) ← الأمعاء الغليظة (الأعور، القولون، المستقيم) ← الشرج. ويتخصص كل جزء بمهام محددة ضمن هذا المسار المستمر الواحد، الذي يبلغ طوله عدة أمتار لدى الشخص البالغ.`,
    terms: [
      { en: "Peristalsis", ar: "التمعج" },
      { en: "Alimentary canal", ar: "القناة الهضمية" },
      { en: "Accessory digestive organ", ar: "العضو الهضمي الملحق" },
      { en: "Mechanical digestion", ar: "الهضم الميكانيكي" },
      { en: "Chemical digestion", ar: "الهضم الكيميائي" },
    ],
    summaryEn:
      "The digestive system ingests, propels, mechanically and chemically digests, absorbs, and eliminates food. The GI tract is the continuous tube food passes through; accessory organs (teeth, salivary glands, liver, gallbladder, pancreas) support digestion without food passing through them.",
    summaryAr:
      "يقوم الجهاز الهضمي بابتلاع الطعام ودفعه وهضمه ميكانيكيًا وكيميائيًا وامتصاصه والتخلص منه. القناة الهضمية هي الأنبوب المستمر الذي يمر عبره الطعام؛ أما الأعضاء الملحقة (الأسنان، الغدد اللعابية، الكبد، المرارة، البنكرياس) فتدعم الهضم دون أن يمر الطعام عبرها.",
  },
  {
    slug: "digestive-anatomical-structures",
    order: 2,
    titleEn: "Anatomical Structures of the GI Tract Wall",
    titleAr: "البنى التشريحية لجدار القناة الهضمية",
    objectivesEn: [
      "Describe the four layers of the GI tract wall.",
      "Identify the general regions of the stomach.",
      "Describe the three segments of the small intestine.",
    ],
    objectivesAr: [
      "وصف الطبقات الأربع لجدار القناة الهضمية.",
      "تحديد المناطق العامة للمعدة.",
      "وصف الأجزاء الثلاثة للأمعاء الدقيقة.",
    ],
    contentEn: `## The Four Layers of the GI Tract Wall
From the esophagus through the large intestine, the wall shares a common basic structure of four layers:
1. **Mucosa**: the innermost layer, in direct contact with food; contains epithelium (absorptive and secretory cells), and in some regions is folded to increase surface area.
2. **Submucosa**: a layer of connective tissue containing blood vessels, lymphatics, and a network of nerves (the submucosal plexus) that helps regulate local blood flow and secretion.
3. **Muscularis externa**: usually two layers of smooth muscle (an inner circular layer and outer longitudinal layer) responsible for peristalsis; contains the myenteric plexus, which coordinates these contractions.
4. **Serosa** (or adventitia in some regions): the outermost connective tissue layer.

## Regions of the Stomach
The stomach is divided into four main regions:
- **Cardia**: the small region surrounding where the esophagus empties in.
- **Fundus**: the rounded, superior portion, above and to the left of the cardia.
- **Body**: the large central region, where most mixing and digestion occurs.
- **Pylorus**: the funnel-shaped final region, ending at the **pyloric sphincter**, which controls the release of partially digested food (chyme) into the duodenum.

## Segments of the Small Intestine
The small intestine, despite its name, is the longest part of the GI tract (several meters), divided into three segments:
- **Duodenum**: the shortest segment, where the stomach empties and where bile and pancreatic secretions enter.
- **Jejunum**: the middle segment, where the majority of nutrient absorption occurs.
- **Ileum**: the final, longest segment, which absorbs remaining nutrients (including vitamin B12 and bile salts) before joining the large intestine at the ileocecal valve.`,
    contentAr: `## الطبقات الأربع لجدار القناة الهضمية
من المريء وحتى الأمعاء الغليظة، يشترك الجدار في بنية أساسية مكوّنة من أربع طبقات:
1. **المخاطية**: الطبقة الداخلية، وهي على تماس مباشر مع الطعام؛ وتحتوي على ظهارة (خلايا ماصة وإفرازية)، وتكون مطوية في بعض المناطق لزيادة مساحة السطح.
2. **تحت المخاطية**: طبقة من النسيج الضام تحتوي على أوعية دموية ولمفاوية وشبكة من الأعصاب (الضفيرة تحت المخاطية) تساعد على تنظيم التدفق الدموي والإفراز الموضعيين.
3. **الطبقة العضلية الخارجية**: عادةً طبقتان من العضلات الملساء (طبقة داخلية دائرية وطبقة خارجية طولية) مسؤولتان عن التمعج؛ وتحتوي على الضفيرة العضلية المعوية التي تنسّق هذه الانقباضات.
4. **المصلية** (أو الغلالة الخارجية في بعض المناطق): الطبقة الخارجية من النسيج الضام.

## مناطق المعدة
تنقسم المعدة إلى أربع مناطق رئيسية:
- **القلبية**: المنطقة الصغيرة المحيطة بموضع تفريغ المريء.
- **القاع**: الجزء العلوي المستدير، أعلى وإلى يسار القلبية.
- **الجسم**: المنطقة المركزية الكبيرة، حيث يحدث معظم الخض والهضم.
- **البواب**: المنطقة الأخيرة على شكل قمع، وتنتهي عند **العضلة العاصرة البوابية**، التي تتحكم بإطلاق الطعام المهضوم جزئيًا (الكيموس) إلى الاثني عشر.

## أجزاء الأمعاء الدقيقة
رغم اسمها، تُعدّ الأمعاء الدقيقة أطول جزء في القناة الهضمية (عدة أمتار)، وتنقسم إلى ثلاثة أجزاء:
- **الاثنا عشر**: أقصر جزء، وحيث تُفرّغ المعدة محتوياتها وتدخل إفرازات الصفراء والبنكرياس.
- **الصائم**: الجزء الأوسط، وحيث يحدث معظم امتصاص العناصر الغذائية.
- **اللفائفي**: الجزء الأخير والأطول، ويمتص ما تبقى من العناصر الغذائية (بما فيها فيتامين ب12 وأملاح الصفراء) قبل أن يتصل بالأمعاء الغليظة عند الصمام اللفائفي الأعوري.`,
    terms: [
      { en: "Mucosa", ar: "المخاطية" },
      { en: "Muscularis externa", ar: "الطبقة العضلية الخارجية" },
      { en: "Pyloric sphincter", ar: "العضلة العاصرة البوابية" },
      { en: "Duodenum", ar: "الاثنا عشر" },
      { en: "Ileocecal valve", ar: "الصمام اللفائفي الأعوري" },
    ],
    summaryEn:
      "The GI tract wall has four layers: mucosa, submucosa, muscularis externa, and serosa. The stomach has four regions (cardia, fundus, body, pylorus), and the small intestine has three segments (duodenum, jejunum, ileum).",
    summaryAr:
      "يتكوّن جدار القناة الهضمية من أربع طبقات: المخاطية وتحت المخاطية والطبقة العضلية الخارجية والمصلية. تحتوي المعدة على أربع مناطق (القلبية والقاع والجسم والبواب)، وتنقسم الأمعاء الدقيقة إلى ثلاثة أجزاء (الاثنا عشر والصائم واللفائفي).",
  },
  {
    slug: "digestive-organs-locations",
    order: 3,
    titleEn: "Organs and Their Locations",
    titleAr: "الأعضاء ومواقعها",
    objectivesEn: [
      "Describe the location of the stomach and large intestine segments.",
      "Describe the location of the liver and gallbladder.",
      "Describe the location of the pancreas relative to the stomach and duodenum.",
    ],
    objectivesAr: [
      "وصف موقع المعدة وأجزاء الأمعاء الغليظة.",
      "وصف موقع الكبد والمرارة.",
      "وصف موقع البنكرياس بالنسبة إلى المعدة والاثني عشر.",
    ],
    contentEn: `## Stomach and Intestines
The **stomach** lies mainly in the left upper quadrant of the abdomen, just below the diaphragm. The **small intestine** occupies the central and lower abdomen, coiled within the abdominal cavity. The **large intestine** frames the small intestine, beginning in the lower right abdomen at the **cecum** (with the appendix attached), ascending, crossing, and descending around the perimeter of the abdominal cavity (ascending, transverse, descending, and sigmoid colon) before reaching the rectum and anus in the pelvis.

## The Liver
The **liver** is the largest internal organ, located primarily in the right upper quadrant, just below the diaphragm. It is divided into four lobes, the two largest being the **right lobe** (the largest) and the **left lobe**. The liver produces **bile**, which is essential for fat digestion, and performs many other metabolic functions (processing nutrients, filtering blood, producing plasma proteins).

## The Gallbladder
The **gallbladder** is a small, pear-shaped sac tucked against the inferior surface of the liver's right lobe. It stores and concentrates bile produced by the liver between meals, then releases it into the duodenum via the **cystic duct**, which joins the **common bile duct**, when fatty food is present.

## The Pancreas
The **pancreas** is a long, retroperitoneal (behind the peritoneum) gland lying transversely across the posterior abdomen, behind the stomach. It has three regions: the **head** (nestled within the curve of the duodenum), the **body** (the main, central portion), and the **tail** (extending toward the spleen on the left side). It has two roles: an exocrine role (secreting digestive enzymes into the duodenum via the pancreatic duct) and an endocrine role (secreting insulin and glucagon directly into the blood).`,
    contentAr: `## المعدة والأمعاء
تقع **المعدة** أساسًا في الربع العلوي الأيسر من البطن، أسفل الحجاب الحاجز مباشرة. وتشغل **الأمعاء الدقيقة** وسط البطن وأسفله، متلفّفة داخل التجويف البطني. وتحيط **الأمعاء الغليظة** بالأمعاء الدقيقة، بادئة في أسفل يمين البطن عند **الأعور** (حيث تتصل الزائدة الدودية)، ثم تصعد وتعبر وتنزل حول محيط التجويف البطني (القولون الصاعد والمستعرض والنازل والسيني) قبل أن تصل إلى المستقيم والشرج في الحوض.

## الكبد
**الكبد** هو أكبر عضو داخلي، ويقع أساسًا في الربع العلوي الأيمن، أسفل الحجاب الحاجز مباشرة. وينقسم إلى أربعة فصوص، أكبرها **الفص الأيمن** (وهو الأكبر) و**الفص الأيسر**. وينتج الكبد **الصفراء**، الضرورية لهضم الدهون، ويؤدي وظائف استقلابية عديدة أخرى (معالجة العناصر الغذائية، وترشيح الدم، وإنتاج بروتينات البلازما).

## المرارة
**المرارة** كيس صغير على شكل كمثرى، يقع ملاصقًا للسطح السفلي للفص الأيمن من الكبد. تخزّن الصفراء التي ينتجها الكبد وتركّزها بين الوجبات، ثم تطلقها إلى الاثني عشر عبر **القناة المرارية**، التي تتصل بـ**القناة الصفراوية المشتركة**، عندما يوجد طعام دهني.

## البنكرياس
**البنكرياس** غدة طويلة خلف الصفاق، تقع بشكل عرضي في خلف البطن، خلف المعدة. ويتكوّن من ثلاث مناطق: **الرأس** (المتموضع داخل انحناء الاثني عشر)، و**الجسم** (الجزء المركزي الرئيسي)، و**الذيل** (يمتد باتجاه الطحال على الجانب الأيسر). وله دوران: دور خارجي الإفراز (إفراز الإنزيمات الهضمية إلى الاثني عشر عبر القناة البنكرياسية) ودور داخلي الإفراز (إفراز الإنسولين والغلوكاغون مباشرة في الدم).`,
    terms: [
      { en: "Cecum", ar: "الأعور" },
      { en: "Common bile duct", ar: "القناة الصفراوية المشتركة" },
      { en: "Retroperitoneal", ar: "خلف الصفاق" },
      { en: "Pancreatic duct", ar: "القناة البنكرياسية" },
      { en: "Right upper quadrant", ar: "الربع العلوي الأيمن" },
    ],
    summaryEn:
      "The stomach sits in the left upper quadrant, the large intestine frames the small intestine around the abdominal perimeter, the liver and gallbladder sit in the right upper quadrant, and the retroperitoneal pancreas lies behind the stomach with its head nestled in the duodenal curve.",
    summaryAr:
      "تقع المعدة في الربع العلوي الأيسر، وتحيط الأمعاء الغليظة بالأمعاء الدقيقة حول محيط البطن، ويقع الكبد والمرارة في الربع العلوي الأيمن، ويقع البنكرياس خلف الصفاق خلف المعدة، ويتموضع رأسه داخل انحناء الاثني عشر.",
  },
  {
    slug: "digestive-anatomical-relationships",
    order: 4,
    titleEn: "Anatomical Relationships",
    titleAr: "العلاقات التشريحية",
    objectivesEn: [
      "Describe the peritoneum and its relationship to abdominal organs.",
      "Explain how the liver, gallbladder, pancreas, and duodenum are connected.",
      "Describe the basic relationship between the digestive tract and the enteric nervous system.",
    ],
    objectivesAr: [
      "وصف الصفاق وعلاقته بأعضاء البطن.",
      "شرح كيفية ارتباط الكبد والمرارة والبنكرياس والاثني عشر ببعضها.",
      "وصف العلاقة الأساسية بين القناة الهضمية والجهاز العصبي المعوي.",
    ],
    contentEn: `## The Peritoneum
The **peritoneum** is a large serous membrane lining the abdominal cavity and covering most abdominal organs:
- **Parietal peritoneum**: lines the abdominal wall.
- **Visceral peritoneum**: covers the organs themselves.
- **Mesentery**: a double fold of peritoneum that suspends the small intestine (and parts of the large intestine) from the posterior abdominal wall, carrying blood vessels, nerves, and lymphatics to and from the intestines.
Organs like the stomach, liver, and most of the small intestine are considered **intraperitoneal** (nearly fully covered by peritoneum), while organs like the pancreas and most of the duodenum are **retroperitoneal**, lying behind the peritoneum against the posterior body wall.

## Liver–Gallbladder–Pancreas–Duodenum Connection
These four structures are linked by a shared ductal system that delivers digestive secretions into the duodenum:
- Bile made in the liver travels through the **hepatic ducts**, which join to form the **common hepatic duct**.
- This joins the **cystic duct** from the gallbladder to form the **common bile duct**.
- The common bile duct joins the **main pancreatic duct** (carrying pancreatic enzymes) just before both empty together into the duodenum at the **hepatopancreatic ampulla**, controlled by a muscular ring called the **sphincter of Oddi**.
This shared drainage point explains why a blockage in this area (e.g., a gallstone) can affect bile flow, pancreatic secretion, or both.

## The Enteric Nervous System
The GI tract wall contains its own extensive network of neurons, sometimes called the "second brain" or **enteric nervous system**, embedded within the submucosal and myenteric plexuses described earlier. This network can control basic digestive movements and secretions locally, though it is also regulated by input from the autonomic nervous system (parasympathetic input generally increases digestive activity; sympathetic input generally decreases it).`,
    contentAr: `## الصفاق
**الصفاق** غشاء مصلي كبير يبطّن التجويف البطني ويغطي معظم أعضاء البطن:
- **الصفاق الجداري**: يبطّن جدار البطن.
- **الصفاق الحشوي**: يغطي الأعضاء نفسها.
- **المساريقا**: طية مزدوجة من الصفاق تعلّق الأمعاء الدقيقة (وأجزاء من الأمعاء الغليظة) من جدار البطن الخلفي، وتحمل الأوعية الدموية والأعصاب واللمفاويات إلى الأمعاء ومنها.
تُعدّ أعضاء مثل المعدة والكبد ومعظم الأمعاء الدقيقة **داخل الصفاق** (مغطاة بالصفاق بشكل شبه كامل)، بينما تُعدّ أعضاء مثل البنكرياس ومعظم الاثني عشر **خلف الصفاق**، وتقع خلفه ملاصقة لجدار الجسم الخلفي.

## الارتباط بين الكبد والمرارة والبنكرياس والاثني عشر
ترتبط هذه البنى الأربع بنظام قنوات مشترك ينقل الإفرازات الهضمية إلى الاثني عشر:
- تنتقل الصفراء المُنتَجة في الكبد عبر **القنوات الكبدية**، التي تتحد لتشكّل **القناة الكبدية المشتركة**.
- تتحد هذه القناة مع **القناة المرارية** القادمة من المرارة لتشكّل **القناة الصفراوية المشتركة**.
- تتصل القناة الصفراوية المشتركة بـ**القناة البنكرياسية الرئيسية** (الحاملة لإنزيمات البنكرياس) قبل أن تصبّا معًا في الاثني عشر عند **الحُليمة الكبدية البنكرياسية**، التي تتحكم بها حلقة عضلية تسمى **العضلة العاصرة لأودي**.
ويفسّر هذا الموضع المشترك للتصريف سبب تأثير أي انسداد في هذه المنطقة (كحصاة مرارية) على تدفق الصفراء أو إفراز البنكرياس أو كليهما.

## الجهاز العصبي المعوي
يحتوي جدار القناة الهضمية على شبكة واسعة خاصة به من الخلايا العصبية، تُعرف أحيانًا بـ"الدماغ الثاني" أو **الجهاز العصبي المعوي**، مدمجة ضمن الضفيرتين تحت المخاطية والعضلية المعوية المذكورتين سابقًا. ويمكن لهذه الشبكة التحكم بحركات الهضم الأساسية وإفرازاته محليًا، رغم أنها تخضع أيضًا لتنظيم من الجهاز العصبي الذاتي (يزيد الجهاز نظير الودي عمومًا من النشاط الهضمي، بينما يقلله الجهاز الودي عمومًا).`,
    terms: [
      { en: "Peritoneum", ar: "الصفاق" },
      { en: "Mesentery", ar: "المساريقا" },
      { en: "Sphincter of Oddi", ar: "العضلة العاصرة لأودي" },
      { en: "Enteric nervous system", ar: "الجهاز العصبي المعوي" },
      { en: "Intraperitoneal", ar: "داخل الصفاق" },
    ],
    summaryEn:
      "The peritoneum lines the abdominal cavity and organs, with the mesentery suspending the intestines. Bile and pancreatic secretions share a common drainage route into the duodenum via the sphincter of Oddi. The GI tract has its own enteric nervous system, modulated by the autonomic nervous system.",
    summaryAr:
      "يبطّن الصفاق التجويف البطني وأعضاءه، وتعلّق المساريقا الأمعاء. تشترك إفرازات الصفراء والبنكرياس في مسار تصريف مشترك إلى الاثني عشر عبر العضلة العاصرة لأودي. تمتلك القناة الهضمية جهازها العصبي المعوي الخاص، الذي ينظّمه الجهاز العصبي الذاتي.",
  },
  {
    slug: "digestive-clinical-anatomy-basics",
    order: 5,
    titleEn: "Clinical Anatomy Basics",
    titleAr: "أساسيات التشريح السريري",
    objectivesEn: [
      "Describe the four abdominal quadrants used for clinical assessment.",
      "Identify McBurney's point and its clinical relevance.",
      "Describe basic anatomical considerations for bowel sound assessment and nasogastric tube placement.",
    ],
    objectivesAr: [
      "وصف أرباع البطن الأربعة المستخدمة في التقييم السريري.",
      "تحديد نقطة ماكبيرني وأهميتها السريرية.",
      "وصف الاعتبارات التشريحية الأساسية لتقييم أصوات الأمعاء وتركيب الأنبوب الأنفي المعدي.",
    ],
    contentEn: `## Abdominal Quadrants
For clinical assessment, the abdomen is commonly divided by two imaginary lines crossing at the umbilicus into four **quadrants**:
- **Right upper quadrant (RUQ)**: liver, gallbladder, part of the pancreas.
- **Left upper quadrant (LUQ)**: stomach, spleen, part of the pancreas.
- **Right lower quadrant (RLQ)**: cecum, appendix.
- **Left lower quadrant (LLQ)**: most of the sigmoid colon.
This simple map helps a nurse localize pain and correlate it with the organs most likely involved.

## McBurney's Point
**McBurney's point** is a landmark located about one-third of the way along a line from the anterior superior iliac spine to the umbilicus, in the right lower quadrant. It approximates the base of the appendix, and tenderness at this point is a classic clinical sign associated with **appendicitis**.

## Bowel Sound Assessment
Bowel sounds, produced by peristalsis, are assessed by auscultating all four quadrants, typically for at least 30–60 seconds per quadrant if sounds are not immediately heard, since peristaltic waves are intermittent. Auscultation is performed before palpation or percussion, since manipulating the abdomen can temporarily alter bowel motility and sound.

## Nasogastric (NG) Tube Placement
Anatomical knowledge of the alimentary canal is directly relevant when inserting a nasogastric tube: the tube is measured (commonly from the nose, to the earlobe, to the xiphoid process) to estimate the distance from the nostril to the stomach, following the natural path through the nasal cavity, pharynx, and esophagus, before the tip should rest safely within the stomach.

> This content is educational and does not replace clinical training, institutional protocols, or a qualified healthcare provider's judgment.`,
    contentAr: `## أرباع البطن
لأغراض التقييم السريري، يُقسَّم البطن عادةً بخطين وهميين يتقاطعان عند السرة إلى أربعة **أرباع**:
- **الربع العلوي الأيمن**: الكبد والمرارة وجزء من البنكرياس.
- **الربع العلوي الأيسر**: المعدة والطحال وجزء من البنكرياس.
- **الربع السفلي الأيمن**: الأعور والزائدة الدودية.
- **الربع السفلي الأيسر**: معظم القولون السيني.
تساعد هذه الخريطة البسيطة الممرض على تحديد موقع الألم وربطه بالأعضاء الأكثر احتمالًا لتأثرها.

## نقطة ماكبيرني
**نقطة ماكبيرني** معلم يقع على مسافة ثلث الطريق تقريبًا على خط يمتد من الشوكة الحرقفية الأمامية العلوية إلى السرة، في الربع السفلي الأيمن. وتقارب قاعدة الزائدة الدودية، ويُعدّ الألم عند الضغط على هذه النقطة علامة سريرية كلاسيكية مرتبطة بـ**التهاب الزائدة الدودية**.

## تقييم أصوات الأمعاء
تُقيَّم أصوات الأمعاء، الناتجة عن التمعج، بالإصغاء في جميع الأرباع الأربعة، وعادةً لمدة 30–60 ثانية على الأقل لكل ربع إذا لم تُسمع الأصوات فورًا، نظرًا لأن موجات التمعج متقطعة. ويُجرى الإصغاء قبل الجسّ أو النقر، لأن التعامل مع البطن قد يغيّر مؤقتًا حركية الأمعاء وأصواتها.

## تركيب الأنبوب الأنفي المعدي
تُعدّ المعرفة التشريحية بالقناة الهضمية ذات صلة مباشرة عند إدخال أنبوب أنفي معدي: يُقاس الأنبوب (عادةً من الأنف إلى شحمة الأذن إلى الناتئ الرهابي) لتقدير المسافة من فتحة الأنف إلى المعدة، متتبعًا المسار الطبيعي عبر التجويف الأنفي والبلعوم والمريء، قبل أن تستقر نهايته بأمان داخل المعدة.

> هذا المحتوى تعليمي ولا يغني عن التدريب السريري أو البروتوكولات المؤسسية أو تقدير مقدم الرعاية الصحية المؤهل.`,
    terms: [
      { en: "Abdominal quadrant", ar: "ربع البطن" },
      { en: "McBurney's point", ar: "نقطة ماكبيرني" },
      { en: "Appendicitis", ar: "التهاب الزائدة الدودية" },
      { en: "Bowel sounds", ar: "أصوات الأمعاء" },
      { en: "Nasogastric tube", ar: "الأنبوب الأنفي المعدي" },
    ],
    summaryEn:
      "The abdomen is divided into four quadrants (RUQ, LUQ, RLQ, LLQ) to localize findings. McBurney's point is a key landmark for appendicitis. Bowel sounds are auscultated in all four quadrants, and NG tube length is estimated using external landmarks (nose–earlobe–xiphoid).",
    summaryAr:
      "يُقسَّم البطن إلى أربعة أرباع (علوي أيمن وأيسر، وسفلي أيمن وأيسر) لتحديد مواقع النتائج. تُعدّ نقطة ماكبيرني معلمًا رئيسيًا لالتهاب الزائدة الدودية. تُقيَّم أصوات الأمعاء في الأرباع الأربعة جميعها، وتُقدَّر مسافة الأنبوب الأنفي المعدي باستخدام معالم خارجية (الأنف–شحمة الأذن–الناتئ الرهابي).",
  },
].map((lesson) => ({ ...lesson, references: lesson.references ?? REFERENCES }));

const questions = [
  {
    lessonSlug: "digestive-introduction",
    type: "MCQ",
    textEn: "Which of these is an accessory digestive organ, not part of the GI tract itself?",
    textAr: "أي مما يلي عضو هضمي ملحق، وليس جزءًا من القناة الهضمية نفسها؟",
    choices: [
      { id: "a", en: "Stomach", ar: "المعدة" },
      { id: "b", en: "Small intestine", ar: "الأمعاء الدقيقة" },
      { id: "c", en: "Liver", ar: "الكبد" },
      { id: "d", en: "Esophagus", ar: "المريء" },
    ],
    correct: "c",
    explanationEn:
      "The liver is an accessory digestive organ — food does not pass through it directly, but it contributes bile essential for digestion.",
    explanationAr:
      "الكبد عضو هضمي ملحق — لا يمر الطعام عبره مباشرة، لكنه يساهم بالصفراء الضرورية للهضم.",
  },
  {
    lessonSlug: "digestive-introduction",
    type: "MCQ",
    textEn: "What is the term for the coordinated muscle contractions that move food along the GI tract?",
    textAr: "ما مصطلح انقباضات العضلات المنسقة التي تحرّك الطعام عبر القناة الهضمية؟",
    choices: [
      { id: "a", en: "Peristalsis", ar: "التمعج" },
      { id: "b", en: "Defecation", ar: "التغوّط" },
      { id: "c", en: "Absorption", ar: "الامتصاص" },
      { id: "d", en: "Mastication", ar: "المضغ" },
    ],
    correct: "a",
    explanationEn:
      "Peristalsis refers to the coordinated, wave-like muscle contractions that propel food through the GI tract.",
    explanationAr:
      "يشير التمعج إلى انقباضات العضلات المنسقة الشبيهة بالموجة، التي تدفع الطعام عبر القناة الهضمية.",
  },
  {
    lessonSlug: "digestive-anatomical-structures",
    type: "MCQ",
    textEn: "Which layer of the GI tract wall is responsible for peristaltic movement?",
    textAr: "أي طبقة من جدار القناة الهضمية مسؤولة عن الحركة التمعجية؟",
    choices: [
      { id: "a", en: "Mucosa", ar: "المخاطية" },
      { id: "b", en: "Submucosa", ar: "تحت المخاطية" },
      { id: "c", en: "Muscularis externa", ar: "الطبقة العضلية الخارجية" },
      { id: "d", en: "Serosa", ar: "المصلية" },
    ],
    correct: "c",
    explanationEn:
      "The muscularis externa, with its circular and longitudinal smooth muscle layers, is responsible for peristalsis.",
    explanationAr:
      "الطبقة العضلية الخارجية، بطبقتيها الدائرية والطولية من العضلات الملساء، هي المسؤولة عن التمعج.",
  },
  {
    lessonSlug: "digestive-anatomical-structures",
    type: "MCQ",
    textEn: "Which region of the stomach controls release of chyme into the duodenum?",
    textAr: "أي منطقة من المعدة تتحكم بإطلاق الكيموس إلى الاثني عشر؟",
    choices: [
      { id: "a", en: "Cardia", ar: "القلبية" },
      { id: "b", en: "Fundus", ar: "القاع" },
      { id: "c", en: "Body", ar: "الجسم" },
      { id: "d", en: "Pylorus", ar: "البواب" },
    ],
    correct: "d",
    explanationEn:
      "The pylorus ends at the pyloric sphincter, which controls the release of partially digested food (chyme) into the duodenum.",
    explanationAr:
      "ينتهي البواب عند العضلة العاصرة البوابية، التي تتحكم بإطلاق الطعام المهضوم جزئيًا (الكيموس) إلى الاثني عشر.",
  },
  {
    lessonSlug: "digestive-anatomical-structures",
    type: "TRUE_FALSE",
    textEn: "The jejunum is where the majority of nutrient absorption occurs in the small intestine.",
    textAr: "يحدث معظم امتصاص العناصر الغذائية في الأمعاء الدقيقة في الصائم.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "The jejunum, the middle segment of the small intestine, is where most nutrient absorption takes place.",
    explanationAr:
      "الصائم، وهو الجزء الأوسط من الأمعاء الدقيقة، هو الموضع الذي يحدث فيه معظم امتصاص العناصر الغذائية.",
  },
  {
    lessonSlug: "digestive-organs-locations",
    type: "MCQ",
    textEn: "In which abdominal region is the liver primarily located?",
    textAr: "في أي منطقة من البطن يقع الكبد أساسًا؟",
    choices: [
      { id: "a", en: "Left upper quadrant", ar: "الربع العلوي الأيسر" },
      { id: "b", en: "Right upper quadrant", ar: "الربع العلوي الأيمن" },
      { id: "c", en: "Right lower quadrant", ar: "الربع السفلي الأيمن" },
      { id: "d", en: "Left lower quadrant", ar: "الربع السفلي الأيسر" },
    ],
    correct: "b",
    explanationEn:
      "The liver, the largest internal organ, sits primarily in the right upper quadrant, just below the diaphragm.",
    explanationAr:
      "يقع الكبد، وهو أكبر عضو داخلي، أساسًا في الربع العلوي الأيمن، أسفل الحجاب الحاجز مباشرة.",
  },
  {
    lessonSlug: "digestive-organs-locations",
    type: "MCQ",
    textEn: "Where is the pancreas located relative to the stomach?",
    textAr: "أين يقع البنكرياس بالنسبة إلى المعدة؟",
    choices: [
      { id: "a", en: "In front of the stomach", ar: "أمام المعدة" },
      { id: "b", en: "Behind the stomach", ar: "خلف المعدة" },
      { id: "c", en: "Inside the stomach wall", ar: "داخل جدار المعدة" },
      { id: "d", en: "Above the stomach", ar: "أعلى المعدة" },
    ],
    correct: "b",
    explanationEn:
      "The pancreas is a retroperitoneal organ lying transversely behind the stomach, with its head nestled in the curve of the duodenum.",
    explanationAr:
      "البنكرياس عضو خلف الصفاق يقع بشكل عرضي خلف المعدة، ويتموضع رأسه داخل انحناء الاثني عشر.",
  },
  {
    lessonSlug: "digestive-organs-locations",
    type: "MCQ",
    textEn: "Where does the large intestine begin?",
    textAr: "أين تبدأ الأمعاء الغليظة؟",
    choices: [
      { id: "a", en: "Cecum, in the right lower abdomen", ar: "الأعور، في أسفل يمين البطن" },
      { id: "b", en: "Sigmoid colon", ar: "القولون السيني" },
      { id: "c", en: "Rectum", ar: "المستقيم" },
      { id: "d", en: "Transverse colon", ar: "القولون المستعرض" },
    ],
    correct: "a",
    explanationEn:
      "The large intestine begins at the cecum in the right lower abdomen, where the appendix is attached, before ascending, crossing, and descending around the abdominal perimeter.",
    explanationAr:
      "تبدأ الأمعاء الغليظة عند الأعور في أسفل يمين البطن، حيث تتصل الزائدة الدودية، قبل أن تصعد وتعبر وتنزل حول محيط البطن.",
  },
  {
    lessonSlug: "digestive-anatomical-relationships",
    type: "MCQ",
    textEn: "Which structure suspends the small intestine from the posterior abdominal wall?",
    textAr: "أي بنية تعلّق الأمعاء الدقيقة من جدار البطن الخلفي؟",
    choices: [
      { id: "a", en: "Mesentery", ar: "المساريقا" },
      { id: "b", en: "Omentum", ar: "الثرب" },
      { id: "c", en: "Sphincter of Oddi", ar: "العضلة العاصرة لأودي" },
      { id: "d", en: "Serosa", ar: "المصلية" },
    ],
    correct: "a",
    explanationEn:
      "The mesentery, a double fold of peritoneum, suspends the small intestine from the posterior abdominal wall and carries its blood supply.",
    explanationAr:
      "المساريقا، وهي طية مزدوجة من الصفاق، تعلّق الأمعاء الدقيقة من جدار البطن الخلفي وتحمل تروية دمها.",
  },
  {
    lessonSlug: "digestive-anatomical-relationships",
    type: "CASE_BASED",
    textEn: "A gallstone blocks the common bile duct near the hepatopancreatic ampulla. Which other secretion could this most directly affect?",
    textAr: "تسدّ حصاة مرارية القناة الصفراوية المشتركة قرب الحليمة الكبدية البنكرياسية. أي إفراز آخر قد يتأثر بشكل مباشر؟",
    choices: [
      { id: "a", en: "Saliva", ar: "اللعاب" },
      { id: "b", en: "Gastric acid", ar: "الحمض المعدي" },
      { id: "c", en: "Pancreatic secretions", ar: "إفرازات البنكرياس" },
      { id: "d", en: "Mucus in the large intestine", ar: "المخاط في الأمعاء الغليظة" },
    ],
    correct: "c",
    explanationEn:
      "The common bile duct and main pancreatic duct join and empty together at the hepatopancreatic ampulla, so a blockage there can affect both bile flow and pancreatic secretion.",
    explanationAr:
      "تتصل القناة الصفراوية المشتركة والقناة البنكرياسية الرئيسية وتصبّان معًا عند الحليمة الكبدية البنكرياسية، لذا يمكن لانسداد في هذا الموضع أن يؤثر على تدفق الصفراء وإفراز البنكرياس معًا.",
  },
  {
    lessonSlug: "digestive-anatomical-relationships",
    type: "TRUE_FALSE",
    textEn: "The pancreas and most of the duodenum are considered retroperitoneal organs.",
    textAr: "يُعدّ البنكرياس ومعظم الاثني عشر من الأعضاء الواقعة خلف الصفاق.",
    choices: [
      { id: "true", en: "True", ar: "صحيح" },
      { id: "false", en: "False", ar: "خطأ" },
    ],
    correct: "true",
    explanationEn:
      "Unlike the stomach and most of the small intestine, the pancreas and most of the duodenum lie behind the peritoneum, against the posterior body wall.",
    explanationAr:
      "خلافًا للمعدة ومعظم الأمعاء الدقيقة، يقع البنكرياس ومعظم الاثني عشر خلف الصفاق، ملاصقين لجدار الجسم الخلفي.",
  },
  {
    lessonSlug: "digestive-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Tenderness at McBurney's point is classically associated with which condition?",
    textAr: "يرتبط الألم عند نقطة ماكبيرني بشكل كلاسيكي بأي حالة؟",
    choices: [
      { id: "a", en: "Gallstones", ar: "الحصى المرارية" },
      { id: "b", en: "Appendicitis", ar: "التهاب الزائدة الدودية" },
      { id: "c", en: "Peptic ulcer", ar: "القرحة الهضمية" },
      { id: "d", en: "Pancreatitis", ar: "التهاب البنكرياس" },
    ],
    correct: "b",
    explanationEn:
      "McBurney's point approximates the base of the appendix, and tenderness there is a classic sign of appendicitis.",
    explanationAr:
      "تقارب نقطة ماكبيرني قاعدة الزائدة الدودية، ويُعدّ الألم عندها علامة كلاسيكية لالتهاب الزائدة الدودية.",
  },
  {
    lessonSlug: "digestive-clinical-anatomy-basics",
    type: "MCQ",
    textEn: "Which abdominal quadrant most likely corresponds to pain from the sigmoid colon?",
    textAr: "أي ربع من البطن يقابل على الأرجح الألم الناتج عن القولون السيني؟",
    choices: [
      { id: "a", en: "Right upper quadrant", ar: "الربع العلوي الأيمن" },
      { id: "b", en: "Left upper quadrant", ar: "الربع العلوي الأيسر" },
      { id: "c", en: "Right lower quadrant", ar: "الربع السفلي الأيمن" },
      { id: "d", en: "Left lower quadrant", ar: "الربع السفلي الأيسر" },
    ],
    correct: "d",
    explanationEn:
      "The sigmoid colon is located primarily in the left lower quadrant of the abdomen.",
    explanationAr:
      "يقع القولون السيني أساسًا في الربع السفلي الأيسر من البطن.",
  },
];

module.exports = { lessons, questions, REFERENCES };
