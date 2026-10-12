'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Calendar, CreditCard, Instagram, MessageCircle, MessageSquare, RefreshCw, Settings, Target, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Status = 'conectado' | 'erro' | 'pendente'

const STATUS: Record<Status, { rotulo: string; ponto: string; chip: string; plural: string }> = {
  conectado: { rotulo: 'Conectado', ponto: 'bg-emerald-500', chip: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', plural: 'conectadas' },
  erro: { rotulo: 'Erro', ponto: 'bg-rose-500', chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', plural: 'com erro' },
  pendente: { rotulo: 'Pendente', ponto: 'bg-amber-500', chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', plural: 'pendentes' },
}

interface Integracao {
  id: string
  nome: string
  Icon: LucideIcon
  cor: string
  status: Status
  detalhe: string
}

const INTEGRACOES: Integracao[] = [
  { id: 'whatsapp', nome: 'WhatsApp Business', Icon: MessageCircle, cor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', status: 'conectado', detalhe: 'Sincronizado há 2 min · 1.284 conversas hoje' },
  { id: 'instagram', nome: 'Instagram Direct', Icon: Instagram, cor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400', status: 'conectado', detalhe: 'Sincronizado há 5 min' },
  { id: 'pipedrive', nome: 'Pipedrive', Icon: Users, cor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', status: 'erro', detalhe: 'Token expirado há 40 min · 37 negócios sem sincronizar' },
  { id: 'agenda', nome: 'Google Agenda', Icon: Calendar, cor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', status: 'conectado', detalhe: 'Sincronizado há 1 min' },
  { id: 'stripe', nome: 'Stripe', Icon: CreditCard, cor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', status: 'pendente', detalhe: 'Aguardando autorização do administrador' },
  { id: 'slack', nome: 'Slack', Icon: MessageSquare, cor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', status: 'conectado', detalhe: 'Alertas no canal #vendas · há 12 min' },
  { id: 'rd', nome: 'RD Station', Icon: Target, cor: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', status: 'erro', detalhe: 'Webhook respondeu 500 · 3 tentativas' },
  { id: 'zapier', nome: 'Zapier', Icon: Zap, cor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', status: 'pendente', detalhe: 'Convite enviado para ti@acme.com.br' },
]

export default function IntegracoesEmListaComStatus() {
  const [itens, setItens] = useState<Integracao[]>(INTEGRACOES)
  const [filtro, setFiltro] = useState<Status | 'todos'>('todos')
  const [reconectando, setReconectando] = useState<string | null>(null)

  const contagem = (s: Status) => itens.filter((i) => i.status === s).length
  const visiveis = filtro === 'todos' ? itens : itens.filter((i) => i.status === filtro)

  const reconectar = (id: string) => {
    setReconectando(id)
    window.setTimeout(() => {
      setItens((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'conectado', detalhe: 'Sincronizado agora' } : i)))
      setReconectando(null)
    }, 1200)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Status das suas conexões</h2>
            <p className="mt-3 text-muted-foreground">Tudo o que está ligado à sua conta, com a última sincronização e o que fazer quando algo quebra.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
            <button type="button" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')} className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors', filtro === 'todos' ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
              Todas · {itens.length}
            </button>
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <button key={s} type="button" aria-pressed={filtro === s} onClick={() => setFiltro(filtro === s ? 'todos' : s)} className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors', filtro === s ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
                <span className={cn('size-1.5 rounded-full', STATUS[s].ponto)} /> {contagem(s)} {STATUS[s].plural}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 divide-y rounded-2xl border bg-card">
          {visiveis.length === 0 && <li className="p-10 text-center text-sm text-muted-foreground">Nenhuma integração com esse status.</li>}
          {visiveis.map((app) => {
            const st = STATUS[app.status]
            const carregando = reconectando === app.id
            return (
              <li key={app.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', app.cor)}>
                    <app.Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{app.nome}</p>
                    <p className={cn('truncate text-sm', app.status === 'erro' ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground')}>{app.detalhe}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', st.chip)}>
                    <span className={cn('size-1.5 rounded-full', st.ponto, app.status === 'erro' && 'animate-pulse')} /> {st.rotulo}
                  </span>
                  {app.status === 'conectado' && (
                    <Button variant="ghost" size="sm" aria-label={`Configurar ${app.nome}`}>
                      <Settings data-icon="inline-start" /> Configurar
                    </Button>
                  )}
                  {app.status === 'erro' && (
                    <Button size="sm" onClick={() => reconectar(app.id)} disabled={carregando}>
                      <RefreshCw data-icon="inline-start" className={carregando ? 'animate-spin' : ''} /> {carregando ? 'Reconectando' : 'Reconectar'}
                    </Button>
                  )}
                  {app.status === 'pendente' && (
                    <Button variant="outline" size="sm">
                      Concluir
                    </Button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">Verificamos cada conexão a cada 5 minutos. Erros persistentes por mais de 1 hora geram um alerta por e-mail.</p>
      </div>
    </section>
  )
}
