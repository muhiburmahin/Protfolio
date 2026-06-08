# Portfolio — Md Muhibur Rahman Mahin

Full-stack developer portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and a **Resend**-powered contact API. Includes project case studies, SEO (sitemap, robots, JSON-LD), and CI quality checks.

## Prerequisites

- **Node.js** 20 LTS (recommended)
- **npm** 10+
- [Resend](https://resend.com) account (for contact form email in production)

## Getting started

```bash
git clone <your-repo-url>
cd portfolio
npm ci
cp .env.example .env.local
```

Edit `.env.local` (see [Environment variables](#environment-variables)), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend dashboard](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form messages |
| `CONTACT_FROM_EMAIL` | Verified sender in Resend (`onboarding@resend.dev` for testing) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO, sitemap, Open Graph). Use `http://localhost:3000` locally |

Without `RESEND_API_KEY`, the contact API returns **503** — the form UI still works, but emails are not sent.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server (after build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright UI mode (local debugging) |

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables from `.env.example` in **Project → Settings → Environment Variables**.
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://yourdomain.com`).
6. Deploy. Vercel runs `npm run build` by default.

After deploy, verify:

- `/` — home and sections
- `/projects/medistore` — case study pages
- `/api/contact` — submit the contact form once
- `/sitemap.xml` and `/robots.txt`

## CI (GitHub Actions)

Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

On push/PR to `main` or `master`:

1. **quality** — `lint` → `typecheck` → `build`
2. **e2e** — Playwright (navigation + contact form with mocked API)

## E2E tests (Playwright)

Tests live in `e2e/`. Contact tests **mock** `/api/contact` so CI does not need Resend credentials.

```bash
npm run build
npm run test:e2e
```

First run locally may prompt to install browsers:

```bash
npx playwright install chromium
```

## Project structure (high level)

```
src/
  app/              # App Router pages & API routes
  components/       # UI sections (Hero, Projects, Contact, …)
  data/             # Portfolio content (projects, skills, …)
  lib/              # Utilities, validations, site config
e2e/                # Playwright specs
```

Content edits: update files under `src/data/` (no CMS yet).

## Roadmap (optional, later)

- **CMS (Sanity)** — if you need frequent content edits without code deploys
- **i18n** — Bengali / English
- **Calendly** — “Book a call” CTA
- **Admin panel** — only if content changes are very frequent

## License

Private portfolio project — all rights reserved unless you add a license file.
