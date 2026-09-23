import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getUpcomingStudySessions } from "@/lib/study/sessions";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { StudyPlanForm } from "@/components/study-planner/study-plan-form";
import { StudySessionForm } from "@/components/study-planner/study-session-form";

export default async function StudyPlannerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const [courses, plans, upcomingSessions] = await Promise.all([
    prisma.course.findMany({
      orderBy: { order: "asc" },
      include: { modules: { include: { lessons: { select: { id: true } } } } },
    }),
    prisma.studyPlan.findMany({ where: { userId: user.id } }),
    getUpcomingStudySessions(user.id),
  ]);

  const coursesWithContentModules = courses.map((c) => ({
    id: c.id,
    titleEn: c.titleEn,
    titleAr: c.titleAr,
    modules: c.modules
      .filter((m) => m.lessons.length > 0)
      .map((m) => ({ id: m.id, courseId: c.id, titleEn: m.titleEn, titleAr: m.titleAr })),
  }));

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
          }))}
        />

        <StudySessionForm courses={coursesWithContentModules} />

        <Card>
          <h2 className="text-lg font-bold">
            {locale === "ar" ? "الجلسات القادمة" : "Upcoming Sessions"}
          </h2>
          {upcomingSessions.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              {locale === "ar" ? "لا توجد جلسات مجدولة." : "No sessions scheduled yet."}
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {upcomingSessions.map((s) => (
                <li key={s.id} className="rounded-lg bg-surface px-3 py-2 text-sm">
                  <p className="font-medium">
                    {s.module ? (locale === "ar" ? s.module.titleAr : s.module.titleEn) : "—"}
                  </p>
                  <p className="text-xs text-muted">
                    {s.scheduledFor.toLocaleString(locale === "ar" ? "ar" : "en-US")} ·{" "}
                    {s.durationMinutes} {locale === "ar" ? "دقيقة" : "min"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </div>
  );
}
