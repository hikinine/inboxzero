'use client'

import { useState } from 'react'
import { MapPin, Navigation, Phone, Plus, Search, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Status = 'Aberta' | 'Fecha às 18h' | 'Fechada'

interface Local {
  id: string
  nome: string
  endereco: string
  cidade: string
  atendentes: number
  status: Status
  x: number
  y: number
}

const LOCAIS: Local[] = [
  { id: 'sp', nome: 'Matriz Paulista', endereco: 'Av. Paulista, 1578', cidade: 'São Paulo, SP', atendentes: 24, status: 'Aberta', x: 52, y: 58 },
  { id: 'campinas', nome: 'Unidade Campinas', endereco: 'Av. Norte-Sul, 1200', cidade: 'Campinas, SP', atendentes: 9, status: 'Aberta', x: 40, y: 47 },
  { id: 'rio', nome: 'Unidade Rio', endereco: 'Rua do Passeio, 38', cidade: 'Rio de Janeiro, RJ', atendentes: 12, status: 'Fecha às 18h', x: 71, y: 53 },
  { id: 'curitiba', nome: 'Unidade Curitiba', endereco: 'Rua XV de Novembro, 950', cidade: 'Curitiba, PR', atendentes: 6, status: 'Aberta', x: 43, y: 77 },
  { id: 'bh', nome: 'Unidade BH', endereco: 'Av. Afonso Pena, 2500', cidade: 'Belo Horizonte, MG', atendentes: 7, status: 'Fechada', x: 62, y: 32 },
]

const STATUS: Record<Status, string> = {
  Aberta: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  'Fecha às 18h': 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  Fechada: 'bg-muted text-muted-foreground',
}

function rota(a: Local, b: Local) {
  return `M ${a.x * 8} ${a.y * 5} Q ${((a.x + b.x) / 2) * 8} ${((a.y + b.y) / 2) * 5 - 30} ${b.x * 8} ${b.y * 5}`
}

export default function MapaComPins() {
  const [selecionado, setSelecionado] = useState('sp')
  const atual = LOCAIS.find((l) => l.id === selecionado) ?? LOCAIS[0]
  const sp = LOCAIS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Unidades</h2>
            <p className="text-sm text-muted-foreground">{LOCAIS.length} unidades · {LOCAIS.reduce((n, l) => n + l.atendentes, 0)} atendentes</p>
          </div>
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar cidade ou unidade" className="pl-8" aria-label="Buscar unidade" />
          </div>
          <Button size="sm">
            <Plus data-icon="inline-start" /> Nova unidade
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-muted/30">
            <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
              <defs>
                <pattern id="mapa-grade" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" className="stroke-border" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="500" fill="url(#mapa-grade)" />
              <path d="M120 70 C 230 20, 400 50, 490 110 C 580 170, 720 150, 760 250 C 790 340, 660 430, 530 440 C 420 450, 330 410, 240 430 C 130 450, 50 370, 70 270 C 90 190, 50 120, 120 70 Z" className="fill-muted/80 stroke-border" strokeWidth="1.5" />
              <path d="M300 140 C 360 120, 430 130, 470 170 C 510 210, 500 280, 440 300 C 380 320, 320 290, 300 240 C 280 200, 270 160, 300 140 Z" className="fill-muted-foreground/8" />
              <path d="M560 500 C 600 420, 720 400, 800 440 L 800 500 Z" className="fill-sky-500/10" />
              <path d="M0 420 C 60 400, 120 460, 200 500 L 0 500 Z" className="fill-sky-500/10" />
              {LOCAIS.slice(1).map((l) => (
                <path key={l.id} d={rota(sp, l)} fill="none" className={cn('stroke-muted-foreground/30', l.id === selecionado && 'stroke-primary/60')} strokeWidth="1.5" strokeDasharray="4 4" />
              ))}
            </svg>

            {LOCAIS.map((l) => {
              const ativo = l.id === selecionado
              return (
                <button key={l.id} type="button" onClick={() => setSelecionado(l.id)} aria-label={l.nome} aria-pressed={ativo} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${l.x}%`, top: `${l.y}%` }}>
                  <motion.span className={cn('absolute bottom-0 left-1/2 size-5 -translate-x-1/2 translate-y-1/2 rounded-full', ativo ? 'bg-primary/40' : 'bg-primary/25')} animate={{ scale: [1, 2.4], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
                  <span className={cn('relative block rotate-[-45deg] rounded-[50%_50%_50%_0] bg-primary shadow-md ring-2 ring-background transition-all', ativo ? 'size-8' : 'size-6')}>
                    <span className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground', ativo ? 'size-3' : 'size-2')} />
                  </span>
                  {ativo && <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background shadow">{l.nome}</span>}
                </button>
              )
            })}

            <div className="absolute right-3 bottom-3 flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
              <button type="button" className="px-2.5 py-1 text-sm hover:bg-muted" aria-label="Aumentar zoom">
                +
              </button>
              <button type="button" className="border-t px-2.5 py-1 text-sm hover:bg-muted" aria-label="Diminuir zoom">
                −
              </button>
            </div>
            <div className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2 py-1 text-[10px] text-muted-foreground shadow-sm">Sudeste e Sul · mapa ilustrativo</div>
          </div>

          <div className="space-y-2">
            {LOCAIS.map((l) => {
              const ativo = l.id === selecionado
              return (
                <button key={l.id} type="button" onClick={() => setSelecionado(l.id)} className={cn('flex w-full items-start gap-3 rounded-xl border bg-card p-3 text-left transition-colors hover:bg-muted/50', ativo && 'border-primary ring-1 ring-primary')}>
                  <span className={cn('mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg', ativo ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                    <MapPin className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{l.nome}</span>
                      <span className={cn('ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium', STATUS[l.status])}>{l.status}</span>
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {l.endereco} · {l.cidade}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="size-3" /> {l.atendentes} atendentes
                    </span>
                  </span>
                </button>
              )
            })}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone data-icon="inline-start" /> Ligar
              </Button>
              <Button size="sm" className="flex-1">
                <Navigation data-icon="inline-start" /> Rota até {atual.nome.replace('Unidade ', '')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
