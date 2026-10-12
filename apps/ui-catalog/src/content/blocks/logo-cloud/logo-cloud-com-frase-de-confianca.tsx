'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

const LOGOS = [
  { name: 'NORTE', cls: 'text-2xl font-black tracking-tight' },
  { name: 'aurora', cls: 'font-serif text-2xl italic' },
  { name: 'Pontual.', cls: 'text-2xl font-semibold' },
  { name: 'VELA', cls: 'text-xl font-light tracking-[0.35em]' },
  { name: 'kombi', cls: 'font-mono text-xl' },
  { name: 'Farol&Co', cls: 'text-2xl font-bold tracking-tight' },
  { name: 'lumen', cls: 'text-2xl font-medium' },
  { name: 'Maré', cls: 'font-serif text-2xl' },
]

const PEOPLE = ['AS', 'JP', 'LM', 'RC', 'FT']

export default function LogoCloudComFraseDeConfianca() {
  return (
    <section className="w-full border-y bg-muted/30 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <AvatarGroup className="justify-center">
          {PEOPLE.map((p) => (
            <Avatar key={p}>
              <AvatarFallback className="bg-background text-xs font-medium">{p}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+2k</AvatarGroupCount>
        </AvatarGroup>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Usado por 2.000+ times no Brasil</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">De lojas de bairro a redes com centenas de atendentes. Nota média 4,9 em 1.200 avaliações públicas.</p>
        <div className="mt-3 flex items-center justify-center gap-1" aria-label="4,9 de 5 estrelas">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1.5 text-sm font-medium tabular-nums">4,9</span>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
          {LOGOS.map((l) => (
            <li key={l.name} className={`flex items-center justify-center text-muted-foreground/70 transition-colors hover:text-foreground ${l.cls}`}>
              {l.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
