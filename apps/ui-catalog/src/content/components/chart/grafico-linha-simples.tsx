'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { dia: '01', visitas: 820 },
  { dia: '02', visitas: 932 },
  { dia: '03', visitas: 901 },
  { dia: '04', visitas: 1050 },
  { dia: '05', visitas: 1180 },
  { dia: '06', visitas: 990 },
  { dia: '07', visitas: 1120 },
  { dia: '08', visitas: 1260 },
  { dia: '09', visitas: 1420 },
  { dia: '10', visitas: 1310 },
  { dia: '11', visitas: 1190 },
  { dia: '12', visitas: 1275 },
  { dia: '13', visitas: 1340 },
  { dia: '14', visitas: 1398 },
]

const CONFIG = {
  visitas: { label: 'Visitas', color: 'var(--chart-2)' },
} satisfies ChartConfig

export default function GraficoLinhaSimples() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Visitas na landing page</CardTitle>
        <CardDescription>1 a 14 de outubro</CardDescription>
        <CardAction>
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            <TrendingUp data-icon="inline-start" /> +12,4%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-[200px] w-full">
          <LineChart data={DATA} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} interval={1} />
            <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
            <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent indicator="line" labelFormatter={(v) => `Dia ${v}`} />} />
            <Line dataKey="visitas" type="monotone" stroke="var(--color-visitas)" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Pico de 1.420 visitas no dia 09, logo após o disparo da newsletter.</CardFooter>
    </Card>
  )
}
