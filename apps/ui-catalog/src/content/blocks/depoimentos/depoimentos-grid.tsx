'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const QUOTES = [
  { name: 'Ana Souza', role: 'Head de Vendas · Lumi', text: 'Tiramos 40% do tempo de resposta na primeira semana. O inbox unificado mudou a rotina do time.' },
  { name: 'Bruno Rocha', role: 'Fundador · Kavo', text: 'A IA qualifica de madrugada e de manhã já tenho a agenda cheia de reunião boa.' },
  { name: 'Carla Mendes', role: 'CS · Nuvem Fit', text: 'Relatório por origem me mostrou que o Instagram pagava a conta. Realocamos a verba no mesmo dia.' },
  { name: 'Diego Lima', role: 'Vendedor · Prisma', text: 'Fila justa, sem briga por lead. E o resumo da conversa no card é ouro.' },
  { name: 'Elisa Farias', role: 'Marketing · Doma', text: 'Montei a automação de carrinho abandonado sem chamar ninguém de tech.' },
  { name: 'Fábio Nunes', role: 'COO · Trilha', text: 'Migramos 3 ferramentas pra uma. Menos custo, menos aba, menos erro.' },
]

export default function DepoimentosGrid() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center gap-0.5 text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem usa, recomenda</h2>
          <p className="mt-3 text-muted-foreground">4,9 de 5 em 1.200+ avaliações.</p>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {QUOTES.map((q) => (
            <figure key={q.name} className="rounded-xl border bg-card p-5">
              <blockquote className="text-sm leading-relaxed">“{q.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>{q.name.split(' ').map((s) => s[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
