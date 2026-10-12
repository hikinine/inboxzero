'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

const LOGOS = [
  { nome: 'Araucária', className: 'font-serif text-lg' },
  { nome: 'nuvem.co', className: 'font-mono text-base' },
  { nome: 'PRISMA', className: 'text-xs font-bold tracking-[0.3em]' },
  { nome: 'Lumi', className: 'text-lg font-light italic' },
]

export default function ProvaSocialComNumerosEAvatares() {
  return (
    <section className="w-full px-6 py-10 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-2xl border bg-card px-6 py-6 lg:justify-between">
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {['AS', 'BR', 'CM', 'DL', 'EF'].map((n) => (
              <Avatar key={n}>
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+2k</AvatarGroupCount>
          </AvatarGroup>
          <div className="text-sm">
            <div className="font-medium">2.400 equipes</div>
            <div className="text-xs text-muted-foreground">em 27 estados</div>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border lg:block" />

        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <div className="text-sm">
            <div className="font-medium tabular-nums">4,9 de 5</div>
            <div className="text-xs text-muted-foreground">3.100 avaliações</div>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border lg:block" />

        <div className="flex items-center gap-3">
          <div className="text-2xl font-semibold tabular-nums">R$ 1,2 bi</div>
          <div className="text-xs leading-snug text-muted-foreground">
            vendidos pela
            <br />
            plataforma em 2025
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border lg:block" />

        <ul className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/70">
          {LOGOS.map((l) => (
            <li key={l.nome} className={`select-none ${l.className}`}>
              {l.nome}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
