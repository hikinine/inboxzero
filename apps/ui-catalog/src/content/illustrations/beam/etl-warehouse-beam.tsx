'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Code, Database, FileSpreadsheet, Warehouse } from 'lucide-react'
import { motion } from 'motion/react'

// "ETL Warehouse Beam": extrair → transformar → carregar. Postgres, API e CSV disparam pacotes (feixes curtos)
// para o nó de transformação, onde linhas bagunçadas (larguras e cores desencontradas) se alinham numa tabela limpa;
// um feixe contínuo leva o resultado ao data warehouse, cujo medidor enche e o total de linhas carregadas sobe.
const W = 500
const H = 280
const T = { x: 250, y: 140 }
const WH = { x: 430, y: 140 }
const SOURCES: ReadonlyArray<{ label: string; Icon: LucideIcon; tone: string; y: number }> = [
  { label: 'Postgres', Icon: Database, tone: 'text-sky-500', y: 62 },
  { label: 'API REST', Icon: Code, tone: 'text-violet-500', y: 140 },
  { label: 'vendas.csv', Icon: FileSpreadsheet, tone: 'text-emerald-500', y: 218 },
]
const SX = 62
const srcPath = (y: number) => `M ${SX + 24} ${y} C ${SX + 100} ${y}, ${T.x - 120} ${T.y}, ${T.x - 62} ${T.y}`
const LOAD_D = `M ${T.x + 62} ${T.y} L ${WH.x - 32} ${WH.y}`
const MESSY = [
  { w: 70, x: 6, c: 'bg-rose-400/70' },
  { w: 40, x: 22, c: 'bg-amber-400/70' },
  { w: 82, x: 0, c: 'bg-sky-400/70' },
  { w: 54, x: 14, c: 'bg-violet-400/70' },
] as const
const STAGES = ['Extrair', 'Transformar', 'Carregar'] as const

export default function EtlWarehouseBeam() {
  const [clean, setClean] = useState(false)
  const [rows, setRows] = useState(48210)
  const [fill, setFill] = useState(0.35)

  useEffect(() => {
    const a = setInterval(() => setClean((c) => !c), 1600)
    const b = setInterval(() => {
      setRows((r) => r + 137)
      setFill((f) => (f >= 0.92 ? 0.35 : f + 0.05))
    }, 800)
    return () => {
      clearInterval(a)
      clearInterval(b)
    }
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <div className="absolute inset-x-0 top-0 flex justify-between px-6 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {STAGES.map((s, i) => (
          <span key={s} className="flex items-center gap-1">
            <span className="flex size-4 items-center justify-center rounded-full bg-muted text-[9px] text-foreground">{i + 1}</span>
            {s}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Pipeline ETL de três fontes até o data warehouse">
        {SOURCES.map((s, i) => (
          <g key={s.label}>
            <path d={srcPath(s.y)} fill="none" stroke="var(--border)" strokeWidth="1.5" />
            <motion.path
              d={srcPath(s.y)}
              fill="none"
              stroke="currentColor"
              className={s.tone}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0.08, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.08, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
            />
          </g>
        ))}
        <path d={LOAD_D} fill="none" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d={LOAD_D}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 10"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {SOURCES.map((s) => (
        <div key={s.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: SX, top: s.y }}>
          <span className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm">
            <s.Icon className={`size-5 ${s.tone}`} />
          </span>
          <span className="text-[10px] text-muted-foreground">{s.label}</span>
        </div>
      ))}

      {/* transformação */}
      <div className="absolute w-[124px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card p-2.5 shadow-md" style={{ left: T.x, top: T.y }}>
        <div className="mb-2 flex items-center justify-between text-[10px]">
          <span className="font-medium">dbt · limpeza</span>
          <span className={clean ? 'text-emerald-500' : 'text-amber-500'}>{clean ? 'ok' : '…'}</span>
        </div>
        <div className="space-y-1.5">
          {MESSY.map((m, i) => (
            <div key={i} className="relative h-2 w-full">
              <motion.div
                className="absolute top-0 h-2 overflow-hidden rounded-full"
                animate={{ x: clean ? 0 : m.x, width: clean ? 96 : m.w }}
                transition={{ type: 'spring', stiffness: 180, damping: 20, delay: i * 0.06 }}
              >
                <div className={`absolute inset-0 ${m.c}`} />
                <motion.div className="absolute inset-0 bg-primary" animate={{ opacity: clean ? 0.85 - i * 0.15 : 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* warehouse */}
      <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: WH.x, top: WH.y }}>
        <div className="relative flex h-[76px] w-[60px] items-end overflow-hidden rounded-xl border bg-card shadow-sm">
          <motion.div className="w-full bg-primary/15" animate={{ height: `${fill * 100}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
          <Warehouse className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-foreground" />
        </div>
        <span className="text-[10px] font-medium">Warehouse</span>
        <span className="text-[10px] tabular-nums text-muted-foreground">{rows.toLocaleString('pt-BR')} linhas</span>
      </div>
    </div>
  )
}
