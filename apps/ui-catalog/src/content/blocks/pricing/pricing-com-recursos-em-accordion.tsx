'use client'

import { ArrowRight, Check, Minus } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Recurso {
  nome: string
  incluso: boolean
}
interface Grupo {
  nome: string
  itens: Recurso[]
}
interface Plano {
  id: string
  nome: string
  preco: number
  desc: string
  resumo: string
  popular?: boolean
  grupos: Grupo[]
}

const PLANOS: Plano[] = [
  {
    id: 'starter',
    nome: 'Starter',
    preco: 59,
    desc: 'Para quem está começando a vender pelo WhatsApp.',
    resumo: '1 usuário · 500 contatos · 1 número',
    grupos: [
      { nome: 'Atendimento', itens: [{ nome: 'Inbox de WhatsApp', incluso: true }, { nome: 'Respostas rápidas', incluso: true }, { nome: 'Fila por equipe', incluso: false }] },
      { nome: 'Automação', itens: [{ nome: 'Boas-vindas automática', incluso: true }, { nome: 'Editor visual de fluxos', incluso: false }, { nome: 'Carrinho abandonado', incluso: false }] },
      { nome: 'Relatórios', itens: [{ nome: 'Painel básico', incluso: true }, { nome: 'Receita por origem', incluso: false }, { nome: 'Exportação para Sheets', incluso: false }] },
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    preco: 149,
    popular: true,
    desc: 'Para equipes que precisam de automação e métricas.',
    resumo: 'Até 10 usuários · 10 mil contatos · 3 números',
    grupos: [
      { nome: 'Atendimento', itens: [{ nome: 'Inbox de WhatsApp, Instagram e e-mail', incluso: true }, { nome: 'Respostas rápidas e notas internas', incluso: true }, { nome: 'Fila por equipe e rodízio', incluso: true }] },
      { nome: 'Automação', itens: [{ nome: 'Boas-vindas automática', incluso: true }, { nome: 'Editor visual de fluxos', incluso: true }, { nome: 'Carrinho abandonado', incluso: true }] },
      { nome: 'Relatórios', itens: [{ nome: 'Painel por vendedor', incluso: true }, { nome: 'Receita por origem', incluso: true }, { nome: 'Exportação para Sheets', incluso: false }] },
    ],
  },
  {
    id: 'business',
    nome: 'Business',
    preco: 399,
    desc: 'Para operações com várias unidades e integrações próprias.',
    resumo: 'Usuários ilimitados · contatos ilimitados · números ilimitados',
    grupos: [
      { nome: 'Atendimento', itens: [{ nome: 'Todos os canais, inclusive telefone', incluso: true }, { nome: 'SLA por canal com alerta', incluso: true }, { nome: 'Fila por unidade e habilidade', incluso: true }] },
      { nome: 'Automação', itens: [{ nome: 'Editor visual de fluxos', incluso: true }, { nome: 'Fluxos com IA generativa', incluso: true }, { nome: 'API e webhooks', incluso: true }] },
      { nome: 'Relatórios', itens: [{ nome: 'Painel consolidado por unidade', incluso: true }, { nome: 'Exportação para Sheets e Power BI', incluso: true }, { nome: 'Gerente de conta dedicado', incluso: true }] },
    ],
  },
]

export default function PricingComRecursosEmAccordion() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Planos sem letra miúda</h2>
            <p className="mt-3 text-muted-foreground">Abra cada plano para ver exatamente o que entra e o que fica de fora.</p>
          </div>
          <p className="text-sm text-muted-foreground">Preços por mês, cobrados anualmente.</p>
        </div>

        <Accordion multiple defaultValue={['pro']} className="mt-10 rounded-2xl border bg-card">
          {PLANOS.map((p) => (
            <AccordionItem key={p.id} value={p.id} className={`px-6 sm:px-8 ${p.popular ? 'bg-muted/30' : ''}`}>
              <AccordionTrigger className="items-center gap-4 py-5 hover:no-underline">
                <span className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex flex-col">
                    <span className="flex items-center gap-2 text-base font-semibold">
                      {p.nome}
                      {p.popular && <Badge>Mais popular</Badge>}
                    </span>
                    <span className="mt-0.5 text-sm font-normal text-muted-foreground">{p.desc}</span>
                  </span>
                  <span className="flex items-baseline gap-1 sm:pr-4">
                    <span className="text-2xl font-semibold tabular-nums">R$ {p.preco}</span>
                    <span className="text-xs font-normal text-muted-foreground">/mês</span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-xs text-muted-foreground">{p.resumo}</p>
                <div className="mt-4 grid gap-6 sm:grid-cols-3">
                  {p.grupos.map((g) => (
                    <div key={g.nome}>
                      <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{g.nome}</div>
                      <ul className="mt-2 space-y-2 text-sm">
                        {g.itens.map((i) => (
                          <li key={i.nome} className={`flex items-start gap-2 ${i.incluso ? '' : 'text-muted-foreground/70'}`}>
                            {i.incluso ? <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> : <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />}
                            <span className={i.incluso ? '' : 'line-through'}>{i.nome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button variant={p.popular ? 'default' : 'outline'}>
                    Assinar o {p.nome} <ArrowRight data-icon="inline-end" />
                  </Button>
                  <span className="text-xs text-muted-foreground">14 dias grátis · cancele quando quiser</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
