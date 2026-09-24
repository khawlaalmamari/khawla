import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendVerificationCode } from "@/lib/auth/send-verification-code";

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`resend-verify:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  // A 30s cooldown per email, checked before we even look the account up, so
  // its presence/timing can't be used to tell whether the email is
  // registered.
  const cooldown = checkRateLimit(`resend-verify-cooldown:${email}`, {
    limit: 1,
    windowMs: 30 * 1000,
  });
  if (!cooldown.allowed) {
    return NextResponse.json(
      { error: "cooldown", retryAfterMs: cooldown.retryAfterMs },
      { status: 429 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond the same way, whether or not the account exists or is
  // already verified, so the endpoint can't be used to enumerate accounts.
  if (!user || user.emailVerified) {
    return NextResponse.json({ ok: true });
  }

  const { devCode } = await sendVerificationCode(user);

  return NextResponse.json({ ok: true, ...(devCode ? { devVerifyCode: devCode } : {}) });
}
