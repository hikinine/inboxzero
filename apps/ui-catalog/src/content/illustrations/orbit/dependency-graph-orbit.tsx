'use client'

import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Dependency Graph Orbit": o pacote do app no centro, as dependências diretas num anel e as transitivas num anel
// externo, cada uma ligada à sua "mãe" — o grafo inteiro gira devagar. Pulsos saem do centro pelas arestas e, a
// cada ciclo, uma dependência acusa atualização disponível (âmbar, com a versão nova) e depois fica verde ao subir.
const SIZE = 380
const C = SIZE / 2
const R1 = 98
const R2 = 162
const DURATION = 60
const DEPS = [
  { name: 'react', v: '19.1.0', next: '19.2.0' },
  { name: 'zod', v: '3.23.8', next: '3.24.1' },
  { name: 'motion', v: '12.4.2', next: '12.6.0' },
  { name: 'prisma', v: '6.2.1', next: '6.3.0' },
  { name: 'date-fns', v: '3.6.0', next: '4.1.0' },
  { name: 'tailwind', v: '4.0.6', next: '4.1.3' },
] as const
const SUB = 2
const pos = (i: number, n: number, r: number, off = 0) => {
  const a = (i / n) * Math.PI * 2 + off - Math.PI / 2
  return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r }
}

export default function DependencyGraphOrbit() {
  const [cycle, setCycle] = useState(0)
  const [state, setState] = useState<'outdated' | 'updated'>('outdated')

  useEffect(() => {
    let k = 0
    const id = setInterval(() => {
      k += 1
      if (k % 2 === 1) setState('updated')
      else {
        setCycle((c) => c + 1)
        setState('outdated')
      }
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const hot = (cycle * 2 + 1) % DEPS.length

  return (
    <div className="relative text-foreground" style={{ width: SIZE, height: SIZE }}>
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
          <circle cx={C} cy={C} r={R1} fill="none" stroke="var(--border)" strokeDasharray="2 6" />
          <circle cx={C} cy={C} r={R2} fill="none" stroke="var(--border)" strokeDasharray="2 6" />
          {DEPS.map((d, i) => {
            const p = pos(i, DEPS.length, R1)
            return (
              <g key={d.name}>
                <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="1.5" />
                <motion.line
                  x1={C}
                  y1={C}
                  x2={p.x}
                  y2={p.y}
                  stroke={i === hot && state === 'outdated' ? 'rgb(245 158 11)' : 'var(--primary)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.2, pathSpacing: 1, pathOffset: 0 }}
                  animate={{ pathLength: 0.2, pathSpacing: 1, pathOffset: 1 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.27 }}
                />
                {Array.from({ length: SUB }).map((_, j) => {
                  const q = pos(i * SUB + j, DEPS.length * SUB, R2, -0.12)
                  return (
                    <g key={j}>
                      <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--border)" strokeWidth="1" />
                      <circle cx={q.x} cy={q.y} r="5" fill="var(--muted)" stroke="var(--border)" />
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>

        {DEPS.map((d, i) => {
          const p = pos(i, DEPS.length, R1)
          const isHot = i === hot
          const tone = isHot ? (state === 'outdated' ? 'border-amber-500 bg-amber-500/10' : 'border-emerald-500 bg-emerald-500/10') : 'bg-card'
          return (
            <motion.div
              key={d.name}
              className="absolute"
              style={{ left: p.x, top: p.y }}
              animate={{ rotate: -360 }}
              transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
            >
              <div className={`relative -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2 py-1 font-mono text-[10px] shadow-sm transition-colors duration-300 ${tone}`}>
                <span className="font-semibold">{d.name}</span>{' '}
                <span className="text-muted-foreground">{isHot && state === 'updated' ? d.next : d.v}</span>
                <AnimatePresence>
                  {isHot && (
                    <motion.span
                      key={state}
                      className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-1.5 text-[8px] font-sans font-semibold text-white ${state === 'outdated' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      initial={{ y: 4, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {state === 'outdated' ? `↑ ${d.next}` : 'atualizado'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl border bg-card px-3 py-2 shadow-lg">
        <Package className="size-5" />
        <span className="mt-1 font-mono text-[11px] font-semibold">loja-app</span>
        <span className="font-mono text-[9px] text-muted-foreground">v2.4.0 · 248 pacotes</span>
      </div>
    </div>
  )
}
