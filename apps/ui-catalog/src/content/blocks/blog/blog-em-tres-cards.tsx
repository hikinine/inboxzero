'use client'

import { ArrowRight, Clock } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const POSTS = [
  { cat: 'Atendimento', title: 'Como reduzir o tempo de resposta no WhatsApp em 70%', excerpt: 'Um roteiro prático de quatro semanas, com as automações que mais funcionaram nos times que acompanhamos em 2026.', author: 'Mariana Duarte', initials: 'MD', date: '8 out 2026', read: '6 min', tone: 'from-emerald-400 to-teal-600' },
  { cat: 'Jurídico', title: 'LGPD na prática: o que todo time de vendas precisa saber', excerpt: 'Consentimento, base legal e retenção explicados sem juridiquês, com exemplos de mensagens que você pode copiar.', author: 'Rafael Nogueira', initials: 'RN', date: '2 out 2026', read: '9 min', tone: 'from-violet-500 to-indigo-600' },
  { cat: 'Produto', title: 'Automação sem perder o toque humano', excerpt: 'Onde a IA entra, onde o atendente entra e como desenhar a passagem de bastão para o cliente nem perceber.', author: 'Beatriz Carvalho', initials: 'BC', date: '25 set 2026', read: '5 min', tone: 'from-amber-400 to-orange-500' },
]

export default function BlogEmTresCards() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Blog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Últimos artigos</h2>
            <p className="mt-3 text-muted-foreground">Aprendizados do nosso time e de quem atende milhares de conversas por dia.</p>
          </div>
          <Button variant="outline" className="w-fit">
            Ver todos <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-xl border bg-card">
              <a href="#" className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.tone}`}>
                <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                  <circle cx="320" cy="60" r="70" fill="currentColor" />
                  <rect x="-40" y="150" width="300" height="200" rx="40" fill="currentColor" transform="rotate(-12 110 250)" />
                </svg>
                <Badge className="absolute top-3 left-3 bg-background text-foreground">{p.cat}</Badge>
              </a>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug">
                  <a href="#" className="group-hover:underline">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-muted-foreground">
                  <Avatar size="sm">
                    <AvatarFallback>{p.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{p.author}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span className="ml-auto inline-flex items-center gap-1">
                    <Clock className="size-3" /> {p.read}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
