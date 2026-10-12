'use client'

import { ArrowRight, ChartColumn, Inbox, LayoutDashboard, Search, Settings, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const NAV = [
  { Icon: LayoutDashboard, label: 'Visão geral', ativo: true },
  { Icon: Inbox, label: 'Conversas' },
  { Icon: Users, label: 'Clientes' },
  { Icon: ChartColumn, label: 'Relatórios' },
  { Icon: Settings, label: 'Configurações' },
]

const KPIS = [
  { label: 'Receita do mês', valor: 'R$ 184.320', delta: '+18,4%' },
  { label: 'Novos leads', valor: '1.284', delta: '+9,1%' },
  { label: 'Propostas', valor: '312', delta: '+4,6%' },
  { label: 'Taxa de fechamento', valor: '31%', delta: '+2,2 pp' },
]

const BARRAS = [42, 58, 50, 70, 64, 80, 72, 90, 84, 96, 88, 100]

const NEGOCIOS = [
  { nome: 'Clínica Vida', etapa: 'Proposta', valor: 'R$ 12.400' },
  { nome: 'Padaria Dona Nena', etapa: 'Negociação', valor: 'R$ 3.900' },
  { nome: 'Lumi Tecnologia', etapa: 'Fechado', valor: 'R$ 28.000' },
  { nome: 'Studio Pilates Flor', etapa: 'Novo', valor: 'R$ 1.290' },
]

export default function HeroComPainelDeDashboard() {
  return (
    <section className="w-full overflow-hidden px-6 pt-16 pb-0 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="outline">CRM para times comerciais</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">O painel que o seu time vai abrir todo dia.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Pipeline, metas e conversas no mesmo lugar. Veja o que fecha, o que trava e o que fazer agora.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              Criar conta <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              Falar com vendas
            </Button>
          </div>
        </div>

        <div className="relative mt-16 [perspective:1800px]">
          <div className="origin-top overflow-hidden rounded-xl border bg-card shadow-2xl [transform:rotateX(14deg)]">
            <div className="grid sm:grid-cols-[180px_1fr]">
              <aside className="hidden border-r bg-muted/30 p-4 sm:block">
                <div className="flex items-center gap-2 px-2">
                  <span className="size-6 rounded-md bg-primary" />
                  <span className="text-sm font-semibold">Pipefy CRM</span>
                </div>
                <ul className="mt-6 space-y-1">
                  {NAV.map((n) => (
                    <li
                      key={n.label}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${n.ativo ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground'}`}
                    >
                      <n.Icon className="size-4" /> {n.label}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="min-w-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <div className="flex h-7 w-56 items-center gap-2 rounded-md bg-muted px-2 text-xs text-muted-foreground">
                    <Search className="size-3.5" /> Buscar cliente, negócio…
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden text-xs text-muted-foreground sm:block">Outubro 2026</span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium">RC</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-5 lg:grid-cols-4">
                  {KPIS.map((k) => (
                    <div key={k.label} className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">{k.label}</div>
                      <div className="mt-1 text-lg font-semibold tabular-nums">{k.valor}</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">{k.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 px-5 pb-5 lg:grid-cols-[1.3fr_1fr]">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Receita por mês</span>
                      <span className="text-muted-foreground">últimos 12 meses</span>
                    </div>
                    <div className="mt-4 flex h-28 items-end gap-1.5">
                      {BARRAS.map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${i === BARRAS.length - 1 ? 'bg-primary' : 'bg-primary/25'}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-xs font-medium">Negócios recentes</div>
                    <ul className="mt-3 divide-y text-xs">
                      {NEGOCIOS.map((n) => (
                        <li key={n.nome} className="flex items-center justify-between py-2">
                          <div className="min-w-0">
                            <div className="truncate font-medium">{n.nome}</div>
                            <div className="text-muted-foreground">{n.etapa}</div>
                          </div>
                          <span className="tabular-nums">{n.valor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}
