'use client'

import { useEffect, useState } from 'react'
import { Check, Coffee, Flame, Footprints, Headphones, ShoppingCart, Watch, Zap, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Deal {
  id: string
  name: string
  price: number
  old: number
  total: number
  sold: number
  gradient: string
  Icon: LucideIcon
}

const DEALS: Deal[] = [
  { id: 'd1', name: 'Fone Nimbus ANC Pro', price: 599.9, old: 899.9, total: 50, sold: 43, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'd2', name: 'Tênis Aero Run Max 2', price: 399.9, old: 699.9, total: 80, sold: 52, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
  { id: 'd3', name: 'Cafeteira Kaffa Espresso', price: 990, old: 1290, total: 30, sold: 11, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'd4', name: 'Relógio Pulse Fit', price: 449.9, old: 799.9, total: 40, sold: 40, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
]
const START_SECONDS = 3 * 3600 + 42 * 60 + 15

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const pad = (n: number) => String(n).padStart(2, '0')

export default function OfertaRelampagoComEstoque() {
  const [left, setLeft] = useState(START_SECONDS)
  const [sold, setSold] = useState<Record<string, number>>(() => Object.fromEntries(DEALS.map((d) => [d.id, d.sold])))
  const [justBought, setJustBought] = useState<string | null>(null)

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!justBought) return
    const t = setTimeout(() => setJustBought(null), 1400)
    return () => clearTimeout(t)
  }, [justBought])

  const buy = (d: Deal) => {
    setSold((s) => ({ ...s, [d.id]: Math.min(d.total, (s[d.id] ?? 0) + 1) }))
    setJustBought(d.id)
  }

  const parts: Array<[string, number]> = [
    ['Horas', Math.floor(left / 3600)],
    ['Min', Math.floor((left % 3600) / 60)],
    ['Seg', left % 60],
  ]
  const totalLeft = DEALS.reduce((s, d) => s + (d.total - (sold[d.id] ?? 0)), 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 p-6 text-white sm:p-8">
          <div className="absolute -right-10 -top-16 size-56 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Zap className="size-6 fill-white" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider opacity-90">Oferta relâmpago</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Até 50% off enquanto durar o estoque</h2>
                <p className="mt-1 text-sm opacity-90">
                  Preços exclusivos de hoje · <span className="font-medium tabular-nums">{totalLeft}</span> unidades restantes no total
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm opacity-90">Termina em</span>
              <div className="flex items-center gap-1.5" aria-live="polite" aria-label={`Termina em ${parts.map(([l, v]) => `${v} ${l.toLowerCase()}`).join(', ')}`}>
                {parts.map(([label, value], i) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="flex min-w-14 flex-col items-center rounded-lg bg-white/15 px-2 py-1.5 backdrop-blur">
                      <span className="text-2xl font-semibold tabular-nums">{pad(value)}</span>
                      <span className="text-[10px] uppercase tracking-wide opacity-80">{label}</span>
                    </div>
                    {i < parts.length - 1 && <span className="text-xl font-semibold opacity-70">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEALS.map((d) => {
            const s = sold[d.id] ?? 0
            const remaining = d.total - s
            const pct = Math.round((s / d.total) * 100)
            const out = remaining <= 0
            const low = !out && remaining <= 5
            const off = Math.round((1 - d.price / d.old) * 100)
            return (
              <article key={d.id} className={cn('flex flex-col rounded-xl border bg-card p-3', out && 'opacity-75')}>
                <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', d.gradient)}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <d.Icon className={cn('size-16 text-white/90', out && 'opacity-50')} strokeWidth={1.2} />
                  </div>
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white">-{off}%</span>
                  {low && (
                    <Badge variant="secondary" className="absolute right-2.5 top-2.5 text-rose-600">
                      <Flame data-icon="inline-start" /> Últimas {remaining}
                    </Badge>
                  )}
                  {out && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <span className="rotate-[-8deg] rounded-md border-2 border-white px-3 py-1 text-sm font-bold uppercase tracking-wider text-white">Esgotado</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 truncate text-sm font-medium">{d.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-semibold tabular-nums">{brl(d.price)}</span>
                  <span className="text-xs text-muted-foreground line-through tabular-nums">{brl(d.old)}</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn('font-medium', out ? 'text-muted-foreground' : low ? 'text-rose-600' : 'text-foreground')}>{out ? 'Acabou' : `Restam ${remaining} de ${d.total}`}</span>
                    <span className="text-muted-foreground tabular-nums">{pct}% vendido</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${pct}% do estoque vendido`}>
                    <div className={cn('h-full rounded-full transition-[width] duration-500', pct >= 85 ? 'bg-rose-500' : pct >= 60 ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <Button className="mt-4 w-full" size="sm" disabled={out} variant={justBought === d.id ? 'secondary' : 'default'} onClick={() => buy(d)} aria-live="polite">
                  {out ? 'Avise-me quando voltar' : justBought === d.id ? <><Check data-icon="inline-start" /> No carrinho</> : <><ShoppingCart data-icon="inline-start" /> Comprar agora</>}
                </Button>
              </article>
            )
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Limite de 2 unidades por cliente · preços válidos até o fim da contagem ou do estoque, o que vier primeiro.</p>
      </div>
    </section>
  )
}
