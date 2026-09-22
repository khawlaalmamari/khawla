import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/navbar";
import { StudyPlanForm } from "@/components/study-planner/study-plan-form";

export default async function StudyPlannerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const [courses, plans] = await Promise.all([
    prisma.course.findMany({ orderBy: { order: "asc" } }),
    prisma.studyPlan.findMany({ where: { userId: user.id } }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold">{dict.nav.studyPlanner}</h1>
        <p className="mt-2 text-sm text-muted">
          {locale === "ar"
            ? "حدّد موعد الامتحان وعدد ساعات المذاكرة اليومية لكل مادة."
            : "Set your exam date and daily study hours for each subject."}
        </p>
        <div className="mt-8">
          <StudyPlanForm
            courses={courses}
            plans={plans.map((p) => ({
              id: p.id,
              courseId: p.courseId,
              examDate: p.examDate.toISOString(),
              dailyHours: p.dailyHours,
            }))}
          />
        </div>
      </main>
    </div>
  );
}
