'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Wifi } from 'lucide-react'

// "Payment Card Stack": cartões com gradiente empilhados; a cada 2,4s o da frente cai para fora da pilha e um novo
// entra por trás. Chip, contactless, número mascarado, titular e validade.
const CARDS = [
  { id: 'pro', brand: 'Conta Pro', holder: 'ANA SOUZA', last4: '4242', exp: '12/28', tone: 'from-violet-500 via-purple-500 to-fuchsia-500' },
  { id: 'black', brand: 'Conta Black', holder: 'BRUNO ROCHA', last4: '8831', exp: '03/27', tone: 'from-zinc-700 via-zinc-800 to-zinc-950' },
  { id: 'verde', brand: 'Conta Verde', holder: 'CAMILA MENDES', last4: '1907', exp: '09/29', tone: 'from-emerald-500 via-teal-500 to-cyan-600' },
  { id: 'sol', brand: 'Conta Sol', holder: 'DIEGO LIMA', last4: '5520', exp: '06/30', tone: 'from-amber-400 via-orange-500 to-rose-500' },
] as const

export default function PaymentCardStack() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => (h + 1) % CARDS.length), 2400)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((i) => CARDS[(head + i) % CARDS.length]!)

  return (
    <div className="relative h-[250px] w-[340px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((c, depth) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: -70, scale: 0.8 }}
            animate={{ opacity: 1 - depth * 0.12, y: -depth * 18, scale: 1 - depth * 0.07, rotate: 0, zIndex: 10 - depth }}
            exit={{ opacity: 0, y: 80, rotate: 6, scale: 1.02, zIndex: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className={`absolute inset-x-0 bottom-0 flex h-[190px] flex-col rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl ${c.tone}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide">{c.brand}</span>
              <Wifi className="size-5 rotate-90 opacity-80" />
            </div>
            <div className="mt-4 h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 opacity-90" />
            <div className="mt-3 font-mono text-lg tracking-[0.18em]">•••• •••• •••• {c.last4}</div>
            <div className="mt-auto flex items-end justify-between text-[11px] uppercase tracking-wider">
              <div>
                <div className="text-[9px] opacity-70">Titular</div>
                <div className="font-medium">{c.holder}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] opacity-70">Validade</div>
                <div className="font-medium">{c.exp}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
