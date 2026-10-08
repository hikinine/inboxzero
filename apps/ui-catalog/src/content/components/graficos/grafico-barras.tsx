'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DATA = [
  { canal: 'WhatsApp', leads: 420, vendas: 96 },
  { canal: 'Instagram', leads: 310, vendas: 54 },
  { canal: 'E-mail', leads: 190, vendas: 41 },
  { canal: 'Site', leads: 260, vendas: 38 },
  { canal: 'Indicação', leads: 104, vendas: 47 },
]

const CONFIG = {
  leads: { label: 'Leads', color: 'var(--chart-2)' },
  vendas: { label: 'Vendas', color: 'var(--chart-1)' },
} satisfies ChartConfig

export default function GraficoBarras() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Leads e vendas por canal</CardTitle>
        <CardDescription>Outubro de 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-[220px] w-full">
          <BarChart data={DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="canal" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="leads" fill="var(--color-leads)" radius={4} />
            <Bar dataKey="vendas" fill="var(--color-vendas)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
