'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Backpack, Camera, Check, Coffee, Expand, Footprints, Headphones, Heart, Minus, Plus, ShoppingCart, Speaker, Star, Watch, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  category: string
  price: number
  old?: number
  rating: number
  reviews: number
  gradient: string
  Icon: LucideIcon
  optionLabel: string
  options: string[]
  description: string
  highlights: string[]
}

const PRODUCTS: Product[] = [
  { id: 'run', name: 'Tênis Aero Run Max 2', category: 'Corrida', price: 549.9, old: 699.9, rating: 4.8, reviews: 312, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints, optionLabel: 'Tamanho', options: ['39', '40', '41', '42', '43'], description: 'Entressola com retorno de energia e cabedal em malha respirável para treinos longos.', highlights: ['Drop de 8 mm', 'Peso 245 g', 'Troca grátis em 30 dias'] },
  { id: 'buds', name: 'Fone Aero Buds 2', category: 'Áudio', price: 399.9, old: 499.9, rating: 4.7, reviews: 212, gradient: 'from-violet-400 to-violet-700', Icon: Headphones, optionLabel: 'Cor', options: ['Preto', 'Branco', 'Lilás'], description: 'Cancelamento de ruído adaptativo e 30 horas de bateria com o estojo.', highlights: ['Bluetooth 5.3', 'Resistente a suor (IPX4)', 'Carregamento sem fio'] },
  { id: 'kaffa', name: 'Cafeteira Kaffa Espresso', category: 'Casa', price: 1290, rating: 4.9, reviews: 148, gradient: 'from-amber-300 to-orange-600', Icon: Coffee, optionLabel: 'Voltagem', options: ['110 V', '220 V'], description: 'Moedor integrado, 19 bar de pressão e vaporizador para leite.', highlights: ['Aquece em 25 s', 'Reservatório 1,8 L', 'Garantia de 2 anos'] },
  { id: 'urban', name: 'Mochila Urban 25L', category: 'Acessórios', price: 289.9, rating: 4.6, reviews: 87, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack, optionLabel: 'Cor', options: ['Verde', 'Cinza', 'Preto'], description: 'Compartimento acolchoado para notebook de 16" e tecido impermeável.', highlights: ['Porta USB externa', 'Alças ergonômicas', 'Bolso antifurto'] },
  { id: 'pulse', name: 'Relógio Pulse Fit', category: 'Wearables', price: 649.9, old: 799.9, rating: 4.7, reviews: 341, gradient: 'from-sky-400 to-sky-700', Icon: Watch, optionLabel: 'Caixa', options: ['40 mm', '44 mm'], description: 'GPS integrado, oxímetro e bateria para 7 dias de uso.', highlights: ['5 ATM', 'Tela AMOLED', 'Pagamento por aproximação'] },
  { id: 'onda', name: 'Caixa de Som Onda 360', category: 'Áudio', price: 329.9, old: 399.9, rating: 4.4, reviews: 129, gradient: 'from-teal-400 to-cyan-700', Icon: Speaker, optionLabel: 'Cor', options: ['Grafite', 'Azul', 'Coral'], description: 'Som 360° com graves reforçados e 16 horas de música.', highlights: ['À prova d’água (IP67)', 'Pareia com outra Onda', 'Alça removível'] },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Nota ${value.toLocaleString('pt-BR')} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-3.5', i < Math.round(value) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

function Expanded({ product, fav, onFav, onClose }: { product: Product; fav: boolean; onFav: () => void; onClose: () => void }) {
  const [option, setOption] = useState(product.options[0] ?? '')
  const [qty, setQty] = useState(1)
  const off = product.old ? Math.round((1 - product.price / product.old) * 100) : 0

  return (
    <div className="grid sm:grid-cols-[300px_1fr]">
      <div className={cn('relative min-h-[220px] bg-gradient-to-br sm:min-h-[340px]', product.gradient)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <product.Icon className="size-28 text-white/90" strokeWidth={1.1} />
        </div>
        {off > 0 && <Badge variant="secondary" className="absolute left-4 top-4">-{off}%</Badge>}
      </div>
      <div className="relative p-6">
        <Button variant="ghost" size="icon-sm" className="absolute right-3 top-3" aria-label="Fechar visualização rápida" onClick={onClose}>
          <X />
        </Button>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</div>
        <h3 className="mt-1 pr-10 text-xl font-semibold tracking-tight">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Stars value={product.rating} /> {product.rating.toLocaleString('pt-BR')} · {product.reviews} avaliações
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums">{brl(product.price)}</span>
          {product.old && <span className="text-sm text-muted-foreground line-through tabular-nums">{brl(product.old)}</span>}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1 text-muted-foreground">
              <Check className="size-3 text-emerald-600" /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-5 text-sm font-medium">
          {product.optionLabel} <span className="font-normal text-muted-foreground">· {option}</span>
        </div>
        <ToggleGroup
          variant="outline"
          size="sm"
          className="mt-2 flex-wrap"
          aria-label={product.optionLabel}
          value={[option]}
          onValueChange={(v) => {
            const next = v[0]
            if (typeof next === 'string') setOption(next)
          }}
        >
          {product.options.map((o) => (
            <ToggleGroupItem key={o} value={o} className="aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
              {o}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="flex h-8 items-center rounded-lg border">
            <Button variant="ghost" size="icon-sm" aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Minus />
            </Button>
            <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
            <Button variant="ghost" size="icon-sm" aria-label="Aumentar quantidade" onClick={() => setQty((q) => q + 1)}>
              <Plus />
            </Button>
          </div>
          <Button className="flex-1">
            <ShoppingCart data-icon="inline-start" /> Adicionar · {brl(product.price * qty)}
          </Button>
          <Button variant="outline" size="icon" aria-label={fav ? 'Remover dos favoritos' : 'Favoritar'} aria-pressed={fav} onClick={onFav}>
            <Heart className={cn(fav && 'fill-rose-500 text-rose-500')} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function QuickViewEmCardExpansivel() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [favs, setFavs] = useState<Set<string>>(new Set(['kaffa']))
  const toggleFav = (id: string) =>
    setFavs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mais vendidos</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Veja os detalhes sem sair da grade</h2>
            <p className="mt-3 text-muted-foreground">O card se expande no lugar e ocupa a linha inteira, com opções, quantidade e compra.</p>
          </div>
          {openId && (
            <Button variant="ghost" size="sm" onClick={() => setOpenId(null)}>
              <X data-icon="inline-start" /> Fechar
            </Button>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => {
            const open = openId === p.id
            const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0
            return (
              <motion.article
                key={p.id}
                layout
                transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
                className={cn('group overflow-hidden rounded-xl border bg-card', open && 'sm:col-span-2 lg:col-span-3 ring-1 ring-primary/40 shadow-lg')}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Expanded product={p} fav={favs.has(p.id)} onFav={() => toggleFav(p.id)} onClose={() => setOpenId(null)} />
                    </motion.div>
                  ) : (
                    <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-3">
                      <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p.Icon className="size-16 text-white/90 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
                        </div>
                        {off > 0 && <Badge variant="secondary" className="absolute left-3 top-3">-{off}%</Badge>}
                        <Button
                          variant="secondary"
                          size="icon-sm"
                          className="absolute right-3 top-3 rounded-full"
                          aria-label={favs.has(p.id) ? 'Remover dos favoritos' : 'Favoritar'}
                          aria-pressed={favs.has(p.id)}
                          onClick={() => toggleFav(p.id)}
                        >
                          <Heart className={cn(favs.has(p.id) && 'fill-rose-500 text-rose-500')} />
                        </Button>
                        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                          <Button variant="secondary" size="sm" className="w-full" onClick={() => setOpenId(p.id)}>
                            <Expand data-icon="inline-start" /> Ver rápido
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-medium">{p.name}</h3>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Stars value={p.rating} /> {p.reviews}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold tabular-nums">{brl(p.price)}</div>
                          {p.old && <div className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</div>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full sm:hidden" onClick={() => setOpenId(p.id)}>
                        <Expand data-icon="inline-start" /> Ver rápido
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
