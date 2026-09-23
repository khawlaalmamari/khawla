/**
 * Minimal Resend integration (plain fetch, no SDK dependency).
 * Returns { sent: false } when RESEND_API_KEY isn't set, so callers can
 * fall back to the dev-mode console link/notification instead of failing.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false };

  const from = process.env.EMAIL_FROM || "E-nursing <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend request failed: ${res.status} ${body}`);
  }

  return { sent: true };
}
