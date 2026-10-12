'use client'

import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

function Anel({ value, size, stroke, tone, children }: { value: number; size: number; stroke: number; tone: string; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={`${tone} transition-[stroke-dashoffset] duration-700`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

const STATUS = [
  { label: 'Concluído', value: 100, tone: 'text-emerald-500' },
  { label: 'Atenção', value: 72, tone: 'text-amber-500' },
  { label: 'Crítico', value: 18, tone: 'text-rose-500' },
]

export default function ProgressCircular() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Três tamanhos</p>
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <Anel value={35} size={48} stroke={5} tone="text-primary">
              <span className="text-[10px] font-medium tabular-nums">35%</span>
            </Anel>
            <span className="text-xs text-muted-foreground">Pequeno</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Anel value={64} size={80} stroke={7} tone="text-primary">
              <span className="text-sm font-semibold tabular-nums">64%</span>
            </Anel>
            <span className="text-xs text-muted-foreground">Médio</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Anel value={88} size={120} stroke={10} tone="text-primary">
              <div className="text-center">
                <div className="text-2xl font-semibold tabular-nums">88%</div>
                <div className="text-[11px] text-muted-foreground">da meta</div>
              </div>
            </Anel>
            <span className="text-xs text-muted-foreground">Grande</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <div className="flex flex-wrap gap-6">
          {STATUS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
              <Anel value={s.value} size={40} stroke={4} tone={s.tone}>
                {s.value === 100 ? <Check className={`size-4 ${s.tone}`} /> : <span className="text-[10px] font-medium tabular-nums">{s.value}</span>}
              </Anel>
              <div className="text-sm">
                <div className="font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.value}% das tarefas</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
