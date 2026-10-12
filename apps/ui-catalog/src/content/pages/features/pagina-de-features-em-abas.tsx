'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bold, ChartBar, Check, FileText, Italic, Link2, List, Menu, SquareCheck, Workflow, Zap, type LucideIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const NAV = ['Produto', 'Funcionalidades', 'Preços', 'Clientes']

function PlexoLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Zap className="size-4" />
      </span>
      Plexo
    </a>
  )
}

function PlexoNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <PlexoLogo />
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((l, i) => (
            <a key={l} href="#" className={i === 1 ? 'font-medium' : 'text-muted-foreground hover:text-foreground'}>
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Button size="sm">Começar grátis</Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  )
}

function PlexoHero() {
  return (
    <section className="w-full border-b bg-muted/30 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Badge variant="outline">Funcionalidades</Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Tudo que o seu time precisa, numa aba só.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Documentos, tarefas, automações e relatórios conversando entre si. Explore cada parte do Plexo abaixo.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">
            Criar workspace <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            Agendar demonstração
          </Button>
        </div>
      </div>
    </section>
  )
}

type TabId = 'docs' | 'tarefas' | 'automacoes' | 'relatorios'
interface Feature {
  id: TabId
  label: string
  Icon: LucideIcon
  title: string
  desc: string
  bullets: string[]
}

const FEATURES: Feature[] = [
  { id: 'docs', label: 'Documentos', Icon: FileText, title: 'Escreva junto, sem conflito de versão', desc: 'Editor colaborativo com comentários, menções e histórico. Cada doc vira a fonte de verdade do projeto.', bullets: ['Edição simultânea com cursores nomeados', 'Comentários resolvíveis e menções @', 'Modelos para PRD, ata e retrospectiva'] },
  { id: 'tarefas', label: 'Tarefas', Icon: SquareCheck, title: 'Tarefas ligadas ao contexto', desc: 'Crie tarefas de dentro do documento, atribua, dê prazo e acompanhe em lista, quadro ou calendário.', bullets: ['Subtarefas e dependências', 'Prazos com lembrete automático', 'Visões salvas por time'] },
  { id: 'automacoes', label: 'Automações', Icon: Workflow, title: 'Deixe o trabalho repetitivo com o Plexo', desc: 'Gatilhos, condições e ações sem código: mova cards, avise o Slack, crie tarefas recorrentes.', bullets: ['Mais de 40 gatilhos e ações prontos', 'Condições por prioridade, time e etiqueta', 'Registro de execuções para auditoria'] },
  { id: 'relatorios', label: 'Relatórios', Icon: ChartBar, title: 'Métricas que mostram o ritmo real', desc: 'Vazão, atraso e carga por pessoa, atualizados em tempo real, sem montar planilha.', bullets: ['Painéis por time e por projeto', 'Alertas de gargalo', 'Exportação em CSV e PDF'] },
]

function DocMock() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-1 border-b px-3 py-2">
        {[Bold, Italic, List, Link2].map((I, i) => (
          <span key={i} className="flex size-7 items-center justify-center rounded-md text-muted-foreground">
            <I className="size-3.5" />
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1">
          {['AS', 'LM'].map((p) => (
            <Avatar key={p} size="sm">
              <AvatarFallback>{p}</AvatarFallback>
            </Avatar>
          ))}
          <Badge variant="secondary" className="ml-1">
            2 editando
          </Badge>
        </span>
      </div>
      <div className="p-5">
        <div className="text-xl font-semibold tracking-tight">Plano de lançamento Q4</div>
        <div className="mt-1 text-xs text-muted-foreground">Atualizado há 2 min por Ana Souza</div>
        <div className="mt-5 space-y-2.5">
          <div className="h-2.5 w-full rounded bg-muted" />
          <div className="h-2.5 w-[92%] rounded bg-muted" />
          <div className="relative h-2.5 w-[70%] rounded bg-muted">
            <span className="absolute -right-px -top-1 h-5 w-0.5 bg-sky-500" />
            <span className="absolute -top-6 right-0 rounded bg-sky-500 px-1.5 py-0.5 text-[10px] font-medium text-white">Léo</span>
          </div>
          <div className="h-2.5 w-full rounded bg-muted" />
          <div className="h-2.5 w-[58%] rounded bg-amber-500/30" />
        </div>
        <div className="mt-5 rounded-lg border bg-background p-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <span className="font-medium">Léo Martins</span>
            <span className="text-muted-foreground">há 4 min</span>
          </div>
          <p className="mt-2 text-muted-foreground">Esse prazo considera o congelamento de dezembro?</p>
          <div className="mt-2 flex gap-2">
            <Button size="xs" variant="outline">
              Responder
            </Button>
            <Button size="xs" variant="ghost">
              <Check data-icon="inline-start" /> Resolver
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TAREFAS = [
  { id: 1, t: 'Revisar copy da página de preços', tag: 'Marketing', tone: 'bg-amber-500/15 text-amber-700 dark:text-amber-400', due: '14 out', who: 'JC' },
  { id: 2, t: 'Migrar banco para a nova região', tag: 'Infra', tone: 'bg-slate-500/15 text-slate-700 dark:text-slate-300', due: '12 out', who: 'RP' },
  { id: 3, t: 'Testes de usabilidade do onboarding', tag: 'Design', tone: 'bg-violet-500/15 text-violet-700 dark:text-violet-400', due: '16 out', who: 'LM' },
  { id: 4, t: 'Integração com o Slack', tag: 'Backend', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', due: '18 out', who: 'FA' },
  { id: 5, t: 'Checklist de lançamento', tag: 'Produto', tone: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', due: '20 out', who: 'AS' },
]

function TarefasMock() {
  const [done, setDone] = useState<number[]>([2])
  const toggle = (id: number) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Sprint 42 · Lançamento</div>
        <Badge variant="secondary">
          {done.length}/{TAREFAS.length} feitas
        </Badge>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(done.length / TAREFAS.length) * 100}%` }} />
      </div>
      <ul className="mt-3 divide-y">
        {TAREFAS.map((t) => {
          const ok = done.includes(t.id)
          return (
            <li key={t.id} className="flex items-center gap-3 py-2.5">
              <Checkbox checked={ok} onCheckedChange={() => toggle(t.id)} aria-label={`Concluir: ${t.t}`} />
              <span className={`flex-1 truncate text-sm ${ok ? 'text-muted-foreground line-through' : ''}`}>{t.t}</span>
              <span className={`hidden rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:inline ${t.tone}`}>{t.tag}</span>
              <span className="text-[11px] text-muted-foreground">{t.due}</span>
              <Avatar size="sm">
                <AvatarFallback>{t.who}</AvatarFallback>
              </Avatar>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const FLUXO = [
  { k: 'Gatilho', t: 'Tarefa marcada como concluída', tone: 'border-violet-500/40 bg-violet-500/5' },
  { k: 'Condição', t: 'Se a etiqueta for “Lançamento”', tone: 'border-amber-500/40 bg-amber-500/5' },
  { k: 'Ação', t: 'Avisar no Slack #lancamento', tone: 'border-emerald-500/40 bg-emerald-500/5' },
  { k: 'Ação', t: 'Mover o card para “Entregue”', tone: 'border-emerald-500/40 bg-emerald-500/5' },
]

function AutomacoesMock() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Avisar o time no lançamento</div>
          <div className="text-xs text-muted-foreground">128 execuções esta semana · 0 falhas</div>
        </div>
        <Badge className="gap-1.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Ativa
        </Badge>
      </div>
      <ol className="mt-4 space-y-0">
        {FLUXO.map((f, i) => (
          <li key={i} className="relative pl-6">
            {i < FLUXO.length - 1 && <span className="absolute left-[9px] top-8 h-[calc(100%-16px)] w-px bg-border" aria-hidden />}
            <span className="absolute left-0 top-3 flex size-5 items-center justify-center rounded-full border bg-background text-[10px] font-semibold">{i + 1}</span>
            <div className={`mb-3 rounded-lg border px-3 py-2.5 ${f.tone}`}>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{f.k}</div>
              <div className="text-sm">{f.t}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

const SEMANAS = [
  { s: 'S1', concluidas: 38, atrasadas: 6 },
  { s: 'S2', concluidas: 42, atrasadas: 4 },
  { s: 'S3', concluidas: 35, atrasadas: 9 },
  { s: 'S4', concluidas: 51, atrasadas: 3 },
  { s: 'S5', concluidas: 47, atrasadas: 5 },
  { s: 'S6', concluidas: 58, atrasadas: 2 },
]
const CHART = {
  concluidas: { label: 'Concluídas', color: 'var(--chart-1)' },
  atrasadas: { label: 'Atrasadas', color: 'var(--chart-5)' },
} satisfies ChartConfig

function RelatoriosMock() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-3">
        {[
          ['Vazão', '47/sem', '+12%'],
          ['Atraso médio', '1,4 dia', '-0,6'],
          ['Carga', '6,2 tarefas', 'por pessoa'],
        ].map(([l, v, d]) => (
          <div key={l} className="rounded-lg bg-muted/50 p-3">
            <div className="text-[11px] text-muted-foreground">{l}</div>
            <div className="text-lg font-semibold tabular-nums">{v}</div>
            <div className="text-[11px] text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
      <ChartContainer config={CHART} className="mt-4 h-[180px] w-full">
        <BarChart data={SEMANAS} margin={{ left: 0, right: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="s" tickLine={false} axisLine={false} tickMargin={6} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="concluidas" fill="var(--color-concluidas)" radius={4} />
          <Bar dataKey="atrasadas" fill="var(--color-atrasadas)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

const MOCKS: Record<TabId, () => React.JSX.Element> = { docs: DocMock, tarefas: TarefasMock, automacoes: AutomacoesMock, relatorios: RelatoriosMock }

function PlexoAbas() {
  const [tab, setTab] = useState<TabId>('docs')
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
          <TabsList className="mx-auto h-auto! flex-wrap justify-center gap-1 rounded-full p-1">
            {FEATURES.map((f) => (
              <TabsTrigger key={f.id} value={f.id} className="rounded-full px-4 py-2">
                <f.Icon data-icon="inline-start" /> {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {FEATURES.map((f) => {
            const Mock = MOCKS[f.id]
            return (
              <TabsContent key={f.id} value={f.id} className="mt-10">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <f.Icon className="size-5" />
                    </span>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{f.title}</h2>
                    <p className="mt-3 text-muted-foreground">{f.desc}</p>
                    <ul className="mt-6 space-y-2.5 text-sm">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {b}
                        </li>
                      ))}
                    </ul>
                    <Button variant="link" className="mt-4 px-0">
                      Ver documentação de {f.label.toLowerCase()} <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                  <Mock />
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

const INTEGRACOES = ['Slack', 'Google Drive', 'GitHub', 'Figma', 'Notion', 'Jira', 'Gmail', 'Zoom']

function PlexoIntegracoes() {
  return (
    <section className="w-full bg-muted/30 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Funciona com o que você já usa</h2>
            <p className="mt-3 text-muted-foreground">Conecte as ferramentas do time em dois cliques. Tudo que acontece lá aparece aqui, e vice-versa.</p>
            <Button variant="outline" className="mt-6">
              Ver todas as 60 integrações
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INTEGRACOES.map((n) => (
              <div key={n} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted-foreground/20 text-xs font-semibold">{n.slice(0, 2).toUpperCase()}</span>
                <span className="truncate text-sm font-medium">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const STATS: Array<[string, string]> = [
  ['18 mil', 'times ativos'],
  ['4,2 mi', 'tarefas por mês'],
  ['99,98%', 'disponibilidade'],
  ['< 1 min', 'para o primeiro doc'],
]

function PlexoStats() {
  return (
    <section className="w-full px-6 py-16">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-2xl border p-8 md:grid-cols-4">
        {STATS.map(([n, l]) => (
          <div key={l} className="text-center">
            <dd className="text-3xl font-semibold tracking-tight tabular-nums">{n}</dd>
            <dt className="mt-1 text-sm text-muted-foreground">{l}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

function PlexoCta() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-16">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Monte o workspace do seu time hoje</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Grátis para até 10 pessoas. Importe do Trello, Notion ou Jira em minutos.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="secondary">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            Falar com vendas
          </Button>
        </div>
      </div>
    </section>
  )
}

function PlexoFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <PlexoLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Preços', 'Docs', 'Status', 'Privacidade', 'Termos'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span className="text-xs">© 2026 Plexo Software Ltda.</span>
      </div>
    </footer>
  )
}

export default function PaginaDeFeaturesEmAbas() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <PlexoNavbar />
      <PlexoHero />
      <PlexoAbas />
      <PlexoIntegracoes />
      <PlexoStats />
      <PlexoCta />
      <PlexoFooter />
    </div>
  )
}
