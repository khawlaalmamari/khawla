import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { CourseOverview } from "@/components/course/course-overview";

// Publicly browsable, same as the Anatomy course page.
export default async function PhysiologyCoursePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <CourseOverview courseSlug="physiology" userId={user?.id ?? null} />
      </main>
    </div>
  );
}
