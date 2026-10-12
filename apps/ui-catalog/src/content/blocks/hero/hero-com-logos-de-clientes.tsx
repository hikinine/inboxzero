'use client'

import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LOGOS = [
  { name: 'Araucária', className: 'font-serif text-xl' },
  { name: 'nuvem.co', className: 'font-mono text-lg' },
  { name: 'PRISMA', className: 'text-sm font-bold tracking-[0.3em]' },
  { name: 'Lumi', className: 'text-xl font-light italic' },
  { name: 'KAVO', className: 'text-lg font-black' },
  { name: 'Trilha', className: 'text-xl font-semibold tracking-tight' },
]

export default function HeroComLogosDeClientes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Gestão de RH para PMEs</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Folha, ponto e férias sem planilha.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            O Ponto Certo fecha a folha em um clique, com eSocial, banco de horas e admissão digital — tudo em conformidade com a CLT.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              Criar conta grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              <Play data-icon="inline-start" /> Ver como funciona
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">Usado por mais de 1.800 empresas, de 5 a 500 funcionários</p>
          <ul className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-6 text-muted-foreground/70 sm:grid-cols-3 lg:grid-cols-6">
            {LOGOS.map((l) => (
              <li key={l.name} className={`flex items-center justify-center select-none ${l.className}`}>
                {l.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
