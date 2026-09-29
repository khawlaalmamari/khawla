import { prisma } from "@/lib/db";

// Phase 3C-3 — Learning Progression. A small representation of the
// existing pipeline (Anatomy -> Nursing Skill Practice -> Clinical Case ->
// Clinical Reasoning -> Debriefing), derived entirely from data that
// already exists — no new Prisma model, no new persistence. See
// getLearningJourney below for exactly where each stage's status comes
// from, and its documented limitations (Nursing Lab has no server-side
// persistence at all as of Phase 3B-4, so it can never be verified as
// complete from here).
export type LearningStageId =
  | "ANATOMY"
  | "NURSING_SKILL"
  | "CLINICAL_CASE"
  | "CLINICAL_REASONING"
  | "DEBRIEFING";

export type LearningStageStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type LearningStage = { id: LearningStageId; status: LearningStageStatus };

/** Everything the UI needs to build the next-action CTA, and nothing
 * more — an attemptId/caseSlug the student already owns, never hidden
 * case content. The page/component maps `kind` to dict text + route. */
export type LearningJourneyNextAction =
  | { kind: "ANATOMY" }
  | { kind: "NURSING_SKILL" }
  | { kind: "CLINICAL_CASE" }
  | { kind: "CLINICAL_REASONING"; caseSlug: string; attemptId: string }
  | { kind: "DEBRIEFING"; caseSlug: string; attemptId: string }
  | { kind: "JOURNEY_COMPLETE" };

export type LearningJourney = {
  stages: LearningStage[];
  currentStageId: LearningStageId | null; // null once every derivable stage is COMPLETED
  stagesCompletedCount: number;
  nextAction: LearningJourneyNextAction;
};

/**
 * Derives the student's position in the existing learning pipeline purely
 * from already-persisted data:
 *  - Anatomy: existing ProgressRecord/QuizAttempt data for the "anatomy"
 *    course (the same data behind the dashboard's own anatomyStats card).
 *    "Completed" here means at least one Anatomy module has been
 *    completed — not necessarily all of them (nothing in the app gates
 *    later stages on full mastery, so treating partial credit as
 *    "enough to move forward" keeps this pointer meaningfully useful
 *    rather than permanently stuck on Anatomy for most real students).
 *  - Nursing Lab: NOT persisted anywhere (confirmed at Phase 3B-4 —
 *    session-only React state, cleared on navigation/restart). This
 *    stage can therefore never be verified as COMPLETED from the server
 *    and always reports NOT_STARTED — a documented limitation, not a bug.
 *  - Clinical Case / Clinical Reasoning / Debriefing: the existing
 *    ClinicalCaseAttempt.status / finalDecisionJson / interactionLogJson
 *    columns (Phase 2 / 3C-2) — the exact same persistence the Virtual
 *    Patient page itself reads from. Only attempt-level fields are
 *    selected below; hiddenDataJson/visibleDataJson are never touched.
 *
 * Current-stage rule: the task's own example rule assumes every stage is
 * independently verifiable and strictly sequential. Since Nursing Lab
 * cannot be verified at all, that literal rule would leave the pointer
 * stuck on "Nursing Skill" forever for any student who has since done
 * real, verifiable Clinical Case work — clearly wrong. This adapts it:
 * real forward evidence (any Clinical Case attempt) takes precedence over
 * the Anatomy/Nursing Skill gate, and only when there is no such evidence
 * do we fall back to Anatomy-then-Nursing-Skill.
 */
export async function getLearningJourney(
  userId: string,
  anatomyStats: { completed: number; total: number },
  anatomyStarted: boolean,
): Promise<LearningJourney> {
  const attempts = await prisma.clinicalCaseAttempt.findMany({
    where: { userId },
    select: {
      id: true,
      status: true,
      startedAt: true,
      completedAt: true,
      finalDecisionJson: true,
      interactionLogJson: true,
      case: { select: { slug: true } },
    },
    orderBy: { startedAt: "desc" },
  });

  // ABANDONED attempts (declared in the schema, not currently reachable
  // from any code path) count as neither in-progress nor completed here —
  // an honest "didn't finish" rather than invented partial credit.
  const completedAttempts = attempts
    .filter((a) => a.status === "COMPLETED")
    .sort((a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0));
  const inProgressAttempts = attempts
    .filter((a) => a.status === "IN_PROGRESS")
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  // The attempt representing the student's most advanced Clinical Case
  // standing — a completed one if any exists, otherwise their most
  // recent in-progress one.
  const primary = completedAttempts[0] ?? inProgressAttempts[0] ?? null;
  const hasAnyRelevantAttempt = completedAttempts.length > 0 || inProgressAttempts.length > 0;

  const anatomyStatus: LearningStageStatus =
    anatomyStats.completed > 0 ? "COMPLETED" : anatomyStarted ? "IN_PROGRESS" : "NOT_STARTED";

  // Documented limitation (see function doc above): never verifiable.
  const nursingSkillStatus: LearningStageStatus = "NOT_STARTED";

  const clinicalCaseStatus: LearningStageStatus =
    completedAttempts.length > 0 ? "COMPLETED" : inProgressAttempts.length > 0 ? "IN_PROGRESS" : "NOT_STARTED";

  const reasoningStatus: LearningStageStatus = primary?.finalDecisionJson ? "COMPLETED" : "NOT_STARTED";

  const debriefingStatus: LearningStageStatus = primary?.interactionLogJson ? "COMPLETED" : "NOT_STARTED";

  const stages: LearningStage[] = [
    { id: "ANATOMY", status: anatomyStatus },
    { id: "NURSING_SKILL", status: nursingSkillStatus },
    { id: "CLINICAL_CASE", status: clinicalCaseStatus },
    { id: "CLINICAL_REASONING", status: reasoningStatus },
    { id: "DEBRIEFING", status: debriefingStatus },
  ];
  const stagesCompletedCount = stages.filter((s) => s.status === "COMPLETED").length;

  let currentStageId: LearningStageId | null;
  if (hasAnyRelevantAttempt) {
    if (clinicalCaseStatus !== "COMPLETED") currentStageId = "CLINICAL_CASE";
    else if (reasoningStatus !== "COMPLETED") currentStageId = "CLINICAL_REASONING";
    else if (debriefingStatus !== "COMPLETED") currentStageId = "DEBRIEFING";
    else currentStageId = null;
  } else if (anatomyStatus !== "COMPLETED") {
    currentStageId = "ANATOMY";
  } else {
    currentStageId = "NURSING_SKILL";
  }

  let nextAction: LearningJourneyNextAction;
  if (currentStageId === "ANATOMY") nextAction = { kind: "ANATOMY" };
  else if (currentStageId === "NURSING_SKILL") nextAction = { kind: "NURSING_SKILL" };
  else if (currentStageId === "CLINICAL_CASE") nextAction = { kind: "CLINICAL_CASE" };
  else if (currentStageId === "CLINICAL_REASONING" && primary) {
    nextAction = { kind: "CLINICAL_REASONING", caseSlug: primary.case.slug, attemptId: primary.id };
  } else if (currentStageId === "DEBRIEFING" && primary) {
    nextAction = { kind: "DEBRIEFING", caseSlug: primary.case.slug, attemptId: primary.id };
  } else {
    nextAction = { kind: "JOURNEY_COMPLETE" };
  }

  return { stages, currentStageId, stagesCompletedCount, nextAction };
}

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

  // Reuses anatomyCourse/progressByModuleId already fetched above — no
  // extra query for this boolean.
  const anatomyStarted = anatomyCourse
    ? anatomyCourse.modules.some((m) => {
        const status = progressByModuleId.get(m.id)?.status;
        return status === "IN_PROGRESS" || status === "COMPLETED";
      })
    : false;
  const learningJourney = await getLearningJourney(userId, anatomyStats, anatomyStarted);

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
    learningJourney,
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
