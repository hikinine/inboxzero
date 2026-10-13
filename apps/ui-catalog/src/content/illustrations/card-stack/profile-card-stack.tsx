'use client'

import { useEffect, useState } from 'react'
import { Check, MapPin, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'

// "Profile Card Stack": triagem de candidatos no estilo "deslize". O card da frente inclina para um lado, ganha o
// carimbo APROVAR (verde) ou PASSAR (vermelho), o botão correspondente afunda e o card voa para fora; o próximo
// sobe da pilha com mola. As decisões seguem uma sequência fixa e o contador avança.
const PROFILES = [
  { name: 'Beatriz Lima', role: 'Designer de Produto', city: 'São Paulo, SP', match: 94, skills: ['Figma', 'UX Research', 'Design System'], tone: 'from-rose-400 to-fuchsia-500', decision: 1 },
  { name: 'Caio Ferreira', role: 'Dev Front-end', city: 'Recife, PE', match: 71, skills: ['React', 'TypeScript', 'Testes'], tone: 'from-sky-400 to-indigo-500', decision: -1 },
  { name: 'Natália Rocha', role: 'Analista de Dados', city: 'Belo Horizonte, MG', match: 88, skills: ['SQL', 'Python', 'Power BI'], tone: 'from-emerald-400 to-teal-500', decision: 1 },
  { name: 'Vinícius Prado', role: 'Customer Success', city: 'Curitiba, PR', match: 82, skills: ['Onboarding', 'CRM', 'Churn'], tone: 'from-amber-400 to-orange-500', decision: 1 },
  { name: 'Helena Duarte', role: 'Gerente de Projetos', city: 'Porto Alegre, RS', match: 65, skills: ['Scrum', 'Jira', 'OKRs'], tone: 'from-violet-400 to-purple-500', decision: -1 },
] as const

const CARD: Variants = {
  exit: (dir: number) => ({ x: dir * 320, y: 30, rotate: dir * 24, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } }),
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function ProfileCardStack() {
  const [head, setHead] = useState(0)
  const [lean, setLean] = useState(0) // -1, 0, 1
  const [count, setCount] = useState(1)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let h = 0
      let c = 1
      while (!cancelled) {
        setLean(0)
        await sleep(1300)
        if (cancelled) return
        setLean(PROFILES[h].decision)
        await sleep(700)
        if (cancelled) return
        h = (h + 1) % PROFILES.length
        c = c >= 12 ? 1 : c + 1
        setHead(h)
        setCount(c)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = [0, 1, 2].map((d) => ({ p: PROFILES[(head + d) % PROFILES.length], d }))
  const exitDir = PROFILES[(head - 1 + PROFILES.length) % PROFILES.length].decision

  return (
    <div className="flex w-[300px] flex-col items-center text-foreground">
      <div className="mb-3 flex w-full justify-between text-[11px] text-muted-foreground">
        <span>Vaga · Time de Produto</span>
        <span className="tabular-nums">{count} de 12</span>
      </div>

      <div className="relative h-[290px] w-[260px]">
        <AnimatePresence initial={false} custom={exitDir}>
          {visible
            .slice()
            .reverse()
            .map(({ p, d }) => {
              const front = d === 0
              const l = front ? lean : 0
              return (
                <motion.div
                  key={p.name}
                  custom={exitDir}
                  variants={CARD}
                  exit="exit"
                  initial={{ scale: 0.86, y: 30, opacity: 0 }}
                  animate={{ scale: 1 - d * 0.05, y: d * 12, opacity: 1 - d * 0.25, x: l * 28, rotate: l * 8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="absolute inset-0 overflow-hidden rounded-2xl border bg-card shadow-lg"
                  style={{ zIndex: 10 - d }}
                >
                  <div className={cn('flex h-[130px] items-end bg-gradient-to-br p-4', p.tone)}>
                    <span className="flex size-16 translate-y-8 items-center justify-center rounded-full border-4 border-card bg-white/25 text-xl font-semibold text-white backdrop-blur">
                      {p.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <span className="ml-auto rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-semibold text-white">{p.match}% match</span>
                  </div>
                  <div className="px-4 pb-4 pt-10">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.role}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="size-3" /> {p.city}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {p.skills.map((s) => (
                        <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {front && l !== 0 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 1.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        'absolute top-6 rounded-md border-[3px] px-2 py-0.5 text-base font-black uppercase tracking-widest',
                        l > 0 ? 'left-4 -rotate-12 border-emerald-500 text-emerald-500' : 'right-4 rotate-12 border-rose-500 text-rose-500',
                      )}
                    >
                      {l > 0 ? 'Aprovar' : 'Passar'}
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-5">
        <motion.span animate={{ scale: lean < 0 ? 0.85 : 1 }} className={cn('flex size-12 items-center justify-center rounded-full border bg-card shadow-sm transition-colors', lean < 0 && 'border-rose-500 bg-rose-500/10')} aria-label="Passar">
          <X className="size-5 text-rose-500" />
        </motion.span>
        <motion.span animate={{ scale: lean > 0 ? 0.85 : 1 }} className={cn('flex size-12 items-center justify-center rounded-full border bg-card shadow-sm transition-colors', lean > 0 && 'border-emerald-500 bg-emerald-500/10')} aria-label="Aprovar">
          <Check className="size-5 text-emerald-500" />
        </motion.span>
      </div>
    </div>
  )
}
