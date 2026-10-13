'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Album Cover Stack": capas de disco empilhadas em diagonal. Da capa da frente o vinil desliza para fora e gira,
// o equalizador pulsa e a barra da faixa avança; ao fim da faixa a capa cai para fora e a próxima assume.
type Art = 'sun' | 'waves' | 'grid' | 'rings'
interface Album {
  title: string
  artist: string
  track: string
  gradient: string
  label: string
  art: Art
}

const ALBUMS: readonly Album[] = [
  { title: 'Maré Alta', artist: 'Lagoa Azul', track: 'Areia no pé', gradient: 'from-orange-400 via-rose-500 to-fuchsia-600', label: 'fill-rose-500', art: 'sun' },
  { title: 'Concreto', artist: 'Bairro Norte', track: 'Linha 4', gradient: 'from-slate-500 via-slate-700 to-zinc-900', label: 'fill-slate-500', art: 'grid' },
  { title: 'Sertão Neon', artist: 'Trio Mandacaru', track: 'Forró elétrico', gradient: 'from-lime-400 via-emerald-500 to-teal-700', label: 'fill-emerald-500', art: 'rings' },
  { title: 'Madrugada', artist: 'Duda Reis', track: 'Céu de Santos', gradient: 'from-sky-400 via-indigo-500 to-violet-700', label: 'fill-indigo-500', art: 'waves' },
]
const CYCLE = 4200

function Cover({ art }: { art: Art }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
      {art === 'sun' && (
        <g fill="white">
          <circle cx="50" cy="58" r="24" fillOpacity="0.85" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="0" y={62 + i * 7} width="100" height={2 + i} fill="currentColor" className="text-rose-500" />
          ))}
        </g>
      )}
      {art === 'grid' && (
        <g stroke="white" strokeOpacity="0.5" strokeWidth="0.8">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" x2="100" y1={10 + i * 10} y2={10 + i * 10} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} y1="0" y2="100" x1={10 + i * 10} x2={10 + i * 10} />
          ))}
          <rect x="30" y="30" width="30" height="40" fill="white" fillOpacity="0.9" stroke="none" />
        </g>
      )}
      {art === 'rings' && (
        <g fill="none" stroke="white" strokeWidth="3">
          {[10, 20, 30, 40].map((r, i) => (
            <circle key={r} cx="50" cy="50" r={r} strokeOpacity={0.9 - i * 0.18} />
          ))}
        </g>
      )}
      {art === 'waves' && (
        <g fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M -5 ${40 + i * 10} Q 20 ${30 + i * 10} 45 ${40 + i * 10} T 105 ${40 + i * 10}`} strokeOpacity={0.9 - i * 0.15} />
          ))}
          <circle cx="74" cy="22" r="8" fill="white" stroke="none" />
        </g>
      )}
    </svg>
  )
}

export default function AlbumCoverStack() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => (h + 1) % ALBUMS.length), CYCLE)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((d) => ALBUMS[(head + d) % ALBUMS.length]!)
  const cur = visible[0]!

  return (
    <div className="relative h-[320px] w-[440px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((a, depth) => {
          const front = depth === 0
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: -3 * 20, y: -3 * 16, scale: 0.85 }}
              animate={{ opacity: 1 - depth * 0.22, x: -depth * 20, y: -depth * 16, scale: 1 - depth * 0.05, zIndex: 10 - depth, rotate: 0 }}
              exit={{ opacity: 0, y: 140, rotate: -10, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              className="absolute left-[96px] top-[62px] size-[168px]"
            >
              {/* vinil saindo da capa */}
              {front && (
                <motion.div
                  className="absolute left-[6px] top-[6px] size-[156px]"
                  initial={{ x: 0 }}
                  animate={{ x: 92 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.45 }}
                >
                  <motion.svg viewBox="0 0 100 100" className="size-full drop-shadow-md" animate={{ rotate: 360 }} transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }} aria-hidden>
                    <circle cx="50" cy="50" r="50" className="fill-zinc-900" />
                    {[44, 38, 32, 26].map((r) => (
                      <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" />
                    ))}
                    <path d="M 50 8 A 42 42 0 0 1 86 30" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="17" className={a.label} />
                    <circle cx="50" cy="50" r="2.5" className="fill-zinc-900" />
                  </motion.svg>
                </motion.div>
              )}
              <div className={cn('absolute inset-0 overflow-hidden rounded-md bg-gradient-to-br shadow-xl ring-1 ring-black/10', a.gradient)}>
                <Cover art={a.art} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2.5 text-white">
                  <p className="text-sm font-bold leading-tight">{a.title}</p>
                  <p className="text-[10px] opacity-80">{a.artist}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* tocando agora */}
      <div className="absolute inset-x-[60px] bottom-4 rounded-xl border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex h-4 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-sm bg-primary"
                style={{ height: 16, transformOrigin: '50% 100%' }}
                animate={{ scaleY: [0.3, 1, 0.5, 0.85, 0.3] }}
                transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              />
            ))}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={cur.track} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="min-w-0 flex-1 truncate text-xs">
              <span className="font-semibold">{cur.track}</span>
              <span className="text-muted-foreground"> · {cur.artist}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
          <motion.div key={head} className="h-full rounded-full bg-foreground" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: CYCLE / 1000, ease: 'linear' }} />
        </div>
      </div>
    </div>
  )
}
