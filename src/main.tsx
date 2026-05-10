import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock3,
  GitBranch,
  MinusCircle,
  Sparkles,
} from 'lucide-react';
import {
  commands,
  navItems,
  projects,
  recentWins,
  signals,
  stateIcon,
  tasks,
  type Project,
  type Task,
  type Tone,
} from './data';
import './styles.css';

const toneClass = (tone: Tone) => `tone-${tone}`;

function App() {
  const activeProjects = projects.filter((project) => project.state !== 'parked');
  const parkedProjects = projects.filter((project) => project.state === 'parked');
  const nowTasks = tasks.filter((task) => task.state === 'now');
  const waitingTasks = tasks.filter((task) => task.state === 'waiting');
  const doneTasks = tasks.filter((task) => task.state === 'done');

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Semi Dashboard navigation">
        <a className="brand" href="#top" aria-label="Semi Dashboard home">
          <span className="brand-mark">◆</span>
          <span>
            <strong>Semi</strong>
            <small>Dashboard</small>
          </span>
        </a>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.href} href={item.href}>
                <Icon size={17} />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-card">
          <p className="eyebrow">Mode</p>
          <p>Quiet by default. Useful when needed.</p>
        </div>
      </aside>

      <main id="top">
        <Hero />

        <section id="overview" className="section overview-grid" aria-labelledby="overview-title">
          <div className="section-heading compact">
            <p className="eyebrow">Overview</p>
            <h2 id="overview-title">What matters right now</h2>
          </div>
          <Metric label="Active systems" value={String(activeProjects.length)} detail="running or ready" />
          <Metric label="Open tasks" value={String(nowTasks.length)} detail="current next actions" />
          <Metric label="Waiting" value={String(waitingTasks.length)} detail="needs signal/feedback" />
          <Metric label="Parked" value={String(parkedProjects.length)} detail="intentionally paused" />
        </section>

        <section id="signals" className="section" aria-labelledby="signals-title">
          <SectionHeading eyebrow="Signals" title="System health at a glance" subtitle="The dashboard starts as static product UI, backed by Semi's current command-center state." />
          <div className="signal-grid">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article key={signal.label} className={`signal-card ${toneClass(signal.tone)}`}>
                  <div className="icon-pill"><Icon size={20} /></div>
                  <div>
                    <p className="signal-label">{signal.label}</p>
                    <h3>{signal.value}</h3>
                    <p>{signal.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <SectionHeading eyebrow="Projects" title="Shared workbench" subtitle="Semi and Kosta's active systems, parked work, and next useful moves." />
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        <section id="tasks" className="section two-column" aria-labelledby="tasks-title">
          <div>
            <SectionHeading eyebrow="Tasks" title="Next actions" subtitle="Small enough to act on, visible enough to not lose." />
            <TaskList title="Now" tasks={nowTasks} icon="now" />
            <TaskList title="Waiting" tasks={waitingTasks} icon="waiting" />
          </div>
          <div className="done-panel">
            <TaskList title="Recent wins" tasks={doneTasks.slice(-6).reverse()} icon="done" />
          </div>
        </section>

        <section id="commands" className="section" aria-labelledby="commands-title">
          <SectionHeading eyebrow="Commands" title="Natural-language controls" subtitle="No rigid slash-command ceremony. Say these normally in Discord." />
          <div className="command-grid">
            {commands.map((command) => (
              <article key={command.phrase} className="command-card">
                <div>
                  <code>{command.phrase}</code>
                  <p>{command.description}</p>
                </div>
                <span>{command.scope}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="section notes" aria-labelledby="notes-title">
          <div>
            <p className="eyebrow">Product direction</p>
            <h2 id="notes-title">From markdown to product</h2>
            <p>
              v1 is intentionally simple: beautiful static dashboard, seeded from the command-center files.
              The next version can ingest JSON generated by Semi, GitHub issues, OpenClaw task state, or a tiny local API.
            </p>
            <div className="note-actions">
              <a href="https://github.com/kostadinkadiev/semi-dashboard" target="_blank" rel="noreferrer">
                <GitBranch size={18} /> GitHub repo <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="wins-card">
            <h3>Recent wins</h3>
            <ul>
              {recentWins.map((win) => <li key={win}>{win}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero-orb" />
      <p className="eyebrow">Kosta × Semi</p>
      <h1>A shared command center for projects, briefings, tasks, and quiet automation.</h1>
      <p className="hero-copy">
        Semi Dashboard turns our working memory into a product: focused enough for daily use,
        flexible enough to grow with the way we actually work.
      </p>
      <div className="hero-actions">
        <a href="#projects">View projects</a>
        <a href="#commands" className="secondary">Command menu</a>
      </div>
    </header>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const StateIcon = stateIcon[project.state];
  return (
    <article className={`project-card ${toneClass(project.tone)}`}>
      <div className="project-topline">
        <div className="icon-pill"><Icon size={21} /></div>
        <span className={`status status-${project.state}`}><StateIcon size={14} /> {project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="next-box">
        <span>Next</span>
        <p>{project.next}</p>
      </div>
    </article>
  );
}

function TaskList({ title, tasks: list, icon }: { title: string; tasks: Task[]; icon: 'now' | 'waiting' | 'done' }) {
  const Icon = icon === 'done' ? CheckCircle2 : icon === 'waiting' ? Clock3 : Circle;
  return (
    <div className="task-list">
      <h3><Icon size={18} /> {title}</h3>
      {list.length === 0 ? <p className="empty">Nothing here.</p> : null}
      {list.map((task) => (
        <article key={`${title}-${task.title}`} className={`task-row task-${task.state}`}>
          <div>
            <strong>{task.title}</strong>
            {task.detail ? <p>{task.detail}</p> : null}
          </div>
          {task.state === 'waiting' ? <MinusCircle size={18} /> : <CheckCircle2 size={18} />}
        </article>
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
