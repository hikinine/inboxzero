'use client'

import { Check, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PLANOS = [
  { nome: 'Starter', preco: 47, desc: 'Para autônomos e consultórios.', recursos: ['1 usuário', '1 número de WhatsApp', 'Agenda e lembretes', 'Relatórios básicos'] },
  {
    nome: 'Pro',
    preco: 147,
    desc: 'Para clínicas e pequenas equipes.',
    recursos: ['Até 10 usuários', '3 números de WhatsApp', 'Confirmação automática por IA', 'Relatórios por profissional', 'Integração com Google Agenda'],
    popular: true,
  },
  { nome: 'Business', preco: 397, desc: 'Para redes com várias unidades.', recursos: ['Usuários ilimitados', 'Números ilimitados', 'Painel consolidado por unidade', 'API e webhooks', 'Gerente de conta dedicado'] },
]

const FAQ = [
  { q: 'Posso trocar de plano depois?', a: 'Sim, a qualquer momento. O valor é ajustado proporcionalmente aos dias restantes do ciclo.' },
  { q: 'Como funciona a cobrança anual?', a: 'Você paga 12 meses de uma vez com 20% de desconto. Aceitamos Pix, boleto e cartão.' },
  { q: 'Tem taxa de implantação?', a: 'Não. O onboarding guiado está incluído em todos os planos, com migração dos seus dados.' },
  { q: 'E se eu cancelar no meio do ano?', a: 'Devolvemos o valor proporcional dos meses não usados, sem multa e sem burocracia.' },
]

export default function PricingComPlanoMaisPopularEFaq() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Um plano para cada tamanho de agenda</h2>
          <p className="mt-3 text-muted-foreground">Preços por mês, cobrados anualmente. Todos com 14 dias grátis.</p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {PLANOS.map((p) => (
            <div key={p.nome} className={`relative flex flex-col rounded-2xl border bg-card p-6 ${p.popular ? 'border-primary shadow-xl ring-1 ring-primary lg:-mt-4 lg:pt-10 lg:pb-10' : ''}`}>
              {p.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Sparkles /> Mais popular
                </Badge>
              )}
              <h3 className="text-lg font-medium">{p.nome}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tabular-nums">R$ {p.preco}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">cobrado anualmente · R$ {(p.preco * 12).toLocaleString('pt-BR')}/ano</p>
              <Button className="mt-6" variant={p.popular ? 'default' : 'outline'}>
                Testar o {p.nome} grátis
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.recursos.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-center text-xl font-semibold tracking-tight">Dúvidas sobre cobrança</h3>
          <Accordion defaultValue={[FAQ[0].q]} className="mt-6">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
