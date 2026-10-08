'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const QA = [
  ['Preciso de um número novo de WhatsApp?', 'Não. Conectamos o número que você já usa, via API oficial, mantendo o histórico e o selo verificado.'],
  ['A IA responde sozinha?', 'Só o que você autorizar. Ela pode responder dúvidas frequentes, qualificar e agendar; vendas e exceções vão para o humano.'],
  ['Posso importar meus contatos?', 'Sim, por CSV ou integração. Tags, origem e campos personalizados vêm junto.'],
  ['Tem fidelidade?', 'Nenhuma. Planos mensais ou anuais, cancela quando quiser e exporta tudo.'],
  ['Funciona para mais de uma empresa?', 'Sim. Workspaces separados com usuários, números e relatórios independentes.'],
]

export default function FaqAcordeao() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Perguntas frequentes</h2>
          <p className="mt-3 text-muted-foreground">Não achou? Fale com a gente — resposta em minutos no horário comercial.</p>
          <Button variant="outline" className="mt-5">
            Falar com suporte
          </Button>
        </div>
        <Accordion defaultValue={[QA[0]![0]]}>
          {QA.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
