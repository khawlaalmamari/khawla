import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";

const RESET_TOKEN_TTL_MINUTES = 30;

/**
 * Creates a password-reset token and emails it to the user. Shared by the
 * forgot-password flow and the login-lockout flow (3 failed attempts), so
 * both send the exact same reset link/email shape.
 */
export async function sendPasswordResetEmail(
  user: { id: string; email: string; fullName: string },
  origin: string,
): Promise<{ devResetUrl?: string }> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({ data: { userId: user.id, token, expiresAt } });

  const resetUrl = `${origin}/reset-password?token=${token}`;

  let sent = false;
  try {
    const result = await sendEmail({
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
    sent = result.sent;
  } catch (err) {
    console.error("[email] Failed to send password reset email:", err);
  }

  if (!sent && process.env.NODE_ENV !== "production") {
    console.log(`[dev] Password reset link for ${user.email}: ${resetUrl}`);
    return { devResetUrl: resetUrl };
  }

  return {};
}
