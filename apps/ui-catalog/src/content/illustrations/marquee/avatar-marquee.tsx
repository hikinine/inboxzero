'use client'

import { motion } from 'motion/react'

// "Avatar Marquee": faixa de pessoas (avatar com iniciais em degradê, nome e área) em zigue-zague, rolando para a
// esquerda; abaixo, uma fila de avatares pequenos rola para a direita. Bordas esmaecidas por mask-image.
const PEOPLE = [
  { name: 'Ana Souza', role: 'Growth', tone: 'from-violet-500 to-fuchsia-500', online: true },
  { name: 'Bruno Rocha', role: 'Vendas', tone: 'from-sky-500 to-cyan-500', online: false },
  { name: 'Camila Mendes', role: 'Design', tone: 'from-rose-500 to-orange-500', online: true },
  { name: 'Diego Lima', role: 'Suporte', tone: 'from-emerald-500 to-teal-500', online: false },
  { name: 'Elisa Prado', role: 'Marketing', tone: 'from-amber-500 to-rose-500', online: false },
  { name: 'Felipe Nunes', role: 'Produto', tone: 'from-indigo-500 to-violet-500', online: true },
  { name: 'Gabriela Teles', role: 'Financeiro', tone: 'from-teal-500 to-sky-500', online: false },
  { name: 'Heitor Alves', role: 'Sucesso do cliente', tone: 'from-fuchsia-500 to-pink-500', online: true },
  { name: 'Isabela Reis', role: 'Dados', tone: 'from-lime-500 to-emerald-600', online: false },
  { name: 'João Cabral', role: 'Engenharia', tone: 'from-orange-500 to-amber-500', online: true },
] as const

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function AvatarMarquee() {
  const cells = [...PEOPLE, ...PEOPLE]
  const small = [...PEOPLE.slice(5), ...PEOPLE.slice(0, 5)]
  const smallCells = [...small, ...small]
  return (
    <div className="w-[480px] overflow-hidden py-2 text-foreground [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="mb-3 flex items-center justify-between px-6 text-[11px] text-muted-foreground">
        <span className="font-medium uppercase tracking-wider">Time Clickmax</span>
        <span>24 pessoas · 6 online</span>
      </div>

      <motion.div className="flex w-max items-start gap-4" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {cells.map((p, i) => (
          <div key={`${p.name}-${i}`} className={`flex w-[84px] flex-col items-center ${i % 2 === 1 ? 'mt-7' : ''}`}>
            <div className="relative">
              <div className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-md ring-2 ring-background ${p.tone}`}>{initials(p.name)}</div>
              {p.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-background" />}
            </div>
            <span className="mt-2 whitespace-nowrap text-[11px] font-medium">{p.name}</span>
            <span className="whitespace-nowrap text-[10px] text-muted-foreground">{p.role}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="mt-5 flex w-max gap-2.5" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        {smallCells.map((p, i) => (
          <div key={`${p.name}-s-${i}`} className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-2 ring-background ${p.tone}`}>
            {initials(p.name)}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
