'use client'

import { useState } from 'react'
import { Check, Coffee, Flame, Footprints, Headphones, Heart, Laptop, ShoppingCart, Smartphone, Star, Truck, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  price: number
  old?: number
  installments: number
  rating: number
  reviews: number
  lowStock?: boolean
  freeShipping: boolean
  gradient: string
  Icon: LucideIcon
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Notebook Vega 14" OLED', description: 'Tela OLED 2.8K, 16 GB de RAM, SSD de 1 TB e 18 horas de bateria para trabalhar o dia inteiro longe da tomada.', price: 5499, old: 6899, installments: 12, rating: 4.8, reviews: 96, freeShipping: true, gradient: 'from-slate-500 to-slate-800', Icon: Laptop },
  { id: 'p2', name: 'Fone Nimbus ANC Pro', description: 'Cancelamento de ruído adaptativo, 40 horas de bateria e modo transparência com um toque.', price: 399.9, old: 499.9, installments: 10, rating: 4.7, reviews: 212, freeShipping: true, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'p3', name: 'Smartphone Orbit S', description: '256 GB, câmera de 50 MP com estabilização e carregamento rápido de 65 W.', price: 2799, old: 3299, installments: 12, rating: 4.6, reviews: 418, lowStock: true, freeShipping: true, gradient: 'from-sky-400 to-indigo-700', Icon: Smartphone },
  { id: 'p4', name: 'Cafeteira Kaffa Espresso', description: 'Bomba de 20 bar, aquecimento em 25 segundos e vaporizador de leite em inox.', price: 1290, old: 1590, installments: 10, rating: 4.9, reviews: 148, freeShipping: false, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'p5', name: 'Tênis Aero Run Max 2', description: 'Entressola com retorno de energia e cabedal em malha respirável para treinos longos.', price: 549.9, old: 699.9, installments: 6, rating: 4.8, reviews: 312, lowStock: true, freeShipping: true, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ListaDeProdutosEmLinhas() {
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [favs, setFavs] = useState<Set<string>>(new Set())
  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="outline">
              <Flame data-icon="inline-start" className="text-orange-500" /> Ofertas do dia
            </Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Até 40% off só hoje</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Cinco produtos com o menor preço dos últimos 30 dias. Enquanto durar o estoque.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Termina em <span className="font-medium text-foreground tabular-nums">05:42:18</span>
          </p>
        </div>

        <div className="mt-8 divide-y rounded-xl border bg-card">
          {PRODUCTS.map((p) => {
            const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0
            const inCart = cart.has(p.id)
            const fav = favs.has(p.id)
            return (
              <article key={p.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
                <div className={cn('relative flex size-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:size-32', p.gradient)}>
                  <p.Icon className="size-12 text-white/90" strokeWidth={1.25} />
                  {off > 0 && <Badge className="absolute left-2 top-2">-{off}%</Badge>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.freeShipping && (
                      <Badge variant="secondary">
                        <Truck data-icon="inline-start" /> Frete grátis
                      </Badge>
                    )}
                    {p.lowStock && <Badge variant="destructive">Últimas unidades</Badge>}
                  </div>
                  <h3 className="mt-2 font-medium">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')} · {p.reviews} avaliações
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    {p.old && <div className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</div>}
                    <div className="text-xl font-semibold tabular-nums">{brl(p.price)}</div>
                    <div className="text-xs text-muted-foreground">{p.installments}x de {brl(p.price / p.installments)} sem juros</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" aria-label={fav ? 'Remover dos favoritos' : 'Favoritar'} aria-pressed={fav} onClick={() => setFavs((s) => toggle(s, p.id))}>
                      <Heart className={cn(fav && 'fill-rose-500 text-rose-500')} />
                    </Button>
                    <Button variant={inCart ? 'secondary' : 'default'} onClick={() => setCart((s) => toggle(s, p.id))} aria-pressed={inCart}>
                      {inCart ? <Check data-icon="inline-start" /> : <ShoppingCart data-icon="inline-start" />}
                      {inCart ? 'No carrinho' : 'Comprar'}
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
