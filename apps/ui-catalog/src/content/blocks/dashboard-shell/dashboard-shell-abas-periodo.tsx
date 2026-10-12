'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Bell, CalendarDays, ChartLine, Headphones, House, Megaphone, Search, Settings, ShoppingCart, SlidersHorizontal, Users, X, Zap } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Label } from '@/components/ui/label'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Periodo = 'hoje' | '7d' | '30d' | '12m'
type Aba = 'visao' | 'vendas' | 'marketing' | 'suporte'

interface Kpi {
  label: string
  base: number
  tipo: 'moeda' | 'num' | 'pct'
  delta: number
  fixo?: boolean
  inverso?: boolean
  sufixo?: string
}

const NAV: { Icon: LucideIcon; label: string; badge?: string; active?: boolean }[] = [
  { Icon: House, label: 'Painéis', active: true },
  { Icon: ShoppingCart, label: 'Pedidos', badge: '18' },
  { Icon: Users, label: 'Clientes' },
  { Icon: Megaphone, label: 'Campanhas', badge: '3' },
  { Icon: Headphones, label: 'Atendimento' },
  { Icon: ChartLine, label: 'Relatórios' },
  { Icon: Settings, label: 'Configurações' },
]

const ABAS: { id: Aba; label: string; titulo: string }[] = [
  { id: 'visao', label: 'Visão geral', titulo: 'Receita por período' },
  { id: 'vendas', label: 'Vendas', titulo: 'Pedidos pagos' },
  { id: 'marketing', label: 'Marketing', titulo: 'Leads gerados' },
  { id: 'suporte', label: 'Suporte', titulo: 'Tickets resolvidos' },
]

const PERIODOS: { id: Periodo; label: string; rotulo: string; mult: number }[] = [
  { id: 'hoje', label: 'Hoje', rotulo: '12 de outubro de 2026', mult: 1 },
  { id: '7d', label: '7 dias', rotulo: '6 – 12 de outubro', mult: 6.4 },
  { id: '30d', label: '30 dias', rotulo: '13 de setembro – 12 de outubro', mult: 26 },
  { id: '12m', label: '12 meses', rotulo: 'outubro de 2025 – outubro de 2026', mult: 298 },
]

const KPIS: Record<Aba, Kpi[]> = {
  visao: [
    { label: 'Receita', base: 18420, tipo: 'moeda', delta: 12.4 },
    { label: 'Pedidos', base: 64, tipo: 'num', delta: 8.1 },
    { label: 'Novos clientes', base: 21, tipo: 'num', delta: -3.2 },
    { label: 'Taxa de conversão', base: 3.4, tipo: 'pct', delta: 0.6, fixo: true },
  ],
  vendas: [
    { label: 'Receita bruta', base: 18420, tipo: 'moeda', delta: 12.4 },
    { label: 'Ticket médio', base: 287, tipo: 'moeda', delta: 4.8, fixo: true },
    { label: 'Reembolsos', base: 410, tipo: 'moeda', delta: -1.9, inverso: true },
    { label: 'Carrinhos recuperados', base: 9, tipo: 'num', delta: 15 },
  ],
  marketing: [
    { label: 'Visitantes', base: 4120, tipo: 'num', delta: 9.3 },
    { label: 'Leads', base: 138, tipo: 'num', delta: 6.7 },
    { label: 'Custo por lead', base: 12.4, tipo: 'moeda', delta: -8.2, fixo: true, inverso: true },
    { label: 'ROI das campanhas', base: 312, tipo: 'pct', delta: 21, fixo: true },
  ],
  suporte: [
    { label: 'Tickets abertos', base: 42, tipo: 'num', delta: -5.5, inverso: true },
    { label: 'Tempo de 1ª resposta', base: 4, tipo: 'num', delta: -12, fixo: true, inverso: true, sufixo: ' min' },
    { label: 'Resolvidos no 1º contato', base: 78, tipo: 'pct', delta: 2.1, fixo: true },
    { label: 'CSAT', base: 4.7, tipo: 'num', delta: 0.2, fixo: true, sufixo: ' / 5' },
  ],
}

const METAS: Record<Aba, { label: string; pct: number }[]> = {
  visao: [
    { label: 'Receita do mês', pct: 74 },
    { label: 'Novos clientes', pct: 58 },
    { label: 'NPS', pct: 102 },
  ],
  vendas: [
    { label: 'Pedidos pagos', pct: 81 },
    { label: 'Ticket médio', pct: 66 },
    { label: 'Recuperação de carrinho', pct: 45 },
  ],
  marketing: [
    { label: 'Leads qualificados', pct: 92 },
    { label: 'Custo por lead', pct: 108 },
    { label: 'Tráfego orgânico', pct: 39 },
  ],
  suporte: [
    { label: 'SLA de 1ª resposta', pct: 96 },
    { label: 'Backlog zerado', pct: 52 },
    { label: 'CSAT acima de 4,5', pct: 104 },
  ],
}

const CONFIG = {
  atual: { label: 'Período atual', color: 'var(--chart-1)' },
  anterior: { label: 'Período anterior', color: 'var(--chart-3)' },
} satisfies ChartConfig

const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
const MESES = ['nov', 'dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out']

function rotulo(periodo: Periodo, i: number) {
  if (periodo === 'hoje') return `${String(i * 2).padStart(2, '0')}h`
  if (periodo === '7d') return DIAS[i]
  if (periodo === '12m') return MESES[i]
  const d = new Date(2026, 8, 13 + i * 3)
  return `${d.getDate()}/${d.getMonth() + 1}`
}

function serie(periodo: Periodo, seed: number) {
  const n = periodo === 'hoje' ? 12 : periodo === '7d' ? 7 : periodo === '30d' ? 10 : 12
  return Array.from({ length: n }, (_, i) => ({
    label: rotulo(periodo, i),
    atual: Math.round(40 + Math.sin((i + seed) / 1.6) * 14 + (i * 22) / n),
    anterior: Math.round(36 + Math.cos((i + seed) / 1.4) * 11 + (i * 14) / n),
  }))
}

function fmt(k: Kpi, mult: number) {
  const v = k.fixo ? k.base : k.base * mult
  const n = k.fixo ? v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : Math.round(v).toLocaleString('pt-BR')
  if (k.tipo === 'moeda') return `R$ ${n}`
  if (k.tipo === 'pct') return `${n}%`
  return `${n}${k.sufixo ?? ''}`
}

function Painel({ aba, periodo, comparar }: { aba: Aba; periodo: Periodo; comparar: boolean }) {
  const p = PERIODOS.find((x) => x.id === periodo) ?? PERIODOS[2]
  const meta = ABAS.find((a) => a.id === aba) ?? ABAS[0]
  const dados = serie(periodo, ABAS.indexOf(meta))
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS[aba].map((k) => {
          const bom = k.inverso ? k.delta < 0 : k.delta > 0
          return (
            <div key={k.label} className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-xl font-semibold tabular-nums">{fmt(k, p.mult)}</p>
                <span className={cn('flex items-center gap-0.5 text-xs font-medium', bom ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                  {k.delta > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(k.delta).toLocaleString('pt-BR')}
                  {k.tipo === 'pct' ? ' pp' : '%'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{meta.titulo}</CardTitle>
            <CardDescription>
              {p.rotulo}
              {comparar ? ' · comparado ao período anterior' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[220px] w-full">
              <BarChart data={dados} margin={{ left: 4, right: 4 }} barGap={2}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {comparar && <Bar dataKey="anterior" fill="var(--color-anterior)" radius={4} />}
                <Bar dataKey="atual" fill="var(--color-atual)" radius={4} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metas do período</CardTitle>
            <CardDescription>Progresso em relação ao planejado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {METAS[aba].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{m.label}</span>
                  <span className={cn('tabular-nums', m.pct >= 100 ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>{m.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-muted">
                  <div className={cn('h-full rounded-full transition-[width]', m.pct >= 100 ? 'bg-emerald-500' : m.pct >= 60 ? 'bg-primary' : 'bg-amber-500')} style={{ width: `${Math.min(100, m.pct)}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">Metas acima de 100% já foram batidas neste período.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardShellAbasPeriodo() {
  const [aba, setAba] = useState<Aba>('visao')
  const [periodo, setPeriodo] = useState<Periodo>('30d')
  const [comparar, setComparar] = useState(true)
  const [filtros, setFiltros] = useState<string[]>(['Canal: WhatsApp', 'Região: Sudeste'])
  const atual = PERIODOS.find((p) => p.id === periodo) ?? PERIODOS[2]

  return (
    <SidebarProvider className="min-h-[640px] w-full bg-background text-foreground">
      <Sidebar collapsible="none" className="hidden border-r md:flex">
        <SidebarHeader className="p-3">
          <div className="flex items-center gap-2 px-1 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </span>
            Vetor
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active} render={<a href="#" />}>
                      <item.Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge className="bg-muted">{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href="#" />}>
                <Avatar size="sm">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-sm font-medium">Ana Souza</span>
                  <span className="truncate text-xs text-muted-foreground">Gerente comercial</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="flex h-14 items-center gap-2 border-b px-4 sm:px-6">
          <h1 className="text-base font-semibold">Painéis</h1>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Buscar">
              <Search />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notificações" className="relative">
              <Bell />
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-primary" />
            </Button>
            <Avatar size="sm" className="ml-1">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Tabs value={aba} onValueChange={(v) => setAba(v as Aba)} className="gap-0">
          <div className="border-b px-4 sm:px-6">
            <TabsList variant="line" className="pb-1.5">
              {ABAS.map((a) => (
                <TabsTrigger key={a.id} value={a.id} className="px-3">
                  {a.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b bg-muted/30 px-4 py-2.5 sm:px-6">
            <div className="inline-flex rounded-lg border bg-background p-0.5">
              {PERIODOS.map((p) => (
                <button key={p.id} type="button" onClick={() => setPeriodo(p.id)} aria-pressed={periodo === p.id} className={cn('rounded-md px-2.5 py-1 text-xs font-medium transition-colors', periodo === p.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
                  {p.label}
                </button>
              ))}
            </div>
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <CalendarDays className="size-3.5" /> {atual.rotulo}
            </span>
            {filtros.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-0.5 text-xs">
                {f}
                <button type="button" aria-label={`Remover filtro ${f}`} onClick={() => setFiltros((prev) => prev.filter((x) => x !== f))} className="rounded-full text-muted-foreground hover:text-foreground">
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <SlidersHorizontal data-icon="inline-start" /> Filtros
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <Switch id="dsh-comparar" size="sm" checked={comparar} onCheckedChange={setComparar} />
              <Label htmlFor="dsh-comparar" className="text-xs font-normal text-muted-foreground">
                Comparar com período anterior
              </Label>
            </div>
          </div>

          <main className="p-4 sm:p-6">
            {ABAS.map((a) => (
              <TabsContent key={a.id} value={a.id}>
                <Painel aba={a.id} periodo={periodo} comparar={comparar} />
              </TabsContent>
            ))}
          </main>
        </Tabs>
      </SidebarInset>
    </SidebarProvider>
  )
}
