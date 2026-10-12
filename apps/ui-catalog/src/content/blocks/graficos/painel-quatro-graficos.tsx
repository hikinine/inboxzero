'use client'

import { ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const RECEITA = Array.from({ length: 14 }, (_, i) => ({ dia: `${i + 1}`, receita: Math.round(18 + Math.sin(i / 2.2) * 5 + i * 1.1), meta: 24 }))
const RECEITA_CFG = {
  receita: { label: 'Receita (R$ mil)', color: 'var(--chart-1)' },
  meta: { label: 'Meta', color: 'var(--chart-3)' },
} satisfies ChartConfig

const PEDIDOS = [
  { dia: 'seg', pedidos: 86 },
  { dia: 'ter', pedidos: 102 },
  { dia: 'qua', pedidos: 94 },
  { dia: 'qui', pedidos: 121 },
  { dia: 'sex', pedidos: 138 },
  { dia: 'sáb', pedidos: 74 },
  { dia: 'dom', pedidos: 52 },
]
const PEDIDOS_CFG = { pedidos: { label: 'Pedidos', color: 'var(--chart-2)' } } satisfies ChartConfig

const ORIGEM = [
  { origem: 'organico', valor: 38, fill: 'var(--color-organico)' },
  { origem: 'pago', valor: 27, fill: 'var(--color-pago)' },
  { origem: 'indicacao', valor: 21, fill: 'var(--color-indicacao)' },
  { origem: 'social', valor: 14, fill: 'var(--color-social)' },
]
const ORIGEM_CFG = {
  valor: { label: 'Leads' },
  organico: { label: 'Orgânico', color: 'var(--chart-1)' },
  pago: { label: 'Pago', color: 'var(--chart-2)' },
  indicacao: { label: 'Indicação', color: 'var(--chart-4)' },
  social: { label: 'Social', color: 'var(--chart-5)' },
} satisfies ChartConfig
const TOTAL_LEADS = 1284

const EQUIPE = [
  { criterio: 'Velocidade', atual: 82, anterior: 70 },
  { criterio: 'Qualidade', atual: 88, anterior: 84 },
  { criterio: 'Follow-up', atual: 64, anterior: 58 },
  { criterio: 'Fechamento', atual: 76, anterior: 69 },
  { criterio: 'Retenção', atual: 91, anterior: 87 },
  { criterio: 'NPS', atual: 72, anterior: 75 },
]
const EQUIPE_CFG = {
  atual: { label: 'Este mês', color: 'var(--chart-1)' },
  anterior: { label: 'Mês passado', color: 'var(--chart-4)' },
} satisfies ChartConfig

export default function PainelQuatroGraficos() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Painel comercial</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Outubro em quatro gráficos</h2>
          </div>
          <Badge variant="outline">1 – 14 de outubro</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Receita diária</CardTitle>
              <CardDescription>Em R$ mil, contra a meta de 24 mil por dia</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={RECEITA_CFG} className="h-[200px] w-full">
                <AreaChart data={RECEITA} margin={{ left: 4, right: 4 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area dataKey="meta" type="monotone" stroke="var(--color-meta)" strokeDasharray="4 4" fill="transparent" />
                  <Area dataKey="receita" type="natural" stroke="var(--color-receita)" strokeWidth={2} fill="var(--color-receita)" fillOpacity={0.2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="gap-1">
                <ArrowUpRight className="size-3" /> +11%
              </Badge>
              Acima da meta em 9 dos 14 dias.
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pedidos por dia da semana</CardTitle>
              <CardDescription>Média das últimas 4 semanas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={PEDIDOS_CFG} className="h-[200px] w-full">
                <BarChart data={PEDIDOS} margin={{ left: 4, right: 4 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={6} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Sexta concentra 21% dos pedidos: bom dia para promoções relâmpago.</CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Origem dos leads</CardTitle>
              <CardDescription>Participação por canal de aquisição</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ORIGEM_CFG} className="mx-auto aspect-square h-[200px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="origem" hideLabel />} />
                  <Pie data={ORIGEM} dataKey="valor" nameKey="origem" innerRadius={52} outerRadius={78} strokeWidth={4} paddingAngle={2} cornerRadius={4}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-semibold">
                                {TOTAL_LEADS.toLocaleString('pt-BR')}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 18} className="fill-muted-foreground text-xs">
                                leads
                              </tspan>
                            </text>
                          )
                        }
                        return null
                      }}
                    />
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="origem" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Orgânico cresceu 6 pontos depois do novo blog.</CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho da equipe</CardTitle>
              <CardDescription>Nota de 0 a 100 por critério</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={EQUIPE_CFG} className="mx-auto aspect-square h-[200px]">
                <RadarChart data={EQUIPE}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <PolarAngleAxis dataKey="criterio" tick={{ fontSize: 11 }} />
                  <PolarGrid />
                  <Radar dataKey="anterior" fill="var(--color-anterior)" fillOpacity={0.15} stroke="var(--color-anterior)" strokeDasharray="4 4" />
                  <Radar dataKey="atual" fill="var(--color-atual)" fillOpacity={0.45} stroke="var(--color-atual)" strokeWidth={2} />
                  <ChartLegend content={<ChartLegendContent />} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Follow-up segue como o ponto mais fraco; NPS caiu 3 pontos.</CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
