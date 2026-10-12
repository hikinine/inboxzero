'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Coffee, Copy, CreditCard, Headphones, MapPin, Package, PackageCheck, RotateCcw, Truck, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const ITEMS: Array<{ name: string; variant: string; price: number; qty: number; Icon: LucideIcon; gradient: string }> = [
  { name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { name: 'Relógio Pulse Fit', variant: '44 mm · Grafite', price: 649.9, qty: 1, Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
  { name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, Icon: Coffee, gradient: 'from-amber-300 to-orange-600' },
]
const EVENTS = [
  { id: 'e1', title: 'Pedido confirmado', place: 'Aero Loja · São Paulo, SP', time: '08/10, 14:32' },
  { id: 'e2', title: 'Pagamento aprovado', place: 'Pix · aprovação automática', time: '08/10, 14:35' },
  { id: 'e3', title: 'Separado e embalado', place: 'Centro de distribuição · Cajamar, SP', time: '09/10, 08:10' },
  { id: 'e4', title: 'Coletado pela transportadora', place: 'Loggi · Cajamar, SP', time: '09/10, 16:45' },
  { id: 'e5', title: 'Em trânsito para a base de entrega', place: 'Loggi · Lapa, São Paulo, SP', time: '10/10, 06:20' },
  { id: 'e6', title: 'Saiu para entrega', place: 'Entregador Carlos · Pinheiros, SP', time: '10/10, 09:05' },
  { id: 'e7', title: 'Entregue', place: 'Recebido por Mariana Albuquerque', time: '10/10, 13:40' },
]
const STEPS: Array<{ label: string; Icon: LucideIcon }> = [
  { label: 'Confirmado', Icon: Check },
  { label: 'Enviado', Icon: Package },
  { label: 'Em trânsito', Icon: Truck },
  { label: 'Entregue', Icon: PackageCheck },
]
const START_VISIBLE = 5
const DISCOUNT = 54.28
const CODE = 'LG482131045BR'

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function stepFor(visible: number) {
  if (visible >= EVENTS.length) return 3
  if (visible >= 5) return 2
  if (visible >= 3) return 1
  return 0
}

export default function ResumoDoPedidoComRastreio() {
  const [visible, setVisible] = useState(START_VISIBLE)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const events = EVENTS.slice(0, visible).reverse()
  const step = stepFor(visible)
  const delivered = visible >= EVENTS.length
  const pct = Math.round((visible / EVENTS.length) * 100)
  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal - DISCOUNT
  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(CODE).catch(() => undefined)
    setCopied(true)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pedido #BR-51920</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{delivered ? 'Pedido entregue' : 'Chega hoje, até as 18h'}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{delivered ? 'Entregue em 10/10 às 13:40 · recebido por Mariana Albuquerque' : 'Saiu para entrega com Carlos · Loggi · 4 paradas antes da sua'}</p>
          </div>
          <div className="flex items-center gap-2">
            {delivered ? (
              <Badge variant="secondary" className="h-7 gap-1.5 px-3 text-emerald-600">
                <PackageCheck data-icon="inline-start" /> Entregue
              </Badge>
            ) : (
              <Badge variant="secondary" className="h-7 gap-1.5 px-3">
                <Truck data-icon="inline-start" /> Saiu para entrega
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <Progress value={pct} aria-label={`Progresso da entrega: ${pct}%`} />
          <ol className="mt-4 grid grid-cols-4 text-center text-xs">
            {STEPS.map((s, i) => {
              const done = i < step
              const active = i === step
              return (
                <li key={s.label} className="flex flex-col items-center gap-1.5">
                  <span className={cn('flex size-8 items-center justify-center rounded-full', done || (active && delivered) ? 'bg-emerald-500 text-white' : active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                    <s.Icon className="size-4" />
                  </span>
                  <span className={cn(active ? 'font-medium' : 'text-muted-foreground')}>{s.label}</span>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-medium">Movimentações</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" disabled={visible === START_VISIBLE} onClick={() => setVisible(START_VISIBLE)}>
                  <RotateCcw data-icon="inline-start" /> Reiniciar
                </Button>
                <Button variant="outline" size="sm" disabled={delivered} onClick={() => setVisible((v) => Math.min(EVENTS.length, v + 1))}>
                  Simular próxima atualização
                </Button>
              </div>
            </div>
            <ol className="mt-6">
              {events.map((e, i) => {
                const latest = i === 0
                return (
                  <li key={e.id} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < events.length - 1 && <span className="absolute left-[9px] top-5 h-full w-px bg-border" aria-hidden="true" />}
                    <span className="relative mt-1 flex size-5 shrink-0 items-center justify-center">
                      {latest && !delivered && <motion.span className="absolute inset-0 rounded-full bg-primary/40" animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }} aria-hidden="true" />}
                      <span className={cn('relative size-2.5 rounded-full', latest ? (delivered ? 'bg-emerald-500' : 'bg-primary') : 'bg-muted-foreground/40')} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className={cn('font-medium', !latest && 'text-foreground/80')}>{e.title}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{e.time}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" /> {e.place}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Rastreio</h3>
                <span className="text-xs text-muted-foreground">Loggi</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border bg-muted/40 p-2 pl-3">
                <span className="font-mono text-sm tracking-wider">{CODE}</span>
                <Button variant="ghost" size="icon-sm" aria-label="Copiar código de rastreio" onClick={copy} aria-live="polite">
                  {copied ? <Check className="text-emerald-600" /> : <Copy />}
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-medium">Itens</h3>
              <ul className="mt-3 space-y-3">
                {ITEMS.map((it) => (
                  <li key={it.name} className="flex items-center gap-3">
                    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                      <it.Icon className="size-4 text-white/90" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.variant} · {it.qty} un.
                      </div>
                    </div>
                    <span className="text-sm tabular-nums">{brl(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-3" />
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{brl(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Cupom PRIMEIRA5</span>
                  <span className="tabular-nums">- {brl(DISCOUNT)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-medium">
                  <span>Total</span>
                  <span className="tabular-nums">{brl(total)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  <span className="font-medium text-foreground">Entrega</span>
                  <br />
                  Rua Harmonia, 123 · Vila Madalena · São Paulo, SP
                </span>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <CreditCard className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  <span className="font-medium text-foreground">Pagamento</span>
                  <br />
                  Pix · aprovado em 08/10 às 14:35
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
