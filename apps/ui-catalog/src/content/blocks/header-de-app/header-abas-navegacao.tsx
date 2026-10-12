'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, ChartLine, ChevronsUpDown, Globe, House, MessageSquare, Rocket, ScrollText, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type AbaId = 'visao' | 'deploys' | 'logs' | 'analytics' | 'dominios' | 'config'

interface Aba {
  id: AbaId
  label: string
  Icon: LucideIcon
  badge?: string
  titulo: string
  descricao: string
  acao: string
}

const ABAS: Aba[] = [
  { id: 'visao', label: 'Visão geral', Icon: House, titulo: 'tasky-web', descricao: 'Último deploy há 12 min · branch main · build em 1,2 s', acao: 'Abrir site' },
  { id: 'deploys', label: 'Deploys', Icon: Rocket, badge: '3', titulo: 'Deploys', descricao: '3 em andamento · 184 concluídos nesta semana', acao: 'Novo deploy' },
  { id: 'logs', label: 'Logs', Icon: ScrollText, titulo: 'Logs em tempo real', descricao: 'Produção · últimos 15 minutos · 0 erros', acao: 'Pausar stream' },
  { id: 'analytics', label: 'Analytics', Icon: ChartLine, titulo: 'Analytics', descricao: '48 mil visitantes nos últimos 7 dias (+9%)', acao: 'Exportar' },
  { id: 'dominios', label: 'Domínios', Icon: Globe, titulo: 'Domínios', descricao: 'tasky.app.br e www.tasky.app.br · SSL válido até 2027', acao: 'Adicionar domínio' },
  { id: 'config', label: 'Configurações', Icon: Settings, titulo: 'Configurações do projeto', descricao: 'Variáveis de ambiente, build, integrações e membros', acao: 'Salvar alterações' },
]

export default function HeaderAbasNavegacao() {
  const [aba, setAba] = useState<AbaId>('deploys')
  const atual = ABAS.find((a) => a.id === aba) ?? ABAS[0]

  return (
    <div className="w-full bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
          <a href="#" className="flex size-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground" aria-label="Início">
            V
          </a>
          <nav className="flex min-w-0 items-center gap-1 text-sm">
            <span className="hidden text-muted-foreground sm:inline">vetor-labs</span>
            <span className="hidden text-muted-foreground/60 sm:inline">/</span>
            <button type="button" className="flex items-center gap-1 rounded-md px-1.5 py-1 font-medium transition-colors hover:bg-muted">
              tasky-web
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            </button>
            <Badge variant="outline" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Produção
            </Badge>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <MessageSquare data-icon="inline-start" /> Feedback
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notificações" className="relative">
              <Bell />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">2</span>
            </Button>
            <Avatar size="sm" className="ml-1">
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Tabs value={aba} onValueChange={(v) => setAba(v as AbaId)}>
            <TabsList variant="line" className="w-full justify-start overflow-x-auto pb-1.5">
              {ABAS.map((a) => (
                <TabsTrigger key={a.id} value={a.id} className="flex-none px-3">
                  <a.Icon data-icon="inline-start" />
                  {a.label}
                  {a.badge && <span className="ml-1 rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground tabular-nums">{a.badge}</span>}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{atual.titulo}</h1>
            <p className="text-sm text-muted-foreground">{atual.descricao}</p>
          </div>
          <Button size="sm">{atual.acao}</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3 rounded-xl border bg-card p-4">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
