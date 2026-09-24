import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { prisma } from "@/lib/db";
import { isCurrentlyLocked } from "@/lib/auth/login-guard";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { ModuleManagementPanel } from "@/components/admin/module-management-panel";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const usersRaw = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
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
  });

  const users = usersRaw.map(({ lockedUntil, ...u }) => ({
    ...u,
    isLocked: isCurrentlyLocked({ lockedUntil }),
  }));

  const verifiedCount = users.filter((u) => u.emailVerified).length;

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-muted">{dict.admin.totalUsers}</p>
            <p className="mt-1 text-3xl font-bold">{users.length}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.admin.verifiedUsers}</p>
            <p className="mt-1 text-3xl font-bold">{verifiedCount}</p>
          </Card>
        </div>

        <UserManagementTable users={users} currentUserId={user.id} locale={locale} />

        <ModuleManagementPanel courses={courses} modules={moduleRows} locale={locale} />
      </main>
    </div>
  );
}
