'use client'

import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { mes: 'Mai', starter: 42, pro: 68, business: 12 },
  { mes: 'Jun', starter: 48, pro: 74, business: 15 },
  { mes: 'Jul', starter: 45, pro: 81, business: 18 },
  { mes: 'Ago', starter: 52, pro: 90, business: 21 },
  { mes: 'Set', starter: 49, pro: 97, business: 26 },
  { mes: 'Out', starter: 55, pro: 108, business: 31 },
]
const KEYS = ['starter', 'pro', 'business'] as const
type Key = (typeof KEYS)[number]
const CONFIG = {
  starter: { label: 'Starter', color: 'var(--chart-1)' },
  pro: { label: 'Pro', color: 'var(--chart-2)' },
  business: { label: 'Business', color: 'var(--chart-3)' },
} satisfies ChartConfig
type Modo = 'valores' | 'percentual'

export default function GraficoBarrasEmpilhadas() {
  const [modo, setModo] = useState<Modo>('valores')
  const data = useMemo(() => {
    if (modo === 'valores') return DATA
    return DATA.map((d) => {
      const total = d.starter + d.pro + d.business
      return { mes: d.mes, starter: Math.round((d.starter / total) * 100), pro: Math.round((d.pro / total) * 100), business: Math.round((d.business / total) * 100) }
    })
  }, [modo])
  const totais: { k: Key; total: number }[] = KEYS.map((k) => ({ k, total: DATA.reduce((s, d) => s + d[k], 0) }))
  const geral = totais.reduce((s, t) => s + t.total, 0)

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Assinaturas novas por plano</CardTitle>
        <CardDescription>Maio a outubro de 2026 · {geral} no total</CardDescription>
        <CardAction>
          <ButtonGroup>
            <Button size="xs" variant={modo === 'valores' ? 'secondary' : 'outline'} aria-pressed={modo === 'valores'} onClick={() => setModo('valores')}>
              Valores
            </Button>
            <Button size="xs" variant={modo === 'percentual' ? 'secondary' : 'outline'} aria-pressed={modo === 'percentual'} onClick={() => setModo('percentual')}>
              100%
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-[240px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={34} tickFormatter={(v: number) => (modo === 'percentual' ? `${v}%` : String(v))} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="starter" stackId="a" fill="var(--color-starter)" />
            <Bar dataKey="pro" stackId="a" fill="var(--color-pro)" />
            <Bar dataKey="business" stackId="a" fill="var(--color-business)" radius={[4, 4, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-3 text-xs">
        {totais.map(({ k, total }) => (
          <div key={k}>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2 rounded-[3px]" style={{ background: CONFIG[k].color }} />
              {CONFIG[k].label}
            </div>
            <div className="mt-0.5 text-base font-semibold tabular-nums">
              {total} <span className="text-xs font-normal text-muted-foreground">· {Math.round((total / geral) * 100)}%</span>
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
