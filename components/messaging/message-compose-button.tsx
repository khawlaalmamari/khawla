"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

type RecipientType = "admin" | "user";

export function MessageComposeButton() {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<RecipientType>("admin");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          recipientType === "admin"
            ? { recipientType: "admin", body }
            : { recipientType: "user", recipientEmail, body },
        ),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error === "recipientNotFound"
            ? dict.messaging.recipientNotFound
            : data.error === "cannotMessageSelf"
              ? dict.messaging.cannotMessageSelf
              : dict.messaging.genericError,
        );
        return;
      }
      setSent(true);
      setBody("");
      setRecipientEmail("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setSent(false);
          setError(null);
        }}
        aria-label={dict.messaging.iconLabel}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute end-0 z-50 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-border bg-background p-4 shadow-lg">
          <p className="text-sm font-bold">{dict.messaging.title}</p>

          {sent && <p className="mt-3 text-sm text-success">{dict.messaging.sent}</p>}
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}

          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <Field label={dict.messaging.sendToLabel} htmlFor="msg-recipient-type">
              <select
                id="msg-recipient-type"
                className={inputClass}
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value as RecipientType)}
              >
                <option value="admin">{dict.messaging.sendToAdmin}</option>
                <option value="user">{dict.messaging.sendToUser}</option>
              </select>
            </Field>

            {recipientType === "user" && (
              <Field label={dict.messaging.recipientEmailLabel} htmlFor="msg-recipient-email">
                <input
                  id="msg-recipient-email"
                  type="email"
                  required
                  dir="ltr"
                  placeholder={dict.messaging.recipientEmailPlaceholder}
                  className={inputClass}
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </Field>
            )}

            <Field label={dict.messaging.bodyLabel} htmlFor="msg-body">
              <textarea
                id="msg-body"
                required
                rows={3}
                placeholder={dict.messaging.bodyPlaceholder}
                className={inputClass}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Field>

            <Button type="submit" disabled={submitting} className="w-full">
              {dict.messaging.send}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
