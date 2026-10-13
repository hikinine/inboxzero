'use client'

import { motion } from 'motion/react'
import { ArrowRight, Calendar, CreditCard, FileSpreadsheet, Mail, MessageCircle, ShoppingCart, Truck, Webhook } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ANEIS: { raio: number; duracao: number; sentido: 1 | -1; icones: LucideIcon[] }[] = [
  { raio: 190, duracao: 40, sentido: 1, icones: [MessageCircle, CreditCard, Calendar] },
  { raio: 290, duracao: 60, sentido: -1, icones: [Mail, ShoppingCart, FileSpreadsheet, Truck, Webhook] },
]

export default function CtaComOrbitaDeIntegracoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-foreground px-6 py-20 text-background sm:py-28">
        <div aria-hidden className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />

        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2">
          {ANEIS.map((anel, a) => (
            <motion.div
              key={a}
              className="absolute rounded-full border border-background/15"
              style={{ width: anel.raio * 2, height: anel.raio * 2, left: -anel.raio, top: -anel.raio }}
              animate={{ rotate: 360 * anel.sentido }}
              transition={{ duration: anel.duracao, repeat: Infinity, ease: 'linear' }}
            >
              {anel.icones.map((Icon, i) => {
                const ang = (i / anel.icones.length) * Math.PI * 2 + a * 0.6
                return (
                  <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${Math.cos(ang) * anel.raio}px, ${Math.sin(ang) * anel.raio}px)` }}>
                    <motion.div
                      className="flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-background/15 bg-background/10 backdrop-blur"
                      animate={{ rotate: -360 * anel.sentido }}
                      transition={{ duration: anel.duracao, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon className="size-5 text-background/80" />
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          ))}
          <motion.div
            className="absolute size-[260px] rounded-full border border-dashed border-background/10"
            style={{ left: -130, top: -130 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative mx-auto max-w-xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-3 py-1 text-xs text-background/80">
            <span className="size-1.5 rounded-full bg-emerald-400" /> 80+ integrações prontas
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">Conecte tudo hoje. Sem código, sem esperar o time de TI.</h2>
          <p className="mx-auto mt-4 max-w-md text-background/70">WhatsApp, pagamentos, agenda, planilhas e transportadoras conversando entre si em menos de 10 minutos.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary">
              Começar teste grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost" className="text-background hover:bg-background/10 hover:text-background">
              Falar com especialista
            </Button>
          </div>
          <p className="mt-6 text-xs text-background/50">14 dias grátis · sem cartão de crédito</p>
        </div>
      </div>
    </section>
  )
}
