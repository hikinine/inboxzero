'use client'

import { motion } from 'motion/react'
import { Braces, Database, FileText, GitMerge, MessageCircle, ShoppingBag, Table } from 'lucide-react'

// "Multi Source Beam": cinco origens à esquerda convergem num nó de unificação; um único feixe segue para o destino.
const SOURCES = [
  { label: 'Loja virtual', Icon: ShoppingBag },
  { label: 'WhatsApp', Icon: MessageCircle },
  { label: 'Formulário', Icon: FileText },
  { label: 'Planilha', Icon: Table },
  { label: 'API', Icon: Braces },
] as const
const HUB = { x: 290, y: 150 }
const DEST = { x: 458, y: 150 }
const SRC_RIGHT = 134

function curve(ax: number, ay: number, bx: number, by: number) {
  const dx = (bx - ax) * 0.55
  return `M ${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`
}

const OUT_PATH = `M ${HUB.x + 36} ${HUB.y} H ${DEST.x - 50}`

export default function MultiSourceBeam() {
  return (
    <div className="relative h-[300px] w-[520px] text-foreground">
      <svg viewBox="0 0 520 300" className="size-full" role="img" aria-label="Cinco origens de dados convergindo num nó central e seguindo para um único destino">
        <defs>
          <linearGradient id="msb-beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.6" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {SOURCES.map((s, i) => {
          const y = 46 + i * 52
          const d = curve(SRC_RIGHT, y, HUB.x - 36, HUB.y)
          return (
            <g key={s.label}>
              <path d={d} fill="none" stroke="var(--border)" strokeWidth="1.5" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#msb-beam)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0.3, pathSpacing: 1, pathOffset: 0 }}
                animate={{ pathLength: 0.3, pathSpacing: 1, pathOffset: 1 }}
                transition={{ duration: 2 + (i % 3) * 0.35, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              />
              <motion.g initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <rect x="14" y={y - 17} width="120" height="34" rx="17" fill="var(--card)" stroke="var(--border)" />
                <foreignObject x="14" y={y - 17} width="120" height="34">
                  <div className="flex h-[34px] items-center gap-2 pl-3 text-xs font-medium">
                    <s.Icon className="size-4 text-muted-foreground" />
                    {s.label}
                  </div>
                </foreignObject>
              </motion.g>
            </g>
          )
        })}

        {/* saída única, mais grossa */}
        <path d={OUT_PATH} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        <motion.path
          d={OUT_PATH}
          fill="none"
          stroke="url(#msb-beam)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.5, pathSpacing: 1, pathOffset: 0 }}
          animate={{ pathLength: 0.5, pathSpacing: 1, pathOffset: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />

        {/* hub */}
        <motion.rect
          x={HUB.x - 36}
          y={HUB.y - 36}
          width="72"
          height="72"
          rx="20"
          fill="var(--primary)"
          animate={{ scale: [1, 1.3, 1], fillOpacity: [0.14, 0.02, 0.14] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x={HUB.x - 34} y={HUB.y - 34} width="68" height="68" rx="18" fill="var(--card)" stroke="var(--border)" />
        <foreignObject x={HUB.x - 34} y={HUB.y - 34} width="68" height="68">
          <div className="flex size-full flex-col items-center justify-center gap-1">
            <GitMerge className="size-6 text-primary" />
            <span className="text-[10px] font-medium text-muted-foreground">unificar</span>
          </div>
        </foreignObject>

        {/* destino */}
        <rect x={DEST.x - 50} y={DEST.y - 24} width="100" height="48" rx="14" fill="var(--primary)" />
        <foreignObject x={DEST.x - 50} y={DEST.y - 24} width="100" height="48">
          <div className="flex size-full items-center justify-center gap-2 text-sm font-semibold text-primary-foreground">
            <Database className="size-4" />
            CRM
          </div>
        </foreignObject>
        <text x={DEST.x} y={DEST.y + 44} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="inherit">
          1.284 contatos únicos
        </text>
      </svg>
    </div>
  )
}
