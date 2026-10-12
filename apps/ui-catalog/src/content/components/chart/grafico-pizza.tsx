'use client'

import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

type Canal = 'organico' | 'anuncios' | 'indicacao' | 'social' | 'outros'

const CONFIG = {
  leads: { label: 'Leads' },
  organico: { label: 'Orgânico', color: 'var(--chart-1)' },
  anuncios: { label: 'Anúncios', color: 'var(--chart-2)' },
  indicacao: { label: 'Indicação', color: 'var(--chart-3)' },
  social: { label: 'Social', color: 'var(--chart-4)' },
  outros: { label: 'Outros', color: 'var(--chart-5)' },
} satisfies ChartConfig

const DATA: { canal: Canal; leads: number; fill: string }[] = [
  { canal: 'organico', leads: 1284, fill: 'var(--color-organico)' },
  { canal: 'anuncios', leads: 912, fill: 'var(--color-anuncios)' },
  { canal: 'indicacao', leads: 608, fill: 'var(--color-indicacao)' },
  { canal: 'social', leads: 372, fill: 'var(--color-social)' },
  { canal: 'outros', leads: 203, fill: 'var(--color-outros)' },
]
const TOTAL = DATA.reduce((s, d) => s + d.leads, 0)

export default function GraficoPizza() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Leads por canal</CardTitle>
        <CardDescription>Outubro de 2026 · {TOTAL.toLocaleString('pt-BR')} leads</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <ChartContainer config={CONFIG} className="mx-auto aspect-square h-[220px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="canal" hideLabel />} />
            <Pie data={DATA} dataKey="leads" nameKey="canal" innerRadius={58} outerRadius={96} strokeWidth={4} stroke="var(--card)">
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const cx = viewBox.cx ?? 0
                    const cy = viewBox.cy ?? 0
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={cx} y={cy - 4} className="fill-foreground text-2xl font-semibold">
                          {TOTAL.toLocaleString('pt-BR')}
                        </tspan>
                        <tspan x={cx} y={cy + 16} className="fill-muted-foreground text-xs">
                          leads
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <ul className="space-y-1.5 text-sm" aria-label="Legenda">
          {DATA.map((d) => (
            <li key={d.canal} className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-sm" style={{ background: CONFIG[d.canal].color }} />
              <span className="w-20 text-muted-foreground">{CONFIG[d.canal].label}</span>
              <span className="w-12 text-right tabular-nums">{d.leads.toLocaleString('pt-BR')}</span>
              <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">{Math.round((d.leads / TOTAL) * 100)}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
