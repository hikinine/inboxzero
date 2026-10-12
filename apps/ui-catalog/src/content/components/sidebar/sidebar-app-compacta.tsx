'use client'

import type { CSSProperties } from 'react'
import { Bell, Home, Inbox, KanbanSquare, LifeBuoy, LineChart, Search, Settings, Users, Workflow, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

interface NavItem {
  Icon: LucideIcon
  label: string
  active?: boolean
  badge?: string
}

const PRINCIPAL: NavItem[] = [
  { Icon: Home, label: 'Início', active: true },
  { Icon: Inbox, label: 'Inbox', badge: '12' },
  { Icon: KanbanSquare, label: 'Pipeline' },
  { Icon: Users, label: 'Contatos' },
]

const WORKSPACE: NavItem[] = [
  { Icon: LineChart, label: 'Relatórios' },
  { Icon: Workflow, label: 'Automações', badge: 'Novo' },
  { Icon: Settings, label: 'Configurações' },
]

const TRILHO: NavItem[] = [
  { Icon: Home, label: 'Início' },
  { Icon: Inbox, label: 'Inbox', active: true },
  { Icon: KanbanSquare, label: 'Pipeline' },
  { Icon: Users, label: 'Contatos' },
  { Icon: LineChart, label: 'Relatórios' },
  { Icon: LifeBuoy, label: 'Ajuda' },
]

const COMPACTA: CSSProperties = { '--sidebar-width': '12rem' } as CSSProperties
const ESTREITA: CSSProperties = { '--sidebar-width': '3.25rem' } as CSSProperties

function Grupo({ titulo, itens }: { titulo: string; itens: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{titulo}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {itens.map((n) => (
            <SidebarMenuItem key={n.label}>
              <SidebarMenuButton size="sm" isActive={n.active} render={<a href="#" />}>
                <n.Icon />
                <span>{n.label}</span>
              </SidebarMenuButton>
              {n.badge && <SidebarMenuBadge>{n.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function Conteudo() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2 rounded-lg border p-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
      <div className="space-y-2 rounded-lg border p-3 sm:col-span-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-3 w-full" />
        ))}
      </div>
    </div>
  )
}

export default function SidebarAppCompacta() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Compacta com grupos e badges</p>
        <SidebarProvider style={COMPACTA} className="h-[420px] min-h-0 overflow-hidden rounded-xl border">
          <Sidebar collapsible="none" className="border-r">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-1 py-1 text-sm font-semibold">
                <span className="size-5 rounded-md bg-primary" /> Acme CRM
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Grupo titulo="Principal" itens={PRINCIPAL} />
              <Grupo titulo="Workspace" itens={WORKSPACE} />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-2 rounded-md p-1 text-xs">
                <Avatar size="sm">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate font-medium">Ana Souza</div>
                  <div className="truncate text-muted-foreground">Plano Pro</div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="min-w-0">
            <header className="flex h-12 items-center gap-2 border-b px-4">
              <span className="text-sm font-medium">Início</span>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label="Buscar">
                  <Search />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Notificações">
                  <Bell />
                </Button>
              </div>
            </header>
            <Conteudo />
          </SidebarInset>
        </SidebarProvider>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Trilho só de ícones (tooltip ao passar o mouse)</p>
        <SidebarProvider defaultOpen={false} style={ESTREITA} className="h-[260px] min-h-0 overflow-hidden rounded-xl border">
          <Sidebar collapsible="none" className="items-center border-r">
            <SidebarHeader>
              <span className="size-6 rounded-md bg-primary" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu className="items-center gap-1 py-1">
                {TRILHO.map((n) => (
                  <SidebarMenuItem key={n.label}>
                    <SidebarMenuButton isActive={n.active} tooltip={n.label} aria-label={n.label} className="size-8 justify-center p-0">
                      <n.Icon />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="items-center">
              <Avatar size="sm">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="min-w-0">
            <header className="flex h-12 items-center border-b px-4 text-sm font-medium">Inbox</header>
            <Conteudo />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
