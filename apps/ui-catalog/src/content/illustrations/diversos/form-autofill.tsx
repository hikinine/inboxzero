'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown, CircleCheck, Loader, MousePointer2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Form Autofill": formulário de cadastro que se preenche sozinho. Um cursor vai de campo em campo (com mola), o
// campo ganha foco e o texto é digitado; o select abre e escolhe o plano, o checkbox é marcado, o botão afunda,
// gira o carregador e a confirmação "Conta criada!" aparece antes de tudo limpar e recomeçar.
const NAME = 'Marina Albuquerque'
const EMAIL = 'marina@padariadoce.com.br'
const PHONE = '(81) 99812-4470'
const PLANS = ['Básico', 'Pro', 'Empresa'] as const
const PICK = 1

type Target = 'name' | 'email' | 'phone' | 'plan' | 'terms' | 'submit' | 'rest'
// posições do cursor (px dentro do card de 400×350)
const POS: Record<Target, { x: number; y: number }> = {
  name: { x: 300, y: 106 },
  email: { x: 300, y: 166 },
  phone: { x: 150, y: 228 },
  plan: { x: 320, y: 228 },
  terms: { x: 30, y: 266 },
  submit: { x: 210, y: 302 },
  rest: { x: 372, y: 30 },
}

type Seg = { target: Target; kind: 'move' | 'type' | 'open' | 'click' | 'load' | 'done'; dur: number }
const SEGS: readonly Seg[] = [
  { target: 'rest', kind: 'move', dur: 4 },
  { target: 'name', kind: 'move', dur: 6 },
  { target: 'name', kind: 'type', dur: NAME.length },
  { target: 'email', kind: 'move', dur: 5 },
  { target: 'email', kind: 'type', dur: EMAIL.length },
  { target: 'phone', kind: 'move', dur: 5 },
  { target: 'phone', kind: 'type', dur: PHONE.length },
  { target: 'plan', kind: 'move', dur: 5 },
  { target: 'plan', kind: 'open', dur: 9 },
  { target: 'terms', kind: 'move', dur: 6 },
  { target: 'terms', kind: 'click', dur: 3 },
  { target: 'submit', kind: 'move', dur: 6 },
  { target: 'submit', kind: 'click', dur: 2 },
  { target: 'submit', kind: 'load', dur: 10 },
  { target: 'submit', kind: 'done', dur: 22 },
]
const STARTS = SEGS.reduce<number[]>((acc, s, i) => [...acc, i === 0 ? 0 : acc[i - 1]! + SEGS[i - 1]!.dur], [])
const TOTAL = STARTS[STARTS.length - 1]! + SEGS[SEGS.length - 1]!.dur

function segIndex(t: number) {
  for (let i = SEGS.length - 1; i >= 0; i--) if (t >= STARTS[i]!) return i
  return 0
}
const typedLen = (t: number, segI: number, len: number) => Math.max(0, Math.min(len, t - STARTS[segI]!))

export default function FormAutofill() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % TOTAL), 70)
    return () => clearInterval(id)
  }, [])
  const i = segIndex(t)
  const seg = SEGS[i]!
  const name = NAME.slice(0, typedLen(t, 2, NAME.length))
  const email = EMAIL.slice(0, typedLen(t, 4, EMAIL.length))
  const phone = PHONE.slice(0, typedLen(t, 6, PHONE.length))
  const planOpen = i === 8 && t - STARTS[8]! < 8
  const planHover = i === 8 ? Math.min(PICK, Math.floor((t - STARTS[8]!) / 3)) : -1
  const plan = i > 8 || (i === 8 && t - STARTS[8]! >= 8) ? PLANS[PICK] : null
  const terms = i > 10 || (i === 10 && t - STARTS[10]! >= 1)
  const pressing = seg.kind === 'click'
  const loading = seg.kind === 'load'
  const done = seg.kind === 'done'
  const focus: Target | null = seg.kind === 'type' || seg.kind === 'open' ? seg.target : null
  const cursor = POS[seg.target]

  const field = (active: boolean) => cn('flex h-8 items-center rounded-md border bg-background px-2.5 text-xs transition-shadow', active && 'border-ring ring-2 ring-ring/30')
  const caret = <motion.span className="ml-px inline-block h-3.5 w-px bg-foreground" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />

  return (
    <div className="relative h-[350px] w-[400px] overflow-hidden rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <AnimatePresence>
        {done && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
              <CircleCheck className="size-12 text-emerald-500" />
            </motion.span>
            <p className="mt-2 text-base font-semibold">Conta criada!</p>
            <p className="text-xs text-muted-foreground">Enviamos o acesso para {EMAIL}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm font-semibold">Crie sua conta</p>
      <p className="text-[11px] text-muted-foreground">Teste grátis por 14 dias, sem cartão.</p>

      <div className="mt-4 space-y-2.5">
        <div>
          <p className="mb-1 text-[11px] font-medium">Nome completo</p>
          <div className={field(focus === 'name')}>
            {name}
            {focus === 'name' && caret}
          </div>
        </div>
        <div>
          <p className="mb-1 text-[11px] font-medium">E-mail</p>
          <div className={field(focus === 'email')}>
            {email}
            {focus === 'email' && caret}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <p className="mb-1 text-[11px] font-medium">WhatsApp</p>
            <div className={field(focus === 'phone')}>
              {phone}
              {focus === 'phone' && caret}
            </div>
          </div>
          <div className="relative">
            <p className="mb-1 text-[11px] font-medium">Plano</p>
            <div className={cn(field(focus === 'plan'), 'justify-between')}>
              <span className={plan ? '' : 'text-muted-foreground'}>{plan ?? 'Selecione'}</span>
              <ChevronsUpDown className="size-3 text-muted-foreground" />
            </div>
            <AnimatePresence>
              {planOpen && (
                <motion.div
                  className="absolute inset-x-0 top-full z-10 mt-1 rounded-md border bg-popover p-1 shadow-md"
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  {PLANS.map((p, k) => (
                    <div key={p} className={cn('flex items-center justify-between rounded px-2 py-1 text-xs', k === planHover && 'bg-accent text-accent-foreground')}>
                      {p}
                      {k === planHover && <Check className="size-3" />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <label className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
          <span className={cn('flex size-4 items-center justify-center rounded border transition-colors', terms ? 'border-primary bg-primary text-primary-foreground' : 'border-input')}>
            {terms && <Check className="size-3" strokeWidth={3} />}
          </span>
          Aceito os termos de uso e a política de privacidade
        </label>
        <motion.div
          className="flex h-9 items-center justify-center gap-2 rounded-md bg-primary text-xs font-medium text-primary-foreground"
          animate={{ scale: pressing && seg.target === 'submit' ? 0.96 : 1 }}
          transition={{ duration: 0.1 }}
        >
          {loading ? (
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}>
              <Loader className="size-3.5" />
            </motion.span>
          ) : null}
          {loading ? 'Criando conta…' : 'Começar teste grátis'}
        </motion.div>
      </div>

      {/* cursor */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-30"
        animate={{ x: cursor.x, y: cursor.y, scale: pressing ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <MousePointer2 className="size-5 fill-foreground text-background drop-shadow" />
      </motion.div>
    </div>
  )
}
