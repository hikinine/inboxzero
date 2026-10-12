'use client'

import { Flag } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Grupo = 'Descoberta' | 'Design' | 'Desenvolvimento' | 'Lançamento'

interface Tarefa {
  nome: string
  resp: string
  inicio: number
  fim: number
  progresso: number
  grupo: Grupo
  marco?: boolean
}

const SEMANAS = ['7 set', '14 set', '21 set', '28 set', '5 out', '12 out', '19 out', '26 out']
const SEMANA_ATUAL = 5
const HOJE_POS = (SEMANA_ATUAL + 2 / 7) / SEMANAS.length

const CORES: Record<Grupo, { barra: string; fundo: string; ponto: string }> = {
  Descoberta: { barra: 'bg-violet-500', fundo: 'bg-violet-500/20', ponto: 'bg-violet-500' },
  Design: { barra: 'bg-sky-500', fundo: 'bg-sky-500/20', ponto: 'bg-sky-500' },
  Desenvolvimento: { barra: 'bg-emerald-500', fundo: 'bg-emerald-500/20', ponto: 'bg-emerald-500' },
  Lançamento: { barra: 'bg-amber-500', fundo: 'bg-amber-500/20', ponto: 'bg-amber-500' },
}

const TAREFAS: Tarefa[] = [
  { nome: 'Entrevistas com clientes', resp: 'CM', inicio: 0, fim: 1.5, progresso: 100, grupo: 'Descoberta' },
  { nome: 'Mapa da jornada', resp: 'CM', inicio: 1, fim: 2.5, progresso: 100, grupo: 'Descoberta' },
  { nome: 'Wireframes', resp: 'AS', inicio: 2, fim: 3.5, progresso: 100, grupo: 'Design' },
  { nome: 'UI de alta fidelidade', resp: 'AS', inicio: 3.5, fim: 5.5, progresso: 70, grupo: 'Design' },
  { nome: 'API de automações', resp: 'BR', inicio: 4, fim: 6.5, progresso: 45, grupo: 'Desenvolvimento' },
  { nome: 'App mobile', resp: 'DL', inicio: 5, fim: 8, progresso: 15, grupo: 'Desenvolvimento' },
  { nome: 'Beta fechado', resp: 'BR', inicio: 6.5, fim: 7.6, progresso: 0, grupo: 'Lançamento' },
  { nome: 'Go-live', resp: 'AS', inicio: 7.75, fim: 7.75, progresso: 0, grupo: 'Lançamento', marco: true },
]

const GRUPOS: Grupo[] = ['Descoberta', 'Design', 'Desenvolvimento', 'Lançamento']

function pct(v: number) {
  return `${(v / SEMANAS.length) * 100}%`
}

export default function GanttProjeto() {
  const concluido = Math.round(TAREFAS.reduce((s, t) => s + t.progresso, 0) / TAREFAS.length)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Lançamento do app · Q4</h2>
            <p className="text-sm text-muted-foreground">7 set – 30 out · {concluido}% concluído</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {GRUPOS.map((g) => (
              <span key={g} className="flex items-center gap-1.5">
                <span className={cn('size-2 rounded-full', CORES[g].ponto)} /> {g}
              </span>
            ))}
          </div>
          <div className="flex items-center rounded-lg bg-muted p-0.5 text-sm">
            <span className="rounded-md bg-background px-2.5 py-1 font-medium shadow-sm">Semana</span>
            <span className="px-2.5 py-1 text-muted-foreground">Mês</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-card">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[240px_1fr] border-b">
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground">Tarefa</div>
              <div className="relative grid" style={{ gridTemplateColumns: `repeat(${SEMANAS.length}, minmax(0, 1fr))` }}>
                {SEMANAS.map((s, i) => (
                  <div key={s} className={cn('border-l px-2 py-2 text-xs text-muted-foreground', i === SEMANA_ATUAL && 'bg-primary/5 font-medium text-foreground')}>
                    {s}
                  </div>
                ))}
                <div className="absolute inset-y-0 z-10 w-px bg-rose-500" style={{ left: HOJE_POS * 100 + '%' }}>
                  <span className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-b bg-rose-500 px-1.5 text-[10px] font-semibold text-white">Hoje</span>
                </div>
              </div>
            </div>

            {GRUPOS.map((g) => (
              <div key={g}>
                <div className="grid grid-cols-[240px_1fr] border-b bg-muted/40">
                  <div className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className={cn('size-2 rounded-full', CORES[g].ponto)} /> {g}
                  </div>
                  <div className="relative grid" style={{ gridTemplateColumns: `repeat(${SEMANAS.length}, minmax(0, 1fr))` }}>
                    {SEMANAS.map((s, i) => (
                      <div key={s} className={cn('border-l', i === SEMANA_ATUAL && 'bg-primary/5')} />
                    ))}
                    <div className="absolute inset-y-0 w-px bg-rose-500/60" style={{ left: HOJE_POS * 100 + '%' }} />
                  </div>
                </div>
                {TAREFAS.filter((t) => t.grupo === g).map((t) => (
                  <div key={t.nome} className="grid grid-cols-[240px_1fr] border-b last:border-b-0">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{t.resp}</AvatarFallback>
                      </Avatar>
                      <span className="truncate text-sm">{t.nome}</span>
                      {t.marco && (
                        <Badge variant="outline" className="ml-auto gap-1">
                          <Flag className="size-3" /> marco
                        </Badge>
                      )}
                    </div>
                    <div className="relative grid" style={{ gridTemplateColumns: `repeat(${SEMANAS.length}, minmax(0, 1fr))` }}>
                      {SEMANAS.map((s, i) => (
                        <div key={s} className={cn('border-l', i === SEMANA_ATUAL && 'bg-primary/5')} />
                      ))}
                      <div className="absolute inset-y-0 w-px bg-rose-500/60" style={{ left: HOJE_POS * 100 + '%' }} />
                      {t.marco ? (
                        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: pct(t.inicio) }} title={t.nome}>
                          <span className={cn('block size-3.5 rotate-45 rounded-sm', CORES[t.grupo].barra)} />
                        </div>
                      ) : (
                        <div className={cn('absolute top-1/2 h-6 -translate-y-1/2 overflow-hidden rounded-md', CORES[t.grupo].fundo)} style={{ left: pct(t.inicio), width: pct(t.fim - t.inicio) }} title={`${t.nome}: ${t.progresso}%`}>
                          <div className={cn('h-full rounded-md', CORES[t.grupo].barra)} style={{ width: `${t.progresso}%` }} />
                          <span className="absolute inset-y-0 left-2 flex items-center text-[11px] font-medium text-foreground/80 tabular-nums">{t.progresso}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm">
            Exportar cronograma
          </Button>
        </div>
      </div>
    </section>
  )
}
