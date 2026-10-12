'use client'

import { motion } from 'motion/react'
import { ArrowRight, Captions, Maximize2, Play, Settings, Volume2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  { valor: '48 mil', rotulo: 'alunos ativos todo mês' },
  { valor: 'R$ 12 mi', rotulo: 'repassados a quem ensina' },
  { valor: '4,9', rotulo: 'nota média das aulas' },
  { valor: '97%', rotulo: 'dos vídeos abrem em menos de 1s' },
]

const CAPITULOS = [
  { nome: 'Introdução', duracao: '2:10', cor: 'from-sky-500/60 to-violet-500/60' },
  { nome: 'Precificação', duracao: '6:40', cor: 'from-violet-500/60 to-fuchsia-500/60', ativo: true },
  { nome: 'Proposta', duracao: '3:58', cor: 'from-amber-500/60 to-rose-500/60' },
  { nome: 'Exercício', duracao: '1:20', cor: 'from-emerald-500/60 to-teal-500/60' },
]

export default function HeroComGridDeStatsEVideo() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="outline">Plataforma para cursos online</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Ensine online. Receba em reais, sem taxa surpresa.</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            A Lousa hospeda seus vídeos, cuida do checkout e libera o acesso na hora. Você só grava a próxima aula.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Criar minha escola <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Ver planos
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
            {STATS.map((s) => (
              <div key={s.rotulo} className="flex flex-col bg-card p-5">
                <dt className="order-last mt-1 text-xs text-muted-foreground">{s.rotulo}</dt>
                <dd className="text-3xl font-semibold tracking-tight tabular-nums">{s.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-neutral-950 text-white shadow-2xl">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet-600/60 via-neutral-900 to-sky-600/40" />
            <div aria-hidden className="absolute -top-16 right-10 size-56 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div aria-hidden className="absolute bottom-10 -left-10 size-48 rounded-full bg-sky-400/25 blur-3xl" />

            <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">Aula 03 · Precificação para freelancers</div>
            <div className="absolute top-4 right-4 rounded-md bg-black/40 px-2 py-1 text-xs tabular-nums backdrop-blur">12:48</div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-white/40"
                animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <button type="button" aria-label="Reproduzir aula" className="relative flex size-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition-transform hover:scale-105">
                <Play className="ml-1 size-6 fill-current" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pt-16 pb-4">
              <p className="mx-auto w-fit max-w-[90%] rounded bg-black/60 px-2 py-0.5 text-center text-xs">…o preço certo é o que o cliente aceita sem pestanejar.</p>
              <div className="relative mt-4 h-1 rounded-full bg-white/20">
                <div className="h-full w-[27%] rounded-full bg-white" />
                {[17, 69, 90].map((p) => (
                  <span key={p} className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-white/70" style={{ left: `${p}%` }} />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/80">
                <Play className="size-4 fill-current" />
                <Volume2 className="size-4" />
                <span className="text-xs tabular-nums">03:27 / 12:48</span>
                <span className="ml-auto flex items-center gap-3">
                  <Captions className="size-4" />
                  <Settings className="size-4" />
                  <Maximize2 className="size-4" />
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-4 gap-3">
            {CAPITULOS.map((c) => (
              <li key={c.nome} className={`rounded-lg p-1 ${c.ativo ? 'ring-2 ring-primary' : ''}`}>
                <div className={`aspect-video rounded-md bg-gradient-to-br ${c.cor}`} />
                <div className="mt-1.5 truncate text-xs font-medium">{c.nome}</div>
                <div className="text-[11px] tabular-nums text-muted-foreground">{c.duracao}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
