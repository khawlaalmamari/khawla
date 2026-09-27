import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";
import { addConversationTurn } from "@/lib/clinical-cases/queries";
import { sendPatientMessageSchema } from "@/lib/clinical-cases/schemas";

/**
 * Sends a student's question to the (deterministic, offline) virtual
 * patient and persists both turns. Never trusts a client-supplied userId
 * — ownership is enforced inside addConversationTurn via the session
 * user's id, and the response never includes hiddenData.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`clinical-case-message:${ip}`, { limit: 60, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const { attemptId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = sendPatientMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const locale = await getServerLocale();
  const result = await addConversationTurn(attemptId, user.id, parsed.data.text, locale);
  if (!result) return NextResponse.json({ error: "notFound" }, { status: 404 });

  return NextResponse.json(result);
}
