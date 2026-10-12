'use client'

import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { categoria: 'eletronicos', vendas: 128, fill: 'var(--color-eletronicos)' },
  { categoria: 'moda', vendas: 86, fill: 'var(--color-moda)' },
  { categoria: 'casa', vendas: 52, fill: 'var(--color-casa)' },
  { categoria: 'beleza', vendas: 31, fill: 'var(--color-beleza)' },
  { categoria: 'esporte', vendas: 15, fill: 'var(--color-esporte)' },
]
const CONFIG = {
  vendas: { label: 'Vendas' },
  eletronicos: { label: 'Eletrônicos', color: 'var(--chart-1)' },
  moda: { label: 'Moda', color: 'var(--chart-2)' },
  casa: { label: 'Casa', color: 'var(--chart-3)' },
  beleza: { label: 'Beleza', color: 'var(--chart-4)' },
  esporte: { label: 'Esporte', color: 'var(--chart-5)' },
} satisfies ChartConfig
type Categoria = Exclude<keyof typeof CONFIG, 'vendas'>
const TOTAL = DATA.reduce((acc, d) => acc + d.vendas, 0)

export default function GraficoRoscaLegenda() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle>Vendas por categoria</CardTitle>
            <CardDescription>Outubro de 2026 · em R$ mil</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="categoria" hideLabel />} />
                <Pie data={DATA} dataKey="vendas" nameKey="categoria" innerRadius={64} outerRadius={96} strokeWidth={4} paddingAngle={2} cornerRadius={4}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                              R$ {TOTAL}k
                            </tspan>
                            <tspan x={viewBox.cx} y={viewBox.cy + 22} className="fill-muted-foreground text-xs">
                              este mês
                            </tspan>
                          </text>
                        )
                      }
                      return null
                    }}
                  />
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="categoria" />} className="flex-wrap gap-x-4 gap-y-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhamento</CardTitle>
            <CardDescription>Participação de cada categoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {DATA.map((d) => {
              const cat = d.categoria as Categoria
              const share = (d.vendas / TOTAL) * 100
              return (
                <div key={d.categoria}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-[3px]" style={{ background: CONFIG[cat].color }} />
                      {CONFIG[cat].label}
                    </span>
                    <span className="tabular-nums">
                      R$ {d.vendas}k <span className="text-muted-foreground">· {share.toFixed(0)}%</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${share}%`, background: CONFIG[cat].color }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Eletrônicos e moda somam 69% do faturamento do mês.</CardFooter>
        </Card>
      </div>
    </section>
  )
}
