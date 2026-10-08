'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const CARDS = [
  { label: 'Receita', value: 'R$ 48.230', delta: '+12,4%', up: true, points: [20, 28, 24, 35, 32, 44, 48] },
  { label: 'Novos leads', value: '1.284', delta: '+6,1%', up: true, points: [30, 26, 34, 38, 36, 42, 45] },
  { label: 'Churn', value: '2,1%', delta: '-0,4 pp', up: false, points: [40, 38, 36, 37, 33, 30, 28] },
]

function Spark({ points, up }: { points: number[]; up: boolean }) {
  const max = Math.max(...points)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 100} ${40 - (p / max) * 36}`).join(' ')
  return (
    <svg viewBox="0 0 100 40" className={`h-10 w-24 ${up ? 'text-emerald-500' : 'text-rose-500'}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function CardMetrica() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {CARDS.map((c) => (
        <Card key={c.label}>
          <CardHeader>
            <CardDescription>{c.label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{c.value}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <Badge variant="secondary" className="gap-1">
              {c.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {c.delta}
            </Badge>
            <Spark points={c.points} up={c.up} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
