"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 35;
const PAUSE_FULL_MS = 1500;
const PAUSE_EMPTY_MS = 300;

/**
 * Cycles through `words`, typing and deleting one character at a time.
 * Pure CSS/JS (no animation library) to stay lightweight. Renders the
 * longest word up front (invisibly) so the layout never shifts as the
 * text grows and shrinks.
 */
export function TypewriterWords({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE_FULL_MS);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, PAUSE_EMPTY_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
      deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS,
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="relative inline-grid">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      <span className="col-start-1 row-start-1" aria-live="polite">
        {text}
        <span className="typewriter-cursor ms-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current align-middle" />
      </span>
    </span>
  );
}
