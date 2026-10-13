'use client'

import { useEffect, useState } from 'react'
import { Languages } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Translation Chat": a mensagem chega em espanhol, o botão "Traduzir" é tocado e as palavras se transformam em
// português uma a uma (desfoque cruzado da esquerda para a direita). A resposta sai em português com a versão
// enviada em espanhol logo abaixo. Depois volta ao original e recomeça.
const ES = ['¡Hola!', '¿Pueden', 'enviar', 'el', 'pedido', 'a', 'Córdoba', 'antes', 'del', 'viernes?']
const PT = ['Oi!', 'Vocês podem', 'enviar', 'o', 'pedido', 'para', 'Córdoba', 'antes', 'de', 'sexta?']
const REPLY = 'Sim! Despachamos amanhã com frete expresso.'
const REPLY_ES = '¡Sí! Lo despachamos mañana con envío exprés.'

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function TranslationChat() {
  const [done, setDone] = useState(0) // quantas palavras já estão em português
  const [tap, setTap] = useState(false)
  const [reply, setReply] = useState(0) // caracteres digitados da resposta
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setDone(0)
        setReply(0)
        setSent(false)
        await sleep(1400)
        setTap(true)
        await sleep(300)
        setTap(false)
        for (let i = 1; i <= PT.length && !cancelled; i++) {
          setDone(i)
          await sleep(120)
        }
        await sleep(900)
        for (let i = 0; i <= REPLY.length && !cancelled; i += 2) {
          setReply(i)
          await sleep(35)
        }
        setReply(REPLY.length)
        await sleep(400)
        if (cancelled) return
        setSent(true)
        await sleep(3000)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const translated = done === PT.length

  return (
    <div className="flex h-[360px] w-[340px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-md">
      <div className="flex flex-col items-center border-b bg-muted/40 py-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-sm font-semibold text-white">SM</span>
        <span className="mt-1 text-xs font-medium">Sofía Martínez</span>
        <span className="text-[10px] text-muted-foreground">Buenos Aires · cliente</span>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-1.5 p-3">
        <div className="max-w-[82%] self-start">
          <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-[13px] leading-snug">
            {ES.map((w, i) => (
              <span key={i} className="relative inline-block whitespace-nowrap">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i < done ? 'pt' : 'es'}
                    className={cn('inline-block', i < done && 'text-sky-700 dark:text-sky-300')}
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.16 }}
                  >
                    {i < done ? PT[i] : w}
                  </motion.span>
                </AnimatePresence>
                {i < ES.length - 1 && ' '}
              </span>
            ))}
          </div>
          <div className="mt-1 flex items-center gap-1.5 pl-1 text-[10px] text-muted-foreground">
            {translated ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                <Languages className="size-3" /> Traduzido do espanhol · <span className="underline underline-offset-2">ver original</span>
              </motion.span>
            ) : (
              <motion.span
                animate={tap ? { scale: 0.9 } : { scale: 1 }}
                className={cn('flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium transition-colors', tap || done > 0 ? 'border-sky-500/50 bg-sky-500/10 text-sky-600 dark:text-sky-400' : 'bg-background')}
              >
                <Languages className="size-3" /> {done > 0 ? 'Traduzindo…' : 'Traduzir'}
              </motion.span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {sent && (
            <motion.div key="reply" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 max-w-[82%] self-end text-right">
              <div className="rounded-2xl rounded-br-md bg-sky-500 px-3 py-2 text-left text-[13px] leading-snug text-white">{REPLY}</div>
              <div className="mt-1 pr-1 text-[10px] italic text-muted-foreground">enviado como: “{REPLY_ES}”</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t p-2.5">
        <div className="flex h-8 flex-1 items-center rounded-full border px-3 text-[12px]">
          {sent || reply === 0 ? (
            <span className="text-muted-foreground">Responder em português…</span>
          ) : (
            <span className="truncate">
              {REPLY.slice(0, reply)}
              <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-foreground" />
            </span>
          )}
        </div>
        <span className="rounded-full bg-muted px-2 py-1 text-[9px] font-semibold text-muted-foreground">PT → ES</span>
      </div>
    </div>
  )
}
