// Phase 3B-1.7 — 3D Anatomy: real curated model in place.
//
// public/models/anatomy/human-body.glb is a curated subset of BodyParts3D
// 4.0 (via github.com/ashemag/human-atlas), built and validated outside
// this repository by the Phase 3B-1.6 conversion script. It contains 11
// top-level named nodes — heart, aorta, lungs, trachea, brain, stomach,
// liver, small_intestine, kidneys, urinary_bladder, spine — mapped to
// educational content in lib/anatomy-3d/structures.ts via each entry's
// `modelNodeName`. See public/models/anatomy/ATTRIBUTION.md for the
// required license attribution.
//
// If this file is ever missing or fails to load, AnatomyViewer
// (components/anatomy-3d/anatomy-viewer.tsx) falls back to a clearly-
// labeled procedural placeholder body instead of crashing — that fallback
// path must be preserved. Never replace this asset with anything whose
// license hasn't been verified (see the Phase 3B-1.5/3B-1.6 reports).
export const ANATOMY_MODEL_URL = "/models/anatomy/human-body.glb";
