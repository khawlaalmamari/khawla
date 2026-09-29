"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AnatomicalStructure } from "@/lib/anatomy-3d/types";
import { systemLabel } from "./body-system-selector";
import { Button } from "@/components/ui/button";

/** Phase 3B-3 — "Test Yourself": a lightweight structure-identification
 * practice mode. Purely presentational (matches the existing
 * StructureInfoPanel convention) — all state lives in anatomy-explorer.tsx,
 * the single orchestrator that also owns the 3D viewer's selection state.
 * Questions are drawn only from `structures` (the existing, real 3D-mapped
 * anatomy data) — nothing here invents facts or a second question source. */

const HINT_AFTER_ATTEMPTS = 2;

export function TestYourselfPanel({
  dict,
  locale,
  target,
  status,
  attempts,
  progress,
  stats,
  structures,
  onFallbackSelect,
  onNext,
  onExit,
  onRestart,
}: {
  dict: Dictionary;
  locale: Locale;
  target: AnatomicalStructure | null;
  status: "active" | "correct" | "finished";
  attempts: number;
  progress: { current: number; total: number };
  stats: { attempted: number; correct: number };
  structures: AnatomicalStructure[];
  onFallbackSelect: (structureId: string) => void;
  onNext: () => void;
  onExit: () => void;
  onRestart: () => void;
}) {
  if (status === "finished" || !target) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        <h3 className="text-lg font-bold">{dict.anatomy3D.testYourselfButton}</h3>
        <p className="mt-2 text-sm">
          {dict.anatomy3D.practiceSummaryTemplate
            .replace("{correct}", String(stats.correct))
            .replace("{total}", String(progress.total))}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={onRestart}>
            {dict.anatomy3D.restartTestButton}
          </Button>
          <Button variant="outline" onClick={onExit}>
            {dict.anatomy3D.exitTestButton}
          </Button>
        </div>
      </div>
    );
  }

  const targetName = locale === "ar" ? target.nameAr : target.nameEn;
  const showHint = status === "active" && attempts >= HINT_AFTER_ATTEMPTS;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{dict.anatomy3D.testYourselfButton}</h3>
        <span className="text-xs text-muted">
          {dict.anatomy3D.practiceProgressTemplate
            .replace("{current}", String(progress.current))
            .replace("{total}", String(progress.total))}
        </span>
      </div>

      <p className="mt-3 text-base font-semibold" role="status" aria-live="polite">
        {dict.anatomy3D.findStructurePromptTemplate.replace("{structure}", targetName)}
      </p>
      <p className="mt-1 text-xs text-muted">{dict.anatomy3D.testYourselfInstructions}</p>

      {/* Feedback is never conveyed by color alone: correct/incorrect are
          distinct text messages, each with their own icon glyph. */}
      <div className="mt-3 min-h-[1.5rem]" role="status" aria-live="polite">
        {status === "correct" && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-green-800">
            <span aria-hidden="true">✓</span>
            {dict.anatomy3D.correctAnswerFeedbackTemplate.replace("{structure}", targetName)}
          </p>
        )}
        {status === "active" && attempts > 0 && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-danger">
            <span aria-hidden="true">✗</span>
            {dict.anatomy3D.incorrectAnswerFeedback}
          </p>
        )}
      </div>

      {showHint && (
        <p className="mt-1 rounded-lg bg-background p-2 text-xs text-muted">
          <span className="font-semibold">{dict.anatomy3D.hintPrefixLabel}</span>{" "}
          {dict.anatomy3D.hintBodySystemTemplate.replace("{system}", systemLabel(dict, target.system))}
        </p>
      )}

      {/* Visually hidden until focused: lets keyboard/screen-reader users
          answer without the 3D canvas, without giving sighted mouse users
          a visible cheat-sheet of names during the visual exercise. */}
      <div className="mt-3">
        <label htmlFor="test-yourself-fallback-select" className="sr-only">
          {dict.anatomy3D.chooseStructureFallbackLabel}
        </label>
        <select
          id="test-yourself-fallback-select"
          className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:mt-0 focus:w-auto focus:rounded-lg focus:border focus:border-border focus:bg-background focus:p-2 focus:text-sm"
          value=""
          onChange={(e) => {
            if (e.target.value) onFallbackSelect(e.target.value);
          }}
        >
          <option value="" disabled>
            {dict.anatomy3D.chooseStructureFallbackLabel}
          </option>
          {structures.map((s) => (
            <option key={s.id} value={s.id}>
              {locale === "ar" ? s.nameAr : s.nameEn}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={onNext}>
          {status === "correct" && progress.current >= progress.total
            ? dict.anatomy3D.finishTestButton
            : dict.anatomy3D.nextQuestionButton}
        </Button>
        <Button variant="outline" onClick={onExit}>
          {dict.anatomy3D.exitTestButton}
        </Button>
      </div>
    </div>
  );
}
