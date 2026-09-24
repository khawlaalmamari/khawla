import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      username: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  const verifiedCount = users.filter((u) => u.emailVerified).length;

  function formatDate(date: Date) {
    return date.toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold">{dict.admin.title}</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-muted">{dict.admin.totalUsers}</p>
            <p className="mt-1 text-3xl font-bold">{users.length}</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">{dict.admin.verifiedUsers}</p>
            <p className="mt-1 text-3xl font-bold">{verifiedCount}</p>
          </Card>
        </div>

        <Card className="overflow-x-auto p-0">
          {users.length === 0 ? (
            <p className="p-6 text-sm text-muted">{dict.admin.noUsers}</p>
          ) : (
            <table className="w-full min-w-[720px] text-start text-sm">
              <thead className="border-b border-border text-start text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3 text-start">{dict.admin.tableName}</th>
                  <th className="px-4 py-3 text-start">{dict.admin.tableUsername}</th>
                  <th className="px-4 py-3 text-start">{dict.admin.tableEmail}</th>
                  <th className="px-4 py-3 text-start">{dict.admin.tableStatus}</th>
                  <th className="px-4 py-3 text-start">{dict.admin.tableJoined}</th>
                  <th className="px-4 py-3 text-start">{dict.admin.tableLastLogin}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{u.fullName}</td>
                    <td className="px-4 py-3 text-muted">{u.username}</td>
                    <td className="px-4 py-3 text-muted">{u.email}</td>
                    <td className="px-4 py-3">
                      {u.emailVerified ? (
                        <Badge tone="success">{dict.admin.verified}</Badge>
                      ) : (
                        <Badge tone="neutral">{dict.admin.unverified}</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {u.lastLoginAt ? formatDate(u.lastLoginAt) : dict.admin.never}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </main>
    </div>
  );
}
