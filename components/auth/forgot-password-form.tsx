"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const { dict } = useLocale();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.devResetUrl) setDevResetUrl(data.devResetUrl);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800">
          {dict.auth.successResetRequested}
        </div>
        {devResetUrl && (
          <div className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-xs text-accent-700">
            Dev mode (no email provider configured):{" "}
            <a className="underline" href={devResetUrl}>
              {devResetUrl}
            </a>
          </div>
        )}
        <Link href="/login" className="text-sm text-primary-700 hover:underline">
          {dict.auth.backToLogin}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-sm text-muted">{dict.auth.forgotSubtitle}</p>
      <Field label={dict.auth.emailLabel} htmlFor="email">
        <input
          id="email"
          type="email"
          required
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {dict.auth.sendResetLink}
      </Button>
      <div className="text-center text-sm">
        <Link href="/login" className="text-primary-700 hover:underline">
          {dict.auth.backToLogin}
        </Link>
      </div>
    </form>
  );
}
