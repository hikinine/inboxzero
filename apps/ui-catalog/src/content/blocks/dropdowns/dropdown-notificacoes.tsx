'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AtSign, Bell, CheckCheck, FileText, MessageSquare, TrendingUp, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface Notificacao {
  id: number
  quem: string
  acao: string
  alvo: string
  tempo: string
  iniciais?: string
  Icon: LucideIcon
}

const NOTIFICACOES: Notificacao[] = [
  { id: 1, quem: 'Bruno Rocha', acao: 'comentou em', alvo: 'Proposta Lumi v2', tempo: 'há 5 min', iniciais: 'BR', Icon: MessageSquare },
  { id: 2, quem: 'Clínica Vida', acao: 'avançou para', alvo: 'Fechamento', tempo: 'há 32 min', Icon: TrendingUp },
  { id: 3, quem: 'Carla Mendes', acao: 'mencionou você em', alvo: '#vendas', tempo: 'há 1 h', iniciais: 'CM', Icon: AtSign },
  { id: 4, quem: 'Marcos Ferreira', acao: 'virou lead pelo', alvo: 'formulário do site', tempo: 'ontem', Icon: UserPlus },
  { id: 5, quem: 'Financeiro', acao: 'publicou a', alvo: 'fatura de outubro', tempo: 'ontem', Icon: FileText },
]

function ListaNotificacoes({ lidas, onLer, onLerTodas }: { lidas: number[]; onLer: (id: number) => void; onLerTodas: () => void }) {
  const naoLidas = NOTIFICACOES.filter((n) => !lidas.includes(n.id)).length
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <h3 className="text-sm font-semibold">Notificações</h3>
        {naoLidas > 0 && <Badge variant="secondary">{naoLidas} novas</Badge>}
        <Button variant="ghost" size="xs" className="ml-auto" onClick={onLerTodas} disabled={naoLidas === 0}>
          <CheckCheck data-icon="inline-start" /> Marcar lidas
        </Button>
      </div>
      <div className="-mx-1 h-px bg-border" />
      <ul className="max-h-80 overflow-y-auto py-1">
        {NOTIFICACOES.map((n) => {
          const lida = lidas.includes(n.id)
          return (
            <li key={n.id}>
              <button type="button" onClick={() => onLer(n.id)} className={cn('flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent', !lida && 'bg-muted/50')}>
                {n.iniciais ? (
                  <Avatar>
                    <AvatarFallback>{n.iniciais}</AvatarFallback>
                  </Avatar>
                ) : (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <n.Icon className="size-4 text-muted-foreground" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block leading-snug">
                    <span className="font-medium">{n.quem}</span> <span className="text-muted-foreground">{n.acao}</span> <span className="font-medium">{n.alvo}</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{n.tempo}</span>
                </span>
                <span className={cn('mt-2 size-2 shrink-0 rounded-full', lida ? 'bg-transparent' : 'bg-primary')} aria-label={lida ? undefined : 'Não lida'} />
              </button>
            </li>
          )
        })}
      </ul>
      <div className="-mx-1 h-px bg-border" />
      <div className="p-1">
        <Button variant="ghost" size="sm" className="w-full">
          Ver todas as notificações
        </Button>
      </div>
    </div>
  )
}

export default function DropdownNotificacoes() {
  const [lidas, setLidas] = useState<number[]>([4, 5])
  const naoLidas = NOTIFICACOES.length - lidas.length
  const ler = (id: number) => setLidas((prev) => (prev.includes(id) ? prev : [...prev, id]))
  const lerTodas = () => setLidas(NOTIFICACOES.map((n) => n.id))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dropdowns</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Notificações</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Sino com contador, lista com avatar ou ícone, tempo relativo e ponto de não lida. Clique numa notificação para marcá-la como lida — os dois menus compartilham o estado.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="rounded-xl border bg-card">
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <span className="font-semibold">Painel</span>
              <span className="ml-auto" />
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" size="icon" className="relative" aria-label={`Notificações, ${naoLidas} não lidas`} />}>
                  <Bell />
                  {naoLidas > 0 && <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{naoLidas}</span>}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 p-1">
                  <ListaNotificacoes lidas={lidas} onLer={ler} onLerTodas={lerTodas} />
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar size="sm">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3 p-4">
              <div className="h-3 w-48 rounded bg-muted" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-28 rounded-lg border bg-muted/40" />
                <div className="h-28 rounded-lg border bg-muted/40" />
              </div>
              <div className="h-24 rounded-lg border bg-muted/40" />
            </div>
          </div>

          <div className="rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <ListaNotificacoes lidas={lidas} onLer={ler} onLerTodas={lerTodas} />
          </div>
        </div>
      </div>
    </section>
  )
}
