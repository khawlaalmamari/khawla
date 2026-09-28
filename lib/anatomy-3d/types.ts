// Phase 3A — 3D Anatomy Foundation. Static, structured educational content
// only (no patient data, no database) — see structures.ts.

export const BODY_SYSTEMS = [
  "SKELETAL",
  "MUSCULAR",
  "NERVOUS",
  "CARDIOVASCULAR",
  "RESPIRATORY",
  "DIGESTIVE",
  "URINARY",
  "REPRODUCTIVE",
] as const;

export type BodySystem = (typeof BODY_SYSTEMS)[number];

/** One selectable anatomical structure shown in the info panel (Step 6).
 * Educational only — never a diagnosis or patient-specific content. */
export type AnatomicalStructure = {
  id: string;
  nameEn: string;
  nameAr: string;
  system: BodySystem;
  descriptionEn: string;
  descriptionAr: string;
  nursingRelevanceEn: string;
  nursingRelevanceAr: string;
  /** Name of the corresponding node in the curated 3D model (see
   * public/models/anatomy/human-body.glb), for click-to-select and
   * highlighting in AnatomyViewer. Left undefined when no matching model
   * geometry exists yet — never a fake/approximate mapping. */
  modelNodeName?: string;
};
