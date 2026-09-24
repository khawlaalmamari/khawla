import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { verifyCodeSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/send";
import { welcomeEmail } from "@/lib/email/templates";

const MAX_CODE_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`verify-code:${ip}`, { limit: 15, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = verifyCodeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalidCode" }, { status: 400 });
  }

  const { email, code } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "invalidCode" }, { status: 400 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ ok: true, alreadyVerified: true });
  }

  if (user.emailVerifyAttempts >= MAX_CODE_ATTEMPTS) {
    return NextResponse.json({ error: "tooManyAttempts" }, { status: 429 });
  }

  if (
    !user.emailVerifyCode ||
    !user.emailVerifyCodeExpiresAt ||
    user.emailVerifyCodeExpiresAt.getTime() < Date.now()
  ) {
    return NextResponse.json({ error: "expiredCode" }, { status: 400 });
  }

  if (user.emailVerifyCode !== code) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerifyAttempts: { increment: 1 } },
    });
    return NextResponse.json({ error: "invalidCode" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerifyCode: null,
      emailVerifyCodeExpiresAt: null,
      emailVerifyAttempts: 0,
    },
  });

  await createSession(user.id);

  try {
    const { subject, html } = welcomeEmail({
      fullName: user.fullName,
      loginUrl: `${req.nextUrl.origin}/dashboard`,
    });
    await sendEmail({ to: user.email, subject, html });
  } catch (err) {
    console.error("[email] Failed to send welcome email:", err);
  }

  return NextResponse.json({ ok: true });
}
