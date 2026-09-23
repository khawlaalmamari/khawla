"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { isStrongPassword } from "@/lib/auth/password-strength";

export function ResetPasswordForm({ token }: { token: string }) {
  const { dict } = useLocale();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(dict.auth.errors.passwordMismatch);
      return;
    }
    if (!isStrongPassword(password)) {
      setError(dict.auth.errors.weakPassword);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError(dict.auth.errors.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800">
        {dict.auth.loginButton} →
        <Link href="/login" className="ms-1 underline">
          {dict.auth.backToLogin}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}
      <Field label={dict.auth.passwordLabel} htmlFor="password">
        <input
          id="password"
          type="password"
          required
          minLength={8}
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-xs text-muted">{dict.auth.errors.weakPassword}</p>
      </Field>
      <Field label={dict.auth.confirmPasswordLabel} htmlFor="confirmPassword">
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {dict.auth.sendResetLink}
      </Button>
    </form>
  );
}
