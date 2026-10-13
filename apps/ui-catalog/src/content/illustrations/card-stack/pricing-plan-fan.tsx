'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, Crown, Sparkles, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Pricing Plan Fan": três planos abertos em leque. O plano em destaque gira para o centro, sobe e ganha o selo
// "Recomendado"; a cada volta completa o seletor alterna Mensal ↔ Anual e os preços rolam para o valor novo.
interface Plan {
  name: string
  Icon: LucideIcon
  monthly: number
  annual: number
  features: readonly string[]
  accent: string
  ring: string
}

const PLANS: readonly Plan[] = [
  { name: 'Essencial', Icon: Zap, monthly: 49, annual: 39, features: ['1.000 contatos', '2 usuários', 'E-mail marketing'], accent: 'from-sky-500 to-cyan-400', ring: 'ring-sky-500' },
  { name: 'Pro', Icon: Sparkles, monthly: 149, annual: 119, features: ['10.000 contatos', '5 usuários', 'Automações'], accent: 'from-violet-500 to-fuchsia-500', ring: 'ring-violet-500' },
  { name: 'Escala', Icon: Crown, monthly: 399, annual: 319, features: ['Contatos ilimitados', '20 usuários', 'API e SSO'], accent: 'from-amber-500 to-orange-500', ring: 'ring-amber-500' },
]

// posições do leque: esquerda, centro (destaque) e direita
const SLOTS = [
  { x: -112, y: 22, rotate: -10, scale: 0.86, zIndex: 1 },
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
  { x: 112, y: 22, rotate: 10, scale: 0.86, zIndex: 2 },
] as const

export default function PricingPlanFan() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 2200)
    return () => clearInterval(t)
  }, [])
  const active = tick % PLANS.length
  const annual = Math.floor(tick / PLANS.length) % 2 === 1

  return (
    <div className="relative h-[320px] w-[440px] overflow-hidden text-foreground">
      {/* seletor mensal / anual */}
      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-muted/60 p-1 text-[11px] font-medium">
        {(['Mensal', 'Anual'] as const).map((label) => {
          const on = (label === 'Anual') === annual
          return (
            <span key={label} className="relative px-3 py-1">
              {on && <motion.span layoutId="ppf-toggle" className="absolute inset-0 rounded-full bg-background shadow-sm" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className={cn('relative', on ? 'text-foreground' : 'text-muted-foreground')}>
                {label}
                {label === 'Anual' && <span className="ml-1 text-emerald-600 dark:text-emerald-400">−20%</span>}
              </span>
            </span>
          )
        })}
      </div>

      {PLANS.map((plan, i) => {
        let rel = i - active
        if (rel > 1) rel -= PLANS.length
        if (rel < -1) rel += PLANS.length
        const slot = SLOTS[rel + 1]!
        const isFront = rel === 0
        const price = annual ? plan.annual : plan.monthly
        return (
          <motion.div
            key={plan.name}
            className={cn('absolute left-1/2 top-[64px] -ml-[86px] w-[172px] overflow-hidden rounded-2xl border bg-card shadow-lg', isFront && `ring-2 ${plan.ring}`)}
            style={{ transformOrigin: '50% 100%' }}
            animate={{ x: slot.x, y: slot.y, rotate: slot.rotate, scale: slot.scale, zIndex: slot.zIndex, opacity: isFront ? 1 : 0.75 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
          >
            <div className={cn('h-1.5 bg-gradient-to-r', plan.accent)} />
            <div className="p-3.5">
              <div className="flex items-center justify-between">
                <span className={cn('flex size-7 items-center justify-center rounded-lg bg-gradient-to-br text-white', plan.accent)}>
                  <plan.Icon className="size-3.5" />
                </span>
                <AnimatePresence>
                  {isFront && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="rounded-full bg-foreground px-2 py-0.5 text-[9px] font-semibold text-background"
                    >
                      Recomendado
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-2 text-sm font-semibold">{plan.name}</p>
              <div className="mt-1 flex h-8 items-baseline gap-1 overflow-hidden">
                <span className="text-xs text-muted-foreground">R$</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl font-bold tabular-nums tracking-tight"
                  >
                    {price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="size-3 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className={cn('mt-3 rounded-md py-1.5 text-center text-[11px] font-medium', isFront ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                Assinar {plan.name}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
