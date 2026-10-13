'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

// "Avatar Wall Marquee": parede inclinada de avatares (iniciais em degradê) em cinco fileiras que rolam em sentidos
// alternados; alguns têm o ponto verde de "online" pulsando. Por cima, um card de convite com desfoque de fundo,
// pilha de rostos e o número da comunidade — a parede continua passando por trás.
const NAMES = [
  'Ana Souza', 'Bruno Lima', 'Carla Dias', 'Diego Melo', 'Elisa Prado', 'Fábio Nunes', 'Gabi Rocha', 'Heitor Alves', 'Iara Costa', 'João Pedro',
  'Karen Lopes', 'Lucas Kenji', 'Marina Reis', 'Nina Torres', 'Otávio Sá', 'Paula Vieira', 'Rafael Brito', 'Sofia Mendes', 'Tiago Freitas', 'Vitória Paz',
] as const
const GRADS = [
  'from-pink-500 to-rose-500',
  'from-sky-500 to-blue-600',
  'from-amber-400 to-orange-500',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-indigo-600',
  'from-cyan-500 to-sky-600',
  'from-fuchsia-500 to-pink-600',
] as const
const ini = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('')
const ROWS = 5
const PER = 10

export default function AvatarWallMarquee() {
  return (
    <div className="relative h-[330px] w-[460px] overflow-hidden text-foreground" style={{ maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 55%, transparent 100%)' }}>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-12 flex-col gap-3">
        {Array.from({ length: ROWS }).map((_, r) => {
          const people = Array.from({ length: PER }, (_, k) => NAMES[(r * 7 + k * 3) % NAMES.length])
          const reverse = r % 2 === 1
          return (
            <motion.div
              key={r}
              className="flex w-max"
              animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
              transition={{ duration: 26 + r * 4, repeat: Infinity, ease: 'linear' }}
            >
              {[...people, ...people].map((n, i) => {
                const online = (r + i) % 4 === 0
                return (
                  <span key={i} className="pr-3">
                    <span className={`relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ring-2 ring-background ${GRADS[(r * 3 + i) % GRADS.length]}`}>
                      {ini(n)}
                      {online && (
                        <span className="absolute bottom-0.5 right-0.5 flex size-3.5 items-center justify-center rounded-full bg-background">
                          <motion.span className="size-2.5 rounded-full bg-emerald-500" animate={{ scale: [1, 0.7, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: (i % 5) * 0.3 }} />
                        </span>
                      )}
                    </span>
                  </span>
                )
              })}
            </motion.div>
          )
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card/85 p-4 text-center shadow-2xl backdrop-blur-md">
        <div className="flex justify-center -space-x-2">
          {NAMES.slice(0, 5).map((n, i) => (
            <span key={n} className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-2 ring-card ${GRADS[i]}`}>
              {ini(n)}
            </span>
          ))}
        </div>
        <div className="mt-2 text-base font-semibold tracking-tight">Junte-se a 12.480 criadores</div>
        <div className="text-[11px] text-muted-foreground">que vendem cursos e produtos com a Aurora</div>
        <span className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
          Criar minha conta <ArrowRight className="size-3.5" />
        </span>
      </div>
    </div>
  )
}
