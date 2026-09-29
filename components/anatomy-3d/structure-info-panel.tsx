"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AnatomicalStructure } from "@/lib/anatomy-3d/types";
import { systemLabel } from "./body-system-selector";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Remaining future educational interactions not yet implemented
 * ("Identify this structure", "Show related structures"). "Explore this
 * organ" and "Test yourself" became real features in Phase 3B-3 and are
 * no longer rendered here — see the Explore button above and
 * test-yourself-panel.tsx.
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
  isExploring,
  canExplore,
  onExplore,
  onBackToFullView,
}: {
  dict: Dictionary;
  locale: Locale;
  structure: AnatomicalStructure | null;
  /** Phase 3B-3 — whether the camera is currently focused on `structure`. */
  isExploring?: boolean;
  /** Whether Explore is technically possible right now (real model loaded,
   * not the placeholder/loading/error state). */
  canExplore?: boolean;
  onExplore?: () => void;
  onBackToFullView?: () => void;
}) {
  if (!structure) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
        {dict.anatomy3D.noStructureSelected}
      </div>
    );
  }

  const structureName = locale === "ar" ? structure.nameAr : structure.nameEn;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {/* Accessible confirmation that a selection happened, independent of
          the 3D highlight (which sighted users see, but AT users can't). */}
      <p className="sr-only" role="status" aria-live="polite">
        {dict.anatomy3D.structureSelectedAnnouncement.replace("{structure}", structureName)}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{structureName}</h3>
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

      {/* Phase 3B-1.9/3B-3 — only structures selectable in the 3D model
          (modelNodeName set) get Explore/Study actions; other structures
          keep their existing info-only presentation unchanged. */}
      {structure.modelNodeName && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {isExploring ? (
            <Button variant="outline" className="!px-4 !py-2 text-sm" onClick={onBackToFullView}>
              {dict.anatomy3D.backToFullViewButton}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="!px-4 !py-2 text-sm"
              onClick={onExplore}
              disabled={!canExplore}
              aria-disabled={!canExplore}
            >
              {dict.anatomy3D.exploreOrganButton}
            </Button>
          )}

          {structure.studyHref ? (
            <ButtonLink href={structure.studyHref} variant="outline" className="!px-4 !py-2 text-sm">
              {dict.anatomy3D.studyThisStructureButton}
            </ButtonLink>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-background px-3 py-2 text-xs text-muted">
              {dict.anatomy3D.contentComingSoonLabel}
            </p>
          )}

          {/* Only shown when the caller explicitly says Explore is
              unavailable (e.g. the placeholder model) — not simply
              whenever `canExplore` is left unset, such as when this panel
              is reused for Test Yourself's correct-answer reinforcement. */}
          {canExplore === false && !isExploring && (
            <p className="w-full text-xs text-muted">{dict.anatomy3D.exploreUnavailableWhilePlaceholder}</p>
          )}
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted">{dict.anatomy3D.interactionHooksTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <FutureInteractionButton label={dict.anatomy3D.identifyStructureButton} />
          <FutureInteractionButton label={dict.anatomy3D.showRelatedButton} />
        </div>
      </div>
    </div>
  );
}
