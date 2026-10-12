'use client'

import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BarChart3, Calendar, Check, CreditCard, FileText, Instagram, Mail, MessageCircle, MessageSquare, Search, Send, SquareKanban, Target, Users, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const CATEGORIAS = ['Todas', 'Comunicação', 'CRM', 'Pagamentos', 'Produtividade', 'Marketing'] as const
type Categoria = (typeof CATEGORIAS)[number]

interface App {
  name: string
  description: string
  category: Exclude<Categoria, 'Todas'>
  icon: LucideIcon
  color: string
  installed?: boolean
}

const APPS: App[] = [
  { name: 'WhatsApp Business', description: 'Conversas oficiais via API da Meta.', category: 'Comunicação', icon: MessageCircle, color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', installed: true },
  { name: 'Instagram Direct', description: 'Mensagens e comentários no inbox.', category: 'Comunicação', icon: Instagram, color: 'bg-pink-500/15 text-pink-600 dark:text-pink-400', installed: true },
  { name: 'Telegram', description: 'Bots e atendimento em grupos.', category: 'Comunicação', icon: Send, color: 'bg-sky-500/15 text-sky-600 dark:text-sky-400' },
  { name: 'Slack', description: 'Alertas de leads e vendas nos canais.', category: 'Comunicação', icon: MessageSquare, color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
  { name: 'Pipedrive', description: 'Sincronize negócios e etapas.', category: 'CRM', icon: Users, color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', installed: true },
  { name: 'HubSpot', description: 'Contatos, empresas e deals.', category: 'CRM', icon: Target, color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400' },
  { name: 'Stripe', description: 'Cobranças e assinaturas recorrentes.', category: 'Pagamentos', icon: CreditCard, color: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
  { name: 'Mercado Pago', description: 'Pix, boleto e cartão no checkout.', category: 'Pagamentos', icon: Wallet, color: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', installed: true },
  { name: 'Pagar.me', description: 'Split de pagamento e antifraude.', category: 'Pagamentos', icon: CreditCard, color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  { name: 'Google Agenda', description: 'Reuniões criadas direto do CRM.', category: 'Produtividade', icon: Calendar, color: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', installed: true },
  { name: 'Notion', description: 'Notas de reunião viram páginas.', category: 'Produtividade', icon: FileText, color: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300' },
  { name: 'Trello', description: 'Cards a partir de tarefas do funil.', category: 'Produtividade', icon: SquareKanban, color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
  { name: 'RD Station', description: 'Leads qualificados para automação.', category: 'Marketing', icon: BarChart3, color: 'bg-violet-500/15 text-violet-600 dark:text-violet-400' },
  { name: 'Mailchimp', description: 'Listas e campanhas sincronizadas.', category: 'Marketing', icon: Mail, color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400' },
]

function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

export default function IntegracoesComBuscaECategorias() {
  const [categoria, setCategoria] = useState<Categoria>('Todas')
  const [busca, setBusca] = useState('')

  const counts = useMemo(() => {
    const map = new Map<Categoria, number>([['Todas', APPS.length]])
    for (const a of APPS) map.set(a.category, (map.get(a.category) ?? 0) + 1)
    return map
  }, [])

  const resultados = useMemo(() => {
    const q = normalize(busca.trim())
    return APPS.filter((a) => (categoria === 'Todas' || a.category === categoria) && (!q || normalize(a.name).includes(q) || normalize(a.description).includes(q)))
  }, [categoria, busca])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diretório de integrações</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Mais de 80 apps, prontos em minutos</h2>
          <p className="mt-3 text-muted-foreground">Busque pelo nome ou filtre por categoria. As instaladas aparecem com um check.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <nav className="space-y-1">
              {CATEGORIAS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoria(c)}
                  className={cn('flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors', categoria === c ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground')}
                >
                  {c}
                  <span className="text-xs tabular-nums text-muted-foreground">{counts.get(c) ?? 0}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar integração…" aria-label="Buscar integração" className="h-10 pl-9" />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {CATEGORIAS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoria(c)}
                  className={cn('shrink-0 rounded-full border px-3 py-1 text-xs transition-colors', categoria === c ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted')}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
                {categoria !== 'Todas' && <> em {categoria}</>}
              </span>
              {(busca || categoria !== 'Todas') && (
                <button
                  type="button"
                  className="underline underline-offset-4 hover:text-foreground"
                  onClick={() => {
                    setBusca('')
                    setCategoria('Todas')
                  }}
                >
                  Limpar filtros
                </button>
              )}
            </div>

            <div className="mt-2 divide-y rounded-xl border bg-card">
              {resultados.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">Nenhuma integração encontrada para “{busca}”.</div>}
              {resultados.map((app) => {
                const Icon = app.icon
                return (
                  <div key={app.name} className="flex items-center gap-4 p-4">
                    <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', app.color)}>
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">{app.name}</span>
                        <Badge variant="secondary" className="hidden sm:inline-flex">
                          {app.category}
                        </Badge>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{app.description}</p>
                    </div>
                    {app.installed ? (
                      <Button variant="outline" size="sm" className="shrink-0">
                        <Check data-icon="inline-start" className="text-emerald-500" /> Instalado
                      </Button>
                    ) : (
                      <Button size="sm" className="shrink-0">
                        Conectar
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
