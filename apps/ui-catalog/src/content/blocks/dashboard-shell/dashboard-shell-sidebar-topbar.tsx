'use client'

import type { LucideIcon } from 'lucide-react'
import { Bell, Building2, ChevronsUpDown, Home, Inbox, KanbanSquare, LineChart, MessageSquare, Plus, Search, Settings, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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

const PLATAFORMA: NavItem[] = [
  { Icon: Home, label: 'Visão geral', active: true },
  { Icon: Inbox, label: 'Inbox', badge: '12' },
  { Icon: KanbanSquare, label: 'Pipeline' },
  { Icon: Users, label: 'Contatos' },
  { Icon: MessageSquare, label: 'Conversas', badge: '3' },
  { Icon: LineChart, label: 'Relatórios' },
]
const CONTA: NavItem[] = [
  { Icon: Building2, label: 'Empresa' },
  { Icon: Settings, label: 'Configurações' },
]
const KPIS = ['Receita do mês', 'Novos leads', 'Taxa de resposta', 'Ticket médio']

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton isActive={item.active} render={<a href="#" />}>
                <item.Icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default function DashboardShellSidebarTopbar() {
  return (
    <SidebarProvider className="min-h-[640px] w-full bg-background text-foreground">
      <Sidebar collapsible="none" className="hidden border-r md:flex">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate font-semibold">Nuvem CRM</span>
                  <span className="truncate text-xs text-muted-foreground">Plano Business</span>
                </span>
                <ChevronsUpDown className="ml-auto text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavGroup title="Plataforma" items={PLATAFORMA} />
          <NavGroup title="Conta" items={CONTA} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar size="sm">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate font-medium">Ana Souza</span>
                  <span className="truncate text-xs text-muted-foreground">ana@nuvemcrm.com.br</span>
                </span>
                <ChevronsUpDown className="ml-auto text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4 sm:px-6">
          <h1 className="text-sm font-medium">Visão geral</h1>
          <div className="relative ml-auto hidden w-64 sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar contatos, negócios…" className="pl-8" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notificações" className="relative ml-auto sm:ml-0">
            <Bell />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
          </Button>
          <Button size="sm">
            <Plus data-icon="inline-start" /> Novo negócio
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((label) => (
              <Card key={label} size="sm">
                <CardHeader>
                  <CardDescription className="text-xs">{label}</CardDescription>
                  <Skeleton className="mt-1 h-7 w-28" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid flex-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">Gráfico principal</div>
            <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">Lista lateral</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
