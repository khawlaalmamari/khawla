"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { isStrongPassword } from "@/lib/auth/password-strength";
import { PasswordRulesChecklist, PasswordMatchIndicator } from "@/components/auth/password-checklist";
import { VerificationCodeForm } from "@/components/auth/verification-code-form";

export function SignupForm() {
  const { dict, locale } = useLocale();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [devVerifyCode, setDevVerifyCode] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const passwordsReady =
    isStrongPassword(form.password) &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^[\p{L}\p{N}_]+$/u.test(form.username)) {
      setError(dict.auth.errors.invalidUsername);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(dict.auth.errors.passwordMismatch);
      return;
    }
    if (!isStrongPassword(form.password)) {
      setError(dict.auth.errors.weakPassword);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === "emailTaken") setError(dict.auth.errors.emailTaken);
        else if (data.error === "usernameTaken") setError(dict.auth.errors.usernameTaken);
        else if (data.error === "weakPassword") setError(dict.auth.errors.weakPasswordRejected);
        else setError(dict.auth.errors.genericError);
        return;
      }

      setPendingEmail(data.email ?? form.email);
      if (data.devVerifyCode) setDevVerifyCode(data.devVerifyCode);
    } catch {
      setError(dict.auth.errors.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  if (pendingEmail) {
    return <VerificationCodeForm email={pendingEmail} initialDevCode={devVerifyCode} />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <Field label={dict.auth.fullNameLabel} htmlFor="fullName">
        <input
          id="fullName"
          required
          className={inputClass}
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
      </Field>

      <Field label={dict.auth.usernameLabel} htmlFor="username">
        <input
          id="username"
          required
          pattern="[A-Za-z0-9_؀-ۿ]+"
          className={inputClass}
          value={form.username}
          onChange={(e) => update("username", e.target.value)}
        />
      </Field>

      <Field label={dict.auth.emailLabel} htmlFor="email">
        <input
          id="email"
          type="email"
          required
          className={inputClass}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>

      <Field label={dict.auth.passwordLabel} htmlFor="password">
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            className={`${inputClass} pe-20`}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 end-3 text-xs font-medium text-primary-700 hover:underline"
          >
            {showPassword ? dict.auth.hidePassword : dict.auth.showPassword}
          </button>
        </div>
        <PasswordRulesChecklist password={form.password} />
      </Field>

      <Field label={dict.auth.confirmPasswordLabel} htmlFor="confirmPassword">
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          required
          minLength={8}
          className={inputClass}
          value={form.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
        />
        <PasswordMatchIndicator password={form.password} confirmPassword={form.confirmPassword} />
      </Field>

      <Button type="submit" disabled={submitting || !passwordsReady} className="w-full">
        {dict.auth.signupButton}
      </Button>

      <p className="text-center text-sm text-muted">
        {dict.auth.haveAccount}{" "}
        <Link href="/login" className="font-medium text-primary-700 hover:underline">
          {dict.auth.loginTitle}
        </Link>
      </p>
    </form>
  );
}
