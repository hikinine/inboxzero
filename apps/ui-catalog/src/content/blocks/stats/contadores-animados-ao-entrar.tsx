'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { Blocks, RotateCcw, Star, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Metrica {
  Icon: LucideIcon
  valor: number
  sufixo: string
  rotulo: string
  meta: string
  progresso: number
  barras: number[]
}

const METRICAS: Metrica[] = [
  { Icon: Star, valor: 18432, sufixo: '', rotulo: 'estrelas no GitHub', meta: '+1.204 no último mês', progresso: 0.74, barras: [22, 30, 28, 41, 47, 55, 62, 70, 84, 100] },
  { Icon: Users, valor: 92000, sufixo: '+', rotulo: 'pessoas desenvolvedoras', meta: 'em 64 países, 41% no Brasil', progresso: 0.92, barras: [10, 18, 25, 33, 40, 52, 60, 71, 88, 100] },
  { Icon: Blocks, valor: 640, sufixo: '', rotulo: 'variantes de componentes', meta: '58 novas nesta versão', progresso: 0.64, barras: [35, 38, 44, 50, 55, 58, 66, 74, 90, 100] },
]

function Numero({ valor, ativo, chave }: { valor: number; ativo: boolean; chave: number }) {
  const [atual, setAtual] = useState(0)
  useEffect(() => {
    if (!ativo) return
    setAtual(0)
    const c = animate(0, valor, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setAtual(Math.round(v)) })
    return () => c.stop()
  }, [ativo, valor, chave])
  return <>{atual.toLocaleString('pt-BR')}</>
}

export default function ContadoresAnimadosAoEntrar() {
  const ref = useRef<HTMLDivElement>(null)
  const emVista = useInView(ref, { once: true, amount: 0.4 })
  const [rodada, setRodada] = useState(0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">v4.2 · open source · MIT</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Uma comunidade que não para de crescer</h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => setRodada((r) => r + 1)}>
            <RotateCcw data-icon="inline-start" /> Repetir animação
          </Button>
        </div>

        <div className="mt-12 grid divide-y rounded-2xl border bg-card md:grid-cols-3 md:divide-x md:divide-y-0">
          {METRICAS.map((m, i) => (
            <div key={m.rotulo} className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <m.Icon className="size-4" />
                {m.rotulo}
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold tracking-tighter tabular-nums sm:text-5xl">
                <Numero valor={m.valor} ativo={emVista} chave={rodada} />
                {m.sufixo}
              </p>

              <div className="mt-6 flex h-12 items-end gap-1" aria-hidden>
                {m.barras.map((b, j) => (
                  <motion.div
                    key={`${rodada}-${j}`}
                    className="flex-1 rounded-sm bg-primary"
                    style={{ opacity: 0.25 + (j / m.barras.length) * 0.75 }}
                    initial={{ height: 0 }}
                    animate={{ height: emVista ? `${b}%` : 0 }}
                    transition={{ delay: 0.2 + i * 0.15 + j * 0.06, duration: 0.5, ease: 'easeOut' }}
                  />
                ))}
              </div>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  key={rodada}
                  className="h-full rounded-full bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: emVista ? `${m.progresso * 100}%` : 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{m.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
