import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { startCaseAttempt } from "@/lib/clinical-cases/queries";
import { getServerLocale } from "@/lib/i18n/get-locale";

/** Starts a new attempt for a published clinical case. */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ip = clientIpFrom(_req.headers);
  const rl = checkRateLimit(`clinical-case-attempt:${ip}`, { limit: 20, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const { slug } = await params;
  const locale = await getServerLocale();
  const attempt = await startCaseAttempt(user.id, slug, locale);
  if (!attempt) return NextResponse.json({ error: "notFound" }, { status: 404 });

  return NextResponse.json({ attemptId: attempt.id });
}
