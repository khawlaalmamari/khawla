# E-nursing — Build Report (Phase 1)

This report follows the structure requested in the original brief (section 19).

## 1. Scope of this phase

The original request describes a very large platform (26 course modules with full
content, 3D anatomy models, a working AI tutor, Clerk auth, 22 pages, full QA). Building
all of that in one pass, untested, would have meant a lot of decorative screens with no
real functionality behind them — exactly what the brief said not to do. Instead, this
phase delivers one complete, working vertical slice end to end, plus the scaffolding
needed to extend it:

- Landing page (bilingual, matches the provided copy)
- Real signup/login/logout, account lockout, forgot/reset password
- Two fully content-complete Anatomy modules (Introduction to Human Anatomy, Skeletal
  System): 5 lessons + a 15-question graded quiz each (10 lessons / 30 questions total)
- Progress tracking wired to a real database, feeding a real dashboard
- A basic but functional Study Planner (create a plan per course)
- The Ask Novia chat widget UI, wired to a stubbed-but-real backend

Every one of these was tested against the running app (via Playwright), not just built
and assumed to work.

## 2. What was actually built

**Pages created:** `/` (landing), `/login`, `/signup`, `/forgot-password`,
`/reset-password`, `/dashboard`, `/anatomy`, `/anatomy/[module]`,
`/anatomy/[module]/[lesson]`, `/anatomy/[module]/quiz`,
`/anatomy/[module]/quiz/[attemptId]`, `/physiology`, `/physiology/[module]`,
`/study-planner`.

**API routes:** `/api/auth/{signup,login,logout,forgot-password,reset-password}`,
`/api/quiz/[moduleSlug]`, `/api/quiz/[moduleSlug]/attempt`, `/api/study-plans`,
`/api/novia/chat`.

**Functions that work end to end (verified, not assumed):**
- Sign up → session cookie set → redirected to dashboard.
- Log in with wrong password 3 times → account locks for 15 minutes → 4th attempt
  correctly rejected with a lockout message; a security notification is created.
- Log out → session cleared → protected pages correctly redirect to `/login`.
- Forgot password → reset token generated and stored → reset password → log in with the
  new password succeeds.
- Browsing the Anatomy course shows all 13 real module titles; only "Skeletal System" is
  clickable (it has real content), the rest are visibly marked "Coming soon" rather than
  linking to empty pages.
- Reading a lesson renders real objectives, bilingual markdown content, a terminology
  glossary, a summary, and references.
- Taking the quiz, submitting wrong answers → 7% score, correctly marked as failed, full
  per-question breakdown with explanations and "your answer vs. correct answer".
- Retaking with all-correct answers → 100%, marked passed, `ProgressRecord` flips to
  `COMPLETED`, a completion notification is created.
- Dashboard shows real numbers pulled from the database (overall %, per-course progress,
  recent quiz attempts, average score, notifications) — nothing hardcoded.
- Study Planner: submitting a plan actually persists to the database (verified directly
  against the DB, not just the UI).
- Ask Novia: asking a question returns the honest "the AI tutor isn't configured yet"
  message rather than a fabricated answer, because no AI provider key is set.
- Arabic (RTL) and English (LTR) both render correctly, including full layout mirroring,
  and the language choice persists via a cookie.
- Mobile viewport (390px) tested: layout reflows correctly, and the floating Novia
  button sits in an empty corner without covering any navigation or buttons.

## 3. Tests actually run

- `npm run build` (TypeScript type-check + production build) — passes, run repeatedly
  after each feature.
- `npm run lint` (ESLint) — passes, zero errors.
- Manual end-to-end flows via Playwright against the running dev server: signup, login
  lockout, logout, password reset, lesson browsing, quiz pass/fail, dashboard data,
  study plan persistence, Ask Novia not-configured path, RTL/LTR rendering, mobile
  viewport — all confirmed working, with screenshots reviewed.
- Direct database inspection (Prisma) to confirm `ProgressRecord`, `QuizAttempt`, and
  `StudyPlan` rows actually match what the UI showed, not just that the UI didn't error.

**Not run:** automated test suite (none exists yet — there is no Jest/Playwright test
config committed, only ad hoc verification during this build). Adding a real test suite
is listed as remaining work below.

## 4. Remaining work

- **23 of 26 course modules** (13 Anatomy + 13 Physiology, minus Introduction to Human
  Anatomy and Skeletal System) have titles/descriptions only — no lessons or quiz
  content yet. The structure is real and extensible (same schema, same seed pattern in
  `prisma/content/`), but the content itself needs to be written module by module.
- **3D Anatomy Explorer** — not built. This needs a real, licensed 3D anatomy model
  (e.g. a GLTF skeleton/organ model) plus a Three.js viewer; building a fake placeholder
  and presenting it as a real interactive model would violate the brief's own
  instruction not to do that, so it was left out rather than faked.
- **Clerk integration** — not wired up. A working local auth system was built instead
  (bcrypt + signed cookies + lockout), structured so it can be swapped for Clerk later,
  since Clerk requires a real Clerk account/keys this environment doesn't have.
- **Ask Novia real AI backend** — the request/response plumbing and DB persistence are
  built and correct, but no AI provider key was available to test the real model call
  against. The code path exists (`lib/novia/reply.ts`) but is unexercised.
- **Notifications page / Help & Support / Profile & Settings pages** — not built yet;
  notifications currently surface on the dashboard only.
- **Email delivery** — forgot-password currently logs the reset link to the server
  console (and returns it in the API response) in development, since no email provider
  is configured. This must be replaced with real email sending before production use.
- **Automated test suite** — none yet; all verification so far is manual/scripted
  against a running instance.
- **Rate limiting** is in-memory (per server instance) — fine for one dev/demo instance,
  needs a shared store (e.g. Redis) for a multi-instance production deployment.

## 5. Clerk configuration needed (if adopted later)

Not currently used. If you want to switch from the local auth system to Clerk:
1. Create a Clerk application, get the publishable + secret keys.
2. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env`.
3. Replace `lib/auth/session.ts` and the `/api/auth/*` routes with Clerk's Next.js SDK
   (`@clerk/nextjs`) middleware and components. The rest of the app reads the current
   user via `getCurrentUser()` in `lib/auth/session.ts`, so that's the one seam to swap.

## 6. API keys / external services needed

- **`AI_PROVIDER_API_KEY`** — an Anthropic API key, to make "Ask Novia" actually answer
  questions (`lib/novia/reply.ts` already calls the Anthropic Messages API when this is
  set).
- **An email provider** (e.g. Resend, SMTP) — to send real password-reset emails instead
  of the current dev-only console log.
- **A hosted Postgres database** for a live deployment (e.g. Neon, Supabase) — the app
  already runs on Postgres (schema and local dev were switched over from the initial
  SQLite setup), so this is just provisioning, not a code change.
- **A licensed 3D anatomy model** — needed before the 3D Explorer can be built for real.

## 7. Content/assets needing further work

- Lesson content for the remaining 24 modules (written by a subject-matter reviewer
  ideally, since this phase's Skeletal System content was written from general
  textbook-level anatomy knowledge and should be checked against your university's
  actual syllabus before being treated as authoritative).
- A licensed 3D model set for the Anatomy Explorer.
- Arabic medical terminology should be reviewed by a native Arabic-speaking nursing
  instructor for regional/curricular conventions (Oman-specific terminology can vary).

## 8. How to run the project

Requires a PostgreSQL database (local install or a free hosted one like Neon).

```bash
npm install
cp .env.example .env   # edit DATABASE_URL and SESSION_SECRET
npx prisma db push
node prisma/seed.js
npm run dev
```
Then open http://localhost:3000 and create an account through the sign-up page.

## 9. How to deploy

Not deployed as part of this phase (no hosting account was available to deploy to),
but the app is deployment-ready. See the README's "Deploying a live version" section
for the exact Vercel + Neon steps. Summary:
1. Provision a Postgres database (e.g. Neon's free tier) and copy its connection string.
2. Create a Vercel project from the GitHub repo (branch `claude/graphify-qkx15c`).
3. Set `DATABASE_URL`, `SESSION_SECRET`, and optionally `AI_PROVIDER_API_KEY` as Vercel
   environment variables.
4. Run `npx prisma db push` and `node prisma/seed.js` once against that database from
   your own machine (pointing `DATABASE_URL` at it via the command line).
5. Deploy — Vercel builds automatically on every push and gives a live
   `https://your-project.vercel.app` URL.
