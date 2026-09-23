/**
 * Minimal SendGrid integration (plain fetch, no SDK dependency).
 * Returns { sent: false } when SENDGRID_API_KEY isn't set, so callers can
 * fall back to the dev-mode console link/notification instead of failing.
 *
 * Uses SendGrid's Single Sender Verification, which lets EMAIL_FROM send to
 * any recipient without owning/verifying a whole domain.
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
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return { sent: false };

  const fromRaw = process.env.EMAIL_FROM || "E-nursing <no-reply@example.com>";
  const match = fromRaw.match(/^(.*)<(.+)>$/);
  const fromEmail = (match ? match[2] : fromRaw).trim();
  const fromName = match?.[1]?.trim();

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: fromName ? { email: fromEmail, name: fromName } : { email: fromEmail },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SendGrid request failed: ${res.status} ${body}`);
  }

  return { sent: true };
}
