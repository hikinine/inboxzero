'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Dribbble, Facebook, Github, Heart, Instagram, Linkedin, Twitch, Twitter, Youtube } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Social Networks Orbit": o perfil da marca no centro e as redes sociais em dois anéis contra-rotativos. A cada
// 1,1s uma rede "notifica": um balão com o engajamento (+curtidas, +seguidores) sobe do ícone e o contador de
// seguidores no centro avança. Ícones e balões contra-giram para ficarem sempre em pé.
const SIZE = 380
const C = SIZE / 2
type Net = { name: string; Icon: LucideIcon; tone: string; bg: string; gain: string; add: number }
const INNER: ReadonlyArray<Net> = [
  { name: 'Instagram', Icon: Instagram, tone: 'text-rose-500', bg: 'bg-rose-500/10', gain: '+48', add: 48 },
  { name: 'YouTube', Icon: Youtube, tone: 'text-red-500', bg: 'bg-red-500/10', gain: '+12', add: 12 },
  { name: 'LinkedIn', Icon: Linkedin, tone: 'text-sky-600', bg: 'bg-sky-600/10', gain: '+9', add: 9 },
]
const OUTER: ReadonlyArray<Net> = [
  { name: 'Facebook', Icon: Facebook, tone: 'text-blue-600', bg: 'bg-blue-600/10', gain: '+21', add: 21 },
  { name: 'X', Icon: Twitter, tone: 'text-foreground', bg: 'bg-muted', gain: '+33', add: 33 },
  { name: 'GitHub', Icon: Github, tone: 'text-foreground', bg: 'bg-muted', gain: '+5', add: 5 },
  { name: 'Twitch', Icon: Twitch, tone: 'text-violet-500', bg: 'bg-violet-500/10', gain: '+17', add: 17 },
  { name: 'Dribbble', Icon: Dribbble, tone: 'text-pink-500', bg: 'bg-pink-500/10', gain: '+8', add: 8 },
]
const ALL = [...INNER, ...OUTER]

function Ring({ nets, radius, duration, reverse, offset, ping, tick }: { nets: ReadonlyArray<Net>; radius: number; duration: number; reverse?: boolean; offset: number; ping: number; tick: number }) {
  const dir = reverse ? -360 : 360
  return (
    <motion.div className="absolute inset-0" animate={{ rotate: dir }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      <div className="absolute rounded-full border border-border" style={{ inset: C - radius }} />
      {nets.map((n, i) => {
        const a = (i / nets.length) * Math.PI * 2 + offset
        const x = C + Math.cos(a) * radius
        const y = C + Math.sin(a) * radius
        return (
          <motion.div
            key={n.name}
            className="absolute"
            style={{ left: x - 22, top: y - 22 }}
            animate={{ rotate: -dir }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <span className={`flex size-11 items-center justify-center rounded-full border bg-card shadow-sm`}>
              <span className={`flex size-9 items-center justify-center rounded-full ${n.bg}`}>
                <n.Icon className={`size-[18px] ${n.tone}`} />
              </span>
            </span>
            <AnimatePresence>
              {ALL[ping] === n && (
                <motion.span
                  key={tick}
                  className="absolute -top-7 left-1/2 flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-semibold text-background shadow"
                  initial={{ y: 8, opacity: 0, scale: 0.6 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <Heart className="size-2.5 fill-current" />
                  {n.gain}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function SocialNetworksOrbit() {
  const [tick, setTick] = useState(0)
  const [followers, setFollowers] = useState(48210)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 1
      setTick(t)
      setFollowers((f) => f + ALL[(t * 3) % ALL.length].add)
    }, 1100)
    return () => clearInterval(id)
  }, [])

  const ping = (tick * 3) % ALL.length

  return (
    <div className="relative text-foreground" style={{ width: SIZE, height: SIZE }}>
      <div className="absolute rounded-full bg-gradient-to-br from-rose-500/10 via-violet-500/10 to-sky-500/10 blur-2xl" style={{ inset: C - 120 }} />
      <Ring nets={INNER} radius={92} duration={22} offset={0.3} ping={ping} tick={tick} />
      <Ring nets={OUTER} radius={162} duration={36} reverse offset={0} ping={ping} tick={tick} />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-violet-500 to-amber-400 p-[3px]">
          <span className="flex size-full items-center justify-center rounded-full bg-card text-base font-semibold">LA</span>
        </span>
        <span className="mt-1.5 text-xs font-medium">@lojaaurora</span>
        <motion.span key={followers} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-[10px] tabular-nums text-muted-foreground">
          {followers.toLocaleString('pt-BR')} seguidores
        </motion.span>
      </div>
    </div>
  )
}
