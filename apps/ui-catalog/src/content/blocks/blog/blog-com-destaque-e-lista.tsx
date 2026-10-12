'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const FEATURED = {
  cat: 'Relatório',
  title: 'O estado do atendimento digital no Brasil em 2026',
  excerpt: 'Analisamos 38 milhões de conversas de 2.400 empresas para entender horários de pico, canais que mais convertem e o impacto real da IA no tempo de resposta. Os dados surpreenderam até a gente.',
  author: 'Mariana Duarte',
  initials: 'MD',
  date: '10 out 2026',
  read: '14 min',
}

const LIST = [
  { cat: 'Atendimento', title: 'Como reduzir o tempo de resposta no WhatsApp em 70%', date: '8 out', read: '6 min', tone: 'from-emerald-400 to-teal-600' },
  { cat: 'Jurídico', title: 'LGPD na prática: o que todo time de vendas precisa saber', date: '2 out', read: '9 min', tone: 'from-violet-500 to-indigo-600' },
  { cat: 'Produto', title: 'Automação sem perder o toque humano', date: '25 set', read: '5 min', tone: 'from-amber-400 to-orange-500' },
  { cat: 'Vendas', title: 'Script de qualificação que nosso time usa (e por quê)', date: '18 set', read: '7 min', tone: 'from-rose-400 to-pink-600' },
]

export default function BlogComDestaqueELista() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Blog</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Leituras da semana</h2>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <article className="group">
            <a href="#" className="relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-600">
              <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <rect key={i} x={60 + i * 68} y={300 - (i * 37 + (i % 3) * 20)} width="36" height="400" rx="8" fill="currentColor" />
                ))}
              </svg>
              <Badge className="absolute top-4 left-4 bg-background text-foreground">
                <Sparkles data-icon="inline-start" /> Em destaque
              </Badge>
            </a>
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{FEATURED.cat}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                <a href="#" className="group-hover:underline">
                  {FEATURED.title}
                </a>
              </h3>
              <p className="mt-3 text-muted-foreground">{FEATURED.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                <Avatar>
                  <AvatarFallback>{FEATURED.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{FEATURED.author}</span>
                <span>·</span>
                <span>{FEATURED.date}</span>
                <span>·</span>
                <span>{FEATURED.read} de leitura</span>
              </div>
            </div>
          </article>
          <div className="flex flex-col">
            <ul className="divide-y">
              {LIST.map((p) => (
                <li key={p.title}>
                  <a href="#" className="group flex gap-4 py-4 first:pt-0">
                    <span className={`relative size-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${p.tone}`}>
                      <span className="absolute -right-3 -bottom-3 size-12 rounded-full bg-white/30" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.cat}</span>
                      <span className="mt-1 block font-medium leading-snug group-hover:underline">{p.title}</span>
                      <span className="mt-1.5 block text-xs text-muted-foreground">
                        {p.date} · {p.read}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-6 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-medium hover:underline">
              Todos os artigos <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
