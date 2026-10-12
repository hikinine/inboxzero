'use client'

import { Quote, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const DEPOIMENTOS = [
  {
    nome: 'Juliana Prado',
    cargo: 'Diretora comercial',
    empresa: 'Araucária',
    logo: 'font-serif text-lg',
    nota: 5,
    texto: 'Em 60 dias o time passou de 18% para 31% de conversão. O alerta de negócio parado foi o que mais mudou o jogo.',
  },
  {
    nome: 'Marcelo Tavares',
    cargo: 'CEO',
    empresa: 'nuvem.co',
    logo: 'font-mono text-base',
    nota: 5,
    texto: 'Saímos de quatro planilhas para um painel só. Hoje abro o celular de manhã e sei exatamente o que o mês vai dar.',
  },
  {
    nome: 'Patrícia Lemos',
    cargo: 'Gerente de vendas',
    empresa: 'PRISMA',
    logo: 'text-xs font-bold tracking-[0.3em]',
    nota: 5,
    texto: 'O suporte respondeu em 4 minutos num sábado. Ferramenta boa é a que o time usa sem reclamar — e esse é o caso.',
  },
]

export default function DepoimentosComEstrelas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Depoimentos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Resultado que o time sente no bolso</h2>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex gap-0.5 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground">
              <strong className="font-medium text-foreground">4,9 de 5</strong> · 1.300 avaliações
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.nome} className="relative flex flex-col rounded-2xl border bg-card p-6">
              <Quote className="absolute top-6 right-6 size-8 text-muted-foreground/20" />
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < d.nota ? 'fill-current' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium tabular-nums">{d.nota.toFixed(1).replace('.', ',')}</span>
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed">“{d.texto}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{d.nome.split(' ').map((s) => s[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{d.nome}</div>
                    <div className="text-xs text-muted-foreground">{d.cargo}</div>
                  </div>
                </div>
                <span className={`text-muted-foreground/70 select-none ${d.logo}`}>{d.empresa}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
