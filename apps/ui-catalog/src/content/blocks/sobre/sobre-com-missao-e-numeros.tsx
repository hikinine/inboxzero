'use client'

import { MapPin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

const NUMBERS = [
  { value: '2019', label: 'ano de fundação' },
  { value: '140', label: 'pessoas no time' },
  { value: '2.400+', label: 'clientes ativos' },
  { value: '12', label: 'países atendidos' },
]

export default function SobreComMissaoENumeros() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sobre nós</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tecnologia para quem atende pessoas</h2>
          <p className="mt-5 text-muted-foreground">Nascemos em 2019 dentro de uma operação de varejo que respondia 4 mil mensagens por dia com planilha e boa vontade. Construímos a ferramenta que gostaríamos de ter tido.</p>
          <p className="mt-4 text-muted-foreground">Hoje a missão é a mesma: fazer cada conversa valer o tempo de quem está dos dois lados dela, com automação onde cabe e gente onde importa.</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {NUMBERS.map((n) => (
              <div key={n.label} className="flex flex-col border-t pt-4">
                <dt className="order-2 text-sm text-muted-foreground">{n.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight tabular-nums">{n.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted-foreground/25">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-foreground/10" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="currentColor" strokeWidth="1" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="currentColor" strokeWidth="1" />
              ))}
              <rect x="60" y="220" width="70" height="280" fill="currentColor" />
              <rect x="150" y="150" width="90" height="350" fill="currentColor" opacity="0.8" />
              <rect x="260" y="260" width="60" height="240" fill="currentColor" opacity="0.6" />
              <circle cx="310" cy="110" r="40" fill="currentColor" opacity="0.5" />
            </svg>
            <div className="absolute inset-x-4 bottom-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <AvatarGroup>
                  <Avatar>
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>RN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+137</AvatarGroupCount>
                </AvatarGroup>
                <div className="min-w-0 text-sm">
                  <p className="font-medium">Time distribuído</p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin className="size-3" /> São Paulo · Florianópolis · Recife
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 -z-10 size-40 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
