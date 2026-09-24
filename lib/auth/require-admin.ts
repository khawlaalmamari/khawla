import { getCurrentUser } from "@/lib/auth/session";

/** Returns the current user if they're an admin, otherwise null. */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
