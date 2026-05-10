import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Archive,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  Columns3,
  FolderKanban,
  GripVertical,
  ListTodo,
  MessageSquare,
  PanelLeft,
  Plus,
  RefreshCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { commands, dashboardMeta, projects, tasks, type Command, type Project, type Task } from './data';
import './styles.css';

type BoardKey = 'projects' | 'tasks' | 'commands';
type CardKind = 'project' | 'task' | 'command';
type DragPayload = { kind: CardKind; id: string };

type BoardCard = {
  id: string;
  kind: CardKind;
  title: string;
  eyebrow: string;
  description: string;
  meta?: string;
  sourceState: string;
};

type Column = {
  id: string;
  title: string;
  hint: string;
  icon: React.ComponentType<{ size?: number }>;
};

const projectColumns: Column[] = [
  { id: 'active', title: 'Active', hint: 'Work that is alive now', icon: CircleDot },
  { id: 'scheduled', title: 'Scheduled / Tested', hint: 'Running systems and validated flows', icon: Clock3 },
  { id: 'complete', title: 'Complete', hint: 'Shipped or stable v1s', icon: CheckCircle2 },
  { id: 'parked', title: 'Parked', hint: 'Intentionally paused', icon: Archive },
];

const taskColumns: Column[] = [
  { id: 'now', title: 'Now', hint: 'Small next actions', icon: CircleDot },
  { id: 'waiting', title: 'Waiting', hint: 'Needs signal or feedback', icon: Clock3 },
  { id: 'done', title: 'Done', hint: 'Recent wins', icon: CheckCircle2 },
];

const commandColumns: Column[] = [
  { id: 'DM', title: 'DM', hint: 'Personal commands', icon: MessageSquare },
  { id: 'News', title: 'News', hint: '#semi-news workflows', icon: Columns3 },
  { id: 'Site', title: 'Site', hint: '#semi-personal-site', icon: FolderKanban },
  { id: 'Discord', title: 'Discord', hint: 'Channel operations', icon: PanelLeft },
];

function projectToCard(project: Project): BoardCard {
  return {
    id: `project:${project.id}`,
    kind: 'project',
    title: project.title,
    eyebrow: project.status,
    description: project.description,
    meta: `Next: ${project.next}`,
    sourceState: project.state === 'tested' ? 'scheduled' : project.state,
  };
}

function taskToCard(task: Task, index: number): BoardCard {
  return {
    id: `task:${index}:${task.title}`,
    kind: 'task',
    title: task.title,
    eyebrow: task.state,
    description: task.detail ?? 'No extra detail yet.',
    sourceState: task.state,
  };
}

function commandToCard(command: Command): BoardCard {
  return {
    id: `command:${command.scope}:${command.phrase}`,
    kind: 'command',
    title: command.phrase,
    eyebrow: command.scope,
    description: command.description,
    sourceState: command.scope,
  };
}

function createInitialBoard(cards: BoardCard[], columns: Column[]) {
  const board = Object.fromEntries(columns.map((column) => [column.id, [] as string[]]));
  const cardMap: Record<string, BoardCard> = {};
  for (const card of cards) {
    cardMap[card.id] = card;
    const column = board[card.sourceState] ? card.sourceState : columns[0].id;
    board[column].push(card.id);
  }
  return { board, cardMap };
}

function App() {
  const [activeBoard, setActiveBoard] = useState<BoardKey>('projects');
  const [query, setQuery] = useState('');

  const initial = useMemo(() => ({
    projects: createInitialBoard(projects.map(projectToCard), projectColumns),
    tasks: createInitialBoard(tasks.map(taskToCard), taskColumns),
    commands: createInitialBoard(commands.map(commandToCard), commandColumns),
  }), []);

  const [boards, setBoards] = useState(initial);
  const [dragging, setDragging] = useState<DragPayload | null>(null);

  const activeConfig = {
    projects: { title: 'Projects', subtitle: 'A Trello-style view of everything Semi and Kosta are building.', columns: projectColumns },
    tasks: { title: 'Tasks', subtitle: 'Move cards as priorities change. This is local UI state for now.', columns: taskColumns },
    commands: { title: 'Commands', subtitle: 'Natural language controls grouped by where they are useful.', columns: commandColumns },
  }[activeBoard];

  const current = boards[activeBoard];
  const visibleCard = (card: BoardCard) => {
    if (!query.trim()) return true;
    const haystack = `${card.title} ${card.eyebrow} ${card.description} ${card.meta ?? ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  };

  function moveCard(cardId: string, targetColumn: string, beforeId?: string) {
    setBoards((previous) => {
      const nextBoard = structuredClone(previous[activeBoard].board) as Record<string, string[]>;
      for (const column of Object.keys(nextBoard)) {
        nextBoard[column] = nextBoard[column].filter((id) => id !== cardId);
      }
      const targetCards = nextBoard[targetColumn] ?? [];
      if (beforeId && targetCards.includes(beforeId)) {
        const index = targetCards.indexOf(beforeId);
        targetCards.splice(index, 0, cardId);
      } else {
        targetCards.push(cardId);
      }
      nextBoard[targetColumn] = targetCards;
      return {
        ...previous,
        [activeBoard]: { ...previous[activeBoard], board: nextBoard },
      };
    });
  }

  function moveByButton(cardId: string, direction: -1 | 1) {
    const columns = activeConfig.columns.map((column) => column.id);
    const currentColumn = columns.find((column) => current.board[column]?.includes(cardId));
    if (!currentColumn) return;
    const currentIndex = columns.indexOf(currentColumn);
    const target = columns[currentIndex + direction];
    if (target) moveCard(cardId, target);
  }

  function resetBoard() {
    setBoards((previous) => ({ ...previous, [activeBoard]: initial[activeBoard] }));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Dashboard menu">
        <a className="brand" href="#top" aria-label="Semi Dashboard home">
          <span className="brand-mark">◆</span>
          <span>
            <strong>Semi</strong>
            <small>Board</small>
          </span>
        </a>

        <nav className="board-menu" aria-label="Boards">
          <button className={activeBoard === 'projects' ? 'active' : ''} onClick={() => setActiveBoard('projects')}>
            <FolderKanban size={18} /> Projects
          </button>
          <button className={activeBoard === 'tasks' ? 'active' : ''} onClick={() => setActiveBoard('tasks')}>
            <ListTodo size={18} /> Tasks
          </button>
          <button className={activeBoard === 'commands' ? 'active' : ''} onClick={() => setActiveBoard('commands')}>
            <Sparkles size={18} /> Commands
          </button>
        </nav>

        <div className="sidebar-footer">
          <p>Generated from Semi state</p>
          <span>{new Date(dashboardMeta.generatedAt).toLocaleString()}</span>
        </div>
      </aside>

      <main id="top" className="board-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Kosta × Semi</p>
            <h1>{activeConfig.title}</h1>
            <p>{activeConfig.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cards" />
            </label>
            <button className="soft-button" onClick={resetBoard}>
              <RefreshCcw size={17} /> Reset
            </button>
          </div>
        </header>

        <section className="board" aria-label={`${activeConfig.title} board`}>
          {activeConfig.columns.map((column) => {
            const Icon = column.icon;
            const cardIds = current.board[column.id] ?? [];
            const cards = cardIds.map((id) => current.cardMap[id]).filter(Boolean).filter(visibleCard);
            return (
              <div
                key={column.id}
                className="list"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const payload = readDragPayload(event) ?? dragging;
                  if (payload) moveCard(payload.id, column.id);
                  setDragging(null);
                }}
              >
                <div className="list-header">
                  <div>
                    <h2><Icon size={18} /> {column.title}</h2>
                    <p>{column.hint}</p>
                  </div>
                  <span>{cards.length}</span>
                </div>

                <div className="cards">
                  {cards.map((card) => (
                    <article
                      key={card.id}
                      className={`card card-${card.kind}`}
                      draggable
                      onDragStart={(event) => {
                        const payload = { kind: card.kind, id: card.id } satisfies DragPayload;
                        setDragging(payload);
                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('application/json', JSON.stringify(payload));
                      }}
                      onDragEnd={() => setDragging(null)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        const payload = readDragPayload(event) ?? dragging;
                        if (payload && payload.id !== card.id) moveCard(payload.id, column.id, card.id);
                        setDragging(null);
                      }}
                    >
                      <div className="card-grip"><GripVertical size={16} /></div>
                      <div className="card-body">
                        <div className="card-topline">
                          <span>{card.eyebrow}</span>
                          <div className="card-movers" aria-label="Move card buttons">
                            <button onClick={() => moveByButton(card.id, -1)} aria-label="Move left"><ChevronLeft size={15} /></button>
                            <button onClick={() => moveByButton(card.id, 1)} aria-label="Move right"><ChevronRight size={15} /></button>
                          </div>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        {card.meta ? <small>{card.meta}</small> : null}
                      </div>
                    </article>
                  ))}
                  <button className="add-card" type="button">
                    <Plus size={16} /> Add card later
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

function readDragPayload(event: React.DragEvent): DragPayload | null {
  try {
    const raw = event.dataTransfer.getData('application/json');
    if (!raw) return null;
    return JSON.parse(raw) as DragPayload;
  } catch {
    return null;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
