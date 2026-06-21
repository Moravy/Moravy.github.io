# moravy-ai-site

An editorial "Dossier" portfolio for Moravy Oum, a software engineer at Xero. The
thesis: *don't take my word that AI is a force-multiplier, interrogate the proof.*
The landing page invites visitors to ask questions and reads back curated,
hand-written answers about real work. There is **no AI and no backend** at runtime:
the "Ask" experience is a fully curated record (`lib/qa.ts`), so the whole site
compiles to static files.

- **Design:** warm editorial print. Cream paper, ink, terracotta accent. Fraunces
  (serif display) + Hanken Grotesk (sans) + IBM Plex Mono (labels). Hand-written
  CSS, no UI framework.
- **Ask:** a curated Q&A "Record" (`lib/qa.ts`) grouped into themed journeys with
  progressive follow-ups. No API, no keyword matching, no free-text guessing.
- **Writing:** markdown essays in `content/blog`, rendered at build time, with
  scheduled weekly-drip publishing (see below).
- **Stack:** Next.js 15 (App Router) · React 19 · `marked` · hand-written CSS.
  Static export (`output: "export"`) hosted on GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables are needed. There are no secrets and no server.

## Build

```bash
npm run build      # writes a fully static site to ./out
```

## Where to edit

| What | File |
|---|---|
| The Ask answers (the curated record) | `lib/qa.ts` |
| Hero, highlights, stats, testimonials, links | `lib/profile.ts` |
| Cohort-standing numbers | `lib/metrics.ts` |
| Blog posts | `content/blog/*.md` |
| Visual design | `app/globals.css` |

## Writing: scheduled publishing

Each post in `content/blog` opens with frontmatter:

```
---
summary: One-paragraph "30-second version" shown at the top of the post.
publishedAt: 2026-06-30
---
# Title
```

A post stays hidden until its `publishedAt` date arrives (compared at build time),
then appears automatically, newest first. The deploy workflow runs on every push
**and on a daily schedule**, so a future-dated post goes live on its date with no
manual step. A post with no `publishedAt` is always visible. To change when a post
drops, edit one date.

## Deploy (GitHub Pages)

Hosted at https://moravy.github.io via `.github/workflows/deploy.yml`:
`npm ci` → `npm run build` → upload `out/` → deploy to Pages. Every push to `main`
redeploys, and a daily scheduled run reveals any newly-due posts. Pages source is
set to "GitHub Actions". `public/.nojekyll` stops Pages from stripping the
`_next/` asset folder (without it, the site loads unstyled).

## Content altitude

Public-safe by design: real outcomes and numbers, but no internal ticket IDs,
service/repo names, or coworkers' names. Keep that line when editing, the repo is
public.
