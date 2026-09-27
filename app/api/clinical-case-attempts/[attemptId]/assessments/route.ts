import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { requestAssessment } from "@/lib/clinical-cases/queries";
import { requestAssessmentSchema } from "@/lib/clinical-cases/schemas";

/**
 * Requests a vital-signs or physical-examination result for an attempt
 * (Step 5). The only client input is which assessment type to request —
 * the result itself always comes from the case's own server-side data via
 * requestAssessment, which also enforces ownership, active status, and
 * that this specific case supports the requested type.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`clinical-case-assessment:${ip}`, { limit: 60, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const { attemptId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = requestAssessmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const locale = await getServerLocale();
  const result = await requestAssessment(attemptId, user.id, parsed.data.type, locale);

  if ("error" in result) {
    const status = result.error === "notFound" ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(result);
}
