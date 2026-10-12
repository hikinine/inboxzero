'use client'

import { useState } from 'react'
import { SunDim, SunMedium, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const primeiro = (v: number | readonly number[]) => (typeof v === 'number' ? v : (v[0] ?? 0))

const BANDAS = [
  { id: 'graves', label: 'Graves', inicial: 4 },
  { id: 'medios', label: 'Médios', inicial: 0 },
  { id: 'agudos', label: 'Agudos', inicial: -3 },
]

export default function SliderVolumeEBrilho() {
  const [volume, setVolume] = useState(62)
  const [anterior, setAnterior] = useState(62)
  const [brilho, setBrilho] = useState(70)
  const [eq, setEq] = useState<Record<string, number>>(Object.fromEntries(BANDAS.map((b) => [b.id, b.inicial])))

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2
  const silenciar = () => {
    if (volume === 0) setVolume(anterior || 50)
    else {
      setAnterior(volume)
      setVolume(0)
    }
  }

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="sl-volume">Volume</Label>
          <span className={cn('text-sm tabular-nums', volume === 0 ? 'text-muted-foreground' : 'font-medium')}>{volume === 0 ? 'Mudo' : `${volume}%`}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" aria-label={volume === 0 ? 'Ativar som' : 'Silenciar'} onClick={silenciar} className="shrink-0">
            <VolumeIcon />
          </Button>
          <Slider id="sl-volume" value={[volume]} onValueChange={(v) => setVolume(primeiro(v))} min={0} max={100} step={1} aria-label="Volume" />
          <Volume2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="sl-brilho">Brilho da tela</Label>
          <span className="text-sm font-medium tabular-nums">{brilho}%</span>
        </div>
        <div className="flex items-center gap-3">
          <SunDim className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <Slider id="sl-brilho" value={[brilho]} onValueChange={(v) => setBrilho(primeiro(v))} min={10} max={100} step={5} aria-label="Brilho" className="[&_[data-slot=slider-range]]:bg-amber-500 [&_[data-slot=slider-thumb]]:border-amber-500" />
          <SunMedium className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </div>
        <div className="h-20 overflow-hidden rounded-lg border">
          <div className="h-full w-full bg-gradient-to-br from-sky-400 via-violet-400 to-rose-400 transition-[filter]" style={{ filter: `brightness(${0.35 + (brilho / 100) * 0.75})` }} aria-hidden />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Equalizador</Label>
          <Button variant="ghost" size="xs" onClick={() => setEq(Object.fromEntries(BANDAS.map((b) => [b.id, 0])))}>
            Zerar
          </Button>
        </div>
        <div className="flex justify-around rounded-xl border bg-card px-4 py-4">
          {BANDAS.map((b) => {
            const v = eq[b.id] ?? 0
            return (
              <div key={b.id} className="flex flex-col items-center gap-2">
                <span className={cn('text-xs tabular-nums', v === 0 ? 'text-muted-foreground' : 'font-medium')}>
                  {v > 0 ? '+' : ''}
                  {v} dB
                </span>
                <div className="h-44">
                  <Slider orientation="vertical" value={[v]} onValueChange={(x) => setEq((m) => ({ ...m, [b.id]: primeiro(x) }))} min={-12} max={12} step={1} aria-label={b.label} />
                </div>
                <span className="text-xs text-muted-foreground">{b.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
