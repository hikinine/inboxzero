'use client'

import { ArrowUpRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const PLATAFORMAS = [
  { nome: 'G2', estilo: 'text-2xl font-black tracking-tight', nota: '4,8', avaliacoes: '1.240 avaliações', selo: 'Líder · Primavera 2026' },
  { nome: 'Capterra', estilo: 'text-2xl font-bold tracking-tight', nota: '4,9', avaliacoes: '860 avaliações', selo: 'Melhor custo-benefício' },
  { nome: 'Google', estilo: 'text-2xl font-semibold tracking-tight', nota: '4,7', avaliacoes: '2.300 avaliações', selo: 'Empresa verificada' },
]

export default function ProvaSocialComAvaliacoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Avaliações</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bem avaliado onde importa</h2>
          <p className="mt-3 text-muted-foreground">Mais de 4.400 avaliações públicas de clientes reais, nas três plataformas que o mercado consulta.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PLATAFORMAS.map((p) => (
            <div key={p.nome} className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center">
              <span className={`select-none ${p.estilo}`}>{p.nome}</span>
              <div className="mt-5 text-5xl font-semibold tabular-nums">{p.nota}</div>
              <div className="mt-2 flex gap-0.5 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{p.avaliacoes}</div>
              <Badge variant="outline" className="mt-5">
                {p.selo}
              </Badge>
              <a href="#" className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                Ler avaliações <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
