'use client'

import { motion } from 'motion/react'

// "Satellite Orbit": um satélite percorre uma órbita elíptica inclinada ao redor do planeta e passa por trás dele
// (duas cópias com opacidade alternada), com rastro em três camadas e sinal pulsando até a estação em terra.
// As posições são amostradas por comprimento de arco para casarem com o rastro (pathOffset) do motion.
const CX = 200
const CY = 150
const RX = 150
const RY = 58
const TILT = -18
const PLANET_R = 46
const PERIOD = 14
const TRAIL = 0.2
const N = 72

const ORBIT = `M ${CX + RX} ${CY} A ${RX} ${RY} 0 1 1 ${CX - RX} ${CY} A ${RX} ${RY} 0 1 1 ${CX + RX} ${CY}`

// Amostra a elipse em N pontos equidistantes em comprimento de arco, começando na cabeça do rastro.
const SAMPLES = (() => {
  const steps = 1440
  const pts: Array<[number, number]> = []
  const cum: number[] = [0]
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const p: [number, number] = [RX * Math.cos(t), RY * Math.sin(t)]
    if (i > 0) {
      const q = pts[i - 1]
      cum.push(cum[i - 1] + Math.hypot(p[0] - q[0], p[1] - q[1]))
    }
    pts.push(p)
  }
  const total = cum[steps]
  const xs: number[] = []
  const ys: number[] = []
  const rot: number[] = []
  const far: boolean[] = []
  let prev = 0
  for (let k = 0; k <= N; k++) {
    const frac = ((k % N) / N + TRAIL) % 1
    const target = frac * total
    let j = 0
    while (j < steps - 1 && cum[j + 1] < target) j++
    const p = pts[j]
    const q = pts[j + 1]
    let ang = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI
    if (k > 0) {
      while (ang < prev - 180) ang += 360
      while (ang > prev + 180) ang -= 360
    }
    prev = ang
    xs.push(CX + p[0])
    ys.push(CY + p[1])
    rot.push(ang)
    far.push(p[1] < 0)
  }
  return { xs, ys, rot, far }
})()

const BACK_OPACITY = SAMPLES.far.map((f) => (f ? 1 : 0))
const FRONT_OPACITY = SAMPLES.far.map((f) => (f ? 0 : 1))
const DEPTH_SCALE = SAMPLES.far.map((f) => (f ? 0.78 : 1))

const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}
const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: 10 + rnd(i) * 380,
  y: 10 + rnd(i + 50) * 250,
  r: 0.7 + rnd(i + 100) * 1.1,
  d: 1.6 + rnd(i + 150) * 3,
  delay: rnd(i + 200) * 3,
}))

const TRAILS = [
  { len: 0.2, w: 2, op: 0.22 },
  { len: 0.12, w: 2.5, op: 0.5 },
  { len: 0.05, w: 3, op: 0.95 },
]

function Satellite({ layer }: { layer: 'back' | 'front' }) {
  return (
    <motion.g
      animate={{ x: SAMPLES.xs, y: SAMPLES.ys, rotate: SAMPLES.rot, scale: DEPTH_SCALE, opacity: layer === 'back' ? BACK_OPACITY : FRONT_OPACITY }}
      transition={{ duration: PERIOD, ease: 'linear', repeat: Infinity }}
    >
      {/* caixa invisível simétrica: mantém o centro da bbox (e a origem da rotação) em 0,0 */}
      <rect x="-34" y="-18" width="68" height="36" fill="none" />
      {/* ondas de sinal */}
      {[0, 1].map((i) => (
        <motion.circle key={i} cx="0" cy="0" r="9" fill="none" stroke="var(--primary)" strokeWidth="1.5" animate={{ scale: [1, 3.2], opacity: [0.7, 0] }} transition={{ duration: 2.2, delay: i * 1.1, repeat: Infinity, ease: 'easeOut' }} />
      ))}
      {/* painéis solares */}
      <rect x="-32" y="-5" width="20" height="10" rx="1.5" className="fill-sky-500" />
      <rect x="12" y="-5" width="20" height="10" rx="1.5" className="fill-sky-500" />
      <path d="M -26 -5 V 5 M -20 -5 V 5 M 18 -5 V 5 M 24 -5 V 5 M -32 0 H -12 M 12 0 H 32" stroke="var(--background)" strokeWidth="1" opacity="0.7" />
      {/* braço + corpo + antena */}
      <rect x="-12" y="-2" width="24" height="4" fill="var(--muted-foreground)" />
      <rect x="-7" y="-7" width="14" height="14" rx="3" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.5" />
      <circle cx="0" cy="-12" r="3.5" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="2" fill="var(--primary)" />
    </motion.g>
  )
}

export default function SatelliteOrbit() {
  return (
    <div className="relative h-[300px] w-[400px] text-foreground">
      <svg viewBox="0 0 400 300" className="size-full" role="img" aria-label="Satélite orbitando um planeta com rastro e sinal pulsando">
        <defs>
          <radialGradient id="so-planet" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="currentColor" className="text-sky-300" />
            <stop offset="55%" stopColor="currentColor" className="text-sky-500" />
            <stop offset="100%" stopColor="currentColor" className="text-indigo-700" />
          </radialGradient>
        </defs>

        {/* estrelas */}
        {STARS.map((s, i) => (
          <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--muted-foreground)" animate={{ opacity: [0.15, 0.8, 0.15] }} transition={{ duration: s.d, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

        {/* órbita, rastro e satélite (lado de trás) */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <path d={ORBIT} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" />
          {TRAILS.map((t) => (
            <motion.path
              key={t.len}
              d={ORBIT}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={t.w}
              strokeLinecap="round"
              opacity={t.op}
              initial={{ pathLength: t.len, pathSpacing: 1 - t.len, pathOffset: TRAIL - t.len }}
              animate={{ pathLength: t.len, pathSpacing: 1 - t.len, pathOffset: [TRAIL - t.len, TRAIL - t.len + 1] }}
              transition={{ duration: PERIOD, ease: 'linear', repeat: Infinity }}
            />
          ))}
          <Satellite layer="back" />
        </g>

        {/* planeta */}
        <circle cx={CX} cy={CY} r={PLANET_R + 10} fill="var(--primary)" opacity="0.12" />
        <circle cx={CX} cy={CY} r={PLANET_R} fill="url(#so-planet)" />
        <g className="fill-emerald-300" opacity="0.55">
          <ellipse cx={CX - 14} cy={CY - 10} rx="17" ry="9" />
          <ellipse cx={CX + 13} cy={CY + 13} rx="12" ry="7" />
          <ellipse cx={CX + 18} cy={CY - 20} rx="7" ry="4" />
        </g>
        {/* estação em terra */}
        <circle cx={CX + 6} cy={CY + 26} r="2.5" className="fill-emerald-400" />
        {[0, 1].map((i) => (
          <motion.circle key={i} cx={CX + 6} cy={CY + 26} r="5" fill="none" className="stroke-emerald-400" strokeWidth="1" animate={{ scale: [1, 3], opacity: [0.9, 0] }} transition={{ duration: 2.2, delay: i * 1.1, repeat: Infinity, ease: 'easeOut' }} />
        ))}

        {/* satélite (lado da frente) */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <Satellite layer="front" />
        </g>
      </svg>

      <div className="absolute bottom-3 left-4 font-mono text-[10px] text-muted-foreground">SAT-7 · órbita baixa · 408 km</div>
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <motion.span className="size-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
        Sinal ativo
      </div>
    </div>
  )
}
