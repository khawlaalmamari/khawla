const { PrismaClient } = require("@prisma/client");
const { anatomyModules, physiologyModules, slugify } = require("./content/course-outline");
const skeletalSystem = require("./content/skeletal-system");
const introAnatomy = require("./content/intro-anatomy");

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

  console.log("Seed complete:");
  console.log(`  Courses: anatomy, physiology`);
  console.log(`  Anatomy modules: ${anatomyModules.length}, Physiology modules: ${physiologyModules.length}`);
  console.log(`  Full-content modules: ${FULL_CONTENT_MODULES.length}`);
  console.log(`  Total lessons: ${totalLessons}, total questions: ${totalQuestions}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
