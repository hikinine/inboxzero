'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Gift, Sparkles, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const CODE = 'PRIMEIRA20'
const START_SECONDS = 2 * 3600 + 14 * 60 + 36

const pad = (n: number) => String(n).padStart(2, '0')

function OfferCard({ className }: { className?: string }) {
  const [left, setLeft] = useState(START_SECONDS)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const parts: Array<[string, number]> = [
    ['Horas', Math.floor(left / 3600)],
    ['Min', Math.floor((left % 3600) / 60)],
    ['Seg', left % 60],
  ]

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(CODE).catch(() => undefined)
    setCopied(true)
  }

  return (
    <div className={cn('w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-sm', className)}>
      <div className="relative bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute -bottom-10 right-12 size-28 rounded-full bg-white/10" aria-hidden="true" />
        <Badge variant="secondary" className="relative">
          <Sparkles data-icon="inline-start" /> Primeira compra
        </Badge>
        <div className="relative mt-4 flex items-end gap-3">
          <div className="text-5xl font-semibold tracking-tight">20%</div>
          <div className="pb-1 text-lg font-medium leading-tight">
            de desconto
            <br />
            <span className="text-sm font-normal opacity-80">em qualquer produto da loja</span>
          </div>
        </div>
        <Gift className="absolute bottom-5 right-5 size-10 opacity-80" strokeWidth={1.5} />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>A oferta termina em</span>
          <span>Válido até 31/10/2026</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {parts.map(([label, value], i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex min-w-14 flex-col items-center rounded-lg border bg-muted/40 px-2 py-1.5">
                <span className="text-xl font-semibold tabular-nums">{pad(value)}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
              </div>
              {i < parts.length - 1 && <span className="text-lg font-semibold text-muted-foreground">:</span>}
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-dashed bg-muted/40 p-2 pl-4">
          <div className="flex items-center gap-2">
            <Ticket className="size-4 text-muted-foreground" />
            <span className="font-mono text-lg font-semibold tracking-widest">{CODE}</span>
          </div>
          <Button variant={copied ? 'secondary' : 'default'} size="sm" onClick={copy} aria-live="polite">
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Válido para o primeiro pedido, não cumulativo com outras promoções. Pedido mínimo de R$ 99.</p>
        <Button className="mt-4 w-full" size="lg">Usar cupom agora</Button>
      </div>
    </div>
  )
}

export default function OfertaComCupom() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Oferta de boas-vindas</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Ganhe 20% na sua primeira compra</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Na loja, o modal aparece depois de alguns segundos ou quando o visitante vai sair da página. Aqui o conteúdo está inline — e você pode abrir a versão em modal.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Código copiado com um clique</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Contagem regressiva real, em segundos</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Regras claras no rodapé do card</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger render={<Button size="lg" />}>
                <Gift data-icon="inline-start" /> Abrir oferta em modal
              </DialogTrigger>
              <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
                <DialogTitle className="sr-only">Cupom de 20% na primeira compra</DialogTitle>
                <DialogDescription className="sr-only">Copie o código e use no checkout.</DialogDescription>
                <OfferCard className="max-w-none rounded-none border-0 shadow-none" />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline">Ver termos</Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <OfferCard />
        </div>
      </div>
    </section>
  )
}
