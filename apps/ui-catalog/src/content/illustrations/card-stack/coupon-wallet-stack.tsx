'use client'

import { useEffect, useState } from 'react'
import { Copy, Scissors, Wallet } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Coupon Wallet Stack": cupons de desconto empilhados saindo de uma carteira. No cupom da frente a película
// desliza e revela o código, o selo "Copiado!" aparece e ele desce para dentro do bolso da carteira — o contador de
// cupons guardados sobe com um pop e o próximo cupom avança.
interface Coupon {
  store: string
  off: string
  rule: string
  code: string
  stub: string
}

const COUPONS: readonly Coupon[] = [
  { store: 'Mercado Bom Preço', off: '15%', rule: 'Compras acima de R$ 150', code: 'FEIRA15', stub: 'bg-emerald-500' },
  { store: 'Livraria Página 9', off: 'R$ 30', rule: 'Em livros de ficção', code: 'LEIA30', stub: 'bg-sky-500' },
  { store: 'Farmácia Vida', off: '20%', rule: 'Linha de dermocosméticos', code: 'PELE20', stub: 'bg-rose-500' },
  { store: 'Pizzaria Forno a Lenha', off: 'Frete', rule: 'Grátis até 5 km', code: 'SEXTOU', stub: 'bg-amber-500' },
]

type Phase = 'idle' | 'reveal' | 'copied'

export default function CouponWalletStack() {
  const [head, setHead] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [saved, setSaved] = useState(3)

  useEffect(() => {
    const a = setTimeout(() => setPhase('reveal'), 500)
    const b = setTimeout(() => setPhase('copied'), 1400)
    const c = setTimeout(() => {
      setPhase('idle')
      setHead((h) => (h + 1) % COUPONS.length)
    }, 2500)
    const d = setTimeout(() => setSaved((s) => (s >= 9 ? 3 : s + 1)), 2950)
    return () => [a, b, c, d].forEach(clearTimeout)
  }, [head])

  const visible = [0, 1, 2].map((k) => COUPONS[(head + k) % COUPONS.length]!)

  return (
    <div className="relative h-[320px] w-[400px] overflow-hidden text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((c, depth) => {
          const front = depth === 0
          return (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 140 - 3 * 34, scale: 0.88 }}
              animate={{ opacity: 1, y: 140 - depth * 34, scale: 1 - depth * 0.05, zIndex: 10 - depth }}
              exit={{ y: 270, zIndex: 9, transition: { duration: 0.45, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="absolute left-[60px] top-0 flex h-[112px] w-[280px] rounded-xl border bg-card shadow-md"
            >
              <div className={cn('flex w-[84px] flex-col items-center justify-center rounded-l-xl text-white', c.stub)}>
                <span className="text-xl font-black leading-none tracking-tight">{c.off}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest opacity-90">off</span>
              </div>
              <div className="relative w-0 border-l-2 border-dashed border-border">
                <span className="absolute -left-[8px] -top-2 size-3.5 rounded-full border bg-background" />
                <span className="absolute -bottom-2 -left-[8px] size-3.5 rounded-full border bg-background" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-3">
                <p className="truncate text-sm font-semibold">{c.store}</p>
                <p className="truncate text-[11px] text-muted-foreground">{c.rule}</p>
                <div className="relative mt-1 flex h-7 items-center justify-between overflow-hidden rounded-md border border-dashed px-2">
                  <span className="font-mono text-xs font-bold tracking-[0.2em]">{c.code}</span>
                  <Copy className="size-3 text-muted-foreground" />
                  {/* película que cobre o código */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-1 bg-[repeating-linear-gradient(45deg,var(--muted)_0,var(--muted)_6px,var(--border)_6px,var(--border)_12px)] text-[10px] font-medium text-muted-foreground"
                    initial={false}
                    animate={{ x: front && phase !== 'idle' ? '105%' : '0%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <Scissors className="size-3" /> Revelar código
                  </motion.div>
                </div>
              </div>
              <AnimatePresence>
                {front && phase === 'copied' && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-3 right-3 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background shadow"
                  >
                    Copiado!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* bolso da carteira */}
      <div className="absolute inset-x-[36px] bottom-0 z-30 h-[96px] rounded-t-3xl border border-b-0 bg-gradient-to-b from-muted to-card shadow-[0_-8px_20px_-12px] shadow-black/30">
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-border" />
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <Wallet className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Meus cupons</p>
              <p className="text-[11px] text-muted-foreground">Economia estimada: R$ 184,90</p>
            </div>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={saved}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {saved}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
