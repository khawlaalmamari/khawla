// Phase 3B-4 — Virtual Nursing Lab Foundation. Static, structured
// educational content only (no patient data, no database) — mirrors the
// pattern already used in lib/anatomy-3d/structures.ts and
// lib/clinical-cases content. Every patient here is fictional.

import type { BodySystem } from "@/lib/anatomy-3d/types";

export type NursingSkillDifficulty = "BEGINNER" | "INTERMEDIATE";

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
};
