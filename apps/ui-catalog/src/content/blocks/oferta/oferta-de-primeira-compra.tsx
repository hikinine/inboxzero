'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Copy, Gift, Mail, Maximize2, PartyPopper, Sparkles, Truck, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const CODE = 'BEMVINDO15'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function OfferModal({ onClose, className, idPrefix }: { onClose?: () => void; className?: string; idPrefix: string }) {
  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Digite um e-mail válido para receber o cupom.')
      return
    }
    setError(null)
    setDone(true)
  }
  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(CODE).catch(() => undefined)
    setCopied(true)
  }

  return (
    <div className={cn('grid w-full max-w-2xl overflow-hidden rounded-2xl bg-popover text-popover-foreground sm:grid-cols-[1fr_1.15fr]', className)}>
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700 p-6 text-white sm:p-8">
        <div className="absolute -left-12 -top-12 size-44 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-10 size-52 rounded-full bg-white/10" aria-hidden="true" />
        <Badge variant="secondary" className="relative w-fit">
          <Sparkles data-icon="inline-start" /> Só para novos clientes
        </Badge>
        <div className="relative mt-8">
          <div className="text-6xl font-semibold leading-none tracking-tight">15%</div>
          <div className="mt-1 text-xl font-medium">de desconto</div>
          <div className="mt-1 text-sm opacity-90">na sua primeira compra</div>
        </div>
        <div className="relative mt-8 flex items-center gap-2 text-xs opacity-90">
          <Truck className="size-3.5" /> + frete grátis acima de R$ 199
        </div>
        <Gift className="absolute bottom-6 right-6 size-10 opacity-70" strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className="relative p-6 sm:p-8">
        {onClose && (
          <Button variant="ghost" size="icon-sm" className="absolute right-3 top-3" aria-label="Fechar oferta" onClick={onClose}>
            <X />
          </Button>
        )}
        {!done ? (
          <form onSubmit={submit} noValidate>
            <h3 className="pr-8 text-xl font-semibold tracking-tight">Deixe seu e-mail e receba o cupom</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">O código aparece aqui na hora e também vai para a sua caixa de entrada. Sem spam, prometido.</p>
            <div className="mt-5">
              <Label htmlFor={`${idPrefix}-email`} className="sr-only">Seu e-mail</Label>
              <InputGroup>
                <InputGroupAddon>
                  <Mail className="text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id={`${idPrefix}-email`}
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  aria-invalid={error ? true : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError(null)
                  }}
                />
              </InputGroup>
              {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
            </div>
            <Label htmlFor={`${idPrefix}-optin`} className="mt-4 flex cursor-pointer items-start gap-2 text-xs font-normal text-muted-foreground">
              <Checkbox id={`${idPrefix}-optin`} checked={optIn} onCheckedChange={(v) => setOptIn(Boolean(v))} className="mt-0.5" />
              Quero receber ofertas e novidades por e-mail (você pode cancelar quando quiser).
            </Label>
            <Button type="submit" size="lg" className="mt-5 w-full">
              <Gift data-icon="inline-start" /> Quero meu cupom
            </Button>
            <button type="button" onClick={onClose} className="mt-3 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline">
              Não, obrigado. Prefiro pagar o preço cheio.
            </button>
          </form>
        ) : (
          <div className="flex h-full flex-col">
            <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <PartyPopper className="size-6" />
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">Seu cupom chegou!</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Também enviamos uma cópia para <span className="font-medium text-foreground">{email.trim()}</span>.
            </p>
            <div className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-dashed bg-muted/40 p-2 pl-4">
              <span className="font-mono text-lg font-semibold tracking-widest">{CODE}</span>
              <Button variant={copied ? 'secondary' : 'default'} size="sm" onClick={copy} aria-live="polite">
                {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Válido por 7 dias · pedido mínimo de R$ 99 · não cumulativo.</p>
            <Button size="lg" className="mt-auto w-full pt-0" onClick={onClose}>Começar a comprar</Button>
            <button
              type="button"
              onClick={() => {
                setDone(false)
                setEmail('')
              }}
              className="mt-3 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Usar outro e-mail
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OfertaDePrimeiraCompra() {
  const [open, setOpen] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Captura de e-mail</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Cupom de boas-vindas em troca do e-mail</h2>
          <p className="mt-3 text-muted-foreground">O visitante digita o e-mail, o código aparece na hora e a loja ganha um contato para a próxima campanha.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Validação do e-mail antes de liberar o cupom</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Código copiável com um clique</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> Opt-in explícito para a newsletter</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger render={<Button size="lg" />}>
                <Maximize2 data-icon="inline-start" /> Abrir como modal
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-2xl">
                <DialogTitle className="sr-only">15% de desconto na primeira compra</DialogTitle>
                <DialogDescription className="sr-only">Informe seu e-mail para receber o cupom.</DialogDescription>
                <OfferModal idPrefix="opc-modal" className="max-w-none rounded-none" onClose={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline">Ver regras da promoção</Button>
          </div>
        </div>
        <div className="rounded-3xl border bg-muted/40 p-4 sm:p-8">
          <div className="mx-auto w-fit shadow-2xl">
            <OfferModal idPrefix="opc-inline" className="border" />
          </div>
        </div>
      </div>
    </section>
  )
}
