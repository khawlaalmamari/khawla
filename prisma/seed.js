const { PrismaClient } = require("@prisma/client");
const { anatomyModules, physiologyModules, slugify } = require("./content/course-outline");
const { lessons, questions } = require("./content/skeletal-system");

const prisma = new PrismaClient();

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
  // except Skeletal System which gets full lesson + quiz content below).
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

  // Full content for the Skeletal System module.
  const skeletalModule = await prisma.module.upsert({
    where: { slug: "anatomy-skeletal-system" },
    update: {
      descriptionEn:
        "Learn the structure of bones, how the skeleton is organized into axial and appendicular regions, how joints work, and the clinical basics every nursing student needs.",
      descriptionAr:
        "تعرّف على تركيب العظام، وكيفية تنظيم الهيكل إلى المنطقتين المحورية والطرفية، وآلية عمل المفاصل، والأساسيات السريرية التي يحتاجها كل طالب تمريض.",
    },
    create: {
      slug: "anatomy-skeletal-system",
      courseId: anatomyCourse.id,
      order: 3,
      titleEn: "Skeletal System",
      titleAr: "الجهاز الهيكلي",
      descriptionEn:
        "Learn the structure of bones, how the skeleton is organized into axial and appendicular regions, how joints work, and the clinical basics every nursing student needs.",
      descriptionAr:
        "تعرّف على تركيب العظام، وكيفية تنظيم الهيكل إلى المنطقتين المحورية والطرفية، وآلية عمل المفاصل، والأساسيات السريرية التي يحتاجها كل طالب تمريض.",
      passThreshold: 70,
    },
  });

  const lessonIdBySlug = {};

  for (const lesson of lessons) {
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
        moduleId: skeletalModule.id,
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

  // Questions are keyed by lesson slug + question text since there is no
  // natural unique key; clear and re-insert on reseed for idempotency.
  await prisma.question.deleteMany({ where: { moduleId: skeletalModule.id } });

  for (const [order, q] of questions.entries()) {
    await prisma.question.create({
      data: {
        moduleId: skeletalModule.id,
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

  console.log("Seed complete:");
  console.log(`  Courses: anatomy, physiology`);
  console.log(`  Anatomy modules: ${anatomyModules.length}, Physiology modules: ${physiologyModules.length}`);
  console.log(`  Skeletal System lessons: ${lessons.length}, questions: ${questions.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
