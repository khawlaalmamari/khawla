/**
 * Optional guiding feedback on a student's own post-attempt reflection
 * (DebriefReflection). Deliberately NOT a correctness verdict: the
 * reflection has no single right answer, and this project's clinical-
 * reasoning/reflection sections are intentionally non-evaluative (see
 * types.ts) so students feel safe writing an honest reflection rather than
 * a "correct-sounding" one.
 *
 * Grounded only in two things the caller provides: the student's own
 * reflection text, and this specific case's own authored expert debriefing
 * (hiddenData.debriefing — never previously surfaced to students). Never
 * invents new clinical facts beyond those. Gated on AI_PROVIDER_API_KEY,
 * same pattern as lib/novia/reply.ts and lib/clinical-cases/ai-patient.ts;
 * unconfigured or a failed call simply means no AI guidance is returned —
 * callers still have the deterministic expert debriefing on its own.
 */

import type { DebriefReflection } from "./types";

const SYSTEM_PROMPT = `You are a supportive nursing clinical-education coach reviewing a student's own post-simulation reflection. You are NOT a grader: never say the student's reflection is "correct," "incorrect," "right," or "wrong," and never assign a score.

You are given two things:
1. The student's own reflection (their own words, in 4 parts: most important findings, additional information they wanted, what they'd reassess, what they'd do differently).
2. The case's own expert-authored debriefing summary (the "official" takeaway for this case).

Your job:
- Point out genuine connections between what the student wrote and the expert summary — where their thinking aligns.
- Where the expert summary raises something the student's reflection didn't touch on, mention it gently as something worth thinking about further, phrased as an observation or a guiding question — never as an error or something they got "wrong".
- Ask at most one or two guiding questions to deepen their thinking, in the same spirit as a clinical instructor's debrief conversation.
- Keep it warm, specific to what they actually wrote, and encouraging. 3-6 sentences total.
- Never invent clinical facts, symptoms, or details beyond what's in the expert summary and the student's own reflection.
- Reply in the same language as the reflection text (Arabic or English).`;

function formatReflection(r: Omit<DebriefReflection, "updatedAt">): string {
  return [
    `Most important findings: ${r.mostImportantFindings || "(left blank)"}`,
    `Additional information wanted: ${r.additionalInformationWanted || "(left blank)"}`,
    `What they'd reassess: ${r.whatToReassess || "(left blank)"}`,
    `What they'd do differently: ${r.whatToDoDifferently || "(left blank)"}`,
  ].join("\n");
}

export async function getReflectionGuidance(
  reflection: Omit<DebriefReflection, "updatedAt">,
  expertDebriefing: string,
): Promise<{ configured: boolean; guidance?: string }> {
  const apiKey = process.env.AI_PROVIDER_API_KEY;
  if (!apiKey) return { configured: false };

  const userContent = `Student's reflection:\n${formatReflection(reflection)}\n\nExpert debriefing summary for this case:\n${expertDebriefing}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userContent }],
      }),
    });

    if (!res.ok) return { configured: true };

    const data = await res.json();
    const guidance: string = data.content?.[0]?.text ?? "";
    if (!guidance.trim()) return { configured: true };
    return { configured: true, guidance };
  } catch {
    return { configured: true };
  }
}
