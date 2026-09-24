import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { prisma } from "@/lib/db";
import { isCurrentlyLocked } from "@/lib/auth/login-guard";
import { buildUserWhere, daysAgo, type UserStatusFilter } from "@/lib/admin/user-filters";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { ModuleManagementPanel } from "@/components/admin/module-management-panel";
import { BroadcastForm } from "@/components/admin/broadcast-form";
import { AuditLogPanel } from "@/components/admin/audit-log-panel";
import { SignupsTrendChart } from "@/components/admin/signups-trend-chart";
import { ModuleScoresChart } from "@/components/admin/module-scores-chart";

const PAGE_SIZE = 20;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const status = (params.status as UserStatusFilter) || "all";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const where = buildUserWhere(q, status);

  const [usersRaw, totalFiltered, totalUsers, verifiedCount] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
        lockedUntil: true,
      },
    }),
    prisma.user.count({ where }),
    prisma.user.count(),
    prisma.user.count({ where: { emailVerified: true } }),
  ]);

  const users = usersRaw.map(({ lockedUntil, ...u }) => ({
    ...u,
    isLocked: isCurrentlyLocked({ lockedUntil }),
  }));

  const [activeThisWeek, scoreAgg, moduleScores, auditLogs, recentSignups] = await Promise.all([
    prisma.user.count({ where: { lastLoginAt: { gte: daysAgo(7) } } }),
    prisma.quizAttempt.aggregate({
      _avg: { scorePercent: true },
      where: { scorePercent: { not: null } },
    }),
    prisma.quizAttempt.groupBy({
      by: ["moduleId"],
      _avg: { scorePercent: true },
      _count: { _all: true },
      where: { scorePercent: { not: null } },
    }),
    prisma.adminAuditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { admin: { select: { fullName: true } } },
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: daysAgo(30) } },
      select: { createdAt: true },
    }),
  ]);

  const moduleTitles = await prisma.module.findMany({
    where: { id: { in: moduleScores.map((m) => m.moduleId) } },
    select: { id: true, titleAr: true, titleEn: true },
  });
  const moduleTitleById = new Map(moduleTitles.map((m) => [m.id, m]));

  const moduleScoreChartData = moduleScores
    .filter((m) => m._count._all >= 3) // ignore modules with too few attempts to be meaningful
    .sort((a, b) => (a._avg.scorePercent ?? 0) - (b._avg.scorePercent ?? 0))
    .map((m) => ({
      title: locale === "ar" ? moduleTitleById.get(m.moduleId)?.titleAr : moduleTitleById.get(m.moduleId)?.titleEn,
      avgScore: Math.round(m._avg.scorePercent ?? 0),
      attempts: m._count._all,
    }))
    .filter((m): m is { title: string; avgScore: number; attempts: number } => Boolean(m.title));

  // Bucket the last 30 days of sign-ups into a daily series (zero-filled).
  const dayFormatter = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
    month: "short",
    day: "numeric",
  });
  const signupsByDay = new Map<string, number>();
  for (const u of recentSignups) {
    const key = u.createdAt.toISOString().slice(0, 10);
    signupsByDay.set(key, (signupsByDay.get(key) ?? 0) + 1);
  }
  const signupsTrend = Array.from({ length: 30 }, (_, i) => {
    const date = daysAgo(29 - i);
    const key = date.toISOString().slice(0, 10);
    return { date: key, count: signupsByDay.get(key) ?? 0, label: dayFormatter.format(date) };
  });

  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    select: { id: true, slug: true, titleAr: true, titleEn: true },
  });

  const modules = await prisma.module.findMany({
    orderBy: [{ course: { order: "asc" } }, { order: "asc" }],
    select: {
      id: true,
      courseId: true,
      titleAr: true,
      titleEn: true,
      isPublished: true,
      lessons: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          titleAr: true,
          titleEn: true,
          objectivesAr: true,
          objectivesEn: true,
          contentAr: true,
          contentEn: true,
          summaryAr: true,
          summaryEn: true,
        },
      },
    },
  });

  const moduleRows = modules.map((mod) => ({
    id: mod.id,
    courseId: mod.courseId,
    titleAr: mod.titleAr,
    titleEn: mod.titleEn,
    isPublished: mod.isPublished,
    lessons: mod.lessons.map((l) => ({
      id: l.id,
      titleAr: l.titleAr,
      titleEn: l.titleEn,
      objectivesAr: JSON.parse(l.objectivesAr) as string[],
      objectivesEn: JSON.parse(l.objectivesEn) as string[],
      contentAr: l.contentAr,
      contentEn: l.contentEn,
      summaryAr: l.summaryAr,
      summaryEn: l.summaryEn,
    })),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold">{dict.admin.title}</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-sm text-muted">{dict.admin.totalUsers}</p>
            <p className="mt-1 text-3xl font-bold">{totalUsers}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.admin.verifiedUsers}</p>
            <p className="mt-1 text-3xl font-bold">{verifiedCount}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.admin.activeThisWeek}</p>
            <p className="mt-1 text-3xl font-bold">{activeThisWeek}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.admin.avgQuizScore}</p>
            <p className="mt-1 text-3xl font-bold">
              {scoreAgg._avg.scorePercent != null ? `${Math.round(scoreAgg._avg.scorePercent)}%` : "—"}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <p className="mb-3 text-sm font-bold">{dict.admin.signupsTrend}</p>
            <SignupsTrendChart
              data={signupsTrend}
              emptyLabel={dict.admin.noSignupsYet}
              totalLabel={dict.admin.signupsTotalLabel}
            />
          </Card>
          <Card>
            <p className="mb-3 text-sm font-bold">{dict.admin.hardestModules}</p>
            <ModuleScoresChart
              data={moduleScoreChartData}
              emptyLabel={dict.admin.noQuizDataYet}
              attemptsLabel={dict.admin.attemptsLabel}
            />
          </Card>
        </div>

        <UserManagementTable
          users={users}
          currentUserId={user.id}
          locale={locale}
          q={q ?? ""}
          status={status}
          page={page}
          totalPages={Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE))}
        />

        <BroadcastForm />

        <AuditLogPanel
          entries={auditLogs.map((log) => ({
            id: log.id,
            adminName: log.admin.fullName,
            action: log.action,
            detail: log.detail,
            createdAt: log.createdAt,
          }))}
          locale={locale}
        />

        <ModuleManagementPanel courses={courses} modules={moduleRows} locale={locale} />
      </main>
    </div>
  );
}
