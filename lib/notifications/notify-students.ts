import { prisma } from "@/lib/db";

/**
 * Sends a system-generated (senderId: null) notification to every student
 * account. Used for automated alerts — e.g. a module being published or a
 * lesson being updated — so students learn about content changes without
 * an admin having to compose a broadcast by hand.
 */
export async function notifyAllStudents({
  titleAr,
  titleEn,
  bodyAr,
  bodyEn,
}: {
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
}) {
  const students = await prisma.user.findMany({
    where: { role: "student" },
    select: { id: true },
  });

  if (students.length === 0) return;

  await prisma.notification.createMany({
    data: students.map((s) => ({ userId: s.id, titleAr, titleEn, bodyAr, bodyEn })),
  });
}
