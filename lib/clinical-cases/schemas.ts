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

// Body for PATCH /api/clinical-case-attempts/[attemptId] — a discriminated
// union so "save notes" and "end interview" stay independently validated
// on one small route (Step 15) instead of two near-identical routes.
export const updateAttemptSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("saveNotes"), notes: z.string().max(5000) }),
  z.object({ action: z.literal("endInterview") }),
]);
