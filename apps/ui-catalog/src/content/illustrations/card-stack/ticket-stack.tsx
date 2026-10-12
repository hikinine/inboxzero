'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Ticket Stack": tickets de suporte em leque; o da frente sai pela esquerda e um novo entra pela direita.
// Barra lateral pela prioridade, status em Badge e responsável em avatar.
const TICKETS = [
  { id: '#1842', title: 'Boleto não gerado no checkout', status: 'Aberto', priority: 'Alta', who: 'MR' },
  { id: '#1839', title: 'Integração do WhatsApp desconectou', status: 'Em andamento', priority: 'Alta', who: 'JC' },
  { id: '#1836', title: 'Exportar contatos em CSV', status: 'Aguardando', priority: 'Média', who: 'PL' },
  { id: '#1831', title: 'Alterar e-mail de cobrança', status: 'Resolvido', priority: 'Baixa', who: 'RA' },
  { id: '#1827', title: 'Relatório mensal com valor zerado', status: 'Em andamento', priority: 'Média', who: 'AS' },
] as const

type Priority = (typeof TICKETS)[number]['priority']
type Status = (typeof TICKETS)[number]['status']
const PRIORITY: Record<Priority, string> = { Alta: 'bg-rose-500', Média: 'bg-amber-500', Baixa: 'bg-emerald-500' }
const STATUS: Record<Status, 'destructive' | 'default' | 'secondary' | 'outline'> = { Aberto: 'destructive', 'Em andamento': 'default', Aguardando: 'secondary', Resolvido: 'outline' }

const FAN = [
  { x: 0, y: 0, rotate: 0 },
  { x: 12, y: -12, rotate: 2 },
  { x: 24, y: -24, rotate: 4 },
] as const

export default function TicketStack() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => (h + 1) % TICKETS.length), 2300)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((i) => TICKETS[(head + i) % TICKETS.length]!)

  return (
    <div className="relative h-[220px] w-[380px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((t, depth) => {
          const fan = FAN[depth]!
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 150, y: fan.y, rotate: 10 }}
              animate={{ opacity: 1 - depth * 0.2, x: fan.x, y: fan.y, rotate: fan.rotate, scale: 1 - depth * 0.04, zIndex: 10 - depth }}
              exit={{ opacity: 0, x: -170, rotate: -10, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="absolute inset-x-0 bottom-0 flex gap-3 rounded-xl border bg-card p-3 shadow-md"
              style={{ transformOrigin: 'bottom left' }}
            >
              <span className={`w-1 self-stretch rounded-full ${PRIORITY[t.priority]}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                  <Badge variant={STATUS[t.status]} className="text-[10px]">
                    {t.status}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-sm font-medium">{t.title}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Prioridade {t.priority.toLowerCase()}</span>
                  <Avatar className="size-6 border bg-muted">
                    <AvatarFallback className="text-[9px]">{t.who}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
