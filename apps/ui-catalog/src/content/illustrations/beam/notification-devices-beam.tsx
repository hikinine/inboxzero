'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Bell, Mail, MessageSquareText, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Notification Devices Beam": o evento "pedido enviado" no topo dispara três feixes para três aparelhos
// desenhados com divs — o celular recebe o push (banner desliza do topo), o segundo celular recebe o SMS (bolha
// entra) e o notebook recebe o e-mail (linha nova em negrito no topo da caixa). Chegadas escalonadas, em loop.
const W = 480
const H = 330
const SRC = { x: 240, y: 46 }
const DEST = [
  { x: 82, y: 178 },
  { x: 240, y: 178 },
  { x: 398, y: 178 },
] as const
const path = (i: number) => {
  const d = DEST[i]
  return `M ${SRC.x} ${SRC.y + 22} C ${SRC.x} ${SRC.y + 80}, ${d.x} ${d.y - 110}, ${d.x} ${d.y - 66}`
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Phone({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-[128px] w-[76px] overflow-hidden rounded-[18px] border-[3px] border-foreground/80 bg-gradient-to-b from-muted to-background">
        <div className="absolute left-1/2 top-1 h-1.5 w-6 -translate-x-1/2 rounded-full bg-foreground/80" />
        <div className="mt-4 text-center text-[13px] font-semibold tabular-nums">14:32</div>
        {children}
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

export default function NotificationDevicesBeam() {
  const [got, setGot] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setGot(0)
        await sleep(900)
        for (let i = 1; i <= 3; i++) {
          if (cancelled) return
          setGot(i)
          await sleep(450)
        }
        await sleep(2200)
        setCycle((c) => c + 1)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Evento disparando push, SMS e e-mail para três aparelhos">
        {DEST.map((_, i) => (
          <g key={i}>
            <path d={path(i)} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 5" />
            <motion.path
              key={`${cycle}-${i}`}
              d={path(i)}
              fill="none"
              stroke="currentColor"
              className={['text-violet-500', 'text-emerald-500', 'text-sky-500'][i]}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{ pathLength: [0, 0.45, 0.3, 0], pathOffset: [0, 0, 0.7, 1], opacity: [1, 1, 1, 0] }}
              transition={{ duration: 0.9, delay: 0.45 + i * 0.45, times: [0, 0.3, 0.85, 1], ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-md" style={{ left: SRC.x, top: SRC.y }}>
        <motion.span
          key={cycle}
          className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -12, 12, -6, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Truck className="size-4" />
        </motion.span>
        <div className="leading-tight">
          <div className="text-xs font-medium">Pedido #5520 enviado</div>
          <div className="text-[10px] text-muted-foreground">evento · order.shipped</div>
        </div>
      </div>

      {/* push */}
      <div className="absolute -translate-x-1/2" style={{ left: DEST[0].x, top: DEST[0].y - 64 }}>
        <Phone label="Push">
          <AnimatePresence>
            {got >= 1 && (
              <motion.div
                className="absolute inset-x-1 top-9 rounded-lg border bg-card/95 p-1.5 shadow-md"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="flex items-center gap-1 text-[7px] text-muted-foreground">
                  <Bell className="size-2" /> LOJA AURORA · agora
                </div>
                <div className="text-[8px] font-semibold leading-tight">Seu pedido saiu!</div>
                <div className="text-[7px] leading-tight text-muted-foreground">Chega amanhã até 18h</div>
              </motion.div>
            )}
          </AnimatePresence>
        </Phone>
      </div>

      {/* sms */}
      <div className="absolute -translate-x-1/2" style={{ left: DEST[1].x, top: DEST[1].y - 64 }}>
        <Phone label="SMS">
          <div className="absolute inset-x-1.5 top-9 space-y-1">
            <div className="w-3/4 rounded-md bg-muted px-1 py-0.5 text-[7px] text-muted-foreground">Código: 4821</div>
            <AnimatePresence>
              {got >= 2 && (
                <motion.div
                  className="flex items-start gap-1 rounded-md bg-emerald-500 px-1 py-0.5 text-[7px] leading-tight text-white"
                  style={{ originX: 0 }}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <MessageSquareText className="mt-px size-2 shrink-0" />
                  Aurora: pedido #5520 a caminho. Rastreie: aur.ra/5520
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Phone>
      </div>

      {/* e-mail */}
      <div className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5" style={{ left: DEST[2].x, top: DEST[2].y - 64 }}>
        <div className="w-[128px]">
          <div className="h-[86px] overflow-hidden rounded-t-lg border-[3px] border-b-0 border-foreground/80 bg-card p-1.5">
            <div className="mb-1 flex items-center gap-1 text-[7px] font-medium text-muted-foreground">
              <Mail className="size-2" /> Caixa de entrada
            </div>
            <div className="space-y-[3px]">
              <AnimatePresence initial={false}>
                {got >= 3 && (
                  <motion.div
                    key="new"
                    className="flex items-center gap-1 rounded bg-sky-500/10 px-1 py-[2px] text-[7px]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <span className="size-1 rounded-full bg-sky-500" />
                    <span className="font-bold">Aurora</span>
                    <span className="truncate font-semibold">Pedido enviado</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {['Banco · Fatura', 'Agenda · Reunião', 'Time · Relatório'].map((t) => (
                <div key={t} className="flex items-center gap-1 px-1 text-[7px] text-muted-foreground">
                  <span className="size-1 rounded-full bg-border" />
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="h-2 rounded-b-md bg-foreground/80" />
          <div className="-mx-3 h-1.5 rounded-b-lg bg-foreground/60" />
        </div>
        <span className="mt-[28px] text-[10px] text-muted-foreground">E-mail</span>
      </div>
    </div>
  )
}
