'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Minus, Send, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

const INITIAL: Msg[] = [
  { id: 1, from: 'bot', text: 'Oi! Sou a Lia, assistente da Lumio. Posso ajudar com planos, integrações ou dúvidas técnicas.' },
  { id: 2, from: 'user', text: 'Vocês integram com o WhatsApp Business?' },
  { id: 3, from: 'bot', text: 'Sim! A integração oficial leva uns 5 minutos. Quer que eu te mande o passo a passo?' },
]

const SUGESTOES = ['Quanto custa o plano Pro?', 'Tem teste grátis?', 'Falar com uma pessoa']

export default function ChatIaFlutuante() {
  const [open, setOpen] = useState(true)
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextId = useRef(100)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const send = (raw: string) => {
    const clean = raw.trim()
    if (!clean || typing) return
    setMsgs((m) => [...m, { id: nextId.current++, from: 'user', text: clean }])
    setText('')
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId.current++, from: 'bot', text: 'Boa pergunta! Já te respondo com os detalhes. Se preferir, chamo alguém do time para continuar.' }])
    }, 1200)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto min-h-[620px] max-w-5xl overflow-hidden rounded-2xl border bg-muted/30">
        <div className="px-8 py-10 sm:px-12">
          <span className="block h-3 w-20 rounded bg-muted-foreground/15" />
          <span className="mt-4 block h-8 w-2/3 max-w-md rounded bg-muted-foreground/15" />
          <span className="mt-2 block h-8 w-1/3 max-w-xs rounded bg-muted-foreground/15" />
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <span className="block size-8 rounded-lg bg-muted" />
                <span className="mt-3 block h-3 w-3/4 rounded bg-muted" />
                <span className="mt-2 block h-3 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="janela"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="absolute right-4 bottom-20 flex h-[440px] w-[calc(100%-2rem)] max-w-[360px] origin-bottom-right flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl sm:right-6"
            >
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    <Sparkles className="size-4" />
                  </AvatarFallback>
                  <AvatarBadge className="bg-emerald-500" />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">Lia · Assistente IA</div>
                  <div className="text-xs text-muted-foreground">Online · responde em segundos</div>
                </div>
                <button type="button" aria-label="Minimizar" onClick={() => setOpen(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Minus className="size-4" />
                </button>
                <button type="button" aria-label="Fechar chat" onClick={() => setOpen(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
                {msgs.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
                      m.from === 'user' ? 'self-end rounded-br-sm bg-primary text-primary-foreground' : 'self-start rounded-bl-sm bg-muted',
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                )}
              </div>

              {msgs.length <= 3 && (
                <div className="flex gap-2 overflow-x-auto px-4 pb-2">
                  {SUGESTOES.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="shrink-0 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                className="flex items-center gap-2 border-t p-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  send(text)
                }}
              >
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreva sua mensagem…" aria-label="Mensagem" className="h-9" />
                <Button type="submit" size="icon" aria-label="Enviar" disabled={!text.trim() || typing}>
                  <Send />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label={open ? 'Fechar chat' : 'Abrir chat'}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-5 bottom-5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
          {!open && <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white ring-2 ring-background">1</span>}
        </button>
      </div>
    </section>
  )
}
