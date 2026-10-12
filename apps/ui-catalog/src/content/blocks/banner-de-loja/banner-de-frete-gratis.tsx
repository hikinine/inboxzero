'use client'

import { useState } from 'react'
import { Check, Copy, Sparkles, Ticket, Truck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Band = 'frete' | 'cupom' | 'lancamento'
const CODE = 'PRIMEIRA10'

export default function BannerDeFreteGratis() {
  const [hidden, setHidden] = useState<Set<Band>>(new Set())
  const [copied, setCopied] = useState(false)
  const hide = (b: Band) => setHidden((s) => new Set(s).add(b))
  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(CODE).catch(() => undefined)
    setCopied(true)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-4">
        {!hidden.has('frete') && (
          <div className="relative flex items-center justify-center gap-2 rounded-xl bg-primary px-12 py-3 text-center text-sm text-primary-foreground">
            <Truck className="size-4 shrink-0" />
            <p>
              <span className="font-medium">Frete grátis</span> para todo o Brasil em compras acima de R$ 299 ·{' '}
              <a href="#" className="underline underline-offset-4 hover:opacity-90">ver regras</a>
            </p>
            <Button variant="ghost" size="icon-sm" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" aria-label="Fechar aviso de frete grátis" onClick={() => hide('frete')}>
              <X />
            </Button>
          </div>
        )}

        {!hidden.has('cupom') && (
          <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border bg-muted/50 px-12 py-3 text-center text-sm">
            <span className="flex items-center gap-2">
              <Ticket className="size-4 shrink-0 text-muted-foreground" /> Primeira compra? Use o cupom
            </span>
            <button type="button" onClick={copy} aria-live="polite" className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-0.5 font-mono text-xs font-semibold tracking-wider hover:bg-muted">
              {CODE} {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-muted-foreground" />}
            </button>
            <span>e ganhe <span className="font-medium">10% de desconto</span></span>
            <Button variant="ghost" size="icon-sm" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Fechar aviso de cupom" onClick={() => hide('cupom')}>
              <X />
            </Button>
          </div>
        )}

        {!hidden.has('lancamento') && (
          <div className="relative flex flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 px-12 py-4 text-center text-sm text-white sm:flex-row">
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 shrink-0" />
              <span>
                <span className="font-medium">Lançamento:</span> Fone Aero Buds 2 com cancelamento de ruído adaptativo
              </span>
            </span>
            <Button size="sm" variant="secondary">Conhecer agora</Button>
            <span className="text-xs opacity-80">Pré-venda termina em 2 dias</span>
            <Button variant="ghost" size="icon-sm" className="absolute right-2 top-2 text-white hover:bg-white/15 hover:text-white sm:top-1/2 sm:-translate-y-1/2" aria-label="Fechar aviso de lançamento" onClick={() => hide('lancamento')}>
              <X />
            </Button>
          </div>
        )}

        {hidden.size > 0 && (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={() => setHidden(new Set())}>
              Mostrar faixas novamente ({hidden.size})
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
