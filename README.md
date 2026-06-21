# moravy.oum — agent console

A personal site that behaves like a terminal you can talk to. Visitors type
questions (or built-in commands) and a live AI assistant answers from a curated
record of Moravy's work. The thesis: *don't argue that AI delivers value — let people
interrogate the proof.*

- **Design:** amber-phosphor terminal — boot sequence, monospace, CRT vignette + scanlines, blinking cursor.
- **Chat:** streaming Claude (**Haiku 4.5**) grounded in `lib/knowledge.ts`. Built-in shell commands (`help`, `whoami`, `work`, `ai`, `incidents`, `contact`, `clear`) answer instantly; anything else falls through to the AI.
- **Stack:** Next.js 15 (App Router) · React 19 · `@anthropic-ai/sdk` · hand-written CSS (no UI framework).

## Run locally

```bash
cp .env.local.example .env.local      # then paste your key into ANTHROPIC_API_KEY
npm install                           # already done if node_modules exists
npm run dev                           # http://localhost:3000
```

Without a key the site still runs — the AI replies with an "offline" notice and the
built-in commands keep working.

## Where to edit

| What | File |
|---|---|
| What the AI knows / says about Moravy | `lib/knowledge.ts` (`KNOWLEDGE`, `SYSTEM_PROMPT`) |
| Model (default Haiku 4.5) | `lib/knowledge.ts` (`CHAT_MODEL`) or `CHAT_MODEL` env var |
| Boot lines, built-in commands, suggested questions, links | `lib/profile.ts` |
| Visual design | `app/globals.css` |
| Console behaviour | `components/Console.tsx` |

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the env var **`ANTHROPIC_API_KEY`** in Project → Settings → Environment Variables.
4. Deploy. Point a custom domain at it and update `metadataBase` in `app/layout.tsx`.

## Before it goes viral — read this

The `/api/chat` endpoint spends your Anthropic credits on every visitor, and it's
public. Haiku keeps cost low, and the route already caps tokens, trims history, and
limits input length. But there is **no rate limiting** yet — if the LinkedIn post takes
off, add one (e.g. Vercel KV / Upstash Ratelimit by IP) before, not after. A spend cap
on the Anthropic console is a sensible backstop too.

## Content altitude

`lib/knowledge.ts` is deliberately written at "fuller detail, light scrub": real
outcomes and numbers, but no internal ticket IDs, internal service/repo names, or
coworkers' names. Keep that line when you edit it — it's a public endpoint.
