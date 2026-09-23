import nodemailer from "nodemailer";

/**
 * Sends real email via Gmail SMTP using a Google Account App Password
 * (requires 2-Step Verification on that account). Returns { sent: false }
 * when GMAIL_USER/GMAIL_APP_PASSWORD aren't set, so callers can fall back
 * to the dev-mode console link/notification instead of failing.
 */
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean }> {
  const transport = getTransporter();
  if (!transport) return { sent: false };

  const from = process.env.EMAIL_FROM || process.env.GMAIL_USER;
  await transport.sendMail({ from, to, subject, html });

  return { sent: true };
}
