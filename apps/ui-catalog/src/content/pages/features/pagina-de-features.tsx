'use client'

import type { ReactNode } from 'react'
import { ArrowRight, BellRing, Check, Filter, Menu, Minus, MousePointerClick, Orbit, Play, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const NAV = ['Produto', 'Preços', 'Docs', 'Blog']

function OrbeLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <Orbit className="size-5" /> Orbe
    </a>
  )
}

function OrbeNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <OrbeLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l, i) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${i === 0 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Testar grátis</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Orbe</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function OrbeHero() {
  return (
    <section className="w-full border-b px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="outline">Funcionalidades</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Entenda o que as pessoas fazem no seu produto</h1>
        <p className="mt-4 text-lg text-muted-foreground">Funis, mapas de calor e retenção por coorte sem instrumentar nada à mão. Instale um script e comece a perguntar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            <Play data-icon="inline-start" /> Tour de 3 minutos
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeatureGroup({ eyebrow, title, desc, bullets, reverse = false, children }: { eyebrow: string; title: string; desc: string; bullets: string[]; reverse?: boolean; children: ReactNode }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 text-muted-foreground">{desc}</p>
        <ul className="mt-6 space-y-3 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{children}</div>
    </div>
  )
}

const FUNNEL: Array<[string, number, string]> = [
  ['Visitou a página de preços', 100, '18.420'],
  ['Criou conta', 46, '8.473'],
  ['Conectou uma fonte de dados', 27, '4.973'],
  ['Criou o primeiro relatório', 19, '3.500'],
  ['Assinou um plano', 7, '1.289'],
]

function FunnelMock() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Funil de ativação</div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Filter className="size-3.5" /> Últimos 30 dias · Brasil
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {FUNNEL.map(([l, p, n], i) => (
          <div key={l}>
            <div className="flex justify-between text-xs">
              <span>{l}</span>
              <span className="tabular-nums text-muted-foreground">
                {n} · {p}%
              </span>
            </div>
            <div className="mt-1 h-7 rounded-md bg-muted">
              <div className={`h-full rounded-md ${i === FUNNEL.length - 1 ? 'bg-primary' : 'bg-primary/70'}`} style={{ width: `${p}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <BellRing className="size-3.5" /> Maior queda: conta → fonte de dados (-41%)
      </div>
    </div>
  )
}

function HeatmapMock() {
  const cols = 12
  const rows = 7
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols
    const y = Math.floor(i / cols)
    const v = Math.max(0, 1 - Math.hypot(x - 3, y - 2) / 5) * 0.8 + Math.max(0, 1 - Math.hypot(x - 9, y - 5) / 4) * 0.6
    return Math.min(1, v)
  })
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Cliques · /checkout</div>
        <span className="text-xs text-muted-foreground">6.212 sessões</span>
      </div>
      <div className="relative mt-5 overflow-hidden rounded-xl border bg-background p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-6 w-24 rounded-md bg-muted" />
        </div>
        <div className="grid grid-cols-12 gap-1">
          {cells.map((v, i) => (
            <span key={i} className="aspect-square rounded-[3px] bg-rose-500" style={{ opacity: 0.08 + v * 0.9 }} />
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <div className="h-8 flex-1 rounded-md bg-muted" />
          <div className="h-8 w-28 rounded-md bg-foreground" />
        </div>
        <span className="absolute left-[27%] top-[32%] flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background">
          <MousePointerClick className="size-3" /> 38% dos cliques
        </span>
      </div>
    </div>
  )
}

const COHORT = [
  ['Jun', 100, 62, 48, 41, 37, 35],
  ['Jul', 100, 65, 51, 44, 39, 0],
  ['Ago', 100, 68, 55, 47, 0, 0],
  ['Set', 100, 71, 58, 0, 0, 0],
  ['Out', 100, 74, 0, 0, 0, 0],
] as const

function shade(v: number) {
  if (v === 0) return 'bg-transparent text-transparent'
  if (v >= 70) return 'bg-primary text-primary-foreground'
  if (v >= 50) return 'bg-primary/70 text-primary-foreground'
  if (v >= 40) return 'bg-primary/40'
  return 'bg-primary/20'
}

function CohortMock() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Retenção semanal</div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="size-3.5" /> Novos usuários por mês
        </span>
      </div>
      <div className="mt-5 grid grid-cols-[48px_repeat(6,1fr)] gap-1 text-[11px]">
        <span />
        {['S0', 'S1', 'S2', 'S3', 'S4', 'S5'].map((s) => (
          <span key={s} className="text-center text-muted-foreground">
            {s}
          </span>
        ))}
        {COHORT.map(([m, ...vals]) => (
          <div key={m} className="contents">
            <span className="flex items-center text-muted-foreground">{m}</span>
            {vals.map((v, i) => (
              <span key={i} className={`flex h-9 items-center justify-center rounded-md font-medium tabular-nums ${shade(v)}`}>
                {v > 0 ? `${v}%` : '·'}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function OrbeGroups() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-24 sm:space-y-32">
        <FeatureGroup
          eyebrow="Funis"
          title="Descubra onde as pessoas desistem"
          desc="Monte um funil com qualquer sequência de eventos e compare por segmento, plano ou campanha. A Orbe aponta o passo com maior queda."
          bullets={['Eventos capturados automaticamente, sem código', 'Comparação lado a lado por segmento', 'Alertas quando a conversão cai mais que o normal']}
        >
          <FunnelMock />
        </FeatureGroup>
        <FeatureGroup
          reverse
          eyebrow="Mapas de calor"
          title="Veja onde clicam — e onde deveriam clicar"
          desc="Cliques, rolagem e movimento do mouse agregados por página. Assista gravações das sessões que travaram no checkout."
          bullets={['Mapas de clique e de rolagem por dispositivo', 'Gravações de sessão com dados sensíveis mascarados', 'Filtro por elemento, tela e versão do app']}
        >
          <HeatmapMock />
        </FeatureGroup>
        <FeatureGroup
          eyebrow="Retenção"
          title="Acompanhe quem volta, mês a mês"
          desc="Coortes por data de cadastro, origem ou plano. Entenda qual funcionalidade faz as pessoas ficarem e invista nela."
          bullets={['Coortes semanais e mensais', 'Retenção por funcionalidade usada', 'Exportação para seu data warehouse']}
        >
          <CohortMock />
        </FeatureGroup>
      </div>
    </section>
  )
}

type Cell = boolean | string
const COMPARE: Array<[string, Cell, Cell, Cell]> = [
  ['Eventos sem código (autocapture)', true, false, 'Parcial'],
  ['Funis com segmentação', true, 'Manual', true],
  ['Mapas de calor e gravações', true, false, false],
  ['Coortes e retenção', true, 'Manual', true],
  ['Alertas de anomalias', true, false, 'Parcial'],
  ['Dados hospedados no Brasil (LGPD)', true, true, false],
  ['Preço previsível por sessão', true, true, false],
]

function CellValue({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto size-4 text-emerald-500" aria-label="Sim" />
  if (v === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Não" />
  return <span className="text-xs text-muted-foreground">{v}</span>
}

function OrbeComparativo() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Comparativo</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Orbe, planilha ou suíte legada?</h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[45%] pl-5">Recurso</TableHead>
                <TableHead className="bg-primary/5 text-center">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    <Orbit className="size-4" /> Orbe
                  </span>
                </TableHead>
                <TableHead className="text-center">Planilhas</TableHead>
                <TableHead className="pr-5 text-center">Suíte legada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARE.map(([f, a, b, c]) => (
                <TableRow key={f}>
                  <TableCell className="pl-5 whitespace-normal">{f}</TableCell>
                  <TableCell className="bg-primary/5 text-center">
                    <CellValue v={a} />
                  </TableCell>
                  <TableCell className="text-center">
                    <CellValue v={b} />
                  </TableCell>
                  <TableCell className="pr-5 text-center">
                    <CellValue v={c} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

function OrbeCta() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Instale em 5 minutos. Primeiras respostas no mesmo dia.</h2>
        <p className="mt-4 text-muted-foreground">Plano gratuito até 10 mil sessões por mês. Sem cartão de crédito.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Criar conta grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="ghost">
            Falar com um especialista
          </Button>
        </div>
      </div>
    </section>
  )
}

function OrbeFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <OrbeLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Preços', 'Docs', 'Status', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Orbe Analytics</span>
      </div>
    </footer>
  )
}

export default function PaginaDeFeatures() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <OrbeNavbar />
      <OrbeHero />
      <OrbeGroups />
      <OrbeComparativo />
      <OrbeCta />
      <OrbeFooter />
    </div>
  )
}
