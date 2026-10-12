'use client'

import { useState } from 'react'
import { ArrowRight, Backpack, Camera, Coffee, Footprints, Headphones, Heart, Shirt, ShoppingCart, Speaker, Star, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  old?: number
  rating: number
  reviews: number
  gradient: string
  Icon: LucideIcon
  tag?: string
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tênis Aero Run Max 2', price: 549.9, old: 699.9, rating: 4.8, reviews: 312, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints, tag: 'Mais vendido' },
  { id: 'p2', name: 'Fone Nimbus ANC Pro', price: 399.9, old: 499.9, rating: 4.7, reviews: 212, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'p3', name: 'Cafeteira Kaffa Espresso', price: 1290, rating: 4.9, reviews: 148, gradient: 'from-amber-300 to-orange-600', Icon: Coffee, tag: 'Novo' },
  { id: 'p4', name: 'Mochila Urban 25L', price: 289.9, old: 349.9, rating: 4.6, reviews: 87, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'p5', name: 'Relógio Pulse Fit', price: 649.9, old: 799.9, rating: 4.7, reviews: 341, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
  { id: 'p6', name: 'Câmera Instantânea Lumi', price: 479, rating: 4.5, reviews: 64, gradient: 'from-pink-400 to-rose-600', Icon: Camera, tag: 'Novo' },
  { id: 'p7', name: 'Caixa de Som Onda 360', price: 329.9, old: 399.9, rating: 4.4, reviews: 129, gradient: 'from-teal-400 to-cyan-700', Icon: Speaker },
  { id: 'p8', name: 'Camiseta Dry Aero', price: 89.9, rating: 4.3, reviews: 540, gradient: 'from-stone-400 to-stone-700', Icon: Shirt },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ListaDeProdutosEmGrade() {
  const [favs, setFavs] = useState<Set<string>>(new Set(['p3']))
  const toggleFav = (id: string) =>
    setFavs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mais vendidos</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Os queridinhos da semana</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Os oito produtos mais pedidos nos últimos sete dias, com frete grátis acima de R$ 299.</p>
          </div>
          <Button variant="link" className="px-0">
            Ver todos <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((p) => {
            const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0
            const fav = favs.has(p.id)
            return (
              <article key={p.id} className="flex flex-col rounded-xl border bg-card p-3 transition-shadow hover:shadow-md">
                <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p.Icon className="size-14 text-white/90" strokeWidth={1.25} />
                  </div>
                  <div className="absolute left-2.5 top-2.5 flex gap-1.5">
                    {off > 0 && <Badge>-{off}%</Badge>}
                    {p.tag && <Badge variant="secondary">{p.tag}</Badge>}
                  </div>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className="absolute right-2.5 top-2.5 rounded-full"
                    aria-label={fav ? `Remover ${p.name} dos favoritos` : `Favoritar ${p.name}`}
                    aria-pressed={fav}
                    onClick={() => toggleFav(p.id)}
                  >
                    <Heart className={cn(fav && 'fill-rose-500 text-rose-500')} />
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')} <span>({p.reviews})</span>
                </div>
                <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug">{p.name}</h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold tabular-nums">{brl(p.price)}</span>
                  {p.old && <span className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</span>}
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <ShoppingCart data-icon="inline-start" /> Adicionar
                </Button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
