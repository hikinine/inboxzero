'use client'

import { useState } from 'react'
import { Bell, Calendar, ChevronDown, ChevronRight, KanbanSquare, MessageSquare, MoreHorizontal, Paperclip, Plus, Search, SlidersHorizontal, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

type Col = 'todo' | 'doing' | 'review' | 'done'
type Priority = 'Alta' | 'Média' | 'Baixa'

interface Task {
  id: number
  title: string
  desc?: string
  tags: string[]
  due: string
  overdue?: boolean
  who: string
  comments: number
  files?: number
  col: Col
  priority: Priority
}

const COLUMNS: Array<{ id: Col; title: string; tone: string }> = [
  { id: 'todo', title: 'A fazer', tone: 'bg-muted-foreground/50' },
  { id: 'doing', title: 'Em progresso', tone: 'bg-sky-500' },
  { id: 'review', title: 'Em revisão', tone: 'bg-amber-500' },
  { id: 'done', title: 'Concluído', tone: 'bg-emerald-500' },
]
const TAG_TONE: Record<string, string> = {
  Design: 'bg-violet-500/15 text-violet-700 dark:text-violet-400',
  Frontend: 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
  Backend: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Bug: 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
  Marketing: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  Infra: 'bg-slate-500/15 text-slate-700 dark:text-slate-300',
}
const PRIORITY_TONE: Record<Priority, string> = { Alta: 'bg-rose-500', Média: 'bg-amber-500', Baixa: 'bg-emerald-500' }

const INITIAL: Task[] = [
  { id: 1, title: 'Fluxo de onboarding com metas', desc: 'Telas de boas-vindas, conexão de banco e primeira meta.', tags: ['Design'], due: '14 out', who: 'LM', comments: 4, files: 2, col: 'todo', priority: 'Alta' },
  { id: 2, title: 'Notificação de fatura próxima do vencimento', tags: ['Backend'], due: '16 out', who: 'FA', comments: 1, col: 'todo', priority: 'Média' },
  { id: 3, title: 'Texto da página de planos', desc: 'Revisar benefícios do plano Família.', tags: ['Marketing'], due: '18 out', who: 'JC', comments: 0, col: 'todo', priority: 'Baixa' },
  { id: 4, title: 'Tela de metas compartilhadas', tags: ['Frontend', 'Design'], due: '11 out', overdue: true, who: 'MT', comments: 7, files: 3, col: 'doing', priority: 'Alta' },
  { id: 5, title: 'Sincronização Open Finance a cada 4h', desc: 'Job com retentativa e alerta no Slack.', tags: ['Backend', 'Infra'], due: '13 out', who: 'FA', comments: 2, col: 'doing', priority: 'Alta' },
  { id: 6, title: 'Gráfico de gastos por categoria', tags: ['Frontend'], due: '15 out', who: 'LM', comments: 3, col: 'doing', priority: 'Média' },
  { id: 7, title: 'Saldo negativo aparece como positivo no extrato', tags: ['Bug', 'Frontend'], due: '10 out', overdue: true, who: 'MT', comments: 5, col: 'review', priority: 'Alta' },
  { id: 8, title: 'Migração para Postgres 17', tags: ['Infra'], due: '12 out', who: 'RP', comments: 2, files: 1, col: 'review', priority: 'Média' },
  { id: 9, title: 'Campanha de lançamento 2.0', tags: ['Marketing'], due: '8 out', who: 'JC', comments: 9, files: 4, col: 'done', priority: 'Média' },
  { id: 10, title: 'Dark mode em todas as telas', tags: ['Frontend', 'Design'], due: '6 out', who: 'LM', comments: 12, col: 'done', priority: 'Baixa' },
  { id: 11, title: 'Login com biometria', tags: ['Frontend', 'Backend'], due: '3 out', who: 'RP', comments: 6, col: 'done', priority: 'Alta' },
]

const PEOPLE = ['LM', 'FA', 'JC', 'MT', 'RP']

export default function AppKanban() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL)
  const [q, setQ] = useState('')
  const [prio, setPrio] = useState<Priority | 'Todas'>('Todas')
  const [mine, setMine] = useState(false)
  const [nextId, setNextId] = useState(100)

  const visible = tasks.filter((t) => (prio === 'Todas' || t.priority === prio) && (!mine || t.who === 'LM') && (!q.trim() || t.title.toLowerCase().includes(q.trim().toLowerCase())))
  const moveNext = (id: number) =>
    setTasks((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t
        const i = COLUMNS.findIndex((c) => c.id === t.col)
        const next = COLUMNS[Math.min(i + 1, COLUMNS.length - 1)]
        return next ? { ...t, col: next.id } : t
      }),
    )
  const addTask = (col: Col = 'todo') => {
    const id = nextId
    setNextId(id + 1)
    setTasks((ts) => [{ id, title: `Nova tarefa #${id - 99}`, tags: ['Frontend'], due: '20 out', who: 'LM', comments: 0, col, priority: 'Média' }, ...ts])
  }

  return (
    <div className="flex h-screen min-h-[640px] w-full flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <KanbanSquare className="size-4" />
          </span>
          <span className="hidden sm:inline">Quadro</span>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
            Lançamento Kaya 2.0 <ChevronDown data-icon="inline-end" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Lançamento Kaya 2.0</DropdownMenuItem>
            <DropdownMenuItem>Site institucional</DropdownMenuItem>
            <DropdownMenuItem>Infra 2026</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Novo projeto…</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon-sm" aria-label="Favoritar projeto">
          <Star className="fill-amber-400 text-amber-400" />
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar cards" className="w-52 pl-8" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar cards" />
          </div>
          <AvatarGroup className="hidden lg:flex">
            {PEOPLE.map((p) => (
              <Avatar key={p} size="sm">
                <AvatarFallback>{p}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
          <Button variant="ghost" size="icon-sm" aria-label="Notificações">
            <Bell />
          </Button>
          <Button size="sm" onClick={() => addTask('todo')}>
            <Plus data-icon="inline-start" /> Novo card
          </Button>
        </div>
      </header>

      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-2 text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <SlidersHorizontal className="size-4" /> Filtros
        </span>
        {(['Todas', 'Alta', 'Média', 'Baixa'] as const).map((p) => (
          <button key={p} type="button" onClick={() => setPrio(p)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${prio === p ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
            {p !== 'Todas' && <span className={`size-1.5 rounded-full ${PRIORITY_TONE[p]}`} />}
            {p === 'Todas' ? 'Todas as prioridades' : p}
          </button>
        ))}
        <button type="button" onClick={() => setMine((m) => !m)} className={`rounded-full border px-3 py-1 text-xs transition-colors ${mine ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
          Só minhas
        </button>
        <span className="ml-auto text-xs text-muted-foreground">
          {visible.length} de {tasks.length} cards
        </span>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto p-4 sm:p-6">
        {COLUMNS.map((c) => {
          const items = visible.filter((t) => t.col === c.id)
          return (
            <section key={c.id} className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/40">
              <header className="flex items-center gap-2 px-3 py-2.5">
                <span className={`size-2 rounded-full ${c.tone}`} />
                <h2 className="text-sm font-medium">{c.title}</h2>
                <span className="rounded-full bg-background px-1.5 text-xs tabular-nums text-muted-foreground ring-1 ring-border">{items.length}</span>
                <Button variant="ghost" size="icon-xs" className="ml-auto" aria-label={`Adicionar em ${c.title}`} onClick={() => addTask(c.id)}>
                  <Plus />
                </Button>
                <Button variant="ghost" size="icon-xs" aria-label={`Opções de ${c.title}`}>
                  <MoreHorizontal />
                </Button>
              </header>
              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
                {items.map((t) => (
                  <article key={t.id} className="group rounded-lg border bg-card p-3 shadow-xs transition-shadow hover:shadow-md">
                    <div className="flex flex-wrap gap-1">
                      {t.tags.map((tag) => (
                        <span key={tag} className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${TAG_TONE[tag] ?? 'bg-muted text-muted-foreground'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`mt-2 text-sm font-medium leading-snug ${c.id === 'done' ? 'text-muted-foreground line-through' : ''}`}>{t.title}</h3>
                    {t.desc && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{t.desc}</p>}
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className={`flex items-center gap-1 ${t.overdue && c.id !== 'done' ? 'font-medium text-rose-600 dark:text-rose-400' : ''}`}>
                        <Calendar className="size-3" /> {t.due}
                      </span>
                      {t.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="size-3" /> {t.comments}
                        </span>
                      )}
                      {t.files && (
                        <span className="flex items-center gap-1">
                          <Paperclip className="size-3" /> {t.files}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1.5">
                        <span className={`size-1.5 rounded-full ${PRIORITY_TONE[t.priority]}`} title={`Prioridade ${t.priority}`} />
                        <Avatar size="sm">
                          <AvatarFallback>{t.who}</AvatarFallback>
                        </Avatar>
                      </span>
                    </div>
                    {c.id !== 'done' && (
                      <button type="button" onClick={() => moveNext(t.id)} className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-dashed py-1 text-[11px] text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100 focus-visible:opacity-100">
                        Mover para a próxima <ChevronRight className="size-3" />
                      </button>
                    )}
                  </article>
                ))}
                {items.length === 0 && <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">Nada por aqui</div>}
                <Button variant="ghost" size="sm" className="justify-start text-muted-foreground" onClick={() => addTask(c.id)}>
                  <Plus data-icon="inline-start" /> Adicionar card
                </Button>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
