'use client'

import { useId, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Periodo = '7d' | '30d' | '90d'
interface Ponto {
  x: string
  atual: number
  anterior: number
}
const SERIES: Record<Periodo, Ponto[]> = {
  '7d': [
    { x: 'seg', atual: 12400, anterior: 10100 },
    { x: 'ter', atual: 13900, anterior: 11800 },
    { x: 'qua', atual: 12100, anterior: 12600 },
    { x: 'qui', atual: 15800, anterior: 12900 },
    { x: 'sex', atual: 17200, anterior: 13400 },
    { x: 'sáb', atual: 9800, anterior: 8200 },
    { x: 'dom', atual: 8100, anterior: 7400 },
  ],
  '30d': [
    { x: '01', atual: 38000, anterior: 31000 },
    { x: '04', atual: 41000, anterior: 33500 },
    { x: '07', atual: 39500, anterior: 36000 },
    { x: '10', atual: 45000, anterior: 35200 },
    { x: '13', atual: 47800, anterior: 38900 },
    { x: '16', atual: 46100, anterior: 40100 },
    { x: '19', atual: 52300, anterior: 41800 },
    { x: '22', atual: 55900, anterior: 43000 },
    { x: '25', atual: 54200, anterior: 45600 },
    { x: '28', atual: 59800, anterior: 46900 },
  ],
  '90d': [
    { x: 'S1', atual: 92000, anterior: 80000 },
    { x: 'S2', atual: 96000, anterior: 82500 },
    { x: 'S3', atual: 94500, anterior: 86000 },
    { x: 'S4', atual: 101000, anterior: 87200 },
    { x: 'S5', atual: 108000, anterior: 90800 },
    { x: 'S6', atual: 105500, anterior: 93000 },
    { x: 'S7', atual: 114000, anterior: 95100 },
    { x: 'S8', atual: 119500, anterior: 98400 },
    { x: 'S9', atual: 117800, anterior: 101000 },
    { x: 'S10', atual: 126000, anterior: 103900 },
    { x: 'S11', atual: 131500, anterior: 106200 },
    { x: 'S12', atual: 138000, anterior: 109800 },
  ],
}
const RESUMO: Record<Periodo, { total: string; delta: string; legenda: string }> = {
  '7d': { total: 'R$ 89,3 mil', delta: '+16,8%', legenda: 'Semana de 6 a 12 de outubro' },
  '30d': { total: 'R$ 479,6 mil', delta: '+21,4%', legenda: 'Últimos 30 dias' },
  '90d': { total: 'R$ 1,34 mi', delta: '+19,2%', legenda: 'Últimas 12 semanas' },
}
const CONFIG = {
  atual: { label: 'Este período', color: 'var(--chart-1)' },
  anterior: { label: 'Período anterior', color: 'var(--chart-3)' },
} satisfies ChartConfig
const k = (v: number) => `${Math.round(v / 1000)}k`

export default function GraficoAreaGradiente() {
  const [periodo, setPeriodo] = useState<Periodo>('30d')
  const gid = `grad-${useId().replace(/:/g, '')}`
  const resumo = RESUMO[periodo]

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Receita recorrente</CardTitle>
        <CardDescription>{resumo.legenda}</CardDescription>
        <CardAction>
          <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as Periodo)}>
            <TabsList>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">{resumo.total}</span>
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            <TrendingUp data-icon="inline-start" /> {resumo.delta}
          </Badge>
        </div>
        <ChartContainer config={CONFIG} className="h-[220px] w-full">
          <AreaChart data={SERIES[periodo]} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-atual)" stopOpacity={0.55} />
                <stop offset="60%" stopColor="var(--color-atual)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--color-atual)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="x" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={36} tickMargin={4} tickFormatter={(v: number) => k(v)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="anterior" type="monotone" stroke="var(--color-anterior)" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
            <Area dataKey="atual" type="monotone" stroke="var(--color-atual)" strokeWidth={2} fill={`url(#${gid})`} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full" style={{ background: CONFIG.atual.color }} /> Este período
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full border-t border-dashed" style={{ borderColor: CONFIG.anterior.color }} /> Período anterior
        </span>
      </CardFooter>
    </Card>
  )
}
