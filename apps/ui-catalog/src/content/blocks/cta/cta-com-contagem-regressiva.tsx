'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Contagem relativa ao momento em que o bloco é montado (2 dias, 14h, 32min e 10s).
const DURACAO_MS = ((2 * 24 + 14) * 3600 + 32 * 60 + 10) * 1000

function decompor(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return [
    { valor: Math.floor(s / 86400), rotulo: 'dias' },
    { valor: Math.floor((s % 86400) / 3600), rotulo: 'horas' },
    { valor: Math.floor((s % 3600) / 60), rotulo: 'min' },
    { valor: s % 60, rotulo: 'seg' },
  ]
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function CtaComContagemRegressiva() {
  const [restante, setRestante] = useState(DURACAO_MS)

  useEffect(() => {
    const fim = Date.now() + DURACAO_MS
    const id = window.setInterval(() => setRestante(fim - Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border bg-card lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-12">
          <Badge className="gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400">
            <Zap /> Oferta de lançamento
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">50% de desconto no primeiro ano, só até sexta.</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Assine o plano Pro antes do fim da contagem e pague R$ 74,50 por mês em vez de R$ 149. O desconto vale pelos 12 meses, sem surpresa na renovação.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Garantir o desconto <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Comparar planos
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Cupom <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">LANCA50</span> aplicado automaticamente no checkout.
          </p>
        </div>

        <div className="flex flex-col justify-center border-t bg-muted/40 p-8 sm:p-10 lg:border-t-0 lg:border-l">
          <p className="text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">A oferta termina em</p>
          <div className="mt-4 grid grid-cols-4 gap-2" role="timer" aria-live="off">
            {decompor(restante).map((u) => (
              <div key={u.rotulo} className="rounded-xl border bg-background py-3 text-center">
                <div className="text-3xl font-semibold tracking-tight tabular-nums">{pad(u.valor)}</div>
                <div className="mt-0.5 text-[11px] tracking-wider text-muted-foreground uppercase">{u.rotulo}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="size-3.5" /> 73 de 100 vagas preenchidas
              </span>
              <span className="font-medium tabular-nums">73%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-full w-[73%] rounded-full bg-amber-500" />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Restam 27 vagas com desconto</p>
        </div>
      </div>
    </section>
  )
}
