/**
 * "Ask Novia" reply generation.
 *
 * Not configured yet: no AI_PROVIDER_API_KEY is set in this environment,
 * so this always takes the `configured: false` path and never fabricates
 * an answer — the caller is expected to show the platform's own
 * "not configured" message rather than display anything here as if it
 * were a real tutor response.
 *
 * When a key is added, this calls the Anthropic Messages API directly
 * (no SDK dependency) with a system prompt that keeps Novia grounded in
 * the platform's own lesson content and honest about uncertainty. This
 * path is implemented but has not been exercised end-to-end in this
 * build, since no key was available to test against.
 */

const SYSTEM_PROMPT = `You are "Novia", the learning assistant inside the E-nursing platform for first-year nursing students in Oman.
Rules:
- Answer in the same language the student used (Arabic or English).
- Ground answers in standard anatomy/physiology/nursing knowledge consistent with the platform's own lessons (e.g. OpenStax Anatomy & Physiology).
- If you are not confident an answer is medically accurate, say so plainly instead of guessing.
- You are a learning aid, not a substitute for an instructor or a licensed healthcare provider. Never give direct clinical/treatment advice for a real patient situation; redirect that to a supervisor or provider.
- Keep answers concise and student-friendly.`;

export async function getNoviaReply(
  message: string,
  history: { role: "user" | "assistant"; content: string }[],
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
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: message }],
    }),
  });

  if (!res.ok) {
    throw new Error(`AI provider error: ${res.status}`);
  }

  const data = await res.json();
  const reply = data.content?.[0]?.text ?? "";
  return { configured: true, reply };
}
