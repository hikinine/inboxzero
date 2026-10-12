'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Depoimento {
  nome: string
  cargo: string
  empresa: string
  texto: string
  nota: number
}

const LINHA_A: Depoimento[] = [
  { nome: 'Ana Souza', cargo: 'Head de Vendas', empresa: 'Lumi', nota: 5, texto: 'Tiramos 40% do tempo de resposta na primeira semana. O inbox unificado mudou a rotina do time inteiro.' },
  { nome: 'Bruno Rocha', cargo: 'Fundador', empresa: 'Kavo', nota: 5, texto: 'A IA qualifica de madrugada e, de manhã, a agenda já está cheia de reunião boa.' },
  { nome: 'Carla Mendes', cargo: 'Customer Success', empresa: 'Nuvem Fit', nota: 5, texto: 'O relatório por origem mostrou que o Instagram pagava a conta. Realocamos a verba no mesmo dia.' },
  { nome: 'Diego Lima', cargo: 'Vendedor', empresa: 'Prisma', nota: 4, texto: 'Fila justa, sem briga por lead. E o resumo da conversa no card do cliente é ouro puro.' },
]

const LINHA_B: Depoimento[] = [
  { nome: 'Elisa Farias', cargo: 'Marketing', empresa: 'Doma', nota: 5, texto: 'Montei a automação de carrinho abandonado sozinha, sem chamar ninguém de tecnologia.' },
  { nome: 'Fábio Nunes', cargo: 'COO', empresa: 'Trilha', nota: 5, texto: 'Migramos três ferramentas para uma. Menos custo, menos aba aberta e menos erro de digitação.' },
  { nome: 'Gabriela Horta', cargo: 'Gerente de Loja', empresa: 'Araucária', nota: 5, texto: 'O cliente recebe o status do pedido no WhatsApp e parou de ligar perguntando. Atendimento caiu pela metade.' },
  { nome: 'Henrique Sá', cargo: 'Diretor', empresa: 'Clínica Vida', nota: 4, texto: 'Confirmação automática de consulta reduziu as faltas em 62%. Pagou o ano inteiro no primeiro mês.' },
]

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

function Cartao({ d }: { d: Depoimento }) {
  return (
    <figure className="w-[320px] shrink-0 rounded-2xl border bg-card p-5">
      <div className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`size-3.5 ${i < d.nota ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'}`} />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed">“{d.texto}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>{iniciais(d.nome)}</AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <div className="font-medium">{d.nome}</div>
          <div className="text-muted-foreground">
            {d.cargo} · {d.empresa}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

function Faixa({ itens, inverso = false, duracao = 42 }: { itens: Depoimento[]; inverso?: boolean; duracao?: number }) {
  const cartoes = [...itens, ...itens]
  const mascara = 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
  return (
    <div className="overflow-hidden" style={{ maskImage: mascara, WebkitMaskImage: mascara }}>
      <motion.div className="flex w-max gap-4 pr-4" animate={{ x: inverso ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}>
        {cartoes.map((d, i) => (
          <Cartao key={`${d.nome}-${i}`} d={d} />
        ))}
      </motion.div>
    </div>
  )
}

export default function DepoimentosEmMarquee() {
  return (
    <section className="w-full overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Depoimentos</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">2.300 equipes já contaram como foi</h2>
        <p className="mt-3 flex items-center justify-center gap-2 text-muted-foreground">
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
            ))}
          </span>
          <span className="font-medium text-foreground">4,9 de 5</span> na média das avaliações
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Faixa itens={LINHA_A} />
        <Faixa itens={LINHA_B} inverso duracao={50} />
      </div>
    </section>
  )
}
