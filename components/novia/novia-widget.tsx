"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/components/locale-provider";

type Message = { role: "user" | "assistant" | "notice"; content: string };

export function NoviaWidget() {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/novia/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      if (data.sessionId) setSessionId(data.sessionId);

      if (!res.ok) {
        setError(dict.novia.errorGeneric);
      } else if (!data.configured) {
        setMessages((m) => [...m, { role: "notice", content: dict.novia.notConfigured }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError(dict.novia.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 end-6 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between bg-primary-700 px-4 py-3 text-white">
            <span className="font-bold">🤖 {dict.novia.widgetTitle}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="close"
              className="rounded-full p-1 hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-center text-xs text-muted">{dict.novia.disclaimer}</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                  m.role === "user"
                    ? "ms-auto bg-primary-600 text-white"
                    : m.role === "notice"
                      ? "border border-accent-300 bg-accent-50 text-accent-800"
                      : "bg-surface"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-muted">{dict.novia.thinking}</p>}
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.novia.placeholder}
              className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {dict.novia.send}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.novia.widgetTitle}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-2xl text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? "✕" : "🤖"}
      </button>
    </div>
  );
}
