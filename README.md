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

v1 uses static seed data extracted from Semi's command-center files. Later versions can read from a JSON export, GitHub issues, local API, or OpenClaw-generated artifacts.
