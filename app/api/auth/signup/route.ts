import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { signupSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";

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

  // No email provider is configured yet (see README). In development we log
  // the link so the flow is testable; in production this must send a real
  // email instead, and the link must never be returned in the API response.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[dev] Email verification link for ${user.email}: ${verifyUrl}`);
  }

  await prisma.notification.create({
    data: {
      userId: user.id,
      titleEn: "Verify your email",
      titleAr: "فعّل بريدك الإلكتروني",
      bodyEn:
        process.env.NODE_ENV !== "production"
          ? `Email sending isn't configured yet. For now, the verification link was printed to the server console: ${verifyUrl}`
          : "Please check your inbox for a verification link.",
      bodyAr:
        process.env.NODE_ENV !== "production"
          ? `لم يتم إعداد إرسال البريد الإلكتروني بعد. تم طباعة رابط التفعيل في سجل الخادم: ${verifyUrl}`
          : "يرجى التحقق من بريدك الإلكتروني للحصول على رابط التفعيل.",
    },
  });

  return NextResponse.json({
    user: { id: user.id, fullName: user.fullName, username: user.username },
    ...(process.env.NODE_ENV !== "production" ? { devVerifyUrl: verifyUrl } : {}),
  });
}
