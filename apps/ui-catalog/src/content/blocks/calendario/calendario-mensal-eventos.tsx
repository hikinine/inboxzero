'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Cor = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose'

const CORES: Record<Cor, string> = {
  sky: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  emerald: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  violet: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  rose: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
}

const HOJE = new Date(2026, 9, 12)
const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const EVENTOS: Record<string, { titulo: string; cor: Cor }[]> = {
  '2026-10-01': [{ titulo: 'Kickoff do Q4', cor: 'sky' }],
  '2026-10-05': [
    { titulo: '10h Reunião Clínica Vida', cor: 'emerald' },
    { titulo: 'Entrega dos criativos', cor: 'amber' },
  ],
  '2026-10-08': [{ titulo: '19h Webinar de automações', cor: 'violet' }],
  '2026-10-12': [
    { titulo: '9h Demo para Bistrô Oliva', cor: 'emerald' },
    { titulo: '11h 1:1 com Bruno', cor: 'sky' },
    { titulo: '15h Revisar proposta v2', cor: 'amber' },
    { titulo: '17h Fechamento do dia', cor: 'violet' },
  ],
  '2026-10-14': [{ titulo: 'Fechamento da folha', cor: 'rose' }],
  '2026-10-15': [{ titulo: '14h Workshop de vendas', cor: 'violet' }],
  '2026-10-20': [{ titulo: '16h Sprint review', cor: 'sky' }],
  '2026-10-22': [{ titulo: 'Visita técnica Campinas', cor: 'emerald' }],
  '2026-10-27': [
    { titulo: 'Planejamento Black Friday', cor: 'amber' },
    { titulo: '11h Call com Pagar.me', cor: 'sky' },
  ],
  '2026-10-30': [{ titulo: '18h Happy hour do time', cor: 'violet' }],
  '2026-11-03': [{ titulo: '9h Reunião mensal', cor: 'sky' }],
  '2026-11-12': [{ titulo: 'Vencimento da fatura', cor: 'rose' }],
  '2026-11-20': [{ titulo: 'Feriado: Consciência Negra', cor: 'amber' }],
  '2026-11-27': [{ titulo: 'Black Friday', cor: 'amber' }],
  '2026-09-28': [{ titulo: 'Fechamento de setembro', cor: 'rose' }],
}

function chave(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function mesmoDia(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function diasDaGrade(ano: number, mes: number) {
  const primeiro = new Date(ano, mes, 1)
  const inicio = new Date(ano, mes, 1 - primeiro.getDay())
  const totalDias = new Date(ano, mes + 1, 0).getDate()
  const semanas = Math.ceil((primeiro.getDay() + totalDias) / 7)
  return Array.from({ length: semanas * 7 }, (_, i) => new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + i))
}

export default function CalendarioMensalEventos() {
  const [mes, setMes] = useState(new Date(2026, 9, 1))
  const dias = diasDaGrade(mes.getFullYear(), mes.getMonth())
  const titulo = mes.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const totalEventos = dias.filter((d) => d.getMonth() === mes.getMonth()).reduce((n, d) => n + (EVENTOS[chave(d)]?.length ?? 0), 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" aria-label="Mês anterior" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Próximo mês" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}>
                <ChevronRight />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setMes(new Date(HOJE.getFullYear(), HOJE.getMonth(), 1))}>
                Hoje
              </Button>
            </div>
            <h2 className="text-lg font-semibold capitalize">{titulo}</h2>
            <span className="text-sm text-muted-foreground">{totalEventos} eventos</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center rounded-lg bg-muted p-0.5 text-sm sm:flex">
                <span className="rounded-md bg-background px-2.5 py-1 font-medium shadow-sm">Mês</span>
                <span className="px-2.5 py-1 text-muted-foreground">Semana</span>
                <span className="px-2.5 py-1 text-muted-foreground">Dia</span>
              </div>
              <Button size="sm">
                <Plus data-icon="inline-start" /> Novo evento
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b bg-muted/40 text-center text-xs font-medium text-muted-foreground">
            {DIAS_SEMANA.map((d) => (
              <div key={d} className="py-2 capitalize">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {dias.map((d, i) => {
              const doMes = d.getMonth() === mes.getMonth()
              const hoje = mesmoDia(d, HOJE)
              const eventos = EVENTOS[chave(d)] ?? []
              const visiveis = eventos.slice(0, 3)
              return (
                <div key={i} className={cn('min-h-24 border-b p-1.5 sm:min-h-28', i % 7 !== 0 && 'border-l', !doMes && 'bg-muted/30')}>
                  <div className="flex items-center justify-between">
                    <span className={cn('flex size-6 items-center justify-center rounded-full text-xs tabular-nums', hoje && 'bg-primary font-semibold text-primary-foreground', !doMes && 'text-muted-foreground/60')}>{d.getDate()}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {visiveis.map((e, j) => (
                      <div key={j} className={cn('truncate rounded px-1.5 py-0.5 text-[11px] font-medium', CORES[e.cor], !doMes && 'opacity-60')} title={e.titulo}>
                        {e.titulo}
                      </div>
                    ))}
                    {eventos.length > visiveis.length && <div className="px-1.5 text-[11px] text-muted-foreground">+{eventos.length - visiveis.length} mais</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
