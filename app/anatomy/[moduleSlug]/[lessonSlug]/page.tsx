import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { LessonView } from "@/components/course/lesson-view";

export default async function AnatomyLessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { moduleSlug, lessonSlug } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <LessonView courseSlug="anatomy" moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
      </main>
    </div>
  );
}
