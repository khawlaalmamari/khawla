import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { verificationCodeEmail } from "@/lib/email/templates";

const CODE_TTL_MINUTES = 10;

/**
 * Generates a 6-digit email verification code, stores it (resetting the
 * failed-attempt counter), and emails it. Shared by signup and the
 * resend-code endpoint so both produce the exact same code/email shape.
 */
export async function sendVerificationCode(user: {
  id: string;
  email: string;
  fullName: string;
}): Promise<{ devCode?: string }> {
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerifyCode: code, emailVerifyCodeExpiresAt: expiresAt, emailVerifyAttempts: 0 },
  });

  let sent = false;
  try {
    const { subject, html } = verificationCodeEmail({
      fullName: user.fullName,
      code,
      minutes: CODE_TTL_MINUTES,
    });
    const result = await sendEmail({ to: user.email, subject, html });
    sent = result.sent;
  } catch (err) {
    console.error("[email] Failed to send verification code:", err);
  }

  if (!sent && process.env.NODE_ENV !== "production") {
    console.log(`[dev] Verification code for ${user.email}: ${code}`);
    return { devCode: code };
  }

  return {};
}
