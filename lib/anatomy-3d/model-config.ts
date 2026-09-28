// Phase 3A — 3D Anatomy Foundation.
//
// PRODUCTION MODEL PLACEMENT:
// To add a real human-body model later, place a single .glb (binary
// glTF) file at:
//
//     public/models/anatomy/human-body.glb
//
// and it will be picked up automatically — no other code changes are
// required. AnatomyViewer (components/anatomy-3d/anatomy-viewer.tsx)
// already attempts to load exactly this path via three.js's GLTFLoader;
// today the file does not exist, so the viewer's existing error/fallback
// path renders a clearly-labeled procedural placeholder body instead of
// crashing. Use a properly licensed or original educational model
// (e.g. CC0/CC-BY assets, or a model your institution has rights to) —
// never an asset copied from an unknown or copyrighted source.
export const ANATOMY_MODEL_URL = "/models/anatomy/human-body.glb";
