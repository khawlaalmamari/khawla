// Full academic outline for both courses, as specified in the platform brief.
// Only the Skeletal System module (anatomy, module 3) has real lesson/quiz
// content seeded for this first build phase; the rest are placeholders so
// the course structure is genuine and extensible, not just decorative.

const anatomyModules = [
  ["Introduction to Human Anatomy", "مقدمة في تشريح جسم الإنسان"],
  ["Cells and Tissues", "الخلايا والأنسجة"],
  ["Skeletal System", "الجهاز الهيكلي"],
  ["Muscular System", "الجهاز العضلي"],
  ["Nervous System", "الجهاز العصبي"],
  ["Cardiovascular System", "الجهاز القلبي الوعائي"],
  ["Respiratory System", "الجهاز التنفسي"],
  ["Digestive System", "الجهاز الهضمي"],
  ["Urinary System", "الجهاز البولي"],
  ["Endocrine System", "الجهاز الصماوي"],
  ["Lymphatic and Immune System", "الجهاز اللمفاوي والمناعي"],
  ["Reproductive System", "الجهاز التناسلي"],
  ["Integumentary System", "الجهاز الغلافي (الجلد)"],
];

const physiologyModules = [
  ["Introduction to Human Physiology", "مقدمة في علم وظائف الأعضاء"],
  ["Cell Physiology", "فسيولوجيا الخلية"],
  ["Blood Physiology", "فسيولوجيا الدم"],
  ["Nervous System Physiology", "فسيولوجيا الجهاز العصبي"],
  ["Muscular Physiology", "فسيولوجيا الجهاز العضلي"],
  ["Cardiovascular Physiology", "فسيولوجيا الجهاز القلبي الوعائي"],
  ["Respiratory Physiology", "فسيولوجيا الجهاز التنفسي"],
  ["Digestive Physiology", "فسيولوجيا الجهاز الهضمي"],
  ["Renal Physiology", "فسيولوجيا الكلى"],
  ["Endocrine Physiology", "فسيولوجيا الغدد الصماء"],
  ["Immune and Lymphatic Physiology", "فسيولوجيا الجهاز المناعي واللمفاوي"],
  ["Reproductive Physiology", "فسيولوجيا الجهاز التناسلي"],
  ["Integrated Human Physiology", "فسيولوجيا الإنسان المتكاملة"],
];

function slugify(en) {
  return en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

module.exports = { anatomyModules, physiologyModules, slugify };
