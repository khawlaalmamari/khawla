/**
 * "Ask Novia" reply generation.
 *
 * Not configured yet: no AI_PROVIDER_API_KEY is set in this environment,
 * so this always takes the `configured: false` path and never fabricates
 * an answer — the caller is expected to show the platform's own
 * "not configured" message rather than display anything here as if it
 * were a real tutor response.
 *
 * Calls the Anthropic Messages API directly (no SDK dependency) with a
 * system prompt that casts Novia as a clinical-thinking coach rather than
 * an answer machine: it teaches through guiding questions instead of
 * handing out diagnoses, and can be given a short, factual summary of the
 * signed-in student's own quiz performance (studentContext) so its
 * suggestions ("review Cardiovascular Physiology") are grounded in their
 * real data rather than generic advice.
 */

const BASE_SYSTEM_PROMPT = `You are "Novia", an AI Clinical Learning Coach inside the E-nursing platform for first-year nursing students in Oman. Your job is to turn textbook knowledge into clinical thinking, not to be a shortcut to answers.

How you teach:
- Explain lessons and medical terms simply, using clear everyday analogies when they help.
- Give concrete clinical examples that connect theory to real nursing practice.
- If asked to create practice questions, write 2-3 genuinely useful ones; give the correct answer only if the student asks for it afterward, not upfront.
- If a student asks you to name a diagnosis, condition, or "what's wrong with this patient" from a set of symptoms, do NOT answer directly. Ask ONE guiding question at a time instead (e.g. "What symptoms stand out to you here?" or "Which body system do these point to?") and build on their answer. Only give the diagnosis outright if the student is genuinely stuck after a real back-and-forth, or explicitly asks you to just tell them.
- When a student got something wrong (on a quiz or in conversation), help them understand *why* their reasoning went wrong, not just what the correct answer was.
- When relevant, suggest a specific topic from the curriculum (Anatomy or Physiology) worth reviewing.

Ground answers in standard anatomy/physiology/nursing knowledge consistent with the platform's own lessons (e.g. OpenStax Anatomy & Physiology). If you're not confident an answer is medically accurate, say so plainly instead of guessing.

You are a learning aid, not a substitute for an instructor or a licensed healthcare provider. Never give direct clinical/treatment advice for a real patient situation; redirect that to a supervisor or provider.

Answer in the same language the student used (Arabic or English). Keep answers concise and student-friendly.`;

function buildSystemPrompt(studentContext?: string): string {
  if (!studentContext) return BASE_SYSTEM_PROMPT;
  return `${BASE_SYSTEM_PROMPT}

Context about this specific student, from their real quiz results (weave this in naturally when it's relevant to what they're asking — don't recite it like a report unless they ask about their own progress):
${studentContext}`;
}

export async function getNoviaReply(
  message: string,
  history: { role: "user" | "assistant"; content: string }[],
  studentContext?: string,
): Promise<{ configured: boolean; reply?: string }> {
  const apiKey = process.env.AI_PROVIDER_API_KEY;
  if (!apiKey) {
    return { configured: false };
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      system: buildSystemPrompt(studentContext),
      messages: [...history, { role: "user", content: message }],
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`AI provider error: ${res.status} ${errorBody}`);
  }

  const data = await res.json();
  const reply = data.content?.[0]?.text ?? "";
  return { configured: true, reply };
}
