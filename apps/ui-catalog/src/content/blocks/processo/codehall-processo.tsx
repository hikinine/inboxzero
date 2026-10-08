'use client'

import { Sparkles } from 'lucide-react'

const CH_STEPS = [
  { n: '01', tag: '1–2 semanas', t: 'Diagnóstico', d: 'Mapeamos o processo, os dados disponíveis, o retorno esperado e os riscos.', out: 'Viabilidade e backlog priorizado' },
  { n: '02', tag: '~2 semanas', t: 'Protótipo', d: 'Prova de conceito com dados reais. Os critérios de avaliação vêm antes do código.', out: 'PoC e métricas de base' },
  { n: '03', tag: '4–8 semanas', t: 'MVP', d: 'Em produção com usuários reais, observabilidade e custo por operação medido.', out: 'Sistema no ar e painel' },
  { n: '04', tag: 'Contínuo', t: 'Escala', d: 'Integrações, SSO, trilha de auditoria, segurança e SLAs.', out: 'Pronto para a empresa toda' },
  { n: '05', tag: 'Contínuo', t: 'Operação', d: 'Monitoramento de qualidade, reavaliação a cada novo modelo e otimização de custo.', out: 'Melhora mês a mês' },
]

export default function CodehallProcesso() {
  return (
    <section className="w-full bg-foreground px-6 py-24 text-background [--acc:var(--brand,#d7ff4f)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-(--acc)">
              <Sparkles className="size-4" /> Como trabalhamos
            </p>
            <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
              <span className="font-light">Do diagnóstico à operação,</span> <strong className="font-extrabold">com métrica em cada etapa.</strong>
            </h2>
          </div>
          <p className="text-background/70">Nada de projeto que some por meses. Você vê algo funcionando em semanas, e cada decisão é tomada com dado — inclusive a de não seguir.</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CH_STEPS.map((s) => (
            <li key={s.n} className="group flex min-h-[280px] flex-col gap-3 rounded-[20px] border border-background/10 bg-background/5 p-6 transition hover:-translate-y-1 hover:border-(--acc)/40">
              <span className="text-5xl font-extralight leading-none tracking-[-0.06em] text-(--acc)">{s.n}</span>
              <span className="w-fit rounded-full bg-background/10 px-2.5 py-0.5 text-xs font-medium text-background/70">{s.tag}</span>
              <h3 className="text-xl font-bold tracking-tight">{s.t}</h3>
              <p className="text-sm text-background/70">{s.d}</p>
              <p className="mt-auto border-t border-background/10 pt-3 text-xs font-semibold text-background/80">{s.out}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
