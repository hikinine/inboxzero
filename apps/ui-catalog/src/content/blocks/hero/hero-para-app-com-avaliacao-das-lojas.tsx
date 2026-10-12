'use client'

import type { ReactNode } from 'react'
import { Apple, Award, Download, Flame, Footprints, Heart, Play, Star, Timer, Trophy } from 'lucide-react'

const SELOS = [
  { Icon: Award, texto: 'Escolha do editor · App Store' },
  { Icon: Trophy, texto: 'Top 3 em Saúde e fitness' },
  { Icon: Download, texto: '2 milhões de downloads' },
]

const SEMANA = [
  { dia: 'S', km: 4.2 },
  { dia: 'T', km: 0 },
  { dia: 'Q', km: 6.1 },
  { dia: 'Q', km: 3.4 },
  { dia: 'S', km: 0 },
  { dia: 'S', km: 8.3 },
  { dia: 'D', km: 5.2 },
]

function Telefone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`w-[240px] shrink-0 rounded-[2.5rem] border-[6px] border-foreground/85 bg-background shadow-2xl dark:border-muted-foreground/40 ${className ?? ''}`}>
      <div className="relative overflow-hidden rounded-[2.1rem]">
        <div className="absolute top-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground/85 dark:bg-muted-foreground/40" />
        <div className="h-[480px] px-5 pt-10">{children}</div>
      </div>
    </div>
  )
}

export default function HeroParaAppComAvaliacaoDasLojas() {
  const maxKm = Math.max(...SEMANA.map((d) => d.km))

  return (
    <section className="w-full overflow-hidden px-6 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm shadow-sm">
            <span className="flex gap-0.5 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="font-medium">4,9</span>
            <span className="text-muted-foreground">· 12 mil avaliações</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Corra com quem entende o seu ritmo.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            O Passo mede distância, ritmo e batimentos, monta o treino para a sua meta e comemora cada recorde com você.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-foreground px-4 py-2 text-left text-background transition-opacity hover:opacity-90">
              <Apple className="size-6" />
              <span className="leading-tight">
                <span className="block text-[10px] opacity-80">Baixar na</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-foreground px-4 py-2 text-left text-background transition-opacity hover:opacity-90">
              <Play className="size-5 fill-current" />
              <span className="leading-tight">
                <span className="block text-[10px] opacity-80">Disponível no</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {SELOS.map((s) => (
              <li key={s.texto} className="flex items-center gap-1.5">
                <s.Icon className="size-3.5" /> {s.texto}
              </li>
            ))}
          </ul>
        </div>

        {/* Dois celulares cortados na base da seção */}
        <div className="relative mx-auto mt-14 flex h-[300px] max-w-3xl items-start justify-center sm:h-[360px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 h-64 rounded-full bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-violet-500/20 blur-3xl" />

          <Telefone className="relative z-10 -rotate-6 translate-x-6 sm:translate-x-10">
            <div className="text-xs text-muted-foreground">Corrida de hoje</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tabular-nums">5,2</span>
              <span className="text-sm text-muted-foreground">km</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-lg bg-muted p-2">
                <Timer className="mx-auto size-3.5 text-muted-foreground" />
                <div className="mt-1 font-medium tabular-nums">27:14</div>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <Footprints className="mx-auto size-3.5 text-muted-foreground" />
                <div className="mt-1 font-medium tabular-nums">5&apos;14&quot;</div>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <Heart className="mx-auto size-3.5 text-rose-500" />
                <div className="mt-1 font-medium tabular-nums">148</div>
              </div>
            </div>
            <svg viewBox="0 0 200 120" className="mt-4 h-28 w-full rounded-xl bg-muted/60 text-primary">
              <path d="M18 92 C 40 60, 60 100, 84 70 S 120 30, 150 48 S 178 20, 186 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="18" cy="92" r="4" fill="currentColor" />
              <circle cx="186" cy="30" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
              <Flame className="size-3.5" /> Novo recorde nos 5 km!
            </div>
          </Telefone>

          <Telefone className="relative rotate-6 -translate-x-6 sm:-translate-x-10">
            <div className="text-xs text-muted-foreground">Esta semana</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tabular-nums">27,2</span>
              <span className="text-sm text-muted-foreground">km de 35</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-muted">
              <div className="h-full w-[78%] rounded-full bg-primary" />
            </div>
            <div className="mt-5 flex h-28 items-end justify-between gap-2">
              {SEMANA.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex h-24 w-full items-end rounded-md bg-muted">
                    <div className={`w-full rounded-md ${i === SEMANA.length - 1 ? 'bg-primary' : 'bg-primary/40'}`} style={{ height: `${d.km === 0 ? 0 : Math.max(12, (d.km / maxKm) * 100)}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.dia}</span>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Domingo · Parque Barigui</span>
                <span className="tabular-nums text-muted-foreground">5,2 km</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Sábado · Longão</span>
                <span className="tabular-nums text-muted-foreground">8,3 km</span>
              </li>
            </ul>
          </Telefone>
        </div>
      </div>
    </section>
  )
}
