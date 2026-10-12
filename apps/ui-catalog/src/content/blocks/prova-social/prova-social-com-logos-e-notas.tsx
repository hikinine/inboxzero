'use client'

import { ArrowUpRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const PLATAFORMAS: Array<{ nome: string; estilo: string; nota: number; avaliacoes: number; selo: string | null }> = [
  { nome: 'G2', estilo: 'text-xl font-black tracking-tight', nota: 4.8, avaliacoes: 1240, selo: 'Líder · Primavera 2026' },
  { nome: 'Capterra', estilo: 'text-xl font-bold tracking-tight', nota: 4.9, avaliacoes: 860, selo: 'Melhor custo-benefício' },
  { nome: 'Google', estilo: 'text-xl font-semibold tracking-tight', nota: 4.7, avaliacoes: 2310, selo: null },
  { nome: 'Trustpilot', estilo: 'text-xl font-semibold', nota: 4.8, avaliacoes: 640, selo: 'Excelente' },
  { nome: 'App Store', estilo: 'text-lg font-medium tracking-tight', nota: 4.7, avaliacoes: 912, selo: null },
  { nome: 'Google Play', estilo: 'text-lg font-medium tracking-tight', nota: 4.6, avaliacoes: 1485, selo: null },
]

const TOTAL = PLATAFORMAS.reduce((acc, p) => acc + p.avaliacoes, 0)
const MEDIA = PLATAFORMAS.reduce((acc, p) => acc + p.nota * p.avaliacoes, 0) / TOTAL

function Estrelas({ nota, tamanho = 'size-4' }: { nota: number; tamanho?: string }) {
  const largura = `${Math.min(nota / 5, 1) * 100}%`
  return (
    <span className="relative inline-flex" role="img" aria-label={`${nota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5`}>
      <span className="flex gap-0.5 text-muted-foreground/25" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`${tamanho} fill-current`} />
        ))}
      </span>
      <span className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-amber-500" style={{ width: largura }} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`${tamanho} shrink-0 fill-current`} />
        ))}
      </span>
    </span>
  )
}

export default function ProvaSocialComLogosENotas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Avaliações públicas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Nota alta em todo lugar que importa</h2>
          <p className="mt-3 text-muted-foreground">Não escolhemos a plataforma com a melhor nota: mostramos todas. Clique em qualquer uma e leia as avaliações na fonte.</p>
          <div className="mt-8 flex items-end gap-4 border-t pt-6">
            <span className="text-6xl font-semibold tracking-tighter tabular-nums">{MEDIA.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
            <div className="pb-2">
              <Estrelas nota={MEDIA} tamanho="size-5" />
              <p className="mt-1 text-sm text-muted-foreground">média ponderada de {TOTAL.toLocaleString('pt-BR')} avaliações</p>
            </div>
          </div>
        </div>

        <ul className="divide-y rounded-2xl border bg-card">
          {PLATAFORMAS.map((p) => (
            <li key={p.nome} className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 sm:flex-nowrap">
              <span className={`w-28 shrink-0 select-none text-foreground/80 ${p.estilo}`}>{p.nome}</span>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Estrelas nota={p.nota} />
                <span className="text-lg font-semibold tabular-nums">{p.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                <span className="hidden truncate text-sm text-muted-foreground md:inline">{p.avaliacoes.toLocaleString('pt-BR')} avaliações</span>
              </div>
              {p.selo && (
                <Badge variant="secondary" className="shrink-0">
                  {p.selo}
                </Badge>
              )}
              <a href="#" className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" aria-label={`Ler avaliações no ${p.nome}`}>
                Ler <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
