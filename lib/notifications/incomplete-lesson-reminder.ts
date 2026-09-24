import { prisma } from "@/lib/db";

const REMINDER_TITLE_EN = "Continue where you left off";
const REMINDER_TITLE_AR = "أكملي من حيث توقفتِ";
const DEDUPE_WINDOW_HOURS = 24;

/**
 * On login, nudges a student toward the first module they haven't
 * completed yet — at most once every 24h, so it doesn't spam a notification
 * on every single login.
 */
export async function maybeNotifyIncompleteLesson(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, fullName: true },
  });
  if (!user || user.role !== "student") return;

  const recentReminder = await prisma.notification.findFirst({
    where: {
      userId,
      titleEn: REMINDER_TITLE_EN,
      createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_HOURS * 60 * 60 * 1000) },
    },
    select: { id: true },
  });
  if (recentReminder) return;

  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    include: {
      modules: {
        where: { isPublished: true, lessons: { some: {} } },
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, take: 1 } },
      },
    },
  });

  const progressRecords = await prisma.progressRecord.findMany({
    where: { userId },
    select: { moduleId: true, status: true },
  });
  const statusByModuleId = new Map(progressRecords.map((r) => [r.moduleId, r.status]));

  for (const course of courses) {
    for (const mod of course.modules) {
      if (statusByModuleId.get(mod.id) === "COMPLETED") continue;

      const firstLesson = mod.lessons[0];
      await prisma.notification.create({
        data: {
          userId,
          titleEn: REMINDER_TITLE_EN,
          titleAr: REMINDER_TITLE_AR,
          bodyEn: `Hi ${user.fullName}, you haven't finished the "${mod.titleEn}" module yet. You can pick it up right now.`,
          bodyAr: `عزيزتي ${user.fullName}، لم تكملي موديل "${mod.titleAr}" بعد. يمكنك إكماله الآن.`,
          linkUrl: firstLesson
            ? `/${course.slug}/${mod.slug}/${firstLesson.slug}`
            : `/${course.slug}/${mod.slug}`,
        },
      });
      return;
    }
  }
}
