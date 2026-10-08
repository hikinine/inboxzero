'use client'

import { motion } from 'motion/react'
import { ArrowRight, Database, Filter, HardDriveDownload } from 'lucide-react'

// "Pipeline Beam": origem → filtro → destino com barras que preenchem e taxa de transferência.
const STAGES = [
  { label: 'Origem', sub: 'postgres · 2,4 GB', Icon: Database },
  { label: 'Filtro', sub: 'dedupe + validação', Icon: Filter },
  { label: 'Destino', sub: 'warehouse', Icon: HardDriveDownload },
]

export default function PipelineBeam() {
  return (
    <div className="w-full max-w-2xl text-foreground">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {STAGES.map((s, i) => (
          <div key={s.label} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl border bg-card p-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md bg-muted">
                  <s.Icon className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-medium leading-tight">{s.label}</div>
                  <div className="text-[11px] text-muted-foreground">{s.sub}</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: ['0%', '100%', '100%', '0%'] }}
                  transition={{ duration: 4, times: [0, 0.6, 0.85, 1], repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
            {i < STAGES.length - 1 && (
              <div className="relative flex w-10 flex-col items-center">
                <svg viewBox="0 0 40 24" className="h-6 w-10 overflow-visible">
                  <path d="M 0 12 H 40" stroke="var(--border)" strokeWidth="1.5" />
                  <motion.path
                    d="M 0 12 H 40"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 0 }}
                    animate={{ pathLength: 0.4, pathSpacing: 1, pathOffset: 1 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                  />
                </svg>
                <ArrowRight className="absolute -right-1 top-1 size-3.5 text-muted-foreground" />
                <motion.span
                  className="mt-1 font-mono text-[10px] text-muted-foreground"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  {i === 0 ? '48 MB/s' : '31 MB/s'}
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
