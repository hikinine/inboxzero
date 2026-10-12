'use client'

import type { LucideIcon } from 'lucide-react'
import { Flag, Globe, Rocket, Smartphone, Trophy, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const ETAPAS: Array<{ data: string; titulo: string; texto: string; Icon: LucideIcon; feito: boolean }> = [
  { data: 'Jan 2026', titulo: 'Kickoff do projeto', texto: 'Descoberta com 40 clientes e escopo da primeira versão.', Icon: Flag, feito: true },
  { data: 'Mar 2026', titulo: 'Beta fechado', texto: '120 contas convidadas e três rodadas de ajustes.', Icon: Users, feito: true },
  { data: 'Mai 2026', titulo: 'Lançamento público', texto: 'Disponível em todos os planos, com migração assistida.', Icon: Rocket, feito: true },
  { data: 'Jul 2026', titulo: '1.000 clientes ativos', texto: 'Meta do semestre batida com dois meses de antecedência.', Icon: Trophy, feito: true },
  { data: 'Set 2026', titulo: 'App para iOS e Android', texto: 'Fila, transferência e notificações no celular.', Icon: Smartphone, feito: true },
  { data: 'Nov 2026', titulo: 'Expansão para a América Latina', texto: 'Suporte em espanhol e operação no México e na Colômbia.', Icon: Globe, feito: false },
]

export default function TimelineAlternada() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Linha do tempo</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Do kickoff à expansão em onze meses</h2>
          <p className="mt-3 text-muted-foreground">Cada marco acima ou abaixo da linha, na ordem em que aconteceu. O último ainda está por vir.</p>
        </div>

        <ol className="relative mt-14 space-y-10 before:absolute before:top-0 before:bottom-0 before:left-[15px] before:w-px before:bg-border lg:grid lg:grid-cols-6 lg:gap-x-4 lg:space-y-0 lg:before:top-1/2 lg:before:right-0 lg:before:bottom-auto lg:before:left-0 lg:before:h-px lg:before:w-auto">
          {ETAPAS.map((e, i) => {
            const acima = i % 2 === 0
            return (
              <li key={e.titulo} className="relative pl-12 lg:grid lg:grid-rows-[1fr_auto_1fr] lg:pl-0">
                <span className={cn('absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border-2 bg-background lg:static lg:row-start-2 lg:mx-auto', e.feito ? 'border-primary text-primary' : 'border-dashed border-muted-foreground/50 text-muted-foreground')} aria-hidden="true">
                  <e.Icon className="size-3.5" />
                </span>
                <div className={cn('lg:flex lg:flex-col', acima ? 'lg:row-start-1 lg:justify-end' : 'lg:row-start-3 lg:justify-start')}>
                  {!acima && <span className="mx-auto hidden h-6 w-px bg-border lg:block" aria-hidden="true" />}
                  <div className={cn('rounded-xl border bg-card p-4', !e.feito && 'border-dashed')}>
                    <p className={cn('text-xs font-semibold', e.feito ? 'text-primary' : 'text-muted-foreground')}>{e.data}</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug">{e.titulo}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.texto}</p>
                  </div>
                  {acima && <span className="mx-auto hidden h-6 w-px bg-border lg:block" aria-hidden="true" />}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
