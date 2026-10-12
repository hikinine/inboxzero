'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, CircleHelp, FileText, FolderKanban, Home, LayoutGrid, ListChecks, PanelLeft, Plus, Search, Settings, Users, Workflow } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface NavItem {
  Icon: LucideIcon
  label: string
  active?: boolean
}

const MAIN: NavItem[] = [
  { Icon: Home, label: 'Início' },
  { Icon: FolderKanban, label: 'Projetos', active: true },
  { Icon: ListChecks, label: 'Tarefas' },
  { Icon: FileText, label: 'Documentos' },
  { Icon: Users, label: 'Equipe' },
  { Icon: Workflow, label: 'Automações' },
]
const BOTTOM: NavItem[] = [
  { Icon: Settings, label: 'Configurações' },
  { Icon: CircleHelp, label: 'Ajuda' },
]
const PROJECTS = [
  { name: 'Lançamento Q4', client: 'Kavo Ltda', progress: 72, status: 'Em andamento', members: ['AS', 'BR', 'CM'], extra: 2, updated: 'há 2 h' },
  { name: 'Site institucional', client: 'Lumi Tecnologia', progress: 38, status: 'Em andamento', members: ['DL', 'EF'], extra: 0, updated: 'há 5 h' },
  { name: 'App de delivery', client: 'Nuvem Fit', progress: 94, status: 'Revisão', members: ['AS', 'GH', 'IJ'], extra: 4, updated: 'ontem' },
  { name: 'Migração para nuvem', client: 'Prisma Dados', progress: 12, status: 'Planejamento', members: ['BR'], extra: 0, updated: 'ontem' },
  { name: 'Campanha Black Friday', client: 'Lojix', progress: 55, status: 'Em andamento', members: ['CM', 'DL', 'EF'], extra: 1, updated: 'há 3 dias' },
  { name: 'Portal do cliente', client: 'Banco Vetor', progress: 100, status: 'Concluído', members: ['AS', 'IJ'], extra: 0, updated: 'há 1 semana' },
]
const FILTERS = ['Todos', 'Em andamento', 'Revisão', 'Concluídos']

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const cls = `flex h-9 items-center gap-3 rounded-md text-sm transition-colors ${collapsed ? 'justify-center px-0' : 'px-2.5'} ${
    item.active ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
  }`
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={<a href="#" className={cls} aria-label={item.label} />}>
          <item.Icon className="size-4 shrink-0" />
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }
  return (
    <a href="#" className={cls}>
      <item.Icon className="size-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </a>
  )
}

export default function AppShellSidebarColapsavel() {
  const [collapsed, setCollapsed] = useState(false)
  const [filter, setFilter] = useState('Todos')
  const visible = PROJECTS.filter((p) => filter === 'Todos' || (filter === 'Concluídos' ? p.status === 'Concluído' : p.status === filter))
  return (
    <TooltipProvider>
      <div className="flex min-h-[640px] w-full bg-background text-foreground">
        <aside className={`hidden shrink-0 flex-col border-r bg-sidebar transition-[width] duration-200 md:flex ${collapsed ? 'w-14' : 'w-60'}`}>
          <div className={`flex h-14 items-center border-b ${collapsed ? 'justify-center' : 'gap-2 px-4'}`}>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LayoutGrid className="size-4" />
            </span>
            {!collapsed && <span className="truncate font-semibold">Fluxo</span>}
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-2">
            {MAIN.map((item) => (
              <NavLink key={item.label} item={item} collapsed={collapsed} />
            ))}
          </nav>
          <div className="flex flex-col gap-1 border-t p-2">
            {BOTTOM.map((item) => (
              <NavLink key={item.label} item={item} collapsed={collapsed} />
            ))}
            <div className={`mt-1 flex items-center gap-3 rounded-md py-1.5 ${collapsed ? 'justify-center' : 'px-2'}`}>
              <Avatar size="sm">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="min-w-0 text-sm">
                  <div className="truncate font-medium">Ana Souza</div>
                  <div className="truncate text-xs text-muted-foreground">Administradora</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center gap-2 border-b px-4 sm:px-6">
            <Button variant="ghost" size="icon-sm" aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'} onClick={() => setCollapsed((c) => !c)}>
              <PanelLeft />
            </Button>
            <span className="hidden text-sm text-muted-foreground sm:inline">Espaço de trabalho</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium">Projetos</span>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Buscar">
                <Search />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Notificações">
                <Bell />
              </Button>
              <Button size="sm" className="ml-1">
                <Plus data-icon="inline-start" /> Novo projeto
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Projetos</h1>
                <p className="text-sm text-muted-foreground">6 ativos · 2 entregues este mês</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => (
                  <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${filter === f ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <div key={p.name} className="rounded-xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.client}</div>
                    </div>
                    <Badge variant={p.status === 'Concluído' ? 'default' : 'outline'}>{p.status}</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span className="tabular-nums">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="mt-1.5" />
                  <div className="mt-4 flex items-center justify-between">
                    <AvatarGroup>
                      {p.members.map((m) => (
                        <Avatar key={m} size="sm">
                          <AvatarFallback>{m}</AvatarFallback>
                        </Avatar>
                      ))}
                      {p.extra > 0 && <AvatarGroupCount>+{p.extra}</AvatarGroupCount>}
                    </AvatarGroup>
                    <span className="text-xs text-muted-foreground">Atualizado {p.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
