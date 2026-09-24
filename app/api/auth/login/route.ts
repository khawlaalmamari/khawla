import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/send";
import { failedLoginAlertEmail, newDeviceLoginAlertEmail } from "@/lib/email/templates";
import { sendPasswordResetEmail } from "@/lib/auth/send-reset-email";
import {
  isCurrentlyLocked,
  minutesUntilUnlock,
  recordFailedAttempt,
  recordSuccessfulLogin,
} from "@/lib/auth/login-guard";

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`login:${ip}`, { limit: 20, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { identifier, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
  });

  // Constant response shape whether or not the account exists, to avoid
  // leaking which identifiers are registered.
  if (!user) {
    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  if (isCurrentlyLocked(user)) {
    return NextResponse.json(
      { error: "accountLocked", minutes: minutesUntilUnlock(user) },
      { status: 423 },
    );
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    const { lockedNow, email, fullName } = await recordFailedAttempt(user.id, ip);

    if (lockedNow) {
      await sendPasswordResetEmail({ id: user.id, email, fullName }, req.nextUrl.origin, "lockout");
    } else {
      try {
        const { subject, html } = failedLoginAlertEmail({
          fullName,
          secureAccountUrl: `${req.nextUrl.origin}/forgot-password`,
        });
        await sendEmail({ to: email, subject, html });
      } catch (err) {
        console.error("[email] Failed to send failed-login alert:", err);
      }
    }

    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  if (!user.emailVerified) {
    return NextResponse.json({ error: "emailNotVerified" }, { status: 403 });
  }

  const { isNewDevice } = await recordSuccessfulLogin(user.id, ip);
  await createSession(user.id);

  if (isNewDevice) {
    try {
      const { subject, html } = newDeviceLoginAlertEmail({
        fullName: user.fullName,
        ip,
        time: new Date().toLocaleString("ar-OM", { dateStyle: "medium", timeStyle: "short" }),
        secureAccountUrl: `${req.nextUrl.origin}/forgot-password`,
      });
      await sendEmail({ to: user.email, subject, html });
    } catch (err) {
      console.error("[email] Failed to send new-device login alert:", err);
    }
  }

  return NextResponse.json({
    user: { id: user.id, fullName: user.fullName, username: user.username },
  });
}
