'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

const DATA = [
  { mes: 'Jan', pedidos: 820 },
  { mes: 'Fev', pedidos: 760 },
  { mes: 'Mar', pedidos: 910 },
  { mes: 'Abr', pedidos: 880 },
  { mes: 'Mai', pedidos: 1020 },
  { mes: 'Jun', pedidos: 960 },
  { mes: 'Jul', pedidos: 1110 },
  { mes: 'Ago', pedidos: 1180 },
  { mes: 'Set', pedidos: 1284 },
  { mes: 'Out', pedidos: 1142 },
]
const CONFIG = { pedidos: { label: 'Pedidos', color: 'var(--chart-1)' } } satisfies ChartConfig
const TOTAL = DATA.reduce((acc, d) => acc + d.pedidos, 0)
const RECORD = DATA.reduce((best, d) => (d.pedidos > best.pedidos ? d : best), DATA[0]!)
const SUMMARY = [
  { label: 'Total no ano', value: TOTAL.toLocaleString('pt-BR'), hint: 'janeiro a outubro' },
  { label: 'Mês recorde', value: RECORD.pedidos.toLocaleString('pt-BR'), hint: `em ${RECORD.mes.toLowerCase()}` },
  { label: 'Média mensal', value: Math.round(TOTAL / DATA.length).toLocaleString('pt-BR'), hint: 'pedidos por mês' },
]

export default function GraficoBarrasTooltip() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos por mês</CardTitle>
            <CardDescription>Janeiro a outubro de 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[260px] w-full">
              <BarChart data={DATA} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Alta de 12,4% no acumulado do ano <TrendingUp className="size-4 text-emerald-500" />
            </div>
            <div className="text-xs text-muted-foreground">Comparado ao mesmo período de 2025. Outubro ainda em andamento.</div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Números consolidados de 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SUMMARY.map((s, i) => (
              <div key={s.label}>
                {i > 0 && <Separator className="mb-4" />}
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.hint}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
