'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Emoji Feedback Marquee": pesquisa "Como foi seu atendimento?" com duas faixas de balões de resposta (emoji + comentário)
// rolando em sentidos opostos. Embaixo, o placar das cinco carinhas: a cada 0,9s chega um voto, o contador dá um pop,
// um "+1" sobe e a barra de proporção se ajusta. A sequência de votos é fixa e se repete (o placar reinicia a cada quatro rodadas).
const FACES = [
  { emoji: '😡', label: 'Péssimo', bar: 'bg-rose-500' },
  { emoji: '🙁', label: 'Ruim', bar: 'bg-orange-500' },
  { emoji: '😐', label: 'Ok', bar: 'bg-amber-400' },
  { emoji: '🙂', label: 'Bom', bar: 'bg-lime-500' },
  { emoji: '😍', label: 'Amei', bar: 'bg-emerald-500' },
] as const

const ROW_A = [
  { f: 4, text: 'Resolveram em 5 minutos!' },
  { f: 3, text: 'Atendente muito educada' },
  { f: 4, text: 'Melhor suporte que já tive' },
  { f: 2, text: 'Demorou um pouco na fila' },
  { f: 4, text: 'Explicou tudo com calma' },
  { f: 3, text: 'Prático pelo WhatsApp' },
]
const ROW_B = [
  { f: 4, text: 'Troca aprovada na hora' },
  { f: 1, text: 'Precisei repetir o pedido' },
  { f: 3, text: 'Gostei do acompanhamento' },
  { f: 4, text: 'Voltaria a comprar ❤' },
  { f: 3, text: 'Rápido e sem burocracia' },
  { f: 0, text: 'Boleto veio errado' },
]
const VOTES = [4, 3, 4, 4, 2, 3, 4, 1, 4, 3, 4, 0, 3, 4, 4, 2, 3, 4]
const START = [3, 6, 14, 41, 88]

function Row({ items, reverse, duration }: { items: typeof ROW_A; reverse?: boolean; duration: number }) {
  return (
    <motion.div className="flex w-max gap-3" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      {[...items, ...items].map((it, i) => (
        <div key={i} className="relative flex items-center gap-2 whitespace-nowrap rounded-2xl rounded-bl-sm border bg-card py-1.5 pl-1.5 pr-3 text-[11px] shadow-sm">
          <span className="flex size-7 items-center justify-center rounded-full bg-muted text-base">{FACES[it.f].emoji}</span>
          {it.text}
        </div>
      ))}
    </motion.div>
  )
}

export default function EmojiFeedbackMarquee() {
  const [n, setN] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % (VOTES.length * 4)), 900)
    return () => clearInterval(id)
  }, [])

  const L = VOTES.length
  const counts = START.map((c, f) => c + Math.floor(n / L) * VOTES.filter((v) => v === f).length + VOTES.slice(0, n % L).filter((v) => v === f).length)
  const total = counts.reduce((a, b) => a + b, 0)
  const lastFace = n > 0 ? VOTES[(n - 1) % L] : -1

  return (
    <div className="w-[460px] text-foreground">
      <div className="mb-3 text-center">
        <div className="text-sm font-semibold">Como foi seu atendimento?</div>
        <div className="text-[11px] text-muted-foreground">respostas chegando agora</div>
      </div>

      <div className="flex flex-col gap-2.5 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Row items={ROW_A} duration={26} />
        <Row items={ROW_B} reverse duration={30} />
      </div>

      <div className="mt-4 rounded-xl border bg-card p-3">
        <div className="grid grid-cols-5 gap-2">
          {FACES.map((f, i) => (
            <div key={f.label} className="relative flex flex-col items-center">
              <motion.span key={lastFace === i ? `hit-${n}` : 'idle'} className="text-2xl" initial={{ scale: lastFace === i ? 1.45 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
                {f.emoji}
              </motion.span>
              <span className="mt-0.5 text-[11px] font-semibold tabular-nums">{counts[i]}</span>
              <span className="text-[9px] text-muted-foreground">{f.label}</span>
              <AnimatePresence>
                {lastFace === i && (
                  <motion.span key={n} className="absolute -top-2 right-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400" initial={{ y: 4, opacity: 1 }} animate={{ y: -14, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                    +1
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-muted">
          {FACES.map((f, i) => (
            <motion.span key={f.label} className={cn('h-full', f.bar)} animate={{ width: `${(counts[i] / total) * 100}%` }} transition={{ duration: 0.5 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
