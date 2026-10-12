'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { mes: 'Mai', whatsapp: 1240, instagram: 620, email: 410 },
  { mes: 'Jun', whatsapp: 1380, instagram: 710, email: 390 },
  { mes: 'Jul', whatsapp: 1520, instagram: 680, email: 450 },
  { mes: 'Ago', whatsapp: 1610, instagram: 820, email: 470 },
  { mes: 'Set', whatsapp: 1840, instagram: 910, email: 430 },
  { mes: 'Out', whatsapp: 2060, instagram: 1040, email: 480 },
]
const KEYS = ['whatsapp', 'instagram', 'email'] as const
type Key = (typeof KEYS)[number]

const CONFIG = {
  whatsapp: { label: 'WhatsApp', color: 'var(--chart-1)' },
  instagram: { label: 'Instagram', color: 'var(--chart-2)' },
  email: { label: 'E-mail', color: 'var(--chart-3)' },
} satisfies ChartConfig

const TOTALS: { key: Key; total: number }[] = KEYS.map((key) => ({ key, total: DATA.reduce((acc, d) => acc + d[key], 0) }))
const GRAND = TOTALS.reduce((acc, t) => acc + t.total, 0)

export default function GraficoAreaEmpilhada() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Conversas por canal</CardTitle>
            <CardDescription>Maio a outubro de 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[280px] w-full">
              <AreaChart data={DATA} margin={{ left: 8, right: 8 }}>
                <defs>
                  {KEYS.map((k) => (
                    <linearGradient key={k} id={`fill-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.1} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="email" type="natural" fill="url(#fill-email)" stroke="var(--color-email)" stackId="a" />
                <Area dataKey="instagram" type="natural" fill="url(#fill-instagram)" stroke="var(--color-instagram)" stackId="a" />
                <Area dataKey="whatsapp" type="natural" fill="url(#fill-whatsapp)" stroke="var(--color-whatsapp)" stackId="a" />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participação no período</CardTitle>
            <CardDescription>{GRAND.toLocaleString('pt-BR')} conversas no total</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {TOTALS.map((t) => {
              const share = (t.total / GRAND) * 100
              return (
                <div key={t.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-[3px]" style={{ background: CONFIG[t.key].color }} />
                      {CONFIG[t.key].label}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {t.total.toLocaleString('pt-BR')} · {share.toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${share}%`, background: CONFIG[t.key].color }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">WhatsApp cresceu 66% desde maio e já responde por mais da metade do volume.</CardFooter>
        </Card>
      </div>
    </section>
  )
}
