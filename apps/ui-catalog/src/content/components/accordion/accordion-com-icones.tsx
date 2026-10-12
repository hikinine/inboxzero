'use client'

import type { ReactNode } from 'react'
import { CreditCard, RefreshCcw, ShieldCheck, Truck, type LucideIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

interface Item {
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  conteudo: string
  badge?: string
}

const ITENS: Item[] = [
  {
    id: 'pagamento',
    icon: CreditCard,
    titulo: 'Pagamentos',
    descricao: 'Pix, cartão e boleto',
    conteudo: 'Aceitamos Pix com 5% de desconto, cartão em até 12x sem juros e boleto com compensação em 1 dia útil.',
  },
  {
    id: 'entrega',
    icon: Truck,
    titulo: 'Entrega',
    descricao: 'Prazos e frete grátis',
    conteudo: 'Frete grátis acima de R$ 299. Capitais recebem em até 2 dias úteis; demais regiões, em até 5.',
    badge: 'Novo',
  },
  {
    id: 'trocas',
    icon: RefreshCcw,
    titulo: 'Trocas e devoluções',
    descricao: '7 dias sem custo',
    conteudo: 'Solicite pelo painel em até 7 dias corridos. Geramos a etiqueta reversa e o reembolso sai em até 3 dias úteis.',
  },
  {
    id: 'seguranca',
    icon: ShieldCheck,
    titulo: 'Segurança',
    descricao: 'Dados protegidos',
    conteudo: 'Pagamentos processados com criptografia e antifraude. Nunca armazenamos os dados completos do cartão.',
  },
]

export default function AccordionComIcones() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Ícone em caixa com descrição</Legenda>
        <Accordion defaultValue={['entrega']}>
          {ITENS.map((i) => {
            const Icon = i.icon
            return (
              <AccordionItem key={i.id} value={i.id}>
                <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                  </span>
                  <span className="flex flex-1 flex-col items-start gap-0.5">
                    <span className="flex items-center gap-2">
                      {i.titulo}
                      {i.badge && <Badge variant="secondary">{i.badge}</Badge>}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">{i.descricao}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-12 text-muted-foreground">{i.conteudo}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <div>
        <Legenda>Compacto, ícone à esquerda</Legenda>
        <Accordion className="rounded-xl border px-3">
          {ITENS.slice(0, 3).map((i) => {
            const Icon = i.icon
            return (
              <AccordionItem key={i.id} value={i.id}>
                <AccordionTrigger className="items-center gap-2">
                  <Icon className="size-4 text-primary" />
                  {i.titulo}
                </AccordionTrigger>
                <AccordionContent className="pl-6 text-muted-foreground">{i.conteudo}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
