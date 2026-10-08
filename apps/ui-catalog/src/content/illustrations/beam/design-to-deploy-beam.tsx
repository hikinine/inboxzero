'use client'

import { motion } from 'motion/react'
import { Code2, Figma, Rocket, Sparkles } from 'lucide-react'

// "Design to Deploy Beam": pipeline horizontal Figma → código → IA → deploy, com feixes entre as etapas.
const STAGES = [
  { Icon: Figma, label: 'Figma' },
  { Icon: Code2, label: 'Next.js' },
  { Icon: Sparkles, label: 'Claude' },
  { Icon: Rocket, label: 'Deploy' },
]

export default function DesignToDeployBeam() {
  return (
    <div className="w-full max-w-xl text-foreground">
      <svg viewBox="0 0 560 120" className="h-auto w-full" role="img" aria-label="Pipeline do design ao deploy">
        <defs>
          <linearGradient id="d2d-beam" x1="0" x2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {STAGES.map((s, i) => {
          const x = 70 + i * 140
          return (
            <g key={s.label}>
              {i < STAGES.length - 1 && (
                <>
                  <path d={`M ${x + 36} 60 H ${x + 104}`} stroke="var(--border)" strokeWidth="1.5" />
                  <motion.path
                    d={`M ${x + 36} 60 H ${x + 104}`}
                    stroke="url(#d2d-beam)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.5, pathSpacing: 1, pathOffset: 0 }}
                    animate={{ pathLength: 0.5, pathSpacing: 1, pathOffset: 1 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                  />
                </>
              )}
              <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12 }}>
                <rect x={x - 36} y={24} width="72" height="72" rx="16" fill="var(--card)" stroke="var(--border)" />
                <foreignObject x={x - 36} y={24} width="72" height="72">
                  <div className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 text-foreground">
                    <s.Icon className="size-5" />
                    <span className="text-[11px] font-medium">{s.label}</span>
                  </div>
                </foreignObject>
              </motion.g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
