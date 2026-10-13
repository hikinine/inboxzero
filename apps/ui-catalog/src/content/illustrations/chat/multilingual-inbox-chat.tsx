'use client'

import { useEffect, useState } from 'react'
import { Languages, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Multilingual Inbox Chat": caixa de atendimento com clientes de vários países. A cada ciclo a próxima conversa da
// lista é aberta: a mensagem chega no idioma do cliente com o chip "Detectado: …" e a tradução em português embaixo;
// a atendente responde em português e a bolha vira o texto enviado no idioma do cliente. Inglês, espanhol, francês.
const CONVOS = [
  {
    name: 'Emily Carter',
    ini: 'EC',
    code: 'EN',
    lang: 'Inglês',
    tone: 'bg-sky-500',
    msg: 'Hi! Can I change the delivery address of my order?',
    pt: 'Oi! Posso mudar o endereço de entrega do meu pedido?',
    reply: 'Claro! Me envie o novo endereço que eu atualizo.',
    sent: 'Sure! Send me the new address and I will update it.',
  },
  {
    name: 'Mateo García',
    ini: 'MG',
    code: 'ES',
    lang: 'Espanhol',
    tone: 'bg-amber-500',
    msg: '¿Tienen la talla 40 en color negro?',
    pt: 'Vocês têm o tamanho 40 na cor preta?',
    reply: 'Temos sim! Restam 3 unidades no estoque.',
    sent: '¡Sí, tenemos! Quedan 3 unidades en stock.',
  },
  {
    name: 'Chloé Martin',
    ini: 'CM',
    code: 'FR',
    lang: 'Francês',
    tone: 'bg-violet-500',
    msg: 'Bonjour, le paiement par Pix est possible depuis la France ?',
    pt: 'Olá, é possível pagar com Pix da França?',
    reply: 'No momento, de fora do Brasil, aceitamos só cartão.',
    sent: "Pour l'instant, depuis l'étranger, seule la carte est acceptée.",
  },
] as const
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function MultilingualInboxChat() {
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let i = 0
      while (!cancelled) {
        setActive(i)
        setPhase(0)
        await sleep(400)
        setPhase(1) // mensagem chega
        await sleep(900)
        setPhase(2) // detectado + tradução
        await sleep(1200)
        setPhase(3) // resposta em pt
        await sleep(1000)
        setPhase(4) // vira idioma do cliente
        await sleep(2200)
        if (cancelled) return
        i = (i + 1) % CONVOS.length
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const c = CONVOS[active]

  return (
    <div className="flex h-[340px] w-[460px] overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <aside className="w-[140px] shrink-0 border-r bg-muted/30">
        <div className="flex items-center gap-1.5 border-b px-3 py-2.5 text-xs font-medium">
          <Languages className="size-3.5" /> Caixa global
        </div>
        {CONVOS.map((cv, i) => (
          <div key={cv.code} className={`relative flex items-center gap-2 px-3 py-2.5 ${i === active ? 'bg-card' : ''}`}>
            {i === active && <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary" />}
            <span className={`relative flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${cv.tone}`}>
              {cv.ini}
              <span className="absolute -bottom-1 -right-1 rounded-sm border border-card bg-foreground px-0.5 text-[7px] font-bold text-background">{cv.code}</span>
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[11px] font-medium">{cv.name}</div>
              <div className="truncate text-[9px] text-muted-foreground">{cv.lang}</div>
            </div>
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b px-3 py-2.5">
          <span className="text-xs font-medium">{c.name}</span>
          <span className="rounded-full border px-1.5 text-[9px] text-muted-foreground">{c.code}</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-violet-600 dark:text-violet-400">
            <Sparkles className="size-3" /> tradução automática
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3 text-[12px]">
          <AnimatePresence mode="popLayout">
            {phase >= 1 && (
              <motion.div key={`in-${active}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[88%] rounded-xl rounded-tl-sm bg-muted px-3 py-2">
                {c.msg}
                <AnimatePresence>
                  {phase >= 2 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                      <div className="mt-1.5 border-t border-border pt-1.5 text-[11px] text-muted-foreground">
                        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-1.5 text-[9px] font-medium text-violet-600 dark:text-violet-400">
                          Detectado: {c.lang}
                        </span>
                        <div>{c.pt}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            {phase >= 3 && (
              <motion.div key={`out-${active}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[88%] self-end rounded-xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={phase >= 4 ? 'sent' : 'pt'} initial={{ opacity: 0, filter: 'blur(4px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3 }}>
                    {phase >= 4 ? c.sent : c.reply}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-1 text-right text-[9px] opacity-70">{phase >= 4 ? `enviado em ${c.lang.toLowerCase()} · você escreveu em português` : 'traduzindo…'}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t p-2">
          <div className="rounded-lg border bg-background px-3 py-1.5 text-[11px] text-muted-foreground">Responda em português…</div>
        </div>
      </div>
    </div>
  )
}
