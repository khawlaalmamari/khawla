import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";

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
    const result = await sendEmail({
      to: user.email,
      subject: "Your E-nursing verification code / رمز التفعيل الخاص بك",
      html: `
        <p>Hi ${user.fullName},</p>
        <p>Your E-nursing verification code is:</p>
        <p style="font-size:28px;font-weight:bold;letter-spacing:6px;">${code}</p>
        <p>This code expires in ${CODE_TTL_MINUTES} minutes.</p>
        <hr />
        <p dir="rtl">مرحبًا ${user.fullName}،</p>
        <p dir="rtl">رمز التفعيل الخاص بك في منصة E-nursing هو:</p>
        <p dir="rtl" style="font-size:28px;font-weight:bold;letter-spacing:6px;">${code}</p>
        <p dir="rtl">صلاحية الرمز ${CODE_TTL_MINUTES} دقائق.</p>
      `,
    });
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
