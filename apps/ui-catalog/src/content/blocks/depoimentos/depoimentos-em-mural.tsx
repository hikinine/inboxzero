'use client'

import { BadgeCheck, Heart, MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const POSTS = [
  { nome: 'Ana Souza', handle: '@anasouza', verificado: true, texto: 'Primeira semana com a Rotina: 40% menos tempo de resposta. O time nem acredita.', data: '12 de mar.', curtidas: 128, respostas: 9 },
  {
    nome: 'Bruno Rocha',
    handle: '@brunorocha',
    verificado: false,
    texto: 'Dica pra quem vende no Instagram: liga a qualificação automática e dorme tranquilo. Acordei com 6 reuniões marcadas e nenhuma delas era curioso.',
    data: '3 de abr.',
    curtidas: 412,
    respostas: 31,
  },
  { nome: 'Carla Mendes', handle: '@carlamendes', verificado: true, texto: 'O relatório por origem me mostrou que o Instagram pagava a conta. Realocamos a verba no mesmo dia.', data: '18 de abr.', curtidas: 96, respostas: 4 },
  {
    nome: 'Diego Lima',
    handle: '@diegolima.vendas',
    verificado: false,
    texto: 'Fila justa, sem briga por lead. Quem é vendedor sabe o quanto isso vale. E o resumo da conversa no card é ouro.',
    data: '2 de mai.',
    curtidas: 254,
    respostas: 17,
  },
  { nome: 'Elisa Farias', handle: '@elisafarias', verificado: false, texto: 'Montei a automação de carrinho abandonado sem chamar ninguém de tech. 11 minutos.', data: '9 de mai.', curtidas: 73, respostas: 6 },
  {
    nome: 'Fábio Nunes',
    handle: '@fabionunes',
    verificado: true,
    texto: 'Migramos 3 ferramentas pra 1. Menos custo, menos aba, menos erro. O financeiro agradeceu antes do comercial.',
    data: '21 de mai.',
    curtidas: 188,
    respostas: 12,
  },
  { nome: 'Gabriela Reis', handle: '@gabireis', verificado: false, texto: 'Suporte respondeu em 4 minutos. Num sábado. Às 22h.', data: '30 de mai.', curtidas: 341, respostas: 28 },
  {
    nome: 'Henrique Sá',
    handle: '@drhenriquesa',
    verificado: true,
    texto: 'Consultório com agenda cheia e zero no-show no mês. A confirmação automática pelo WhatsApp pagou a assinatura do ano em uma semana.',
    data: '6 de jun.',
    curtidas: 219,
    respostas: 15,
  },
  { nome: 'Isabela Moraes', handle: '@isamoraes', verificado: false, texto: 'A integração com o Google Agenda simplesmente funciona. Sem gambiarra.', data: '14 de jun.', curtidas: 58, respostas: 3 },
]

export default function DepoimentosEmMural() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">#RotinaNaPrática</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Quem usa, posta</h2>
          <p className="mt-3 text-muted-foreground">Sem roteiro, sem filtro. O que nossos clientes publicam sobre a rotina deles depois da Rotina.</p>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {POSTS.map((p) => (
            <article key={p.handle} className="rounded-xl border bg-card p-4">
              <header className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{p.nome.split(' ').map((s) => s[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="truncate">{p.nome}</span>
                    {p.verificado && <BadgeCheck className="size-4 shrink-0 fill-sky-500 text-background" />}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{p.handle}</div>
                </div>
              </header>
              <p className="mt-3 text-sm leading-relaxed">{p.texto}</p>
              <footer className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{p.data}</span>
                <span className="flex items-center gap-1">
                  <Heart className="size-3.5" /> {p.curtidas}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3.5" /> {p.respostas}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
