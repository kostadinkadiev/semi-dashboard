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
  MonitorDot,
  Newspaper,
  PauseCircle,
  Radio,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  dashboardContent,
  type CommandContent,
  type ProjectContent,
  type ProjectState,
  type SignalContent,
  type TaskContent,
  type TaskState,
  type Tone,
} from './content';

export type { CommandContent as Command, ProjectState, TaskState, Tone } from './content';

export interface Project extends Omit<ProjectContent, 'icon'> {
  icon: LucideIcon;
}

export interface Signal extends Omit<SignalContent, 'icon'> {
  icon: LucideIcon;
}

export type Task = TaskContent;

const iconMap = {
  activity: Activity,
  bell: Bell,
  'book-open': BookOpen,
  'calendar-days': CalendarDays,
  'check-circle-2': CheckCircle2,
  'circle-dashed': CircleDashed,
  'clock-3': Clock3,
  'code-2': Code2,
  compass: Compass,
  'file-text': FileText,
  'globe-2': Globe2,
  'heart-pulse': HeartPulse,
  inbox: Inbox,
  'layout-dashboard': LayoutDashboard,
  'message-square': MessageSquare,
  'monitor-dot': MonitorDot,
  newspaper: Newspaper,
  'pause-circle': PauseCircle,
  radio: Radio,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof iconMap;

function iconFor(name: string): LucideIcon {
  return iconMap[(name as IconName)] ?? CircleDashed;
}

export const dashboardMeta = dashboardContent.meta;

export const projects: Project[] = dashboardContent.projects.map((project) => ({
  ...project,
  icon: iconFor(project.icon),
}));

export const tasks: Task[] = dashboardContent.tasks;
export const commands: CommandContent[] = dashboardContent.commands;

export const signals: Signal[] = dashboardContent.signals.map((signal) => ({
  ...signal,
  icon: iconFor(signal.icon),
}));

export const recentWins = dashboardContent.recentWins;

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
