'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// "Tag Cloud Marquee": nuvem de hashtags em seis fileiras de tamanhos diferentes, cada uma numa velocidade e com
// sentidos alternados, recortada por uma máscara circular (as bordas somem em todas as direções). A cada 0,8s algumas
// tags "esquentam": viram a cor primária com um pop e depois esfriam — como assuntos em alta.
const TAGS = [
  'pix', 'frete-grátis', 'black-friday', 'assinaturas', 'crm', 'whatsapp', 'checkout', 'cupom', 'remarketing', 'afiliados',
  'landing-page', 'funil', 'upsell', 'nps', 'estoque', 'marketplace', 'cashback', 'boleto', 'recorrência', 'automação',
  'leads', 'conversão', 'carrinho', 'e-mail', 'lançamento', 'tráfego-pago', 'seo', 'notas-fiscais', 'devolução', 'pré-venda',
] as const
const ROWS = [
  { size: 'text-xs', pad: 'px-2 py-0.5', dur: 30, off: 0 },
  { size: 'text-sm', pad: 'px-2.5 py-1', dur: 24, off: 5 },
  { size: 'text-base', pad: 'px-3 py-1', dur: 34, off: 10 },
  { size: 'text-lg', pad: 'px-3.5 py-1', dur: 28, off: 15 },
  { size: 'text-sm', pad: 'px-2.5 py-1', dur: 22, off: 20 },
  { size: 'text-xs', pad: 'px-2 py-0.5', dur: 32, off: 25 },
] as const
const PER_ROW = 8

export default function TagCloudMarquee() {
  const [hot, setHot] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setHot((h) => h + 1), 800)
    return () => clearInterval(id)
  }, [])

  const isHot = (idx: number) => (idx * 7 + hot * 3) % 11 === 0

  return (
    <div
      className="relative flex h-[320px] w-[420px] flex-col justify-center gap-2.5 overflow-hidden text-foreground"
      style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 45%, transparent 100%)' }}
    >
      {ROWS.map((r, ri) => {
        const tags = Array.from({ length: PER_ROW }, (_, k) => TAGS[(r.off + k) % TAGS.length])
        const reverse = ri % 2 === 1
        return (
          <motion.div key={ri} className="flex w-max" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}>
            {[...tags, ...tags].map((t, i) => {
              const idx = ri * PER_ROW + (i % PER_ROW)
              const on = isHot(idx)
              return (
                <span key={i} className="pr-2.5">
                  <motion.span
                    className={`inline-block whitespace-nowrap rounded-full border font-medium transition-colors duration-500 ${r.size} ${r.pad} ${
                      on ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'
                    }`}
                    animate={{ scale: on ? [1, 1.12, 1] : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    #{t}
                  </motion.span>
                </span>
              )
            })}
          </motion.div>
        )
      })}
    </div>
  )
}
