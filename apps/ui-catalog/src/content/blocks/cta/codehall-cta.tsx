'use client'

import { ArrowUpRight, Check } from 'lucide-react'

const CH_CTA_ITEMS = ['Conversa técnica desde o primeiro contato', 'NDA antes de qualquer detalhe sensível', 'Sem compromisso']

export default function CodehallCta() {
  return (
    <section className="w-full bg-(--acc) px-6 py-24 text-(--on-acc) [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)] [clip-path:polygon(0_0,calc(100%-72px)_0,100%_72px,100%_100%,0_100%)]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 className="text-4xl tracking-[-0.03em] sm:text-5xl">
            <span className="font-light">Tem um processo que deveria</span> <strong className="font-extrabold">se resolver sozinho?</strong>
          </h2>
          <p className="mt-5 max-w-xl opacity-80">Conte o problema em poucas linhas. A gente responde com as perguntas certas e, se fizer sentido, uma proposta de diagnóstico.</p>
        </div>
        <div className="space-y-5">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-6 pr-2 text-base font-semibold text-background transition hover:opacity-90">
            Escrever para a Codehall
            <span className="flex size-8 items-center justify-center rounded-full bg-(--acc) text-(--on-acc)">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <ul className="space-y-2 text-sm">
            {CH_CTA_ITEMS.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="size-4" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
