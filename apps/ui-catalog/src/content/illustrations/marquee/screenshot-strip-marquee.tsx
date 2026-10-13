'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// "Screenshot Strip Marquee": faixa de "capturas de tela" do produto — janelas de navegador desenhadas só com divs
// (dashboard com barras, kanban, tabela, chat, calendário e gráfico de linha em SVG) — rolando em perspectiva leve.
// Uma segunda faixa menor, desfocada e mais lenta, passa por trás no sentido contrário para dar profundidade.
function Window({ url, children, small = false }: { url: string; children: ReactNode; small?: boolean }) {
  return (
    <div className={`shrink-0 overflow-hidden rounded-xl border bg-card shadow-lg ${small ? 'h-[110px] w-[170px]' : 'h-[160px] w-[240px]'}`}>
      <div className="flex items-center gap-1 border-b bg-muted/50 px-2 py-1.5">
        <span className="size-1.5 rounded-full bg-rose-400" />
        <span className="size-1.5 rounded-full bg-amber-400" />
        <span className="size-1.5 rounded-full bg-emerald-400" />
        <span className="ml-2 h-3 flex-1 truncate rounded bg-background px-1.5 text-[7px] leading-3 text-muted-foreground">{url}</span>
      </div>
      <div className="h-full p-2">{children}</div>
    </div>
  )
}

const BARS = [40, 65, 50, 80, 60, 92, 74] as const

function Dashboard() {
  return (
    <div className="flex h-[118px] gap-2">
      <div className="w-8 space-y-1.5 rounded-md bg-muted/60 p-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-border'}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {['R$ 48 mil', '1.284', '3,4%'].map((v) => (
            <div key={v} className="rounded-md border p-1 text-[8px] font-semibold">
              {v}
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-md border p-1.5">
          {BARS.map((b, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i === 5 ? 'bg-primary' : 'bg-primary/30'}`} style={{ height: `${b}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Kanban() {
  const cols = [3, 2, 1] as const
  const tones = ['bg-sky-500', 'bg-amber-500', 'bg-emerald-500'] as const
  return (
    <div className="grid h-[118px] grid-cols-3 gap-1.5">
      {cols.map((n, c) => (
        <div key={c} className="space-y-1 rounded-md bg-muted/60 p-1">
          <div className="flex items-center gap-1">
            <span className={`size-1.5 rounded-full ${tones[c]}`} />
            <span className="h-1 w-8 rounded-full bg-border" />
          </div>
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} className="space-y-1 rounded border bg-card p-1">
              <div className="h-1 w-full rounded-full bg-foreground/20" />
              <div className="h-1 w-2/3 rounded-full bg-border" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Table() {
  const rows = [
    ['Ana Souza', 'Pago', 'bg-emerald-500/15 text-emerald-600'],
    ['Bruno Lima', 'Pendente', 'bg-amber-500/15 text-amber-600'],
    ['Carla Dias', 'Pago', 'bg-emerald-500/15 text-emerald-600'],
    ['Diego Melo', 'Estornado', 'bg-rose-500/15 text-rose-600'],
    ['Elisa Prado', 'Pago', 'bg-emerald-500/15 text-emerald-600'],
  ] as const
  return (
    <div className="h-[118px] overflow-hidden rounded-md border text-[8px]">
      <div className="grid grid-cols-[1fr_auto] gap-2 border-b bg-muted/50 px-2 py-1 font-medium text-muted-foreground">
        <span>Cliente</span>
        <span>Status</span>
      </div>
      {rows.map(([n, s, t]) => (
        <div key={n} className="grid grid-cols-[1fr_auto] items-center gap-2 border-b px-2 py-[3px] last:border-0">
          <span>{n}</span>
          <span className={`rounded px-1 ${t}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

function Chat() {
  return (
    <div className="flex h-[118px] flex-col justify-end gap-1 text-[8px]">
      <div className="w-3/4 rounded-lg rounded-bl-sm bg-muted px-1.5 py-1">Oi! O frete pra Curitiba fica quanto?</div>
      <div className="ml-auto w-2/3 rounded-lg rounded-br-sm bg-primary px-1.5 py-1 text-primary-foreground">R$ 18,90, chega em 2 dias 🙂</div>
      <div className="w-1/2 rounded-lg rounded-bl-sm bg-muted px-1.5 py-1">Perfeito, vou fechar!</div>
      <div className="mt-1 h-4 rounded-md border" />
    </div>
  )
}

function CalendarView() {
  const ev: Record<number, string> = { 3: 'bg-sky-500', 9: 'bg-violet-500', 12: 'bg-emerald-500', 17: 'bg-amber-500', 22: 'bg-rose-500' }
  return (
    <div className="grid h-[118px] grid-cols-7 gap-0.5 text-[7px]">
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} className={`rounded-sm border p-0.5 ${i === 12 ? 'border-primary' : ''}`}>
          <span className="text-muted-foreground">{i + 1}</span>
          {ev[i] && <div className={`mt-0.5 h-1 rounded-full ${ev[i]}`} />}
        </div>
      ))}
    </div>
  )
}

function Analytics() {
  return (
    <div className="h-[118px] rounded-md border p-1.5">
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] font-semibold">12.480</span>
        <span className="text-[7px] text-emerald-600">+18%</span>
      </div>
      <svg viewBox="0 0 200 80" className="mt-1 h-[86px] w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="ssm-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 62 L25 55 L50 58 L75 40 L100 46 L125 28 L150 34 L175 16 L200 20 L200 80 L0 80 Z" fill="url(#ssm-area)" />
        <path d="M0 62 L25 55 L50 58 L75 40 L100 46 L125 28 L150 34 L175 16 L200 20" fill="none" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

const SHOTS = [
  { url: 'app.aurora.com/painel', View: Dashboard },
  { url: 'app.aurora.com/funil', View: Kanban },
  { url: 'app.aurora.com/pedidos', View: Table },
  { url: 'app.aurora.com/conversas', View: Chat },
  { url: 'app.aurora.com/agenda', View: CalendarView },
  { url: 'app.aurora.com/relatorios', View: Analytics },
] as const

export default function ScreenshotStripMarquee() {
  return (
    <div
      className="relative h-[320px] w-[540px] overflow-hidden text-foreground"
      style={{ perspective: 1100, maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
    >
      {/* faixa de trás */}
      <div className="absolute inset-x-0 top-6 opacity-40 blur-[1.5px]" style={{ transform: 'rotateX(14deg) scale(0.92)' }}>
        <motion.div className="flex w-max" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
          {[...SHOTS, ...SHOTS].map((s, i) => (
            <div key={i} className="pr-4">
              <Window url={s.url} small>
                <div className="origin-top-left scale-[0.7]" style={{ width: 224 }}>
                  <s.View />
                </div>
              </Window>
            </div>
          ))}
        </motion.div>
      </div>

      {/* faixa principal */}
      <div className="absolute inset-x-0 bottom-8" style={{ transform: 'rotateX(10deg)', transformOrigin: 'bottom' }}>
        <motion.div className="flex w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>
          {[...SHOTS, ...SHOTS].map((s, i) => (
            <div key={i} className="pr-5">
              <Window url={s.url}>
                <s.View />
              </Window>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
