# E-nursing

**From Knowledge to Clinical Thinking / من المعرفة إلى التفكير السريري**

A bilingual (Arabic/English) medical learning platform for first-year nursing students in
Oman, built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma + PostgreSQL.

This is a first build phase: a complete, working vertical slice (landing page → real
auth → two fully-content Anatomy modules with lessons and graded quizzes → progress
tracking → dashboard → Ask Novia widget), rather than a shallow scaffold of every
screen described in the original brief. See `PROJECT_REPORT.md` for exactly what is
implemented vs. still pending.

## Getting started (local development)

You need a PostgreSQL database — either installed locally or a free hosted one (e.g.
[Neon](https://neon.tech) or [Supabase](https://supabase.com)).

```bash
npm install
cp .env.example .env     # then edit DATABASE_URL and SESSION_SECRET in .env
npx prisma db push       # creates the tables
node prisma/seed.js      # seeds courses, modules, and the two full lesson/quiz modules
npm run dev
```

Open http://localhost:3000. Create an account via "إنشاء حساب" / "Sign Up" — there is no
seeded demo user, since real accounts should go through the actual signup flow.

## Deploying a live version (Vercel + Neon)

1. **Create a Postgres database** at https://neon.tech (free tier) — click "Create
   Project," then copy the connection string it gives you (starts with `postgresql://`).
2. **Create a Vercel account** at https://vercel.com (free tier), sign in with GitHub.
3. **Import the project**: on Vercel's dashboard, "Add New… → Project," select the
   `khawla` GitHub repo, and pick the `claude/graphify-qkx15c` branch.
4. **Set environment variables** in the Vercel project's Settings → Environment
   Variables, before the first deploy:
   - `DATABASE_URL` → the Neon connection string from step 1
   - `SESSION_SECRET` → any long random string (e.g. generate one with
     `openssl rand -hex 32` in a terminal)
   - `AI_PROVIDER_API_KEY` → optional, leave blank for now
5. **Push the schema to that database once**, from your own machine, before or right
   after the first deploy:
   ```bash
   DATABASE_URL="<the Neon connection string>" npx prisma db push
   DATABASE_URL="<the Neon connection string>" node prisma/seed.js
   ```
6. **Deploy** — Vercel builds and gives you a live `https://your-project.vercel.app`
   link automatically on every push to that branch.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **Prisma 6** + **PostgreSQL** (works the same locally or hosted — just point
  `DATABASE_URL` at whichever instance you're using)
- Custom auth (bcrypt password hashing, signed HTTP-only session cookies via `jose`,
  account lockout after 3 failed attempts) — see `PROJECT_REPORT.md` for why this is a
  placeholder for Clerk rather than Clerk itself
- `react-markdown` for lesson content rendering

## Environment variables

See `.env.example`. Copy it to `.env` and fill in real values:

- `DATABASE_URL` — a PostgreSQL connection string (local or hosted).
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
