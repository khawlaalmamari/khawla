"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

const emptyForm = { titleAr: "", titleEn: "", bodyAr: "", bodyEn: "", audience: "students" as const };

export function BroadcastForm() {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState<number | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSentCount(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/notifications/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      setSentCount(data.recipientCount ?? 0);
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{dict.admin.broadcastTitle}</p>
        <Button type="button" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? dict.common.cancel : dict.admin.broadcastNew}
        </Button>
      </div>

      {sentCount != null && (
        <p className="mt-3 text-sm text-success">
          {dict.admin.broadcastSent.replace("{count}", String(sentCount))}
        </p>
      )}
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      {open && (
        <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label={dict.admin.titleArLabel} htmlFor="bc-titleAr">
            <input
              id="bc-titleAr"
              required
              dir="rtl"
              className={inputClass}
              value={form.titleAr}
              onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))}
            />
          </Field>
          <Field label={dict.admin.titleEnLabel} htmlFor="bc-titleEn">
            <input
              id="bc-titleEn"
              required
              dir="ltr"
              className={inputClass}
              value={form.titleEn}
              onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
            />
          </Field>
          <Field label={dict.admin.contentArLabel} htmlFor="bc-bodyAr">
            <textarea
              id="bc-bodyAr"
              required
              dir="rtl"
              rows={3}
              className={inputClass}
              value={form.bodyAr}
              onChange={(e) => setForm((f) => ({ ...f, bodyAr: e.target.value }))}
            />
          </Field>
          <Field label={dict.admin.contentEnLabel} htmlFor="bc-bodyEn">
            <textarea
              id="bc-bodyEn"
              required
              dir="ltr"
              rows={3}
              className={inputClass}
              value={form.bodyEn}
              onChange={(e) => setForm((f) => ({ ...f, bodyEn: e.target.value }))}
            />
          </Field>
          <Field label={dict.admin.broadcastAudience} htmlFor="bc-audience">
            <select
              id="bc-audience"
              className={inputClass}
              value={form.audience}
              onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value as typeof f.audience }))}
            >
              <option value="students">{dict.admin.broadcastAudienceStudents}</option>
              <option value="admins">{dict.admin.broadcastAudienceAdmins}</option>
              <option value="all">{dict.admin.broadcastAudienceAll}</option>
            </select>
          </Field>
          <div className="flex items-end">
            <Button type="submit" disabled={submitting}>
              {dict.admin.broadcastSend}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
