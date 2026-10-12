'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const ROTULOS = ['Toque para avaliar', 'Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente']
const CINCO = [1, 2, 3, 4, 5]

// fill de 0 a 1 — 0.5 desenha meia estrela recortando a versão preenchida
function Estrela({ fill, size = 'size-5' }: { fill: number; size?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${size}`} aria-hidden>
      <Star className={`absolute inset-0 ${size} text-muted-foreground/30`} />
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.round(Math.min(1, Math.max(0, fill)) * 100)}%` }}>
        <Star className={`${size} fill-amber-400 text-amber-400`} />
      </span>
    </span>
  )
}

function Estrelas({ valor, size }: { valor: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${valor.toFixed(1).replace('.', ',')} de 5 estrelas`}>
      {CINCO.map((i) => (
        <Estrela key={i} fill={valor - (i - 1)} size={size} />
      ))}
    </span>
  )
}

export default function RatingEstrelas() {
  const [valor, setValor] = useState(4)
  const [hover, setHover] = useState(0)
  const ativo = hover || valor

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Interativo</p>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Sua avaliação" onMouseLeave={() => setHover(0)}>
          {CINCO.map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={valor === i}
              aria-label={`${i} ${i === 1 ? 'estrela' : 'estrelas'}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => setValor(i)}
              className="rounded-sm outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <Star className={`size-7 transition-colors ${i <= ativo ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">{ROTULOS[ativo]}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Somente leitura</p>
        <div className="flex items-center gap-2">
          <Estrelas valor={4} />
          <span className="text-sm font-medium">4,0</span>
          <span className="text-sm text-muted-foreground">· 128 avaliações</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Meia estrela</p>
        <div className="flex items-center gap-2">
          <Estrelas valor={3.5} />
          <span className="text-sm font-medium">3,5</span>
          <span className="text-sm text-muted-foreground">· Fone Bluetooth Pulse</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Compacto e tamanhos</p>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="secondary">
            <Star className="fill-amber-400 text-amber-400" /> 4,8
          </Badge>
          <Estrelas valor={4.8} size="size-3.5" />
          <Estrelas valor={2} size="size-6" />
        </div>
      </div>
    </div>
  )
}
