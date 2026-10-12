'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Barcode, Coffee, CreditCard, Headphones, Lock, QrCode, Truck, Watch, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type Payment = 'cartao' | 'pix' | 'boleto'
const PAYMENTS: Array<{ value: Payment; label: string; Icon: LucideIcon }> = [
  { value: 'cartao', label: 'Cartão', Icon: CreditCard },
  { value: 'pix', label: 'Pix', Icon: QrCode },
  { value: 'boleto', label: 'Boleto', Icon: Barcode },
]
const ITEMS = [
  { name: 'Fone Aero Buds 2', variant: 'Preto', price: 399.9, qty: 1, Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { name: 'Relógio Pulse Fit', variant: '44 mm', price: 649.9, qty: 1, Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
  { name: 'Cápsulas Kaffa Intenso', variant: 'Caixa com 10', price: 34.9, qty: 2, Icon: Coffee, gradient: 'from-amber-300 to-orange-600' },
]
const UFS = ['SP', 'RJ', 'MG', 'PR', 'RS', 'SC', 'BA', 'PE', 'CE', 'DF']
const SHIPPING = 19.9

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="flex items-center gap-3 font-medium">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{n}</span>
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  )
}

export default function CheckoutEmPaginaUnica() {
  const [payment, setPayment] = useState<Payment>('cartao')
  const [save, setSave] = useState(true)
  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = payment === 'pix' ? subtotal * 0.05 : 0
  const total = subtotal - discount + SHIPPING

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight">Checkout</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="size-3.5" /> Ambiente seguro
          </p>
        </div>

        <form
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-6">
            <Section n={1} title="Contato">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="rafael.souza@exemplo.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" type="tel" defaultValue="(11) 98765-4321" inputMode="tel" />
                </div>
              </div>
            </Section>

            <Section n={2} title="Endereço de entrega">
              <div className="grid gap-4 sm:grid-cols-6">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" defaultValue="30130-010" inputMode="numeric" />
                </div>
                <div className="space-y-1.5 sm:col-span-4">
                  <Label htmlFor="rua">Rua</Label>
                  <Input id="rua" defaultValue="Rua da Bahia" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" defaultValue="1148" />
                </div>
                <div className="space-y-1.5 sm:col-span-4">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Apto, bloco…" />
                </div>
                <div className="space-y-1.5 sm:col-span-4">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" defaultValue="Belo Horizonte" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="uf">Estado</Label>
                  <NativeSelect id="uf" defaultValue="MG" className="w-full">
                    {UFS.map((uf) => (
                      <NativeSelectOption key={uf} value={uf}>{uf}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="size-4" /> Entrega padrão · 2 a 4 dias úteis · {brl(SHIPPING)}
              </p>
            </Section>

            <Section n={3} title="Pagamento">
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as Payment)} className="grid-cols-3 gap-3">
                {PAYMENTS.map((p) => (
                  <Label
                    key={p.value}
                    htmlFor={`pg-${p.value}`}
                    className={cn('flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm transition-colors', payment === p.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50')}
                  >
                    <RadioGroupItem id={`pg-${p.value}`} value={p.value} className="sr-only" />
                    <p.Icon className="size-5" />
                    {p.label}
                  </Label>
                ))}
              </RadioGroup>

              {payment === 'cartao' && (
                <div className="mt-4 grid gap-4 sm:grid-cols-4">
                  <div className="space-y-1.5 sm:col-span-4">
                    <Label htmlFor="cc-num">Número do cartão</Label>
                    <Input id="cc-num" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="cc-nome">Nome impresso</Label>
                    <Input id="cc-nome" placeholder="Como está no cartão" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cc-val">Validade</Label>
                    <Input id="cc-val" placeholder="MM/AA" inputMode="numeric" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cc-cvv">CVV</Label>
                    <Input id="cc-cvv" placeholder="123" inputMode="numeric" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="cc-parc">Parcelas</Label>
                    <NativeSelect id="cc-parc" defaultValue="3" className="w-full">
                      {[1, 2, 3, 6, 10].map((n) => (
                        <NativeSelectOption key={n} value={String(n)}>
                          {n}x de {brl(total / n)} sem juros
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>
              )}
              {payment === 'pix' && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-dashed p-4">
                  <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <QrCode className="size-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">O QR Code é gerado ao confirmar e vale por 30 minutos. <span className="font-medium text-emerald-600">5% de desconto</span> aplicado.</p>
                </div>
              )}
              {payment === 'boleto' && <p className="mt-4 text-sm text-muted-foreground">O boleto vence em 2 dias úteis e o pedido é enviado após a compensação bancária.</p>}

              <div className="mt-5 flex items-center gap-2">
                <Checkbox id="salvar" checked={save} onCheckedChange={(on) => setSave(on)} />
                <Label htmlFor="salvar" className="font-normal">Salvar meus dados para a próxima compra</Label>
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-medium">Seu pedido</h3>
              <ul className="mt-4 space-y-3">
                {ITEMS.map((it) => (
                  <li key={it.name} className="flex items-center gap-3 text-sm">
                    <div className={cn('relative flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', it.gradient)}>
                      <it.Icon className="size-5 text-white/90" />
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">{it.qty}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">{it.variant}</div>
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
                  <dd className="tabular-nums">{brl(SHIPPING)}</dd>
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
              <Button type="submit" className="mt-4 w-full" size="lg">
                <Lock data-icon="inline-start" /> Pagar {brl(total)}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Ao pagar, você concorda com os termos e a política de privacidade.</p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}
