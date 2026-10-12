'use client'

import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DIST = [
  { estrelas: 5, qtd: 812 },
  { estrelas: 4, qtd: 294 },
  { estrelas: 3, qtd: 98 },
  { estrelas: 2, qtd: 41 },
  { estrelas: 1, qtd: 39 },
]
const TOTAL = DIST.reduce((a, d) => a + d.qtd, 0)
const MEDIA = DIST.reduce((a, d) => a + d.estrelas * d.qtd, 0) / TOTAL
const MAIOR = Math.max(...DIST.map((d) => d.qtd))
const OPACIDADE = ['opacity-100', 'opacity-70', 'opacity-45', 'opacity-25', 'opacity-15']
const fmt = (n: number) => n.toLocaleString('pt-BR')
const media = MEDIA.toFixed(1).replace('.', ',')

function Estrelas({ valor, size = 'size-4' }: { valor: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${valor.toFixed(1).replace('.', ',')} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, valor - (i - 1)))
        return (
          <span key={i} className={`relative inline-block ${size}`} aria-hidden>
            <Star className={`absolute inset-0 ${size} text-muted-foreground/30`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.round(fill * 100)}%` }}>
              <Star className={`${size} fill-amber-400 text-amber-400`} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export default function RatingDistribuicao() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Card completo</p>
        <div className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center justify-center gap-1 sm:min-w-32">
            <span className="text-5xl font-semibold tabular-nums tracking-tight">{media}</span>
            <Estrelas valor={MEDIA} />
            <span className="text-xs text-muted-foreground">{fmt(TOTAL)} avaliações</span>
          </div>
          <div className="space-y-2">
            {DIST.map((d) => {
              const pct = Math.round((d.qtd / TOTAL) * 100)
              return (
                <div key={d.estrelas} className="flex items-center gap-3 text-xs">
                  <span className="flex w-5 items-center gap-0.5 tabular-nums">
                    {d.estrelas}
                    <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-amber-400" style={{ width: `${(d.qtd / MAIOR) * 100}%` }} />
                  </span>
                  <span className="w-8 text-right tabular-nums text-muted-foreground">{pct}%</span>
                </div>
              )
            })}
            <div className="pt-2">
              <Button variant="outline" size="sm">
                Escrever avaliação
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Compacto</p>
        <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tabular-nums">{media}</span>
            <span className="text-xs text-muted-foreground">/ 5</span>
          </div>
          <Estrelas valor={MEDIA} size="size-3.5" />
          <span className="flex h-2 flex-1 overflow-hidden rounded-full" aria-hidden>
            {DIST.map((d, i) => (
              <span key={d.estrelas} className={`block h-full bg-amber-400 ${OPACIDADE[i]}`} style={{ width: `${(d.qtd / TOTAL) * 100}%` }} />
            ))}
          </span>
          <span className="text-xs text-muted-foreground">{fmt(TOTAL)}</span>
        </div>
      </div>
    </div>
  )
}
