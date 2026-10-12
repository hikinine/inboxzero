'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChartColumn, ChevronsUpDown, FolderKanban, House, Inbox, ListChecks, Plus, Settings, Sparkles, UserPlus, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface Projeto {
  nome: string
  progresso: number
  cor: string
  resp: string
}

interface Workspace {
  id: string
  nome: string
  plano: string
  membros: number
  cor: string
  ini: string
  armazenamento: number
  projetos: Projeto[]
}

const WORKSPACES: Workspace[] = [
  {
    id: 'lumi',
    nome: 'Lumi Tecnologia',
    plano: 'Plano Pro',
    membros: 12,
    cor: 'from-violet-500 to-fuchsia-500',
    ini: 'LT',
    armazenamento: 62,
    projetos: [
      { nome: 'Site novo', progresso: 72, cor: 'bg-violet-500', resp: 'AS' },
      { nome: 'App mobile', progresso: 38, cor: 'bg-sky-500', resp: 'BR' },
      { nome: 'Black Friday', progresso: 12, cor: 'bg-amber-500', resp: 'CM' },
    ],
  },
  {
    id: 'kavo',
    nome: 'Kavo Ltda',
    plano: 'Plano Starter',
    membros: 4,
    cor: 'from-sky-500 to-cyan-400',
    ini: 'K',
    armazenamento: 21,
    projetos: [
      { nome: 'Integração com ERP', progresso: 55, cor: 'bg-sky-500', resp: 'DL' },
      { nome: 'Portal de pedidos', progresso: 90, cor: 'bg-emerald-500', resp: 'BR' },
    ],
  },
  {
    id: 'nuvem',
    nome: 'Nuvem Fit',
    plano: 'Plano Business',
    membros: 27,
    cor: 'from-emerald-500 to-lime-400',
    ini: 'NF',
    armazenamento: 84,
    projetos: [
      { nome: 'App de treinos', progresso: 64, cor: 'bg-emerald-500', resp: 'AS' },
      { nome: 'Programa de indicação', progresso: 20, cor: 'bg-rose-500', resp: 'CM' },
      { nome: 'Unidade Campinas', progresso: 100, cor: 'bg-sky-500', resp: 'DL' },
      { nome: 'Marketplace de nutri', progresso: 8, cor: 'bg-amber-500', resp: 'BR' },
    ],
  },
]

const GERAL: { Icon: LucideIcon; label: string; badge?: string; active?: boolean }[] = [
  { Icon: House, label: 'Início' },
  { Icon: Inbox, label: 'Inbox', badge: '4' },
  { Icon: ListChecks, label: 'Minhas tarefas', badge: '7' },
]
const EQUIPE: { Icon: LucideIcon; label: string }[] = [
  { Icon: Users, label: 'Membros' },
  { Icon: ChartColumn, label: 'Relatórios' },
  { Icon: Settings, label: 'Configurações' },
]

export default function SidebarComWorkspaces() {
  const [wsId, setWsId] = useState('lumi')
  const ws = WORKSPACES.find((w) => w.id === wsId) ?? WORKSPACES[0]

  return (
    <SidebarProvider className="min-h-[640px] w-full bg-background text-foreground">
      <Sidebar collapsible="none" className="hidden border-r md:flex">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton size="lg" aria-label="Trocar workspace" />}>
                  <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-semibold text-white', ws.cor)}>{ws.ini}</span>
                  <span className="flex min-w-0 flex-1 flex-col leading-tight">
                    <span className="truncate text-sm font-semibold">{ws.nome}</span>
                    <span className="truncate text-xs text-muted-foreground">{ws.plano}</span>
                  </span>
                  <ChevronsUpDown className="text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={wsId} onValueChange={(v) => setWsId(String(v))}>
                      {WORKSPACES.map((w) => (
                        <DropdownMenuRadioItem key={w.id} value={w.id} className="gap-2.5 py-1.5">
                          <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[11px] font-semibold text-white', w.cor)}>{w.ini}</span>
                          <span className="flex min-w-0 flex-col leading-tight">
                            <span className="truncate font-medium">{w.nome}</span>
                            <span className="truncate text-xs text-muted-foreground">
                              {w.plano} · {w.membros} membros
                            </span>
                          </span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserPlus /> Convidar membros <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings /> Configurações do workspace
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus /> Criar workspace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Geral</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {GERAL.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<a href="#" />}>
                      <item.Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge className="bg-muted">{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Projetos</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Novo projeto">
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive render={<a href="#" />}>
                    <FolderKanban />
                    <span>Todos os projetos</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {ws.projetos.map((p) => (
                      <SidebarMenuSubItem key={p.nome}>
                        <SidebarMenuSubButton href="#">
                          <span className={cn('size-2 shrink-0 rounded-full', p.cor)} />
                          <span>{p.nome}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Equipe</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {EQUIPE.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<a href="#" />}>
                      <item.Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="gap-3 p-3">
          <div className="rounded-lg border bg-background p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Armazenamento</span>
              <span className="text-muted-foreground tabular-nums">{ws.armazenamento}%</span>
            </div>
            <Progress value={ws.armazenamento} className={cn('mt-2', ws.armazenamento >= 80 && '[&_[data-slot=progress-indicator]]:bg-amber-500')} aria-label="Uso do armazenamento" />
            <Button variant="ghost" size="xs" className="mt-2 w-full justify-start px-0 text-primary">
              <Sparkles data-icon="inline-start" /> Aumentar espaço
            </Button>
          </div>
          <div className="flex items-center gap-2 px-1">
            <Avatar size="sm">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <span className="min-w-0 text-sm leading-tight">
              <span className="block truncate font-medium">Ana Souza</span>
              <span className="block truncate text-xs text-muted-foreground">Administradora</span>
            </span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="flex h-14 items-center gap-2 border-b px-4 text-sm sm:px-6">
          <span className="text-muted-foreground">{ws.nome}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Projetos</span>
          <Button size="sm" className="ml-auto">
            <Plus data-icon="inline-start" /> Novo projeto
          </Button>
        </header>
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Projetos</h1>
              <p className="text-sm text-muted-foreground">
                {ws.projetos.length} ativos em {ws.nome}
              </p>
            </div>
            <Badge variant="outline">{ws.membros} membros</Badge>
          </div>
          <ul className="divide-y rounded-xl border bg-card">
            {ws.projetos.map((p) => (
              <li key={p.nome} className="flex items-center gap-4 px-4 py-3">
                <span className={cn('size-2.5 shrink-0 rounded-full', p.cor)} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.nome}</span>
                <div className="hidden w-40 items-center gap-2 sm:flex">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <div className={cn('h-full rounded-full', p.cor)} style={{ width: `${p.progresso}%` }} />
                  </div>
                  <span className="w-9 text-right text-xs text-muted-foreground tabular-nums">{p.progresso}%</span>
                </div>
                <Avatar size="sm">
                  <AvatarFallback>{p.resp}</AvatarFallback>
                </Avatar>
              </li>
            ))}
          </ul>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
