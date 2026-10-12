'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, Headphones } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Support Chat Notifications": janela de atendimento onde novas conversas entram deslizando pela direita e o
// contador do sino sobe a cada chegada; depois de quatro, a caixa é zerada e o ciclo recomeça.
const INCOMING = [
  { initials: 'MR', name: 'Marina Ribeiro', text: 'Meu boleto venceu, consigo gerar outro?', tag: 'Financeiro' },
  { initials: 'JC', name: 'João Carlos', text: 'A integração com o WhatsApp parou.', tag: 'Suporte' },
  { initials: 'PL', name: 'Paula Lima', text: 'Quero migrar para o plano anual.', tag: 'Vendas' },
  { initials: 'RA', name: 'Rafael Alves', text: 'Como exporto os contatos em CSV?', tag: 'Suporte' },
] as const

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function SupportChatNotifications() {
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setItems([])
        await sleep(900)
        for (let i = 0; i < INCOMING.length; i++) {
          if (cancelled) return
          setItems((prev) => [i, ...prev])
          await sleep(1500)
        }
        await sleep(2000)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const count = items.length

  return (
    <div className="flex h-[330px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Headphones className="size-4" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Central de atendimento</div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />3 agentes online
          </div>
        </div>
        <div className="relative ml-auto flex size-8 items-center justify-center rounded-lg border">
          <Bell className="size-4" />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.25, 1], opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden p-3">
        <AnimatePresence>
          {count === 0 && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
              Nenhuma conversa pendente
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {items.map((idx) => {
              const n = INCOMING[idx]!
              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, x: 90 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="flex items-start gap-2.5 rounded-xl border bg-background p-2.5"
                >
                  <Avatar className="size-8 border bg-card">
                    <AvatarFallback className="text-[10px]">{n.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-medium">{n.name}</span>
                      <span className="text-[10px] text-muted-foreground">agora</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{n.text}</p>
                  </div>
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{n.tag}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t px-3 py-2">
        <div className="flex h-8 items-center rounded-lg border bg-background px-3 text-xs text-muted-foreground">Responder…</div>
      </div>
    </div>
  )
}
