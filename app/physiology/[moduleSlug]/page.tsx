import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";
import { ModuleOverview } from "@/components/course/module-overview";

export default async function PhysiologyModulePage({
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
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <ModuleOverview courseSlug="physiology" moduleSlug={moduleSlug} userId={user.id} />
      </main>
    </div>
  );
}
