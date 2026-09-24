import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { studyReminderEmail, SITE_ORIGIN } from "@/lib/email/templates";

const OMAN_UTC_OFFSET_HOURS = 4;
const DAILY_MIN_GAP_MS = 20 * 60 * 60 * 1000; // 20h: allows next day, blocks re-fires same hour
const WEEKLY_MIN_GAP_MS = 6.5 * 24 * 60 * 60 * 1000;

/**
 * Vercel Cron target: sends each student's chosen daily/weekly study-plan
 * email reminder. Vercel automatically sends `Authorization: Bearer
 * ${CRON_SECRET}` on cron-triggered requests when CRON_SECRET is set — see
 * .env.example. This route refuses to run at all if that isn't configured,
 * rather than running unauthenticated.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "cronNotConfigured" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const omanNow = new Date(Date.now() + OMAN_UTC_OFFSET_HOURS * 60 * 60 * 1000);
  const omanHour = omanNow.getUTCHours();
  const omanWeekday = omanNow.getUTCDay();

  const plans = await prisma.studyPlan.findMany({
    where: { reminderHour: omanHour },
    include: { user: { select: { email: true, fullName: true } }, course: true },
  });

  let sent = 0;
  let skipped = 0;

  for (const plan of plans) {
    const isWeekly = plan.reminderFrequency === "weekly";
    if (isWeekly && new Date(plan.createdAt).getUTCDay() !== omanWeekday) {
      skipped++;
      continue;
    }

    const minGap = isWeekly ? WEEKLY_MIN_GAP_MS : DAILY_MIN_GAP_MS;
    if (plan.lastReminderSentAt && Date.now() - plan.lastReminderSentAt.getTime() < minGap) {
      skipped++;
      continue;
    }

    const { subject, html } = studyReminderEmail({
      fullName: plan.user.fullName,
      courseName: plan.course.titleAr,
      dailyHours: plan.dailyHours,
      studyPlannerUrl: `${SITE_ORIGIN || ""}/study-planner`,
    });

    try {
      const result = await sendEmail({ to: plan.user.email, subject, html });
      if (result.sent) sent++;
    } catch (err) {
      console.error("[cron] Failed to send study reminder:", err);
    }

    await prisma.studyPlan.update({
      where: { id: plan.id },
      data: { lastReminderSentAt: new Date() },
    });
  }

  return NextResponse.json({ ok: true, checked: plans.length, sent, skipped });
}
