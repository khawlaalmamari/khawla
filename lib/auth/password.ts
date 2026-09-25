import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// A fixed, precomputed hash (cost 12, matching SALT_ROUNDS) with no real
// password behind it. Login calls verifyPassword against this when no
// account matches the submitted identifier, so a nonexistent identifier
// takes roughly as long to reject as a wrong password for a real one —
// otherwise the near-instant response for "no such user" (skipping bcrypt
// entirely) would let an attacker enumerate registered emails/usernames by
// timing alone.
const TIMING_NORMALIZATION_HASH =
  "$2b$12$0tPPb8nabnNHwBs7t81zauVAsM/fx8MssdbY/XHecnh3t3ffTNCua";

export async function wastePasswordVerifyTime(): Promise<void> {
  await bcrypt.compare("timing-normalization", TIMING_NORMALIZATION_HASH);
}
