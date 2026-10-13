'use client'

import { motion } from 'motion/react'
import { Bell, Check, FileText, Inbox, Mail, MessageCircle, Phone, Sparkles, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface No {
  id: string
  Icon: LucideIcon
  x: number
  y: number
}

const ENTRADAS: No[] = [
  { id: 'whats', Icon: MessageCircle, x: 40, y: 50 },
  { id: 'mail', Icon: Mail, x: 40, y: 140 },
  { id: 'fone', Icon: Phone, x: 40, y: 230 },
]
const SAIDAS: No[] = [
  { id: 'pessoa', Icon: UserRound, x: 320, y: 80 },
  { id: 'alerta', Icon: Bell, x: 320, y: 200 },
]
const HUB = { x: 180, y: 140 }

function curva(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`
}

const FILA = [
  { canal: 'WhatsApp', texto: 'Quero trocar o tamanho do pedido', tempo: 'agora' },
  { canal: 'E-mail', texto: 'Nota fiscal da compra #4821', tempo: '2 min' },
  { canal: 'Telefone', texto: 'Retorno sobre boleto vencido', tempo: '6 min' },
]

export default function FeaturesComFeixes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Central de atendimento</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Cada conversa chega, é entendida e vai para a pessoa certa</h2>
          <p className="mt-3 text-muted-foreground">Três etapas que rodam sozinhas enquanto o time cuida do que importa.</p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.35fr_1fr]">
          {/* 1 — Captura */}
          <article className="flex flex-col rounded-2xl border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Inbox className="size-5" />
            </span>
            <h3 className="mt-5 font-medium">Caixa única</h3>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp, e-mail e telefone na mesma fila, com o histórico do cliente ao lado.</p>
            <ul className="mt-6 space-y-2">
              {FILA.map((f, i) => (
                <motion.li
                  key={f.texto}
                  className="rounded-lg border bg-background p-3"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{f.canal}</span>
                    {f.tempo}
                  </div>
                  <p className="mt-1 truncate text-sm">{f.texto}</p>
                </motion.li>
              ))}
            </ul>
          </article>

          {/* 2 — Roteamento com feixes */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6">
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">em tempo real</span>
            </div>
            <h3 className="relative mt-5 font-medium">Roteamento inteligente</h3>
            <p className="relative mt-1 text-sm text-muted-foreground">Identifica assunto, urgência e cliente, e entrega para quem resolve mais rápido.</p>

            <div className="relative mt-6 flex-1">
              <svg viewBox="0 0 360 280" className="h-auto w-full" role="img" aria-label="Canais de entrada ligados ao roteador, que envia para atendente e alerta">
                <defs>
                  <linearGradient id="fcf-feixe" x1="0" x2="1">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
                    <stop offset="0.6" stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[...ENTRADAS.map((n) => curva(n.x + 22, n.y, HUB.x - 34, HUB.y)), ...SAIDAS.map((n) => curva(HUB.x + 34, HUB.y, n.x - 22, n.y))].map((d, i) => (
                  <g key={d}>
                    <path d={d} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="url(#fcf-feixe)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0.3, pathOffset: 0, opacity: 0 }}
                      animate={{ pathLength: 0.3, pathOffset: [0, 1], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i < 3 ? i * 0.45 : 1.2 + (i - 3) * 0.5, repeatDelay: 0.6 }}
                    />
                  </g>
                ))}

                {[...ENTRADAS, ...SAIDAS].map(({ id, Icon, x, y }) => (
                  <foreignObject key={id} x={x - 22} y={y - 22} width="44" height="44">
                    <div className="flex size-11 items-center justify-center rounded-xl border bg-background shadow-sm">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                  </foreignObject>
                ))}

                <motion.rect
                  x={HUB.x - 46}
                  y={HUB.y - 46}
                  width="92"
                  height="92"
                  rx="26"
                  fill="var(--primary)"
                  fillOpacity="0.08"
                  style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
                  animate={{ scale: [1, 1.18, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <foreignObject x={HUB.x - 34} y={HUB.y - 34} width="68" height="68">
                  <div className="flex size-[68px] items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <Sparkles className="size-7" />
                  </div>
                </foreignObject>
              </svg>
            </div>
          </article>

          {/* 3 — Resolução */}
          <article className="flex flex-col rounded-2xl border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-5" />
            </span>
            <h3 className="mt-5 font-medium">Resposta com contexto</h3>
            <p className="mt-1 text-sm text-muted-foreground">O atendente recebe resumo, pedido e sugestão de resposta antes de abrir a conversa.</p>
            <div className="mt-6 space-y-3 rounded-lg border bg-background p-4 text-sm">
              <p className="text-xs font-medium text-muted-foreground uppercase">Resumo para Lucas</p>
              {['Cliente desde 2023, 7 pedidos', 'Pedido #4821 entregue ontem', 'Troca de 40 para 42 disponível'].map((t) => (
                <p key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {t}
                </p>
              ))}
            </div>
            <p className="mt-auto pt-6 text-xs text-muted-foreground">Tempo médio de primeira resposta: <span className="font-medium text-foreground">1 min 48 s</span></p>
          </article>
        </div>
      </div>
    </section>
  )
}
