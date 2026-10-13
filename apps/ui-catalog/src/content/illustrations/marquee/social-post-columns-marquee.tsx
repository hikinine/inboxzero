'use client'

import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { motion } from 'motion/react'

// "Social Post Columns Marquee": três colunas de posts de rede social (avatar, nome, @usuário, texto com a menção
// à marca destacada e contadores) subindo em velocidades diferentes, todas no mesmo sentido, com alturas variadas
// que formam um mosaico; fade em cima e embaixo e um leve brilho na coluna do meio.
type Post = { ini: string; name: string; user: string; grad: string; text: string; likes: string; replies: number; rt: number }
const POSTS: ReadonlyArray<Post> = [
  { ini: 'BF', name: 'Bruna Faria', user: '@brunaf', grad: 'from-pink-500 to-rose-500', text: 'Migrei a loja pro @aurora em uma tarde. O checkout com Pix converte muito melhor.', likes: '1,2 mil', replies: 48, rt: 96 },
  { ini: 'GT', name: 'Gustavo Torres', user: '@gtorres', grad: 'from-sky-500 to-blue-600', text: 'O suporte do @aurora respondeu em 3 minutos num domingo. Sério.', likes: '842', replies: 21, rt: 40 },
  { ini: 'IM', name: 'Isabela Melo', user: '@isamelo', grad: 'from-amber-400 to-orange-500', text: 'Automação de carrinho abandonado do @aurora já recuperou R$ 18 mil esse mês 🤯', likes: '2,4 mil', replies: 112, rt: 310 },
  { ini: 'PR', name: 'Pedro Rezende', user: '@pedrorez', grad: 'from-emerald-500 to-teal-600', text: 'Relatórios lindos e simples. Valeu, @aurora!', likes: '356', replies: 9, rt: 14 },
  { ini: 'LV', name: 'Larissa Vieira', user: '@lari.v', grad: 'from-violet-500 to-indigo-600', text: 'Finalmente um CRM que minha equipe de vendas usa de verdade. @aurora no topo.', likes: '978', replies: 33, rt: 52 },
  { ini: 'RN', name: 'Rodrigo Nunes', user: '@rnunes', grad: 'from-cyan-500 to-sky-600', text: 'Integração com WhatsApp do @aurora mudou nosso pós-venda. Recomendo demais pra quem vende online.', likes: '1,6 mil', replies: 64, rt: 120 },
]
const COLS = [
  { start: 0, dur: 30 },
  { start: 2, dur: 38 },
  { start: 4, dur: 26 },
] as const

function Text({ text }: { text: string }) {
  const parts = text.split(/(@aurora)/)
  return (
    <p className="text-[11px] leading-snug">
      {parts.map((p, i) => (p === '@aurora' ? <span key={i} className="font-medium text-primary">{p}</span> : <span key={i}>{p}</span>))}
    </p>
  )
}

function Card({ p }: { p: Post }) {
  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ${p.grad}`}>{p.ini}</span>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[11px] font-semibold">{p.name}</div>
          <div className="truncate text-[10px] text-muted-foreground">{p.user}</div>
        </div>
      </div>
      <div className="mt-2">
        <Text text={p.text} />
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3" /> {p.replies}
        </span>
        <span className="flex items-center gap-1">
          <Repeat2 className="size-3" /> {p.rt}
        </span>
        <span className="flex items-center gap-1 text-rose-500">
          <Heart className="size-3 fill-current" /> {p.likes}
        </span>
      </div>
    </div>
  )
}

export default function SocialPostColumnsMarquee() {
  return (
    <div
      className="relative grid h-[400px] w-[480px] grid-cols-3 gap-3 overflow-hidden px-1 text-foreground"
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/3 right-1/3 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      {COLS.map((c, ci) => {
        const list = [...POSTS.slice(c.start), ...POSTS.slice(0, c.start)]
        return (
          <div key={ci} className="overflow-hidden">
            <motion.div className={`flex flex-col ${ci === 1 ? '-mt-16' : ''}`} animate={{ y: ['0%', '-50%'] }} transition={{ duration: c.dur, repeat: Infinity, ease: 'linear' }}>
              {[...list, ...list].map((p, i) => (
                <div key={i} className="pb-3">
                  <Card p={p} />
                </div>
              ))}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
