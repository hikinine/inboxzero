'use client'

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, LifeBuoy, Search, SearchX, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

interface Pergunta {
  id: string
  tema: string
  q: string
  a: string
}

const PERGUNTAS: Pergunta[] = [
  { id: 'p1', tema: 'Cobrança', q: 'Como funciona a cobrança do plano?', a: 'Mensal ou anual, no cartão, Pix ou boleto. No plano anual você paga 10 meses e usa 12. A nota fiscal sai automaticamente todo mês.' },
  { id: 'p2', tema: 'Cobrança', q: 'Posso cancelar a qualquer momento?', a: 'Sim. Não há fidelidade: cancele pelo painel e o acesso continua até o fim do período já pago.' },
  { id: 'p3', tema: 'WhatsApp', q: 'Preciso de um número novo de WhatsApp?', a: 'Não. Conectamos o número que você já usa pela API oficial da Meta, mantendo histórico e selo verificado.' },
  { id: 'p4', tema: 'WhatsApp', q: 'Quantos atendentes podem usar o mesmo número?', a: 'Quantos precisar. A cobrança é por conversa, não por cadeira, então o time inteiro pode atender junto.' },
  { id: 'p5', tema: 'Integrações', q: 'Integra com meu CRM ou e-commerce?', a: 'Sim: RD Station, Pipedrive, HubSpot, Shopify, Nuvemshop e mais de 300 apps via Zapier e API.' },
  { id: 'p6', tema: 'Integrações', q: 'Vocês têm API pública?', a: 'Temos. REST com webhooks, documentação aberta e chaves separadas por ambiente (teste e produção).' },
  { id: 'p7', tema: 'Segurança', q: 'Onde os dados ficam hospedados?', a: 'Em datacenters no Brasil (São Paulo), com criptografia em repouso e em trânsito e backups diários.' },
  { id: 'p8', tema: 'Segurança', q: 'Vocês são adequados à LGPD?', a: 'Sim. DPO nomeado, registro de operações e contrato de tratamento de dados disponíveis para todos os clientes.' },
  { id: 'p9', tema: 'IA', q: 'A IA responde sozinha os clientes?', a: 'Só o que você autorizar: dúvidas frequentes, qualificação e agendamento. Vendas e exceções vão para uma pessoa do time.' },
  { id: 'p10', tema: 'IA', q: 'A IA aprende com as minhas conversas?', a: 'Ela usa a sua base de conhecimento e as respostas aprovadas pelo time. Nada é compartilhado com outras empresas.' },
]

function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function Highlight({ text, term }: { text: string; term: string }) {
  const nText = normalize(text)
  const nTerm = normalize(term)
  if (!nTerm || nText.length !== text.length) return <>{text}</>
  const parts: ReactNode[] = []
  let cursor = 0
  let idx = nText.indexOf(nTerm)
  while (idx !== -1) {
    if (idx > cursor) parts.push(text.slice(cursor, idx))
    parts.push(
      <mark key={idx} className="rounded-sm bg-primary/15 px-0.5 text-foreground">
        {text.slice(idx, idx + nTerm.length)}
      </mark>,
    )
    cursor = idx + nTerm.length
    idx = nText.indexOf(nTerm, cursor)
  }
  if (cursor < text.length) parts.push(text.slice(cursor))
  return <>{parts}</>
}

export default function FaqComBuscaEmTempoReal() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>('p3')
  const term = query.trim()

  const results = useMemo(() => {
    if (!term) return PERGUNTAS
    const n = normalize(term)
    return PERGUNTAS.filter((p) => normalize(p.q).includes(n) || normalize(p.a).includes(n) || normalize(p.tema).includes(n))
  }, [term])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Badge variant="outline">Central de ajuda</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Qual é a sua dúvida?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Digite uma palavra e a lista filtra na hora. Se não encontrar, chama a gente.</p>
        </div>

        <InputGroup className="mx-auto mt-8 h-11 max-w-xl rounded-xl bg-background shadow-sm">
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por cobrança, WhatsApp, LGPD…" aria-label="Buscar perguntas" className="h-full text-base md:text-base" />
          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Limpar busca" onClick={() => setQuery('')}>
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <span aria-live="polite">{term ? `${results.length} de ${PERGUNTAS.length} perguntas` : `${PERGUNTAS.length} perguntas`}</span>
          <span className="hidden sm:inline">Tente: “boleto”, “API”, “LGPD”</span>
        </div>

        <div className="mt-3 space-y-2">
          <AnimatePresence initial={false}>
            {results.map((p) => {
              const isOpen = open === p.id
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className={cn('rounded-xl border bg-card transition-colors', isOpen && 'border-foreground/20')}
                >
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : p.id)} className="flex w-full items-center gap-3 px-5 py-4 text-left">
                    <span className="hidden shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline">{p.tema}</span>
                    <span className="flex-1 text-sm font-medium">
                      <Highlight text={p.q} term={term} />
                    </span>
                    <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-4 text-sm text-muted-foreground">
                      <Highlight text={p.a} term={term} />
                    </p>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {results.length === 0 && (
            <Empty className="border bg-card py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchX />
                </EmptyMedia>
                <EmptyTitle>Nenhum resultado para “{term}”</EmptyTitle>
                <EmptyDescription>Tente outra palavra ou fale direto com o time — a gente responde em minutos.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center">
                <Button variant="outline" size="sm" onClick={() => setQuery('')}>
                  Limpar busca
                </Button>
                <Button size="sm">
                  <LifeBuoy data-icon="inline-start" /> Falar com suporte
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </div>
    </section>
  )
}
