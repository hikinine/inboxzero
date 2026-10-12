'use client'

import { useState } from 'react'
import { ArrowLeft, Backpack, Coffee, Headphones, Minus, Plus, Tag, Trash2, Watch, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
  { id: 'urban', name: 'Mochila Urban 25L', variant: 'Verde', price: 289.9, qty: 1, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'kaffa', name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'pulse', name: 'Relógio Pulse Fit', variant: '44 mm · Grafite', price: 649.9, qty: 1, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
]

const COUPONS: Record<string, { label: string; percent?: number; freeShipping?: boolean }> = {
  BEMVINDO10: { label: '10% de desconto', percent: 10 },
  FRETEGRATIS: { label: 'Frete grátis', freeShipping: true },
}
const SHIPPING = 24.9
const FREE_FROM = 1500

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CarrinhoEmPagina() {
  const [items, setItems] = useState<CartItem[]>(INITIAL)
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const count = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const coupon = applied ? COUPONS[applied] : undefined
  const discount = coupon?.percent ? (subtotal * coupon.percent) / 100 : 0
  const shipping = items.length === 0 || subtotal >= FREE_FROM || coupon?.freeShipping ? 0 : SHIPPING
  const total = subtotal - discount + shipping

  const setQty = (id: string, delta: number) => setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  const remove = (id: string) => setItems((list) => list.filter((i) => i.id !== id))
  const apply = () => {
    const key = code.trim().toUpperCase()
    if (COUPONS[key]) {
      setApplied(key)
      setError(null)
      setCode('')
    } else {
      setError('Cupom inválido ou expirado.')
    }
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          Carrinho <span className="font-normal text-muted-foreground">({count} {count === 1 ? 'item' : 'itens'})</span>
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden sm:table-cell">Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                      Seu carrinho está vazio.{' '}
                      <Button variant="link" className="px-1" onClick={() => setItems(INITIAL)}>Restaurar itens</Button>
                    </TableCell>
                  </TableRow>
                )}
                {items.map((it) => (
                  <TableRow key={it.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                          <it.Icon className="size-5 text-white/90" />
                        </div>
                        <div className="min-w-0">
                          <div className="whitespace-normal font-medium leading-tight">{it.name}</div>
                          <div className="text-xs text-muted-foreground">{it.variant}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden tabular-nums sm:table-cell">{brl(it.price)}</TableCell>
                    <TableCell>
                      <div className="flex h-7 w-fit items-center rounded-md border">
                        <Button variant="ghost" size="icon-xs" aria-label="Diminuir quantidade" disabled={it.qty <= 1} onClick={() => setQty(it.id, -1)}>
                          <Minus />
                        </Button>
                        <span className="w-7 text-center text-xs tabular-nums">{it.qty}</span>
                        <Button variant="ghost" size="icon-xs" aria-label="Aumentar quantidade" onClick={() => setQty(it.id, 1)}>
                          <Plus />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{brl(it.price * it.qty)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" aria-label={`Remover ${it.name}`} onClick={() => remove(it.id)}>
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t p-4 text-sm">
              <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#" />}>
                <ArrowLeft data-icon="inline-start" /> Continuar comprando
              </Button>
              <span className="text-muted-foreground">Frete grátis a partir de {brl(FREE_FROM)}</span>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-medium">Resumo</h3>
              <div className="mt-4">
                <Label htmlFor="cupom" className="text-xs text-muted-foreground">Cupom de desconto</Label>
                <form
                  className="mt-1.5 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    apply()
                  }}
                >
                  <Input id="cupom" placeholder="Ex.: BEMVINDO10" value={code} onChange={(e) => setCode(e.target.value)} aria-invalid={error ? true : undefined} className="font-mono uppercase" />
                  <Button type="submit" variant="outline" disabled={!code.trim()}>Aplicar</Button>
                </form>
                {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
                {applied && coupon && (
                  <div className="mt-2 flex items-center justify-between rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <Tag className="size-3.5" /> <span className="font-mono font-medium">{applied}</span> · {coupon.label}
                    </span>
                    <button type="button" aria-label="Remover cupom" onClick={() => setApplied(null)} className="rounded p-0.5 hover:bg-emerald-500/20">
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}
                <p className="mt-2 text-[11px] text-muted-foreground">Experimente BEMVINDO10 ou FRETEGRATIS</p>
              </div>
              <Separator className="my-4" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{brl(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Desconto</dt>
                    <dd className="text-emerald-600 tabular-nums">− {brl(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Frete</dt>
                  <dd className="tabular-nums">{shipping === 0 ? 'Grátis' : brl(shipping)}</dd>
                </div>
              </dl>
              <Separator className="my-4" />
              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-semibold tabular-nums">{brl(total)}</span>
              </div>
              <p className="text-right text-xs text-muted-foreground">ou 10x de {brl(total / 10)} sem juros</p>
              <Button className="mt-4 w-full" size="lg" disabled={items.length === 0}>Finalizar compra</Button>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {['Pix', 'Visa', 'Mastercard', 'Elo', 'Boleto'].map((b) => (
                  <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
