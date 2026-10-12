'use client'

import { useState } from 'react'
import { Check, ChevronRight, CreditCard, Lock, QrCode, Receipt, ShieldCheck, Tag, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

const ITEMS = [
  { n: 'Jogo de xícaras Serra', v: 'Esmalte verde-musgo · 4 un.', p: 189, q: 1, tone: 'from-emerald-700 to-emerald-900' },
  { n: 'Vaso Maré 22 cm', v: 'Branco areia', p: 240, q: 1, tone: 'from-stone-300 to-stone-500' },
  { n: 'Prato raso Terra', v: 'Terracota · 6 un.', p: 312, q: 2, tone: 'from-orange-600 to-orange-900' },
]
const SHIPPING = [
  { id: 'pac', t: 'PAC', d: '6 a 9 dias úteis', p: 24.9 },
  { id: 'sedex', t: 'Sedex', d: '2 a 3 dias úteis', p: 49.9 },
  { id: 'retirada', t: 'Retirar no ateliê', d: 'Vila Madalena, São Paulo · a partir de amanhã', p: 0 },
]
const PAYMENT = [
  { id: 'cartao', Icon: CreditCard, t: 'Cartão de crédito', d: 'Até 6x sem juros' },
  { id: 'pix', Icon: QrCode, t: 'Pix', d: '5% de desconto · aprovação imediata' },
  { id: 'boleto', Icon: Receipt, t: 'Boleto', d: 'Compensa em até 2 dias úteis' },
]
const STEPS = ['Carrinho', 'Entrega', 'Pagamento']
const money = (v: number) => `R$ ${v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

function SectionTitle({ n, t }: { n: number; t: string }) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-xs text-background">{n}</span>
      {t}
    </h2>
  )
}

function CheckoutHeader() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-serif text-xl font-semibold tracking-tight">
          Casa Mina
        </a>
        <ol className="hidden items-center gap-2 text-sm md:flex">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 ${i === 1 ? 'font-medium text-foreground' : i < 1 ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                {i < 1 && <Check className="size-3.5 text-emerald-500" />}
                {s}
              </span>
              {i < STEPS.length - 1 && <ChevronRight className="size-3.5 text-muted-foreground/50" />}
            </li>
          ))}
        </ol>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5" /> Compra segura
        </span>
      </div>
    </header>
  )
}

export default function PaginaDeCheckout() {
  const [ship, setShip] = useState('sedex')
  const [pay, setPay] = useState('cartao')
  const [coupon, setCoupon] = useState('')
  const [couponOk, setCouponOk] = useState(false)

  const subtotal = ITEMS.reduce((s, i) => s + i.p * i.q, 0)
  const frete = SHIPPING.find((s) => s.id === ship)?.p ?? 0
  const descontoPix = pay === 'pix' ? subtotal * 0.05 : 0
  const descontoCupom = couponOk ? 50 : 0
  const total = subtotal + frete - descontoPix - descontoCupom

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <CheckoutHeader />
      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_400px]">
        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          <section className="space-y-4">
            <SectionTitle n={1} t="Contato" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="co-email">E-mail</Label>
                <Input id="co-email" type="email" placeholder="voce@email.com" defaultValue="marina.castro@gmail.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-tel">Celular</Label>
                <Input id="co-tel" placeholder="(11) 99999-0000" defaultValue="(11) 98877-1020" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="co-news" defaultChecked />
              <Label htmlFor="co-news" className="font-normal text-muted-foreground">
                Quero receber novidades e lançamentos do ateliê
              </Label>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle n={2} t="Entrega" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="co-nome">Nome</Label>
                <Input id="co-nome" defaultValue="Marina" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-sobrenome">Sobrenome</Label>
                <Input id="co-sobrenome" defaultValue="Castro" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-cpf">CPF</Label>
                <Input id="co-cpf" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-cep">CEP</Label>
                <Input id="co-cep" placeholder="00000-000" defaultValue="05433-000" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="co-end">Endereço</Label>
                <Input id="co-end" defaultValue="Rua Harmonia" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-num">Número</Label>
                <Input id="co-num" defaultValue="452" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-comp">Complemento</Label>
                <Input id="co-comp" placeholder="Apto, bloco…" defaultValue="Apto 31" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-cidade">Cidade</Label>
                <Input id="co-cidade" defaultValue="São Paulo" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-uf">Estado</Label>
                <NativeSelect id="co-uf" defaultValue="SP" className="w-full">
                  {['SP', 'RJ', 'MG', 'PR', 'SC', 'RS', 'BA', 'PE', 'CE', 'DF'].map((uf) => (
                    <NativeSelectOption key={uf} value={uf}>
                      {uf}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <RadioGroup value={ship} onValueChange={(v) => setShip(String(v))} className="gap-3 pt-2">
              {SHIPPING.map((s) => (
                <label key={s.id} htmlFor={`ship-${s.id}`} className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors has-data-checked:border-foreground has-data-checked:bg-muted/40">
                  <RadioGroupItem value={s.id} id={`ship-${s.id}`} />
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Truck className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{s.t}</span>
                    <span className="block text-xs text-muted-foreground">{s.d}</span>
                  </span>
                  <span className="text-sm font-medium tabular-nums">{s.p === 0 ? 'Grátis' : money(s.p)}</span>
                </label>
              ))}
            </RadioGroup>
          </section>

          <section className="space-y-4">
            <SectionTitle n={3} t="Pagamento" />
            <RadioGroup value={pay} onValueChange={(v) => setPay(String(v))} className="gap-3">
              {PAYMENT.map((p) => (
                <label key={p.id} htmlFor={`pay-${p.id}`} className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors has-data-checked:border-foreground has-data-checked:bg-muted/40">
                  <RadioGroupItem value={p.id} id={`pay-${p.id}`} />
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <p.Icon className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{p.t}</span>
                    <span className="block text-xs text-muted-foreground">{p.d}</span>
                  </span>
                  {p.id === 'pix' && <Badge variant="secondary">-5%</Badge>}
                </label>
              ))}
            </RadioGroup>
            {pay === 'cartao' && (
              <div className="grid gap-4 rounded-xl border bg-muted/30 p-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="co-card">Número do cartão</Label>
                  <Input id="co-card" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="co-card-nome">Nome impresso</Label>
                  <Input id="co-card-nome" placeholder="Como está no cartão" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-val">Validade</Label>
                  <Input id="co-val" placeholder="MM/AA" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-cvv">CVV</Label>
                  <Input id="co-cvv" placeholder="123" inputMode="numeric" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="co-parc">Parcelas</Label>
                  <NativeSelect id="co-parc" defaultValue="3" className="w-full">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <NativeSelectOption key={n} value={String(n)}>
                        {n}x de {money(total / n)} sem juros
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
              </div>
            )}
            {pay === 'pix' && <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">O QR code aparece depois de confirmar o pedido e vale por 30 minutos.</p>}
            {pay === 'boleto' && <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">O boleto é gerado na próxima tela. O pedido é separado após a compensação.</p>}
          </section>

          <Button type="submit" size="lg" className="w-full">
            <Lock data-icon="inline-start" /> Finalizar compra · {money(total)}
          </Button>
        </form>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold tracking-tight">Resumo do pedido</h2>
            <ul className="mt-5 space-y-4">
              {ITEMS.map((i) => (
                <li key={i.n} className="flex items-center gap-3">
                  <span className={`relative size-14 shrink-0 rounded-xl bg-gradient-to-br ${i.tone}`}>
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">{i.q}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{i.n}</span>
                    <span className="block text-xs text-muted-foreground">{i.v}</span>
                  </span>
                  <span className="text-sm tabular-nums">{money(i.p * i.q)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-5 h-px w-full" />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Cupom" className="pl-8 uppercase" value={coupon} onChange={(e) => setCoupon(e.target.value)} aria-label="Cupom de desconto" />
              </div>
              <Button type="button" variant="outline" onClick={() => setCouponOk(coupon.trim().toUpperCase() === 'MINA50')}>
                Aplicar
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{couponOk ? 'Cupom MINA50 aplicado: R$ 50 de desconto.' : 'Dica: experimente MINA50.'}</p>
            <Separator className="my-5 h-px w-full" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Frete</dt>
                <dd className="tabular-nums">{frete === 0 ? 'Grátis' : money(frete)}</dd>
              </div>
              {descontoPix > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <dt>Desconto Pix</dt>
                  <dd className="tabular-nums">- {money(descontoPix)}</dd>
                </div>
              )}
              {descontoCupom > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <dt>Cupom</dt>
                  <dd className="tabular-nums">- {money(descontoCupom)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums">{money(total)}</dd>
              </div>
            </dl>
            <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-3.5" /> Peças embaladas à mão, com seguro contra quebra
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5" /> Troca grátis em até 30 dias
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}
