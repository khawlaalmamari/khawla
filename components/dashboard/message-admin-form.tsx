"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

export function MessageAdminForm({ username }: { username: string }) {
  const { dict } = useLocale();
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/student/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      setSent(true);
      setBody("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-muted">{dict.dashboard.messageAdminIntro}</p>
      {sent && <p className="mt-3 text-sm text-success">{dict.dashboard.messageAdminSent}</p>}
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <Field label={dict.dashboard.messageAdminUsernameLabel} htmlFor="msg-username">
          <input
            id="msg-username"
            readOnly
            disabled
            value={username}
            className={`${inputClass} cursor-not-allowed bg-surface text-muted`}
          />
        </Field>
        <Field label={dict.dashboard.messageAdminBodyLabel} htmlFor="msg-body">
          <textarea
            id="msg-body"
            required
            rows={3}
            placeholder={dict.dashboard.messageAdminBodyPlaceholder}
            className={inputClass}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Field>
        <Button type="submit" disabled={submitting}>
          {dict.dashboard.messageAdminSend}
        </Button>
      </form>
    </div>
  );
}
