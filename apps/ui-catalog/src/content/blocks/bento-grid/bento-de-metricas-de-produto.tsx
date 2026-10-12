'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Package, Star, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Period = '7d' | '30d'
interface Metrics {
  revenue: number
  revenueDelta: number
  series: number[]
  labels: [string, string, string]
  conversion: number
  conversionDelta: number
  ticket: number
  ticketDelta: number
  ticketBars: number[]
  orders: number
}

const DATA: Record<Period, Metrics> = {
  '7d': { revenue: 48250, revenueDelta: 12.4, series: [38, 42, 35, 51, 47, 63, 58, 72, 66, 80, 74, 88], labels: ['6 out', '9 out', '12 out'], conversion: 3.8, conversionDelta: 0.4, ticket: 186.4, ticketDelta: -2.1, ticketBars: [60, 72, 55, 80, 68, 90, 76], orders: 259 },
  '30d': { revenue: 192800, revenueDelta: 8.1, series: [52, 48, 61, 58, 70, 66, 74, 69, 81, 78, 90, 86], labels: ['13 set', '28 set', '12 out'], conversion: 3.4, conversionDelta: -0.2, ticket: 191.2, ticketDelta: 3.6, ticketBars: [65, 70, 74, 68, 82, 79, 88], orders: 1008 },
}
const TOP = [
  { name: 'Fone Aero Buds 2', revenue: 12790, share: 100 },
  { name: 'Tênis Aero Run Max 2', revenue: 9898, share: 77 },
  { name: 'Cafeteira Kaffa Espresso', revenue: 7740, share: 61 },
  { name: 'Relógio Pulse Fit', revenue: 5199, share: 41 },
]
const LOW_STOCK = [
  { name: 'Fone Nimbus ANC Pro', stock: 8, days: 4, level: 'critico' as const },
  { name: 'Câmera Instantânea Lumi', stock: 5, days: 6, level: 'critico' as const },
  { name: 'Notebook Vega 14"', stock: 3, days: 11, level: 'repor' as const },
]
const RATINGS = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 1 },
]
const CHANNELS = [
  { label: 'Site', value: 54 },
  { label: 'App', value: 31 },
  { label: 'Marketplace', value: 15 },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function Delta({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const up = value >= 0
  return (
    <Badge variant="secondary" className={cn('gap-0.5 tabular-nums', up ? 'text-emerald-600' : 'text-rose-600')}>
      {up ? <ArrowUpRight data-icon="inline-start" /> : <ArrowDownRight data-icon="inline-start" />}
      {up ? '+' : ''}
      {value.toLocaleString('pt-BR')}
      {suffix}
    </Badge>
  )
}

function Sparkline({ series }: { series: number[] }) {
  const w = 100
  const h = 40
  const max = Math.max(...series)
  const min = Math.min(...series)
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 4) - 2] as const)
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-32 w-full text-primary" aria-hidden="true">
      <defs>
        <linearGradient id="bmp-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill="url(#bmp-fill)" />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      {last && <circle cx={last[0]} cy={last[1]} r="1.6" fill="currentColor" />}
    </svg>
  )
}

function Cell({ title, action, className, children }: { title: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col rounded-xl border bg-card p-5', className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {action}
      </div>
      <div className="mt-3 flex-1">{children}</div>
    </div>
  )
}

export default function BentoDeMetricasDeProduto() {
  const [period, setPeriod] = useState<Period>('7d')
  const m = DATA[period]
  const circumference = 2 * Math.PI * 36

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Loja · visão geral</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Métricas de produto num bento só</h2>
          </div>
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="Período"
            value={[period]}
            onValueChange={(v) => {
              const next = v[0]
              if (next === '7d' || next === '30d') setPeriod(next)
            }}
          >
            <ToggleGroupItem value="7d" className="aria-pressed:bg-muted">7 dias</ToggleGroupItem>
            <ToggleGroupItem value="30d" className="aria-pressed:bg-muted">30 dias</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-6">
          <Cell title="Receita" action={<Delta value={m.revenueDelta} />} className="md:col-span-4 md:row-span-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums">{brl(m.revenue)}</span>
              <span className="text-sm text-muted-foreground">{m.orders.toLocaleString('pt-BR')} pedidos</span>
            </div>
            <div className="mt-6">
              <Sparkline series={m.series} />
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                {m.labels.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </Cell>

          <Cell title="Conversão" action={<Delta value={m.conversionDelta} suffix=" p.p." />} className="md:col-span-2">
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
                <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="7" className="text-muted" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-primary transition-[stroke-dasharray] duration-500" strokeDasharray={`${(m.conversion / 10) * circumference} ${circumference}`} />
              </svg>
              <div>
                <div className="text-3xl font-semibold tabular-nums">{m.conversion.toLocaleString('pt-BR')}%</div>
                <div className="text-xs text-muted-foreground">de visitas viram pedido</div>
              </div>
            </div>
          </Cell>

          <Cell title="Ticket médio" action={<Delta value={m.ticketDelta} />} className="md:col-span-2">
            <div className="text-3xl font-semibold tabular-nums">{m.ticket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {m.ticketBars.map((b, i) => (
                <div key={i} className={cn('flex-1 rounded-sm transition-[height] duration-500', i === m.ticketBars.length - 1 ? 'bg-primary' : 'bg-primary/25')} style={{ height: `${b}%` }} />
              ))}
            </div>
          </Cell>

          <Cell title="Produtos mais vendidos" className="md:col-span-3">
            <ol className="space-y-3">
              {TOP.map((p, i) => (
                <li key={p.name} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-4 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                      {p.name}
                    </span>
                    <span className="font-medium tabular-nums">{brl(p.revenue)}</span>
                  </div>
                  <div className="ml-6 mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p.share}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          </Cell>

          <Cell title="Estoque crítico" action={<Badge variant="destructive">{LOW_STOCK.length}</Badge>} className="md:col-span-3">
            <ul className="divide-y">
              {LOW_STOCK.map((s) => (
                <li key={s.name} className="flex items-center gap-3 py-2 text-sm first:pt-0 last:pb-0">
                  <span className={cn('flex size-8 items-center justify-center rounded-lg', s.level === 'critico' ? 'bg-rose-500/15 text-rose-600' : 'bg-amber-500/15 text-amber-600')}>
                    {s.level === 'critico' ? <TriangleAlert className="size-4" /> : <Package className="size-4" />}
                  </span>
                  <span className="flex-1 truncate">{s.name}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{s.stock} un. · ~{s.days} dias</span>
                </li>
              ))}
            </ul>
          </Cell>

          <Cell title="Avaliações" className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold tabular-nums">4,7</span>
              <Star className="size-5 fill-amber-500 text-amber-500" />
              <span className="text-xs text-muted-foreground">1.284 notas</span>
            </div>
            <div className="mt-3 space-y-1">
              {RATINGS.map((r) => (
                <div key={r.stars} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 text-muted-foreground tabular-nums">{r.stars}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-7 text-right text-muted-foreground tabular-nums">{r.pct}%</span>
                </div>
              ))}
            </div>
          </Cell>

          <Cell title="Devoluções" className="md:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tabular-nums">1,9%</span>
              <span className="text-xs text-emerald-600">abaixo da meta de 3%</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex justify-between">
                <span>Tamanho errado</span>
                <span className="tabular-nums">46%</span>
              </li>
              <li className="flex justify-between">
                <span>Defeito</span>
                <span className="tabular-nums">31%</span>
              </li>
              <li className="flex justify-between">
                <span>Arrependimento</span>
                <span className="tabular-nums">23%</span>
              </li>
            </ul>
          </Cell>

          <Cell title="Canais de venda" className="md:col-span-2">
            <div className="space-y-2.5">
              {CHANNELS.map((c) => (
                <div key={c.label} className="text-xs">
                  <div className="flex justify-between">
                    <span>{c.label}</span>
                    <span className="font-medium tabular-nums">{c.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${c.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  )
}
