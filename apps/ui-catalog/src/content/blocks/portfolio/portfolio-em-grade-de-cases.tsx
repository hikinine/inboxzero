'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CASES = [
  { title: 'App de agendamento para rede de clínicas', client: 'Clínica Vitalis', tags: ['Mobile', 'Saúde'], result: '+62% agendamentos online', kind: 'mobile', tone: 'from-sky-500 via-cyan-400 to-emerald-300' },
  { title: 'E-commerce com checkout em um clique', client: 'Loja Bem-te-vi', tags: ['Web', 'Varejo'], result: '+38% de conversão', kind: 'web', tone: 'from-rose-500 via-pink-400 to-orange-300' },
  { title: 'Portal do cliente com Open Finance', client: 'Banco Horizonte', tags: ['Fintech', 'Web'], result: '−41% chamados no suporte', kind: 'web', tone: 'from-violet-600 via-indigo-500 to-sky-400' },
  { title: 'Painel de obras em tempo real', client: 'Construtora Alvorada', tags: ['Dashboard', 'IoT'], result: '12 obras monitoradas', kind: 'web', tone: 'from-amber-500 via-orange-400 to-yellow-300' },
  { title: 'Plataforma de matrícula online', client: 'Escola Novo Saber', tags: ['Educação', 'Web'], result: '3 mil matrículas em 2 semanas', kind: 'mobile', tone: 'from-emerald-600 via-teal-500 to-lime-300' },
  { title: 'Rastreamento de frota com IA', client: 'Transportadora Rota Sul', tags: ['Logística', 'IA'], result: '−18% em combustível', kind: 'web', tone: 'from-slate-700 via-slate-500 to-zinc-300' },
] as const

export default function PortfolioEmGradeDeCases() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Cases</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Projetos que mudaram um número</h2>
            <p className="mt-3 text-muted-foreground">Cada case abaixo começou com uma métrica a ser movida. Mostramos o resultado, não só a tela.</p>
          </div>
          <Button variant="outline" className="w-fit">
            Ver todos os cases <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <li key={c.title} className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
              <a href="#" className="block">
                <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${c.tone}`}>
                  {c.kind === 'web' ? (
                    <div className="absolute inset-x-8 top-8 bottom-0 rounded-t-xl border border-white/40 bg-background/95 p-3 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="flex gap-1">
                        <span className="size-2 rounded-full bg-muted-foreground/30" />
                        <span className="size-2 rounded-full bg-muted-foreground/30" />
                        <span className="size-2 rounded-full bg-muted-foreground/30" />
                      </div>
                      <div className="mt-3 h-2 w-1/2 rounded bg-muted" />
                      <div className="mt-2 h-2 w-3/4 rounded bg-muted" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="h-10 rounded-md bg-muted" />
                        <div className="h-10 rounded-md bg-muted" />
                        <div className="h-10 rounded-md bg-primary/80" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-x-0 top-8 bottom-0 mx-auto w-32 rounded-t-[1.75rem] border-4 border-b-0 border-white/40 bg-background/95 p-3 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="mx-auto h-1 w-10 rounded-full bg-muted-foreground/30" />
                      <div className="mt-4 h-2 w-2/3 rounded bg-muted" />
                      <div className="mt-2 h-12 rounded-md bg-primary/80" />
                      <div className="mt-2 h-2 w-full rounded bg-muted" />
                      <div className="mt-1.5 h-2 w-4/5 rounded bg-muted" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.client}</p>
                  <h3 className="mt-1.5 font-semibold leading-snug group-hover:underline">{c.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-1.5 border-t pt-4 text-sm font-medium">
                    <TrendingUp className="size-4 text-emerald-500" /> {c.result}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
