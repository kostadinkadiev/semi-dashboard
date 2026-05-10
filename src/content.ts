export type ProjectState = 'active' | 'complete' | 'scheduled' | 'parked' | 'drafted' | 'tested';
export type TaskState = 'now' | 'waiting' | 'done';
export type Tone = 'blue' | 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface ProjectContent {
  id: string;
  title: string;
  status: string;
  state: ProjectState;
  description: string;
  next: string;
  icon: string;
  tone: Tone;
}

export interface TaskContent {
  title: string;
  state: TaskState;
  detail?: string;
}

export interface CommandContent {
  phrase: string;
  description: string;
  scope: 'DM' | 'News' | 'Site' | 'Discord';
}

export interface SignalContent {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: Tone;
}

export interface DashboardContent {
  meta: {
    generatedAt: string;
    source: string;
    version: string;
  };
  projects: ProjectContent[];
  tasks: TaskContent[];
  commands: CommandContent[];
  signals: SignalContent[];
  recentWins: string[];
}

export const dashboardContent: DashboardContent = {
  "meta": {
    "generatedAt": "2026-05-10T21:18:59.054Z",
    "source": "scripts/sync-dashboard-data.mjs",
    "version": "0.2.0"
  },
  "projects": [
    {
      "id": "discord-os",
      "title": "Discord OS",
      "status": "v1 complete",
      "state": "complete",
      "description": "Make Semi useful across Kosta's Discord server without becoming noisy.",
      "next": "Add more task channels if needed.",
      "icon": "message-square",
      "tone": "violet"
    },
    {
      "id": "semi-command-center",
      "title": "Semi Command Center",
      "status": "v1 started",
      "state": "active",
      "description": "Keep lightweight project/task/preference/idea state in files so context survives across sessions and Discord channels.",
      "next": "Use these files during real work.",
      "icon": "layout-dashboard",
      "tone": "blue"
    },
    {
      "id": "daily-news-summary",
      "title": "Daily News Summary",
      "status": "active / scheduled; quality spec drafted",
      "state": "scheduled",
      "description": "Deliver a daily news report in `#semi-news`.",
      "next": "Review tomorrow's output quality against `DAILY_NEWS_QUALITY.md`.",
      "icon": "newspaper",
      "tone": "cyan"
    },
    {
      "id": "personal-site",
      "title": "Personal Site",
      "status": "good as-is / parked",
      "state": "parked",
      "description": "Improve and maintain Kosta's personal website and public GitHub profile.",
      "next": "No active work unless Kosta asks later.",
      "icon": "globe-2",
      "tone": "slate"
    },
    {
      "id": "personal-briefing",
      "title": "Personal Briefing",
      "status": "v1 tested",
      "state": "tested",
      "description": "Use read-only Gmail + Calendar access to give Kosta concise personal briefings when useful.",
      "next": "Keep on-demand command “brief me”.",
      "icon": "calendar-days",
      "tone": "emerald"
    },
    {
      "id": "memory-continuity",
      "title": "Memory & Continuity",
      "status": "v1 complete",
      "state": "complete",
      "description": "Preserve durable context so Semi improves across sessions without over-documenting everything.",
      "next": "Review memory periodically after meaningful changes.",
      "icon": "book-open",
      "tone": "amber"
    },
    {
      "id": "semi-identity-polish",
      "title": "Semi Identity Polish",
      "status": "parked / skipped for now",
      "state": "parked",
      "description": "Give Semi a coherent lightweight visual/profile identity without overdoing it.",
      "next": "No active work unless Kosta wants to revisit identity/avatar later.",
      "icon": "globe-2",
      "tone": "slate"
    },
    {
      "id": "semi-command-menu",
      "title": "Semi Command Menu",
      "status": "v1 complete",
      "state": "complete",
      "description": "Give Kosta simple natural-language phrases for triggering Semi's useful workflows.",
      "next": "Use these naturally in Discord.",
      "icon": "message-square",
      "tone": "violet"
    },
    {
      "id": "status-command",
      "title": "Status Command",
      "status": "v1 complete",
      "state": "complete",
      "description": "Make `status` responses consistent, concise, and grounded in current project/task files.",
      "next": "Use when Kosta asks `status` or similar.",
      "icon": "layout-dashboard",
      "tone": "blue"
    },
    {
      "id": "semi-dashboard",
      "title": "Semi Dashboard",
      "status": "v1 live",
      "state": "active",
      "description": "A real product UI for Kosta and Semi to track projects, tasks, commands, signals, and shared work.",
      "next": "Make v2 data-driven from generated JSON or GitHub issues.",
      "icon": "monitor-dot",
      "tone": "blue"
    }
  ],
  "tasks": [
    {
      "title": "Optional: manually update Discord bot avatar using generated Semi avatar.",
      "state": "now"
    },
    {
      "title": "Plan Semi Dashboard v2 data sync.",
      "state": "now"
    },
    {
      "title": "Review tomorrow's `#semi-news` GPT-5.5 daily report against `DAILY_NEWS_QUALITY.md`.",
      "state": "now"
    },
    {
      "title": "Ask Kosta for feedback after the first daily news report lands, if he doesn't comment first.",
      "state": "now"
    },
    {
      "title": "Use `#semi-personal-site` for future personal site tasks.",
      "state": "now"
    },
    {
      "title": "Keep `PROJECTS.md`, `TASKS.md`, `PREFERENCES.md`, and `IDEAS.md` updated as we work.",
      "state": "now"
    },
    {
      "title": "Kosta gives feedback on the news report format/sources.",
      "state": "waiting"
    },
    {
      "title": "Create `SEMI_IDENTITY_POLISH.md`.",
      "state": "done"
    },
    {
      "title": "Create Discord server emoji `:semi:`.",
      "state": "done"
    },
    {
      "title": "Test one on-demand personal briefing.",
      "state": "done"
    },
    {
      "title": "Create `SEMI_COMMANDS.md` natural-language command menu.",
      "state": "done"
    },
    {
      "title": "Create `STATUS_COMMAND.md`.",
      "state": "done"
    },
    {
      "title": "Build Semi Dashboard v1.",
      "state": "done"
    },
    {
      "title": "Push `semi-dashboard` repo to GitHub.",
      "state": "done"
    },
    {
      "title": "Deploy Semi Dashboard to GitHub Pages.",
      "state": "done"
    }
  ],
  "commands": [
    {
      "phrase": "brief me",
      "description": "Run an on-demand personal briefing.",
      "scope": "DM"
    },
    {
      "phrase": "what's next?",
      "description": "Pick a useful next project from current state.",
      "scope": "DM"
    },
    {
      "phrase": "status",
      "description": "Summarize current Semi setup and active work.",
      "scope": "DM"
    },
    {
      "phrase": "remember this: ...",
      "description": "Store a durable preference, decision, or important context.",
      "scope": "DM"
    },
    {
      "phrase": "forget/remove this: ...",
      "description": "Remove or revise stored context.",
      "scope": "DM"
    },
    {
      "phrase": "check OpenClaw updates",
      "description": "Run a read-only OpenClaw status/update check.",
      "scope": "News"
    },
    {
      "phrase": "review today's report",
      "description": "Evaluate the latest daily news report against `DAILY_NEWS_QUALITY.md`.",
      "scope": "News"
    },
    {
      "phrase": "tune news format",
      "description": "Adjust the daily news quality spec or cron prompt after Kosta gives feedback.",
      "scope": "News"
    }
  ],
  "signals": [
    {
      "label": "Gmail + Calendar",
      "value": "Read-only ready",
      "detail": "Personal briefing can run safely on demand.",
      "icon": "inbox",
      "tone": "emerald"
    },
    {
      "label": "OpenClaw updates",
      "value": "Quiet heartbeat",
      "detail": "Checks at most daily; reports only if useful.",
      "icon": "heart-pulse",
      "tone": "rose"
    },
    {
      "label": "News cron",
      "value": "06:00 Skopje",
      "detail": "Next report should arrive in #semi-news.",
      "icon": "clock-3",
      "tone": "cyan"
    },
    {
      "label": "Dashboard deploy",
      "value": "GitHub Pages live",
      "detail": "Repo, workflow, build, and live page verified.",
      "icon": "monitor-dot",
      "tone": "blue"
    }
  ],
  "recentWins": [
    "Test one on-demand personal briefing.",
    "Create `SEMI_COMMANDS.md` natural-language command menu.",
    "Create `STATUS_COMMAND.md`.",
    "Build Semi Dashboard v1.",
    "Push `semi-dashboard` repo to GitHub.",
    "Deploy Semi Dashboard to GitHub Pages."
  ]
};
