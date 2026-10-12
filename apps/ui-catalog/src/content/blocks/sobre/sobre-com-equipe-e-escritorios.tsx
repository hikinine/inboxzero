'use client'

import { useState } from 'react'
import { Building2, Globe, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Contorno aproximado do Brasil em [longitude, latitude], sentido horário a partir do extremo norte.
const CONTORNO: Array<[number, number]> = [
  [-60.0, 5.2], [-56.5, 1.9], [-54.0, 2.3], [-51.6, 4.2], [-50.0, 1.7], [-48.5, -0.5], [-46.0, -1.0], [-44.3, -2.5], [-41.5, -2.9], [-38.5, -3.7],
  [-35.2, -5.8], [-34.8, -7.1], [-34.9, -8.1], [-35.7, -9.7], [-37.0, -11.0], [-38.5, -13.0], [-39.0, -15.0], [-39.0, -17.7], [-39.7, -19.0], [-40.3, -20.3],
  [-41.0, -21.7], [-43.2, -22.9], [-44.7, -23.3], [-46.3, -23.95], [-48.0, -25.5], [-48.6, -26.9], [-48.5, -27.6], [-48.8, -28.6], [-49.9, -29.8], [-50.4, -30.5],
  [-51.5, -31.8], [-52.3, -32.7], [-53.4, -33.7], [-55.0, -31.0], [-57.5, -30.2], [-57.6, -29.0], [-55.7, -28.0], [-55.5, -27.3], [-54.3, -25.6], [-54.5, -24.1],
  [-55.5, -23.9], [-55.8, -22.3], [-57.8, -22.1], [-58.1, -20.2], [-57.7, -18.0], [-58.4, -16.4], [-60.2, -15.1], [-60.5, -13.8], [-62.0, -13.0], [-64.0, -12.5],
  [-65.3, -11.5], [-67.5, -10.5], [-69.5, -11.0], [-70.6, -9.4], [-72.4, -9.5], [-73.7, -7.5], [-72.8, -5.1], [-70.5, -4.2], [-69.9, -4.4], [-69.4, -1.5],
  [-70.0, 0.5], [-69.5, 1.1], [-67.0, 1.9], [-66.9, 1.2], [-66.0, 0.7], [-64.0, 1.6], [-63.4, 2.4], [-64.6, 4.1], [-62.5, 4.0], [-60.7, 5.2],
]

const TAM = 400

function projetar(lon: number, lat: number): [number, number] {
  return [((lon + 75) / 42) * TAM, ((6 - lat) / 42) * TAM]
}

const POLIGONO = CONTORNO.map(([lon, lat]) => projetar(lon, lat))

function dentro(x: number, y: number): boolean {
  let d = false
  for (let i = 0, j = POLIGONO.length - 1; i < POLIGONO.length; j = i++) {
    const a = POLIGONO[i]
    const b = POLIGONO[j]
    if (!a || !b) continue
    const [xi, yi] = a
    const [xj, yj] = b
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d
  }
  return d
}

const PASSO = 9
const PONTOS: Array<[number, number]> = []
for (let y = PASSO / 2; y < TAM; y += PASSO) {
  for (let x = PASSO / 2; x < TAM; x += PASSO) {
    if (dentro(x, y)) PONTOS.push([x, y])
  }
}

interface Escritorio {
  id: string
  cidade: string
  uf: string
  endereco: string
  pessoas: number
  sede?: boolean
  lon: number
  lat: number
  rotulo: 'direita' | 'esquerda'
}

const ESCRITORIOS: Escritorio[] = [
  { id: 'sp', cidade: 'São Paulo', uf: 'SP', endereco: 'Av. Paulista, 1578 · 12º andar', pessoas: 64, sede: true, lon: -46.63, lat: -23.55, rotulo: 'direita' },
  { id: 'floripa', cidade: 'Florianópolis', uf: 'SC', endereco: 'Rod. José Carlos Daux, 5500 · Saco Grande', pessoas: 38, lon: -48.55, lat: -27.6, rotulo: 'esquerda' },
  { id: 'recife', cidade: 'Recife', uf: 'PE', endereco: 'Porto Digital · Rua do Apolo, 181', pessoas: 22, lon: -34.88, lat: -8.05, rotulo: 'esquerda' },
  { id: 'bh', cidade: 'Belo Horizonte', uf: 'MG', endereco: 'Rua Paraíba, 1000 · Savassi', pessoas: 16, lon: -43.94, lat: -19.92, rotulo: 'direita' },
]

export default function SobreComEquipeEEscritorios() {
  const [ativo, setAtivo] = useState('sp')
  const total = ESCRITORIOS.reduce((acc, e) => acc + e.pessoas, 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Onde estamos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quatro escritórios, um time só</h2>
          <p className="mt-3 text-muted-foreground">{total} pessoas nos escritórios e mais 40 em modelo remoto, espalhadas por 11 estados. Todo trimestre o time inteiro se encontra em uma das cidades.</p>
          <div className="mt-6 flex items-center gap-3">
            <AvatarGroup>
              {['MD', 'RN', 'BC', 'DA'].map((i) => (
                <Avatar key={i}>
                  <AvatarFallback>{i}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+136</AvatarGroupCount>
            </AvatarGroup>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="size-4" /> 140 pessoas
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {ESCRITORIOS.map((e) => {
              const sel = e.id === ativo
              return (
                <li key={e.id}>
                  <button type="button" onClick={() => setAtivo(e.id)} aria-pressed={sel} className={cn('w-full rounded-xl border bg-card p-4 text-left transition-colors', sel ? 'border-primary ring-1 ring-primary' : 'hover:border-foreground/20')}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">
                        {e.cidade} <span className="text-xs font-normal text-muted-foreground">{e.uf}</span>
                      </p>
                      {e.sede ? <Badge>Sede</Badge> : <Building2 className="size-4 text-muted-foreground" />}
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{e.endereco}</p>
                    <p className="mt-3 text-sm tabular-nums">
                      <span className="font-medium">{e.pessoas}</span> <span className="text-muted-foreground">pessoas</span>
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Globe className="size-3.5" /> E mais 40 pessoas em modelo remoto, de Manaus a Pelotas.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <svg viewBox={`0 0 ${TAM} ${TAM}`} className="size-full" aria-hidden="true">
            {PONTOS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" className="fill-foreground/15" />
            ))}
          </svg>
          {ESCRITORIOS.map((e) => {
            const [x, y] = projetar(e.lon, e.lat)
            const sel = e.id === ativo
            return (
              <button key={e.id} type="button" onClick={() => setAtivo(e.id)} aria-label={`Escritório de ${e.cidade}`} aria-pressed={sel} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / TAM) * 100}%`, top: `${(y / TAM) * 100}%` }}>
                <span className="relative flex size-5 items-center justify-center">
                  {sel && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
                  <span className={cn('relative size-3 rounded-full ring-2 ring-background transition-colors', sel ? 'bg-primary' : 'bg-foreground/60')} />
                </span>
                <span className={cn('pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors', e.rotulo === 'direita' ? 'left-full ml-1' : 'right-full mr-1', sel ? 'bg-foreground text-background' : 'text-muted-foreground')}>
                  {e.cidade}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
