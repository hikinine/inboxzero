'use client'

import { motion } from 'motion/react'
import type { Transition } from 'motion/react'
import { Database, Layers, Mail, MessageSquare, Webhook } from 'lucide-react'

// "Webhook Beam": um evento dispara, passa pela fila e é entregue a três destinos.
// Pulsos (traços curtos) percorrem os caminhos em sequência e cada destino acusa o recebimento.
const CYCLE = 3.8
const SRC = { x: 64, y: 150 }
const QUEUE = { x: 250, y: 150 }
const TX = 444
const TARGETS = [
  { id: 'crm', y: 58, label: 'CRM', Icon: Database },
  { id: 'chat', y: 150, label: 'Slack', Icon: MessageSquare },
  { id: 'mail', y: 242, label: 'E-mail', Icon: Mail },
] as const

function curve(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`
}

// Pulso que viaja de `start` até `end` (segundos do ciclo) e some no restante.
function pulse(start: number, end: number) {
  const s = start / CYCLE
  const e = end / CYCLE
  const transition: Transition = { duration: CYCLE, times: [0, s - 0.002, s, e, e + 0.002, 1], repeat: Infinity, ease: 'linear' }
  return { animate: { pathOffset: [0, 0, 0, 1, 1, 1], opacity: [0, 0, 1, 1, 0, 0] }, transition }
}

// Selo "entregue" que aparece em `at` e some depois de `hold` segundos.
function stamp(at: number, hold = 0.7) {
  const a = at / CYCLE
  const b = (at + hold) / CYCLE
  const transition: Transition = { duration: CYCLE, times: [0, a - 0.002, a, b, b + 0.002, 1], repeat: Infinity, ease: 'easeOut' }
  return { animate: { opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1, 1, 0.5, 0.5] }, transition }
}

const IN_PATH = curve(SRC.x + 30, SRC.y, QUEUE.x - 54, QUEUE.y)
const outPath = (y: number) => curve(QUEUE.x + 54, QUEUE.y, TX - 46, y)

export default function WebhookBeam() {
  return (
    <div className="relative h-[300px] w-[520px] text-foreground">
      <svg viewBox="0 0 520 300" className="size-full" role="img" aria-label="Evento de webhook passando pela fila e entregue a três destinos">
        {/* trilhos */}
        <path d={IN_PATH} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        {TARGETS.map((t) => (
          <path key={t.id} d={outPath(t.y)} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        ))}

        {/* pulsos */}
        <motion.path d={IN_PATH} fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0.14, pathSpacing: 1, pathOffset: 0 }} {...pulse(0.2, 1.2)} />
        {TARGETS.map((t, i) => (
          <motion.path
            key={`pulse-${t.id}`}
            d={outPath(t.y)}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0.14, pathSpacing: 1, pathOffset: 0 }}
            {...pulse(1.5 + i * 0.2, 2.5 + i * 0.2)}
          />
        ))}

        {/* origem */}
        <text x={SRC.x} y={SRC.y + 52} textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--muted-foreground)" fontFamily="inherit">
          Evento
        </text>
        <text x={(SRC.x + QUEUE.x) / 2 + 2} y={SRC.y - 12} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="ui-monospace, monospace">
          pedido.criado
        </text>
        <circle cx={SRC.x} cy={SRC.y} r="30" fill="var(--primary)" />
        <foreignObject x={SRC.x - 30} y={SRC.y - 30} width="60" height="60">
          <div className="flex size-full items-center justify-center text-primary-foreground">
            <Webhook className="size-6" />
          </div>
        </foreignObject>

        {/* fila */}
        <motion.circle
          cx={QUEUE.x}
          cy={QUEUE.y}
          r="34"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          style={{ transformOrigin: `${QUEUE.x}px ${QUEUE.y}px` }}
          animate={{ scale: [1, 1, 1.7, 1.7], opacity: [0, 0.7, 0, 0] }}
          transition={{ duration: CYCLE, times: [0, 1.2 / CYCLE, 1.9 / CYCLE, 1], repeat: Infinity, ease: 'easeOut' }}
        />
        <rect x={QUEUE.x - 54} y={QUEUE.y - 30} width="108" height="60" rx="14" fill="var(--card)" stroke="var(--border)" />
        <foreignObject x={QUEUE.x - 54} y={QUEUE.y - 30} width="108" height="60">
          <div className="flex size-full items-center justify-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
              <Layers className="size-4" />
            </span>
            <div className="leading-tight">
              <div className="text-xs font-semibold">Fila</div>
              <div className="text-[10px] text-muted-foreground">3 pendentes</div>
            </div>
          </div>
        </foreignObject>

        {/* destinos */}
        {TARGETS.map((t, i) => (
          <g key={`node-${t.id}`}>
            <rect x={TX - 46} y={t.y - 22} width="92" height="44" rx="12" fill="var(--card)" stroke="var(--border)" />
            <foreignObject x={TX - 46} y={t.y - 22} width="92" height="44">
              <div className="flex size-full items-center justify-center gap-2 text-xs font-medium">
                <t.Icon className="size-4 text-muted-foreground" />
                {t.label}
              </div>
            </foreignObject>
            <motion.g className="text-emerald-500" {...stamp(2.5 + i * 0.2)}>
              <circle cx={TX + 44} cy={t.y - 20} r="9" fill="currentColor" />
              <path d={`M ${TX + 40} ${t.y - 20} l 3 3 l 5 -6`} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  )
}
