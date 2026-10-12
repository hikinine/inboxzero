'use client'

import type { LucideIcon } from 'lucide-react'
import { Check, ClipboardList, Headset, Plug, Rocket, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Etapa {
  Icon: LucideIcon
  quando: string
  title: string
  desc: string
  entregas: string[]
}

const ETAPAS: Etapa[] = [
  { Icon: ClipboardList, quando: 'Dia 1', title: 'Diagnóstico de 45 minutos', desc: 'Mapeamos canais, volume e onde o atendimento trava hoje.', entregas: ['Mapa de canais', 'Metas de resposta'] },
  { Icon: Plug, quando: 'Dias 2 a 4', title: 'Conexão dos canais', desc: 'WhatsApp pela API oficial, Instagram, e-mail e importação dos contatos.', entregas: ['Número conectado', 'Histórico importado'] },
  { Icon: Users, quando: 'Dia 5', title: 'Treinamento do time', desc: 'Workshop ao vivo com as conversas reais da sua operação.', entregas: ['Workshop de 2h', 'Trilha em vídeo'] },
  { Icon: Rocket, quando: 'Dia 7', title: 'Go-live assistido', desc: 'Entramos em produção com alguém do nosso time acompanhando o primeiro dia.', entregas: ['Automações ativas', 'Painel configurado'] },
  { Icon: Headset, quando: 'Dias 8 a 30', title: 'Acompanhamento semanal', desc: 'Revisão de métricas e ajustes finos com o gerente de sucesso.', entregas: ['4 revisões', 'Relatório do mês'] },
]

const RESULTADOS = ['Tempo de resposta abaixo de 5 minutos', 'Todo contato registrado no CRM', 'Follow-up automático para leads parados', 'Relatório de vendas por canal']

export default function ProcessoEmTimelineVerticalComIcones() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Implantação</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Do contrato ao time atendendo em 7 dias</h2>
          <p className="mt-3 text-muted-foreground">Um roteiro simples, com responsável do nosso lado em cada etapa. Nada de projeto de meses.</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <ol className="relative space-y-10 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
            {ETAPAS.map((e, i) => (
              <motion.li key={e.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }} className="relative flex gap-5">
                <span className={cn('relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background', i === 0 ? 'border-primary text-primary ring-4 ring-primary/15' : 'text-muted-foreground')}>
                  <e.Icon className="size-4" />
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{e.quando}</span>
                    {i === 0 && <Badge className="h-4 px-1.5 text-[10px]">Começa aqui</Badge>}
                  </div>
                  <h3 className="mt-1 font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.entregas.map((d) => (
                      <span key={d} className="inline-flex items-center gap-1 rounded-md border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                        <Check className="size-3 text-emerald-500" /> {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border bg-muted/40 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">No dia 30 você tem</p>
              <ul className="mt-4 space-y-3">
                {RESULTADOS.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="size-2.5" />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t pt-5">
                <p className="text-3xl font-semibold tracking-tight">7 dias</p>
                <p className="text-sm text-muted-foreground">tempo médio até o go-live em 2026</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
