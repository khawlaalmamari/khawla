import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
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
    await recordFailedAttempt(user.id, ip);
    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  await recordSuccessfulLogin(user.id, ip);
  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, fullName: user.fullName, username: user.username },
  });
}
