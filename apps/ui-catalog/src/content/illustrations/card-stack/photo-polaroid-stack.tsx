'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// "Photo Polaroid Stack": polaroides espalhadas na mesa, cada uma com uma cena em SVG (praia, serra, cidade à noite,
// campo) e legenda manuscrita. A de cima é levantada, desliza para o lado e volta por baixo da pilha com um novo
// ângulo — como quem folheia fotos. As cenas também têm vida própria (sol, ondas, janelas, nuvem).
const PHOTOS = [
  { id: 'praia', caption: 'Floripa · jan/26', rot: -6, dx: -8 },
  { id: 'serra', caption: 'Serra Gaúcha · jun/25', rot: 5, dx: 10 },
  { id: 'cidade', caption: 'Avenida Paulista · 23h', rot: -2, dx: 2 },
  { id: 'campo', caption: 'Chapada dos Veadeiros', rot: 8, dx: -4 },
] as const
type PhotoId = (typeof PHOTOS)[number]['id']

function Scene({ id }: { id: PhotoId }) {
  if (id === 'praia')
    return (
      <svg viewBox="0 0 160 130" className="size-full" aria-hidden>
        <rect width="160" height="130" className="fill-sky-300" />
        <motion.circle cx="118" cy="38" r="14" className="fill-amber-300" animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.path d="M0 74 Q 20 68 40 74 T 80 74 T 120 74 T 160 74 V 100 H 0 Z" className="fill-sky-600" animate={{ x: [-8, 0, -8] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
        <path d="M0 96 Q 80 86 160 98 V 130 H 0 Z" className="fill-amber-200" />
        <path d="M30 96 L 34 66 M34 66 q -10 -2 -16 4 M34 66 q 8 -6 16 0 M34 66 q -4 -8 -12 -8" className="stroke-emerald-700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  if (id === 'serra')
    return (
      <svg viewBox="0 0 160 130" className="size-full" aria-hidden>
        <rect width="160" height="130" className="fill-rose-300" />
        <rect y="0" width="160" height="50" className="fill-indigo-400" opacity="0.6" />
        <circle cx="80" cy="74" r="18" className="fill-orange-300" />
        <path d="M0 90 L 36 52 L 64 80 L 98 44 L 160 96 V 130 H 0 Z" className="fill-indigo-900" />
        <path d="M0 106 L 50 78 L 90 100 L 130 82 L 160 98 V 130 H 0 Z" className="fill-indigo-700" />
        <motion.ellipse cx="40" cy="30" rx="16" ry="5" className="fill-white" opacity="0.7" animate={{ x: [0, 70, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      </svg>
    )
  if (id === 'cidade')
    return (
      <svg viewBox="0 0 160 130" className="size-full" aria-hidden>
        <rect width="160" height="130" className="fill-slate-900" />
        <circle cx="128" cy="24" r="8" className="fill-slate-200" />
        {[[8, 60, 22], [34, 42, 26], [64, 70, 18], [86, 30, 28], [118, 54, 34]].map(([x, y, w], b) => (
          <g key={b}>
            <rect x={x} y={y} width={w} height={130 - y} className="fill-slate-700" />
            {Array.from({ length: Math.floor((120 - y) / 12) }, (_, r) =>
              Array.from({ length: Math.floor(w / 9) }, (_, c) => (
                <motion.rect
                  key={`${r}-${c}`}
                  x={x + 4 + c * 9}
                  y={y + 6 + r * 12}
                  width="4"
                  height="5"
                  className="fill-amber-300"
                  initial={{ opacity: (b + r + c) % 3 ? 0.9 : 0.15 }}
                  animate={{ opacity: (b * 7 + r * 3 + c) % 5 === 0 ? [0.9, 0.1, 0.9] : (b + r + c) % 3 ? 0.9 : 0.15 }}
                  transition={{ duration: 2 + ((b + c) % 3), repeat: Infinity }}
                />
              )),
            )}
          </g>
        ))}
      </svg>
    )
  return (
    <svg viewBox="0 0 160 130" className="size-full" aria-hidden>
      <rect width="160" height="130" className="fill-sky-200" />
      <motion.g animate={{ rotate: 360 }} style={{ transformOrigin: '40px 34px' }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <circle cx="40" cy="34" r="11" className="fill-yellow-300" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="40" y1="16" x2="40" y2="11" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45} 40 34)`} />
        ))}
      </motion.g>
      <path d="M0 80 Q 50 56 100 78 T 160 70 V 130 H 0 Z" className="fill-lime-500" />
      <path d="M0 100 Q 60 82 120 100 T 160 96 V 130 H 0 Z" className="fill-emerald-600" />
      <path d="M118 96 v -16 M112 84 l 6 -6 l 6 6" className="stroke-emerald-900" strokeWidth="2" fill="none" />
    </svg>
  )
}

export default function PhotoPolaroidStack() {
  const [order, setOrder] = useState<PhotoId[]>(PHOTOS.map((p) => p.id)) // último = topo
  const [lifting, setLifting] = useState(false)
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setLifting(true)
      setTimeout(() => {
        setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
        setTurn((t) => t + 1)
        setLifting(false)
      }, 650)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-[320px] w-[340px] items-center justify-center text-foreground">
      {order.map((id, z) => {
        const p = PHOTOS.find((ph) => ph.id === id)!
        const top = z === order.length - 1
        const spin = ((turn + z) % 2 ? 1 : -1) * 2
        return (
          <motion.div
            key={id}
            className="absolute w-[190px] rounded-sm bg-white p-2.5 pb-0 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            style={{ zIndex: z }}
            animate={top && lifting ? { x: 170, y: -24, rotate: 16, scale: 1.05 } : { x: p.dx, y: 0, rotate: p.rot + spin, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <div className="aspect-[160/130] overflow-hidden">
              <Scene id={id} />
            </div>
            <div className="py-2.5 text-center font-serif text-[13px] italic text-neutral-700">{p.caption}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
