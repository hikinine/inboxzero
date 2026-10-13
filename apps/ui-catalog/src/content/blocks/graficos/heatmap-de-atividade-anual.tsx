'use client'

import { useMemo, useState } from 'react'
import { Flame, GitCommitHorizontal } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const NIVEIS = ['bg-muted', 'bg-primary/20', 'bg-primary/40', 'bg-primary/65', 'bg-primary']
const SEMANAS = 53

type Ano = '2025' | '2026'

interface Dia {
  data: Date
  valor: number
  nivel: number
}

function ruido(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function gerar(ano: Ano): Dia[][] {
  const inicio = new Date(Date.UTC(Number(ano), 0, 1))
  inicio.setUTCDate(inicio.getUTCDate() - inicio.getUTCDay())
  const semente = ano === '2025' ? 7 : 31
  const semanas: Dia[][] = []
  for (let s = 0; s < SEMANAS; s++) {
    const semana: Dia[] = []
    for (let d = 0; d < 7; d++) {
      const data = new Date(inicio)
      data.setUTCDate(inicio.getUTCDate() + s * 7 + d)
      const fimDeSemana = d === 0 || d === 6
      const ferias = s < 2 || (s > 27 && s < 30)
      const r = ruido(s * 7 + d + semente)
      let valor = Math.round(r * (fimDeSemana ? 3 : 14) + Math.sin(s / 6) * 3)
      if (ferias || r < 0.12) valor = 0
      valor = Math.max(0, valor)
      const nivel = valor === 0 ? 0 : valor < 4 ? 1 : valor < 8 ? 2 : valor < 12 ? 3 : 4
      semana.push({ data, valor, nivel })
    }
    semanas.push(semana)
  }
  return semanas
}

const fmt = (d: Date) => `${DIAS_SEMANA[d.getUTCDay()]}, ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`

export default function HeatmapDeAtividadeAnual() {
  const [ano, setAno] = useState<Ano>('2026')
  const [foco, setFoco] = useState<{ s: number; d: number } | null>(null)
  const semanas = useMemo(() => gerar(ano), [ano])

  const dias = semanas.flat().filter((d) => d.data.getUTCFullYear() === Number(ano))
  const total = dias.reduce((a, d) => a + d.valor, 0)
  const ativos = dias.filter((d) => d.valor > 0).length
  let sequencia = 0
  let maior = 0
  for (const d of dias) {
    sequencia = d.valor > 0 ? sequencia + 1 : 0
    maior = Math.max(maior, sequencia)
  }
  const melhor = dias.reduce((a, d) => (d.valor > a.valor ? d : a), dias[0])

  const rotulosMes = semanas.map((sem, s) => {
    const primeiro = sem.find((d) => d.data.getUTCDate() === 1)
    return primeiro && s < SEMANAS - 1 ? MESES[primeiro.data.getUTCMonth()] : ''
  })

  return (
    <section className="w-full px-6 py-12">
      <Card className="mx-auto max-w-5xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommitHorizontal className="size-4 text-muted-foreground" /> Atividade em {ano}
          </CardTitle>
          <CardDescription>
            {total.toLocaleString('pt-BR')} contribuições em {ativos} dias
          </CardDescription>
          <CardAction>
            <ToggleGroup value={[ano]} onValueChange={(v) => v[0] && setAno(v[0] as Ano)} variant="outline" size="sm">
              <ToggleGroupItem value="2025">2025</ToggleGroupItem>
              <ToggleGroupItem value="2026">2026</ToggleGroupItem>
            </ToggleGroup>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="relative -mt-8 overflow-x-auto pt-10 pb-2">
            <div className="inline-grid grid-cols-[auto_1fr] gap-x-2">
              <div />
              <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateColumns: `repeat(${SEMANAS}, 12px)` }}>
                {rotulosMes.map((m, i) => (
                  <span key={i} className="h-4 overflow-visible text-[10px] whitespace-nowrap text-muted-foreground">
                    {m}
                  </span>
                ))}
              </div>
              <div className="grid w-6 grid-rows-7 gap-[3px] text-[10px] text-muted-foreground">
                {DIAS_SEMANA.map((d, i) => (
                  <span key={d} className="flex h-3 items-center">
                    {i % 2 ? d : ''}
                  </span>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]" onMouseLeave={() => setFoco(null)}>
                {semanas.map((sem, s) =>
                  sem.map((d, di) => {
                    const fora = d.data.getUTCFullYear() !== Number(ano)
                    const ativo = foco?.s === s && foco?.d === di
                    return (
                      <div key={`${s}-${di}`} className="relative">
                        <button
                          type="button"
                          aria-label={`${d.valor} contribuições em ${fmt(d.data)}`}
                          onMouseEnter={() => setFoco({ s, d: di })}
                          onFocus={() => setFoco({ s, d: di })}
                          className={cn('block size-3 rounded-[3px] outline-none', fora ? 'invisible' : NIVEIS[d.nivel], ativo && 'ring-2 ring-foreground ring-offset-1 ring-offset-background')}
                        />
                        {ativo && !fora && (
                          <div
                            role="tooltip"
                            className={cn(
                              'pointer-events-none absolute bottom-full z-10 mb-2 rounded-md bg-foreground px-2.5 py-1.5 text-xs whitespace-nowrap text-background shadow-lg',
                              s < 10 ? 'left-0' : s > SEMANAS - 11 ? 'right-0' : 'left-1/2 -translate-x-1/2',
                            )}
                          >
                            <span className="font-semibold">{d.valor === 0 ? 'Nenhuma' : d.valor} contribuições</span> · {fmt(d.data)}
                          </div>
                        )}
                      </div>
                    )
                  }),
                )}
              </div>
            </div>

          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
            Menos
            {NIVEIS.map((n) => (
              <span key={n} className={cn('size-3 rounded-[3px]', n)} />
            ))}
            Mais
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-4 border-t text-sm sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Maior sequência</p>
            <p className="flex items-center gap-1.5 text-lg font-semibold">
              <Flame className="size-4 text-orange-500" /> {maior} dias
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Melhor dia</p>
            <p className="text-lg font-semibold">
              {melhor.valor} em {melhor.data.getUTCDate()} de {MESES[melhor.data.getUTCMonth()]}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Média em dias ativos</p>
            <p className="text-lg font-semibold">{(total / Math.max(1, ativos)).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} por dia</p>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
