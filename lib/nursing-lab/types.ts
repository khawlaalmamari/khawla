// Phase 3B-4 — Virtual Nursing Lab Foundation. Static, structured
// educational content only (no patient data, no database) — mirrors the
// pattern already used in lib/anatomy-3d/structures.ts and
// lib/clinical-cases content. Every patient here is fictional.

import type { BodySystem } from "@/lib/anatomy-3d/types";

export type NursingSkillDifficulty = "BEGINNER" | "INTERMEDIATE";

/** Phase 3D — one response a student can choose for a `ClinicalChoicePrompt`,
 * with its own honest clinical explanation. There is no "correct" option:
 * every option's explanation is real and accurate for the skill's own
 * (already-recorded) findings — the point is teaching the reasoning behind
 * each choice, never scoring or revealing a hidden right answer. */
export type ClinicalChoiceOption = {
  id: string;
  labelEn: string;
  labelAr: string;
  explanationEn: string;
  explanationAr: string;
};

/** Phase 3D — a lightweight, bounded clinical-reasoning branch attached to
 * a procedure step: a question grounded in the findings the student just
 * recorded, with a small set of response options. Used for both
 * "Interpret" (step 6: what do these findings mean?) and "Respond" (step
 * 7: what should happen next?) in the existing procedure — never a
 * separate simulation engine, never a diagnosis. */
export type ClinicalChoicePrompt = {
  promptEn: string;
  promptAr: string;
  options: ClinicalChoiceOption[];
};

/** One step of a guided procedure (Step 6/7). `isObservationStep` marks the
 * single step in a skill where the student records the scenario's clinical
 * observations (Step 9) instead of a plain "mark complete" action. */
export type ProcedureStepDef = {
  stepNumber: number;
  instructionEn: string;
  instructionAr: string;
  requiredActionEn: string;
  requiredActionAr: string;
  isObservationStep?: boolean;
  /** Phase 3D — brief, accurate explanation of why this step matters
   * clinically, shown inline under the instruction. Optional: only steps
   * with real, verified rationale show one — never generic filler. */
  rationaleEn?: string;
  rationaleAr?: string;
  /** Optional: gives this step's rationale text a distinct accent color so
   * students can visually tell it apart from the instruction above it.
   * Scoped per-step so other steps' rationale (same shared markup) are
   * never affected — only set where explicitly requested. */
  emphasizeRationale?: boolean;
  /** Phase 3D — see ClinicalChoicePrompt. Optional: only steps 6 and 7 of
   * each skill (Interpret / Respond) use this in practice. */
  choicePrompt?: ClinicalChoicePrompt;
};

/** A single deterministic, scenario-defined clinical observation (Step 9).
 * Values are fixed content shipped with the skill — never randomized and
 * never editable from the client. */
export type ObservationDef = {
  id: string;
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
};

/** A fictional simulated patient profile (Step 8) — never real patient
 * information, and intentionally simple for this first version. */
export type SimulatedPatientDef = {
  nameEn: string;
  nameAr: string;
  age: number;
  gender: "male" | "female";
  scenarioEn: string;
  scenarioAr: string;
  communicationStateEn: string;
  communicationStateAr: string;
};

/** One nursing skill's full structured content (Step 4). Static
 * TypeScript content, not a database table. */
export type NursingSkill = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  /** Reuses the existing anatomy BodySystem enum/labels (Step 5) — a skill
   * may touch more than one system (e.g. Vital Signs). */
  relevantSystems: BodySystem[];
  /** Existing lib/anatomy-3d/structures.ts ids only — never a duplicated
   * or invented anatomy entity (Step 5). */
  relevantStructureIds: string[];
  difficulty: NursingSkillDifficulty;
  estimatedMinutes: number;
  prerequisitesEn: string[];
  prerequisitesAr: string[];
  learningObjectivesEn: string[];
  learningObjectivesAr: string[];
  requiredEquipmentEn: string[];
  requiredEquipmentAr: string[];
  patient: SimulatedPatientDef;
  preparationStepsEn: string[];
  preparationStepsAr: string[];
  procedureSteps: ProcedureStepDef[];
  observations: ObservationDef[];
  /** Phase 3C-1 — slug of an existing, published lib/clinical-cases case
   * that is a genuine educational continuation of this skill (see
   * prisma/content/clinical-cases.js for the slugs that actually exist).
   * A slug, not a database id, to match the existing Clinical Case
   * routing convention (/clinical-cases/[slug]) and to stay static
   * content — no database relation. Left undefined when no existing case
   * is an honest fit; never invented. */
  relatedClinicalCaseSlug?: string;
};

/** Phase 3C-1 — safe, student-facing preview of a related Clinical Case,
 * resolved server-side from the existing lib/clinical-cases/queries.ts
 * (which never includes hiddenDataJson) before being passed to the
 * client SkillPractice component. Never carries hidden case data. */
export type RelatedCasePreview = {
  slug: string;
  title: string;
  description: string;
  difficultyLabel: string;
  categoryLabel: string;
};
