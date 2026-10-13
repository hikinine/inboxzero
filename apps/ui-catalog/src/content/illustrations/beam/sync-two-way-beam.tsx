'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Sheet, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Sync Two Way Beam": CRM e planilha sincronizando registros nos dois sentidos. Uma edição acende a linha de origem,
// o feixe cruza pelo arco (de cima: CRM → planilha; de baixo: planilha → CRM) e a linha correspondente pisca com o
// valor novo do outro lado. Quatro edições e o ciclo recomeça do estado inicial.
type Rec = { name: string; stage: string; value: string }
type Side = 'crm' | 'sheet'

const INITIAL: Rec[] = [
  { name: 'Mariana Costa', stage: 'Lead', value: 'R$ 1.200' },
  { name: 'Diego Ramos', stage: 'Proposta', value: 'R$ 4.800' },
  { name: 'Bianca Lopes', stage: 'Lead', value: 'R$ 950' },
  { name: 'Otávio Nunes', stage: 'Negociação', value: 'R$ 2.300' },
]

const STEPS: ReadonlyArray<{ from: Side; row: number; field: 'stage' | 'value'; next: string }> = [
  { from: 'crm', row: 0, field: 'stage', next: 'Cliente' },
  { from: 'sheet', row: 2, field: 'value', next: 'R$ 3.150' },
  { from: 'crm', row: 3, field: 'stage', next: 'Fechado' },
  { from: 'sheet', row: 1, field: 'value', next: 'R$ 5.400' },
]

const TOP = 'M 204 92 Q 250 26, 296 92'
const BOTTOM = 'M 296 196 Q 250 262, 204 196'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const stageTone = (s: string) =>
  s === 'Cliente' || s === 'Fechado' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : s === 'Lead' ? 'bg-muted text-muted-foreground' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'

export default function SyncTwoWayBeam() {
  const [crm, setCrm] = useState<Rec[]>(INITIAL)
  const [sheet, setSheet] = useState<Rec[]>(INITIAL)
  const [edit, setEdit] = useState<{ side: Side; row: number } | null>(null)
  const [flash, setFlash] = useState<{ side: Side; row: number } | null>(null)
  const [beam, setBeam] = useState<{ dir: 'top' | 'bottom'; key: number } | null>(null)
  const [synced, setSynced] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let k = 0
      while (!cancelled) {
        setCrm(INITIAL)
        setSheet(INITIAL)
        setSynced(0)
        await sleep(700)
        for (const s of STEPS) {
          if (cancelled) return
          const patch = (list: Rec[]) => list.map((r, i) => (i === s.row ? { ...r, [s.field]: s.next } : r))
          const other: Side = s.from === 'crm' ? 'sheet' : 'crm'
          setEdit({ side: s.from, row: s.row })
          ;(s.from === 'crm' ? setCrm : setSheet)(patch)
          await sleep(650)
          if (cancelled) return
          setBeam({ dir: s.from === 'crm' ? 'top' : 'bottom', key: ++k })
          await sleep(900)
          if (cancelled) return
          setEdit(null)
          ;(other === 'crm' ? setCrm : setSheet)(patch)
          setFlash({ side: other, row: s.row })
          setSynced((n) => n + 1)
          await sleep(1100)
          setFlash(null)
        }
        await sleep(900)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const rowState = (side: Side, row: number) => (edit?.side === side && edit.row === row ? 'edit' : flash?.side === side && flash.row === row ? 'flash' : 'idle')

  return (
    <div className="relative h-[288px] w-[500px] text-foreground">
      <svg viewBox="0 0 500 288" className="absolute inset-0 size-full" aria-hidden>
        <path d={TOP} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 5" />
        <path d={BOTTOM} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 5" />
        {beam && (
          <motion.path
            key={beam.key}
            d={beam.dir === 'top' ? TOP : BOTTOM}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={beam.dir === 'top' ? 'text-sky-500' : 'text-emerald-500'}
            initial={{ pathLength: 0, pathOffset: 0, opacity: 1 }}
            animate={{ pathLength: [0, 0.45, 0], pathOffset: [0, 0.3, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        )}
      </svg>

      {/* CRM */}
      <div className="absolute left-0 top-6 w-[204px] overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3 py-2 text-[11px] font-medium">
          <Users className="size-3.5 text-sky-500" /> CRM · Contatos
        </div>
        <div className="divide-y">
          {crm.map((r, i) => {
            const st = rowState('crm', i)
            return (
              <div key={r.name} className={cn('flex items-center justify-between gap-2 px-3 py-2 transition-colors duration-300', st === 'edit' && 'bg-sky-500/10', st === 'flash' && 'bg-emerald-500/15')}>
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-medium">{r.name}</div>
                  <div className="text-[10px] tabular-nums text-muted-foreground">{r.value}</div>
                </div>
                <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-medium', stageTone(r.stage))}>{r.stage}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Planilha */}
      <div className="absolute right-0 top-6 w-[204px] overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3 py-2 text-[11px] font-medium">
          <Sheet className="size-3.5 text-emerald-500" /> Planilha · Funil
        </div>
        <div className="grid grid-cols-[1fr_auto] font-mono text-[10px]">
          {sheet.map((r, i) => {
            const st = rowState('sheet', i)
            return (
              <div key={r.name} className={cn('col-span-2 grid grid-cols-subgrid border-b px-3 py-[9px] last:border-b-0 transition-colors duration-300', st === 'edit' && 'bg-emerald-500/10', st === 'flash' && 'bg-sky-500/15')}>
                <span className="truncate">
                  {r.name.split(' ')[0]} · {r.stage}
                </span>
                <span className="tabular-nums text-muted-foreground">{r.value}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* centro */}
      <div className="absolute left-1/2 top-[144px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
        <motion.span
          className="flex size-10 items-center justify-center rounded-full border bg-background shadow-sm"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw className="size-4 text-muted-foreground" />
        </motion.span>
        <span className="text-[10px] tabular-nums text-muted-foreground">{synced}/4</span>
      </div>
    </div>
  )
}
