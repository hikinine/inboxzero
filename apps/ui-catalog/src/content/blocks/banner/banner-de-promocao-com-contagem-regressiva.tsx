'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const INITIAL_SECONDS = 5 * 3600 + 23 * 60 + 11

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function BannerDePromocaoComContagemRegressiva() {
  const [remaining, setRemaining] = useState(INITIAL_SECONDS)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [visible])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const parts = [
    { value: pad(h), label: 'horas' },
    { value: pad(m), label: 'min' },
    { value: pad(s), label: 'seg' },
  ]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-background">
        {visible ? (
          <div className="relative overflow-hidden bg-zinc-950 text-white">
            <div className="pointer-events-none absolute -top-24 left-1/4 size-64 rounded-full bg-amber-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 size-64 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3 pr-8 lg:pr-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-zinc-950">
                  <Tag className="size-4" />
                </span>
                <div className="text-sm">
                  <div className="font-semibold">Black Friday antecipada</div>
                  <div className="text-zinc-300">Até 40% off no plano anual, só hoje.</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5" role="timer" aria-label="Tempo restante da promoção">
                {parts.map((p, i) => (
                  <div key={p.label} className="flex items-center gap-1.5">
                    <div className="flex min-w-14 flex-col items-center rounded-lg bg-white/10 px-2 py-1.5">
                      <span className="text-xl font-semibold tabular-nums">{p.value}</span>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400">{p.label}</span>
                    </div>
                    {i < parts.length - 1 && <span className="text-lg font-semibold text-zinc-500">:</span>}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
                  Garantir desconto <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
            <button type="button" aria-label="Fechar promoção" onClick={() => setVisible(false)} className="absolute top-3 right-3 rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center border-b bg-muted/40 py-2 text-xs text-muted-foreground">
            Banner fechado.
            <button type="button" className="ml-1 underline underline-offset-4 hover:text-foreground" onClick={() => setVisible(true)}>
              Mostrar de novo
            </button>
          </div>
        )}

        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-6 rounded-md bg-primary" /> Acme
          </div>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <span>Produto</span>
            <span>Preços</span>
            <span>Clientes</span>
            <span>Blog</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm">Começar grátis</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
