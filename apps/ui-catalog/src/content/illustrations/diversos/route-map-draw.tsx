'use client'

import { useEffect } from 'react'
import { House, Navigation2, Store } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Route Map Draw": mapa de entrega. A rota tracejada se desenha pelas ruas, o entregador percorre o caminho
// (offset-path CSS com offsetDistance animado) pintando o trecho já feito, o ETA desconta junto e, na chegada, o pin
// de destino quica e o status vira "Entregue". Tudo num único ciclo de keyframes.
const W = 440
const H = 300
const ROUTE = 'M 70 236 L 196 236 L 196 150 L 306 150 L 306 70 L 384 70'
const CYCLE = 7
const T = { draw: 0.16, go: 0.22, arrive: 0.8 } as const

export default function RouteMapDraw() {
  const eta = useMotionValue(14)
  const etaText = useTransform(eta, (v) => (v <= 0.05 ? 'Entregue' : `${Math.ceil(v)} min`))
  const km = useTransform(eta, (v) => `${((v / 14) * 3.2).toFixed(1).replace('.', ',')} km restantes`)
  useEffect(() => {
    const c = animate(eta, [14, 14, 0, 0], { duration: CYCLE, times: [0, T.go, T.arrive, 1], ease: 'linear', repeat: Infinity })
    return () => c.stop()
  }, [eta])

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-muted/40 text-foreground" style={{ width: W, height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden>
        {/* quadras, parque e rio */}
        <rect x="214" y="168" width="74" height="52" rx="8" className="fill-emerald-500/15" />
        <rect x="88" y="78" width="90" height="56" rx="8" className="fill-emerald-500/15" />
        <path d="M -10 120 C 60 100 90 40 160 30 S 250 10 300 -10" fill="none" className="stroke-sky-500/25" strokeWidth="16" strokeLinecap="round" />
        <g className="stroke-background" strokeWidth="12" strokeLinecap="round">
          {[70, 150, 236].map((y) => (
            <line key={`h${y}`} x1="-10" x2={W + 10} y1={y} y2={y} />
          ))}
          {[70, 196, 306, 384].map((x) => (
            <line key={`v${x}`} y1="-10" y2={H + 10} x1={x} x2={x} />
          ))}
        </g>
        <g className="stroke-border" strokeWidth="1" strokeDasharray="4 6">
          {[70, 150, 236].map((y) => (
            <line key={`hm${y}`} x1="-10" x2={W + 10} y1={y} y2={y} />
          ))}
          {[70, 196, 306, 384].map((x) => (
            <line key={`vm${x}`} y1="-10" y2={H + 10} x1={x} x2={x} />
          ))}
        </g>

        {/* rota prevista */}
        <motion.path
          d={ROUTE}
          fill="none"
          className="stroke-violet-500/40"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, T.draw, 0.96, 1], ease: 'easeInOut', repeat: Infinity }}
        />
        {/* trecho já percorrido */}
        <motion.path
          d={ROUTE}
          fill="none"
          className="stroke-violet-500"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1], opacity: [1, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, T.go, T.arrive, 1], ease: 'linear', repeat: Infinity }}
        />
      </svg>

      {/* origem */}
      <span className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-foreground text-background shadow" style={{ left: 70, top: 236 }}>
        <Store className="size-4" />
      </span>
      {/* destino */}
      <motion.span
        className="absolute flex size-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-emerald-500 text-white shadow-lg"
        style={{ left: 384, top: 70 - 40 }}
        animate={{ y: [0, 0, -14, 0, -5, 0, 0] }}
        transition={{ duration: CYCLE, times: [0, T.arrive, T.arrive + 0.03, T.arrive + 0.06, T.arrive + 0.08, T.arrive + 0.1, 1], repeat: Infinity }}
      >
        <House className="size-4" />
      </motion.span>

      {/* entregador */}
      <motion.div
        className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg ring-4 ring-violet-500/25"
        style={{ offsetPath: `path('${ROUTE}')`, offsetRotate: 'auto' }}
        initial={{ offsetDistance: '0%', opacity: 0 }}
        animate={{ offsetDistance: ['0%', '0%', '100%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: CYCLE, times: [0, T.go, T.arrive, 1], ease: 'linear', repeat: Infinity }}
      >
        <Navigation2 className="size-3.5 rotate-90 fill-current" />
      </motion.div>

      {/* card de status */}
      <div className="absolute bottom-3 right-3 w-[176px] rounded-xl border bg-card/95 p-2.5 shadow-md backdrop-blur">
        <p className="text-[10px] text-muted-foreground">Pedido #4821 · Moto</p>
        <motion.p className="text-lg font-bold tabular-nums tracking-tight">{etaText}</motion.p>
        <motion.p className="text-[10px] text-muted-foreground">{km}</motion.p>
      </div>
    </div>
  )
}
