'use client'

import { useEffect, useState } from 'react'
import { Network, Server } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "API Gateway Beam": requisições chegam pela esquerda (método + rota), entram no gateway (auth + rate limit) e
// são roteadas para o microsserviço certo à direita, que devolve status e latência. A cada quinta chamada o rate
// limit barra a requisição: o gateway pisca em vermelho e o 429 aparece no log. Loop contínuo.
const W = 500
const H = 300
const GW = { x: 238, y: 140 }
const CLIENT_X = 70
const SVC_X = 420
const SERVICES = [
  { name: 'usuarios-svc', y: 62 },
  { name: 'pedidos-svc', y: 140 },
  { name: 'catalogo-svc', y: 218 },
] as const
const REQS = [
  { method: 'GET', route: '/usuarios/42', svc: 0, code: 200, ms: 38 },
  { method: 'POST', route: '/pedidos', svc: 1, code: 201, ms: 112 },
  { method: 'GET', route: '/produtos?q=tenis', svc: 2, code: 200, ms: 54 },
  { method: 'PATCH', route: '/pedidos/881', svc: 1, code: 200, ms: 71 },
  { method: 'GET', route: '/produtos/77', svc: -1, code: 429, ms: 2 },
] as const
const METHOD_TONE: Record<string, string> = {
  GET: 'text-emerald-600 dark:text-emerald-400',
  POST: 'text-sky-600 dark:text-sky-400',
  PATCH: 'text-amber-600 dark:text-amber-400',
}
const inD = (y: number) => `M ${CLIENT_X + 64} ${y} C ${CLIENT_X + 120} ${y}, ${GW.x - 90} ${GW.y}, ${GW.x - 40} ${GW.y}`
const outD = (y: number) => `M ${GW.x + 40} ${GW.y} C ${GW.x + 90} ${GW.y}, ${SVC_X - 110} ${y}, ${SVC_X - 58} ${y}`
const ROW_Y = [62, 140, 218] as const

function Pulse({ d, tone, delay = 0 }: { d: string; tone: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      className={tone}
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.45, 0.3, 0], pathOffset: [0, 0, 0.7, 1], opacity: [1, 1, 1, 0] }}
      transition={{ duration: 0.6, delay, times: [0, 0.3, 0.85, 1], ease: 'easeInOut' }}
    />
  )
}

export default function ApiGatewayBeam() {
  const [n, setN] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 1300)
    return () => clearInterval(id)
  }, [])

  const req = REQS[n % REQS.length]
  const row = n % 3
  const blocked = req.code === 429
  const log = [0, 1, 2].map((k) => ({ k: n - k, r: REQS[(((n - k) % REQS.length) + REQS.length) % REQS.length] })).filter((x) => x.k >= 0)

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Gateway de API roteando requisições para microsserviços">
        {ROW_Y.map((y) => (
          <path key={`i${y}`} d={inD(y)} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        ))}
        {SERVICES.map((s) => (
          <path key={s.name} d={outD(s.y)} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
        <Pulse key={`in-${n}`} d={inD(ROW_Y[row])} tone="text-primary" />
        {!blocked && <Pulse key={`out-${n}`} d={outD(SERVICES[req.svc].y)} tone="text-emerald-500" delay={0.6} />}
      </svg>

      {/* clientes */}
      {ROW_Y.map((y, i) => (
        <div key={y} className="absolute -translate-y-1/2" style={{ left: CLIENT_X - 62, top: y }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={i === row ? `r${n}` : `idle${i}`}
              className={`w-[126px] truncate rounded-md border bg-card px-2 py-1 font-mono text-[10px] shadow-sm ${i === row ? 'border-primary' : 'opacity-60'}`}
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: i === row ? 1 : 0.6 }}
              exit={{ opacity: 0 }}
            >
              {i === row ? (
                <>
                  <span className={`font-semibold ${METHOD_TONE[req.method] ?? ''}`}>{req.method}</span> {req.route}
                </>
              ) : (
                <span className="text-muted-foreground">app · web · mobile</span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}

      {/* gateway */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: GW.x, top: GW.y }}>
        <motion.div
          key={`gw${n}`}
          className="relative flex size-[76px] flex-col items-center justify-center rounded-2xl border-2 bg-card shadow-lg"
          initial={{ borderColor: 'var(--border)' }}
          animate={{ borderColor: blocked ? ['var(--border)', 'rgb(244 63 94)', 'var(--border)'] : ['var(--border)', 'var(--primary)', 'var(--border)'], x: blocked ? [0, -4, 4, -3, 0] : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Network className="size-6" />
          <span className="mt-1 text-[10px] font-semibold">Gateway</span>
          <span className="text-[8px] text-muted-foreground">auth · rate limit</span>
        </motion.div>
      </div>

      {/* serviços */}
      {SERVICES.map((s, i) => {
        const hit = !blocked && req.svc === i
        return (
          <div key={s.name} className="absolute -translate-y-1/2" style={{ left: SVC_X - 56, top: s.y }}>
            <div className={`flex w-[118px] items-center gap-1.5 rounded-lg border bg-card px-2 py-1.5 shadow-sm transition-colors duration-300 ${hit ? 'border-emerald-500/60' : ''}`}>
              <Server className="size-3.5 text-muted-foreground" />
              <div className="min-w-0 leading-tight">
                <div className="truncate font-mono text-[10px]">{s.name}</div>
                <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> saudável
                </div>
              </div>
            </div>
            <AnimatePresence>
              {hit && (
                <motion.span
                  key={`b${n}`}
                  className="absolute -top-2.5 right-0 rounded-full bg-emerald-500 px-1.5 text-[9px] font-semibold text-white tabular-nums"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.05, type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {req.code} · {req.ms}ms
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {/* log */}
      <div className="absolute bottom-1 left-1/2 w-[230px] -translate-x-1/2 rounded-lg border bg-muted/40 px-2 py-1 font-mono text-[9px]">
        {log.map(({ k, r }) => (
          <motion.div key={k} layout initial={{ opacity: 0 }} animate={{ opacity: k === n ? 1 : 0.55 }} className="flex justify-between gap-2">
            <span className="truncate">
              {r.method} {r.route}
            </span>
            <span className={r.code === 429 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}>{r.code}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
