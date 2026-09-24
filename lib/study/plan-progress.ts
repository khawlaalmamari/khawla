import { prisma } from "@/lib/db";

// This bar's own completion rule, independent of a module's configurable
// quiz pass threshold: a module counts as "done" for study-plan progress
// purposes only once the student's best score on it is 80% or higher.
const COMPLETION_SCORE_THRESHOLD = 80;

export type StudyPlanModule = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  bestScorePercent: number | null;
};

export async function getStudyPlanProgress(userId: string, courseId: string) {
  const modules = await prisma.module.findMany({
    where: { courseId, isPublished: true, lessons: { some: {} } },
    orderBy: { order: "asc" },
    select: { id: true, slug: true, titleAr: true, titleEn: true },
  });

  const progressRecords = await prisma.progressRecord.findMany({
    where: { userId, moduleId: { in: modules.map((m) => m.id) } },
    select: { moduleId: true, bestScorePercent: true },
  });
  const scoreByModuleId = new Map(progressRecords.map((r) => [r.moduleId, r.bestScorePercent]));

  const withScores: StudyPlanModule[] = modules.map((m) => ({
    ...m,
    bestScorePercent: scoreByModuleId.get(m.id) ?? null,
  }));

  const completed = withScores.filter(
    (m) => (m.bestScorePercent ?? 0) >= COMPLETION_SCORE_THRESHOLD,
  );
  const remaining = withScores.filter(
    (m) => (m.bestScorePercent ?? 0) < COMPLETION_SCORE_THRESHOLD,
  );

  const percent =
    withScores.length === 0 ? 0 : Math.round((completed.length / withScores.length) * 100);

  return { totalModules: withScores.length, completed, remaining, percent };
}

export type TimelineEntry = { date: Date; module: StudyPlanModule };

/**
 * Spreads the remaining modules evenly across the days left until examDate
 * — [remaining modules ÷ remaining days] — so the last one lands on (or
 * just before) exam day. Empty once the exam date has passed or nothing is
 * left to study.
 */
export function buildStudyTimeline(remaining: StudyPlanModule[], examDate: Date): TimelineEntry[] {
  if (remaining.length === 0) return [];

  const startOfDay = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const today = startOfDay(new Date());
  const exam = startOfDay(examDate);

  const daysRemaining = Math.round((exam.getTime() - today.getTime()) / 86_400_000);
  if (daysRemaining <= 0) return [];

  const perModuleDays = daysRemaining / remaining.length;

  return remaining.map((module, i) => {
    const offset = Math.min(daysRemaining, Math.max(1, Math.round((i + 1) * perModuleDays)));
    const date = new Date(today.getTime() + offset * 86_400_000);
    return { date, module };
  });
}
