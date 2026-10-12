'use client'

import { motion } from 'motion/react'
import { ArrowRight, CircleCheck, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const FLUTUANTES = [
  { ini: 'AS', cor: 'from-sky-400 to-violet-500', left: '5%', top: '16%', duracao: 5 },
  { ini: 'BR', cor: 'from-amber-400 to-rose-500', left: '13%', top: '60%', duracao: 6 },
  { ini: 'CM', cor: 'from-emerald-400 to-teal-500', left: '22%', top: '32%', duracao: 4.5 },
  { ini: 'DL', cor: 'from-fuchsia-400 to-pink-500', left: '8%', top: '84%', duracao: 5.5 },
  { ini: 'EF', cor: 'from-orange-400 to-amber-500', left: '90%', top: '18%', duracao: 6 },
  { ini: 'GH', cor: 'from-indigo-400 to-sky-500', left: '82%', top: '56%', duracao: 4.8 },
  { ini: 'JP', cor: 'from-lime-400 to-emerald-500', left: '73%', top: '30%', duracao: 5.2 },
  { ini: 'LM', cor: 'from-rose-400 to-red-500', left: '88%', top: '82%', duracao: 5.8 },
]

const GARANTIAS = ['Sem cartão de crédito', 'Cancele quando quiser', 'Suporte humano em português']

export default function CtaComAvataresEProvaSocial() {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        {FLUTUANTES.map((a) => (
          <motion.span
            key={a.ini}
            className={`absolute flex size-14 items-center justify-center rounded-full bg-gradient-to-br ${a.cor} text-sm font-medium text-white shadow-lg ring-4 ring-background`}
            style={{ left: a.left, top: a.top }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: a.duracao, repeat: Infinity, ease: 'easeInOut' }}
          >
            {a.ini}
          </motion.span>
        ))}
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {['MC', 'JP', 'RA', 'TS', 'VN'].map((n) => (
              <Avatar key={n}>
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+12k</AvatarGroupCount>
          </AvatarGroup>
          <Badge variant="secondary">+340 lojas esta semana</Badge>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
            ))}
          </span>
          <span className="font-medium">4,9</span>
          <span className="text-muted-foreground">em 2.300 avaliações</span>
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Junte-se a 12 mil lojistas que vendem mais com menos esforço</h2>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">Importe seus produtos, conecte o WhatsApp e faça a primeira venda ainda hoje. A gente ajuda em cada passo.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Criar minha loja grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            Ver uma loja de exemplo
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {GARANTIAS.map((g) => (
            <li key={g} className="flex items-center gap-1.5">
              <CircleCheck className="size-4 text-emerald-500" /> {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
