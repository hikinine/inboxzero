'use client'

import type { LucideIcon } from 'lucide-react'
import { BarChart3, CalendarDays, Home, Inbox, KanbanSquare, MessageSquare, Search, Settings, Users, Zap } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const RAIL: { Icon: LucideIcon; label: string; active?: boolean; count?: number }[] = [
  { Icon: Home, label: 'Início' },
  { Icon: Inbox, label: 'Inbox', count: 5, active: true },
  { Icon: KanbanSquare, label: 'Pipeline' },
  { Icon: Users, label: 'Contatos' },
  { Icon: CalendarDays, label: 'Agenda' },
  { Icon: BarChart3, label: 'Relatórios' },
]
const CHATS = [
  { name: 'Ana Souza', initials: 'AS', msg: 'Consegue enviar a proposta hoje?', time: '09:42', unread: 2, online: true },
  { name: 'Kavo Ltda', initials: 'KL', msg: 'Fechado! Vamos de plano anual.', time: '09:15', unread: 1, online: false },
  { name: 'Diego Lima', initials: 'DL', msg: 'Reunião confirmada para 14h.', time: 'Ontem', unread: 0, online: true },
  { name: 'Lumi Tecnologia', initials: 'LT', msg: 'Obrigado pelo retorno rápido.', time: 'Ontem', unread: 0, online: false },
  { name: 'Carla Mendes', initials: 'CM', msg: 'Pode me ligar depois das 16h?', time: 'Seg', unread: 0, online: false },
]

function RailButton({ Icon, label, active, count }: { Icon: LucideIcon; label: string; active?: boolean; count?: number }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href="#"
            aria-label={label}
            className={`relative flex size-10 items-center justify-center rounded-lg transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
          />
        }
      >
        <Icon className="size-5" />
        {count ? <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white ring-2 ring-sidebar">{count}</span> : null}
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export default function SidebarCompactaIcones() {
  return (
    <TooltipProvider>
      <div className="flex min-h-[640px] w-full bg-background text-foreground">
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r bg-sidebar py-3">
          <a href="#" aria-label="Início" className="mb-2 flex size-9 items-center justify-center rounded-lg bg-foreground text-background">
            <Zap className="size-4" />
          </a>
          {RAIL.map((item) => (
            <RailButton key={item.label} {...item} />
          ))}
          <div className="mt-auto flex flex-col items-center gap-2">
            <RailButton Icon={Settings} label="Configurações" />
            <Avatar>
              <AvatarFallback>AS</AvatarFallback>
              <AvatarBadge className="bg-emerald-500" />
            </Avatar>
          </div>
        </aside>

        <section className="hidden w-72 shrink-0 flex-col border-r md:flex">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Inbox</h2>
            <Button variant="ghost" size="icon-sm" aria-label="Nova conversa">
              <MessageSquare />
            </Button>
          </div>
          <div className="p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversa" className="pl-8" aria-label="Buscar conversa" />
            </div>
          </div>
          <ul className="flex flex-col px-2">
            {CHATS.map((c, i) => (
              <li key={c.name}>
                <a href="#" className={`flex items-start gap-3 rounded-lg px-2 py-2.5 ${i === 0 ? 'bg-muted' : 'hover:bg-muted/60'}`}>
                  <Avatar>
                    <AvatarFallback>{c.initials}</AvatarFallback>
                    {c.online && <AvatarBadge className="bg-emerald-500" />}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`truncate text-sm ${c.unread ? 'font-semibold' : 'font-medium'}`}>{c.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-muted-foreground">{c.msg}</span>
                      {c.unread > 0 && <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{c.unread}</span>}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="size-5 text-muted-foreground" />
          </span>
          <p className="font-medium">Selecione uma conversa</p>
          <p className="max-w-xs text-sm text-muted-foreground">Escolha uma conversa na lista ao lado para ver as mensagens e responder.</p>
        </main>
      </div>
    </TooltipProvider>
  )
}
