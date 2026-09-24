import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getDashboardData } from "@/lib/dashboard/queries";
import { getDueStudySession } from "@/lib/study/sessions";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { ScoreTrendChart } from "@/components/dashboard/score-trend-chart";
import { ModuleBestScoresChart } from "@/components/dashboard/module-best-scores-chart";
import { NotificationList } from "@/components/dashboard/notification-list";

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
      <div
        className="h-full rounded-full bg-primary-600 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const data = await getDashboardData(user.id);
  const dueSession = await getDueStudySession(user.id);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 sm:px-6">
        {dueSession?.module && (
          <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-accent-800 sm:flex-row sm:items-center">
            <span>
              {locale === "ar" ? "حان وقت المذاكرة: " : "Time to study: "}
              <strong>
                {locale === "ar" ? dueSession.module.titleAr : dueSession.module.titleEn}
              </strong>
            </span>
            <ButtonLink
              href={`/${dueSession.module.course.slug}/${dueSession.module.slug}`}
              className="!px-4 !py-1.5 text-xs"
            >
              {locale === "ar" ? "ابدأ الآن" : "Start Now"}
            </ButtonLink>
          </div>
        )}

        <h1 className="text-2xl font-bold">
          {dict.dashboard.welcome.replace("{name}", user.fullName)}
        </h1>

        {/* Top stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex items-center gap-4">
            <ProgressRing percent={data.overallPercent} label={dict.dashboard.overallProgress} />
            <p className="text-sm text-muted">{dict.dashboard.overallProgress}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.dashboard.anatomyProgress}</p>
            <p className="mt-1 text-3xl font-extrabold">
              {data.anatomyStats.completed}/{data.anatomyStats.total}
            </p>
            <div className="mt-3">
              <ProgressBar percent={data.anatomyStats.percent} />
            </div>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.dashboard.physiologyProgress}</p>
            <p className="mt-1 text-3xl font-extrabold">
              {data.physiologyStats.completed}/{data.physiologyStats.total}
            </p>
            <div className="mt-3">
              <ProgressBar percent={data.physiologyStats.percent} />
            </div>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.dashboard.averageScore}</p>
            <p className="mt-1 text-3xl font-extrabold text-accent-600">
              {data.averageScore === null ? "—" : `${data.averageScore}%`}
            </p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold">{dict.dashboard.scoreTrend}</h2>
            <div className="mt-4">
              <ScoreTrendChart
                data={data.scoreHistory.map((h) => ({
                  date: h.date,
                  score: h.score,
                  label: locale === "ar" ? h.moduleTitleAr : h.moduleTitleEn,
                }))}
                passThreshold={70}
                emptyLabel={dict.dashboard.noScoreHistory}
                passLineLabel={dict.dashboard.passLineLabel}
              />
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-bold">{dict.dashboard.moduleComparison}</h2>
            <div className="mt-4">
              <ModuleBestScoresChart
                data={data.moduleBestScores.map((m) => ({
                  title: locale === "ar" ? m.titleAr : m.titleEn,
                  bestScore: m.bestScore,
                  passThreshold: m.passThreshold,
                }))}
                emptyLabel={dict.dashboard.noModuleScores}
                passedLabel={dict.dashboard.passedShort}
                notYetLabel={dict.dashboard.notPassedYet}
              />
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent quizzes */}
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-bold">{dict.dashboard.recentQuizzes}</h2>
            {data.recentAttempts.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{dict.dashboard.noAttemptsYet}</p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {data.recentAttempts.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/${a.module.course.slug}/${a.module.slug}/quiz/${a.id}`}
                      className="flex items-center justify-between rounded-lg py-3 transition-colors hover:bg-surface"
                    >
                      <div>
                        <p className="font-medium">
                          {locale === "ar" ? a.module.titleAr : a.module.titleEn}
                        </p>
                        <p className="text-xs text-muted">
                          {a.completedAt?.toLocaleDateString(locale === "ar" ? "ar" : "en-US")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{a.scorePercent}%</span>
                        <Badge tone={a.passed ? "success" : "neutral"}>
                          {a.passed ? dict.quiz.passed : dict.quiz.failed}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Review topics */}
          <Card>
            <h2 className="text-lg font-bold">{dict.dashboard.reviewTopics}</h2>
            {data.reviewModules.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{dict.dashboard.noReviewNeeded}</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {data.reviewModules.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/${r.module.course.slug}/${r.module.slug}`}
                      className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm hover:bg-primary-50"
                    >
                      <span>{locale === "ar" ? r.module.titleAr : r.module.titleEn}</span>
                      <span className="text-muted">{r.bestScorePercent}%</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Study plan */}
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{dict.dashboard.dailyPlan}</h2>
              <ButtonLink href="/study-planner" variant="outline" className="!px-3 !py-1.5 text-xs">
                {dict.nav.studyPlanner}
              </ButtonLink>
            </div>
            {data.studyPlans.length === 0 ? (
              <p className="mt-4 text-sm text-muted">
                {locale === "ar"
                  ? "لم تُنشئ خطة مذاكرة بعد."
                  : "You haven't created a study plan yet."}
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {data.studyPlans.map((plan) => (
                  <li key={plan.id} className="rounded-lg bg-surface px-3 py-2 text-sm">
                    <p className="font-medium">
                      {locale === "ar" ? plan.course.titleAr : plan.course.titleEn}
                    </p>
                    <p className="text-xs text-muted">
                      {locale === "ar" ? "موعد الامتحان" : "Exam date"}:{" "}
                      {plan.examDate.toLocaleDateString(locale === "ar" ? "ar" : "en-US")} ·{" "}
                      {plan.dailyHours} {locale === "ar" ? "ساعة/يوم" : "hrs/day"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Notifications */}
          <Card>
            <h2 className="text-lg font-bold">{dict.dashboard.notifications}</h2>
            <NotificationList notifications={data.notifications} />
          </Card>
        </div>

        <div className="flex justify-center">
          <ButtonLink href="/anatomy">{dict.dashboard.continueLearning}</ButtonLink>
        </div>
      </main>
    </div>
  );
}
