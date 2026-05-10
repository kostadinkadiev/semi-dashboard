# Semi Dashboard

A lightweight shared command center for Kosta and Semi.

## Purpose

Semi Dashboard turns the markdown command-center system into a small product UI:

- active projects
- open tasks
- personal briefing state
- daily news status
- useful commands
- system/capability cards

## Tech Stack

- React + TypeScript
- Vite
- CSS custom properties, no heavy UI framework
- GitHub Pages deployment workflow

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

v1.1 uses a typed generated content module extracted from Semi's command-center files.

## Sync Dashboard Data

From this repo:

```bash
npm run sync:data
npm run build
```

The sync script reads local command-center files from the parent workspace and regenerates `src/content.ts`.

## Roadmap

See `ROADMAP.md`.
