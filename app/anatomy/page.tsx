import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { CourseOverview } from "@/components/course/course-overview";

export default async function AnatomyCoursePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <CourseOverview courseSlug="anatomy" userId={user.id} />
      </main>
    </div>
  );
}
