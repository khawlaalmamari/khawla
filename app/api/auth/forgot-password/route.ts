import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";

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

  // No email provider is configured yet (see README). In development we
  // surface the link directly so the flow is testable end to end; in
  // production this must be replaced with an actual email send and the
  // link must never be returned in the API response.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[dev] Password reset link for ${user.email}: ${resetUrl}`);
    return NextResponse.json({ ok: true, devResetUrl: resetUrl });
  }

  return genericResponse;
}
