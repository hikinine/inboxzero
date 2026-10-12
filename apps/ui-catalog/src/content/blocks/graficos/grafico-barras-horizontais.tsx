'use client'

import { Trophy } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { vendedor: 'Ana Souza', receita: 184, rotulo: 'R$ 184k' },
  { vendedor: 'Bruno Rocha', receita: 152, rotulo: 'R$ 152k' },
  { vendedor: 'Carla Mendes', receita: 131, rotulo: 'R$ 131k' },
  { vendedor: 'Diego Lima', receita: 98, rotulo: 'R$ 98k' },
  { vendedor: 'Eduardo Freitas', receita: 76, rotulo: 'R$ 76k' },
  { vendedor: 'Fernanda Castro', receita: 54, rotulo: 'R$ 54k' },
]
const CONFIG = { receita: { label: 'Receita (R$ mil)', color: 'var(--chart-2)' } } satisfies ChartConfig
const META = 120
const TOP = [
  { name: 'Ana Souza', initials: 'AS', value: 'R$ 184 mil', pct: 153 },
  { name: 'Bruno Rocha', initials: 'BR', value: 'R$ 152 mil', pct: 127 },
  { name: 'Carla Mendes', initials: 'CM', value: 'R$ 131 mil', pct: 109 },
]

export default function GraficoBarrasHorizontais() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Receita por vendedor</CardTitle>
            <CardDescription>Outubro de 2026 · meta individual de R$ {META} mil</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[280px] w-full">
              <BarChart data={DATA} layout="vertical" margin={{ left: 0, right: 56 }}>
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="vendedor" type="category" tickLine={false} axisLine={false} tickMargin={8} width={120} />
                <XAxis type="number" dataKey="receita" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="receita" fill="var(--color-receita)" radius={6}>
                  <LabelList dataKey="rotulo" position="right" offset={8} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">3 de 6 vendedores bateram a meta do mês.</CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-4 text-amber-500" /> Ranking do mês
            </CardTitle>
            <CardDescription>Percentual da meta atingido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {TOP.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="w-4 text-sm font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
                <Avatar>
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{t.value}</div>
                </div>
                <Badge variant={i === 0 ? 'default' : 'secondary'}>{t.pct}% da meta</Badge>
              </div>
            ))}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Total da equipe: R$ 695 mil · 97% da meta coletiva</CardFooter>
        </Card>
      </div>
    </section>
  )
}
