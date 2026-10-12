'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { criterio: 'Agilidade', equipe: 86, meta: 90 },
  { criterio: 'Cordialidade', equipe: 94, meta: 90 },
  { criterio: 'Resolução', equipe: 78, meta: 85 },
  { criterio: 'Clareza', equipe: 88, meta: 85 },
  { criterio: 'Follow-up', equipe: 64, meta: 80 },
  { criterio: 'Conhecimento', equipe: 82, meta: 85 },
]
const CONFIG = {
  equipe: { label: 'Equipe', color: 'var(--chart-1)' },
  meta: { label: 'Meta', color: 'var(--chart-3)' },
} satisfies ChartConfig
const MEDIA = Math.round(DATA.reduce((acc, d) => acc + d.equipe, 0) / DATA.length)

export default function GraficoRadar() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle>Avaliação do atendimento</CardTitle>
            <CardDescription>Nota média dos clientes por critério · outubro</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="mx-auto aspect-square max-h-[320px]">
              <RadarChart data={DATA}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <PolarAngleAxis dataKey="criterio" />
                <PolarGrid />
                <Radar dataKey="meta" fill="var(--color-meta)" fillOpacity={0.15} stroke="var(--color-meta)" strokeDasharray="4 4" />
                <Radar dataKey="equipe" fill="var(--color-equipe)" fillOpacity={0.5} stroke="var(--color-equipe)" strokeWidth={2} />
                <ChartLegend content={<ChartLegendContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Por critério
              <Badge variant="secondary">Média {MEDIA}</Badge>
            </CardTitle>
            <CardDescription>Equipe vs. meta definida para o trimestre</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {DATA.map((d) => {
              const ok = d.equipe >= d.meta
              return (
                <div key={d.criterio}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{d.criterio}</span>
                    <span className="tabular-nums">
                      <span className={ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{d.equipe}</span>
                      <span className="text-muted-foreground"> / {d.meta}</span>
                    </span>
                  </div>
                  <div className="relative mt-1.5 h-1.5 w-full rounded-full bg-muted">
                    <div className={`h-full rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${d.equipe}%` }} />
                    <span className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded bg-foreground/60" style={{ left: `${d.meta}%` }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Follow-up é o critério mais distante da meta: plano de ação em andamento.</CardFooter>
        </Card>
      </div>
    </section>
  )
}
