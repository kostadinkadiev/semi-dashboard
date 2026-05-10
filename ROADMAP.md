# Semi Dashboard Roadmap

Semi Dashboard is the shared product surface for Kosta and Semi.

## Product Direction

The dashboard should become the place where we can see:

- what Semi is tracking
- what Kosta and Semi are building
- what is waiting or blocked
- what useful automations are active
- what commands/workflows are available

It should stay calm, readable, and useful — not turn into a noisy admin panel.

## v1 — Shipped

Status: complete.

- React + TypeScript + Vite app
- Custom polished UI
- Project cards
- Task state
- Command menu
- System signals
- Recent wins
- GitHub Pages deploy

Live: <https://kostadinkadiev.github.io/semi-dashboard/>

## v1.1 — Proper Foundation

Status: in progress / current.

- Typed `src/content.ts` module
- `scripts/sync-dashboard-data.mjs` generator
- Dashboard reads from generated content rather than hardcoded UI data
- GitHub Pages workflow remains simple and reliable

## v2 — Real Sync

Goal: make the dashboard refresh from Semi's command-center files with minimal manual editing.

Possible approach:

1. Semi updates markdown files during work:
   - `PROJECTS.md`
   - `TASKS.md`
   - `SEMI_COMMANDS.md`
2. Run `npm run sync:data` in the dashboard repo.
3. Commit/push generated `src/content.ts`.
4. GitHub Pages deploys the updated UI.

Open questions:

- Should dashboard state live in markdown, JSON, GitHub Issues, or a mix?
- Should completed tasks be summarized instead of listed raw?
- Should private/personal information be excluded by default? Recommendation: yes.

## v3 — Live Product

Possible future features:

- GitHub Issues as backing store for dashboard tasks
- OpenClaw status card
- last briefing summary, privacy-safe
- daily news report quality score
- dashboard changelog
- manual “refresh dashboard” command
- mobile-first command cards
- small auth layer if private data ever appears

## Privacy Rules

- Public dashboard must not expose private email/calendar content.
- Public dashboard should avoid personal secrets, tokens, auth details, and raw transcripts.
- Keep private operational details in local files unless Kosta explicitly wants them public.

## Current Recommendation

Keep the dashboard public but privacy-safe.

Use it for:
- projects
- task state
- commands
- public-safe signals
- product roadmap

Do not use it for:
- raw email/calendar data
- private reminders
- sensitive personal notes
- auth/config details
