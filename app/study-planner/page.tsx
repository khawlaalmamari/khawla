import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getStudyPlanProgress, buildStudyTimeline } from "@/lib/study/plan-progress";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StudyPlanForm } from "@/components/study-planner/study-plan-form";

export default async function StudyPlannerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const [courses, plans] = await Promise.all([
    prisma.course.findMany({
      orderBy: { order: "asc" },
      include: { modules: { include: { lessons: { select: { id: true } } } } },
    }),
    prisma.studyPlan.findMany({ where: { userId: user.id } }),
  ]);

  const courseById = new Map(courses.map((c) => [c.id, c]));
  const planProgress = await Promise.all(
    plans.map(async (plan) => {
      const progress = await getStudyPlanProgress(user.id, plan.courseId);
      const timeline = buildStudyTimeline(progress.remaining, plan.examDate);
      return { plan, course: courseById.get(plan.courseId), progress, timeline };
    }),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-8 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold">{dict.nav.studyPlanner}</h1>
          <p className="mt-2 text-sm text-muted">
            {locale === "ar"
              ? "حدّد موعد الامتحان وعدد ساعات المذاكرة اليومية لكل مادة."
              : "Set your exam date and daily study hours for each subject."}
          </p>
        </div>

        <StudyPlanForm
          courses={courses}
          plans={plans.map((p) => ({
            id: p.id,
            courseId: p.courseId,
            examDate: p.examDate.toISOString(),
            dailyHours: p.dailyHours,
            reminderHour: p.reminderHour,
            reminderFrequency: p.reminderFrequency as "daily" | "weekly",
          }))}
        />

        {planProgress.map(({ plan, course, progress, timeline }) =>
          course ? (
            <Card key={plan.id}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  {locale === "ar" ? course.titleAr : course.titleEn}
                </h2>
                <span className="text-sm font-semibold text-primary-700">{progress.percent}%</span>
              </div>
              <div className="mt-3">
                <ProgressBar percent={progress.percent} />
              </div>
              <p className="mt-2 text-xs text-muted">
                {locale === "ar"
                  ? `${progress.completed.length} من ${progress.totalModules} موديلات مكتملة (80% فأكثر)`
                  : `${progress.completed.length} of ${progress.totalModules} modules completed (80%+)`}
              </p>

              <h3 className="mt-6 text-sm font-bold">
                {locale === "ar" ? "الجدول الزمني المقترح" : "Suggested Timeline"}
              </h3>
              {timeline.length === 0 ? (
                <p className="mt-3 text-sm text-muted">
                  {progress.remaining.length === 0
                    ? locale === "ar"
                      ? "أكملتِ جميع موديلات هذه المادة. أحسنتِ!"
                      : "You've completed every module in this course. Great job!"
                    : locale === "ar"
                      ? "موعد الاختبار قريب جدًا أو قد فات — راجعي الموديلات المتبقية مباشرة."
                      : "The exam date is too close (or has passed) — review the remaining modules directly."}
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {timeline.map(({ date, module }) => (
                    <li
                      key={module.id}
                      className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm"
                    >
                      <span>{locale === "ar" ? module.titleAr : module.titleEn}</span>
                      <span className="text-xs text-muted">
                        {date.toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ) : null,
        )}
      </main>
    </div>
  );
}
