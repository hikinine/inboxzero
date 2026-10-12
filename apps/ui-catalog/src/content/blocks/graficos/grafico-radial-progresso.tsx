'use client'

import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const CONFIG = {
  valor: { label: 'Progresso' },
  receita: { label: 'Receita', color: 'var(--chart-1)' },
  clientes: { label: 'Novos clientes', color: 'var(--chart-2)' },
  nps: { label: 'NPS', color: 'var(--chart-4)' },
} satisfies ChartConfig
type Meta = Exclude<keyof typeof CONFIG, 'valor'>

const DETAILS: { key: Meta; current: string; target: string; pct: number }[] = [
  { key: 'receita', current: 'R$ 184 mil', target: 'R$ 250 mil', pct: 74 },
  { key: 'clientes', current: '48', target: '60', pct: 80 },
  { key: 'nps', current: '72', target: '80', pct: 90 },
]
const DATA = [...DETAILS].reverse().map((d) => ({ meta: d.key, valor: d.pct, fill: `var(--color-${d.key})` }))
const MEDIA = Math.round(DETAILS.reduce((acc, d) => acc + d.pct, 0) / DETAILS.length)

export default function GraficoRadialProgresso() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle>Metas do trimestre</CardTitle>
            <CardDescription>Progresso de cada meta até 12 de outubro</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="mx-auto aspect-square max-h-[300px]">
              <RadialBarChart data={DATA} startAngle={90} endAngle={-270} innerRadius={46} outerRadius={124}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="meta" hideLabel />} />
                <RadialBar dataKey="valor" background cornerRadius={8} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy - 4} className="fill-foreground text-2xl font-semibold">
                              {MEDIA}%
                            </tspan>
                            <tspan x={viewBox.cx} y={viewBox.cy + 16} className="fill-muted-foreground text-xs">
                              média
                            </tspan>
                          </text>
                        )
                      }
                      return null
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-center gap-4 text-xs text-muted-foreground">
            {DETAILS.map((d) => (
              <span key={d.key} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: CONFIG[d.key].color }} />
                {CONFIG[d.key].label}
              </span>
            ))}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhamento</CardTitle>
            <CardDescription>Atingido vs. alvo de cada meta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {DETAILS.map((d) => (
              <div key={d.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{CONFIG[d.key].label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {d.current} <span className="text-xs">/ {d.target}</span>
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: CONFIG[d.key].color }} />
                  </div>
                  <span className="w-9 text-right text-xs font-medium tabular-nums">{d.pct}%</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Faltam 80 dias para o fim do trimestre. Receita é a meta mais distante.</CardFooter>
        </Card>
      </div>
    </section>
  )
}
