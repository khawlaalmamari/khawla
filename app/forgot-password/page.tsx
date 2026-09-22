import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default async function ForgotPasswordPage() {
  const dict = getDictionary(await getServerLocale());

  return (
    <AuthShell title={dict.auth.forgotTitle}>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
