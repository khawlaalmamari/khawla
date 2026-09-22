# E-nursing

**From Knowledge to Clinical Thinking / من المعرفة إلى التفكير السريري**

A bilingual (Arabic/English) medical learning platform for first-year nursing students in
Oman, built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma.

This is a first build phase: a complete, working vertical slice (landing page → real
auth → one fully-content Anatomy module with lessons and a graded quiz → progress
tracking → dashboard → Ask Novia widget), rather than a shallow scaffold of every
screen described in the original brief. See `PROJECT_REPORT.md` for exactly what is
implemented vs. still pending.

## Getting started

```bash
npm install
npx prisma db push      # creates the local SQLite database
node prisma/seed.js     # seeds courses, modules, and the Skeletal System lessons/quiz
npm run dev
```

Open http://localhost:3000. Create an account via "إنشاء حساب" / "Sign Up" — there is no
seeded demo user, since real accounts should go through the actual signup flow.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **Prisma 6** + **SQLite** for local/dev persistence (swap to Postgres by changing
  `prisma/schema.prisma`'s datasource and `DATABASE_URL` — no field types need to change)
- Custom auth (bcrypt password hashing, signed HTTP-only session cookies via `jose`,
  account lockout after 3 failed attempts) — see `PROJECT_REPORT.md` for why this is a
  placeholder for Clerk rather than Clerk itself
- `react-markdown` for lesson content rendering

## Environment variables

See `.env.example`. Copy it to `.env` and fill in real values before deploying:

- `DATABASE_URL` — SQLite by default; point at Postgres for production.
- `SESSION_SECRET` — must be a long random value in production.
- `AI_PROVIDER_API_KEY` — optional; without it, the "Ask Novia" widget honestly tells
  students the AI tutor isn't configured yet instead of fabricating answers.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — reserved for a future
  migration from the local auth system to Clerk.

## Project structure

- `app/` — routes (App Router)
- `components/` — UI components, grouped by feature (`auth/`, `course/`, `quiz/`, `novia/`, `study-planner/`, `ui/`)
- `lib/` — server logic: `auth/`, `content/`, `dashboard/`, `i18n/`, `novia/`, `db.ts`
- `prisma/schema.prisma` — data model
- `prisma/content/` — the actual written lesson/quiz content, kept separate from the seed script for readability
- `prisma/seed.js` — idempotent seed script (safe to re-run)
