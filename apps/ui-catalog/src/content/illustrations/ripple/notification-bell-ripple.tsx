'use client'

import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Notification Bell Ripple": a cada toque o sino balança (origem no topo), três anéis se expandem a partir dele,
// o badge incrementa com um "pop" e um aviso desliza por baixo. Anéis e balanço são remontados a cada toque
// (key = contador) para ficarem perfeitamente em sincronia com o badge e o aviso.
const EVENTS = ['Ana comentou no seu card', 'Bruno aprovou a proposta', 'Nova venda: R$ 1.290,00', 'Camila te mencionou', 'Pagamento Pix confirmado']
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function NotificationBellRipple() {
  const [tick, setTick] = useState(0)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let i = 0
      while (!cancelled) {
        await sleep(i === 0 ? 900 : 1100)
        if (cancelled) return
        i += 1
        setTick(i)
        setToast(true)
        await sleep(2200)
        setToast(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const count = 2 + tick

  return (
    <div className="relative flex size-[300px] flex-col items-center justify-center text-foreground">
      <div className="relative">
        {tick > 0 &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={`${tick}-${i}`}
              aria-hidden
              className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
              initial={{ scale: 0.7, opacity: 0.8 }}
              animate={{ scale: 2.9, opacity: 0 }}
              transition={{ duration: 1.7, delay: i * 0.25, ease: 'easeOut' }}
            />
          ))}
        <motion.div
          key={tick}
          className="relative flex size-20 items-center justify-center rounded-full border bg-card shadow-lg"
          style={{ transformOrigin: '50% 8%' }}
          animate={{ rotate: tick > 0 ? [0, -22, 18, -12, 8, -4, 0] : 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <Bell className="size-9" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold tabular-nums text-white ring-2 ring-background"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [1.5, 1], opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-9 h-9">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={tick}
              initial={{ y: 14, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {EVENTS[(tick - 1) % EVENTS.length]}
              <span className="text-[10px] text-muted-foreground">agora</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
