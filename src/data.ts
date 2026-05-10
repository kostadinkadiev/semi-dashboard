import {
  Activity,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Code2,
  Compass,
  FileText,
  Globe2,
  HeartPulse,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  PauseCircle,
  Radio,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProjectState = 'active' | 'complete' | 'scheduled' | 'parked' | 'drafted' | 'tested';
export type TaskState = 'now' | 'waiting' | 'done';
export type Tone = 'blue' | 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface Project {
  id: string;
  title: string;
  status: string;
  state: ProjectState;
  description: string;
  next: string;
  icon: LucideIcon;
  tone: Tone;
}

export interface Task {
  title: string;
  state: TaskState;
  detail?: string;
}

export interface Command {
  phrase: string;
  description: string;
  scope: 'DM' | 'News' | 'Site' | 'Discord';
}

export interface Signal {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: Tone;
}

export const projects: Project[] = [
  {
    id: 'discord-os',
    title: 'Discord OS',
    status: 'v1 complete',
    state: 'complete',
    description: 'Task channels, pinned setup posts, channel topics, and low-noise behavior rules.',
    next: 'Review after a few days and adjust noise/progress rules only if needed.',
    icon: MessageSquare,
    tone: 'violet',
  },
  {
    id: 'command-center',
    title: 'Command Center',
    status: 'v1 active',
    state: 'active',
    description: 'Markdown-backed project, task, preference, idea, command, and memory files.',
    next: 'Keep it light: update only when meaningful context changes.',
    icon: LayoutDashboard,
    tone: 'blue',
  },
  {
    id: 'daily-news',
    title: 'Daily News',
    status: 'scheduled · 06:00 Skopje',
    state: 'scheduled',
    description: 'Daily news report delivered as one markdown attachment in #semi-news.',
    next: 'Evaluate the next GPT-5.5 report against the quality spec.',
    icon: Newspaper,
    tone: 'cyan',
  },
  {
    id: 'briefing',
    title: 'Personal Briefing',
    status: 'on-demand tested',
    state: 'tested',
    description: 'Read-only Gmail + Calendar briefings triggered by “brief me”.',
    next: 'Keep on-demand; consider weekday morning DM only if it proves useful.',
    icon: CalendarDays,
    tone: 'emerald',
  },
  {
    id: 'memory',
    title: 'Memory & Continuity',
    status: 'v1 complete',
    state: 'complete',
    description: 'Durable memory rules and long-term context without storing secrets or raw private content.',
    next: 'Review periodically after meaningful changes.',
    icon: BookOpen,
    tone: 'amber',
  },
  {
    id: 'personal-site',
    title: 'Personal Site',
    status: 'parked · good as-is',
    state: 'parked',
    description: 'Kosta’s public site and GitHub profile are cleaned up and verified.',
    next: 'No active work unless Kosta asks later.',
    icon: Globe2,
    tone: 'slate',
  },
];

export const tasks: Task[] = [
  {
    title: 'Review tomorrow’s #semi-news GPT-5.5 daily report',
    state: 'now',
    detail: 'Use DAILY_NEWS_QUALITY.md as the rubric.',
  },
  {
    title: 'Ask Kosta for feedback after the first report lands',
    state: 'now',
    detail: 'Only if he does not comment first.',
  },
  {
    title: 'Use #semi-personal-site for future site tasks',
    state: 'now',
  },
  {
    title: 'Kosta feedback on news format/sources',
    state: 'waiting',
  },
  {
    title: 'Discord OS v1',
    state: 'done',
    detail: 'Channels, topics, pinned setup posts complete.',
  },
  {
    title: 'Gmail + Calendar read-only access',
    state: 'done',
    detail: 'Configured and verified for personal briefing.',
  },
  {
    title: 'Semi command menu',
    state: 'done',
    detail: 'Natural-language triggers documented.',
  },
];

export const commands: Command[] = [
  { phrase: 'brief me', description: 'Calendar + Gmail read-only personal briefing.', scope: 'DM' },
  { phrase: 'status', description: 'Fast snapshot of active systems and waiting items.', scope: 'DM' },
  { phrase: 'next project', description: 'Pick and start a useful small project.', scope: 'DM' },
  { phrase: "review today's report", description: 'Evaluate the daily news report quality.', scope: 'News' },
  { phrase: 'summarize this channel', description: 'Summarize recent channel context and next actions.', scope: 'Discord' },
  { phrase: 'site status', description: 'Check repo/site/deploy state.', scope: 'Site' },
];

export const signals: Signal[] = [
  {
    label: 'Gmail + Calendar',
    value: 'Read-only ready',
    detail: 'Personal briefing can run safely on demand.',
    icon: Inbox,
    tone: 'emerald',
  },
  {
    label: 'OpenClaw updates',
    value: 'Quiet heartbeat',
    detail: 'Checks at most daily; reports only if useful.',
    icon: HeartPulse,
    tone: 'rose',
  },
  {
    label: 'News cron',
    value: '06:00 Skopje',
    detail: 'Next report should arrive in #semi-news.',
    icon: Clock3,
    tone: 'cyan',
  },
  {
    label: 'Capabilities',
    value: 'Tested',
    detail: 'Browser, Discord, image, coding, cron, subagents.',
    icon: Code2,
    tone: 'violet',
  },
];

export const recentWins = [
  'Created Discord OS v1 and pinned task-channel setup posts.',
  'Configured read-only Gmail + Calendar access.',
  'Built personal briefing v1 and tested it.',
  'Created command menu and status command definitions.',
  'Started Semi Dashboard as a real product.',
];

export const navItems = [
  { href: '#overview', label: 'Overview', icon: Activity },
  { href: '#projects', label: 'Projects', icon: Compass },
  { href: '#tasks', label: 'Tasks', icon: CheckCircle2 },
  { href: '#commands', label: 'Commands', icon: Sparkles },
  { href: '#signals', label: 'Signals', icon: Radio },
  { href: '#notes', label: 'Notes', icon: FileText },
];

export const stateIcon: Record<ProjectState, LucideIcon> = {
  active: Activity,
  complete: CheckCircle2,
  scheduled: Bell,
  parked: PauseCircle,
  drafted: CircleDashed,
  tested: CheckCircle2,
};
