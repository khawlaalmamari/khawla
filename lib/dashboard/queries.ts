import { prisma } from "@/lib/db";

export async function getDashboardData(userId: string) {
  const [anatomyCourse, physiologyCourse] = await Promise.all([
    prisma.course.findUnique({
      where: { slug: "anatomy" },
      include: { modules: { include: { lessons: { select: { id: true } } } } },
    }),
    prisma.course.findUnique({
      where: { slug: "physiology" },
      include: { modules: { include: { lessons: { select: { id: true } } } } },
    }),
  ]);

  const progressRecords = await prisma.progressRecord.findMany({
    where: { userId },
    include: { module: { include: { course: true } } },
  });

  const progressByModuleId = new Map(progressRecords.map((r) => [r.moduleId, r]));

  function courseStats(course: typeof anatomyCourse) {
    if (!course) return { completed: 0, total: 0, percent: 0 };
    const contentModules = course.modules.filter((m) => m.lessons.length > 0);
    const completed = contentModules.filter(
      (m) => progressByModuleId.get(m.id)?.status === "COMPLETED",
    ).length;
    const total = contentModules.length;
    return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }

  const anatomyStats = courseStats(anatomyCourse);
  const physiologyStats = courseStats(physiologyCourse);

  const overallCompleted = anatomyStats.completed + physiologyStats.completed;
  const overallTotal = anatomyStats.total + physiologyStats.total;
  const overallPercent =
    overallTotal === 0 ? 0 : Math.round((overallCompleted / overallTotal) * 100);

  const recentAttempts = await prisma.quizAttempt.findMany({
    where: { userId, completedAt: { not: null } },
    orderBy: { completedAt: "desc" },
    take: 5,
    include: { module: { include: { course: true } } },
  });

  const allAttempts = await prisma.quizAttempt.findMany({
    where: { userId, completedAt: { not: null } },
    select: { scorePercent: true },
  });
  const averageScore =
    allAttempts.length === 0
      ? null
      : Math.round(
          allAttempts.reduce((sum, a) => sum + (a.scorePercent ?? 0), 0) / allAttempts.length,
        );

  // Score trend: the student's last 15 attempts, oldest to newest, for a
  // simple "am I improving?" chart on the dashboard.
  const scoreHistoryRaw = await prisma.quizAttempt.findMany({
    where: { userId, completedAt: { not: null }, scorePercent: { not: null } },
    orderBy: { completedAt: "desc" },
    take: 15,
    include: { module: true },
  });
  const scoreHistory = scoreHistoryRaw
    .slice()
    .reverse()
    .map((a) => ({
      date: a.completedAt!.toLocaleDateString("en-CA"), // YYYY-MM-DD, locale-neutral key
      score: a.scorePercent ?? 0,
      moduleTitleEn: a.module.titleEn,
      moduleTitleAr: a.module.titleAr,
    }));

  // Best score per module the student has actually attempted, for a
  // strengths/weaknesses comparison chart.
  const moduleBestScores = progressRecords
    .filter((r) => r.bestScorePercent != null)
    .map((r) => ({
      titleEn: r.module.titleEn,
      titleAr: r.module.titleAr,
      bestScore: r.bestScorePercent!,
      passThreshold: r.module.passThreshold,
    }));

  // Topics needing review: modules with a failed most-recent attempt.
  const reviewModules = progressRecords.filter(
    (r) => r.status === "IN_PROGRESS" && (r.bestScorePercent ?? 0) < r.module.passThreshold,
  );

  // Strong/weak areas: a broader classification than reviewModules above —
  // any attempted module scoring high or low, regardless of pass/fail
  // status, for the "adaptive learning" summary on the dashboard.
  const attemptedRecords = progressRecords.filter((r) => r.bestScorePercent != null);
  const strongModules = attemptedRecords
    .filter((r) => (r.bestScorePercent ?? 0) >= 80)
    .sort((a, b) => (b.bestScorePercent ?? 0) - (a.bestScorePercent ?? 0));
  const weakModules = attemptedRecords
    .filter((r) => (r.bestScorePercent ?? 0) < 60)
    .sort((a, b) => (a.bestScorePercent ?? 0) - (b.bestScorePercent ?? 0));

  // Smart recommendation: continue the next not-yet-started module in
  // whichever course the student is further behind in; once both courses
  // are fully started, fall back to suggesting a review of their weakest
  // attempted (and not-yet-passed) module instead.
  type RecommendedModule = {
    titleEn: string;
    titleAr: string;
    courseSlug: string;
    moduleSlug: string;
    reason: "continue" | "review";
  };
  let recommendedModule: RecommendedModule | null = null;

  const behindFirst =
    anatomyStats.percent <= physiologyStats.percent
      ? [anatomyCourse, physiologyCourse]
      : [physiologyCourse, anatomyCourse];

  for (const course of behindFirst) {
    if (!course) continue;
    const next = course.modules
      .filter((m) => m.lessons.length > 0)
      .sort((a, b) => a.order - b.order)
      .find((m) => {
        const status = progressByModuleId.get(m.id)?.status;
        return !status || status === "NOT_STARTED";
      });
    if (next) {
      recommendedModule = {
        titleEn: next.titleEn,
        titleAr: next.titleAr,
        courseSlug: course.slug,
        moduleSlug: next.slug,
        reason: "continue",
      };
      break;
    }
  }

  if (!recommendedModule && weakModules.length > 0) {
    const weakest = weakModules[0];
    recommendedModule = {
      titleEn: weakest.module.titleEn,
      titleAr: weakest.module.titleAr,
      courseSlug: weakest.module.course.slug,
      moduleSlug: weakest.module.slug,
      reason: "review",
    };
  }

  // Learning streak: consecutive days (through today, or through yesterday
  // if nothing's logged yet today) with at least one completed quiz
  // attempt — a simple, honest "studying activity" signal from real data.
  const attemptDatesRaw = await prisma.quizAttempt.findMany({
    where: { userId, completedAt: { not: null } },
    select: { completedAt: true },
    orderBy: { completedAt: "desc" },
    take: 60,
  });
  const activeDates = new Set(attemptDatesRaw.map((a) => a.completedAt!.toISOString().slice(0, 10)));
  let learningStreak = 0;
  const cursor = new Date();
  if (!activeDates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activeDates.has(cursor.toISOString().slice(0, 10))) {
    learningStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const studyPlans = await prisma.studyPlan.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });

  return {
    anatomyStats,
    physiologyStats,
    overallPercent,
    completedModulesCount: overallCompleted,
    recentAttempts,
    averageScore,
    scoreHistory,
    moduleBestScores,
    reviewModules,
    strongModules,
    weakModules,
    recommendedModule,
    learningStreak,
    studyPlans,
  };
}

export type WeakStrongModuleSummary = {
  moduleId: string;
  titleEn: string;
  titleAr: string;
  bestScorePercent: number;
};

/**
 * A lightweight standalone version of the strong/weak split above, for
 * Novia's chat route — which runs on a separate request and shouldn't pay
 * for the full dashboard's queries (course trees, score history, streak,
 * etc.) just to mention a student's weak topics in conversation.
 */
export async function getWeakStrongModules(
  userId: string,
): Promise<{ strong: WeakStrongModuleSummary[]; weak: WeakStrongModuleSummary[] }> {
  const records = await prisma.progressRecord.findMany({
    where: { userId, bestScorePercent: { not: null } },
    select: { moduleId: true, bestScorePercent: true, module: { select: { titleEn: true, titleAr: true } } },
  });

  const toSummary = (r: (typeof records)[number]): WeakStrongModuleSummary => ({
    moduleId: r.moduleId,
    titleEn: r.module.titleEn,
    titleAr: r.module.titleAr,
    bestScorePercent: r.bestScorePercent!,
  });

  return {
    strong: records.filter((r) => (r.bestScorePercent ?? 0) >= 80).map(toSummary),
    weak: records.filter((r) => (r.bestScorePercent ?? 0) < 60).map(toSummary),
  };
}
