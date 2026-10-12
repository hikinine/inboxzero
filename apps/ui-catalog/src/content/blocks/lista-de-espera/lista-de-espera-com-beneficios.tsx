'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, Headset, Percent, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

const BENEFICIOS: Array<{ Icon: LucideIcon; titulo: string; texto: string; selo: string }> = [
  { Icon: Percent, titulo: '50% de desconto no primeiro ano', texto: 'Preço travado para quem entrar na lista antes do lançamento, em qualquer plano.', selo: 'Economia de até R$ 5.940' },
  { Icon: Rocket, titulo: 'Acesso 30 dias antes', texto: 'Use o produto antes de todo mundo e ajude a definir o que entra na versão final.', selo: 'Beta fechado em novembro' },
  { Icon: Headset, titulo: 'Onboarding com o time', texto: 'Uma sessão de 45 minutos com quem construiu o produto para montar sua primeira automação.', selo: 'Vagas limitadas' },
]

const VAGAS = 500
const OCUPADAS = 312

const LOGOS = [
  { nome: 'Araucária', estilo: 'font-serif text-lg' },
  { nome: 'nuvem.co', estilo: 'font-mono text-base' },
  { nome: 'PRISMA', estilo: 'text-xs font-bold tracking-[0.3em]' },
  { nome: 'Lumi', estilo: 'text-lg font-light italic' },
  { nome: 'Kavo', estilo: 'text-lg font-black tracking-tight' },
]

export default function ListaDeEsperaComBeneficios() {
  const [inscrito, setInscrito] = useState(false)
  const restantes = VAGAS - OCUPADAS - (inscrito ? 1 : 0)
  const pct = Math.round(((VAGAS - restantes) / VAGAS) * 100)

  return (
    <section className="w-full bg-muted/30 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Lista de espera</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem entra primeiro, leva mais</h2>
          <p className="mt-3 text-muted-foreground">O primeiro lote tem 500 vagas e três vantagens que não voltam depois do lançamento.</p>
        </div>

        <div className="mx-auto mt-8 max-w-lg">
          {inscrito ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm">
              <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> Vaga garantida. Enviamos a confirmação para o seu e-mail.
            </div>
          ) : (
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                setInscrito(true)
              }}
            >
              <Label htmlFor="le-email" className="sr-only">
                E-mail
              </Label>
              <Input id="le-email" type="email" placeholder="voce@empresa.com.br" required className="h-10 flex-1" />
              <Button type="submit" size="lg" className="h-10">
                Garantir minha vaga <ArrowRight data-icon="inline-end" />
              </Button>
            </form>
          )}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Restam <span className="font-medium text-foreground tabular-nums">{restantes}</span> vagas no primeiro lote
            </span>
            <span className="tabular-nums">{pct}% preenchido</span>
          </div>
          <Progress value={pct} className="mt-2" aria-label="Vagas preenchidas no primeiro lote" />
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {BENEFICIOS.map(({ Icon, titulo, texto, selo }) => (
            <li key={titulo} className="flex flex-col rounded-xl border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{texto}</p>
              <span className="mt-5 w-fit rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">{selo}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 border-t pt-8 sm:flex-row sm:justify-center sm:gap-8">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Já na lista</span>
          <ul className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/70">
            {LOGOS.map((l) => (
              <li key={l.nome} className={`select-none ${l.estilo}`}>
                {l.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
