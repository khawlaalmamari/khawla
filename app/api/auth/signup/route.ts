import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { signupSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`signup:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { fullName, username, email, password, locale } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: { email: true, username: true },
  });

  if (existing) {
    const field = existing.email === email ? "emailTaken" : "usernameTaken";
    return NextResponse.json({ error: field }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const emailVerifyToken = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: { fullName, username, email, passwordHash, locale, emailVerifyToken },
  });

  await createSession(user.id);

  const verifyUrl = `${req.nextUrl.origin}/api/auth/verify-email?token=${emailVerifyToken}`;

  let emailSent = false;
  try {
    const result = await sendEmail({
      to: user.email,
      subject: "Verify your E-nursing email / فعّل بريدك الإلكتروني",
      html: `
        <p>Hi ${user.fullName},</p>
        <p>Click the link below to verify your E-nursing account.</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <hr />
        <p dir="rtl">مرحبًا ${user.fullName}،</p>
        <p dir="rtl">اضغط على الرابط أعلاه لتفعيل حسابك في منصة E-nursing.</p>
      `,
    });
    emailSent = result.sent;
  } catch (err) {
    console.error("[email] Failed to send verification email:", err);
  }

  // No email provider configured (or sending failed). In development we log
  // the link so the flow is testable; in production this must never leak
  // the link outside of an actual email.
  if (!emailSent && process.env.NODE_ENV !== "production") {
    console.log(`[dev] Email verification link for ${user.email}: ${verifyUrl}`);
  }

  await prisma.notification.create({
    data: {
      userId: user.id,
      titleEn: "Verify your email",
      titleAr: "فعّل بريدك الإلكتروني",
      bodyEn: emailSent
        ? "Please check your inbox for a verification link."
        : process.env.NODE_ENV !== "production"
          ? `Email sending isn't configured yet. For now, the verification link was printed to the server console: ${verifyUrl}`
          : "Please check your inbox for a verification link.",
      bodyAr: emailSent
        ? "يرجى التحقق من بريدك الإلكتروني للحصول على رابط التفعيل."
        : process.env.NODE_ENV !== "production"
          ? `لم يتم إعداد إرسال البريد الإلكتروني بعد. تم طباعة رابط التفعيل في سجل الخادم: ${verifyUrl}`
          : "يرجى التحقق من بريدك الإلكتروني للحصول على رابط التفعيل.",
    },
  });

  return NextResponse.json({
    user: { id: user.id, fullName: user.fullName, username: user.username },
    ...(!emailSent && process.env.NODE_ENV !== "production" ? { devVerifyUrl: verifyUrl } : {}),
  });
}
