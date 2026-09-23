"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const { dict } = useLocale();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === "accountLocked") {
          setError(
            dict.auth.errors.accountLocked.replace("{minutes}", String(data.minutes)),
          );
        } else if (data.error === "invalidCredentials") {
          setError(dict.auth.errors.invalidCredentials);
        } else {
          setError(dict.auth.errors.genericError);
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(dict.auth.errors.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label={dict.auth.identifierLabel} htmlFor="identifier">
        <input
          id="identifier"
          name="identifier"
          autoComplete="username"
          required
          className={inputClass}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </Field>

      <Field label={dict.auth.passwordLabel} htmlFor="password">
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${inputClass} pe-20`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 end-3 text-xs font-medium text-primary-700 hover:underline"
          >
            {showPassword ? dict.auth.hidePassword : dict.auth.showPassword}
          </button>
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
      </Field>

      <div className="flex justify-end text-sm">
        <Link href="/forgot-password" className="text-primary-700 hover:underline">
          {dict.auth.forgotPassword}
        </Link>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {dict.auth.loginButton}
      </Button>

      <p className="text-center text-sm text-muted">
        {dict.auth.noAccount}{" "}
        <Link href="/signup" className="font-medium text-primary-700 hover:underline">
          {dict.auth.createAccount}
        </Link>
      </p>
    </form>
  );
}
