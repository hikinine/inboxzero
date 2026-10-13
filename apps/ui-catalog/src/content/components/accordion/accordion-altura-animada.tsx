'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, ChevronDown, CreditCard, Plus, ShieldCheck } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const PERGUNTAS = [
  { q: 'Posso cancelar quando quiser?', a: 'Sim. O cancelamento é feito em dois cliques no painel e você mantém o acesso até o fim do período já pago, sem multa.' },
  { q: 'Vocês emitem nota fiscal?', a: 'Emitimos NFS-e automaticamente para CPF ou CNPJ todo mês, logo após a confirmação do pagamento. Ela chega no seu e-mail e fica no histórico.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Pix, boleto e cartão de crédito em até 12x. No plano anual, o Pix tem 10% de desconto.' },
  { q: 'Meus dados ficam no Brasil?', a: 'Ficam. Os servidores estão em São Paulo e seguimos a LGPD, com backup diário criptografado.' },
]

const altura = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { height: { type: 'spring', stiffness: 260, damping: 30 }, opacity: { duration: 0.2 } },
} as const

function FaqPlus() {
  const [aberto, setAberto] = useState<number | null>(0)
  return (
    <div className="divide-y rounded-2xl border bg-card">
      {PERGUNTAS.map((p, i) => {
        const open = aberto === i
        return (
          <div key={p.q} className="px-5">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-${i}`}
              onClick={() => setAberto(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {p.q}
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className={cn('flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors', open && 'border-primary bg-primary text-primary-foreground')}
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div id={`faq-${i}`} key="c" {...altura} className="overflow-hidden">
                  <p className="pr-10 pb-4 text-sm text-muted-foreground">{p.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

const GRUPOS = [
  { id: 'notif', Icon: Bell, titulo: 'Notificações', resumo: '3 de 4 ativas', opcoes: ['Novo pedido', 'Pagamento aprovado', 'Estoque baixo', 'Resumo semanal'] },
  { id: 'pag', Icon: CreditCard, titulo: 'Pagamentos', resumo: 'Pix e cartão', opcoes: ['Aceitar Pix', 'Aceitar cartão', 'Aceitar boleto'] },
  { id: 'seg', Icon: ShieldCheck, titulo: 'Segurança', resumo: '2FA ativo', opcoes: ['Verificação em duas etapas', 'Alertas de login'] },
]

function ConfiguracoesChevron() {
  const [abertos, setAbertos] = useState<string[]>(['notif'])
  const alternar = (id: string) => setAbertos((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  return (
    <div className="space-y-2">
      {GRUPOS.map((g) => {
        const open = abertos.includes(g.id)
        return (
          <div key={g.id} className={cn('rounded-xl border transition-colors', open ? 'bg-muted/50' : 'bg-card')}>
            <button type="button" aria-expanded={open} onClick={() => alternar(g.id)} className="flex w-full items-center gap-3 p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
              <span className="flex size-9 items-center justify-center rounded-lg border bg-background">
                <g.Icon className="size-4 text-muted-foreground" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">{g.titulo}</span>
                <span className="block text-xs text-muted-foreground">{g.resumo}</span>
              </span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                <ChevronDown className="size-4 text-muted-foreground" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div key="c" {...altura} className="overflow-hidden">
                  <motion.ul
                    initial="fechado"
                    animate="aberto"
                    variants={{ aberto: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                    className="space-y-1 px-3 pb-3 pl-15"
                  >
                    {g.opcoes.map((o, i) => (
                      <motion.li
                        key={o}
                        variants={{ fechado: { opacity: 0, x: -8 }, aberto: { opacity: 1, x: 0 } }}
                        className="flex items-center justify-between rounded-md py-1.5 text-sm"
                      >
                        <label htmlFor={`${g.id}-${i}`}>{o}</label>
                        <Switch id={`${g.id}-${i}`} defaultChecked={i !== g.opcoes.length - 1} />
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function AccordionAlturaAnimada() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Um aberto por vez · “+” que vira “×”">
        <FaqPlus />
      </Demo>
      <Demo title="Vários abertos · chevron girando e itens em cascata">
        <ConfiguracoesChevron />
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
