'use client'

import { useState } from 'react'
import { Check, Pipette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const SWATCHES = [
  { name: 'Vermelho', cls: 'bg-red-500', hex: '#EF4444' },
  { name: 'Laranja', cls: 'bg-orange-500', hex: '#F97316' },
  { name: 'Âmbar', cls: 'bg-amber-500', hex: '#F59E0B' },
  { name: 'Lima', cls: 'bg-lime-500', hex: '#84CC16' },
  { name: 'Esmeralda', cls: 'bg-emerald-500', hex: '#10B981' },
  { name: 'Ciano', cls: 'bg-cyan-500', hex: '#06B6D4' },
  { name: 'Céu', cls: 'bg-sky-500', hex: '#0EA5E9' },
  { name: 'Azul', cls: 'bg-blue-500', hex: '#3B82F6' },
  { name: 'Índigo', cls: 'bg-indigo-500', hex: '#6366F1' },
  { name: 'Violeta', cls: 'bg-violet-500', hex: '#8B5CF6' },
  { name: 'Rosa', cls: 'bg-pink-500', hex: '#EC4899' },
  { name: 'Ardósia', cls: 'bg-slate-500', hex: '#64748B' },
] as const

function Paleta({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {SWATCHES.map((s) => (
          <button
            key={s.hex}
            type="button"
            aria-label={s.name}
            title={s.name}
            onClick={() => onChange(s.hex)}
            className={`flex size-8 items-center justify-center rounded-md ${s.cls} ring-offset-2 ring-offset-background transition hover:scale-105 ${value === s.hex ? 'ring-2 ring-foreground' : ''}`}
          >
            {value === s.hex && <Check className="size-4 text-white" />}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="size-7 shrink-0 rounded-md border" style={{ backgroundColor: value }} aria-hidden />
        <Input value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} className="h-7 font-mono text-xs" aria-label="Cor em hexadecimal" />
        <Button variant="outline" size="icon-sm" aria-label="Conta-gotas">
          <Pipette />
        </Button>
      </div>
    </div>
  )
}

export default function PopoverSeletorCor() {
  const [color, setColor] = useState<string>('#6366F1')
  const current = SWATCHES.find((s) => s.hex === color)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Gatilho</p>
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <span className={`size-4 rounded-sm ${current?.cls ?? ''}`} style={current ? undefined : { backgroundColor: color }} aria-hidden />
              <span className="font-mono text-xs">{color}</span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-3">
              <Paleta value={color} onChange={setColor} />
            </PopoverContent>
          </Popover>
          <span className="text-sm text-muted-foreground">Cor da marca · {current?.name ?? 'Personalizada'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Conteúdo (inline)</p>
        <div className="w-64 rounded-lg bg-popover p-3 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <Paleta value={color} onChange={setColor} />
          <div className="mt-3 border-t pt-3">
            <p className="mb-2 text-xs text-muted-foreground">Recentes</p>
            <div className="flex gap-1.5">
              {SWATCHES.slice(4, 10).map((s) => (
                <button key={s.hex} type="button" aria-label={s.name} onClick={() => setColor(s.hex)} className={`size-5 rounded-full ${s.cls} ring-offset-background transition hover:scale-110 ${color === s.hex ? 'ring-2 ring-foreground ring-offset-1' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
