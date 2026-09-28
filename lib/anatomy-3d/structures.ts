// Phase 3A — a small, hand-written set of representative structures per
// body system, enough to demonstrate the information panel (Step 6).
// Not an exhaustive anatomy database — that's future content work, not
// part of this foundation phase. Content is educational/general only,
// with no diagnosis or patient-specific advice.

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
];

export function getStructuresBySystem(system: BodySystem): AnatomicalStructure[] {
  return ANATOMICAL_STRUCTURES.filter((s) => s.system === system);
}
