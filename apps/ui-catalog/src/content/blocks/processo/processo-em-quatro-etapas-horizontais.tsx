'use client'

import { useState } from 'react'
import { Blocks, Check, ChevronRight, GraduationCap, Rocket, Search } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'

const STEPS = [
  { n: '01', title: 'Diagnóstico', Icon: Search, time: '1 semana', desc: 'Entendemos seus canais, o volume e onde o atendimento trava hoje.', details: ['Mapa dos canais e horários de pico', 'Análise de 30 dias de conversas reais', 'Metas de tempo de resposta e satisfação'] },
  { n: '02', title: 'Configuração', Icon: Blocks, time: '2 semanas', desc: 'Conectamos os números, importamos contatos e montamos as automações.', details: ['Conexão via API oficial do WhatsApp', 'Importação de contatos e histórico', 'Fluxos de triagem e respostas rápidas'] },
  { n: '03', title: 'Treinamento', Icon: GraduationCap, time: '3 dias', desc: 'Seu time aprende na prática, com as conversas da própria operação.', details: ['Workshop ao vivo de 2 horas', 'Trilha em vídeo para novos atendentes', 'Simulação com casos reais do seu negócio'] },
  { n: '04', title: 'Lançamento', Icon: Rocket, time: 'Contínuo', desc: 'Entramos em produção com acompanhamento semanal no primeiro mês.', details: ['Go-live assistido pelo time de implantação', 'Revisão semanal de métricas', 'Gerente de sucesso dedicado'] },
]

export default function ProcessoEmQuatroEtapasHorizontais() {
  const [active, setActive] = useState(0)
  const current = STEPS[active] ?? STEPS[0]!

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Como funciona</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Do primeiro contato ao go-live em 4 semanas</h2>
          <p className="mt-3 text-muted-foreground">Um processo enxuto, com um responsável do nosso lado em cada etapa. Clique numa etapa para ver o que acontece nela.</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const isActive = i === active
            return (
              <li key={s.n} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`h-full w-full rounded-xl border bg-card p-6 text-left transition-all hover:border-foreground/20 ${isActive ? 'border-primary ring-2 ring-primary/20' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex size-12 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <s.Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                  </div>
                  <h3 className="mt-5 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  <p className="mt-4 text-xs font-medium text-muted-foreground">{s.time}</p>
                </button>
                {i < STEPS.length - 1 && (
                  <span className="absolute top-9 -right-[1.4rem] z-10 hidden size-7 items-center justify-center rounded-full border bg-background text-muted-foreground lg:flex" aria-hidden="true">
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </li>
            )
          })}
        </ol>
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mt-8 rounded-xl border bg-muted/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold">
              {current.n} · {current.title}
            </h3>
            <Badge variant="outline">{current.time}</Badge>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {current.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
