'use client'

import { ArrowRight, Maximize2, Play, Volume2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CAPITULOS = ['Agenda', 'Confirmação automática', 'Lembretes', 'Relatórios']

export default function HeroComVideoEmDestaque() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Badge variant="outline" className="gap-1.5">
          <span className="size-1.5 rounded-full bg-sky-500" /> Tour de 2 minutos
        </Badge>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Agenda cheia, sem viver no WhatsApp.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          A Agendei confirma horários, lembra o cliente e remarca faltas sozinha. Você só aparece para atender.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            Agendar demonstração
          </Button>
        </div>

        <div className="relative mt-14 w-full">
          <div className="absolute inset-x-12 -bottom-6 h-20 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
            <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md bg-background text-xs text-muted-foreground">
                app.agendei.com.br/agenda
              </div>
            </div>
            <div className="relative aspect-video w-full bg-gradient-to-br from-sky-500/25 via-muted to-violet-500/25">
              <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] opacity-60 [background-size:22px_22px]" />

              <div className="absolute top-[14%] left-[8%] hidden w-40 rounded-lg border bg-background/90 p-3 text-left shadow-sm backdrop-blur sm:block">
                <div className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Hoje</div>
                <div className="mt-1 text-sm font-medium">14 atendimentos</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="absolute top-[22%] right-[8%] hidden w-44 rounded-lg border bg-background/90 p-3 text-left shadow-sm backdrop-blur sm:block">
                <div className="flex items-center gap-2">
                  <span className="size-6 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
                  <div className="text-xs">
                    <div className="font-medium">Marina Castro</div>
                    <div className="text-muted-foreground">confirmou · 15h30</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[26%] left-[14%] hidden w-36 rounded-lg border bg-background/90 p-3 text-left shadow-sm backdrop-blur sm:block">
                <div className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Faltas</div>
                <div className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">-62% no mês</div>
              </div>

              <button
                type="button"
                aria-label="Reproduzir vídeo"
                className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-lg ring-1 ring-border transition-transform hover:scale-105"
              >
                <Play className="ml-1 size-7 fill-current" />
              </button>

              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-background/90 to-transparent px-5 pt-12 pb-4">
                <span className="text-xs font-medium tabular-nums">0:00</span>
                <div className="h-1 flex-1 rounded-full bg-foreground/15">
                  <div className="h-full w-[2%] rounded-full bg-primary" />
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">2:14</span>
                <Volume2 className="size-4 text-muted-foreground" />
                <Maximize2 className="size-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {CAPITULOS.map((c, i) => (
              <span key={c} className="flex items-center gap-3">
                {i > 0 && <span className="size-1 rounded-full bg-border" />}
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
