import { z } from "zod";

// Any letters (Arabic, Latin, etc.) or digits, plus underscore. No spaces.
export const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(24)
  .regex(/^[\p{L}\p{N}_]+$/u, "lettersNumbersUnderscoreOnly");

// At least 8 chars, one lowercase, one uppercase, one digit, one symbol.
export const strongPasswordSchema = z
  .string()
  .min(8)
  .max(72)
  .regex(/[a-z]/, "weakPassword")
  .regex(/[A-Z]/, "weakPassword")
  .regex(/\d/, "weakPassword")
  .regex(/[^A-Za-z0-9]/, "weakPassword");

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2).max(80),
    username: usernameSchema,
    email: z.string().trim().email(),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1),
    locale: z.enum(["ar", "en"]).default("ar"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordMismatch",
  });

export const loginSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export const verifyCodeSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().regex(/^\d{6}$/, "invalidCode"),
});

export const adminCreateUserSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  username: usernameSchema,
  email: z.string().trim().email(),
  password: strongPasswordSchema,
  role: z.enum(["student", "admin"]).default("student"),
});

export const adminUpdateUserSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  username: usernameSchema.optional(),
  email: z.string().trim().email().optional(),
  role: z.enum(["student", "admin"]).optional(),
  emailVerified: z.boolean().optional(),
});

export const adminUpdateLessonSchema = z.object({
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  objectivesEn: z.array(z.string().trim().min(1)),
  objectivesAr: z.array(z.string().trim().min(1)),
  contentEn: z.string().trim().min(1),
  contentAr: z.string().trim().min(1),
  summaryEn: z.string().trim().min(1),
  summaryAr: z.string().trim().min(1),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordMismatch",
  });
