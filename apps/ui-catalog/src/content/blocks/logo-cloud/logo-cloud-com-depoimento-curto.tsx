'use client'

import { Quote, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const LOGOS = [
  { name: 'NORTE', cls: 'text-xl font-black tracking-tight' },
  { name: 'aurora', cls: 'font-serif text-xl italic' },
  { name: 'Pontual.', cls: 'text-xl font-semibold' },
  { name: 'VELA', cls: 'text-base font-light tracking-[0.35em]' },
  { name: 'kombi', cls: 'font-mono text-lg' },
  { name: 'Farol&Co', cls: 'text-xl font-bold tracking-tight' },
]

export default function LogoCloudComDepoimentoCurto() {
  return (
    <section className="w-full px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <figure className="relative rounded-2xl border bg-card p-8">
          <Quote className="absolute top-6 right-6 size-8 text-muted-foreground/20" aria-hidden />
          <div className="flex items-center gap-0.5" aria-label="5 de 5 estrelas">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="mt-4 text-xl leading-snug font-medium tracking-tight sm:text-2xl">
            “Em duas semanas o tempo de resposta caiu de 3 horas para 6 minutos. O time nunca mais voltou para a planilha.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary/10 font-medium text-primary">RC</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Renata Carvalho</div>
              <div className="text-xs text-muted-foreground">Head de Atendimento · Nuvem Fit</div>
            </div>
          </figcaption>
        </figure>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Quem já atende com a gente</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {LOGOS.map((l) => (
              <li key={l.name} className={`flex h-20 items-center justify-center rounded-xl border bg-muted/30 text-muted-foreground/70 transition-colors hover:bg-card hover:text-foreground ${l.cls}`}>
                {l.name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Mais de 2.400 empresas em todos os estados do Brasil.{' '}
            <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
              Ver casos de clientes
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
