"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ImageAttachInput } from "@/components/messaging/image-attach-input";
import { uploadMessageImage } from "@/components/messaging/upload-image";

export type BellNotification = {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  linkUrl: string | null;
  imageUrl: string | null;
  read: boolean;
  createdAt: string;
  senderId: string | null;
  senderRole: "admin" | "student" | null;
};

export function NotificationBell({ notifications }: { notifications: BellNotification[] }) {
  const { dict, locale } = useLocale();
  const [items, setItems] = useState(notifications);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BellNotification | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [replySent, setReplySent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    } catch {
      // Best-effort: a failed request just leaves it unread server-side.
    }
  }

  function openNotification(n: BellNotification) {
    if (!n.read) markRead(n.id);
    setSelected(n);
    setOpen(false);
    setReplyOpen(false);
    setReplyBody("");
    setReplyImage(null);
    setReplyError(null);
    setReplySent(false);
  }

  function senderLabel(n: BellNotification) {
    if (n.senderRole === "admin") return dict.notif.fromAdmin;
    if (n.senderRole === "student") return dict.notif.fromStudent;
    return dict.notif.system;
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selected?.senderId) return;
    setReplyError(null);
    setReplySending(true);
    try {
      let imageUrl: string | undefined;
      if (replyImage) {
        const result = await uploadMessageImage(replyImage);
        if ("error" in result) {
          setReplyError(
            result.error === "tooLarge"
              ? dict.messaging.imageTooLarge
              : result.error === "invalidType"
                ? dict.messaging.imageInvalidType
                : result.error === "notConfigured"
                  ? dict.messaging.uploadNotConfigured
                  : dict.messaging.genericError,
          );
          return;
        }
        imageUrl = result.url;
      }

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientType: "replyTo",
          recipientUserId: selected.senderId,
          body: replyBody,
          imageUrl,
        }),
      });
      if (!res.ok) {
        setReplyError(dict.messaging.genericError);
        return;
      }
      setReplySent(true);
      setReplyBody("");
      setReplyImage(null);
      setReplyOpen(false);
    } finally {
      setReplySending(false);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.notif.bellLabel}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary-700"
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
          <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute end-0 z-50 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-bold">{dict.notif.title}</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">{dict.notif.empty}</p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => openNotification(n)}
                      className={`block w-full px-4 py-3 text-start text-sm transition-colors ${
                        n.read ? "hover:bg-surface" : "bg-primary-50 hover:bg-primary-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />}
                        <p className="font-medium">{locale === "ar" ? n.titleAr : n.titleEn}</p>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                        {locale === "ar" ? n.bodyAr : n.bodyEn}
                      </p>
                      <p className="mt-1 text-[11px] text-muted/80">{senderLabel(n)}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold">
                {locale === "ar" ? selected.titleAr : selected.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={dict.common.cancel}
                className="shrink-0 rounded-full p-1 text-muted hover:bg-surface"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-xs text-muted/80">{senderLabel(selected)}</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-6">
              {locale === "ar" ? selected.bodyAr : selected.bodyEn}
            </p>
            {selected.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- externally hosted (Vercel Blob) image
              <img
                src={selected.imageUrl}
                alt=""
                className="mt-4 max-h-64 w-full rounded-lg object-contain"
              />
            )}
            {selected.linkUrl && (
              <Link
                href={selected.linkUrl}
                onClick={() => setSelected(null)}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                {dict.notif.openAction}
              </Link>
            )}

            {selected.senderId && (
              <div className="mt-5 border-t border-border pt-4">
                {replySent && (
                  <p className="mb-3 text-sm text-success">{dict.messaging.replySent}</p>
                )}
                {!replyOpen ? (
                  <button
                    type="button"
                    onClick={() => setReplyOpen(true)}
                    className="text-sm font-semibold text-primary-700 hover:underline"
                  >
                    {dict.messaging.reply}
                  </button>
                ) : (
                  <form onSubmit={sendReply} className="space-y-3">
                    {replyError && <p className="text-sm text-danger">{replyError}</p>}
                    <textarea
                      required
                      rows={2}
                      placeholder={dict.messaging.replyPlaceholder}
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500"
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                    />
                    <ImageAttachInput file={replyImage} onChange={setReplyImage} />
                    <div className="flex justify-end gap-2">
                      <Button type="submit" disabled={replySending} className="!px-4 !py-1.5 text-xs">
                        {dict.messaging.send}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
