import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { QuizRunner } from "@/components/quiz/quiz-runner";

export default async function AnatomyQuizPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { moduleSlug } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <QuizRunner courseSlug="anatomy" moduleSlug={moduleSlug} />
      </main>
    </div>
  );
}
