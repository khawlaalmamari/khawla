import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import {
  endInterview,
  saveClinicalReasoning,
  updateAttemptNotes,
} from "@/lib/clinical-cases/queries";
import { updateAttemptSchema } from "@/lib/clinical-cases/schemas";

/** Saves clinical notes, saves clinical-reasoning notes, or ends the
 * interview and returns its summary. Ownership is enforced in every
 * query function via the session user's id. */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { attemptId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateAttemptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  if (parsed.data.action === "saveNotes") {
    const ok = await updateAttemptNotes(attemptId, user.id, parsed.data.notes);
    if (!ok) return NextResponse.json({ error: "notFound" }, { status: 404 });
    return NextResponse.json({ saved: true });
  }

  if (parsed.data.action === "saveReasoning") {
    const { keyFindings, hypotheses, supportingEvidence, missingInformation, recommendedNextAction } =
      parsed.data;
    const ok = await saveClinicalReasoning(attemptId, user.id, {
      keyFindings,
      hypotheses,
      supportingEvidence,
      missingInformation,
      recommendedNextAction,
    });
    if (!ok) return NextResponse.json({ error: "notFound" }, { status: 404 });
    return NextResponse.json({ saved: true });
  }

  const summary = await endInterview(attemptId, user.id);
  if (!summary) return NextResponse.json({ error: "notFound" }, { status: 404 });
  return NextResponse.json({ summary });
}
