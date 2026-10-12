'use client'

import type { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

const PLANOS = [
  { id: 'starter', titulo: 'Starter', preco: 'R$ 49/mês', texto: '1 número de WhatsApp, até 1.000 contatos e automações básicas. Ideal para começar.', destaque: false },
  { id: 'pro', titulo: 'Pro', preco: 'R$ 149/mês', texto: '3 números, contatos ilimitados, automações com IA e relatórios por canal.', destaque: true },
  { id: 'business', titulo: 'Business', preco: 'Sob consulta', texto: 'Números ilimitados, SLA de suporte, SSO e gerente de conta dedicado.', destaque: false },
]

type Status = 'Concluído' | 'Em andamento' | 'Pendente'
const ETAPAS: { id: string; titulo: string; texto: string; status: Status }[] = [
  { id: 'conta', titulo: '1. Criar a conta', texto: 'Cadastre-se com e-mail ou Google. Leva menos de um minuto.', status: 'Concluído' },
  { id: 'numero', titulo: '2. Conectar o número', texto: 'Escaneie o QR code no WhatsApp Business e pronto.', status: 'Em andamento' },
  { id: 'equipe', titulo: '3. Convidar a equipe', texto: 'Adicione atendentes e defina quem responde cada fila.', status: 'Pendente' },
]

const STATUS_CLASSE: Record<Status, string> = {
  Concluído: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  'Em andamento': 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
  Pendente: 'bg-muted text-muted-foreground',
}

export default function AccordionEmCards() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Cards com borda</Legenda>
        <Accordion defaultValue={['pro']} className="gap-2">
          {PLANOS.map((p) => (
            <AccordionItem key={p.id} value={p.id} className="rounded-xl border bg-card px-4 transition-colors data-open:border-primary/50">
              <AccordionTrigger className="py-3 hover:no-underline">
                <span className="flex flex-1 items-center justify-between gap-2 pr-2">
                  <span className="flex items-center gap-2">
                    {p.titulo}
                    {p.destaque && <Badge>Popular</Badge>}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">{p.preco}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{p.texto}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <Legenda>Cards com fundo ao abrir</Legenda>
        <Accordion multiple defaultValue={['numero']} className="gap-2">
          {ETAPAS.map((e) => (
            <AccordionItem key={e.id} value={e.id} className="rounded-xl border px-4 transition-colors data-open:bg-muted/50">
              <AccordionTrigger className="py-3">
                <span className="flex flex-1 items-center justify-between gap-2 pr-2">
                  {e.titulo}
                  <Badge className={STATUS_CLASSE[e.status]}>{e.status}</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{e.texto}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
