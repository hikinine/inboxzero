'use client'

import type { LucideIcon } from 'lucide-react'
import { Bell, Briefcase, CalendarDays, ChevronsUpDown, CreditCard, FileText, Home, Inbox, KanbanSquare, ListChecks, LogOut, Plug, Sparkles, UserRound, Users, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
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
  badge?: string
  active?: boolean
}

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Principal',
    items: [
      { Icon: Home, label: 'Início' },
      { Icon: Inbox, label: 'Inbox', badge: '12', active: true },
      { Icon: ListChecks, label: 'Tarefas', badge: '4' },
      { Icon: CalendarDays, label: 'Calendário' },
    ],
  },
  {
    title: 'Vendas',
    items: [
      { Icon: KanbanSquare, label: 'Pipeline', badge: '28' },
      { Icon: Briefcase, label: 'Negócios' },
      { Icon: FileText, label: 'Propostas', badge: '3' },
      { Icon: Users, label: 'Clientes' },
    ],
  },
  {
    title: 'Configurações',
    items: [
      { Icon: UserRound, label: 'Equipe' },
      { Icon: Plug, label: 'Integrações' },
      { Icon: CreditCard, label: 'Faturamento' },
    ],
  },
]

export default function SidebarGruposBadges() {
  return (
    <SidebarProvider className="min-h-[640px] w-full bg-background text-foreground">
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader className="gap-3 p-3">
          <div className="flex items-center gap-2 px-1 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </span>
            Kavo CRM
          </div>
          <SidebarInput placeholder="Buscar…" aria-label="Buscar" />
        </SidebarHeader>
        <SidebarContent>
          {GROUPS.map((g) => (
            <SidebarGroup key={g.title}>
              <SidebarGroupLabel>{g.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {g.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton isActive={item.active} render={<a href="#" />}>
                        <item.Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge className={item.active ? 'bg-primary text-primary-foreground' : 'bg-muted'}>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="h-12 w-full justify-start gap-2 px-2" />}>
              <Avatar size="sm">
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                <span className="truncate text-sm font-medium">Bruno Rocha</span>
                <span className="truncate text-xs font-normal text-muted-foreground">bruno@kavo.com.br</span>
              </span>
              <ChevronsUpDown className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserRound /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell /> Notificações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles /> Fazer upgrade
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <main className="hidden min-w-0 flex-1 flex-col bg-muted/30 md:flex">
        <div className="flex h-14 items-center gap-3 border-b bg-background px-6">
          <Skeleton className="h-4 w-28" />
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="space-y-3 rounded-xl border bg-card p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </main>
    </SidebarProvider>
  )
}
