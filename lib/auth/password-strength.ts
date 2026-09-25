// Shared with the server-side zod schema in lib/auth/schemas.ts — keep the
// rules in sync there if they change. Also drives the live checklist UI
// (components/auth/password-checklist.tsx), so this is the single source
// of truth for what "strong" means on both sides.
export type PasswordRuleResults = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
  symbol: boolean;
};

export function getPasswordRuleResults(password: string): PasswordRuleResults {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
}

export function isStrongPassword(password: string): boolean {
  return Object.values(getPasswordRuleResults(password)).every(Boolean);
}
