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

  const studyPlans = await prisma.studyPlan.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
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
    studyPlans,
    notifications,
  };
}
