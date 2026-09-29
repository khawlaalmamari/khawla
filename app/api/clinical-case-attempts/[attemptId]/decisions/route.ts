import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { recordClinicalDecision } from "@/lib/clinical-cases/queries";
import { recordDecisionSchema } from "@/lib/clinical-cases/schemas";

/**
 * Records a student's choice at a Phase 3E branching decision point. The
 * only client input is which decision point and option were chosen — the
 * explanation text always comes from the case's own server-side data via
 * recordClinicalDecision, which also enforces ownership, active status,
 * that the decision's trigger assessment was genuinely performed in this
 * attempt, and that it hasn't already been answered.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`clinical-case-decision:${ip}`, { limit: 30, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const { attemptId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = recordDecisionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const locale = await getServerLocale();
  const result = await recordClinicalDecision(
    attemptId,
    user.id,
    parsed.data.decisionId,
    parsed.data.optionId,
    locale,
  );

  if ("error" in result) {
    const status = result.error === "notFound" ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(result);
}
