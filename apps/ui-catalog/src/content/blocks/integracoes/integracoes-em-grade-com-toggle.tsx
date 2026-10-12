'use client'

import { useState } from 'react'
import { Calendar, CreditCard, FileText, MessageCircle, MessageSquare, Target, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const APPS = [
  { id: 'whatsapp', name: 'WhatsApp Business', description: 'Receba e responda conversas direto no inbox.', icon: MessageCircle, color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', connected: true },
  { id: 'agenda', name: 'Google Agenda', description: 'Sincronize reuniões e evite conflitos de horário.', icon: Calendar, color: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', connected: true },
  { id: 'rd', name: 'RD Station', description: 'Envie leads qualificados para a automação de marketing.', icon: Target, color: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', connected: false },
  { id: 'pipedrive', name: 'Pipedrive', description: 'Espelhe negócios e etapas do funil em tempo real.', icon: Users, color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', connected: true },
  { id: 'stripe', name: 'Stripe', description: 'Pagamentos e assinaturas no perfil do cliente.', icon: CreditCard, color: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', connected: false },
  { id: 'notion', name: 'Notion', description: 'Crie páginas a partir de reuniões e notas.', icon: FileText, color: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300', connected: false },
  { id: 'slack', name: 'Slack', description: 'Alertas de novos leads nos canais do time.', icon: MessageSquare, color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', connected: true },
  { id: 'zapier', name: 'Zapier', description: 'Conecte com mais de 6.000 outros apps.', icon: Zap, color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', connected: false },
] as const

export default function IntegracoesEmGradeComToggle() {
  const [state, setState] = useState<Record<string, boolean>>(() => Object.fromEntries(APPS.map((a) => [a.id, a.connected])))
  const total = Object.values(state).filter(Boolean).length

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Conecte as ferramentas que seu time já usa</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Ative com um clique. Os dados sincronizam em segundos, sem precisar de código.</p>
          </div>
          <Badge variant="outline" className="h-7 shrink-0 px-3 text-sm tabular-nums">
            {total} de {APPS.length} conectadas
          </Badge>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {APPS.map((app) => {
            const Icon = app.icon
            const on = state[app.id] ?? false
            return (
              <div key={app.id} className={cn('flex flex-col rounded-xl border bg-card p-5 transition-colors', on && 'border-primary/40')}>
                <div className="flex items-start justify-between">
                  <span className={cn('flex size-10 items-center justify-center rounded-lg', app.color)}>
                    <Icon className="size-5" />
                  </span>
                  <Switch checked={on} onCheckedChange={(c) => setState((s) => ({ ...s, [app.id]: c }))} aria-label={`Conectar ${app.name}`} />
                </div>
                <div className="mt-4 text-sm font-semibold">{app.name}</div>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{app.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs">
                  <span className={cn('size-1.5 rounded-full', on ? 'bg-emerald-500' : 'bg-muted-foreground/40')} />
                  <span className={on ? 'text-foreground' : 'text-muted-foreground'}>{on ? 'Conectado' : 'Desconectado'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
