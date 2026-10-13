'use client'

import { Star } from 'lucide-react'
import { motion } from 'motion/react'

// "Review Wall Marquee": parede de avaliações em perspectiva (rotateX + rotateZ). Três colunas de cards rolam na
// vertical em sentidos alternados; cada card mostra a fonte (Google, App Store, Reclame Aqui…) com cor própria,
// nota em estrelas, trecho e autor. Um selo de média fica fixo por cima, com desfoque de fundo.
type Review = { source: string; dot: string; stars: number; text: string; author: string }

const REVIEWS: Review[] = [
  { source: 'Google', dot: 'bg-sky-500', stars: 5, text: 'Entrega no mesmo dia em Curitiba. Impecável!', author: 'Renata · Curitiba' },
  { source: 'App Store', dot: 'bg-indigo-500', stars: 5, text: 'O app é rápido e o Pix cai na hora.', author: 'Felipe · Recife' },
  { source: 'Reclame Aqui', dot: 'bg-emerald-500', stars: 4, text: 'Tive um problema e resolveram em 2 horas.', author: 'Cláudia · Goiânia' },
  { source: 'Play Store', dot: 'bg-lime-500', stars: 5, text: 'Melhor controle de estoque que já usei.', author: 'Marcos · Belém' },
  { source: 'Trustpilot', dot: 'bg-teal-500', stars: 5, text: 'Suporte humano de verdade, sem robô chato.', author: 'Aline · Natal' },
  { source: 'Google', dot: 'bg-sky-500', stars: 4, text: 'Preço justo e nota fiscal certinha.', author: 'Henrique · Campinas' },
  { source: 'App Store', dot: 'bg-indigo-500', stars: 5, text: 'Os relatórios mudaram nossa reunião de segunda.', author: 'Paula · Salvador' },
  { source: 'Reclame Aqui', dot: 'bg-emerald-500', stars: 5, text: 'Reembolso feito antes do prazo prometido.', author: 'Igor · Manaus' },
  { source: 'Play Store', dot: 'bg-lime-500', stars: 5, text: 'Uso no celular o dia inteiro, nunca travou.', author: 'Sabrina · Floripa' },
]

function Card({ r }: { r: Review }) {
  return (
    <div className="w-[150px] rounded-xl border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[9px] font-medium text-muted-foreground">
          <span className={`size-1.5 rounded-full ${r.dot}`} />
          {r.source}
        </span>
        <span className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`size-2.5 ${i < r.stars ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
          ))}
        </span>
      </div>
      <p className="mt-1.5 text-[11px] leading-snug">{r.text}</p>
      <p className="mt-1.5 text-[9px] text-muted-foreground">{r.author}</p>
    </div>
  )
}

function Column({ offset, reverse, duration }: { offset: number; reverse?: boolean; duration: number }) {
  const list = [...REVIEWS.slice(offset), ...REVIEWS.slice(0, offset)]
  return (
    <div className="overflow-hidden">
      <motion.div className="flex flex-col gap-2.5" animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {[...list, ...list].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </motion.div>
    </div>
  )
}

export default function ReviewWallMarquee() {
  return (
    <div className="relative h-[340px] w-[460px] overflow-hidden text-foreground [perspective:800px]">
      <div className="absolute -inset-x-6 -top-24 flex h-[560px] justify-center gap-2.5 [transform:rotateX(28deg)_rotateZ(-10deg)] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_80%,transparent)]">
        <Column offset={0} duration={26} />
        <Column offset={3} reverse duration={32} />
        <Column offset={6} duration={22} />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-background/80 px-5 py-3 text-center shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-center gap-1.5 text-3xl font-semibold tracking-tight">
          4,8 <Star className="size-6 fill-amber-400 text-amber-400" />
        </div>
        <div className="text-[10px] text-muted-foreground">12.430 avaliações · 5 plataformas</div>
      </div>
    </div>
  )
}
