"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLocale } from "@/components/locale-provider";

export function ImageAttachInput({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const { dict } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {file && previewUrl ? (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1 text-xs">
          {/* eslint-disable-next-line @next/next/no-img-element -- ephemeral blob: URL, not a servable asset */}
          <img src={previewUrl} alt="" className="h-8 w-8 rounded object-cover" />
          <span className="max-w-[8rem] truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-muted hover:text-danger"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary-400 hover:text-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          {dict.messaging.attachImage}
        </button>
      )}
    </div>
  );
}
