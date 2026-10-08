'use client'

import { ArrowUpRight, Check, Sparkles } from 'lucide-react'

const CH_PLANS = [
  { tag: 'Recomendado para começar', t: 'Sprint de diagnóstico', d: 'Escopo e preço fechados. Duas semanas para sair com viabilidade, arquitetura e estimativa.', items: ['Entrevistas e análise de dados', 'Protótipo navegável', 'ROI e custo de IA estimados'], featured: true },
  { tag: 'Produto definido', t: 'Escopo fechado', d: 'Marcos, entregas e critérios de aceite claros. Ideal logo depois do diagnóstico.', items: ['Demo a cada quinze dias', 'Garantia pós-entrega', 'Código e documentação entregues'] },
  { tag: 'Roadmap contínuo', t: 'Squad dedicado', d: 'Engenharia, IA, produto e design alocados ao seu roadmap, com cadência semanal.', items: ['Time multidisciplinar', 'Escala conforme a demanda', 'Relatório mensal de métricas'] },
  { tag: 'Já está no ar', t: 'Operação e sustentação', d: 'Monitoramento, evolução e SLA para sistemas em produção — nossos ou de terceiros.', items: ['Plantão e SLA', 'Alertas de regressão de qualidade', 'Otimização de custo de IA'] },
]

export default function CodehallContratacao() {
  return (
    <section className="w-full bg-muted/40 px-6 py-24 [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" /> Modelos de contratação
            </p>
            <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
              <span className="font-light">Quatro formas de</span> <strong className="font-extrabold">começar.</strong>
            </h2>
          </div>
          <p className="text-muted-foreground">Comece pequeno, com escopo e preço fechados. Se fizer sentido, a gente segue junto no formato que encaixar melhor no seu momento.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CH_PLANS.map((p) => (
            <article key={p.t} className={`flex flex-col gap-4 rounded-[20px] border p-6 ${p.featured ? 'border-foreground bg-foreground text-background' : 'bg-card'}`}>
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${p.featured ? 'bg-(--acc) text-(--on-acc)' : 'bg-muted text-muted-foreground'}`}>{p.tag}</span>
              <h3 className="text-2xl font-bold tracking-tight">{p.t}</h3>
              <p className={`text-sm ${p.featured ? 'text-background/70' : 'text-muted-foreground'}`}>{p.d}</p>
              <ul className={`space-y-2 border-t pt-4 text-sm ${p.featured ? 'border-background/15' : ''}`}>
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? 'text-(--acc)' : 'text-emerald-500'}`} /> {i}
                  </li>
                ))}
              </ul>
              {p.featured && (
                <a href="#" className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc)">
                  Quero começar <ArrowUpRight className="size-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
