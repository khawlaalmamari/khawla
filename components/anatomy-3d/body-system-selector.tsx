"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { BodySystem } from "@/lib/anatomy-3d/types";
import { BODY_SYSTEMS } from "@/lib/anatomy-3d/types";

function systemLabel(dict: Dictionary, system: BodySystem): string {
  switch (system) {
    case "SKELETAL":
      return dict.anatomy3D.systemSkeletal;
    case "MUSCULAR":
      return dict.anatomy3D.systemMuscular;
    case "NERVOUS":
      return dict.anatomy3D.systemNervous;
    case "CARDIOVASCULAR":
      return dict.anatomy3D.systemCardiovascular;
    case "RESPIRATORY":
      return dict.anatomy3D.systemRespiratory;
    case "DIGESTIVE":
      return dict.anatomy3D.systemDigestive;
    case "URINARY":
      return dict.anatomy3D.systemUrinary;
    default:
      return dict.anatomy3D.systemReproductive;
  }
}

export function BodySystemSelector({
  dict,
  selected,
  onSelect,
}: {
  dict: Dictionary;
  selected: BodySystem | null;
  onSelect: (system: BodySystem) => void;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{dict.anatomy3D.selectSystemPrompt}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {BODY_SYSTEMS.map((system) => (
          <button
            key={system}
            type="button"
            onClick={() => onSelect(system)}
            aria-pressed={selected === system}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              selected === system
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-border bg-surface hover:bg-primary-50"
            }`}
          >
            {systemLabel(dict, system)}
          </button>
        ))}
      </div>
    </div>
  );
}

export { systemLabel };
