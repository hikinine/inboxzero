'use client'

import { useState } from 'react'
import { Check, CircleCheck, Coffee, Copy, CreditCard, FileText, Headphones, MapPin, Truck, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const ITEMS: Array<{ name: string; variant: string; price: number; qty: number; Icon: LucideIcon; gradient: string }> = [
  { name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { name: 'Relógio Pulse Fit', variant: '44 mm · Grafite', price: 649.9, qty: 1, Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
  { name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, Icon: Coffee, gradient: 'from-amber-300 to-orange-600' },
]
const TRACKING = [
  { label: 'Pedido confirmado', date: '08/10, 14:32', done: true },
  { label: 'Pagamento aprovado', date: '08/10, 14:35', done: true },
  { label: 'Em separação', date: 'Previsto 09/10', done: false },
  { label: 'Enviado', date: 'Previsto 10/10', done: false },
]
const DISCOUNT = 54.28
const SHIPPING = 0
const CODE = 'BR482131045SP'

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ResumoDoPedido() {
  const [copied, setCopied] = useState(false)
  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal - DISCOUNT + SHIPPING
  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(CODE).catch(() => undefined)
    setCopied(true)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-card">
        <div className="flex flex-wrap items-start justify-between gap-3 p-6">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Resumo do pedido</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Pedido #BR-48213</h2>
            <p className="mt-1 text-sm text-muted-foreground">Realizado em 08/10/2026 às 14:32</p>
          </div>
          <Badge variant="secondary" className="h-6">
            <CircleCheck data-icon="inline-start" className="text-emerald-600" /> Pagamento aprovado
          </Badge>
        </div>
        <Separator />

        <ul className="divide-y px-6">
          {ITEMS.map((it) => (
            <li key={it.name} className="flex items-center gap-4 py-4">
              <div className={cn('flex size-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                <it.Icon className="size-6 text-white/90" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-muted-foreground">{it.variant} · {it.qty} × {brl(it.price)}</div>
              </div>
              <span className="font-medium tabular-nums">{brl(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <Separator />

        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_260px]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="text-sm">
              <div className="flex items-center gap-2 font-medium"><MapPin className="size-4 text-muted-foreground" /> Endereço de entrega</div>
              <p className="mt-2 text-muted-foreground">
                Mariana Alves
                <br />
                Av. Paulista, 1578 · Ap. 92
                <br />
                Bela Vista · São Paulo – SP
                <br />
                01310-100
              </p>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2 font-medium"><Truck className="size-4 text-muted-foreground" /> Entrega estimada</div>
              <p className="mt-2 font-medium">14 a 16 de outubro</p>
              <p className="text-muted-foreground">Transportadora Loggi · entrega padrão</p>
              <button type="button" onClick={copy} className="mt-2 inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-1 font-mono text-xs hover:bg-muted" aria-live="polite">
                {CODE} {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-muted-foreground" />}
              </button>
            </div>
            <div className="text-sm sm:col-span-2">
              <div className="flex items-center gap-2 font-medium"><CreditCard className="size-4 text-muted-foreground" /> Pagamento</div>
              <p className="mt-2 text-muted-foreground">Visa final 4242 · 3x de {brl(total / 3)} sem juros</p>
            </div>
          </div>

          <dl className="space-y-2 rounded-xl bg-muted/40 p-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{brl(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Frete</dt><dd className="text-emerald-600">Grátis</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Desconto (PRIMEIRA5)</dt><dd className="text-emerald-600 tabular-nums">− {brl(DISCOUNT)}</dd></div>
            <Separator className="my-2" />
            <div className="flex items-baseline justify-between"><dt className="font-medium">Total</dt><dd className="text-xl font-semibold tabular-nums">{brl(total)}</dd></div>
          </dl>
        </div>
        <Separator />

        <ol className="grid gap-4 p-6 sm:grid-cols-4">
          {TRACKING.map((t, i) => (
            <li key={t.label} className="flex items-start gap-3 sm:flex-col sm:gap-2">
              <div className="flex items-center gap-2 sm:w-full">
                <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium', t.done ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                  {t.done ? <Check className="size-3" /> : i + 1}
                </span>
                {i < TRACKING.length - 1 && <span className={cn('hidden h-px flex-1 sm:block', t.done ? 'bg-primary' : 'bg-border')} />}
              </div>
              <div>
                <div className={cn('text-sm', t.done ? 'font-medium' : 'text-muted-foreground')}>{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t p-6">
          <a href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Precisa de ajuda com o pedido?</a>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText data-icon="inline-start" /> Nota fiscal
            </Button>
            <Button>
              <Truck data-icon="inline-start" /> Acompanhar pedido
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
