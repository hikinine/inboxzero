'use client'

import { ArrowRight, Linkedin, MapPin, Quote, Twitter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const FUNDADORA = {
  nome: 'Mariana Duarte',
  cargo: 'Fundadora e CEO',
  iniciais: 'MD',
  frase: 'A gente não constrói software para atendentes. Constrói para a pessoa que está esperando resposta do outro lado.',
  bio: 'Antes de fundar a empresa em 2019, Mariana liderou por dez anos a operação de atendimento de uma rede varejista com 400 lojas. Engenheira de Produção pela USP, é conselheira do Instituto Atende Bem e mentora de 14 fundadoras no programa Elas Lideram.',
  cidade: 'São Paulo, SP',
}

const TIME = [
  { nome: 'Rafael Nogueira', cargo: 'CTO', iniciais: 'RN', tone: 'from-sky-500 to-cyan-400', cidade: 'Florianópolis' },
  { nome: 'Beatriz Carvalho', cargo: 'Head de Produto', iniciais: 'BC', tone: 'from-emerald-500 to-lime-400', cidade: 'São Paulo' },
  { nome: 'Diego Albuquerque', cargo: 'Head de Vendas', iniciais: 'DA', tone: 'from-amber-500 to-orange-500', cidade: 'Recife' },
  { nome: 'Larissa Pinto', cargo: 'Head de Design', iniciais: 'LP', tone: 'from-rose-500 to-pink-400', cidade: 'Curitiba' },
  { nome: 'Gustavo Henrique', cargo: 'Head de IA', iniciais: 'GH', tone: 'from-indigo-500 to-blue-400', cidade: 'Belo Horizonte' },
  { nome: 'Camila Ferreira', cargo: 'Head de Sucesso do Cliente', iniciais: 'CF', tone: 'from-teal-500 to-emerald-400', cidade: 'Porto Alegre' },
]

export default function EquipeComFundadorEmDestaque() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Liderança</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem está no comando</h2>
          </div>
          <Button variant="outline" className="w-fit">
            Ver as 140 pessoas <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border bg-card md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-64 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25" aria-hidden="true">
              <circle cx="200" cy="185" r="92" fill="currentColor" />
              <path d="M30 500 C50 350 130 310 200 310 S350 350 370 500 Z" fill="currentColor" />
            </svg>
            <span className="absolute top-4 left-4 rounded-md bg-black/30 px-2 py-1 font-mono text-xs text-white backdrop-blur">{FUNDADORA.iniciais}</span>
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">
              {FUNDADORA.cargo}
            </Badge>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{FUNDADORA.nome}</h3>
            <blockquote className="mt-4 flex gap-3 text-lg leading-snug">
              <Quote className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p>“{FUNDADORA.frase}”</p>
            </blockquote>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{FUNDADORA.bio}</p>
            <div className="mt-auto flex items-center gap-1 pt-6">
              <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={`LinkedIn de ${FUNDADORA.nome}`} className="text-muted-foreground hover:text-foreground">
                <Linkedin />
              </Button>
              <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={`X de ${FUNDADORA.nome}`} className="text-muted-foreground hover:text-foreground">
                <Twitter />
              </Button>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {FUNDADORA.cidade}
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TIME.map((m) => (
            <li key={m.nome} className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20">
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold text-white ${m.tone}`}>{m.iniciais}</span>
              <div className="min-w-0">
                <p className="truncate font-medium">{m.nome}</p>
                <p className="truncate text-sm text-muted-foreground">{m.cargo}</p>
              </div>
              <span className="ml-auto hidden shrink-0 text-xs text-muted-foreground sm:block">{m.cidade}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
