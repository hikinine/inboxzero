'use client'

import { useState } from 'react'
import { Check, Coffee, ShoppingCart, Star, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const HIGHLIGHTS = ['Aquecimento em 25 segundos', 'Café moído ou cápsulas compatíveis', 'Vaporizador de leite em aço inox', 'Desligamento automático']
const SPECS: Array<[string, string]> = [
  ['Pressão', '20 bar'],
  ['Potência', '1.350 W'],
  ['Reservatório', '1,4 L'],
  ['Voltagem', '127 V ou 220 V'],
  ['Dimensões', '30 × 15 × 32 cm'],
  ['Peso', '4,2 kg'],
  ['Garantia', '24 meses'],
  ['Acabamento', 'Inox escovado'],
]
const BOX = ['Cafeteira Espresso Pro', 'Porta-filtro com 2 peneiras', 'Medidor com tamper', 'Jarra de leite 350 ml', 'Manual em português']
const REVIEWS = [
  { name: 'Juliana Prado', initials: 'JP', rating: 5, date: '02/10/2026', text: 'Crema espessa e temperatura certa logo no primeiro uso. Troquei a cápsula por café moído e o resultado ficou ainda melhor.' },
  { name: 'Ricardo Nunes', initials: 'RN', rating: 4, date: '27/09/2026', text: 'Excelente custo-benefício. O vaporizador demora um pouco para aquecer, mas o leite fica cremoso.' },
  { name: 'Camila Ferraz', initials: 'CF', rating: 5, date: '15/09/2026', text: 'Compacta, bonita e fácil de limpar. Cabe perfeitamente na minha bancada pequena.' },
]
const VOLTAGES = ['127 V', '220 V'] as const
const PRICE = 1290

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('flex items-center gap-0.5', className)} aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-3.5', i < value ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

export default function ProdutoComAbasDeDetalhes() {
  const [voltage, setVoltage] = useState<(typeof VOLTAGES)[number]>('127 V')
  const [added, setAdded] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 dark:from-amber-950 dark:via-orange-950 dark:to-stone-900">
            <Badge className="absolute left-4 top-4">
              <Zap data-icon="inline-start" /> Lançamento
            </Badge>
            <div className="absolute inset-0 flex items-center justify-center">
              <Coffee className="size-36 text-amber-700/80 dark:text-amber-300/70" strokeWidth={1} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Cozinha · Cafeteiras</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Cafeteira Espresso Pro 20 bar</h2>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Stars value={5} className="[&_svg]:size-4" />
              <span className="font-medium">4,9</span>
              <span className="text-muted-foreground">· 148 avaliações</span>
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold tabular-nums">{brl(PRICE)}</span>
              <span className="text-sm text-muted-foreground">em até 10x de {brl(PRICE / 10)} sem juros</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600" /> {h}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="text-sm font-medium">Voltagem</div>
              <div className="mt-2 flex gap-2">
                {VOLTAGES.map((v) => (
                  <Button key={v} type="button" variant={voltage === v ? 'default' : 'outline'} size="sm" aria-pressed={voltage === v} onClick={() => setVoltage(v)}>
                    {v}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={() => setAdded(true)}>
                {added ? <Check data-icon="inline-start" /> : <ShoppingCart data-icon="inline-start" />}
                {added ? 'No carrinho' : 'Adicionar ao carrinho'}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">Comprar agora</Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Em estoque · envio em até 24h · versão {voltage} selecionada</p>
          </div>
        </div>

        <Separator className="my-12" />

        <Tabs defaultValue="descricao">
          <TabsList variant="line" className="w-full justify-start border-b">
            <TabsTrigger value="descricao" className="flex-none px-3">Descrição</TabsTrigger>
            <TabsTrigger value="especificacoes" className="flex-none px-3">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes" className="flex-none px-3">
              Avaliações <Badge variant="secondary" className="ml-1">148</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="descricao" className="pt-6">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  A Espresso Pro combina bomba de 20 bar com termobloco de aquecimento rápido: em 25 segundos a máquina está pronta para extrair um espresso
                  de crema densa e aroma intenso. O porta-filtro em aço aceita café moído ou cápsulas compatíveis, e o vaporizador entrega microespuma para
                  cappuccinos e lattes.
                </p>
                <p>
                  O painel com três botões (espresso, lungo e vapor) dispensa manual. Bandeja removível, reservatório de 1,4 L com acesso frontal e
                  desligamento automático após 9 minutos sem uso.
                </p>
              </div>
              <div className="rounded-xl border bg-muted/40 p-5 text-sm">
                <div className="font-medium">O que vem na caixa</div>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {BOX.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-foreground/50" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="especificacoes" className="pt-6">
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>

          <TabsContent value="avaliacoes" className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <article key={r.name} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{r.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                  </div>
                  <Stars value={r.rating} className="mt-3" />
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
