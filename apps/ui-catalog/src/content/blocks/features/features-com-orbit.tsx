'use client'

import { motion } from 'motion/react'
import { ArrowRight, Bot, Boxes, Calendar, Cloud, CreditCard, Database, Mail, MessageCircle, ShieldCheck, Table, Workflow, Zap } from 'lucide-react'

const RECURSOS = [
  { Icon: Zap, titulo: 'Sincronização em tempo real', texto: 'Um pedido pago no checkout vira card no CRM, linha na planilha e mensagem no WhatsApp em menos de 5 segundos.' },
  { Icon: ShieldCheck, titulo: 'Permissões por integração', texto: 'Cada app conectado só enxerga o que precisa. Revogue o acesso com um clique e o fluxo para na hora.' },
  { Icon: Workflow, titulo: 'Automações entre apps', texto: 'Monte gatilho, condição e ação arrastando blocos. Sem código, sem depender do time de tecnologia.' },
]

const ANEL_INTERNO = [Mail, MessageCircle, Calendar]
const ANEL_EXTERNO = [CreditCard, Database, Table, Bot, Cloud]

function Anel({ icones, raio, duracao, inverso = false }: { icones: typeof ANEL_INTERNO; raio: number; duracao: number; inverso?: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-border"
      style={{ width: raio * 2, height: raio * 2, marginLeft: -raio, marginTop: -raio }}
      animate={{ rotate: inverso ? -360 : 360 }}
      transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}
    >
      {icones.map((Icon, i) => {
        const a = (i / icones.length) * Math.PI * 2
        const x = Math.cos(a) * raio
        const y = Math.sin(a) * raio
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 flex size-12 items-center justify-center rounded-2xl border bg-card shadow-md"
            style={{ x: x - 24, y: y - 24 }}
            animate={{ rotate: inverso ? 360 : -360 }}
            transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className="size-5 text-foreground" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function FeaturesComOrbit() {
  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Integrações</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que o time usa, girando em torno do seu CRM</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">E-mail, WhatsApp, agenda, pagamentos e banco de dados conectados ao mesmo núcleo. Você muda de ferramenta; o histórico fica.</p>

          <ul className="mt-8 space-y-6">
            {RECURSOS.map((r) => (
              <li key={r.titulo} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <r.Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium">{r.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Ver as 120 integrações <ArrowRight className="size-3.5" />
          </a>
        </div>

        <div className="flex h-[340px] items-center justify-center sm:h-[440px]">
          <div className="relative size-[440px] origin-center scale-[0.74] sm:scale-100">
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            <Anel icones={ANEL_INTERNO} raio={92} duracao={20} />
            <Anel icones={ANEL_EXTERNO} raio={178} duracao={36} inverso />
            <motion.div
              aria-hidden
              className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary/20"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl">
              <Boxes className="size-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
