// Phase 3A — a small, hand-written set of representative structures per
// body system, enough to demonstrate the information panel (Step 6).
// Not an exhaustive anatomy database — that's future content work, not
// part of this foundation phase. Content is educational/general only,
// with no diagnosis or patient-specific advice.
//
// Phase 3B-1.7 — structures with a `modelNodeName` are selectable by
// clicking the real 3D model (public/models/anatomy/human-body.glb); the
// node names come from the curated GLB's own conversion report
// (human-body-curated-report.json). Structures without a `modelNodeName`
// have no matching geometry in that model yet and remain info-only —
// never given a fake/approximate mapping.
//
// Phase 3B-1.9/3B-2 — `studyHref` links a structure to a real, seeded
// Anatomy lesson that is genuinely about it (see prisma/seed.js /
// prisma/content/*). Each link below points to the specific lesson whose
// content actually names and describes that structure — never a generic
// or approximate match.

import type { AnatomicalStructure, BodySystem } from "./types";

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  {
    id: "skull",
    nameEn: "Skull",
    nameAr: "الجمجمة",
    system: "SKELETAL",
    descriptionEn: "The bony structure that encloses and protects the brain and supports the face.",
    descriptionAr: "البنية العظمية التي تحيط بالدماغ وتحميه، وتدعم بنية الوجه.",
    nursingRelevanceEn:
      "Understanding skull anatomy supports neurological assessment and recognizing signs of head injury.",
    nursingRelevanceAr:
      "فهم تركيب الجمجمة يدعم التقييم العصبي والتعرّف على علامات إصابات الرأس.",
  },
  {
    id: "femur",
    nameEn: "Femur",
    nameAr: "عظم الفخذ",
    system: "SKELETAL",
    descriptionEn: "The longest and strongest bone in the human body, connecting the hip to the knee.",
    descriptionAr: "أطول وأقوى عظم في جسم الإنسان، يصل الحوض بالركبة.",
    nursingRelevanceEn:
      "Basic understanding of the femur supports mobility assessment and post-fracture care planning.",
    nursingRelevanceAr:
      "فهم أساسي لعظم الفخذ يدعم تقييم القدرة على الحركة والتخطيط للرعاية بعد الكسور.",
  },
  {
    id: "diaphragm",
    nameEn: "Diaphragm",
    nameAr: "الحجاب الحاجز",
    system: "MUSCULAR",
    descriptionEn: "The dome-shaped muscle beneath the lungs that drives normal breathing.",
    descriptionAr: "عضلة مقببة الشكل أسفل الرئتين، وهي المحرك الأساسي لعملية التنفس الطبيعي.",
    nursingRelevanceEn:
      "Basic understanding of the diaphragm supports later learning about breathing patterns and respiratory assessment.",
    nursingRelevanceAr:
      "الفهم الأساسي للحجاب الحاجز يدعم التعلّم اللاحق حول أنماط التنفس والتقييم التنفسي.",
  },
  {
    id: "brain",
    nameEn: "Brain",
    nameAr: "الدماغ",
    system: "NERVOUS",
    descriptionEn: "The body's central control organ, responsible for thought, sensation, and coordination.",
    descriptionAr: "العضو المتحكم المركزي في الجسم، المسؤول عن التفكير والإحساس والتنسيق الحركي.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the brain supports later learning about neurological assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للدماغ يدعم التعلّم اللاحق حول التقييم العصبي.",
    modelNodeName: "brain",
    studyHref: "/anatomy/anatomy-nervous-system/nervous-organs-locations",
  },
  {
    id: "spinal-cord",
    nameEn: "Spinal Cord",
    nameAr: "الحبل الشوكي",
    system: "NERVOUS",
    descriptionEn: "The long bundle of nerve tissue that carries signals between the brain and the body.",
    descriptionAr: "حزمة طويلة من النسيج العصبي تنقل الإشارات بين الدماغ وبقية الجسم.",
    nursingRelevanceEn:
      "Understanding the spinal cord supports later learning about mobility, sensation, and spinal precautions.",
    nursingRelevanceAr:
      "فهم الحبل الشوكي يدعم التعلّم اللاحق حول الحركة والإحساس واحتياطات العمود الفقري.",
  },
  {
    id: "heart",
    nameEn: "Heart",
    nameAr: "القلب",
    system: "CARDIOVASCULAR",
    descriptionEn: "The muscular organ that pumps blood throughout the body via the circulatory system.",
    descriptionAr: "العضو العضلي الذي يضخ الدم إلى جميع أنحاء الجسم عبر الجهاز الدوري.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the heart supports later learning about circulation and cardiovascular assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للقلب يدعم التعلّم اللاحق حول الدورة الدموية والتقييم القلبي الوعائي.",
    modelNodeName: "heart",
    studyHref: "/anatomy/anatomy-cardiovascular-system/cardiovascular-organs-locations",
  },
  {
    id: "aorta",
    nameEn: "Aorta",
    nameAr: "الأبهر",
    system: "CARDIOVASCULAR",
    descriptionEn: "The body's largest artery, carrying oxygen-rich blood from the heart's left ventricle to the rest of the body.",
    descriptionAr: "أكبر شريان في الجسم، ينقل الدم الغني بالأكسجين من البطين الأيسر للقلب إلى بقية أنحاء الجسم.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the aorta supports later learning about blood pressure and circulatory assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للأبهر يدعم التعلّم اللاحق حول ضغط الدم وتقييم الدورة الدموية.",
    modelNodeName: "aorta",
    studyHref: "/anatomy/anatomy-cardiovascular-system/cardiovascular-organs-locations",
  },
  {
    id: "lungs",
    nameEn: "Lungs",
    nameAr: "الرئتان",
    system: "RESPIRATORY",
    descriptionEn: "The paired organs where oxygen and carbon dioxide are exchanged with the blood.",
    descriptionAr: "عضوان مزدوجان يتم فيهما تبادل الأكسجين وثاني أكسيد الكربون مع الدم.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the lungs supports later learning about respiratory assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للرئتين يدعم التعلّم اللاحق حول التقييم التنفسي.",
    modelNodeName: "lungs",
    studyHref: "/anatomy/anatomy-respiratory-system/respiratory-organs-locations",
  },
  {
    id: "trachea",
    nameEn: "Trachea",
    nameAr: "القصبة الهوائية",
    system: "RESPIRATORY",
    descriptionEn: "The main airway connecting the throat to the bronchi, kept open by rings of cartilage.",
    descriptionAr: "المجرى الهوائي الرئيسي الذي يصل الحلق بالقصبات الهوائية، وتحافظ حلقات غضروفية على بقائه مفتوحًا.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the trachea supports later learning about airway management and respiratory assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للقصبة الهوائية يدعم التعلّم اللاحق حول إدارة مجرى الهواء والتقييم التنفسي.",
    modelNodeName: "trachea",
    studyHref: "/anatomy/anatomy-respiratory-system/respiratory-anatomical-structures",
  },
  {
    id: "stomach",
    nameEn: "Stomach",
    nameAr: "المعدة",
    system: "DIGESTIVE",
    descriptionEn: "A muscular organ that breaks down food using acid and enzymes before digestion continues in the intestines.",
    descriptionAr: "عضو عضلي يفكّك الطعام باستخدام الحمض والإنزيمات قبل أن تستمر عملية الهضم في الأمعاء.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the stomach supports later learning about digestive assessment and nutrition.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للمعدة يدعم التعلّم اللاحق حول التقييم الهضمي والتغذية.",
    modelNodeName: "stomach",
    studyHref: "/anatomy/anatomy-digestive-system/digestive-organs-locations",
  },
  {
    id: "liver",
    nameEn: "Liver",
    nameAr: "الكبد",
    system: "DIGESTIVE",
    descriptionEn: "The body's largest internal organ; it processes nutrients, produces bile, and filters substances from the blood.",
    descriptionAr: "أكبر عضو داخلي في الجسم؛ يعالج العناصر الغذائية وينتج الصفراء ويرشّح المواد من الدم.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the liver supports later learning about digestive assessment, medication metabolism, and nutrition.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للكبد يدعم التعلّم اللاحق حول التقييم الهضمي وأيض الأدوية والتغذية.",
    modelNodeName: "liver",
    studyHref: "/anatomy/anatomy-digestive-system/digestive-organs-locations",
  },
  {
    id: "small_intestine",
    nameEn: "Small Intestine",
    nameAr: "الأمعاء الدقيقة",
    system: "DIGESTIVE",
    descriptionEn: "A long, coiled tube (duodenum, jejunum, and ileum) where most digestion and nutrient absorption take place.",
    descriptionAr: "أنبوب طويل وملتفّ (يتكوّن من الاثني عشر والصائم واللفائفي) يتم فيه معظم الهضم وامتصاص العناصر الغذائية.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the small intestine supports later learning about digestive assessment and nutrition.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للأمعاء الدقيقة يدعم التعلّم اللاحق حول التقييم الهضمي والتغذية.",
    modelNodeName: "small_intestine",
    studyHref: "/anatomy/anatomy-digestive-system/digestive-anatomical-structures",
  },
  {
    id: "kidneys",
    nameEn: "Kidneys",
    nameAr: "الكليتان",
    system: "URINARY",
    descriptionEn: "The paired organs that filter blood to remove waste and regulate fluid balance.",
    descriptionAr: "عضوان مزدوجان يقومان بترشيح الدم للتخلص من الفضلات وتنظيم توازن السوائل.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the kidneys supports later learning about fluid balance and urinary assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للكليتين يدعم التعلّم اللاحق حول توازن السوائل والتقييم البولي.",
    modelNodeName: "kidneys",
    studyHref: "/anatomy/anatomy-urinary-system/urinary-organs-locations",
  },
  {
    id: "urinary_bladder",
    nameEn: "Urinary Bladder",
    nameAr: "المثانة البولية",
    system: "URINARY",
    descriptionEn: "A muscular, expandable organ in the pelvis that stores urine before it leaves the body.",
    descriptionAr: "عضو عضلي قابل للتمدد في الحوض يخزّن البول قبل خروجه من الجسم.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the urinary bladder supports later learning about fluid balance and urinary assessment.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للمثانة البولية يدعم التعلّم اللاحق حول توازن السوائل والتقييم البولي.",
    modelNodeName: "urinary_bladder",
    studyHref: "/anatomy/anatomy-urinary-system/urinary-organs-locations",
  },
  {
    id: "uterus",
    nameEn: "Uterus",
    nameAr: "الرحم",
    system: "REPRODUCTIVE",
    descriptionEn: "A muscular organ of the female reproductive system where a fetus develops during pregnancy.",
    descriptionAr: "عضو عضلي في الجهاز التناسلي للمرأة، ينمو فيه الجنين خلال فترة الحمل.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the uterus supports later learning about maternal and reproductive health.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للرحم يدعم التعلّم اللاحق حول صحة الأم والصحة التناسلية.",
  },
  {
    id: "spine",
    nameEn: "Spine",
    nameAr: "العمود الفقري",
    system: "SKELETAL",
    descriptionEn: "The column of vertebrae running from the base of the skull to the pelvis, supporting the body and protecting the spinal cord.",
    descriptionAr: "سلسلة من الفقرات تمتد من قاعدة الجمجمة إلى الحوض، تدعم الجسم وتحمي الحبل الشوكي.",
    nursingRelevanceEn:
      "Basic anatomical understanding of the spine supports later learning about posture, mobility assessment, and spinal precautions.",
    nursingRelevanceAr:
      "الفهم التشريحي الأساسي للعمود الفقري يدعم التعلّم اللاحق حول القوام وتقييم الحركة واحتياطات العمود الفقري.",
    modelNodeName: "spine",
    studyHref: "/anatomy/anatomy-skeletal-system/skeletal-organs-locations",
  },
];

export function getStructuresBySystem(system: BodySystem): AnatomicalStructure[] {
  return ANATOMICAL_STRUCTURES.filter((s) => s.system === system);
}

export function getStructureById(id: string): AnatomicalStructure | undefined {
  return ANATOMICAL_STRUCTURES.find((s) => s.id === id);
}

/** Structures actually selectable in the 3D model (have a `modelNodeName`).
 * Phase 3B-3 — the single source of truth for both click-to-select
 * (anatomy-viewer.tsx) and the Test Yourself question pool
 * (anatomy-explorer.tsx), so the two never drift apart. */
export function getSelectable3DStructures(): AnatomicalStructure[] {
  return ANATOMICAL_STRUCTURES.filter((s) => !!s.modelNodeName);
}
