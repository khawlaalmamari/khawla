"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AnatomicalStructure, BodySystem } from "@/lib/anatomy-3d/types";
import { getStructureById, getStructuresBySystem } from "@/lib/anatomy-3d/structures";
import { BodySystemSelector } from "./body-system-selector";
import { StructureInfoPanel } from "./structure-info-panel";
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

export function AnatomyExplorer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);

  const structuresForSystem = useMemo(
    () => (selectedSystem ? getStructuresBySystem(selectedSystem) : []),
    [selectedSystem],
  );

  function selectSystem(system: BodySystem) {
    setSelectedSystem(system);
    const structures = getStructuresBySystem(system);
    setSelectedStructure(structures[0] ?? null);
  }

  // Selecting a structure directly on the 3D model (Phase 3B-1.7): keep the
  // existing system/structure list in sync with whatever was clicked.
  function selectStructureById(structureId: string) {
    const structure = getStructureById(structureId);
    if (!structure) return;
    setSelectedSystem(structure.system);
    setSelectedStructure(structure);
  }

  return (
    <div className="space-y-6">
      <Card>
        <AnatomyViewer
          dict={dict}
          selectedStructureId={selectedStructure?.id ?? null}
          onSelectStructure={selectStructureById}
        />
      </Card>

      <Card>
        <BodySystemSelector dict={dict} selected={selectedSystem} onSelect={selectSystem} />

        {structuresForSystem.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {structuresForSystem.map((structure) => (
              <button
                key={structure.id}
                type="button"
                onClick={() => setSelectedStructure(structure)}
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

      <StructureInfoPanel dict={dict} locale={locale} structure={selectedStructure} />
    </div>
  );
}
