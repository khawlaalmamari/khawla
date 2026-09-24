import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { signupSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendVerificationCode } from "@/lib/auth/send-verification-code";

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

  const user = await prisma.user.create({
    data: { fullName, username, email, passwordHash, locale },
  });

  const { devCode } = await sendVerificationCode(user);

  await prisma.notification.create({
    data: {
      userId: user.id,
      titleEn: "Verify your email",
      titleAr: "فعّل بريدك الإلكتروني",
      bodyEn: "Enter the 6-digit code we emailed you to activate your account.",
      bodyAr: "أدخل الرمز المكوّن من 6 أرقام الذي أرسلناه إلى بريدك الإلكتروني لتفعيل حسابك.",
    },
  });

  return NextResponse.json({
    pendingVerification: true,
    email: user.email,
    ...(devCode ? { devVerifyCode: devCode } : {}),
  });
}
