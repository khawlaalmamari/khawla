"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type AdminModule = {
  id: string;
  titleAr: string;
  titleEn: string;
  isPublished: boolean;
  hasContent: boolean;
  courseTitleAr: string;
  courseTitleEn: string;
};

export function ModuleManagementTable({
  modules,
  locale,
}: {
  modules: AdminModule[];
  locale: "ar" | "en";
}) {
  const { dict } = useLocale();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggle(mod: AdminModule) {
    setError(null);
    setPendingId(mod.id);
    try {
      const res = await fetch(`/api/admin/modules/${mod.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !mod.isPublished }),
      });
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">{dict.admin.manageModules}</h2>
        <p className="mt-1 text-sm text-muted">{dict.admin.manageModulesIntro}</p>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-start text-sm">
          <thead className="border-b border-border text-start text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-start">{dict.admin.moduleTableCourse}</th>
              <th className="px-4 py-3 text-start">{dict.admin.moduleTableModule}</th>
              <th className="px-4 py-3 text-start">{dict.admin.moduleTableContent}</th>
              <th className="px-4 py-3 text-start">{dict.admin.moduleTableVisibility}</th>
              <th className="px-4 py-3 text-start">{dict.admin.tableActions}</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-muted">
                  {locale === "ar" ? mod.courseTitleAr : mod.courseTitleEn}
                </td>
                <td className="px-4 py-3 font-medium">
                  {locale === "ar" ? mod.titleAr : mod.titleEn}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={mod.hasContent ? "success" : "neutral"}>
                    {mod.hasContent ? dict.admin.hasContent : dict.admin.noContent}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={mod.isPublished ? "success" : "neutral"}>
                    {mod.isPublished ? dict.admin.published : dict.admin.hidden}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={pendingId === mod.id}
                    onClick={() => toggle(mod)}
                    className="text-xs font-medium text-primary-700 hover:underline disabled:opacity-60"
                  >
                    {mod.isPublished ? dict.admin.hideModule : dict.admin.showModule}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
