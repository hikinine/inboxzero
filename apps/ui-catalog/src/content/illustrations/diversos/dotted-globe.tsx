'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame } from 'motion/react'

// "Dotted Globe": globo de pontos em projeção ortográfica simples girando continuamente (posições atualizadas por
// frame direto no DOM, sem re-render), com arcos de conexão entre cidades e pulsos percorrendo as rotas.
const SIZE = 340
const CX = SIZE / 2
const CY = SIZE / 2
const R = 132
const TILT = (22 * Math.PI) / 180
const SPEED = 0.28 // rad/s

// malha de pontos: linhas de latitude a cada 15°, densidade proporcional ao cosseno
const POINTS: Array<{ lat: number; lon: number }> = []
for (let lat = -75; lat <= 75; lat += 15) {
  const n = Math.max(6, Math.round(40 * Math.cos((lat * Math.PI) / 180)))
  for (let k = 0; k < n; k++) POINTS.push({ lat, lon: (k / n) * 360 })
}

const CITIES = {
  saoPaulo: { lat: -23.5, lon: -46.6 },
  lisboa: { lat: 38.7, lon: -9.1 },
  novaYork: { lat: 40.7, lon: -74 },
  cidadeDoCabo: { lat: -33.9, lon: 18.4 },
  toquio: { lat: 35.7, lon: 139.7 },
} as const
type City = keyof typeof CITIES
const CITY_KEYS = Object.keys(CITIES) as City[]
const ARCS: Array<[City, City]> = [
  ['saoPaulo', 'novaYork'],
  ['saoPaulo', 'lisboa'],
  ['lisboa', 'cidadeDoCabo'],
  ['novaYork', 'toquio'],
]

function project(latDeg: number, lonDeg: number, rot: number) {
  const lat = (latDeg * Math.PI) / 180
  const lon = (lonDeg * Math.PI) / 180 + rot
  const x = Math.cos(lat) * Math.sin(lon)
  const y = Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lon)
  const y2 = y * Math.cos(TILT) - z * Math.sin(TILT)
  const z2 = y * Math.sin(TILT) + z * Math.cos(TILT)
  return { x: CX + R * x, y: CY - R * y2, z: z2 }
}

export default function DottedGlobe() {
  const dots = useRef<Array<SVGCircleElement | null>>([])
  const arcs = useRef<Array<SVGPathElement | null>>([])
  const pulses = useRef<Array<SVGPathElement | null>>([])
  const markers = useRef<Array<SVGGElement | null>>([])

  useAnimationFrame((t) => {
    const rot = (t / 1000) * SPEED
    POINTS.forEach((p, i) => {
      const el = dots.current[i]
      if (!el) return
      const q = project(p.lat, p.lon, rot)
      if (q.z <= 0) {
        el.setAttribute('opacity', '0')
        return
      }
      el.setAttribute('cx', q.x.toFixed(1))
      el.setAttribute('cy', q.y.toFixed(1))
      el.setAttribute('r', (1 + 1.3 * q.z).toFixed(2))
      el.setAttribute('opacity', (0.15 + 0.85 * q.z).toFixed(2))
    })

    const pos = {} as Record<City, { x: number; y: number; z: number }>
    for (const c of CITY_KEYS) pos[c] = project(CITIES[c].lat, CITIES[c].lon, rot)

    CITY_KEYS.forEach((c, i) => {
      const el = markers.current[i]
      if (!el) return
      const q = pos[c]
      el.setAttribute('transform', `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`)
      el.setAttribute('opacity', q.z > 0.05 ? '1' : '0')
    })

    ARCS.forEach(([a, b], i) => {
      const el = arcs.current[i]
      const pulse = pulses.current[i]
      if (!el || !pulse) return
      const p = pos[a]
      const q = pos[b]
      const vis = Math.min(p.z, q.z)
      if (vis <= 0.03) {
        el.setAttribute('opacity', '0')
        pulse.setAttribute('opacity', '0')
        return
      }
      const mx = (p.x + q.x) / 2
      const my = (p.y + q.y) / 2
      const dx = mx - CX
      const dy = my - CY
      const dl = Math.hypot(dx, dy) || 1
      const dist = Math.hypot(p.x - q.x, p.y - q.y)
      const bulge = dl + dist * 0.38
      const cx = CX + (dx / dl) * bulge
      const cy = CY + (dy / dl) * bulge
      const d = `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`
      el.setAttribute('d', d)
      pulse.setAttribute('d', d)
      const o = Math.min(1, vis * 2.5).toFixed(2)
      el.setAttribute('opacity', o)
      pulse.setAttribute('opacity', o)
    })
  })

  return (
    <div className="relative size-[340px] text-foreground">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full" role="img" aria-label="Globo de pontos girando com rotas de conexão entre cidades">
        <defs>
          <radialGradient id="dg-sheen" cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.02" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={R + 4} fill="url(#dg-sheen)" stroke="var(--border)" />
        {POINTS.map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              dots.current[i] = el
            }}
            cx={CX}
            cy={CY}
            r="1.5"
            fill="var(--foreground)"
            opacity="0"
          />
        ))}
        {ARCS.map(([a, b], i) => (
          <g key={`${a}-${b}`}>
            <path
              ref={(el) => {
                arcs.current[i] = el
              }}
              d="M 0 0"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              opacity="0"
            />
            <motion.path
              ref={(el) => {
                pulses.current[i] = el
              }}
              d="M 0 0"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0"
              initial={{ pathLength: 0.25, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.25, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            />
          </g>
        ))}
        {CITY_KEYS.map((c, i) => (
          <g
            key={c}
            ref={(el) => {
              markers.current[i] = el
            }}
            opacity="0"
          >
            <motion.circle r="3" fill="var(--primary)" style={{ transformOrigin: '0px 0px' }} animate={{ scale: [1, 3.7], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: i * 0.35 }} />
            <circle r="3" fill="var(--primary)" stroke="var(--background)" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-2 left-2 rounded-md border bg-background/90 px-2 py-1 text-[11px] backdrop-blur">
        <span className="font-medium">5 regiões</span> · 4 rotas ativas
      </div>
    </div>
  )
}
