'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HeroComGradienteDeFundo() {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute top-1/3 -left-24 size-80 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Badge className="gap-1.5 bg-gradient-to-r from-violet-500 to-sky-500 text-white">
          Novo <span className="opacity-70">·</span> Relatórios explicados por IA
        </Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
          Feche o mês em{' '}
          <span className="bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">minutos</span>, não em semanas.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A Contafácil concilia extratos, classifica lançamentos e entrega o DRE pronto para o contador — com uma explicação em português de cada número.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="h-11 px-6">
            Testar grátis por 14 dias <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" className="h-11 bg-background/60 px-6 backdrop-blur">
            <Sparkles data-icon="inline-start" /> Ver um DRE de exemplo
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Sem cartão de crédito · Cancele quando quiser · Dados hospedados no Brasil</p>
      </div>
    </section>
  )
}
