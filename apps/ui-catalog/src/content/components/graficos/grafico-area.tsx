'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { mes: 'Jan', receita: 32, meta: 30 },
  { mes: 'Fev', receita: 38, meta: 32 },
  { mes: 'Mar', receita: 35, meta: 34 },
  { mes: 'Abr', receita: 44, meta: 36 },
  { mes: 'Mai', receita: 49, meta: 38 },
  { mes: 'Jun', receita: 54, meta: 40 },
]

const CONFIG = {
  receita: { label: 'Receita', color: 'var(--chart-1)' },
  meta: { label: 'Meta', color: 'var(--chart-3)' },
} satisfies ChartConfig

export default function GraficoArea() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Receita × meta</CardTitle>
        <CardDescription>Últimos 6 meses, em R$ mil</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-[220px] w-full">
          <AreaChart data={DATA} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="meta" type="natural" fill="var(--color-meta)" fillOpacity={0.15} stroke="var(--color-meta)" strokeDasharray="4 4" />
            <Area dataKey="receita" type="natural" fill="var(--color-receita)" fillOpacity={0.3} stroke="var(--color-receita)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
