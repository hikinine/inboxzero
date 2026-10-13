'use client'

import { Database } from 'lucide-react'
import { motion } from 'motion/react'

// "Solar Data Orbit": sistema solar em perspectiva 3D (plano inclinado com preserve-3d). O "sol" é o banco de dados,
// com coroa girando e vento solar de partículas saindo no plano; métricas orbitam em três anéis com velocidades
// diferentes e passam POR TRÁS do sol (ordenação de profundidade real do navegador). Cada chip contra-gira e se
// levanta do plano para ficar sempre de frente.
const TILT = 66

const PLANETS = [
  { label: 'Leads', value: '12,4 mil', ring: 92, duration: 14, start: 0, dot: 'bg-sky-500' },
  { label: 'Vendas', value: 'R$ 84 mil', ring: 92, duration: 14, start: 180, dot: 'bg-emerald-500' },
  { label: 'Tickets', value: '318', ring: 138, duration: 22, start: 70, dot: 'bg-amber-500' },
  { label: 'Pix', value: '1.902', ring: 138, duration: 22, start: 250, dot: 'bg-violet-500' },
  { label: 'Eventos', value: '2,1 mi', ring: 182, duration: 32, start: 130, dot: 'bg-rose-500' },
] as const

const RINGS = [92, 138, 182] as const
const WIND = Array.from({ length: 14 }, (_, i) => ({ angle: (i * 360) / 14 + (i % 2) * 9, delay: (i * 0.37) % 2.4 }))

export default function SolarDataOrbit() {
  return (
    <div className="relative flex h-[300px] w-[440px] items-center justify-center overflow-hidden text-foreground [perspective:900px]">
      <div className="relative size-0 [transform-style:preserve-3d]" style={{ transform: `rotateX(${TILT}deg)` }}>
        {/* anéis */}
        {RINGS.map((r) => (
          <div key={r} className="absolute rounded-full border border-foreground/15" style={{ width: r * 2, height: r * 2, left: -r, top: -r }} />
        ))}

        {/* vento solar no plano */}
        {WIND.map((w, i) => {
          const a = (w.angle * Math.PI) / 180
          return (
            <motion.span
              key={i}
              className="absolute -ml-0.5 -mt-0.5 size-1 rounded-full bg-amber-400"
              animate={{ x: [Math.cos(a) * 34, Math.cos(a) * 196], y: [Math.sin(a) * 34, Math.sin(a) * 196], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: w.delay, repeat: Infinity, ease: 'easeOut' }}
            />
          )
        })}

        {/* planetas */}
        {PLANETS.map((p) => (
          <motion.div
            key={p.label}
            className="absolute left-0 top-0 [transform-style:preserve-3d]"
            initial={{ rotateZ: p.start }}
            animate={{ rotateZ: p.start + 360 }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute [transform-style:preserve-3d]"
              style={{ left: p.ring, top: 0 }}
              initial={{ rotateZ: -p.start }}
              animate={{ rotateZ: -p.start - 360 }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
            >
              <div className="[transform-style:preserve-3d]" style={{ transform: `rotateX(${-TILT}deg)` }}>
                <div className="-translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border bg-card/95 py-1 pl-1.5 pr-2.5 text-[10px] shadow-md">
                  <span className="flex items-center gap-1.5">
                    <span className={`size-2.5 rounded-full ${p.dot}`} />
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-semibold tabular-nums">{p.value}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* sol */}
        <div className="absolute [transform-style:preserve-3d]" style={{ transform: `rotateX(${-TILT}deg)` }}>
          <div className="relative -translate-x-1/2 -translate-y-[70%]">
            <motion.div
              className="absolute -inset-5 rounded-full bg-[conic-gradient(from_0deg,transparent,var(--color-amber-400),transparent,var(--color-orange-400),transparent)] opacity-60 blur-md"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg shadow-amber-500/50"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Database className="size-7" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">núcleo de dados · 5 fluxos ativos</div>
    </div>
  )
}
