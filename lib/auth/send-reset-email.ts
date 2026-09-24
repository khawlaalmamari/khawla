import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { passwordResetEmail } from "@/lib/email/templates";

const RESET_TOKEN_TTL_MINUTES = 30;

/**
 * Creates a password-reset token and emails it to the user. Shared by the
 * forgot-password flow, the login-lockout flow (3 failed attempts), and an
 * admin sending a student a reset link, so all three send the exact same
 * reset link/email shape. `reason` adjusts the email copy: "lockout"
 * explains the account was suspended automatically, "admin" explains an
 * admin triggered it on the student's behalf, "requested" (default)
 * reflects a voluntary forgot-password request.
 */
export async function sendPasswordResetEmail(
  user: { id: string; email: string; fullName: string },
  origin: string,
  reason: "requested" | "lockout" | "admin" = "requested",
): Promise<{ devResetUrl?: string }> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({ data: { userId: user.id, token, expiresAt } });

  const resetUrl = `${origin}/reset-password?token=${token}`;

  let sent = false;
  try {
    const { subject, html } = passwordResetEmail({
      fullName: user.fullName,
      resetUrl,
      minutes: RESET_TOKEN_TTL_MINUTES,
      reason,
    });
    const result = await sendEmail({ to: user.email, subject, html });
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
