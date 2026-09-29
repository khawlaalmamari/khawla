"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AnatomicalStructure, BodySystem } from "@/lib/anatomy-3d/types";
import { getSelectable3DStructures, getStructureById, getStructuresBySystem } from "@/lib/anatomy-3d/structures";
import { BodySystemSelector } from "./body-system-selector";
import { StructureInfoPanel } from "./structure-info-panel";
import { TestYourselfPanel } from "./test-yourself-panel";
import { Card } from "@/components/ui/card";

// The three.js viewer is isolated behind a dynamic, ssr:false import
// (Step 12): its ~600KB of JS only ever loads on this one page, never as
// part of any other route's bundle, and never runs on the server.
const AnatomyViewer = dynamic(
  () => import("./anatomy-viewer").then((mod) => mod.AnatomyViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-border bg-surface sm:h-[520px]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    ),
  },
);

type ViewerReadiness = "loading" | "ready" | "placeholder" | "error";
type Mode = "explore" | "test";
type PracticeStatus = "active" | "correct" | "finished";

// Fisher-Yates — small, local, and only ever used to order the existing
// structure pool for a practice session (no external question source).
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function AnatomyExplorer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [viewerReadiness, setViewerReadiness] = useState<ViewerReadiness>("loading");

  // Explore mode state (Phase 3A/3B-1.7, extended in 3B-3 with `exploreId`).
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const [exploreId, setExploreId] = useState<string | null>(null);

  // Test Yourself state — session-only, cleared on exit (Step 10: no new
  // persistence, no new database table).
  const practicePool = useMemo(() => getSelectable3DStructures(), []);
  const [practiceOrder, setPracticeOrder] = useState<string[]>([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAttempts, setPracticeAttempts] = useState(0);
  const [practiceStatus, setPracticeStatus] = useState<PracticeStatus>("active");
  const [practiceStats, setPracticeStats] = useState({ attempted: 0, correct: 0 });

  const structuresForSystem = useMemo(
    () => (selectedSystem ? getStructuresBySystem(selectedSystem) : []),
    [selectedSystem],
  );

  function selectSystem(system: BodySystem) {
    setSelectedSystem(system);
    const structures = getStructuresBySystem(system);
    setSelectedStructure(structures[0] ?? null);
    setExploreId(null);
  }

  // Selecting a structure directly on the 3D model (Phase 3B-1.7): keep the
  // existing system/structure list in sync with whatever was clicked.
  function selectStructureExplore(structureId: string) {
    const structure = getStructureById(structureId);
    if (!structure) return;
    setSelectedSystem(structure.system);
    setSelectedStructure(structure);
    setExploreId(null);
  }

  function startExplore() {
    if (!selectedStructure) return;
    setExploreId(selectedStructure.id);
  }

  function backToFullView() {
    setExploreId(null);
  }

  // --- Test Yourself -------------------------------------------------
  const currentTargetId = practiceOrder[practiceIndex] ?? null;
  const currentTarget = currentTargetId ? getStructureById(currentTargetId) ?? null : null;
  const practiceFinished = practiceOrder.length > 0 && practiceIndex >= practiceOrder.length;

  function startTestYourself() {
    setPracticeOrder(shuffle(practicePool.map((s) => s.id)));
    setPracticeIndex(0);
    setPracticeAttempts(0);
    setPracticeStatus("active");
    setPracticeStats({ attempted: 0, correct: 0 });
    setSelectedStructure(null);
    setExploreId(null);
    setMode("test");
  }

  function exitTestYourself() {
    setMode("explore");
  }

  function advancePractice() {
    if (practiceIndex + 1 >= practiceOrder.length) {
      setPracticeIndex(practiceOrder.length); // marks practiceFinished
    } else {
      setPracticeIndex((i) => i + 1);
    }
    setPracticeAttempts(0);
    setPracticeStatus("active");
  }

  function handlePracticeNext() {
    if (practiceStatus !== "correct") {
      // Skipping an unanswered question still counts as attempted.
      setPracticeStats((s) => ({ ...s, attempted: s.attempted + 1 }));
    }
    advancePractice();
  }

  function submitGuess(structureId: string) {
    if (!currentTarget || practiceStatus === "correct" || practiceFinished) return;
    if (structureId === currentTarget.id) {
      setPracticeStatus("correct");
      setPracticeStats((s) => ({ attempted: s.attempted + 1, correct: s.correct + 1 }));
    } else {
      setPracticeAttempts((n) => n + 1);
    }
  }

  // Only reveal a 3D highlight for the practice target once it's been
  // correctly identified — a wrong guess gets textual feedback only, so
  // highlighting never leaks which structure was actually the target.
  const viewerSelectedId =
    mode === "explore" ? (selectedStructure?.id ?? null) : practiceStatus === "correct" ? currentTargetId : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" aria-label={dict.anatomy3D.pageTitle}>
        <button
          type="button"
          aria-pressed={mode === "explore"}
          onClick={() => mode !== "explore" && exitTestYourself()}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            mode === "explore"
              ? "border-primary-600 bg-primary-600 text-white"
              : "border-border bg-surface hover:bg-primary-50"
          }`}
        >
          {dict.anatomy3D.exploreModeLabel}
        </button>
        <button
          type="button"
          aria-pressed={mode === "test"}
          onClick={startTestYourself}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            mode === "test"
              ? "border-primary-600 bg-primary-600 text-white"
              : "border-border bg-surface hover:bg-primary-50"
          }`}
        >
          {dict.anatomy3D.testYourselfButton}
        </button>
      </div>

      <Card>
        <AnatomyViewer
          dict={dict}
          selectedStructureId={viewerSelectedId}
          onSelectStructure={mode === "explore" ? selectStructureExplore : submitGuess}
          focusStructureId={mode === "explore" ? exploreId : null}
          onViewerStateChange={setViewerReadiness}
        />
      </Card>

      {mode === "explore" && (
        <>
          <Card>
            <BodySystemSelector dict={dict} selected={selectedSystem} onSelect={selectSystem} />

            {structuresForSystem.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {structuresForSystem.map((structure) => (
                  <button
                    key={structure.id}
                    type="button"
                    onClick={() => {
                      setSelectedStructure(structure);
                      setExploreId(null);
                    }}
                    aria-pressed={selectedStructure?.id === structure.id}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                      selectedStructure?.id === structure.id
                        ? "border-accent-600 bg-accent-100 text-accent-800"
                        : "border-border bg-surface hover:bg-accent-50"
                    }`}
                  >
                    {locale === "ar" ? structure.nameAr : structure.nameEn}
                  </button>
                ))}
              </div>
            )}
          </Card>

          <StructureInfoPanel
            dict={dict}
            locale={locale}
            structure={selectedStructure}
            isExploring={!!exploreId && exploreId === selectedStructure?.id}
            canExplore={viewerReadiness === "ready"}
            onExplore={startExplore}
            onBackToFullView={backToFullView}
          />
        </>
      )}

      {mode === "test" && (
        <>
          <TestYourselfPanel
            dict={dict}
            locale={locale}
            target={practiceFinished ? null : currentTarget}
            status={practiceFinished ? "finished" : practiceStatus}
            attempts={practiceAttempts}
            progress={{ current: Math.min(practiceIndex + 1, practiceOrder.length), total: practiceOrder.length }}
            stats={practiceStats}
            structures={practicePool}
            onFallbackSelect={submitGuess}
            onNext={handlePracticeNext}
            onExit={exitTestYourself}
            onRestart={startTestYourself}
          />

          {/* Positive reinforcement: once identified correctly, reveal the
              same real info the Explore mode shows — reusing the existing
              panel rather than duplicating structure content. */}
          {practiceStatus === "correct" && currentTarget && (
            <StructureInfoPanel dict={dict} locale={locale} structure={currentTarget} />
          )}
        </>
      )}
    </div>
  );
}
