import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { sendPasswordResetEmail } from "@/lib/auth/send-reset-email";

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
  if (!user) return NextResponse.json({ ok: true });

  const { devResetUrl } = await sendPasswordResetEmail(user, req.nextUrl.origin);

  return NextResponse.json({ ok: true, ...(devResetUrl ? { devResetUrl } : {}) });
}
