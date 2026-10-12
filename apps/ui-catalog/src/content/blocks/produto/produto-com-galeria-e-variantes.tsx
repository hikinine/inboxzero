'use client'

import { useState } from 'react'
import { Footprints, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const COLORS = [
  { name: 'Preto', dot: 'bg-neutral-900', gradient: 'from-neutral-600 to-neutral-950' },
  { name: 'Azul', dot: 'bg-sky-500', gradient: 'from-sky-400 to-sky-700' },
  { name: 'Coral', dot: 'bg-rose-500', gradient: 'from-rose-400 to-rose-700' },
  { name: 'Areia', dot: 'bg-amber-300', gradient: 'from-amber-200 to-amber-500' },
] as const

const SIZES = ['37', '38', '39', '40', '41', '42', '43'] as const
const VIEWS = ['Lateral', 'Frente', 'Sola', 'Detalhe'] as const
const PRICE = 549.9
const OLD_PRICE = 699.9

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ProdutoComGaleriaEVariantes() {
  const [color, setColor] = useState(0)
  const [size, setSize] = useState('41')
  const [view, setView] = useState(0)
  const [qty, setQty] = useState(1)
  const [fav, setFav] = useState(false)
  const current = COLORS[color] ?? COLORS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Galeria */}
        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <div className={cn('relative aspect-square flex-1 overflow-hidden rounded-2xl bg-gradient-to-br transition-colors duration-500', current.gradient)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-44 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Footprints className="size-20 text-white/90" strokeWidth={1.25} />
              </div>
            </div>
            <Badge variant="secondary" className="absolute left-4 top-4">-21%</Badge>
            <Button
              variant="secondary"
              size="icon-sm"
              className="absolute right-4 top-4 rounded-full"
              aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              aria-pressed={fav}
              onClick={() => setFav((f) => !f)}
            >
              <Heart className={cn(fav && 'fill-rose-500 text-rose-500')} />
            </Button>
            <span className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
              {VIEWS[view]} · {current.name}
            </span>
          </div>
          <div className="flex gap-3 sm:flex-col">
            {VIEWS.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(i)}
                aria-label={`Ver foto: ${v}`}
                aria-pressed={view === i}
                className={cn(
                  'relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-gradient-to-br transition',
                  current.gradient,
                  view === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100',
                )}
              >
                <span className="absolute inset-x-0 bottom-1 text-center text-[10px] font-medium text-white/90">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="flex flex-col">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tênis · Corrida</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tênis Aero Run Max 2</h2>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-0.5" aria-label="Nota 4,8 de 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={cn('size-4', i < 4 ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
              ))}
            </span>
            <span className="font-medium">4,8</span>
            <a href="#" className="text-muted-foreground underline-offset-4 hover:underline">312 avaliações</a>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold tabular-nums">{brl(PRICE)}</span>
            <span className="text-lg text-muted-foreground line-through tabular-nums">{brl(OLD_PRICE)}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">ou 6x de {brl(PRICE / 6)} sem juros · 5% off no Pix</p>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Cor</span>
              <span className="text-muted-foreground">{current.name}</span>
            </div>
            <div className="mt-3 flex gap-3">
              {COLORS.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={`Cor ${c.name}`}
                  aria-pressed={color === i}
                  onClick={() => setColor(i)}
                  className={cn('size-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition', c.dot, color === i ? 'ring-primary' : 'ring-transparent hover:ring-border')}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Tamanho</span>
              <a href="#" className="text-muted-foreground underline-offset-4 hover:underline">Guia de tamanhos</a>
            </div>
            <ToggleGroup
              variant="outline"
              aria-label="Tamanho"
              className="mt-3 flex-wrap"
              value={[size]}
              onValueChange={(v) => {
                const next = v[0]
                if (typeof next === 'string') setSize(next)
              }}
            >
              {SIZES.map((s) => (
                <ToggleGroupItem key={s} value={s} aria-label={`Tamanho ${s}`} className="min-w-11 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
                  {s}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p className="mt-2 text-xs text-muted-foreground">Tamanho 43: últimas 2 unidades</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-9 items-center rounded-lg border">
              <Button variant="ghost" size="icon" aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus />
              </Button>
              <span className="w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">{qty}</span>
              <Button variant="ghost" size="icon" aria-label="Aumentar quantidade" onClick={() => setQty((q) => Math.min(10, q + 1))}>
                <Plus />
              </Button>
            </div>
            <Button size="lg" className="flex-1">
              <ShoppingBag data-icon="inline-start" /> Adicionar · {brl(PRICE * qty)}
            </Button>
            <Button size="lg" variant="outline">Comprar agora</Button>
          </div>

          <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="size-4" /> Frete grátis acima de R$ 299</li>
            <li className="flex items-center gap-2"><RotateCcw className="size-4" /> Troca grátis em 30 dias</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4" /> Compra 100% protegida</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
