import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const dict = getDictionary(await getServerLocale());
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell title={dict.auth.forgotTitle}>
        <p className="text-sm text-danger">Invalid or missing reset token.</p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={dict.auth.forgotTitle}>
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
