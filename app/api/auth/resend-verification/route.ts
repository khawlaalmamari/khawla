import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/send";

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

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Always respond the same way, whether or not the account exists or is
  // already verified, so the endpoint can't be used to enumerate accounts.
  const genericResponse = NextResponse.json({ ok: true });

  if (!user || user.emailVerified) return genericResponse;

  const emailVerifyToken = crypto.randomBytes(32).toString("hex");
  await prisma.user.update({ where: { id: user.id }, data: { emailVerifyToken } });

  const verifyUrl = `${req.nextUrl.origin}/api/auth/verify-email?token=${emailVerifyToken}`;

  try {
    const { sent } = await sendEmail({
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
    if (sent) return genericResponse;
  } catch (err) {
    console.error("[email] Failed to resend verification email:", err);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(`[dev] Email verification link for ${user.email}: ${verifyUrl}`);
    return NextResponse.json({ ok: true, devVerifyUrl: verifyUrl });
  }

  return genericResponse;
}
