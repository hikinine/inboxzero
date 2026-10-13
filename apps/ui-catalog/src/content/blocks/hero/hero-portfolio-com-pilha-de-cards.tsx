'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Projeto {
  cliente: string
  titulo: string
  resultado: string
  ano: string
  gradiente: string
  tipo: 'app' | 'dashboard' | 'site'
}

const PROJETOS: Projeto[] = [
  { cliente: 'Banco Pérola', titulo: 'App de investimentos', resultado: '+38% de aportes recorrentes', ano: '2026', gradiente: 'from-emerald-500/30 via-emerald-500/10 to-transparent', tipo: 'app' },
  { cliente: 'Rota Frete', titulo: 'Painel de logística', resultado: '−22% no tempo de despacho', ano: '2025', gradiente: 'from-sky-500/30 via-sky-500/10 to-transparent', tipo: 'dashboard' },
  { cliente: 'Casa Ipê', titulo: 'Loja de móveis autorais', resultado: 'R$ 1,2 mi no primeiro trimestre', ano: '2025', gradiente: 'from-amber-500/30 via-amber-500/10 to-transparent', tipo: 'site' },
  { cliente: 'Clínica Viva', titulo: 'Agendamento online', resultado: '4,9 de nota na App Store', ano: '2024', gradiente: 'from-rose-500/30 via-rose-500/10 to-transparent', tipo: 'app' },
]

function Miniatura({ tipo }: { tipo: Projeto['tipo'] }) {
  if (tipo === 'dashboard') {
    return (
      <div className="grid h-full grid-cols-[56px_1fr] gap-2">
        <div className="space-y-1.5 rounded-md bg-background/70 p-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn('h-1.5 rounded-full bg-muted-foreground/25', i === 1 && 'bg-foreground/50')} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-7 rounded-md bg-background/70" />
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1 rounded-md bg-background/70 p-2">
            {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-foreground/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  if (tipo === 'site') {
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between rounded-md bg-background/70 px-2 py-1.5">
          <div className="h-1.5 w-10 rounded-full bg-foreground/50" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 w-5 rounded-full bg-muted-foreground/25" />
            ))}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-1 rounded-md bg-background/70 p-1.5">
              <div className="flex-1 rounded-sm bg-muted-foreground/15" />
              <div className="h-1.5 w-3/4 rounded-full bg-foreground/30" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-full justify-center gap-3">
      {[0, 1].map((i) => (
        <div key={i} className={cn('flex w-20 flex-col gap-1.5 rounded-xl border bg-background/80 p-2', i === 1 && 'mt-4')}>
          <div className="mx-auto h-1 w-6 rounded-full bg-muted-foreground/30" />
          <div className="h-8 rounded-md bg-foreground/15" />
          <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/30" />
          <div className="h-1.5 w-1/2 rounded-full bg-muted-foreground/20" />
          <div className="mt-auto h-4 rounded-md bg-foreground/60" />
        </div>
      ))}
    </div>
  )
}

export default function HeroPortfolioComPilhaDeCards() {
  const [ordem, setOrdem] = useState<number[]>(() => PROJETOS.map((_, i) => i))
  const [pausado, setPausado] = useState(false)

  const avancar = () => setOrdem((o) => [...o.slice(1), o[0]])

  useEffect(() => {
    if (pausado) return
    const id = window.setInterval(avancar, 3200)
    return () => window.clearInterval(id)
  }, [pausado])

  const topo = PROJETOS[ordem[0]]

  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 font-semibold text-primary-foreground">MC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Marina Couto</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" /> Florianópolis · remoto
              </p>
            </div>
          </div>

          <Badge variant="outline" className="mt-8 gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Agenda aberta para novembro
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Design de produto que <span className="text-muted-foreground">vira resultado</span> no fim do mês.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Há 9 anos desenho apps, painéis e lojas para fintechs, saúde e varejo. Do discovery ao handoff, com métricas acordadas desde a primeira semana.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Contrate-me <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              <Calendar data-icon="inline-start" /> Agendar conversa de 20 min
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t pt-6">
            {[
              ['42', 'projetos entregues'],
              ['17', 'clientes recorrentes'],
              ['4,9', 'nota média'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-semibold tracking-tight">{v}</dt>
                <dd className="text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
          <div className="relative h-[380px]">
            {ordem.map((idx, pos) => {
              const p = PROJETOS[idx]
              const visivel = pos < 3
              return (
                <motion.button
                  key={p.cliente}
                  type="button"
                  onClick={avancar}
                  aria-label={`Projeto ${p.titulo} — clique para ver o próximo`}
                  className="absolute inset-x-0 top-0 rounded-2xl border bg-card p-4 text-left shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ zIndex: PROJETOS.length - pos, transformOrigin: 'top center' }}
                  animate={{
                    y: pos * 22,
                    scale: 1 - pos * 0.06,
                    rotate: pos === 0 ? 0 : pos % 2 ? 2.5 : -2.5,
                    opacity: visivel ? 1 - pos * 0.18 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                >
                  <div className={cn('h-44 rounded-xl bg-gradient-to-br p-3', p.gradiente)}>
                    <Miniatura tipo={p.tipo} />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {p.cliente} · {p.ano}
                      </p>
                      <p className="mt-0.5 font-medium">{p.titulo}</p>
                    </div>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-3 rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium">{p.resultado}</p>
                </motion.button>
              )
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {PROJETOS.map((p, i) => (
              <span key={p.cliente} className={cn('h-1.5 rounded-full bg-muted-foreground/30 transition-all', ordem[0] === i ? 'w-6 bg-foreground' : 'w-1.5')} />
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">Em destaque: {topo.titulo}</p>
        </div>
      </div>
    </section>
  )
}
