import { z } from "zod";

export const caseDifficultySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const caseCategorySchema = z.enum([
  "CARDIOVASCULAR",
  "RESPIRATORY",
  "GASTROINTESTINAL",
  "NEUROLOGICAL",
  "INFECTIOUS",
  "GENERAL",
]);

export const caseIdSchema = z.string().trim().min(1);

// Not wired to a route this phase — kept ready for the future
// Admin → Clinical Cases → Create/Edit screen (Step 7).
export const bilingualSchema = z.object({ en: z.string().trim().min(1), ar: z.string().trim().min(1) });

export const adminCreateCaseSchema = z.object({
  slug: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionAr: z.string().trim().min(1),
  difficulty: caseDifficultySchema,
  category: caseCategorySchema,
  order: z.number().int().min(0).default(0),
});

export const adminUpdateCaseSchema = adminCreateCaseSchema.partial().extend({
  isPublished: z.boolean().optional(),
});

export const attemptIdSchema = z.string().trim().min(1);

// Body for POST /api/clinical-case-attempts/[attemptId]/messages — the
// student's raw question text (Step 14: length + content validated here,
// never trusted from a client-provided category/role).
export const sendPatientMessageSchema = z.object({
  text: z.string().trim().min(1).max(500),
});

// Phase 2D — Step 7/11: the student's structured reasoning fields. Plain
// strings only (no case data, no patient fields) — each independently
// length-capped; empty is allowed so this doubles as an incremental draft
// save, same as saveNotes below.
export const clinicalReasoningSchema = z.object({
  keyFindings: z.string().max(2000),
  hypotheses: z.string().max(2000),
  supportingEvidence: z.string().max(2000),
  missingInformation: z.string().max(2000),
  recommendedNextAction: z.string().max(2000),
});

// Body for PATCH /api/clinical-case-attempts/[attemptId] — a discriminated
// union so "save notes", "end interview", and "save reasoning" stay
// independently validated on one small route (Step 15) instead of
// separate near-identical routes.
export const updateAttemptSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("saveNotes"), notes: z.string().max(5000) }),
  z.object({ action: z.literal("endInterview") }),
  z.object({ action: z.literal("saveReasoning") }).merge(clinicalReasoningSchema),
]);

// Phase 2C — Step 5/14: the only client input for an assessment request
// is which type to request; the server looks up the actual result from
// the case's own data, never from the request body.
export const assessmentTypeSchema = z.enum([
  "VITAL_SIGNS",
  "GENERAL_INSPECTION",
  "RESPIRATORY",
  "CARDIOVASCULAR",
  "PAIN",
  "PALPATION",
  "AUSCULTATION",
]);

export const requestAssessmentSchema = z.object({
  type: assessmentTypeSchema,
});
