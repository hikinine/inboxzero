'use client'

import { Fragment, useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Metrica = 'mensagens' | 'vendas'

const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
const HORAS = Array.from({ length: 24 }, (_, h) => h)
const NIVEIS = ['bg-muted', 'bg-primary/15', 'bg-primary/30', 'bg-primary/50', 'bg-primary/75', 'bg-primary']
const ROTULO: Record<Metrica, string> = { mensagens: 'mensagens recebidas', vendas: 'vendas concluídas' }

function valor(metrica: Metrica, d: number, h: number) {
  const fimDeSemana = d >= 5
  const pico = metrica === 'mensagens' ? 14 : 20
  const largura = metrica === 'mensagens' ? 22 : 10
  const escala = metrica === 'mensagens' ? 48 : 16
  const base = Math.exp(-((h - pico) ** 2) / largura) * escala
  const fator = fimDeSemana ? (metrica === 'mensagens' ? 0.35 : 1.3) : 1
  const ruido = Math.sin(d * 1.7 + h * 0.9) * (metrica === 'mensagens' ? 5 : 2)
  const piso = metrica === 'mensagens' ? 4 : 1
  return Math.max(0, Math.round(base * fator + ruido + piso))
}

function nivel(v: number, max: number) {
  if (v === 0) return 0
  const r = v / max
  return r <= 0.2 ? 1 : r <= 0.4 ? 2 : r <= 0.6 ? 3 : r <= 0.8 ? 4 : 5
}

export default function GraficoMapaDeCalor() {
  const [metrica, setMetrica] = useState<Metrica>('mensagens')
  const [sel, setSel] = useState<{ d: number; h: number } | null>({ d: 1, h: 14 })
  const matriz = DIAS.map((_, d) => HORAS.map((h) => valor(metrica, d, h)))
  const max = Math.max(...matriz.flat())
  const total = matriz.flat().reduce((a, b) => a + b, 0)
  let picoD = 0
  let picoH = 0
  matriz.forEach((linha, d) =>
    linha.forEach((v, h) => {
      if (v > matriz[picoD][picoH]) {
        picoD = d
        picoH = h
      }
    }),
  )
  const atual = sel ? matriz[sel.d][sel.h] : null

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Mapa de calor semanal</CardTitle>
            <CardDescription>
              {ROTULO[metrica].charAt(0).toUpperCase() + ROTULO[metrica].slice(1)} por dia e hora · média das últimas 8 semanas
            </CardDescription>
            <CardAction>
              <div className="inline-flex rounded-lg bg-muted p-0.5">
                {(['mensagens', 'vendas'] as Metrica[]).map((m) => (
                  <button key={m} type="button" onClick={() => setMetrica(m)} aria-pressed={metrica === m} className={cn('rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors', metrica === m ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    {m}
                  </button>
                ))}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid min-w-[560px] gap-0.5" style={{ gridTemplateColumns: 'auto repeat(24, minmax(0, 1fr))' }} role="grid" aria-label={`Mapa de calor de ${ROTULO[metrica]}`}>
                <span />
                {HORAS.map((h) => (
                  <span key={h} className="pb-1 text-center text-[10px] text-muted-foreground tabular-nums">
                    {h % 3 === 0 ? `${h}h` : ''}
                  </span>
                ))}
                {DIAS.map((dia, d) => (
                  <Fragment key={dia}>
                    <span className="flex items-center pr-2 text-[11px] text-muted-foreground">{dia}</span>
                    {HORAS.map((h) => {
                      const v = matriz[d][h]
                      const ativo = sel?.d === d && sel?.h === h
                      const pico = d === picoD && h === picoH
                      return (
                        <button
                          key={h}
                          type="button"
                          role="gridcell"
                          aria-label={`${dia}, ${h}h: ${v} ${ROTULO[metrica]}`}
                          onMouseEnter={() => setSel({ d, h })}
                          onFocus={() => setSel({ d, h })}
                          onClick={() => setSel({ d, h })}
                          className={cn('aspect-square w-full rounded-[3px] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring', NIVEIS[nivel(v, max)], ativo && 'ring-2 ring-foreground/60', pico && 'ring-2 ring-foreground')}
                        />
                      )
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              Menos
              {NIVEIS.map((n) => (
                <span key={n} className={cn('size-3 rounded-[3px]', n)} />
              ))}
              Mais
            </span>
            <span>
              Pico: <span className="font-medium text-foreground">{DIAS[picoD]} às {picoH}h</span> ({matriz[picoD][picoH]})
            </span>
            <span>
              Total na semana: <span className="font-medium text-foreground tabular-nums">{total.toLocaleString('pt-BR')}</span>
            </span>
            {sel && atual !== null && (
              <span className="ml-auto rounded-md bg-muted px-2 py-1 font-medium text-foreground tabular-nums">
                {DIAS[sel.d]}, {sel.h}h · {atual} {ROTULO[metrica]}
              </span>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
