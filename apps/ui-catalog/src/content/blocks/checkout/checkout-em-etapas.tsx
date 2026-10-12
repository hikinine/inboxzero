'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Barcode, Check, ChevronLeft, ChevronRight, CircleCheck, CreditCard, Headphones, Lock, QrCode, Watch, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const STEPS = ['Entrega', 'Pagamento', 'Revisão'] as const
type Payment = 'cartao' | 'pix' | 'boleto'

const PAYMENTS: Array<{ value: Payment; label: string; hint: string; Icon: LucideIcon }> = [
  { value: 'cartao', label: 'Cartão de crédito', hint: 'Em até 10x sem juros', Icon: CreditCard },
  { value: 'pix', label: 'Pix', hint: '5% de desconto · aprovação imediata', Icon: QrCode },
  { value: 'boleto', label: 'Boleto bancário', hint: 'Compensação em até 2 dias úteis', Icon: Barcode },
]

const ITEMS = [
  { name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { name: 'Relógio Pulse Fit', variant: '44 mm', price: 649.9, qty: 1, Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
]

interface Form {
  nome: string
  email: string
  cep: string
  endereco: string
  numero: string
  cidade: string
  uf: string
}

const INITIAL_FORM: Form = { nome: 'Mariana Alves', email: 'mariana.alves@exemplo.com', cep: '01310-100', endereco: 'Av. Paulista', numero: '1578', cidade: 'São Paulo', uf: 'SP' }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CheckoutEmEtapas() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(INITIAL_FORM)
  const [payment, setPayment] = useState<Payment>('pix')
  const [done, setDone] = useState(false)

  const set = (key: keyof Form) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = payment === 'pix' ? subtotal * 0.05 : 0
  const total = subtotal - discount
  const paymentLabel = PAYMENTS.find((p) => p.value === payment)?.label ?? ''

  const field = (key: keyof Form, label: string, props?: { type?: string; className?: string; inputMode?: 'numeric' }) => (
    <div className={cn('space-y-1.5', props?.className)}>
      <Label htmlFor={`f-${key}`}>{label}</Label>
      <Input id={`f-${key}`} type={props?.type} inputMode={props?.inputMode} value={form[key]} onChange={set(key)} />
    </div>
  )

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight">Finalizar compra</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {done ? (
              <div className="flex flex-col items-center rounded-xl border bg-card px-6 py-16 text-center">
                <CircleCheck className="size-12 text-emerald-600" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-semibold">Pedido #BR-48213 confirmado</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Enviamos a confirmação para {form.email}. A entrega chega entre 14 e 16 de outubro.</p>
                <div className="mt-6 flex gap-3">
                  <Button>Acompanhar pedido</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDone(false)
                      setStep(0)
                    }}
                  >
                    Fazer outro pedido
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-card">
                <ol className="flex items-center gap-2 border-b p-4 sm:gap-4">
                  {STEPS.map((label, i) => {
                    const state = i < step ? 'done' : i === step ? 'current' : 'todo'
                    return (
                      <li key={label} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3">
                        <button type="button" onClick={() => i < step && setStep(i)} disabled={i > step} aria-current={state === 'current' ? 'step' : undefined} className="flex items-center gap-2 text-sm disabled:cursor-default">
                          <span
                            className={cn(
                              'flex size-7 items-center justify-center rounded-full border text-xs font-medium',
                              state === 'done' && 'border-primary bg-primary text-primary-foreground',
                              state === 'current' && 'border-primary text-primary',
                              state === 'todo' && 'text-muted-foreground',
                            )}
                          >
                            {state === 'done' ? <Check className="size-3.5" /> : i + 1}
                          </span>
                          <span className={cn('hidden sm:inline', state === 'todo' ? 'text-muted-foreground' : 'font-medium')}>{label}</span>
                        </button>
                        {i < STEPS.length - 1 && <span className={cn('h-px flex-1', i < step ? 'bg-primary' : 'bg-border')} />}
                      </li>
                    )
                  })}
                </ol>

                <div className="p-6">
                  {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {field('nome', 'Nome completo')}
                      {field('email', 'E-mail', { type: 'email' })}
                      {field('cep', 'CEP', { inputMode: 'numeric' })}
                      {field('endereco', 'Endereço')}
                      {field('numero', 'Número')}
                      {field('cidade', 'Cidade')}
                      {field('uf', 'UF')}
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <RadioGroup value={payment} onValueChange={(v) => setPayment(v as Payment)} className="gap-3">
                        {PAYMENTS.map((p) => (
                          <Label
                            key={p.value}
                            htmlFor={`pay-${p.value}`}
                            className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-4 leading-normal transition-colors', payment === p.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50')}
                          >
                            <RadioGroupItem id={`pay-${p.value}`} value={p.value} className="mt-0.5" />
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                              <p.Icon className="size-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-sm font-medium">{p.label}</span>
                              <span className="block text-xs font-normal text-muted-foreground">{p.hint}</span>
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                      {payment === 'cartao' && (
                        <div className="mt-4 grid gap-4 rounded-xl border bg-muted/30 p-4 sm:grid-cols-2">
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="card-number">Número do cartão</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="card-name">Nome impresso</Label>
                            <Input id="card-name" placeholder="Como está no cartão" />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="card-exp">Validade</Label>
                            <Input id="card-exp" placeholder="MM/AA" inputMode="numeric" />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="card-cvv">CVV</Label>
                            <Input id="card-cvv" placeholder="123" inputMode="numeric" />
                          </div>
                        </div>
                      )}
                      {payment === 'pix' && <p className="mt-4 text-sm text-muted-foreground">O QR Code aparece após a confirmação e vale por 30 minutos. Desconto de 5% já aplicado no total.</p>}
                      {payment === 'boleto' && <p className="mt-4 text-sm text-muted-foreground">O boleto vence em 2 dias úteis. O pedido é enviado após a compensação.</p>}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border p-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Entrega</span>
                            <Button variant="link" size="xs" className="px-0" onClick={() => setStep(0)}>Editar</Button>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {form.nome}
                            <br />
                            {form.endereco}, {form.numero}
                            <br />
                            {form.cidade} – {form.uf} · {form.cep}
                          </p>
                        </div>
                        <div className="rounded-xl border p-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Pagamento</span>
                            <Button variant="link" size="xs" className="px-0" onClick={() => setStep(1)}>Editar</Button>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {paymentLabel}
                            <br />
                            {payment === 'pix' ? '5% de desconto aplicado' : payment === 'cartao' ? 'Em até 10x sem juros' : 'Vencimento em 2 dias úteis'}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl border p-4">
                        <div className="text-sm font-medium">Itens</div>
                        <ul className="mt-3 divide-y text-sm">
                          {ITEMS.map((it) => (
                            <li key={it.name} className="flex items-center justify-between py-2">
                              <span>
                                {it.qty}× {it.name} <span className="text-muted-foreground">· {it.variant}</span>
                              </span>
                              <span className="tabular-nums">{brl(it.price * it.qty)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t p-4">
                  <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                    <ChevronLeft data-icon="inline-start" /> Voltar
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)}>
                      Continuar <ChevronRight data-icon="inline-end" />
                    </Button>
                  ) : (
                    <Button onClick={() => setDone(true)}>
                      <Lock data-icon="inline-start" /> Confirmar pedido
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-medium">Resumo do pedido</h3>
              <ul className="mt-4 space-y-3">
                {ITEMS.map((it) => (
                  <li key={it.name} className="flex items-center gap-3 text-sm">
                    <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                      <it.Icon className="size-5 text-white/90" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">{it.variant} · {it.qty} un.</div>
                    </div>
                    <span className="tabular-nums">{brl(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{brl(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Frete</dt>
                  <dd className="text-emerald-600">Grátis</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Desconto Pix</dt>
                    <dd className="text-emerald-600 tabular-nums">− {brl(discount)}</dd>
                  </div>
                )}
              </dl>
              <Separator className="my-4" />
              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-semibold tabular-nums">{brl(total)}</span>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Pagamento criptografado de ponta a ponta
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
