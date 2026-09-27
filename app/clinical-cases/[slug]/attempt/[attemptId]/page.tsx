import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAttemptView } from "@/lib/clinical-cases/queries";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { VirtualPatientConversation } from "@/components/clinical-cases/virtual-patient-conversation";

export default async function ClinicalCaseAttemptPage({
  params,
}: {
  params: Promise<{ slug: string; attemptId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { attemptId } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  // Ownership is enforced inside getAttemptView (filters by this user's id)
  // — a foreign or nonexistent attemptId returns null either way, so a
  // student can never probe whether another student's attempt exists.
  const attempt = await getAttemptView(attemptId, user.id);

  if (!attempt) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
          <Card>
            <p className="text-sm text-muted">{dict.clinicalCases.attemptNotFound}</p>
            <Link href="/clinical-cases" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
              {dict.clinicalCases.backToCases}
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 pb-28 sm:px-6">
        <VirtualPatientConversation attempt={attempt} locale={locale} dict={dict} />
      </main>
    </div>
  );
}
