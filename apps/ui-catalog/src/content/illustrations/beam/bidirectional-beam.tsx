'use client'

import { motion } from 'motion/react'
import { Server, Smartphone } from 'lucide-react'

// "Bidirectional Beam": dois nós trocam feixes em sentidos opostos — requisição por cima (cor primária),
// resposta por baixo (verde). O ponto de status de cada nó acende quando o feixe chega.
const A = { x: 72, y: 110 }
const B = { x: 348, y: 110 }
const TOP = `M ${A.x + 40} ${A.y - 12} C ${A.x + 120} ${A.y - 78}, ${B.x - 120} ${A.y - 78}, ${B.x - 40} ${B.y - 12}`
const BOTTOM = `M ${B.x - 40} ${B.y + 12} C ${B.x - 120} ${B.y + 78}, ${A.x + 120} ${A.y + 78}, ${A.x + 40} ${A.y + 12}`

function Node({ x, y, label, Icon }: { x: number; y: number; label: string; Icon: typeof Server }) {
  return (
    <g>
      <rect x={x - 40} y={y - 34} width="80" height="68" rx="16" fill="var(--card)" stroke="var(--border)" />
      <foreignObject x={x - 40} y={y - 34} width="80" height="68">
        <div className="flex size-full flex-col items-center justify-center gap-1.5">
          <Icon className="size-6" />
          <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        </div>
      </foreignObject>
    </g>
  )
}

export default function BidirectionalBeam() {
  return (
    <div className="relative h-[220px] w-[420px] text-foreground">
      <svg viewBox="0 0 420 220" className="size-full" role="img" aria-label="Feixes de requisição e resposta entre app e servidor">
        <defs>
          <linearGradient id="bdb-req" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bdb-res" x1="0" x2="1" y1="0" y2="0" className="text-emerald-500">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.5" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* trilhos */}
        <path d={TOP} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        <path d={BOTTOM} fill="none" stroke="var(--border)" strokeWidth="1.5" />

        {/* requisição: A → B */}
        <motion.path
          d={TOP}
          fill="none"
          stroke="url(#bdb-req)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 0 }}
          animate={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
        {/* resposta: B → A (caminho desenhado da direita para a esquerda) */}
        <motion.path
          d={BOTTOM}
          fill="none"
          stroke="url(#bdb-res)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 0 }}
          animate={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.9 }}
        />

        <text x="210" y="36" textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--muted-foreground)" fontFamily="inherit">
          requisição →
        </text>
        <text x="210" y="196" textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--muted-foreground)" fontFamily="inherit">
          ← resposta
        </text>

        <Node x={A.x} y={A.y} label="App" Icon={Smartphone} />
        <Node x={B.x} y={B.y} label="Servidor" Icon={Server} />

        {/* indicadores de chegada */}
        <motion.circle
          cx={B.x - 40}
          cy={B.y - 12}
          r="4"
          fill="var(--primary)"
          animate={{ opacity: [0.25, 0.25, 1, 0.25], scale: [1, 1, 1.7, 1] }}
          transition={{ duration: 1.8, times: [0, 0.55, 0.72, 1], repeat: Infinity }}
        />
        <motion.circle
          cx={A.x + 40}
          cy={A.y + 12}
          r="4"
          className="text-emerald-500"
          fill="currentColor"
          animate={{ opacity: [0.25, 0.25, 1, 0.25], scale: [1, 1, 1.7, 1] }}
          transition={{ duration: 1.8, times: [0, 0.55, 0.72, 1], repeat: Infinity, delay: 0.9 }}
        />
      </svg>
    </div>
  )
}
