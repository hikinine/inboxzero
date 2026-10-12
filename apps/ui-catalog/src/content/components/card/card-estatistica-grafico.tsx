'use client'

import { useId, type ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const serie = (valores: number[]) => valores.map((v, i) => ({ dia: String(i + 1).padStart(2, '0'), v }))
const RECEITA = serie([42, 48, 45, 52, 58, 55, 61, 64, 70, 68, 74, 79, 83, 88])
const CLIENTES = serie([12, 9, 14, 11, 16, 13, 18, 15, 20, 17, 22, 19, 24, 27])
const CONVERSAO = serie([3.1, 3.4, 3.2, 3.8, 3.6, 3.9, 4.1, 3.7, 3.5, 3.3, 3.4, 3.2, 3.0, 2.9])

const CFG_RECEITA = { v: { label: 'Receita (R$ mil)', color: 'var(--chart-1)' } } satisfies ChartConfig
const CFG_CLIENTES = { v: { label: 'Novos clientes', color: 'var(--chart-2)' } } satisfies ChartConfig
const CFG_CONVERSAO = { v: { label: 'Conversão (%)', color: 'var(--chart-5)' } } satisfies ChartConfig
const MINI = 'aspect-auto h-14 w-full'

function Stat({ titulo, valor, delta, children }: { titulo: string; valor: string; delta: number; children: ReactNode }) {
  const positivo = delta >= 0
  return (
    <Card size="sm" className="gap-2">
      <CardContent className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs text-muted-foreground">{titulo}</div>
          <div className="mt-0.5 text-2xl font-semibold tracking-tight tabular-nums">{valor}</div>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums',
            positivo ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
          )}
        >
          {positivo ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {Math.abs(delta).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
        </span>
      </CardContent>
      <CardContent>{children}</CardContent>
      <CardContent className="text-[11px] text-muted-foreground">Últimos 14 dias vs. anteriores</CardContent>
    </Card>
  )
}

export default function CardEstatisticaGrafico() {
  const gid = `stat-${useId().replace(/:/g, '')}`
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      <Stat titulo="Receita" valor="R$ 88,4 mil" delta={18.2}>
        <ChartContainer config={CFG_RECEITA} className={MINI}>
          <AreaChart data={RECEITA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} fill={`url(#${gid})`} isAnimationActive={false} />
          </AreaChart>
        </ChartContainer>
      </Stat>

      <Stat titulo="Novos clientes" valor="237" delta={9.4}>
        <ChartContainer config={CFG_CLIENTES} className={MINI}>
          <BarChart data={CLIENTES} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} barCategoryGap={3}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="v" radius={2} isAnimationActive={false}>
              {CLIENTES.map((c, i) => (
                <Cell key={c.dia} fill="var(--color-v)" fillOpacity={i === CLIENTES.length - 1 ? 1 : 0.4} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </Stat>

      <Stat titulo="Taxa de conversão" valor="2,9%" delta={-6.5}>
        <ChartContainer config={CFG_CONVERSAO} className={MINI}>
          <LineChart data={CONVERSAO} margin={{ top: 6, right: 6, left: 6, bottom: 6 }}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          </LineChart>
        </ChartContainer>
      </Stat>
    </div>
  )
}
