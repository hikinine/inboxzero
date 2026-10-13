'use client'

import { Cpu } from 'lucide-react'
import { motion } from 'motion/react'

// "Circuit Beam": placa de circuito com um chip central e trilhas em ângulos de 45°, como numa PCB. Pulsos de luz
// correm pelas trilhas — alguns saindo do chip, outros chegando — e as ilhas de solda acendem quando o pulso toca
// nelas. Cada trilha tem ritmo próprio (valores fixos, sem aleatoriedade em render).
const W = 420
const H = 300

type P = readonly [number, number]
type Trace = { pts: readonly P[]; out: boolean; delay: number; dur: number; gap: number }

const TRACES: Trace[] = [
  { pts: [[168, 122], [128, 122], [108, 102], [36, 102]], out: true, delay: 0.2, dur: 1.4, gap: 1.6 },
  { pts: [[168, 140], [96, 140], [84, 152], [28, 152]], out: false, delay: 0.9, dur: 1.2, gap: 2.1 },
  { pts: [[168, 160], [120, 160], [100, 180], [100, 226], [86, 240], [44, 240]], out: true, delay: 1.5, dur: 1.8, gap: 1.2 },
  { pts: [[168, 178], [146, 178], [146, 272]], out: false, delay: 0.4, dur: 1.1, gap: 2.4 },
  { pts: [[252, 122], [296, 122], [316, 102], [316, 46]], out: true, delay: 1.1, dur: 1.3, gap: 1.9 },
  { pts: [[252, 140], [388, 140]], out: false, delay: 0.1, dur: 1.2, gap: 1.5 },
  { pts: [[252, 160], [290, 160], [310, 180], [392, 180]], out: true, delay: 2.0, dur: 1.4, gap: 1.3 },
  { pts: [[252, 178], [272, 178], [272, 246], [288, 262], [350, 262]], out: false, delay: 1.3, dur: 1.6, gap: 1.8 },
  { pts: [[194, 108], [194, 64], [174, 44], [110, 44]], out: true, delay: 0.6, dur: 1.4, gap: 2.2 },
  { pts: [[226, 108], [226, 28]], out: false, delay: 1.8, dur: 0.9, gap: 2.0 },
  { pts: [[210, 192], [210, 280]], out: true, delay: 2.4, dur: 0.9, gap: 1.7 },
  { pts: [[232, 192], [232, 212], [250, 230], [250, 284]], out: false, delay: 0.7, dur: 0.8, gap: 2.6 },
]

const toD = (pts: readonly P[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')

export default function CircuitBeam() {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-foreground" style={{ width: W, height: H }}>
      {/* grade de furos da placa */}
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px]" />

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Pulsos de luz percorrendo as trilhas de uma placa de circuito">
        <defs>
          <filter id="cb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {TRACES.map((t, i) => {
          const pts = t.out ? t.pts : [...t.pts].reverse()
          const d = toD(pts)
          const end = t.pts[t.pts.length - 1]
          const padDelay = t.out ? t.delay + t.dur * 0.85 : t.delay
          return (
            <g key={i}>
              <path d={toD(t.pts)} fill="none" stroke="var(--border)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              {/* halo + núcleo do pulso */}
              {[{ w: 7, f: 'url(#cb-glow)', o: 0.7 }, { w: 2.5, f: undefined, o: 1 }].map((s) => (
                <motion.path
                  key={s.w}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={s.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={s.f}
                  className="text-emerald-500"
                  initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 0.22, 0.22, 0], pathOffset: [0, 0, 0.78, 1], opacity: [0, s.o, s.o, 0] }}
                  transition={{ duration: t.dur, times: [0, 0.2, 0.85, 1], delay: t.delay, repeat: Infinity, repeatDelay: t.gap, ease: 'linear' }}
                />
              ))}
              {/* ilha de solda */}
              <circle cx={end[0]} cy={end[1]} r="5" fill="var(--card)" stroke="var(--border)" strokeWidth="2.5" />
              <motion.circle
                cx={end[0]}
                cy={end[1]}
                r="5"
                fill="currentColor"
                className="text-emerald-500"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.5, 1] }}
                transition={{ duration: 0.6, delay: padDelay, repeat: Infinity, repeatDelay: t.dur + t.gap - 0.6, ease: 'easeOut' }}
              />
            </g>
          )
        })}
      </svg>

      {/* chip central */}
      <div className="absolute left-[168px] top-[108px] size-[84px]">
        <motion.div
          className="absolute -inset-2 rounded-xl bg-emerald-500/25 blur-md"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex size-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-foreground/80 bg-foreground text-background shadow-lg">
          <Cpu className="size-6" />
          <span className="font-mono text-[9px] tracking-widest">TK·01</span>
          <span className="absolute left-1.5 top-1.5 size-1.5 rounded-full bg-background/60" />
        </div>
      </div>

      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-muted-foreground">rev. B · 3,3 V</div>
    </div>
  )
}
