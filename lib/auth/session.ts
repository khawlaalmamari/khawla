import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "en_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { sessionVersion: true },
  });

  const token = await new SignJWT({ sub: userId, sv: user?.sessionVersion ?? 0 })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/**
 * Verifies the session cookie's signature only — it does NOT confirm the
 * session is still valid (see getCurrentUser, which also checks
 * sessionVersion against the database so that a password reset instantly
 * invalidates any other active session for that account).
 */
async function getSessionPayload(): Promise<{ userId: string; sessionVersion: number } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.sub !== "string") return null;
    return { userId: payload.sub, sessionVersion: typeof payload.sv === "number" ? payload.sv : 0 };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSessionPayload();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      username: true,
      fullName: true,
      locale: true,
      role: true,
      emailVerified: true,
      sessionVersion: true,
    },
  });
  if (!user || user.sessionVersion !== session.sessionVersion) return null;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    locale: user.locale,
    role: user.role,
    emailVerified: user.emailVerified,
  };
}

/** Throws-free guard for pages: returns the user or null. Use in Server Components. */
export async function requireUser() {
  const user = await getCurrentUser();
  return user;
}
