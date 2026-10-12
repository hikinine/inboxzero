'use client'

import { useState } from 'react'
import { Backpack, Eye, Headphones, Heart, Minus, Plus, ShoppingCart, Star, Watch, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
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
  options: string[]
}

const PRODUCTS: Product[] = [
  { id: 'buds', name: 'Fone Aero Buds 2', category: 'Áudio', price: 399.9, old: 499.9, rating: 4.8, reviews: 212, gradient: 'from-violet-400 to-violet-700', Icon: Headphones, options: ['Preto', 'Branco', 'Azul'] },
  { id: 'urban', name: 'Mochila Urban 25L', category: 'Acessórios', price: 289.9, rating: 4.6, reviews: 87, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack, options: ['Verde', 'Cinza', 'Preto'] },
  { id: 'pulse', name: 'Relógio Pulse Fit', category: 'Wearables', price: 649.9, old: 799.9, rating: 4.7, reviews: 341, gradient: 'from-sky-400 to-sky-700', Icon: Watch, options: ['40 mm', '44 mm'] },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function QuickView({ product, onClose, inline }: { product: Product; onClose?: () => void; inline?: boolean }) {
  const [option, setOption] = useState(product.options[0] ?? '')
  const [qty, setQty] = useState(1)
  const off = product.old ? Math.round((1 - product.price / product.old) * 100) : 0

  return (
    <div className={cn('grid w-full overflow-hidden bg-popover text-popover-foreground sm:grid-cols-2', inline && 'rounded-2xl border shadow-xl')}>
      <div className={cn('relative aspect-square bg-gradient-to-br sm:aspect-auto sm:min-h-[380px]', product.gradient)}>
        {off > 0 && <Badge variant="secondary" className="absolute left-4 top-4">-{off}%</Badge>}
        <div className="absolute inset-0 flex items-center justify-center">
          <product.Icon className="size-28 text-white/90" strokeWidth={1.25} />
        </div>
      </div>
      <div className="relative flex flex-col p-6">
        {onClose && (
          <Button variant="ghost" size="icon-sm" className="absolute right-3 top-3" aria-label="Fechar visualização rápida" onClick={onClose}>
            <X />
          </Button>
        )}
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</div>
        <h3 className="mt-1 pr-8 text-xl font-semibold tracking-tight">{product.name}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-500 text-amber-500" /> {product.rating.toLocaleString('pt-BR')} · {product.reviews} avaliações
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums">{brl(product.price)}</span>
          {product.old && <span className="text-sm text-muted-foreground line-through tabular-nums">{brl(product.old)}</span>}
        </div>
        <div className="mt-5 text-sm font-medium">
          Opção <span className="font-normal text-muted-foreground">· {option}</span>
        </div>
        <ToggleGroup
          variant="outline"
          size="sm"
          className="mt-2 flex-wrap"
          aria-label="Opção do produto"
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
        <div className="mt-auto flex items-center gap-2 pt-6">
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
            <ShoppingCart data-icon="inline-start" /> Adicionar
          </Button>
          <Button variant="outline" size="icon" aria-label="Favoritar">
            <Heart />
          </Button>
        </div>
        <a href="#" className="mt-3 text-center text-xs text-muted-foreground underline-offset-4 hover:underline">Ver página completa do produto</a>
      </div>
    </div>
  )
}

export default function QuickViewDeProduto() {
  const [selected, setSelected] = useState<Product | null>(null)
  const inlineProduct = PRODUCTS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Novidades</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Dê uma olhada antes de decidir</h2>
          <p className="mt-3 text-muted-foreground">Cada card abre uma visualização rápida em modal, sem sair da listagem.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="rounded-xl border bg-card p-3">
              <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p.Icon className="size-16 text-white/90" strokeWidth={1.25} />
                </div>
                <div className="absolute inset-x-3 bottom-3">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => setSelected(p)}>
                    <Eye data-icon="inline-start" /> Visualização rápida
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium">{p.name}</h3>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <span className="text-sm font-semibold tabular-nums">{brl(p.price)}</span>
              </div>
            </article>
          ))}
        </div>

        {inlineProduct && (
          <div className="mt-12">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Conteúdo do modal (inline)</div>
            <QuickView product={inlineProduct} inline />
          </div>
        )}

        <Dialog
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null)
          }}
        >
          <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
            {selected && (
              <>
                <DialogTitle className="sr-only">{selected.name}</DialogTitle>
                <DialogDescription className="sr-only">Visualização rápida do produto</DialogDescription>
                <QuickView key={selected.id} product={selected} onClose={() => setSelected(null)} />
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
