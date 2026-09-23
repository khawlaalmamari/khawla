import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const { verified } = await searchParams;

  return (
    <AuthShell title={dict.auth.loginTitle}>
      {(verified === "invalid" || verified === "missing") && (
        <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {locale === "ar"
            ? "رابط التفعيل غير صالح أو منتهي الصلاحية."
            : "That verification link is invalid or expired."}
        </div>
      )}
      <LoginForm />
    </AuthShell>
  );
}
