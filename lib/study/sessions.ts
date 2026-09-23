import { prisma } from "@/lib/db";

async function withModuleInfo<T extends { moduleId: string }>(sessions: T[]) {
  if (sessions.length === 0) return [] as (T & { module: { titleEn: string; titleAr: string; slug: string; course: { slug: string } } | null })[];

  const modules = await prisma.module.findMany({
    where: { id: { in: sessions.map((s) => s.moduleId) } },
    select: { id: true, titleEn: true, titleAr: true, slug: true, course: { select: { slug: true } } },
  });
  const byId = new Map(modules.map((m) => [m.id, m]));

  return sessions.map((s) => ({ ...s, module: byId.get(s.moduleId) ?? null }));
}

export async function getDueStudySession(userId: string) {
  const now = new Date();

  const sessions = await prisma.studySession.findMany({
    where: {
      completed: false,
      studyPlan: { userId },
      scheduledFor: { lte: now },
    },
  });

  const due = sessions.find((s) => {
    const end = new Date(s.scheduledFor.getTime() + s.durationMinutes * 60_000);
    return end >= now;
  });

  if (!due) return null;
  const [withModule] = await withModuleInfo([due]);
  return withModule;
}

export async function getUpcomingStudySessions(userId: string, limit = 5) {
  const sessions = await prisma.studySession.findMany({
    where: {
      completed: false,
      studyPlan: { userId },
      scheduledFor: { gt: new Date() },
    },
    orderBy: { scheduledFor: "asc" },
    take: limit,
  });

  return withModuleInfo(sessions);
}
