'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Typing Bubbles Chat": duas pessoas conversam; antes de cada mensagem aparece o indicador de digitação do lado
// de quem vai falar, com avatar e nome. Sem moldura de janela. Reinicia em loop.
const PEOPLE = {
  ana: { name: 'Ana Souza', initials: 'AS', right: false },
  lucas: { name: 'Lucas Prado', initials: 'LP', right: true },
} as const
type Who = keyof typeof PEOPLE

const SCRIPT: ReadonlyArray<{ from: Who; text: string; time: string }> = [
  { from: 'ana', text: 'Oi, Lucas! Fechou o contrato da Nexa?', time: '14:30' },
  { from: 'lucas', text: 'Fechou! Assinaram hoje de manhã.', time: '14:31' },
  { from: 'ana', text: 'Boa! Já marco o onboarding pra terça.', time: '14:31' },
  { from: 'lucas', text: 'Perfeito, mando o convite pra eles.', time: '14:32' },
]

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Row({ who, children }: { who: Who; children: React.ReactNode }) {
  const p = PEOPLE[who]
  return (
    <div className={`flex items-end gap-2 ${p.right ? 'flex-row-reverse' : ''}`}>
      <Avatar className="size-7 border bg-card">
        <AvatarFallback className="text-[10px]">{p.initials}</AvatarFallback>
      </Avatar>
      <div className={`flex max-w-[78%] flex-col ${p.right ? 'items-end' : 'items-start'}`}>
        <span className="mb-1 px-1 text-[10px] text-muted-foreground">{p.name}</span>
        {children}
      </div>
    </div>
  )
}

export default function TypingBubblesChat() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState<Who | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setShown(0)
        setTyping(null)
        await sleep(500)
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return
          setTyping(SCRIPT[i]!.from)
          await sleep(1000)
          setTyping(null)
          setShown(i + 1)
          await sleep(1200)
        }
        await sleep(2400)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[320px] w-[360px] flex-col justify-end gap-3 text-foreground">
      <AnimatePresence initial={false}>
        {SCRIPT.slice(0, shown).map((m, i) => {
          const right = PEOPLE[m.from].right
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}>
              <Row who={m.from}>
                <div className={right ? 'rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground' : 'rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm'}>{m.text}</div>
                <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                  {m.time}
                  {right && i === SCRIPT.length - 1 && shown === SCRIPT.length ? ' · visto' : ''}
                </span>
              </Row>
            </motion.div>
          )
        })}
        {typing && (
          <motion.div key={`typing-${typing}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
            <Row who={typing}>
              <div className={`flex gap-1 rounded-2xl px-3 py-2.5 ${PEOPLE[typing].right ? 'rounded-br-sm bg-primary' : 'rounded-bl-sm bg-muted'}`}>
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className={`size-1.5 rounded-full ${PEOPLE[typing].right ? 'bg-primary-foreground' : 'bg-muted-foreground'}`}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </div>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
