#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', '..');
const appRoot = resolve(import.meta.dirname, '..');

const sourceFiles = {
  projects: resolve(root, 'PROJECTS.md'),
  tasks: resolve(root, 'TASKS.md'),
  commands: resolve(root, 'SEMI_COMMANDS.md'),
};

function read(path) {
  return readFileSync(path, 'utf8');
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function inferState(status) {
  const s = status.toLowerCase();
  if (s.includes('parked') || s.includes('skipped')) return 'parked';
  if (s.includes('scheduled')) return 'scheduled';
  if (s.includes('tested')) return 'tested';
  if (s.includes('draft')) return 'drafted';
  if (s.includes('complete') || s.includes('live')) return 'complete';
  return 'active';
}

const iconCycle = ['message-square', 'layout-dashboard', 'newspaper', 'calendar-days', 'book-open', 'monitor-dot', 'globe-2'];
const toneCycle = ['violet', 'blue', 'cyan', 'emerald', 'amber', 'blue', 'slate'];

const projectOverrides = {
  'discord-os': { icon: 'message-square', tone: 'violet' },
  'semi-command-center': { icon: 'layout-dashboard', tone: 'blue' },
  'daily-news-summary': { icon: 'newspaper', tone: 'cyan' },
  'personal-site': { icon: 'globe-2', tone: 'slate' },
  'personal-briefing': { icon: 'calendar-days', tone: 'emerald' },
  'memory-continuity': { icon: 'book-open', tone: 'amber' },
  'semi-dashboard': { icon: 'monitor-dot', tone: 'blue', state: 'active' },
};

function extractSectionValue(section, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escapedLabel}:\\n([\\s\\S]*?)(?=\\n\\n[A-Z][A-Za-z /]+:|\\n\\n### |$)`, 'm');
  const match = section.match(re);
  if (!match) return '';
  return match[1]
    .split('\n')
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter(Boolean)
    .join(' ');
}

function parseProjects(markdown) {
  const sections = markdown.split(/\n(?=### \d+\. )/g).filter((section) => section.startsWith('### '));
  return sections.map((section, index) => {
    const title = section.match(/^### \d+\.\s+(.+)$/m)?.[1]?.trim() ?? `Project ${index + 1}`;
    const status = section.match(/^Status:\s+\*\*(.+?)\*\*/m)?.[1]?.trim() ?? 'active';
    const id = slug(title);
    const override = projectOverrides[id] ?? {};
    const description = extractSectionValue(section, 'Purpose') || 'No purpose captured yet.';
    const next = extractSectionValue(section, 'Next') || extractSectionValue(section, 'Next possible improvements') || 'No next action captured.';
    return {
      id,
      title,
      status,
      state: override.state ?? inferState(status),
      description,
      next,
      icon: override.icon ?? iconCycle[index % iconCycle.length],
      tone: override.tone ?? toneCycle[index % toneCycle.length],
    };
  });
}

function parseTasks(markdown) {
  const tasks = [];
  let state = 'now';
  for (const line of markdown.split('\n')) {
    if (line.startsWith('## Waiting')) state = 'waiting';
    if (line.startsWith('## Done')) state = 'done';
    const match = line.match(/^- \[( |x)\]\s+(.+)$/);
    if (!match) continue;
    tasks.push({ title: match[2].trim(), state: match[1] === 'x' ? 'done' : state });
  }
  return tasks;
}

function parseCommands(markdown) {
  const commands = [];
  const sections = markdown.split(/\n(?=### `)/g).filter((section) => section.startsWith('### `'));
  for (const section of sections) {
    const phrase = section.match(/^### `(.+?)`/m)?.[1];
    if (!phrase) continue;
    const lines = section.split('\n').map((line) => line.trim()).filter(Boolean);
    const description = lines.find((line) => !line.startsWith('###') && !line.endsWith(':') && !line.startsWith('-')) ?? 'Command documented.';
    const scope = section.includes('Use in `#semi-news`') || phrase.includes('report') || phrase.includes('news') ? 'News'
      : section.includes('site') ? 'Site'
      : phrase.includes('channel') || phrase.includes('pin') ? 'Discord'
      : 'DM';
    commands.push({ phrase, description, scope });
  }
  return commands.slice(0, 8);
}

const projects = parseProjects(read(sourceFiles.projects));
const tasks = parseTasks(read(sourceFiles.tasks)).filter((task) => task.state !== 'done').concat(
  parseTasks(read(sourceFiles.tasks)).filter((task) => task.state === 'done').slice(-8),
);
const commands = parseCommands(read(sourceFiles.commands));

const content = {
  meta: {
    generatedAt: new Date().toISOString(),
    source: 'scripts/sync-dashboard-data.mjs',
    version: '0.2.0',
  },
  projects,
  tasks,
  commands,
  signals: [
    { label: 'Gmail + Calendar', value: 'Read-only ready', detail: 'Personal briefing can run safely on demand.', icon: 'inbox', tone: 'emerald' },
    { label: 'OpenClaw updates', value: 'Quiet heartbeat', detail: 'Checks at most daily; reports only if useful.', icon: 'heart-pulse', tone: 'rose' },
    { label: 'News cron', value: '06:00 Skopje', detail: 'Next report should arrive in #semi-news.', icon: 'clock-3', tone: 'cyan' },
    { label: 'Dashboard deploy', value: 'GitHub Pages live', detail: 'Repo, workflow, build, and live page verified.', icon: 'monitor-dot', tone: 'blue' },
  ],
  recentWins: parseTasks(read(sourceFiles.tasks)).filter((task) => task.state === 'done').slice(-6).map((task) => task.title),
};

const output = `export type ProjectState = 'active' | 'complete' | 'scheduled' | 'parked' | 'drafted' | 'tested';
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

export const dashboardContent: DashboardContent = ${JSON.stringify(content, null, 2)};
`;

writeFileSync(resolve(appRoot, 'src/content.ts'), output);
console.log(`Synced ${projects.length} projects, ${tasks.length} tasks, ${commands.length} commands.`);
