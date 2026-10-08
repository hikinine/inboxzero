'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// "Chat Conversation": mensagens aparecem em sequência com indicador de digitação; reinicia em loop.
const SCRIPT = [
  { from: 'user', text: 'Consigo importar meus contatos do CSV?' },
  { from: 'bot', text: 'Sim! Envie o arquivo e eu mapeio as colunas pra você.' },
  { from: 'user', text: 'E as tags vêm junto?' },
  { from: 'bot', text: 'Vêm. Já encontrei 3 colunas de tags e 1.284 contatos válidos.' },
] as const

export default function ChatConversation() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
      while (!cancelled) {
        setShown(0)
        await sleep(600)
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return
          if (SCRIPT[i]!.from === 'bot') {
            setTyping(true)
            await sleep(1100)
            setTyping(false)
          }
          setShown(i + 1)
          await sleep(1300)
        }
        await sleep(2200)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[260px] w-[340px] flex-col justify-end gap-2 rounded-2xl border bg-card p-4 text-foreground">
      <AnimatePresence initial={false}>
        {SCRIPT.slice(0, shown).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={m.from === 'user' ? 'self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground' : 'self-start rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm'}
            style={{ maxWidth: '85%' }}
          >
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
