'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

// "Dashboard Self Build": um painel que se monta sozinho. Os cards de KPI caem com mola e os números contam, a linha
// do gráfico se desenha com a área preenchendo por baixo, as barras sobem em cascata e a rosca preenche segmento a
// segmento; segura, esvazia e remonta (a cada ciclo tudo é remontado via key).
const CYCLE = 6500
const KPIS = [
  { label: 'Receita', value: 48920, prefix: 'R$ ', delta: '+12%' },
  { label: 'Pedidos', value: 1284, prefix: '', delta: '+8%' },
  { label: 'Ticket médio', value: 381, prefix: 'R$ ', delta: '+3%' },
] as const
const LINE = [22, 30, 26, 38, 34, 46, 42, 55, 51, 64, 60, 72]
const BARS = [40, 62, 48, 80, 66, 92, 74]
const DONUT = [
  { v: 0.46, cls: 'text-violet-500', label: 'Pix' },
  { v: 0.34, cls: 'text-sky-500', label: 'Cartão' },
  { v: 0.2, cls: 'text-amber-500', label: 'Boleto' },
] as const

function CountUp({ to, prefix, delay }: { to: number; prefix: string; delay: number }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => prefix + Math.round(v).toLocaleString('pt-BR'))
  useEffect(() => {
    const c = animate(mv, to, { duration: 1.2, delay, ease: 'easeOut' })
    return () => c.stop()
  }, [mv, to, delay])
  return <motion.span>{text}</motion.span>
}

function Build() {
  const w = 236
  const h = 92
  const pts = LINE.map((v, i) => [(i / (LINE.length - 1)) * w, h - (v / 80) * h] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`
  let acc = 0
  return (
    <motion.div className="grid size-full grid-cols-3 grid-rows-[auto_1fr] gap-2.5" exit={{ opacity: 0 }}>
      {KPIS.map((k, i) => (
        <motion.div
          key={k.label}
          className="rounded-xl border bg-card p-2.5"
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 + i * 0.12 }}
        >
          <p className="text-[10px] text-muted-foreground">{k.label}</p>
          <p className="text-base font-bold tabular-nums tracking-tight">
            <CountUp to={k.value} prefix={k.prefix} delay={0.25 + i * 0.12} />
          </p>
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{k.delta} vs. mês anterior</span>
        </motion.div>
      ))}

      {/* gráfico de linha + barras */}
      <motion.div className="col-span-2 flex flex-col rounded-xl border bg-card p-2.5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <p className="text-[10px] font-medium text-muted-foreground">Vendas · últimos 12 meses</p>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-1 h-[92px] w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--border)" strokeDasharray="2 4" />
          ))}
          {BARS.map((b, i) => (
            <motion.rect
              key={i}
              x={8 + i * 33}
              y={h - (b / 100) * h * 0.55}
              width="14"
              height={(b / 100) * h * 0.55}
              rx="3"
              className="fill-muted"
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.7 + i * 0.06 }}
            />
          ))}
          <motion.path d={area} className="fill-violet-500/15" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }} />
          <motion.path d={line} fill="none" stroke="rgb(139 92 246)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 1.1, ease: 'easeInOut' }} />
        </svg>
      </motion.div>

      {/* rosca */}
      <motion.div className="flex flex-col items-center rounded-xl border bg-card p-2.5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
        <p className="self-start text-[10px] font-medium text-muted-foreground">Meios de pagamento</p>
        <svg viewBox="0 0 80 80" className="mt-1 size-[72px] -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r="28" fill="none" stroke="var(--muted)" strokeWidth="12" />
          {DONUT.map((d, i) => {
            const start = acc
            acc += d.v
            return (
              <motion.circle
                key={d.label}
                cx="40"
                cy="40"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className={d.cls}
                style={{ transformBox: 'view-box', transformOrigin: '40px 40px', rotate: start * 360 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: d.v - 0.01 }}
                transition={{ delay: 1.2 + i * 0.35, duration: 0.45, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
        <div className="mt-1.5 flex gap-1.5 text-[9px] text-muted-foreground">
          {DONUT.map((d) => (
            <span key={d.label} className="flex items-center gap-0.5">
              <span className={cn('size-1.5 rounded-full bg-current', d.cls)} />
              {d.label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DashboardSelfBuild() {
  const [cycle, setCycle] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const a = setTimeout(() => setVisible(false), CYCLE - 600)
    const b = setTimeout(() => {
      setCycle((c) => c + 1)
      setVisible(true)
    }, CYCLE)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [cycle])

  return (
    <div className="h-[300px] w-[460px] rounded-2xl border bg-muted/40 p-3 text-foreground">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold">Visão geral da loja</p>
        </div>
        <span className="text-[10px] text-muted-foreground">Outubro de 2026</span>
      </div>
      <motion.div className="h-[248px]" animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.98 }} transition={{ duration: 0.4 }}>
        <Build key={cycle} />
      </motion.div>
    </div>
  )
}
