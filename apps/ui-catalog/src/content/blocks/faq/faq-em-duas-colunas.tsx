'use client'

import { MessageSquare } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const COLUMNS: Array<Array<{ id: string; q: string; a: string }>> = [
  [
    { id: 'c1', q: 'Quanto tempo leva para começar a usar?', a: 'Menos de 10 minutos. Você conecta o número, importa os contatos e já responde pela plataforma. A migração do histórico roda em segundo plano.' },
    { id: 'c2', q: 'Posso usar meu número atual de WhatsApp?', a: 'Sim. Conectamos via API oficial, mantendo número, selo verificado e histórico de conversas.' },
    { id: 'c3', q: 'Quantos atendentes posso ter?', a: 'Ilimitados em todos os planos. Cobramos por conversa, não por cadeira — adicione quem precisar.' },
    { id: 'c4', q: 'Funciona no celular?', a: 'Sim. App para iOS e Android com notificações, respostas rápidas e transferência de conversa entre atendentes.' },
  ],
  [
    { id: 'c5', q: 'Como funciona a cobrança?', a: 'Mensal ou anual, no cartão ou boleto. A nota fiscal é emitida automaticamente todo mês.' },
    { id: 'c6', q: 'Tem período de teste?', a: '14 dias grátis com todos os recursos, sem cartão de crédito. Depois você escolhe o plano que fizer sentido.' },
    { id: 'c7', q: 'Meus dados ficam seguros?', a: 'Dados hospedados no Brasil, criptografados em repouso e em trânsito. Somos adequados à LGPD e auditados anualmente.' },
    { id: 'c8', q: 'Consigo exportar tudo se cancelar?', a: 'Sim, a qualquer momento: contatos, conversas e relatórios em CSV, sem taxa e sem fidelidade.' },
  ],
]

export default function FaqEmDuasColunas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-3 text-muted-foreground">As oito dúvidas que mais chegam no chat, respondidas sem enrolação.</p>
        </div>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {COLUMNS.map((col, i) => (
            <Accordion key={i} defaultValue={i === 0 ? ['c1'] : []}>
              {col.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="py-4">{item.q}</AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border bg-muted/40 p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-background">
              <MessageSquare className="size-5 text-muted-foreground" />
            </span>
            <div>
              <p className="font-medium">Ainda com dúvida?</p>
              <p className="text-sm text-muted-foreground">Nosso time responde em minutos no horário comercial.</p>
            </div>
          </div>
          <Button variant="outline">Falar com o time</Button>
        </div>
      </div>
    </section>
  )
}
