"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AnatomicalStructure } from "@/lib/anatomy-3d/types";
import { systemLabel } from "./body-system-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Step 7 — future educational interactions ("Identify this structure",
 * "Explore this organ", "Show related structures", "Test yourself").
 * Only the UI hooks exist this phase; each button is disabled and marked
 * "coming soon" rather than wired to real logic, per the phase's explicit
 * "do not implement the full quiz system" instruction.
 */
function FutureInteractionButton({ label }: { label: string }) {
  return (
    <Button variant="outline" disabled className="!px-3 !py-1.5 text-xs opacity-60">
      {label}
    </Button>
  );
}

export function StructureInfoPanel({
  dict,
  locale,
  structure,
}: {
  dict: Dictionary;
  locale: Locale;
  structure: AnatomicalStructure | null;
}) {
  if (!structure) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
        {dict.anatomy3D.noStructureSelected}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{locale === "ar" ? structure.nameAr : structure.nameEn}</h3>
        <Badge tone="primary">{systemLabel(dict, structure.system)}</Badge>
      </div>

      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted">{dict.anatomy3D.arabicNameLabel}</dt>
          <dd>{structure.nameAr}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{dict.anatomy3D.englishNameLabel}</dt>
          <dd>{structure.nameEn}</dd>
        </div>
      </dl>

      <div className="mt-3">
        <p className="text-xs text-muted">{dict.anatomy3D.descriptionLabel}</p>
        <p className="mt-1 text-sm">{locale === "ar" ? structure.descriptionAr : structure.descriptionEn}</p>
      </div>

      <div className="mt-3 rounded-lg bg-background p-3">
        <p className="text-xs font-semibold text-muted">{dict.anatomy3D.nursingRelevanceLabel}</p>
        <p className="mt-1 text-sm">
          {locale === "ar" ? structure.nursingRelevanceAr : structure.nursingRelevanceEn}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted">{dict.anatomy3D.interactionHooksTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <FutureInteractionButton label={dict.anatomy3D.identifyStructureButton} />
          <FutureInteractionButton label={dict.anatomy3D.exploreOrganButton} />
          <FutureInteractionButton label={dict.anatomy3D.showRelatedButton} />
          <FutureInteractionButton label={dict.anatomy3D.testYourselfButton} />
        </div>
      </div>
    </div>
  );
}
