import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const dict = getDictionary(await getServerLocale());

  return (
    <AuthShell title={dict.auth.signupTitle}>
      <SignupForm />
    </AuthShell>
  );
}
