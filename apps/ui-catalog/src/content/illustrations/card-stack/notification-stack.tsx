'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, CreditCard, MessageSquare, UserPlus } from 'lucide-react'

// "Notification Stack": cards empilhados; a cada 2,4s o do topo sai e um novo entra por baixo.
const ITEMS = [
  { Icon: UserPlus, title: 'Novo lead', text: 'Ana Souza entrou pelo formulário', time: 'agora' },
  { Icon: CreditCard, title: 'Pagamento aprovado', text: 'R$ 497,00 · Plano Pro', time: '1 min' },
  { Icon: MessageSquare, title: 'Mensagem no WhatsApp', text: '“Consigo migrar meus dados?”', time: '3 min' },
  { Icon: Bell, title: 'Automação disparada', text: 'Boas-vindas · 128 contatos', time: '5 min' },
]

export default function NotificationStack() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => (h + 1) % ITEMS.length), 2400)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((i) => ITEMS[(head + i) % ITEMS.length]!)

  return (
    <div className="relative h-[200px] w-[340px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((it, depth) => (
          <motion.div
            key={`${it.title}-${(head + depth) % ITEMS.length}`}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1 - depth * 0.25, y: depth * -14, scale: 1 - depth * 0.05, zIndex: 10 - depth }}
            exit={{ opacity: 0, y: -40, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="absolute inset-x-0 bottom-0 flex items-start gap-3 rounded-xl border bg-card p-3 shadow-md"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <it.Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{it.title}</span>
                <span className="text-[11px] text-muted-foreground">{it.time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{it.text}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
