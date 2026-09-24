import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { studyReminderEmail, examReminderEmail, SITE_ORIGIN } from "@/lib/email/templates";

const OMAN_UTC_OFFSET_HOURS = 4;
const DAILY_MIN_GAP_MS = 20 * 60 * 60 * 1000; // 20h: allows next day, blocks re-fires same hour
const WEEKLY_MIN_GAP_MS = 6.5 * 24 * 60 * 60 * 1000;

/**
 * Vercel Cron target: sends each student's chosen daily/weekly study-plan
 * email reminder. Vercel automatically sends `Authorization: Bearer
 * ${CRON_SECRET}` on cron-triggered requests when CRON_SECRET is set — see
 * .env.example. This route refuses to run at all if that isn't configured,
 * rather than running unauthenticated.
 *
 * vercel.json schedules this once a day (Hobby plan limit) at a single
 * fixed hour, so only plans whose reminderHour matches that run actually
 * get an email — see .env.example's CRON_SECRET comment for the full
 * explanation and what changes once the project is on a paid plan.
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

  // Separate concern, same daily run: a one-time "your exam is tomorrow"
  // email + in-app alert, independent of each plan's own reminder settings.
  const omanToday = new Date(Date.UTC(omanNow.getUTCFullYear(), omanNow.getUTCMonth(), omanNow.getUTCDate()));
  const examPlans = await prisma.studyPlan.findMany({
    where: { examReminderSentAt: null },
    include: { user: { select: { id: true, email: true, fullName: true } }, course: true },
  });

  let examRemindersSent = 0;

  for (const plan of examPlans) {
    const examDay = new Date(
      Date.UTC(plan.examDate.getUTCFullYear(), plan.examDate.getUTCMonth(), plan.examDate.getUTCDate()),
    );
    const daysUntilExam = Math.round((examDay.getTime() - omanToday.getTime()) / 86_400_000);
    if (daysUntilExam !== 1) continue;

    const { subject, html } = examReminderEmail({
      fullName: plan.user.fullName,
      courseName: plan.course.titleAr,
      siteUrl: SITE_ORIGIN || "",
    });

    try {
      const result = await sendEmail({ to: plan.user.email, subject, html });
      if (result.sent) examRemindersSent++;
    } catch (err) {
      console.error("[cron] Failed to send exam reminder email:", err);
    }

    await prisma.notification.create({
      data: {
        userId: plan.user.id,
        type: "exam_reminder",
        titleAr: "تذكير باختبار الغد",
        titleEn: "Tomorrow's exam reminder",
        bodyAr: `غدًا موعد اختبارك في مادة ${plan.course.titleAr}، كل التوفيق لك! 🌟`,
        bodyEn: `Tomorrow is your ${plan.course.titleEn} exam — good luck! 🌟`,
      },
    });

    await prisma.studyPlan.update({
      where: { id: plan.id },
      data: { examReminderSentAt: new Date() },
    });
  }

  return NextResponse.json({
    ok: true,
    checked: plans.length,
    sent,
    skipped,
    examRemindersChecked: examPlans.length,
    examRemindersSent,
  });
}
