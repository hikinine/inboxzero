'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, CircleCheck, Clock, Coffee, Copy, Headphones, Lock, MapPin, QrCode, RefreshCw, Smartphone, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const ITEMS: Array<{ name: string; variant: string; price: number; qty: number; Icon: LucideIcon; gradient: string }> = [
  { name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { name: 'Relógio Pulse Fit', variant: '44 mm', price: 649.9, qty: 1, Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
  { name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, Icon: Coffee, gradient: 'from-amber-300 to-orange-600' },
]
const PIX_OFF = 0.05
const SHIPPING = 0
const EXPIRES = 10 * 60 - 2
const SIZE = 25
const STEPS = ['Entrega', 'Pagamento', 'Confirmação']
const PIX_CODE = '00020126580014br.gov.bcb.pix0136a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d52040000530398654061081.515802BR5913AERO LOJA LTDA6009SAO PAULO62070503***6304A1B2'

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const pad = (n: number) => String(n).padStart(2, '0')

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildQr(seed: number): boolean[][] {
  const rnd = mulberry32(seed)
  const grid = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => rnd() > 0.52))
  const finder = (ox: number, oy: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const gx = ox + x
        const gy = oy + y
        if (gx < 0 || gy < 0 || gx >= SIZE || gy >= SIZE) continue
        const row = grid[gy]
        if (!row) continue
        const quiet = x === -1 || y === -1 || x === 7 || y === 7
        const border = x === 0 || y === 0 || x === 6 || y === 6
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4
        row[gx] = quiet ? false : border || inner
      }
    }
  }
  finder(0, 0)
  finder(SIZE - 7, 0)
  finder(0, SIZE - 7)
  for (let i = 8; i < SIZE - 8; i++) {
    const r6 = grid[6]
    const ri = grid[i]
    if (r6) r6[i] = i % 2 === 0
    if (ri) ri[6] = i % 2 === 0
  }
  return grid
}

type Status = 'aguardando' | 'verificando' | 'confirmado'

export default function CheckoutComPixEQr() {
  const [left, setLeft] = useState(EXPIRES)
  const [seed, setSeed] = useState(7)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>('aguardando')

  const grid = useMemo(() => buildQr(seed), [seed])
  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = subtotal * PIX_OFF
  const total = subtotal - discount + SHIPPING
  const expired = left <= 0 && status !== 'confirmado'

  useEffect(() => {
    if (status === 'confirmado') return
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [status])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  useEffect(() => {
    if (status !== 'verificando') return
    const t = setTimeout(() => setStatus('confirmado'), 1500)
    return () => clearTimeout(t)
  }, [status])

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(PIX_CODE).catch(() => undefined)
    setCopied(true)
  }
  const regenerate = () => {
    setSeed((s) => s + 1)
    setLeft(EXPIRES)
    setStatus('aguardando')
  }
  const activeStep = status === 'confirmado' ? 2 : 1

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight">Pagamento</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="size-3.5" /> Ambiente seguro
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border bg-card">
            <ol className="flex items-center gap-2 border-b px-6 py-4 text-sm">
              {STEPS.map((s, i) => {
                const done = i < activeStep
                const active = i === activeStep
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span className={cn('flex size-6 items-center justify-center rounded-full text-xs font-semibold', done ? 'bg-emerald-500 text-white' : active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                      {done ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span className={cn(active ? 'font-medium' : 'text-muted-foreground')}>{s}</span>
                    {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-border sm:w-10" aria-hidden="true" />}
                  </li>
                )
              })}
            </ol>

            {status === 'confirmado' ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <CircleCheck className="size-8" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">Pagamento confirmado</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Recebemos seu Pix de {brl(total)}. O pedido #BR-51920 já está em separação e você recebe o rastreio por e-mail.</p>
                <div className="mt-6 flex gap-2">
                  <Button>Acompanhar pedido</Button>
                  <Button variant="outline" onClick={regenerate}>
                    <RefreshCw data-icon="inline-start" /> Simular de novo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 p-6 md:grid-cols-[240px_1fr]">
                <div className="flex flex-col items-center">
                  <div className={cn('relative rounded-xl bg-white p-3 text-neutral-900 shadow-sm ring-1 ring-foreground/10', expired && 'opacity-40')}>
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-48" shapeRendering="crispEdges" role="img" aria-label="QR Code do Pix">
                      {grid.flatMap((row, y) => row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" /> : null)))}
                    </svg>
                    {expired && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Badge variant="destructive">Expirado</Badge>
                      </div>
                    )}
                  </div>
                  <div className={cn('mt-3 flex items-center gap-1.5 text-sm', expired ? 'text-destructive' : 'text-muted-foreground')} aria-live="polite">
                    <Clock className="size-3.5" />
                    {expired ? 'Código expirado' : (
                      <>
                        Expira em <span className="font-medium tabular-nums text-foreground">{pad(Math.floor(left / 60))}:{pad(left % 60)}</span>
                      </>
                    )}
                  </div>
                  {expired && (
                    <Button variant="outline" size="sm" className="mt-3" onClick={regenerate}>
                      <RefreshCw data-icon="inline-start" /> Gerar novo código
                    </Button>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
                      <QrCode className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Pague com Pix</h3>
                      <p className="text-xs text-muted-foreground">Aprovação em segundos · 5% de desconto aplicado</p>
                    </div>
                  </div>
                  <ol className="mt-5 space-y-3 text-sm">
                    {[
                      ['Abra o app do seu banco', 'e escolha pagar com Pix.'],
                      ['Escaneie o QR Code', 'ou cole o código copia e cola.'],
                      ['Confirme o valor', `de ${brl(total)} e pronto.`],
                    ].map(([a, b], i) => (
                      <li key={a} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
                        <span>
                          <span className="font-medium">{a}</span> <span className="text-muted-foreground">{b}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5">
                    <div className="mb-1.5 text-xs font-medium text-muted-foreground">Pix copia e cola</div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2 pl-3">
                      <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">{PIX_CODE}</code>
                      <Button size="sm" variant={copied ? 'secondary' : 'default'} disabled={expired} onClick={copy} aria-live="polite">
                        {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button size="lg" disabled={expired || status === 'verificando'} onClick={() => setStatus('verificando')}>
                      {status === 'verificando' ? (
                        <>
                          <Spinner data-icon="inline-start" /> Verificando pagamento…
                        </>
                      ) : (
                        <>
                          <Smartphone data-icon="inline-start" /> Já fiz o pagamento
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-muted-foreground">A confirmação costuma ser automática.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-medium">Resumo do pedido</h3>
              <ul className="mt-4 space-y-3">
                {ITEMS.map((it) => (
                  <li key={it.name} className="flex items-center gap-3">
                    <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                      <it.Icon className="size-5 text-white/90" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.variant} · {it.qty} un.
                      </div>
                    </div>
                    <span className="text-sm tabular-nums">{brl(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{brl(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Desconto Pix (5%)</span>
                  <span className="tabular-nums">- {brl(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-emerald-600">Grátis</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-semibold tabular-nums">{brl(total)}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  <span className="font-medium text-foreground">Mariana Albuquerque</span>
                  <br />
                  Rua Harmonia, 123 · Vila Madalena
                  <br />
                  São Paulo, SP · 05435-000
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
