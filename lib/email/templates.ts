// Shared, brand-consistent HTML email templates. Every automated email the
// platform sends (verification code, welcome, password reset, security
// alerts) is built from the same responsive shell so they look and read as
// one professional, trustworthy system rather than ad-hoc snippets.

const BRAND_NAME = "E-nursing";
const BRAND_TAGLINE = "منصة التعليم التمريضي الذكية";
const SUPPORT_EMAIL = "khawlaalmamari5@gmail.com";

const COLOR_PRIMARY = "#0f766e";
const COLOR_PRIMARY_DARK = "#134e4a";
const COLOR_PRIMARY_LIGHT = "#f0fdfa";
const COLOR_ACCENT = "#b45309";
const COLOR_DANGER = "#b91c1c";
const COLOR_TEXT = "#1e293b";
const COLOR_MUTED = "#64748b";

// Resolves automatically on Vercel (no configuration needed): prefers the
// project's stable production domain (VERCEL_PROJECT_PRODUCTION_URL, e.g.
// "khawla-two.vercel.app") over the per-deployment VERCEL_URL, which can
// point at a build-specific URL instead of the live site. An explicit
// NEXT_PUBLIC_SITE_URL (e.g. a custom domain) always wins. Emails fall back
// to a plain text mark when none of these are available (local dev).
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
const LOGO_URL = SITE_ORIGIN ? `${SITE_ORIGIN}/brand/logo-email.png` : null;

function button(url: string, label: string, color: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px auto 20px;">
      <tr>
        <td style="border-radius:10px;background-color:${color};">
          <a href="${url}" style="display:inline-block;padding:14px 34px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:10px;">${label}</a>
        </td>
      </tr>
    </table>`;
}

function noteBox(text: string, accentColor: string, textColor: string, bgColor: string): string {
  return `
    <p style="margin:0 0 16px;background-color:${bgColor};border-right:4px solid ${accentColor};padding:12px 16px;border-radius:8px;color:${textColor};font-size:13px;line-height:1.8;">
      ${text}
    </p>`;
}

/**
 * Wraps a block of content HTML in the shared responsive email shell:
 * logo/header band, white content card, and a footer with a support
 * contact and copyright line. `headerColor` lets security-related emails
 * use a warning color instead of the default brand teal.
 */
function emailShell({
  contentHtml,
  preheader,
  headerColor = COLOR_PRIMARY,
}: {
  contentHtml: string;
  preheader: string;
  headerColor?: string;
}): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${BRAND_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Tahoma,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background-color:${headerColor};padding:28px 32px;text-align:center;">
              ${
                LOGO_URL
                  ? `<img src="${LOGO_URL}" width="48" height="48" alt="${BRAND_NAME}" style="display:block;margin:0 auto 12px;border-radius:12px;" />`
                  : `<div style="width:48px;height:48px;background-color:#ffffff;border-radius:12px;margin:0 auto 12px;line-height:48px;font-size:22px;font-weight:bold;color:${headerColor};font-family:Tahoma,Arial,sans-serif;">E</div>`
              }
              <div style="font-size:20px;font-weight:bold;color:#ffffff;">${BRAND_NAME}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.9);margin-top:2px;">${BRAND_TAGLINE}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:${COLOR_TEXT};font-size:15px;line-height:1.9;text-align:right;">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 6px;font-size:12px;color:${COLOR_MUTED};">
                للمساعدة أو الاستفسار، يسعد فريق الدعم الفني بخدمتكم عبر
                <a href="mailto:${SUPPORT_EMAIL}" style="color:${COLOR_PRIMARY};text-decoration:none;">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">© ${year} ${BRAND_NAME}. جميع الحقوق محفوظة.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function signOff(): string {
  return `<p style="margin:24px 0 0;">مع خالص التقدير،<br /><strong>فريق ${BRAND_NAME}</strong></p>`;
}

export function verificationCodeEmail({
  fullName,
  code,
  minutes,
}: {
  fullName: string;
  code: string;
  minutes: number;
}): { subject: string; html: string } {
  const content = `
    <p style="margin:0 0 4px;font-size:16px;">عزيزنا <strong>${fullName}</strong>،</p>
    <p style="margin:0 0 20px;color:${COLOR_MUTED};">نشكر لك انضمامك إلى منصة ${BRAND_NAME}. لإتمام عملية تفعيل حسابك، يرجى استخدام رمز التحقق التالي:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <div style="display:inline-block;background-color:${COLOR_PRIMARY_LIGHT};border:1px dashed ${COLOR_PRIMARY};border-radius:12px;padding:16px 32px;margin:4px 0 20px;">
            <span style="font-size:32px;font-weight:bold;letter-spacing:10px;color:${COLOR_PRIMARY_DARK};direction:ltr;display:inline-block;">${code}</span>
          </div>
        </td>
      </tr>
    </table>
    ${noteBox(`لأسباب أمنية، صلاحية هذا الرمز <strong>${minutes} دقائق</strong> فقط من وقت إرساله، ولا يمكن استخدامه بعد ذلك.`, COLOR_ACCENT, "#78350f", "#fffbeb")}
    <p style="margin:0;color:${COLOR_MUTED};font-size:13px;">إذا لم تكن أنت من طلب إنشاء هذا الحساب، فيمكنك تجاهل هذه الرسالة بأمان دون اتخاذ أي إجراء.</p>
    ${signOff()}`;

  return {
    subject: `رمز التحقق الخاص بك — ${BRAND_NAME}`,
    html: emailShell({ contentHtml: content, preheader: `رمز التحقق الخاص بك هو ${code}` }),
  };
}

export function welcomeEmail({
  fullName,
  loginUrl,
}: {
  fullName: string;
  loginUrl: string;
}): { subject: string; html: string } {
  const content = `
    <p style="margin:0 0 4px;font-size:16px;">عزيزنا <strong>${fullName}</strong>،</p>
    <p style="margin:0 0 16px;color:${COLOR_MUTED};">يسرّنا إبلاغك بأنّه قد تم تفعيل حسابك بنجاح على منصة ${BRAND_NAME}. نرحب بانضمامك إلى مجتمعنا التعليمي المخصص لطلاب التمريض.</p>
    <p style="margin:0 0 20px;color:${COLOR_MUTED};">بإمكانك الآن الاستفادة من جميع المقررات والدروس والاختبارات التفاعلية المتاحة على المنصة لدعم مسيرتك الأكاديمية والمهنية.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">${button(loginUrl, "ابدأ رحلتك التعليمية الآن", COLOR_PRIMARY)}</td></tr>
    </table>
    <p style="margin:0;color:${COLOR_MUTED};font-size:13px;">في حال واجهتك أي صعوبة في الدخول إلى حسابك، فإن فريق الدعم الفني على أتم الاستعداد لمساعدتك في أي وقت.</p>
    ${signOff()}`;

  return {
    subject: `مرحبًا بك في منصة ${BRAND_NAME}`,
    html: emailShell({ contentHtml: content, preheader: "تم تفعيل حسابك بنجاح" }),
  };
}

export function passwordResetEmail({
  fullName,
  resetUrl,
  minutes,
  reason = "requested",
}: {
  fullName: string;
  resetUrl: string;
  minutes: number;
  reason?: "requested" | "lockout" | "admin";
}): { subject: string; html: string } {
  const intro =
    reason === "lockout"
      ? `نظرًا لرصد عدة محاولات دخول فاشلة على حسابك، تم تعليقه مؤقتًا حفاظًا على أمانه. لإعادة تفعيل الحساب، يرجى إعادة تعيين كلمة المرور عبر الزر أدناه:`
      : reason === "admin"
        ? `قام فريق الإدارة في منصة ${BRAND_NAME} بإرسال رابط إعادة تعيين كلمة المرور لحسابك بناءً على طلب دعم فني. إذا كنت تواجه صعوبة في الدخول إلى حسابك، يرجى الضغط على الزر أدناه لتعيين كلمة مرور جديدة:`
        : `وردنا طلب لإعادة تعيين كلمة المرور الخاصة بحسابك على منصة ${BRAND_NAME}. لإتمام هذه العملية، يرجى الضغط على الزر أدناه:`;
  const headerColor = reason === "requested" ? COLOR_PRIMARY : COLOR_ACCENT;

  const content = `
    <p style="margin:0 0 4px;font-size:16px;">عزيزنا <strong>${fullName}</strong>،</p>
    <p style="margin:0 0 16px;color:${COLOR_MUTED};">${intro}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">${button(resetUrl, "إعادة تعيين كلمة المرور", COLOR_PRIMARY)}</td></tr>
    </table>
    ${noteBox(`لأسباب أمنية، ستنتهي صلاحية هذا الرابط بعد <strong>${minutes} دقيقة</strong> من وقت إرساله، ولا يمكن استخدامه أكثر من مرة واحدة.`, COLOR_ACCENT, "#78350f", "#fffbeb")}
    <p style="margin:0 0 8px;color:${COLOR_MUTED};font-size:13px;">إذا لم تطلب إعادة تعيين كلمة المرور، فلا داعي لاتخاذ أي إجراء، ويمكنك تجاهل هذه الرسالة بأمان.</p>
    <p style="margin:0;color:#94a3b8;font-size:12px;word-break:break-all;">في حال تعذّر الضغط على الزر أعلاه، يمكنك نسخ الرابط التالي ولصقه في متصفحك:<br /><a href="${resetUrl}" style="color:${COLOR_PRIMARY};">${resetUrl}</a></p>
    ${signOff()}`;

  return {
    subject: `طلب إعادة تعيين كلمة المرور — ${BRAND_NAME}`,
    html: emailShell({ contentHtml: content, preheader: "طلب إعادة تعيين كلمة المرور", headerColor }),
  };
}

export function newDeviceLoginAlertEmail({
  fullName,
  ip,
  time,
  secureAccountUrl,
}: {
  fullName: string;
  ip: string;
  time: string;
  secureAccountUrl: string;
}): { subject: string; html: string } {
  const content = `
    <p style="margin:0 0 4px;font-size:16px;">عزيزنا <strong>${fullName}</strong>،</p>
    <p style="margin:0 0 16px;color:${COLOR_MUTED};">رصدنا تسجيل دخول ناجحًا إلى حسابك على منصة ${BRAND_NAME} من جهاز أو موقع لم يُستخدم من قبل مع حسابك. فيما يلي تفاصيل عملية الدخول:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:10px;margin:0 0 16px;">
      <tr><td style="padding:14px 18px;font-size:13px;color:${COLOR_TEXT};border-bottom:1px solid #e2e8f0;"><strong>التاريخ والوقت:</strong> ${time}</td></tr>
      <tr><td style="padding:14px 18px;font-size:13px;color:${COLOR_TEXT};"><strong>عنوان الشبكة (IP):</strong> ${ip}</td></tr>
    </table>
    ${noteBox("إذا كنت أنت من قام بتسجيل الدخول، فلا حاجة لاتخاذ أي إجراء. أمّا إذا لم تكن أنت، فننصحك بإعادة تعيين كلمة المرور فورًا لحماية حسابك.", COLOR_DANGER, "#7f1d1d", "#fef2f2")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">${button(secureAccountUrl, "تأمين حسابي الآن", COLOR_DANGER)}</td></tr>
    </table>
    ${signOff()}`;

  return {
    subject: `تنبيه أمني: تسجيل دخول جديد إلى حسابك — ${BRAND_NAME}`,
    html: emailShell({ contentHtml: content, preheader: "تم رصد تسجيل دخول من جهاز غير معروف", headerColor: COLOR_DANGER }),
  };
}

export function failedLoginAlertEmail({
  fullName,
  secureAccountUrl,
}: {
  fullName: string;
  secureAccountUrl: string;
}): { subject: string; html: string } {
  const content = `
    <p style="margin:0 0 4px;font-size:16px;">عزيزنا <strong>${fullName}</strong>،</p>
    <p style="margin:0 0 16px;color:${COLOR_MUTED};">حاول أحدهم للتو تسجيل الدخول إلى حسابك على منصة ${BRAND_NAME} باستخدام كلمة مرور غير صحيحة.</p>
    ${noteBox("إذا كانت المحاولة منك، يمكنك تجاهل هذه الرسالة بأمان. أما إذا لم تكن أنت، فننصحك بتغيير كلمة المرور في أقرب وقت ممكن.", COLOR_ACCENT, "#78350f", "#fffbeb")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">${button(secureAccountUrl, "تغيير كلمة المرور", COLOR_ACCENT)}</td></tr>
    </table>
    ${signOff()}`;

  return {
    subject: `تنبيه أمني: محاولة تسجيل دخول فاشلة — ${BRAND_NAME}`,
    html: emailShell({ contentHtml: content, preheader: "محاولة تسجيل دخول فاشلة إلى حسابك", headerColor: COLOR_ACCENT }),
  };
}
