'use client'

import { useEffect, useState } from 'react'
import { Truck } from 'lucide-react'
import { motion } from 'motion/react'

// "Curved Path Text": tipografia em caminhos SVG (<textPath>). Cada frase entra deslizando pelo arco tracejado
// (startOffset animado), para no topo, segura e sai pelo outro lado; embaixo, um selo circular com o texto em volta
// do círculo gira sem parar ao redor do ícone de entrega.
const PHRASES = ['Entrega em 24 horas', 'Parcele em até 12x', 'Primeira troca grátis', 'Pague com Pix'] as const
const W = 460
const H = 300
const ARCH = `M 30 196 Q ${W / 2} 22 ${W - 30} 196`
const C = { x: W / 2, y: 214 }
const R = 50
const CIRCLE = `M ${C.x - R} ${C.y} a ${R} ${R} 0 1 1 ${2 * R} 0 a ${R} ${R} 0 1 1 ${-2 * R} 0`
const CYCLE = 3.6

export default function CurvedPathText() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PHRASES.length), CYCLE * 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label={PHRASES[i]}>
        <defs>
          <path id="cpt-arch" d={ARCH} />
          <path id="cpt-circle" d={CIRCLE} />
          <linearGradient id="cpt-grad" x1="0" x2="1">
            <stop offset="0" stopColor="rgb(236 72 153)" />
            <stop offset="0.5" stopColor="rgb(139 92 246)" />
            <stop offset="1" stopColor="rgb(14 165 233)" />
          </linearGradient>
        </defs>

        {/* guia do arco */}
        <use href="#cpt-arch" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" />
        <motion.path
          d={ARCH}
          fill="none"
          stroke="url(#cpt-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.45, 1], repeat: Infinity }}
        />

        {/* frase deslizando pelo arco */}
        <text key={i} fontSize="30" fontWeight="800" letterSpacing="-0.5" fill="url(#cpt-grad)" textAnchor="middle" fontFamily="inherit">
          <motion.textPath
            href="#cpt-arch"
            initial={{ startOffset: '-35%' }}
            animate={{ startOffset: ['-35%', '50%', '50%', '135%'] }}
            transition={{ duration: CYCLE, times: [0, 0.3, 0.72, 1], ease: ['easeOut', 'linear', 'easeIn'] }}
          >
            {PHRASES[i]}
          </motion.textPath>
        </text>

        {/* selo circular girando */}
        <circle cx={C.x} cy={C.y} r={R + 16} fill="var(--card)" stroke="var(--border)" />
        <motion.g style={{ transformBox: 'view-box', transformOrigin: `${C.x}px ${C.y}px` }} animate={{ rotate: 360 }} transition={{ duration: 14, ease: 'linear', repeat: Infinity }}>
          <text fontSize="10.5" fontWeight="600" fill="var(--muted-foreground)" fontFamily="inherit">
            <textPath href="#cpt-circle" textLength={2 * Math.PI * R - 6} lengthAdjust="spacing">
              • FRETE GRÁTIS • COMPRA SEGURA • TROCA FÁCIL • DEVOLUÇÃO EM 7 DIAS
            </textPath>
          </text>
        </motion.g>
      </svg>
      <span className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background" style={{ left: C.x, top: C.y }}>
        <Truck className="size-6" />
      </span>
    </div>
  )
}
