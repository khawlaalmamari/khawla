import { Card } from "@/components/ui/card";
import { getDictionary } from "@/lib/i18n/dictionaries";

export type AuditLogEntry = {
  id: string;
  adminName: string;
  action: string;
  detail: string | null;
  createdAt: Date;
};

const ACTION_LABELS: Record<string, { ar: string; en: string }> = {
  "user.create": { ar: "أنشأ حسابًا", en: "created an account" },
  "user.update": { ar: "عدّل حسابًا", en: "updated an account" },
  "user.delete": { ar: "حذف حسابًا", en: "deleted an account" },
  "user.sendResetLink": { ar: "أرسل رابط إعادة تعيين كلمة مرور", en: "sent a password reset link" },
  "module.publish": { ar: "أظهر موديلًا للطالبات", en: "published a module" },
  "module.unpublish": { ar: "أخفى موديلًا عن الطالبات", en: "unpublished a module" },
  "lesson.update": { ar: "عدّل درسًا", en: "updated a lesson" },
  "notification.broadcast": { ar: "أرسل إشعارًا جماعيًا", en: "sent a broadcast notification" },
};

export function AuditLogPanel({
  entries,
  locale,
}: {
  entries: AuditLogEntry[];
  locale: "ar" | "en";
}) {
  const dict = getDictionary(locale);

  function formatDateTime(date: Date) {
    return new Date(date).toLocaleString(locale === "ar" ? "ar" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <Card>
      <p className="mb-3 text-sm font-bold">{dict.admin.auditLog}</p>
      {entries.length === 0 ? (
        <p className="text-sm text-muted">{dict.admin.noAuditLog}</p>
      ) : (
        <ul className="max-h-80 space-y-3 overflow-y-auto">
          {entries.map((entry) => {
            const label = ACTION_LABELS[entry.action];
            return (
              <li key={entry.id} className="border-b border-border pb-2 text-sm last:border-0">
                <span className="font-medium">{entry.adminName}</span>{" "}
                <span className="text-muted">{label ? label[locale] : entry.action}</span>
                {entry.detail && <span className="text-muted"> — {entry.detail}</span>}
                <div className="mt-0.5 text-xs text-muted">{formatDateTime(entry.createdAt)}</div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
