import { prisma } from "@/lib/db";
import type { Subject } from "@prisma/client";

export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { select: { id: true } } },
      },
    },
  });
}

export async function getModuleProgressMap(userId: string | null, courseId: string) {
  if (!userId) return new Map<string, { status: string; bestScorePercent: number | null }>();

  const records = await prisma.progressRecord.findMany({
    where: { userId, module: { courseId } },
    select: { moduleId: true, status: true, bestScorePercent: true },
  });

  return new Map(records.map((r) => [r.moduleId, r]));
}

export async function getModuleBySlug(slug: string) {
  return prisma.module.findUnique({
    where: { slug },
    include: {
      course: true,
      lessons: { orderBy: { order: "asc" } },
      questions: true,
    },
  });
}

export function hasFullContent(mod: { lessons: unknown[] }) {
  return mod.lessons.length > 0;
}

export async function getLessonBySlugs(moduleSlug: string, lessonSlug: string) {
  const mod = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!mod) return null;

  const lessonIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return null;

  return {
    module: mod,
    lesson: mod.lessons[lessonIndex],
    prevLesson: mod.lessons[lessonIndex - 1] ?? null,
    nextLesson: mod.lessons[lessonIndex + 1] ?? null,
  };
}

export function subjectToSlug(subject: Subject) {
  return subject === "ANATOMY" ? "anatomy" : "physiology";
}
