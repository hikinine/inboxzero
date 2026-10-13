'use client'

import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Metric Ticker Marquee": letreiro de bolsa para métricas do negócio. A faixa principal (invertida: escura no tema
// claro e clara no escuro) rola com KPIs, variação e minigráfico; os valores oscilam a cada 1,5s com um piscar verde
// ou vermelho. Embaixo, uma faixa fina de pedidos corre no sentido contrário.
const METRICS = [
  { label: 'MRR', base: 182400, kind: 'brl' },
  { label: 'Pedidos', base: 1284, kind: 'int' },
  { label: 'Ticket médio', base: 142.9, kind: 'brl' },
  { label: 'Conversão', base: 3.8, kind: 'pct' },
  { label: 'Churn', base: 1.2, kind: 'pct' },
  { label: 'CAC', base: 86.5, kind: 'brl' },
  { label: 'NPS', base: 72, kind: 'int' },
] as const

const ORDERS = [
  { id: '#4822', value: 'R$ 189,90', city: 'São Paulo' },
  { id: '#4823', value: 'R$ 54,00', city: 'Fortaleza' },
  { id: '#4824', value: 'R$ 1.249,00', city: 'Porto Alegre' },
  { id: '#4825', value: 'R$ 312,40', city: 'Belo Horizonte' },
  { id: '#4826', value: 'R$ 98,90', city: 'Vitória' },
  { id: '#4827', value: 'R$ 640,00', city: 'Brasília' },
]

const fmt = (v: number, kind: 'brl' | 'int' | 'pct') =>
  kind === 'brl'
    ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: v > 1000 ? 0 : 2 })
    : kind === 'pct'
      ? `${v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
      : Math.round(v).toLocaleString('pt-BR')

const wave = (t: number, i: number) => Math.sin(t * 1.3 + i * 2.1) * 0.6 + Math.sin(t * 0.7 + i) * 0.4

function Spark({ t, i, up }: { t: number; i: number; up: boolean }) {
  const pts = Array.from({ length: 10 }, (_, k) => `${k * 5},${12 - wave(t - 9 + k, i) * 8}`).join(' ')
  return (
    <svg viewBox="0 0 45 24" className="h-4 w-10" aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={up ? 'text-emerald-400' : 'text-rose-400'} />
    </svg>
  )
}

export default function MetricTickerMarquee() {
  const [t, setT] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1500)
    return () => clearInterval(id)
  }, [])

  const cells = METRICS.map((m, i) => {
    const now = wave(t, i)
    const up = now >= wave(t - 1, i)
    const value = m.base * (1 + now * 0.03)
    const delta = Math.abs(now * 3).toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
    return { ...m, i, up, value, delta }
  })

  return (
    <div className="w-[480px] text-foreground">
      <div className="mb-2 flex items-center gap-1.5 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <motion.span className="size-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        Painel da loja · ao vivo
      </div>

      <div className="overflow-hidden rounded-xl bg-foreground py-3 text-background [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div className="flex w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          {[...cells, ...cells].map((c, k) => (
            <div key={k} className="flex items-center gap-2.5 border-r border-background/15 px-4 font-mono">
              <span className="text-[10px] uppercase tracking-wider opacity-60">{c.label}</span>
              <motion.span
                key={`${t}-${k}`}
                className="text-sm font-semibold tabular-nums"
                initial={{ backgroundColor: c.up ? 'rgba(16,185,129,0.35)' : 'rgba(244,63,94,0.35)' }}
                animate={{ backgroundColor: 'rgba(0,0,0,0)' }}
                transition={{ duration: 0.9 }}
              >
                {fmt(c.value, c.kind)}
              </motion.span>
              <span className={cn('flex items-center text-[10px] tabular-nums', c.up ? 'text-emerald-400' : 'text-rose-400')}>
                {c.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {c.delta}%
              </span>
              <Spark t={t} i={c.i} up={c.up} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border bg-card py-1.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div className="flex w-max gap-6" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {[...ORDERS, ...ORDERS].map((o, k) => (
            <span key={k} className="flex items-center gap-1.5 whitespace-nowrap text-[11px]">
              <ShoppingBag className="size-3 text-muted-foreground" />
              <span className="font-mono text-muted-foreground">{o.id}</span>
              <span className="font-medium tabular-nums">{o.value}</span>
              <span className="text-muted-foreground">· {o.city}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
