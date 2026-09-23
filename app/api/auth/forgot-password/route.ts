import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/send";

const RESET_TOKEN_TTL_MINUTES = 30;

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`forgot:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Always respond the same way, whether or not the account exists, so the
  // endpoint can't be used to enumerate registered emails.
  const genericResponse = NextResponse.json({ ok: true });

  if (!user) return genericResponse;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  const resetUrl = `${req.nextUrl.origin}/reset-password?token=${token}`;

  try {
    const { sent } = await sendEmail({
      to: user.email,
      subject: "Reset your E-nursing password / إعادة تعيين كلمة المرور",
      html: `
        <p>Hi ${user.fullName},</p>
        <p>Click the link below to reset your E-nursing password. This link expires in ${RESET_TOKEN_TTL_MINUTES} minutes.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <hr />
        <p dir="rtl">مرحبًا ${user.fullName}،</p>
        <p dir="rtl">اضغط على الرابط أعلاه لإعادة تعيين كلمة مرورك. صلاحية الرابط ${RESET_TOKEN_TTL_MINUTES} دقيقة.</p>
      `,
    });

    if (sent) return genericResponse;
  } catch (err) {
    console.error("[email] Failed to send password reset email:", err);
  }

  // No email provider is configured (or sending failed). In development we
  // surface the link directly so the flow stays testable; in production we
  // must never leak the link in the API response.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[dev] Password reset link for ${user.email}: ${resetUrl}`);
    return NextResponse.json({ ok: true, devResetUrl: resetUrl });
  }

  return genericResponse;
}
