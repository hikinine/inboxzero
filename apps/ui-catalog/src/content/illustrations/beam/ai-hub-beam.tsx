'use client'

import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

// "AI Hub Beam": um núcleo central recebe feixes de vários modelos ao redor.
const MODELS = ['Claude', 'GPT', 'Gemini', 'Llama', 'Mistral', 'Grok']
const CX = 300
const CY = 170
const R = 130

export default function AiHubBeam() {
  return (
    <div className="w-full max-w-xl text-foreground">
      <svg viewBox="0 0 600 340" className="h-auto w-full" role="img" aria-label="Hub de IA recebendo feixes de seis modelos">
        <defs>
          <linearGradient id="ahb-beam" x1="0" x2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {MODELS.map((m, i) => {
          const a = (i / MODELS.length) * Math.PI * 2 - Math.PI / 2
          const x = CX + Math.cos(a) * (R + 110)
          const y = CY + Math.sin(a) * R
          const d = `M ${x} ${y} Q ${(x + CX) / 2 + (CY - y) * 0.15} ${(y + CY) / 2 + (x - CX) * 0.15} ${CX} ${CY}`
          return (
            <g key={m}>
              <path d={d} fill="none" stroke="var(--border)" strokeWidth="1.5" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#ahb-beam)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0.3, pathSpacing: 1, pathOffset: 0 }}
                animate={{ pathLength: 0.3, pathSpacing: 1, pathOffset: 1 }}
                transition={{ duration: 2 + (i % 3) * 0.4, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
              />
              <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                <rect x={x - 44} y={y - 16} width="88" height="32" rx="16" fill="var(--card)" stroke="var(--border)" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--foreground)" fontFamily="inherit">
                  {m}
                </text>
              </motion.g>
            </g>
          )
        })}
        <motion.circle cx={CX} cy={CY} r="34" fill="var(--primary)" fillOpacity="0.08" animate={{ r: [34, 46, 34], fillOpacity: [0.08, 0.02, 0.08] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx={CX} cy={CY} r="28" fill="var(--card)" stroke="var(--border)" />
        <foreignObject x={CX - 14} y={CY - 14} width="28" height="28">
          <div className="flex size-7 items-center justify-center text-foreground">
            <Sparkles className="size-5" />
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}
