import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { QuizResults } from "@/components/quiz/quiz-results";

export default async function AnatomyQuizResultsPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; attemptId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { moduleSlug, attemptId } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <QuizResults
          courseSlug="anatomy"
          moduleSlug={moduleSlug}
          attemptId={attemptId}
          userId={user.id}
        />
      </main>
    </div>
  );
}
