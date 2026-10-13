'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChartColumn, MessagesSquare, Plug, ShieldCheck, Shuffle, Workflow } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Feature Card Shuffle": baralho de cards de funcionalidades. O card do topo fica em destaque por alguns segundos,
// então o baralho se abre em leque (girando em torno de um eixo abaixo dos cards), embaralha e fecha com a próxima
// funcionalidade por cima.
interface Feature {
  title: string
  text: string
  Icon: LucideIcon
  gradient: string
  stat: string
}

const FEATURES: readonly Feature[] = [
  { title: 'Automações', text: 'Fluxos que disparam sozinhos a cada novo lead.', Icon: Workflow, gradient: 'from-violet-500 to-indigo-500', stat: '12 h economizadas/semana' },
  { title: 'Relatórios', text: 'Vendas, funil e retenção num painel só.', Icon: ChartColumn, gradient: 'from-sky-500 to-cyan-500', stat: '38 métricas prontas' },
  { title: 'Integrações', text: 'Conecte loja, ERP e meios de pagamento.', Icon: Plug, gradient: 'from-emerald-500 to-teal-500', stat: '+120 apps nativos' },
  { title: 'Atendimento', text: 'WhatsApp, Instagram e e-mail na mesma caixa.', Icon: MessagesSquare, gradient: 'from-amber-500 to-orange-500', stat: 'Resposta média de 2 min' },
  { title: 'Segurança', text: 'Login com 2FA, permissões e trilha de auditoria.', Icon: ShieldCheck, gradient: 'from-rose-500 to-pink-500', stat: 'Conforme a LGPD' },
]
const N = FEATURES.length

export default function FeatureCardShuffle() {
  const [head, setHead] = useState(0)
  const [spread, setSpread] = useState(false)

  useEffect(() => {
    const a = setTimeout(() => setSpread(true), 2100)
    const b = setTimeout(() => {
      setHead((h) => (h + 1) % N)
      setSpread(false)
    }, 3000)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [head])

  return (
    <div className="relative h-[320px] w-[420px] text-foreground">
      {FEATURES.map((f, i) => {
        const depth = (i - head + N) % N
        const fanSlot = i - (N - 1) / 2
        const target = spread
          ? { rotate: fanSlot * 15, y: -14, x: fanSlot * 6, scale: 0.92, zIndex: i }
          : { rotate: depth === 0 ? 0 : depth % 2 ? 2.5 : -2.5, y: depth * 5, x: 0, scale: 1 - depth * 0.03, zIndex: N - depth }
        const top = !spread && depth === 0
        return (
          <motion.div
            key={f.title}
            initial={false}
            animate={target}
            transition={{ type: 'spring', stiffness: 170, damping: 20, delay: spread ? Math.abs(fanSlot) * 0.03 : (N - depth) * 0.025 }}
            className="absolute left-[110px] top-[44px] h-[220px] w-[200px] rounded-2xl border bg-card p-4 shadow-lg"
            style={{ transformOrigin: '50% 150%' }}
          >
            <span className={cn('flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm', f.gradient)}>
              <f.Icon className="size-5" />
            </span>
            <p className="mt-3 text-base font-semibold tracking-tight">{f.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.text}</p>
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={cn('h-full rounded-full bg-gradient-to-r', f.gradient)}
                  initial={false}
                  animate={{ width: top ? '100%' : '0%' }}
                  transition={{ duration: top ? 1.9 : 0.2, ease: 'linear' }}
                />
              </div>
              <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{f.stat}</p>
            </div>
          </motion.div>
        )
      })}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
        <motion.span animate={{ rotate: spread ? 180 : 0 }} transition={{ duration: 0.4 }}>
          <Shuffle className="size-3" />
        </motion.span>
        {head + 1} de {N} funcionalidades
      </div>
    </div>
  )
}
