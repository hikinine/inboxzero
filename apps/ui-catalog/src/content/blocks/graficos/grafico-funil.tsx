'use client'

import { ArrowRight, TriangleAlert } from 'lucide-react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const DATA = [
  { etapa: 'visitantes', valor: 24800, rotulo: '24.800', fill: 'var(--color-visitantes)' },
  { etapa: 'cadastros', valor: 6120, rotulo: '6.120', fill: 'var(--color-cadastros)' },
  { etapa: 'ativados', valor: 2890, rotulo: '2.890', fill: 'var(--color-ativados)' },
  { etapa: 'trial', valor: 1240, rotulo: '1.240', fill: 'var(--color-trial)' },
  { etapa: 'assinantes', valor: 418, rotulo: '418', fill: 'var(--color-assinantes)' },
]
const LABELS: Record<string, string> = {
  visitantes: 'Visitantes',
  cadastros: 'Cadastros',
  ativados: 'Ativados',
  trial: 'Trial iniciado',
  assinantes: 'Assinantes',
}
const CONFIG = {
  valor: { label: 'Pessoas' },
  visitantes: { label: 'Visitantes', color: 'var(--chart-1)' },
  cadastros: { label: 'Cadastros', color: 'var(--chart-2)' },
  ativados: { label: 'Ativados', color: 'var(--chart-3)' },
  trial: { label: 'Trial iniciado', color: 'var(--chart-4)' },
  assinantes: { label: 'Assinantes', color: 'var(--chart-5)' },
} satisfies ChartConfig
const BENCHMARK = [25, 50, 45, 35]

const PASSOS = DATA.slice(1).map((d, i) => ({
  de: LABELS[DATA[i].etapa],
  para: LABELS[d.etapa],
  pct: Math.round((d.valor / DATA[i].valor) * 1000) / 10,
  benchmark: BENCHMARK[i],
}))
const PIOR = PASSOS.reduce((idx, p, i) => (p.pct - p.benchmark < PASSOS[idx].pct - PASSOS[idx].benchmark ? i : idx), 0)
const TOTAL = Math.round((DATA[DATA.length - 1].valor / DATA[0].valor) * 1000) / 10

export default function GraficoFunil() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Funil de ativação</CardTitle>
            <CardDescription>Do primeiro acesso à assinatura · últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG} className="h-[280px] w-full">
              <BarChart data={DATA} layout="vertical" margin={{ left: 8, right: 56 }}>
                <YAxis dataKey="etapa" type="category" tickLine={false} axisLine={false} tickMargin={8} width={104} tickFormatter={(v: string) => LABELS[v] ?? v} />
                <XAxis type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="etapa" hideLabel />} />
                <Bar dataKey="valor" radius={6} barSize={30}>
                  <LabelList dataKey="rotulo" position="right" offset={8} className="fill-foreground text-xs font-medium" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Cada barra é o total que chegou à etapa.</span>
            <span>
              Conversão total <span className="font-semibold text-foreground tabular-nums">{TOTAL.toLocaleString('pt-BR')}%</span>
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversão entre etapas</CardTitle>
            <CardDescription>Comparada ao benchmark de SaaS B2B</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {PASSOS.map((p, i) => {
              const abaixo = p.pct < p.benchmark
              return (
                <div key={p.para} className={cn('rounded-lg border p-3', i === PIOR && 'border-rose-500/40 bg-rose-500/5')}>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {p.de} <ArrowRight className="size-3" /> {p.para}
                    {i === PIOR && (
                      <Badge variant="destructive" className="ml-auto gap-1">
                        <TriangleAlert className="size-3" /> maior gargalo
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-end justify-between">
                    <span className={cn('text-xl font-semibold tabular-nums', abaixo ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400')}>{p.pct.toLocaleString('pt-BR')}%</span>
                    <span className="text-xs text-muted-foreground tabular-nums">benchmark {p.benchmark}%</span>
                  </div>
                  <div className="relative mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className={cn('h-full rounded-full', abaixo ? 'bg-rose-500' : 'bg-emerald-500')} style={{ width: `${Math.min(100, p.pct)}%` }} />
                    <span className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded bg-foreground/60" style={{ left: `${p.benchmark}%` }} title={`Benchmark ${p.benchmark}%`} />
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Subir a etapa {PASSOS[PIOR].para.toLowerCase()} ao benchmark traria ~{Math.round((DATA[PIOR].valor * PASSOS[PIOR].benchmark) / 100 - DATA[PIOR + 1].valor).toLocaleString('pt-BR')} pessoas a mais por mês.
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
