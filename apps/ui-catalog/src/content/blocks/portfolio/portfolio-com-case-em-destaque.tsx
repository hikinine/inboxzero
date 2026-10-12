'use client'

import { ArrowRight, ArrowUpRight, Quote, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const DESTAQUE = {
  cliente: 'Banco Horizonte',
  titulo: 'Portal do cliente com Open Finance, do zero ao ar em cinco meses',
  tags: ['Fintech', 'Web', 'Design system'],
  depoimento: 'Entregaram em cinco meses o que o fornecedor anterior não entregou em dois anos, com o time deles sentado ao lado do nosso.',
  autor: 'Letícia Prado',
  cargo: 'Diretora de Canais Digitais',
  metricas: [
    { valor: '−41%', rotulo: 'chamados no suporte' },
    { valor: '2,3 mi', rotulo: 'clientes migrados' },
    { valor: '98', rotulo: 'NPS do portal' },
  ],
}

const OUTROS = [
  { cliente: 'Clínica Vitalis', titulo: 'App de agendamento para 32 unidades', resultado: '+62% agendamentos online', tone: 'from-sky-500 to-cyan-400', tag: 'Mobile' },
  { cliente: 'Loja Bem-te-vi', titulo: 'E-commerce com checkout em um clique', resultado: '+38% de conversão', tone: 'from-rose-500 to-orange-400', tag: 'Web' },
  { cliente: 'Transportadora Rota Sul', titulo: 'Rastreamento de frota com IA', resultado: '−18% em combustível', tone: 'from-emerald-500 to-lime-400', tag: 'IA' },
]

const BARRAS = [38, 52, 44, 66, 58, 80, 72, 92]

export default function PortfolioComCaseEmDestaque() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Cases</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um case de perto, três de relance</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Ver os 24 cases <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <article className="relative flex min-h-[520px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/20 bg-white/15 text-white">Case em destaque</Badge>
              {DESTAQUE.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/25 px-2.5 py-0.5 text-xs text-white/85">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-white/70">{DESTAQUE.cliente}</p>
            <h3 className="mt-2 max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{DESTAQUE.titulo}</h3>

            <ul className="mt-6 grid max-w-md grid-cols-3 gap-4">
              {DESTAQUE.metricas.map((m) => (
                <li key={m.rotulo}>
                  <span className="block text-2xl font-semibold tabular-nums sm:text-3xl">{m.valor}</span>
                  <span className="mt-0.5 block text-xs text-white/70">{m.rotulo}</span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-6 max-w-lg text-sm leading-relaxed text-white/85">
              <Quote className="mb-1 size-4 text-white/60" aria-hidden="true" />
              {DESTAQUE.depoimento}
              <footer className="mt-2 text-xs text-white/70">
                {DESTAQUE.autor} · {DESTAQUE.cargo}
              </footer>
            </blockquote>

            <div className="relative mt-8 -mr-6 -mb-12 ml-auto w-[88%] rounded-t-xl border border-white/30 bg-background/95 p-4 text-foreground shadow-2xl sm:-mr-8 sm:w-[78%]" aria-hidden="true">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="ml-3 h-2 w-28 rounded bg-muted" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['Saldo', 'Investimentos', 'Cartão'].map((r) => (
                  <div key={r} className="rounded-md border p-2">
                    <p className="text-[10px] text-muted-foreground">{r}</p>
                    <div className="mt-1.5 h-3 w-16 rounded bg-foreground/70" />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-16 items-end gap-1">
                {BARRAS.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-4">
            {OUTROS.map((c) => (
              <a key={c.cliente} href="#" className="group flex flex-1 gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20">
                <span className={`relative size-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${c.tone}`}>
                  <span className="absolute -right-4 -bottom-4 size-12 rounded-full bg-white/30" />
                  <span className="absolute top-3 left-3 h-1.5 w-8 rounded bg-white/50" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline">{c.tag}</Badge>
                    <span className="truncate">{c.cliente}</span>
                  </span>
                  <span className="mt-1.5 font-semibold leading-snug group-hover:underline">{c.titulo}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium">
                    <TrendingUp className="size-4 text-emerald-500" /> {c.resultado}
                    <ArrowUpRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
