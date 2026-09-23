import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const schema = z.object({
  courseId: z.string(),
  moduleId: z.string(),
  date: z.string(), // YYYY-MM-DD
  time: z.string(), // HH:MM
  durationMinutes: z.number().int().min(15).max(480),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { courseId, moduleId, date, time, durationMinutes } = parsed.data;
  const scheduledFor = new Date(`${date}T${time}:00`);
  if (Number.isNaN(scheduledFor.getTime())) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const [course, mod] = await Promise.all([
    prisma.course.findUnique({ where: { id: courseId } }),
    prisma.module.findUnique({ where: { id: moduleId } }),
  ]);
  if (!course || !mod || mod.courseId !== courseId) {
    return NextResponse.json({ error: "notFound" }, { status: 404 });
  }

  let plan = await prisma.studyPlan.findFirst({ where: { userId: user.id, courseId } });
  if (!plan) {
    plan = await prisma.studyPlan.create({
      data: {
        userId: user.id,
        courseId,
        examDate: scheduledFor,
        dailyHours: durationMinutes / 60,
      },
    });
  }

  const session = await prisma.studySession.create({
    data: { studyPlanId: plan.id, moduleId, scheduledFor, durationMinutes },
  });

  const formatted = scheduledFor.toLocaleString();
  await prisma.notification.create({
    data: {
      userId: user.id,
      titleEn: "Study session scheduled",
      titleAr: "تم جدولة جلسة مذاكرة",
      bodyEn:
        `Your session for "${mod.titleEn}" is set for ${formatted}. ` +
        `A reminder banner will appear on your dashboard when it's time (no email provider is connected yet, so no email reminder is sent).`,
      bodyAr:
        `تم تحديد موعد جلستك لموديل "${mod.titleAr}" في ${formatted}. ` +
        `سيظهر تذكير على لوحة التحكم عند حلول الموعد (لم يتم ربط مزوّد بريد إلكتروني بعد، لذا لن يصلك تذكير عبر البريد).`,
    },
  });

  return NextResponse.json({ session });
}
