'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CreditCard, LayoutGrid, MessageCircle, Truck } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

const ITENS = [
  { value: 'vitrine', Icon: LayoutGrid, titulo: 'Vitrine que converte', texto: 'Temas responsivos, busca com filtros e coleções automáticas por estoque, margem ou sazonalidade.' },
  { value: 'checkout', Icon: CreditCard, titulo: 'Checkout em uma página', texto: 'Pix, cartão em até 12x e boleto na mesma tela. Endereço preenchido pelo CEP e cupom aplicado sem recarregar.' },
  { value: 'frete', Icon: Truck, titulo: 'Frete calculado na hora', texto: 'Correios, Jadlog e Loggi cotados ao vivo no carrinho, com regra de frete grátis por região e valor.' },
  { value: 'carrinho', Icon: MessageCircle, titulo: 'Recuperação no WhatsApp', texto: 'Carrinho abandonado vira mensagem com cupom em 2 horas. Sem template, sem copiar e colar.' },
] as const

type Chave = (typeof ITENS)[number]['value']

const PRODUTOS = [
  { nome: 'Tênis Corrida Pro', preco: 'R$ 389,90', cor: 'from-sky-500/40 to-violet-500/40' },
  { nome: 'Camiseta Dry Fit', preco: 'R$ 89,90', cor: 'from-amber-500/40 to-rose-500/40' },
  { nome: 'Garrafa Térmica 1L', preco: 'R$ 129,00', cor: 'from-emerald-500/40 to-teal-500/40' },
  { nome: 'Boné Trail', preco: 'R$ 69,90', cor: 'from-fuchsia-500/40 to-orange-500/40' },
]

const FRETES = [
  { nome: 'Correios PAC', prazo: '5 dias úteis', valor: 'R$ 18,90' },
  { nome: 'Jadlog .Package', prazo: '3 dias úteis', valor: 'R$ 24,50', escolhido: true },
  { nome: 'Loggi Expresso', prazo: 'amanhã', valor: 'R$ 31,00' },
]

function Mockup({ chave }: { chave: Chave }) {
  if (chave === 'vitrine') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {PRODUTOS.map((p) => (
          <div key={p.nome} className="overflow-hidden rounded-xl border bg-card">
            <div className={`aspect-[4/3] bg-gradient-to-br ${p.cor}`} />
            <div className="p-3">
              <div className="truncate text-xs font-medium">{p.nome}</div>
              <div className="mt-0.5 text-xs tabular-nums text-muted-foreground">{p.preco}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (chave === 'checkout') {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="text-xs font-medium">Pagamento</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          {['Pix', 'Cartão', 'Boleto'].map((m, i) => (
            <div key={m} className={`rounded-lg border px-2 py-2 text-center ${i === 0 ? 'border-primary bg-primary/5 font-medium' : 'text-muted-foreground'}`}>
              {m}
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-8 rounded-md border bg-muted/40" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 rounded-md border bg-muted/40" />
            <div className="h-8 rounded-md border bg-muted/40" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-muted-foreground">Total com 5% off no Pix</span>
          <span className="font-semibold tabular-nums">R$ 370,41</span>
        </div>
        <div className="mt-3 flex h-9 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">Pagar com Pix</div>
      </div>
    )
  }
  if (chave === 'frete') {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 flex-1 items-center rounded-md border px-3 text-xs tabular-nums">80010-000</div>
          <div className="flex h-8 items-center rounded-md border px-3 text-xs font-medium">Calcular</div>
        </div>
        <ul className="mt-3 space-y-2">
          {FRETES.map((f) => (
            <li key={f.nome} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-xs ${f.escolhido ? 'border-primary bg-primary/5' : ''}`}>
              <span className={`flex size-4 items-center justify-center rounded-full border ${f.escolhido ? 'border-primary' : ''}`}>{f.escolhido && <span className="size-2 rounded-full bg-primary" />}</span>
              <div className="flex-1">
                <div className="font-medium">{f.nome}</div>
                <div className="text-muted-foreground">{f.prazo}</div>
              </div>
              <span className="font-medium tabular-nums">{f.valor}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <MessageCircle className="size-3.5" />
          </span>
          <span className="font-medium">Loja Trilha</span>
          <span className="text-muted-foreground">· WhatsApp · 14:32</span>
        </div>
        <p className="mt-3 rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm leading-relaxed">
          Oi, Marina! Vi que o <strong>Tênis Corrida Pro</strong> ficou no seu carrinho. Quer finalizar com 10% off? Cupom <strong>VOLTA10</strong> válido até hoje.
        </p>
      </div>
      <div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm">
        <span className="text-muted-foreground">Recuperados esta semana</span>
        <Badge variant="secondary">32% · R$ 8.420</Badge>
      </div>
    </div>
  )
}

export default function FeaturesEmAccordionComMockup() {
  const [aberto, setAberto] = useState<Chave>('vitrine')
  const atual = ITENS.find((i) => i.value === aberto) ?? ITENS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Loja virtual</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Monte, venda e entregue sem sair do painel</h2>
          <Accordion
            className="mt-8"
            value={[aberto]}
            onValueChange={(v) => {
              const proximo = v[0]
              if (typeof proximo === 'string') setAberto(proximo as Chave)
            }}
          >
            {ITENS.map((i) => (
              <AccordionItem key={i.value} value={i.value}>
                <AccordionTrigger className="items-center py-4 text-base hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className={`flex size-8 items-center justify-center rounded-lg transition-colors ${aberto === i.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <i.Icon className="size-4" />
                    </span>
                    {i.titulo}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-11 text-muted-foreground">
                  {i.texto}
                  <a href="#" className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                    Saiba mais <ArrowRight className="size-3.5" />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="relative rounded-3xl border bg-muted/40 p-5 sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <atual.Icon className="size-3.5" /> {atual.titulo}
          </div>
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={aberto} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
                <Mockup chave={aberto} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
