'use client'

import { useState } from 'react'
import { ArrowRight, Backpack, Coffee, Headphones, Minus, PanelRight, Plus, ShoppingBag, Trash2, Truck, X, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface CartItem {
  id: string
  name: string
  variant: string
  price: number
  qty: number
  gradient: string
  Icon: LucideIcon
}

const INITIAL: CartItem[] = [
  { id: 'buds', name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'urban', name: 'Mochila Urban 25L', variant: 'Verde · 25 L', price: 289.9, qty: 1, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'kaffa', name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
]
const FREE_SHIPPING = 899

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function CartPanel({
  items,
  onQty,
  onRemove,
  onRestore,
  onClose,
}: {
  items: CartItem[]
  onQty: (id: string, delta: number) => void
  onRemove: (id: string) => void
  onRestore: () => void
  onClose?: () => void
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)
  const missing = Math.max(0, FREE_SHIPPING - subtotal)
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING) * 100))

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2 font-medium">
          <ShoppingBag className="size-4" /> Seu carrinho <span className="text-muted-foreground">({count})</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" aria-label="Fechar carrinho" onClick={onClose}>
            <X />
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium">Seu carrinho está vazio</p>
          <p className="text-sm text-muted-foreground">Adicione produtos para continuar.</p>
          <Button variant="outline" size="sm" onClick={onRestore}>Ver sugestões</Button>
        </div>
      ) : (
        <>
          <div className="border-b px-5 py-3">
            <div className="flex items-center gap-2 text-xs">
              <Truck className="size-3.5 text-muted-foreground" />
              {missing > 0 ? (
                <span>
                  Faltam <span className="font-medium">{brl(missing)}</span> para o frete grátis
                </span>
              ) : (
                <span className="font-medium text-emerald-600">Você ganhou frete grátis!</span>
              )}
            </div>
            <Progress value={pct} className="mt-2" aria-label="Progresso para frete grátis" />
          </div>

          <ul className="flex-1 divide-y overflow-y-auto px-5">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 py-4">
                <div className={cn('flex size-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                  <it.Icon className="size-7 text-white/90" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">{it.variant}</div>
                    </div>
                    <Button variant="ghost" size="icon-xs" aria-label={`Remover ${it.name}`} onClick={() => onRemove(it.id)}>
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex h-7 items-center rounded-md border">
                      <Button variant="ghost" size="icon-xs" aria-label="Diminuir quantidade" disabled={it.qty <= 1} onClick={() => onQty(it.id, -1)}>
                        <Minus />
                      </Button>
                      <span className="w-7 text-center text-xs tabular-nums">{it.qty}</span>
                      <Button variant="ghost" size="icon-xs" aria-label="Aumentar quantidade" onClick={() => onQty(it.id, 1)}>
                        <Plus />
                      </Button>
                    </div>
                    <span className="text-sm font-medium tabular-nums">{brl(it.price * it.qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t px-5 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium tabular-nums">{brl(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Frete</span>
              <span className="tabular-nums">{missing > 0 ? 'calculado no checkout' : 'Grátis'}</span>
            </div>
            <Button className="mt-4 w-full" size="lg">
              Finalizar compra <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="ghost" className="mt-2 w-full" size="sm" onClick={onClose}>Continuar comprando</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default function CarrinhoLateral() {
  const [items, setItems] = useState<CartItem[]>(INITIAL)
  const [open, setOpen] = useState(false)
  const onQty = (id: string, delta: number) => setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  const onRemove = (id: string) => setItems((list) => list.filter((i) => i.id !== id))
  const onRestore = () => setItems(INITIAL)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Carrinho</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Carrinho lateral</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Painel deslizante com progresso para o frete grátis, quantidades e checkout. Abaixo, simulado sobre a loja; no botão, como Sheet real.</p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="outline" />}>
              <PanelRight data-icon="inline-start" /> Abrir como Sheet
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false} className="w-full gap-0 p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Seu carrinho</SheetTitle>
              <SheetDescription className="sr-only">Itens adicionados ao carrinho</SheetDescription>
              <CartPanel items={items} onQty={onQty} onRemove={onRemove} onRestore={onRestore} onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative mt-8 h-[600px] overflow-hidden rounded-2xl border bg-background">
          <div className="absolute inset-0 p-6" aria-hidden="true">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="mt-8 h-8 w-64" />
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm border-l shadow-2xl">
            <CartPanel items={items} onQty={onQty} onRemove={onRemove} onRestore={onRestore} />
          </div>
        </div>
      </div>
    </section>
  )
}
