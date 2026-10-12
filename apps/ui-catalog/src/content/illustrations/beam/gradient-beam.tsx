'use client'

import type { LucideIcon } from 'lucide-react'
import { Cloud, Smartphone } from 'lucide-react'
import type { Transition } from 'motion/react'
import { motion } from 'motion/react'

// "Gradient Beam": dois nós ligados por um conector em S. O feixe nasce no nó de origem, cresce, percorre o trilho
// com degradê (violeta → azul → verde) sob um halo desfocado e o nó de chegada acende ao recebê-lo. Partículas
// seguem o mesmo caminho (offset-path), cada uma no seu ritmo. Só tokens do tema e cores semânticas do Tailwind.
const PATH = 'M 92 120 C 150 120, 150 164, 210 164 S 270 120, 328 120'
const TRAVEL = 2.2 // s: nascer + percorrer
const GAP = 0.6 // s: pausa entre feixes
const PERIOD = TRAVEL + GAP
const ARRIVAL = 1.6 // s: instante aproximado em que a cabeça do feixe toca o nó da direita

const PARTICLES = [
  { delay: 0.25, duration: 1.9, size: 6, tone: 'bg-violet-400', drift: -7 },
  { delay: 0.6, duration: 2.1, size: 4, tone: 'bg-sky-400', drift: 6 },
  { delay: 0.95, duration: 1.7, size: 5, tone: 'bg-emerald-400', drift: -5 },
  { delay: 1.35, duration: 2.0, size: 3, tone: 'bg-violet-300', drift: 8 },
  { delay: 1.75, duration: 1.8, size: 4, tone: 'bg-sky-300', drift: -6 },
  { delay: 2.15, duration: 1.6, size: 5, tone: 'bg-emerald-300', drift: 5 },
] as const

// O feixe cresce a partir da origem (pathLength 0 → 0,42) e só então viaja (pathOffset 0 → 1), saindo pela ponta.
const BEAM_INITIAL = { pathLength: 0.001, pathOffset: 0, pathSpacing: 1 }
const BEAM_ANIMATE = { pathLength: [0.001, 0.42, 0.42], pathOffset: [0, 0, 1], pathSpacing: 1 }
const BEAM_TRANSITION: Transition = { duration: TRAVEL, times: [0, 0.3, 1], ease: ['easeOut', 'easeInOut'], repeat: Infinity, repeatDelay: GAP }

function Node({ left, label, Icon, glow, delay }: { left: number; label: string; Icon: LucideIcon; glow: string; delay: number }) {
  return (
    <div className="absolute top-[88px] flex w-16 flex-col items-center" style={{ left }}>
      <motion.span
        aria-hidden
        className={`absolute top-0 size-16 rounded-2xl ${glow}`}
        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
        transition={{ duration: 0.8, delay, repeat: Infinity, repeatDelay: PERIOD - 0.8, ease: 'easeOut' }}
      />
      <motion.span
        className="relative flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm"
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 0.5, delay, repeat: Infinity, repeatDelay: PERIOD - 0.5, ease: 'easeOut' }}
      >
        <Icon className="size-7" />
      </motion.span>
      <span className="mt-2 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export default function GradientBeam() {
  return (
    <div className="relative h-[240px] w-[420px] text-foreground">
      <svg viewBox="0 0 420 240" className="absolute inset-0 size-full" role="img" aria-label="Feixe com degradê percorrendo o conector entre dois nós">
        <defs>
          <linearGradient id="gb-grad" gradientUnits="userSpaceOnUse" x1="92" y1="0" x2="328" y2="0">
            <stop offset="0%" stopColor="currentColor" className="text-violet-500" />
            <stop offset="50%" stopColor="currentColor" className="text-sky-400" />
            <stop offset="100%" stopColor="currentColor" className="text-emerald-400" />
          </linearGradient>
          <filter id="gb-glow" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {/* trilho */}
        <path d={PATH} fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        {/* halo desfocado */}
        <motion.path d={PATH} fill="none" stroke="url(#gb-grad)" strokeWidth="12" strokeLinecap="round" filter="url(#gb-glow)" opacity="0.5" initial={BEAM_INITIAL} animate={BEAM_ANIMATE} transition={BEAM_TRANSITION} />
        {/* núcleo */}
        <motion.path d={PATH} fill="none" stroke="url(#gb-grad)" strokeWidth="3" strokeLinecap="round" initial={BEAM_INITIAL} animate={BEAM_ANIMATE} transition={BEAM_TRANSITION} />
      </svg>

      {/* partículas seguindo o mesmo caminho (o container tem o tamanho exato do viewBox, então as coordenadas batem) */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`absolute left-0 top-0 rounded-full ${p.tone}`}
          style={{ width: p.size, height: p.size, offsetPath: `path("${PATH}")`, offsetRotate: '0deg' }}
          animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0], y: [0, p.drift, -p.drift, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, repeatDelay: PERIOD - p.duration, ease: 'easeInOut' }}
        />
      ))}

      <Node left={28} label="App" Icon={Smartphone} glow="bg-violet-500/40" delay={0} />
      <Node left={328} label="Nuvem" Icon={Cloud} glow="bg-emerald-500/40" delay={ARRIVAL} />

      <motion.div className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] text-muted-foreground" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: PERIOD, repeat: Infinity, ease: 'easeInOut' }}>
        2,4 MB/s · latência 38 ms
      </motion.div>
    </div>
  )
}
