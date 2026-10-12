'use client'

import { ArrowLeft, LifeBuoy, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const POPULARES = ['Documentação', 'Preços', 'Integrações', 'Status do sistema']

export default function Erro404() {
  return (
    <section className="flex w-full min-h-[640px] items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Erro 404</p>
        <div aria-hidden className="mt-2 bg-gradient-to-b from-foreground to-foreground/15 bg-clip-text text-[7rem] leading-none font-semibold tracking-tighter text-transparent sm:text-[10rem]">
          404
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Essa página não existe (ou mudou de lugar)</h1>
        <p className="mt-3 text-muted-foreground">Confira o endereço ou procure o que precisa abaixo. Se chegou aqui por um link nosso, avise a gente.</p>

        <form className="mt-8 flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar no site…" aria-label="Buscar no site" className="pl-8" />
          </div>
          <Button type="submit">Buscar</Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline">
            <ArrowLeft data-icon="inline-start" /> Voltar ao início
          </Button>
          <Button variant="ghost">
            <LifeBuoy data-icon="inline-start" /> Falar com o suporte
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>Páginas populares:</span>
          {POPULARES.map((p) => (
            <a key={p} href="#" className="underline-offset-4 hover:text-foreground hover:underline">
              {p}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
