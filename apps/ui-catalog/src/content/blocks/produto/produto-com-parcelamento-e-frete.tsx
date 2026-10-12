'use client'

import { useState } from 'react'
import { Check, ChevronDown, Coffee, CreditCard, QrCode, ShieldCheck, ShoppingCart, Star, Store, Truck, Zap, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const PRICE = 1290
const PIX_OFF = 0.08
const NO_INTEREST_UNTIL = 6
const MONTHLY_RATE = 0.0199
const MAX_INSTALLMENTS = 12
const VIEWS = [
  { label: 'Frente', gradient: 'from-amber-300 to-orange-600' },
  { label: 'Lateral', gradient: 'from-orange-400 to-amber-700' },
  { label: 'Painel', gradient: 'from-stone-500 to-stone-800' },
  { label: 'Na bancada', gradient: 'from-amber-200 to-amber-500' },
]
const SPECS = ['Pressão de 19 bar', 'Moedor cônico integrado', 'Vaporizador de leite', 'Reservatório de 1,8 L', 'Aquecimento em 25 s', 'Bivolt automático']

interface Shipping {
  id: string
  label: string
  eta: string
  price: number
  Icon: LucideIcon
}

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function installment(n: number) {
  if (n <= NO_INTEREST_UNTIL) return { n, value: PRICE / n, total: PRICE, interest: false }
  const total = PRICE * Math.pow(1 + MONTHLY_RATE, n - NO_INTEREST_UNTIL)
  return { n, value: total / n, total, interest: true }
}
const INSTALLMENTS = Array.from({ length: MAX_INSTALLMENTS }, (_, i) => installment(i + 1))

const maskCep = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

function shippingFor(cep: string): Shipping[] {
  const far = Number(cep[0] ?? '0') >= 5
  return [
    { id: 'retirada', label: 'Retirar na loja', eta: 'Hoje, a partir das 16h · Pinheiros, SP', price: 0, Icon: Store },
    { id: 'economica', label: 'Entrega econômica', eta: far ? '7 a 10 dias úteis' : '3 a 5 dias úteis', price: far ? 29.9 : 0, Icon: Truck },
    { id: 'expressa', label: 'Entrega expressa', eta: far ? '2 a 3 dias úteis' : 'Chega amanhã', price: far ? 49.9 : 24.9, Icon: Zap },
  ]
}

export default function ProdutoComParcelamentoEFrete() {
  const [n, setN] = useState(6)
  const [cep, setCep] = useState('')
  const [options, setOptions] = useState<Shipping[] | null>(null)
  const [shipping, setShipping] = useState('economica')
  const [tableOpen, setTableOpen] = useState(false)

  const current = installment(n)
  const pix = PRICE * (1 - PIX_OFF)
  const digits = cep.replace(/\D/g, '')
  const chosen = options?.find((o) => o.id === shipping) ?? null
  const total = current.total + (chosen?.price ?? 0)

  const calc = () => {
    if (digits.length === 8) setOptions(shippingFor(digits))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 via-orange-400 to-amber-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-48 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Coffee className="size-24 text-white/95" strokeWidth={1.1} />
              </div>
            </div>
            <Badge variant="secondary" className="absolute left-4 top-4">Mais vendida da categoria</Badge>
            <span className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">Garantia de 2 anos</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {VIEWS.map((v) => (
              <div key={v.label} className={cn('flex aspect-[4/3] items-end justify-start rounded-xl bg-gradient-to-br p-2 text-[11px] font-medium text-white/90', v.gradient)}>
                {v.label}
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">Cafeteiras · Espresso</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Cafeteira Kaffa Espresso Pro</h2>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-0.5" aria-label="Nota 4,9 de 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
              ))}
            </span>
            <span className="font-medium">4,9</span>
            <a href="#" className="text-muted-foreground underline-offset-4 hover:underline">148 avaliações</a>
            <span className="text-muted-foreground">· 1.2 mil vendidas</span>
          </div>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Espresso de cafeteria em casa: moedor integrado, extração a 19 bar e vaporizador para leite cremoso. Aquece em 25 segundos e desliga sozinha.
          </p>
          <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
            {SPECS.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="size-3" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <QrCode className="size-3.5" /> 8% de desconto no Pix
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tabular-nums">{brl(pix)}</span>
              <span className="text-sm text-muted-foreground">no Pix</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              ou <span className="font-medium text-foreground tabular-nums">{brl(PRICE)}</span> em até {NO_INTEREST_UNTIL}x sem juros
            </p>

            <Separator className="my-5" />

            <Label htmlFor="pf-parcelas" className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" /> Parcelamento no cartão
            </Label>
            <NativeSelect id="pf-parcelas" className="mt-2 w-full" value={String(n)} onChange={(e) => setN(Number(e.target.value))}>
              {INSTALLMENTS.map((p) => (
                <NativeSelectOption key={p.n} value={String(p.n)}>
                  {p.n}x de {brl(p.value)} {p.interest ? 'com juros' : 'sem juros'}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Total no cartão: <span className="font-medium text-foreground tabular-nums">{brl(current.total)}</span>
              </span>
              {current.interest ? <span className="tabular-nums">1,99% a.m.</span> : <Badge variant="outline">Sem juros</Badge>}
            </div>
            <Collapsible open={tableOpen} onOpenChange={setTableOpen} className="mt-3">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
                Ver tabela de parcelas
                <ChevronDown className={cn('size-3.5 text-muted-foreground transition-transform', tableOpen && 'rotate-180')} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="mt-2 grid grid-cols-2 gap-x-5 rounded-lg border bg-muted/30 px-3 py-2 text-xs">
                  {INSTALLMENTS.map((p) => (
                    <li key={p.n} className={cn('flex justify-between py-0.5 tabular-nums', p.n === n ? 'font-semibold text-foreground' : p.interest ? 'text-muted-foreground' : 'text-foreground')}>
                      <span>{p.n}x</span>
                      <span>{brl(p.value)}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="my-5" />

            <Label htmlFor="pf-cep" className="flex items-center gap-2">
              <Truck className="size-4 text-muted-foreground" /> Calcular frete e prazo
            </Label>
            <InputGroup className="mt-2">
              <InputGroupInput
                id="pf-cep"
                inputMode="numeric"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => {
                  setCep(maskCep(e.target.value))
                  setOptions(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    calc()
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs" variant="secondary" disabled={digits.length !== 8} onClick={calc}>
                  Calcular
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {options ? (
              <RadioGroup value={shipping} onValueChange={(v) => setShipping(String(v))} className="mt-3 gap-2">
                {options.map((o) => (
                  <Label
                    key={o.id}
                    htmlFor={`pf-frete-${o.id}`}
                    className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm font-normal transition-colors', shipping === o.id && 'border-primary bg-primary/5')}
                  >
                    <RadioGroupItem id={`pf-frete-${o.id}`} value={o.id} />
                    <o.Icon className="size-4 text-muted-foreground" />
                    <span className="flex-1">
                      <span className="font-medium">{o.label}</span>
                      <span className="block text-xs text-muted-foreground">{o.eta}</span>
                    </span>
                    <span className={cn('text-sm font-medium tabular-nums', o.price === 0 && 'text-emerald-600')}>{o.price === 0 ? 'Grátis' : brl(o.price)}</span>
                  </Label>
                ))}
              </RadioGroup>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                Digite seu CEP para ver as opções de entrega.{' '}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">Não sei meu CEP</a>
              </p>
            )}

            <Separator className="my-5" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total estimado{chosen ? ` · ${chosen.label.toLowerCase()}` : ''}</span>
              <span className="text-lg font-semibold tabular-nums">{brl(total)}</span>
            </div>
            <Button size="lg" className="mt-4 w-full">
              <ShoppingCart data-icon="inline-start" /> Adicionar ao carrinho
            </Button>
            <Button size="lg" variant="outline" className="mt-2 w-full">
              Comprar no Pix · {brl(pix)}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" /> Compra protegida · troca grátis em 30 dias
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
