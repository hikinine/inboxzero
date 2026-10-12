'use client'

import { Clock, Wrench } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'

// Engrenagem com dentes quadrados: pontos alternam raio externo/interno a cada quarto de dente.
function gearPath(cx: number, cy: number, outer: number, inner: number, teeth: number): string {
  const steps = teeth * 4
  const pts: string[] = []
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2
    const phase = i % 4
    const r = phase === 0 || phase === 1 ? outer : inner
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)} ${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return `M${pts.join(' L')} Z`
}

const GEARS = [
  { cx: 120, cy: 130, outer: 74, inner: 58, teeth: 12, duration: 16, dir: 1, fill: 'fill-primary/15', stroke: 'stroke-primary', hole: 22 },
  { cx: 226, cy: 72, outer: 46, inner: 34, teeth: 8, duration: 10.7, dir: -1, fill: 'fill-muted', stroke: 'stroke-muted-foreground', hole: 14 },
  { cx: 232, cy: 196, outer: 34, inner: 24, teeth: 6, duration: 8, dir: -1, fill: 'fill-sky-500/15', stroke: 'stroke-sky-500', hole: 10 },
] as const

export default function PaginaEmManutencao() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="outline" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-500" /> Manutenção programada
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Voltamos já já</h1>
          <p className="mt-3 max-w-md text-muted-foreground">Estamos migrando o banco de dados para servidores mais rápidos. Nenhum dado será perdido e as automações continuam rodando.</p>

          <div className="mt-6 flex items-center gap-3 rounded-lg border bg-card p-3 text-sm">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Clock className="size-4 text-muted-foreground" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Previsão de retorno</div>
              <div className="font-medium">Hoje, 23:30 (horário de Brasília)</div>
            </div>
          </div>

          <Progress value={68} className="mt-5 max-w-md">
            <ProgressLabel>Andamento</ProgressLabel>
            <ProgressValue />
          </Progress>

          <form className="mt-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="man-email" className="mb-1.5">
              Avise-me quando voltar
            </Label>
            <div className="flex gap-2">
              <Input id="man-email" type="email" placeholder="voce@empresa.com" />
              <Button type="submit">Avisar</Button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center rounded-2xl border bg-muted/40 p-8">
          <svg viewBox="0 0 300 260" className="h-auto w-full max-w-xs" role="img" aria-label="Engrenagens girando">
            {GEARS.map((g) => (
              <motion.g
                key={g.cx}
                animate={{ rotate: 360 * g.dir }}
                transition={{ duration: g.duration, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${g.cx}px ${g.cy}px` }}
              >
                <path d={gearPath(g.cx, g.cy, g.outer, g.inner, g.teeth)} className={`${g.fill} ${g.stroke}`} strokeWidth={2} strokeLinejoin="round" />
                <circle cx={g.cx} cy={g.cy} r={g.hole} className={`fill-background ${g.stroke}`} strokeWidth={2} />
              </motion.g>
            ))}
            <g transform="translate(108 118)">
              <Wrench className="size-6 text-primary" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
