const { PrismaClient } = require("@prisma/client");
const { anatomyModules, physiologyModules, slugify } = require("./content/course-outline");
const skeletalSystem = require("./content/skeletal-system");
const introAnatomy = require("./content/intro-anatomy");
const cardiovascularSystem = require("./content/cardiovascular-system");
const respiratorySystem = require("./content/respiratory-system");
const digestiveSystem = require("./content/digestive-system");
const urinarySystem = require("./content/urinary-system");
const nervousSystem = require("./content/nervous-system");
const { clinicalCases } = require("./content/clinical-cases");

const prisma = new PrismaClient();

// Modules with full lesson + quiz content. Add an entry here whenever a new
// module's content file is written; everything else in the course outline
// stays a real, extensible "coming soon" placeholder until it gets one too.
const FULL_CONTENT_MODULES = [
  {
    slug: "anatomy-introduction-to-human-anatomy",
    descriptionEn:
      "Learn the foundations of anatomical study: terminology, body planes, cavities and regions, homeostasis, and how precise anatomical language supports safe nursing practice.",
    descriptionAr:
      "تعرّف على أساسيات دراسة التشريح: المصطلحات، والمستويات الجسدية، والتجاويف والمناطق، والاتزان الداخلي، وكيف تدعم اللغة التشريحية الدقيقة الممارسة التمريضية الآمنة.",
    passThreshold: 70,
    ...introAnatomy,
  },
  {
    slug: "anatomy-skeletal-system",
    descriptionEn:
      "Learn the structure of bones, how the skeleton is organized into axial and appendicular regions, how joints work, and the clinical basics every nursing student needs.",
    descriptionAr:
      "تعرّف على تركيب العظام، وكيفية تنظيم الهيكل إلى المنطقتين المحورية والطرفية، وآلية عمل المفاصل، والأساسيات السريرية التي يحتاجها كل طالب تمريض.",
    passThreshold: 70,
    ...skeletalSystem,
  },
  {
    slug: "anatomy-cardiovascular-system",
    descriptionEn:
      "Learn the structure of the heart and blood vessels, the path blood takes through the pulmonary and systemic circuits, and the clinical landmarks nurses use for pulse, auscultation, and blood pressure.",
    descriptionAr:
      "تعرّف على تركيب القلب والأوعية الدموية، ومسار الدم عبر الدورتين الرئوية والجهازية، والمعالم السريرية التي يستخدمها الممرضون للنبض والإصغاء وقياس ضغط الدم.",
    passThreshold: 70,
    ...cardiovascularSystem,
  },
  {
    slug: "anatomy-respiratory-system",
    descriptionEn:
      "Learn the structures of the airway from nose to alveoli, how the lungs and diaphragm work together to breathe, and the clinical landmarks used in airway and chest procedures.",
    descriptionAr:
      "تعرّف على بنى المجرى الهوائي من الأنف إلى الأسناخ، وكيفية عمل الرئتين والحجاب الحاجز معًا للتنفس، والمعالم السريرية المستخدمة في إجراءات المجرى الهوائي والصدر.",
    passThreshold: 70,
    ...respiratorySystem,
  },
  {
    slug: "anatomy-digestive-system",
    descriptionEn:
      "Learn the structure and location of the GI tract and accessory organs (liver, gallbladder, pancreas), how they connect, and the clinical landmarks used in abdominal assessment.",
    descriptionAr:
      "تعرّف على تركيب القناة الهضمية والأعضاء الملحقة (الكبد والمرارة والبنكرياس) ومواقعها، وكيفية ارتباطها، والمعالم السريرية المستخدمة في تقييم البطن.",
    passThreshold: 70,
    ...digestiveSystem,
  },
  {
    slug: "anatomy-urinary-system",
    descriptionEn:
      "Learn the structure of the kidneys and nephron, the location of the urinary organs, and the clinical landmarks used for catheterization and kidney assessment.",
    descriptionAr:
      "تعرّف على تركيب الكليتين والنُّبيب الكلوي، ومواقع أعضاء الجهاز البولي، والمعالم السريرية المستخدمة للقسطرة وتقييم الكلى.",
    passThreshold: 70,
    ...urinarySystem,
  },
  {
    slug: "anatomy-nervous-system",
    descriptionEn:
      "Learn the structure of neurons and the brain, the organization of the central and peripheral nervous systems, and the clinical anatomy behind common neurological assessments.",
    descriptionAr:
      "تعرّف على تركيب الخلايا العصبية والدماغ، وتنظيم الجهازين العصبيين المركزي والمحيطي، والتشريح السريري وراء التقييمات العصبية الشائعة.",
    passThreshold: 70,
    ...nervousSystem,
  },
];

async function main() {
  const anatomyCourse = await prisma.course.upsert({
    where: { slug: "anatomy" },
    update: {},
    create: {
      slug: "anatomy",
      subject: "ANATOMY",
      titleEn: "Human Anatomy",
      titleAr: "تشريح جسم الإنسان",
      descriptionEn:
        "A structured course covering the organization of the human body, from cells and tissues to every major organ system.",
      descriptionAr:
        "مقرر منظم يغطي تركيب جسم الإنسان، بدءًا من الخلايا والأنسجة وصولًا إلى جميع أجهزة الجسم الرئيسية.",
      order: 1,
    },
  });

  const physiologyCourse = await prisma.course.upsert({
    where: { slug: "physiology" },
    update: {},
    create: {
      slug: "physiology",
      subject: "PHYSIOLOGY",
      titleEn: "Human Physiology",
      titleAr: "علم وظائف أعضاء جسم الإنسان",
      descriptionEn:
        "A structured course covering how the body's systems function and regulate themselves, building on anatomical knowledge.",
      descriptionAr:
        "مقرر منظم يغطي كيفية عمل أجهزة الجسم وتنظيمها لنفسها، اعتمادًا على المعرفة التشريحية.",
      order: 2,
    },
  });

  // Full module skeleton for both courses (titles + descriptions only,
  // except the modules listed in FULL_CONTENT_MODULES, updated below).
  for (const [index, [titleEn, titleAr]] of anatomyModules.entries()) {
    const slug = `anatomy-${slugify(titleEn)}`;
    await prisma.module.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        courseId: anatomyCourse.id,
        order: index + 1,
        titleEn,
        titleAr,
        descriptionEn: `${titleEn} — module content is being developed by the medical content team.`,
        descriptionAr: `${titleAr} — محتوى هذا الموديل قيد الإعداد من قبل فريق المحتوى الطبي.`,
      },
    });
  }

  for (const [index, [titleEn, titleAr]] of physiologyModules.entries()) {
    const slug = `physiology-${slugify(titleEn)}`;
    await prisma.module.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        courseId: physiologyCourse.id,
        order: index + 1,
        titleEn,
        titleAr,
        descriptionEn: `${titleEn} — module content is being developed by the medical content team.`,
        descriptionAr: `${titleAr} — محتوى هذا الموديل قيد الإعداد من قبل فريق المحتوى الطبي.`,
      },
    });
  }

  let totalLessons = 0;
  let totalQuestions = 0;

  for (const mod of FULL_CONTENT_MODULES) {
    const dbModule = await prisma.module.update({
      where: { slug: mod.slug },
      data: {
        descriptionEn: mod.descriptionEn,
        descriptionAr: mod.descriptionAr,
        passThreshold: mod.passThreshold,
      },
    });

    const lessonIdBySlug = {};

    for (const lesson of mod.lessons) {
      const created = await prisma.lesson.upsert({
        where: { slug: lesson.slug },
        update: {
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          objectivesEn: JSON.stringify(lesson.objectivesEn),
          objectivesAr: JSON.stringify(lesson.objectivesAr),
          contentEn: lesson.contentEn,
          contentAr: lesson.contentAr,
          termsJson: JSON.stringify(lesson.terms),
          summaryEn: lesson.summaryEn,
          summaryAr: lesson.summaryAr,
          referencesJson: JSON.stringify(lesson.references),
          videoUrl: lesson.videoUrl ?? null,
          videoLabelEn: lesson.videoLabelEn ?? null,
          videoLabelAr: lesson.videoLabelAr ?? null,
        },
        create: {
          slug: lesson.slug,
          moduleId: dbModule.id,
          order: lesson.order,
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          objectivesEn: JSON.stringify(lesson.objectivesEn),
          objectivesAr: JSON.stringify(lesson.objectivesAr),
          contentEn: lesson.contentEn,
          contentAr: lesson.contentAr,
          termsJson: JSON.stringify(lesson.terms),
          summaryEn: lesson.summaryEn,
          summaryAr: lesson.summaryAr,
          referencesJson: JSON.stringify(lesson.references),
          videoUrl: lesson.videoUrl ?? null,
          videoLabelEn: lesson.videoLabelEn ?? null,
          videoLabelAr: lesson.videoLabelAr ?? null,
        },
      });
      lessonIdBySlug[lesson.slug] = created.id;
    }

    // Questions have no natural unique key; clear and re-insert per module
    // on reseed for idempotency.
    await prisma.question.deleteMany({ where: { moduleId: dbModule.id } });

    for (const [order, q] of mod.questions.entries()) {
      await prisma.question.create({
        data: {
          moduleId: dbModule.id,
          lessonId: lessonIdBySlug[q.lessonSlug],
          type: q.type,
          order,
          textEn: q.textEn,
          textAr: q.textAr,
          choicesJson: JSON.stringify(q.choices),
          correctChoiceId: q.correct,
          explanationEn: q.explanationEn,
          explanationAr: q.explanationAr,
        },
      });
    }

    totalLessons += mod.lessons.length;
    totalQuestions += mod.questions.length;
  }

  for (const c of clinicalCases) {
    await prisma.clinicalCase.upsert({
      where: { slug: c.slug },
      update: {
        titleEn: c.titleEn,
        titleAr: c.titleAr,
        descriptionEn: c.descriptionEn,
        descriptionAr: c.descriptionAr,
        difficulty: c.difficulty,
        category: c.category,
        order: c.order,
        isPublished: true,
        visibleDataJson: JSON.stringify(c.visibleData),
        hiddenDataJson: JSON.stringify(c.hiddenData),
      },
      create: {
        slug: c.slug,
        titleEn: c.titleEn,
        titleAr: c.titleAr,
        descriptionEn: c.descriptionEn,
        descriptionAr: c.descriptionAr,
        difficulty: c.difficulty,
        category: c.category,
        order: c.order,
        isPublished: true,
        visibleDataJson: JSON.stringify(c.visibleData),
        hiddenDataJson: JSON.stringify(c.hiddenData),
      },
    });
  }

  console.log("Seed complete:");
  console.log(`  Courses: anatomy, physiology`);
  console.log(`  Anatomy modules: ${anatomyModules.length}, Physiology modules: ${physiologyModules.length}`);
  console.log(`  Full-content modules: ${FULL_CONTENT_MODULES.length}`);
  console.log(`  Total lessons: ${totalLessons}, total questions: ${totalQuestions}`);
  console.log(`  Clinical cases: ${clinicalCases.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
