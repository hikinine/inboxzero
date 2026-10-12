'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Calendar, ChartColumn, Check, CreditCard, FileText, Instagram, MessageCircle, MessageSquare, Plus, Send, SquareKanban, Target, Users, Wallet, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface App {
  id: string
  nome: string
  descricao: string
  Icon: LucideIcon
  cor: string
  popular?: boolean
  conectado?: boolean
}

interface Categoria {
  valor: string
  nome: string
  Icon: LucideIcon
  apps: App[]
}

const CATEGORIAS: Categoria[] = [
  {
    valor: 'comunicacao',
    nome: 'Comunicação',
    Icon: MessageCircle,
    apps: [
      { id: 'whatsapp', nome: 'WhatsApp Business', descricao: 'Conversas oficiais pela API da Meta, sem celular ligado.', Icon: MessageCircle, cor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', popular: true, conectado: true },
      { id: 'instagram', nome: 'Instagram Direct', descricao: 'Mensagens, comentários e menções no mesmo inbox.', Icon: Instagram, cor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400', popular: true },
      { id: 'telegram', nome: 'Telegram', descricao: 'Bots e atendimento em grupos e canais.', Icon: Send, cor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400' },
      { id: 'slack', nome: 'Slack', descricao: 'Alertas de leads e vendas nos canais do time.', Icon: MessageSquare, cor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
    ],
  },
  {
    valor: 'crm',
    nome: 'CRM',
    Icon: Users,
    apps: [
      { id: 'pipedrive', nome: 'Pipedrive', descricao: 'Negócios e etapas espelhados em tempo real.', Icon: Users, cor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', conectado: true },
      { id: 'hubspot', nome: 'HubSpot', descricao: 'Contatos, empresas e deals sincronizados.', Icon: Target, cor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', popular: true },
      { id: 'rdcrm', nome: 'RD Station CRM', descricao: 'Funil de vendas com histórico de conversas.', Icon: ChartColumn, cor: 'bg-violet-500/15 text-violet-600 dark:text-violet-400' },
      { id: 'salesforce', nome: 'Salesforce', descricao: 'Objetos padrão e personalizados, via API.', Icon: FileText, cor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    ],
  },
  {
    valor: 'pagamentos',
    nome: 'Pagamentos',
    Icon: CreditCard,
    apps: [
      { id: 'stripe', nome: 'Stripe', descricao: 'Cobranças e assinaturas no perfil do cliente.', Icon: CreditCard, cor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', popular: true },
      { id: 'mercadopago', nome: 'Mercado Pago', descricao: 'Pix, boleto e cartão direto na conversa.', Icon: Wallet, cor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', conectado: true },
      { id: 'pagarme', nome: 'Pagar.me', descricao: 'Split de pagamento e antifraude.', Icon: CreditCard, cor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { id: 'asaas', nome: 'Asaas', descricao: 'Cobranças recorrentes e notas fiscais.', Icon: Wallet, cor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
    ],
  },
  {
    valor: 'produtividade',
    nome: 'Produtividade',
    Icon: Calendar,
    apps: [
      { id: 'agenda', nome: 'Google Agenda', descricao: 'Reuniões criadas direto da conversa.', Icon: Calendar, cor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', conectado: true },
      { id: 'notion', nome: 'Notion', descricao: 'Notas de reunião viram páginas.', Icon: FileText, cor: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300' },
      { id: 'trello', nome: 'Trello', descricao: 'Cards a partir de tarefas do funil.', Icon: SquareKanban, cor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { id: 'zapier', nome: 'Zapier', descricao: 'Conecte com mais de 6.000 outros apps.', Icon: Zap, cor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', popular: true },
    ],
  },
]

export default function IntegracoesPorCategoriaEmAbas() {
  const [conectados, setConectados] = useState<Record<string, boolean>>(() => Object.fromEntries(CATEGORIAS.flatMap((c) => c.apps.map((a) => [a.id, Boolean(a.conectado)]))))
  const total = Object.values(conectados).filter(Boolean).length

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Conecte por categoria</h2>
            <p className="mt-3 text-muted-foreground">Dezesseis apps organizados por função. Conectar leva um clique e a sincronização começa em segundos.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{total}</span> conectadas ·{' '}
            <a href="#" className="inline-flex items-center gap-0.5 underline underline-offset-4 hover:text-foreground">
              Pedir integração <ArrowUpRight className="size-3.5" />
            </a>
          </p>
        </div>

        <Tabs defaultValue="comunicacao" className="mt-10 gap-6">
          <TabsList className="h-auto flex-wrap">
            {CATEGORIAS.map((c) => (
              <TabsTrigger key={c.valor} value={c.valor} className="flex-none px-3">
                <c.Icon /> {c.nome}
              </TabsTrigger>
            ))}
          </TabsList>
          {CATEGORIAS.map((c) => (
            <TabsContent key={c.valor} value={c.valor}>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.apps.map((app) => {
                  const on = conectados[app.id] ?? false
                  return (
                    <li key={app.id} className={cn('flex flex-col rounded-xl border bg-card p-5 transition-colors', on && 'border-primary/40')}>
                      <div className="flex items-start justify-between gap-2">
                        <span className={cn('flex size-10 items-center justify-center rounded-lg', app.cor)}>
                          <app.Icon className="size-5" />
                        </span>
                        {app.popular && <Badge variant="secondary">Popular</Badge>}
                      </div>
                      <p className="mt-4 text-sm font-semibold">{app.nome}</p>
                      <p className="mt-1 flex-1 text-sm text-muted-foreground">{app.descricao}</p>
                      <div className="mt-5">
                        {on ? (
                          <Button variant="outline" size="sm" className="w-full" onClick={() => setConectados((s) => ({ ...s, [app.id]: false }))}>
                            <Check data-icon="inline-start" className="text-emerald-500" /> Conectado
                          </Button>
                        ) : (
                          <Button size="sm" className="w-full" onClick={() => setConectados((s) => ({ ...s, [app.id]: true }))}>
                            <Plus data-icon="inline-start" /> Conectar
                          </Button>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
