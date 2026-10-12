'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Backpack, Bookmark, Coffee, Headphones, Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2, Truck, Watch, Undo2, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  variant: string
  price: number
  gradient: string
  Icon: LucideIcon
}
interface CartItem extends Product {
  qty: number
}

const CATALOG: Product[] = [
  { id: 'buds', name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'urban', name: 'Mochila Urban 25L', variant: 'Verde · 25 L', price: 289.9, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'kaffa', name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'pulse', name: 'Relógio Pulse Fit', variant: '44 mm · Grafite', price: 649.9, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
]
const INITIAL: CartItem[] = [
  { ...CATALOG[0]!, qty: 1 },
  { ...CATALOG[1]!, qty: 1 },
  { ...CATALOG[2]!, qty: 2 },
]
const COUPONS: Record<string, number> = { AERO10: 0.1, PRIMEIRA20: 0.2 }
const FREE_SHIPPING = 299
const SHIPPING = 19.9

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CarrinhoVazioECheio() {
  const [items, setItems] = useState<CartItem[]>(INITIAL)
  const [saved, setSaved] = useState<CartItem[]>([])
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState(false)

  const mode = items.length === 0 ? 'vazio' : 'cheio'
  const count = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = coupon ? subtotal * (COUPONS[coupon] ?? 0) : 0
  const shipping = subtotal - discount >= FREE_SHIPPING ? 0 : SHIPPING
  const total = subtotal - discount + shipping

  const add = (p: Product) =>
    setItems((list) => {
      const found = list.find((i) => i.id === p.id)
      if (found) return list.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      return [...list, { ...p, qty: 1 }]
    })
  const setQty = (id: string, delta: number) => setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  const remove = (id: string) => setItems((list) => list.filter((i) => i.id !== id))
  const saveForLater = (id: string) => {
    const item = items.find((i) => i.id === id)
    if (!item) return
    remove(id)
    setSaved((list) => [...list, item])
  }
  const moveToCart = (id: string) => {
    const item = saved.find((i) => i.id === id)
    if (!item) return
    setSaved((list) => list.filter((i) => i.id !== id))
    setItems((list) => [...list, item])
  }
  const applyCoupon = () => {
    const key = code.trim().toUpperCase()
    if (COUPONS[key]) {
      setCoupon(key)
      setCouponError(false)
      setCode('')
    } else setCouponError(true)
  }

  const suggestions = CATALOG.filter((p) => !items.some((i) => i.id === p.id))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Carrinho</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {mode === 'vazio' ? 'Seu carrinho' : `Seu carrinho (${count})`}
            </h2>
          </div>
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="Estado do carrinho"
            value={[mode]}
            onValueChange={(v) => {
              const next = v[0]
              if (next === 'vazio') setItems([])
              if (next === 'cheio') setItems(INITIAL)
            }}
          >
            <ToggleGroupItem value="vazio" className="aria-pressed:bg-muted">Vazio</ToggleGroupItem>
            <ToggleGroupItem value="cheio" className="aria-pressed:bg-muted">Com itens</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {mode === 'vazio' ? (
            <motion.div key="vazio" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-8">
              <Empty className="rounded-2xl border border-dashed bg-card py-14">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <ShoppingBag />
                  </EmptyMedia>
                  <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
                  <EmptyDescription>Nada por aqui ainda. Que tal começar pelos mais vendidos da semana?</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button onClick={() => setItems(INITIAL)}>
                      Explorar ofertas <ArrowRight data-icon="inline-end" />
                    </Button>
                    {saved.length > 0 && (
                      <Button variant="outline" onClick={() => saved.forEach((s) => moveToCart(s.id))}>
                        <Bookmark data-icon="inline-start" /> Recuperar {saved.length} salvo{saved.length > 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>
                </EmptyContent>
              </Empty>

              <div className="mt-8 flex items-center justify-between">
                <h3 className="font-medium">Você pode gostar</h3>
                <a href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Ver mais</a>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CATALOG.map((p) => (
                  <article key={p.id} className="rounded-xl border bg-card p-3">
                    <div className={cn('flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br', p.gradient)}>
                      <p.Icon className="size-12 text-white/90" strokeWidth={1.25} />
                    </div>
                    <h4 className="mt-3 truncate text-sm font-medium">{p.name}</h4>
                    <div className="text-xs text-muted-foreground">{p.variant}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums">{brl(p.price)}</span>
                      <Button size="xs" variant="outline" onClick={() => add(p)}>
                        <Plus data-icon="inline-start" /> Adicionar
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="cheio" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-4 rounded-xl border bg-card p-4">
                      <div className={cn('flex size-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                        <it.Icon className="size-8 text-white/90" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate font-medium">{it.name}</div>
                            <div className="text-xs text-muted-foreground">{it.variant}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold tabular-nums">{brl(it.price * it.qty)}</div>
                            {it.qty > 1 && <div className="text-xs text-muted-foreground tabular-nums">{it.qty} × {brl(it.price)}</div>}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex h-8 items-center rounded-lg border">
                            <Button variant="ghost" size="icon-sm" aria-label="Diminuir quantidade" disabled={it.qty <= 1} onClick={() => setQty(it.id, -1)}>
                              <Minus />
                            </Button>
                            <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                            <Button variant="ghost" size="icon-sm" aria-label="Aumentar quantidade" onClick={() => setQty(it.id, 1)}>
                              <Plus />
                            </Button>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="xs" onClick={() => saveForLater(it.id)}>
                              <Bookmark data-icon="inline-start" /> Salvar para depois
                            </Button>
                            <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-destructive" onClick={() => remove(it.id)}>
                              <Trash2 data-icon="inline-start" /> Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {saved.length > 0 && (
                  <div className="mt-8">
                    <h3 className="flex items-center gap-2 text-sm font-medium">
                      <Bookmark className="size-4 text-muted-foreground" /> Salvos para depois ({saved.length})
                    </h3>
                    <ul className="mt-3 divide-y rounded-xl border bg-muted/30">
                      {saved.map((it) => (
                        <li key={it.id} className="flex items-center gap-3 px-4 py-3">
                          <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br', it.gradient)}>
                            <it.Icon className="size-4 text-white/90" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium">{it.name}</div>
                            <div className="text-xs text-muted-foreground tabular-nums">{brl(it.price)}</div>
                          </div>
                          <Button variant="outline" size="xs" onClick={() => moveToCart(it.id)}>
                            <Undo2 data-icon="inline-start" /> Mover para o carrinho
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className="lg:sticky lg:top-6 lg:self-start">
                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="font-medium">Resumo</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({count} {count === 1 ? 'item' : 'itens'})</span>
                      <span className="tabular-nums">{brl(subtotal)}</span>
                    </div>
                    {coupon && (
                      <div className="flex justify-between text-emerald-600">
                        <span className="flex items-center gap-1.5">
                          <Tag className="size-3.5" /> Cupom {coupon}
                          <button type="button" onClick={() => setCoupon(null)} aria-label="Remover cupom" className="text-muted-foreground hover:text-foreground">
                            <X className="size-3" />
                          </button>
                        </span>
                        <span className="tabular-nums">- {brl(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className={cn('tabular-nums', shipping === 0 && 'font-medium text-emerald-600')}>{shipping === 0 ? 'Grátis' : brl(shipping)}</span>
                    </div>
                  </div>
                  {shipping > 0 && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Truck className="size-3.5" /> Faltam {brl(FREE_SHIPPING - (subtotal - discount))} para o frete grátis
                    </p>
                  )}

                  {!coupon && (
                    <div className="mt-4">
                      <InputGroup>
                        <InputGroupAddon>
                          <Tag className="text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="Cupom de desconto"
                          aria-label="Cupom de desconto"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value)
                            setCouponError(false)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              applyCoupon()
                            }
                          }}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton size="xs" variant="secondary" disabled={!code.trim()} onClick={applyCoupon}>Aplicar</InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      <p className={cn('mt-1.5 text-xs', couponError ? 'text-destructive' : 'text-muted-foreground')}>{couponError ? 'Cupom inválido ou expirado.' : 'Experimente AERO10 ou PRIMEIRA20.'}</p>
                    </div>
                  )}

                  <Separator className="my-4" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-2xl font-semibold tabular-nums">{brl(total)}</span>
                  </div>
                  <p className="mt-1 text-right text-xs text-muted-foreground">ou 6x de {brl(total / 6)} sem juros</p>
                  <Button size="lg" className="mt-4 w-full">
                    Finalizar compra <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => setItems([])}>Esvaziar carrinho</Button>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <Badge variant="outline"><ShieldCheck data-icon="inline-start" /> Compra protegida</Badge>
                    <Badge variant="outline"><Truck data-icon="inline-start" /> Troca grátis</Badge>
                  </div>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>

        {mode === 'cheio' && suggestions.length > 0 && (
          <div className="mt-10 border-t pt-8">
            <h3 className="font-medium">Complete o pedido</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {suggestions.map((p) => (
                <button key={p.id} type="button" onClick={() => add(p)} className="flex items-center gap-3 rounded-xl border bg-card p-2 pr-4 text-left transition hover:bg-muted">
                  <span className={cn('flex size-10 items-center justify-center rounded-lg bg-gradient-to-br', p.gradient)}>
                    <p.Icon className="size-4 text-white/90" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{p.name}</span>
                    <span className="block text-xs text-muted-foreground tabular-nums">{brl(p.price)} · adicionar</span>
                  </span>
                  <Plus className="ml-2 size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
