'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Globe, MapPin, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const INICIO = 8 // 08h
const FIM = 19 // 19h
const PX_HORA = 64
const OFF = 32 // espaço do cabeçalho de fusos

interface Evento {
  titulo: string
  inicio: number // minutos desde 00:00 (horário de Brasília)
  fim: number
  local: string
  online?: boolean
  pessoas: string[]
  cor: string
}

const EVENTOS: Evento[] = [
  { titulo: 'Daily do time de produto', inicio: 9 * 60, fim: 9 * 60 + 15, local: 'Google Meet', online: true, pessoas: ['LR', 'MS', 'TA'], cor: 'border-sky-500 bg-sky-500/10' },
  { titulo: 'Revisão do checkout com o jurídico', inicio: 10 * 60, fim: 11 * 60 + 30, local: 'Sala Ipê · 4º andar', pessoas: ['FC', 'RD'], cor: 'border-violet-500 bg-violet-500/10' },
  { titulo: 'Almoço com a Nuvem Pay', inicio: 12 * 60 + 30, fim: 13 * 60 + 45, local: 'Restaurante Mocotó', pessoas: ['JB'], cor: 'border-amber-500 bg-amber-500/10' },
  { titulo: 'Entrevista — designer sênior', inicio: 14 * 60, fim: 15 * 60, local: 'Zoom', online: true, pessoas: ['CA', 'LR'], cor: 'border-emerald-500 bg-emerald-500/10' },
  { titulo: 'Bloco de foco: roadmap Q4', inicio: 15 * 60 + 30, fim: 17 * 60 + 30, local: 'Sem interrupções', pessoas: [], cor: 'border-muted-foreground/40 bg-muted' },
  { titulo: '1:1 com a Fernanda', inicio: 17 * 60 + 45, fim: 18 * 60 + 15, local: 'Google Meet', online: true, pessoas: ['FC'], cor: 'border-rose-500 bg-rose-500/10' },
]

const FUSOS = [
  { id: 'sp', nome: 'São Paulo (GMT−3)', delta: 0 },
  { id: 'lis', nome: 'Lisboa (GMT+1)', delta: 4 },
  { id: 'ny', nome: 'Nova York (GMT−4)', delta: -1 },
] as const

type FusoId = (typeof FUSOS)[number]['id']

const hhmm = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export default function AgendaDoDiaComAgora() {
  const [agora, setAgora] = useState(14 * 60 + 22) // simulado: 14h22
  const [fusoId, setFusoId] = useState<FusoId>('lis')
  const fuso = FUSOS.find((f) => f.id === fusoId) ?? FUSOS[0]

  useEffect(() => {
    const id = window.setInterval(() => setAgora((m) => (m >= FIM * 60 ? INICIO * 60 + 30 : m + 1)), 1500)
    return () => window.clearInterval(id)
  }, [])

  const topo = (min: number) => ((min - INICIO * 60) / 60) * PX_HORA
  const atual = EVENTOS.find((e) => agora >= e.inicio && agora < e.fim)
  const proximo = EVENTOS.find((e) => e.inicio > agora)
  const horas = Array.from({ length: FIM - INICIO + 1 }, (_, i) => INICIO + i)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Terça-feira</p>
              <h2 className="text-xl font-semibold tracking-tight">14 de outubro</h2>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Dia anterior">
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="sm">
                Hoje
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Próximo dia">
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="max-h-[520px] overflow-y-auto">
            <div className="relative" style={{ height: (FIM - INICIO) * PX_HORA + 16 + OFF }}>
              <div className="absolute inset-x-0 top-0 flex h-6 items-center text-[10px] font-medium text-muted-foreground uppercase">
                <span className="w-[52px] pr-2 text-right">BRT</span>
                <span className="w-[52px] pr-2 text-right text-muted-foreground/60">{fuso.id === 'sp' ? '' : fuso.id === 'lis' ? 'LIS' : 'NY'}</span>
              </div>
              {horas.map((h) => (
                <div key={h} className="absolute inset-x-0 flex items-start" style={{ top: topo(h * 60) + OFF }}>
                  <span className="w-[52px] -translate-y-1/2 pr-2 text-right text-[11px] text-muted-foreground tabular-nums">{String(h).padStart(2, '0')}:00</span>
                  <span className="w-[52px] -translate-y-1/2 pr-2 text-right text-[11px] text-muted-foreground/60 tabular-nums">{fuso.delta !== 0 ? hhmm((h + fuso.delta) * 60) : ''}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
              ))}

              {EVENTOS.map((e) => {
                const passado = e.fim <= agora
                const curto = e.fim - e.inicio <= 30
                return (
                  <div
                    key={e.titulo}
                    className={cn('absolute right-3 left-[112px] overflow-hidden rounded-lg border-l-4 px-3 py-1.5 transition-opacity', e.cor, passado && 'opacity-50')}
                    style={{ top: topo(e.inicio) + OFF + 1, height: ((e.fim - e.inicio) / 60) * PX_HORA - 2 }}
                  >
                    <div className={cn('flex gap-2', curto ? 'items-center' : 'flex-col')}>
                      <p className="truncate text-sm font-medium">{e.titulo}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        {hhmm(e.inicio)}–{hhmm(e.fim)}
                        {!curto && (
                          <>
                            <span>·</span>
                            {e.online ? <Video className="size-3" /> : <MapPin className="size-3" />}
                            {e.local}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}

              <motion.div className="pointer-events-none absolute right-0 left-[44px] z-10 flex items-center" animate={{ top: topo(agora) + OFF }} transition={{ type: 'spring', stiffness: 80, damping: 20 }}>
                <span className="-translate-y-1/2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white tabular-nums">{hhmm(agora)}</span>
                <span className="relative -translate-y-1/2">
                  <span className="absolute -top-[4px] -left-[4px] size-2 rounded-full bg-rose-500" />
                </span>
                <span className="h-0.5 flex-1 -translate-y-1/2 bg-rose-500" />
              </motion.div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-card p-5">
            <label htmlFor="agenda-fuso" className="flex items-center gap-2 text-sm font-medium">
              <Globe className="size-4 text-muted-foreground" /> Segundo fuso
            </label>
            <NativeSelect id="agenda-fuso" className="mt-3 w-full" value={fusoId} onChange={(e) => setFusoId(e.target.value as FusoId)}>
              {FUSOS.map((f) => (
                <NativeSelectOption key={f.id} value={f.id}>
                  {f.nome}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {fuso.delta !== 0 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Agora são <span className="font-medium text-foreground tabular-nums">{hhmm(agora + fuso.delta * 60)}</span> em {fuso.nome.split(' (')[0]}.
              </p>
            )}
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{atual ? 'Acontecendo agora' : 'Livre agora'}</p>
            {atual ? (
              <>
                <p className="mt-2 font-medium">{atual.titulo}</p>
                <p className="text-sm text-muted-foreground">termina em {atual.fim - agora} min</p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Nenhum compromisso neste horário.</p>
            )}
            {proximo && (
              <div className="mt-4 border-t pt-4">
                <p className="text-xs text-muted-foreground">Próximo em {proximo.inicio - agora} min</p>
                <p className="mt-1 text-sm font-medium">{proximo.titulo}</p>
                {proximo.pessoas.length > 0 && (
                  <AvatarGroup className="mt-3">
                    {proximo.pessoas.map((p) => (
                      <Avatar key={p} size="sm">
                        <AvatarFallback className="text-[10px]">{p}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                )}
                {proximo.online && (
                  <Button size="sm" className="mt-4 w-full">
                    <Video data-icon="inline-start" /> Entrar na chamada
                  </Button>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
