'use client'

import { useState } from 'react'
import { ArrowRight, Hammer, MapPin, Search, Sofa, Sparkles, Star, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const POPULARES = ['Eletricista', 'Diarista', 'Encanador', 'Montador de móveis', 'Pintor', 'Jardineiro']

const CATEGORIAS = [
  { Icon: Hammer, nome: 'Reformas e reparos', profissionais: '3.240', nota: '4,8', aPartir: 'R$ 150', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { Icon: Sparkles, nome: 'Limpeza e organização', profissionais: '5.810', nota: '4,9', aPartir: 'R$ 120', cor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
  { Icon: Wrench, nome: 'Elétrica e hidráulica', profissionais: '2.170', nota: '4,8', aPartir: 'R$ 180', cor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { Icon: Sofa, nome: 'Montagem de móveis', profissionais: '1.460', nota: '4,7', aPartir: 'R$ 90', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
]

export default function HeroComBuscaDeMarketplace() {
  const [busca, setBusca] = useState('')

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">48 mil profissionais verificados em 120 cidades</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Encontre o profissional certo, perto de você.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Descreva o serviço, compare orçamentos e contrate com avaliação real de quem já usou.</p>
        </div>

        <form
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-2xl border bg-card p-2 shadow-lg sm:flex-row sm:items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Label htmlFor="busca-servico" className="sr-only">
              O que você precisa?
            </Label>
            <Input
              id="busca-servico"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="O que você precisa? Ex.: trocar chuveiro"
              className="h-11 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex items-center gap-2 px-3 sm:w-56">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <Label htmlFor="busca-cidade" className="sr-only">
              Cidade
            </Label>
            <Input id="busca-cidade" defaultValue="Curitiba, PR" className="h-11 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 dark:bg-transparent" />
          </div>
          <Button type="submit" size="lg" className="h-11 px-6">
            Buscar
          </Button>
        </form>

        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Populares:</span>
          {POPULARES.map((p) => {
            const ativo = busca === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setBusca(p)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${ativo ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
              >
                {p}
              </button>
            )
          })}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((c) => (
            <a key={c.nome} href="#" className="group rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md">
              <span className={`flex size-11 items-center justify-center rounded-xl ${c.cor}`}>
                <c.Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{c.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.profissionais} profissionais</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-medium">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" /> {c.nota}
                </span>
                <span className="text-muted-foreground">a partir de {c.aPartir}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Ver todas as 36 categorias <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
