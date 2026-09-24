"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export function VerificationCodeForm({
  email,
  initialDevCode,
}: {
  email: string;
  initialDevCode?: string | null;
}) {
  const { dict } = useLocale();
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(initialDevCode ?? null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function focusInput(index: number) {
    inputsRef.current[index]?.focus();
  }

  async function submitCode(code: string) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "expiredCode") setError(dict.auth.errors.expiredCode);
        else if (data.error === "tooManyAttempts") setError(dict.auth.errors.tooManyAttempts);
        else setError(dict.auth.errors.invalidCode);
        setDigits(Array(CODE_LENGTH).fill(""));
        focusInput(0);
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

  function handleChange(index: number, rawValue: string) {
    const clean = rawValue.replace(/\D/g, "");
    setError(null);

    if (!clean) {
      setDigits((d) => {
        const next = [...d];
        next[index] = "";
        return next;
      });
      return;
    }

    const chars = clean.split("");
    let nextDigits: string[] = [];
    setDigits((d) => {
      const next = [...d];
      let i = index;
      for (const ch of chars) {
        if (i >= CODE_LENGTH) break;
        next[i] = ch;
        i++;
      }
      nextDigits = next;
      return next;
    });

    const lastFilledIndex = Math.min(index + chars.length - 1, CODE_LENGTH - 1);
    focusInput(lastFilledIndex < CODE_LENGTH - 1 ? lastFilledIndex + 1 : lastFilledIndex);

    const fullCode = nextDigits.join("");
    if (fullCode.length === CODE_LENGTH) {
      submitCode(fullCode);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  }

  async function onResend() {
    setResending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.devVerifyCode) setDevCode(data.devVerifyCode);
      if (!res.ok && data.error === "cooldown") {
        setCooldown(Math.max(1, Math.ceil((data.retryAfterMs ?? 0) / 1000)));
        return;
      }
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setDigits(Array(CODE_LENGTH).fill(""));
      focusInput(0);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium">{dict.auth.checkEmailTitle}</p>
        <p className="mt-1 text-sm text-muted">
          {dict.auth.checkEmailBody.replace("{email}", email)}
        </p>
      </div>

      <div className="flex justify-center gap-2" dir="ltr">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={CODE_LENGTH}
            disabled={submitting}
            className="h-14 w-12 rounded-lg border border-border bg-surface text-center text-2xl font-semibold focus:border-primary-500 focus:outline-none disabled:opacity-60"
          />
        ))}
      </div>

      {error && <p className="text-center text-sm text-danger">{error}</p>}

      {devCode && (
        <div className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-center text-xs text-accent-700">
          Dev mode (no email provider configured): code is <strong>{devCode}</strong>
        </div>
      )}

      <div className="text-center text-sm">
        {cooldown > 0 ? (
          <span className="text-muted">
            {dict.auth.resendCodeIn.replace("{seconds}", String(cooldown))}
          </span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            disabled={resending}
            className="font-medium text-primary-700 hover:underline disabled:opacity-60"
          >
            {dict.auth.resendVerification}
          </button>
        )}
      </div>
    </div>
  );
}
