'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ETAPAS = [
  { n: '01', titulo: 'Capture', texto: 'Formulários, WhatsApp e Instagram entram no mesmo funil, com a origem marcada desde o primeiro contato.' },
  { n: '02', titulo: 'Qualifique', texto: 'A IA pontua cada lead pelo perfil e pela conversa e avisa o vendedor quando está quente.' },
  { n: '03', titulo: 'Converta', texto: 'Proposta, assinatura eletrônica e cobrança sem sair do card do negócio.' },
  { n: '04', titulo: 'Fidelize', texto: 'NPS, renovação e upsell com lembretes automáticos no momento certo.' },
]

export default function FeaturesEmCardsNumerados() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Como funciona</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Do primeiro oi à renovação</h2>
            <p className="mt-3 text-muted-foreground">Quatro etapas cobrindo o ciclo inteiro do cliente, sem trocar de ferramenta no meio do caminho.</p>
          </div>
          <Button variant="outline" className="shrink-0">
            Ver todos os recursos <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <div key={e.n} className="flex flex-col rounded-2xl border bg-card p-6">
              <span className="text-6xl font-semibold tracking-tighter text-primary/15 tabular-nums">{e.n}</span>
              <h3 className="mt-6 text-lg font-medium">{e.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.texto}</p>
              <a href="#" className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium">
                Como funciona <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
