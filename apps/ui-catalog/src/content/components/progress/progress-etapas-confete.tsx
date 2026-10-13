'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform } from 'motion/react'
import { Check, PartyPopper, RotateCcw, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ETAPAS = ['Dados da loja', 'Produtos', 'Pagamentos', 'Frete', 'Publicar'] as const
const CORES = ['bg-rose-500', 'bg-amber-400', 'bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-primary'] as const

interface Peca {
  id: number
  x: number
  y: number
  rot: number
  cor: string
  forma: string
  atraso: number
}

function gerarConfete(): Peca[] {
  return Array.from({ length: 36 }, (_, i) => {
    const ang = Math.random() * Math.PI * 2
    const dist = 80 + Math.random() * 120
    return {
      id: i,
      x: Math.cos(ang) * dist,
      y: Math.sin(ang) * dist * 0.7 - 40,
      rot: (Math.random() - 0.5) * 720,
      cor: CORES[i % CORES.length],
      forma: i % 3 === 0 ? 'size-2 rounded-full' : i % 3 === 1 ? 'h-3 w-1.5 rounded-sm' : 'size-2 rotate-45',
      atraso: Math.random() * 0.08,
    }
  })
}

function Confete({ pecas }: { pecas: Peca[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-20">
      {pecas.map((p) => (
        <motion.span
          key={p.id}
          className={cn('absolute', p.cor, p.forma)}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 140], opacity: [1, 1, 0], rotate: p.rot, scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: p.atraso, times: [0, 0.4, 1] }}
        />
      ))}
    </div>
  )
}

export default function ProgressEtapasConfete() {
  const [concluidas, setConcluidas] = useState(2)
  const [confete, setConfete] = useState<Peca[]>([])
  const total = ETAPAS.length
  const pct = Math.round((concluidas / total) * 100)
  const terminou = concluidas === total

  const mola = useSpring(pct, { stiffness: 90, damping: 20 })
  const texto = useTransform(mola, (v) => `${Math.round(v)}%`)
  const largura = useTransform(mola, (v) => `${v}%`)
  useEffect(() => {
    mola.set(pct)
  }, [pct, mola])

  function avancar() {
    if (terminou) return
    const proximo = concluidas + 1
    setConcluidas(proximo)
    if (proximo === total) setConfete(gerarConfete())
  }
  function reiniciar() {
    setConcluidas(0)
    setConfete([])
  }

  return (
    <div className="relative w-full max-w-lg overflow-visible rounded-2xl border bg-card p-6">
      {confete.length > 0 && <Confete key={confete.length + concluidas} pecas={confete} />}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Store className="size-5" />
          </span>
          <div>
            <div className="font-semibold">Configurando a Ateliê Cacau</div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={concluidas} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-sm text-muted-foreground">
                {terminou ? 'Sua loja está no ar!' : `Próximo: ${ETAPAS[concluidas]}`}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <motion.span className="text-2xl font-semibold tabular-nums">{texto}</motion.span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da configuração">
        <motion.div style={{ width: largura }} className={cn('h-full rounded-full', terminou ? 'bg-emerald-500' : 'bg-primary')} />
      </div>

      <div className="relative mt-6">
        <div className="absolute top-4 right-8 left-8 h-0.5 bg-muted" aria-hidden>
          <motion.div className="h-full bg-primary" animate={{ width: `${(Math.min(concluidas, total - 1) / (total - 1)) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </div>
        <ol className="relative flex justify-between">
        {ETAPAS.map((e, i) => {
          const feita = i < concluidas
          const atual = i === concluidas
          return (
            <li key={e} className="relative z-10 flex w-16 flex-col items-center gap-2 text-center">
              <span className="relative flex size-8 items-center justify-center">
                {atual && <motion.span className="absolute inset-0 rounded-full bg-primary/25" animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
                <motion.span
                  animate={{ scale: feita ? [0.8, 1.15, 1] : 1 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    'relative flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                    feita ? 'border-primary bg-primary text-primary-foreground' : atual ? 'border-primary bg-background text-foreground' : 'border-muted bg-background text-muted-foreground',
                  )}
                >
                  {feita ? <Check className="size-4" /> : i + 1}
                </motion.span>
              </span>
              <span className={cn('text-[11px] leading-tight', feita || atual ? 'font-medium' : 'text-muted-foreground')}>{e}</span>
            </li>
          )
        })}
        </ol>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={reiniciar}>
          <RotateCcw data-icon="inline-start" /> Reiniciar
        </Button>
        <Button size="sm" onClick={avancar} disabled={terminou}>
          {terminou ? (
            <>
              <PartyPopper data-icon="inline-start" /> Concluído
            </>
          ) : concluidas === total - 1 ? (
            'Publicar loja'
          ) : (
            'Concluir etapa'
          )}
        </Button>
      </div>
    </div>
  )
}
