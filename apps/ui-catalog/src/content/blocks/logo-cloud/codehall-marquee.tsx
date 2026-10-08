'use client'

import { motion } from 'motion/react'

const CH_STACK = ['Claude', 'OpenAI', 'Gemini', 'Llama', 'AWS', 'Google Cloud', 'Cloudflare', 'PostgreSQL', 'WhatsApp', 'Microsoft 365']

export default function CodehallMarquee() {
  return (
    <section className="w-full px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-muted-foreground">Trabalhamos com os melhores modelos e a infraestrutura que você já usa.</p>
        <div className="mt-4 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}>
          <motion.div className="flex w-max gap-10" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            {[...CH_STACK, ...CH_STACK].map((n, i) => (
              <span key={`${n}-${i}`} className="text-xl font-semibold tracking-tight text-muted-foreground/70">
                {n}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
