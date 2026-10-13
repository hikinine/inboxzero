'use client'

import { useEffect, useState } from 'react'
import { Check, Crown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Pricing Strip Marquee": faixa de mini cards de planos e complementos rolando na horizontal. Um seletor
// Mensal/Anual acima alterna sozinho a cada 3,5s (a pílula desliza com mola) e todos os preços giram para o
// valor novo, com o selo "-20%" aparecendo no anual. O plano Pro tem borda primária e coroa.
type Plan = { name: string; price: number | null; desc: string; feats: readonly string[]; pop?: boolean; addon?: boolean }
const PLANS: ReadonlyArray<Plan> = [
  { name: 'Grátis', price: 0, desc: 'para começar', feats: ['1 usuário', '100 contatos'] },
  { name: 'Starter', price: 49, desc: 'pequenas lojas', feats: ['3 usuários', '2 mil contatos'] },
  { name: 'Pro', price: 149, desc: 'o mais escolhido', feats: ['10 usuários', 'automações'], pop: true },
  { name: 'Business', price: 349, desc: 'times de vendas', feats: ['usuários ilimitados', 'API'] },
  { name: 'Enterprise', price: null, desc: 'sob medida', feats: ['SLA dedicado', 'SSO'] },
  { name: 'WhatsApp API', price: 99, desc: 'complemento', feats: ['número oficial'], addon: true },
  { name: 'Domínio próprio', price: 19, desc: 'complemento', feats: ['SSL incluso'], addon: true },
]
const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

function Card({ p, annual }: { p: Plan; annual: boolean }) {
  const value = p.price === null ? null : annual ? Math.round(p.price * 0.8) : p.price
  return (
    <div className={`relative flex h-[150px] w-[150px] shrink-0 flex-col rounded-xl border bg-card p-3 shadow-sm ${p.pop ? 'border-primary ring-1 ring-primary' : ''} ${p.addon ? 'border-dashed' : ''}`}>
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-semibold">{p.name}</span>
        {p.pop && <Crown className="size-3 text-amber-500" />}
      </div>
      <span className="text-[10px] text-muted-foreground">{p.desc}</span>
      <div className="relative mt-1.5 h-7 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${annual}`}
            className="flex items-baseline gap-0.5"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            {value === null ? (
              <span className="text-lg font-bold">Fale conosco</span>
            ) : (
              <>
                <span className="text-[10px] text-muted-foreground">R$</span>
                <span className="text-xl font-bold tabular-nums">{fmt(value)}</span>
                <span className="text-[10px] text-muted-foreground">/mês</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="mt-auto space-y-0.5">
        {p.feats.map((f) => (
          <li key={f} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Check className="size-2.5 text-emerald-500" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PricingStripMarquee() {
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setAnnual((a) => !a), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex w-[540px] flex-col items-center gap-5 py-4 text-foreground">
      <div className="flex items-center gap-2">
        <div className="relative flex rounded-full border bg-muted p-1 text-xs font-medium">
          <motion.span
            className="absolute inset-y-1 left-1 w-[76px] rounded-full bg-primary shadow-sm"
            animate={{ x: annual ? 76 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {(['Mensal', 'Anual'] as const).map((l) => {
            const on = (l === 'Anual') === annual
            return (
              <span key={l} className={`relative w-[76px] py-1 text-center transition-colors ${on ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                {l}
              </span>
            )
          })}
        </div>
        <AnimatePresence>
          {annual && (
            <motion.span
              className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
              initial={{ opacity: 0, x: -6, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              -20%
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
        <motion.div className="flex w-max py-1" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}>
          {[...PLANS, ...PLANS].map((p, i) => (
            <div key={i} className="pr-3">
              <Card p={p} annual={annual} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
