'use client'

import { ArrowRight, Bot, ChartColumn, FileText, ListChecks, Lock, Puzzle, Smartphone, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'

const RECURSOS = [
  { Icon: ListChecks, cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', titulo: 'Tarefas e subtarefas', texto: 'Responsável, prazo, prioridade e checklist em cada card. Arraste entre colunas ou veja em lista.' },
  { Icon: Timer, cor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', titulo: 'Sprints de duas semanas', texto: 'Planeje a capacidade do time, acompanhe o burndown e feche o sprint com relatório automático.' },
  { Icon: FileText, cor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', titulo: 'Documentos ligados', texto: 'PRD, ata e decisão ficam ao lado da tarefa. Edição em tempo real, com histórico de versões.' },
  { Icon: Bot, cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', titulo: 'Automações', texto: 'Quando a tarefa vai para "Em revisão", avise o revisor no Slack e mova o card do cliente.' },
  { Icon: ChartColumn, cor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', titulo: 'Relatórios de entrega', texto: 'Lead time, throughput e tarefas paradas por mais de 3 dias, por pessoa e por projeto.' },
  { Icon: Lock, cor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', titulo: 'Permissões finas', texto: 'Convide o cliente para ver só o quadro dele. Sem acesso a custos, estimativas ou outros projetos.' },
  { Icon: Puzzle, cor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', titulo: 'Integrações', texto: 'GitHub, Figma, Slack e Google Agenda nativos. API aberta e webhooks para o resto.' },
  { Icon: Smartphone, cor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', titulo: 'App para celular', texto: 'Aprove, comente e mova tarefas de onde estiver. Funciona offline e sincroniza depois.' },
]

export default function FeaturesEmGradeComIconesColoridos() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Recursos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que um time de produto precisa, num só quadro</h2>
            <p className="mt-3 text-muted-foreground">Oito módulos que vêm ligados desde o primeiro dia. Sem plugin para instalar, sem plano "enterprise" para desbloquear.</p>
          </div>
          <Button variant="outline" className="shrink-0">
            Ver documentação <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((r) => (
            <li key={r.titulo} className="border-t pt-6">
              <span className={`flex size-10 items-center justify-center rounded-lg ${r.cor}`}>
                <r.Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{r.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
