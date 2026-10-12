'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { mes: 'Mar', organico: 320, pago: 210, indicacao: 90 },
  { mes: 'Abr', organico: 340, pago: 260, indicacao: 110 },
  { mes: 'Mai', organico: 390, pago: 240, indicacao: 130 },
  { mes: 'Jun', organico: 410, pago: 310, indicacao: 120 },
  { mes: 'Jul', organico: 450, pago: 290, indicacao: 160 },
  { mes: 'Ago', organico: 470, pago: 350, indicacao: 190 },
  { mes: 'Set', organico: 520, pago: 330, indicacao: 210 },
  { mes: 'Out', organico: 580, pago: 300, indicacao: 260 },
]
const CONFIG = {
  organico: { label: 'Orgânico', color: 'var(--chart-1)' },
  pago: { label: 'Mídia paga', color: 'var(--chart-2)' },
  indicacao: { label: 'Indicação', color: 'var(--chart-4)' },
} satisfies ChartConfig
const KEYS = ['organico', 'pago', 'indicacao'] as const

export default function GraficoLinhasMultiplas() {
  const last = DATA[DATA.length - 1]!
  const prev = DATA[DATA.length - 2]!
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Leads por origem</CardTitle>
            <CardDescription>Março a outubro de 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[280px] w-full">
              <LineChart data={DATA} margin={{ left: 0, right: 16, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {KEYS.map((k) => (
                  <Line key={k} dataKey={k} type="monotone" stroke={`var(--color-${k})`} strokeWidth={2} dot={{ r: 3, fill: `var(--color-${k})`, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                ))}
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {KEYS.map((k) => {
            const change = ((last[k] - prev[k]) / prev[k]) * 100
            const up = change >= 0
            return (
              <Card key={k} size="sm">
                <CardContent className="flex items-center gap-3">
                  <span className="h-10 w-1 rounded-full" style={{ background: CONFIG[k].color }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{CONFIG[k].label}</p>
                    <p className="text-xl font-semibold tabular-nums">{last[k]} leads</p>
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    {Math.abs(change).toFixed(0)}% vs. set.
                  </span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
