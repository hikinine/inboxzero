'use client'

import { useState } from 'react'
import { Bold, Code, Italic, Quote, Strikethrough, Underline } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function ToggleFormatacao() {
  const [negrito, setNegrito] = useState(true)
  const [italico, setItalico] = useState(false)
  const [sublinhado, setSublinhado] = useState(false)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com estado e prévia</p>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center gap-1 border-b p-1.5">
            <Toggle aria-label="Negrito" pressed={negrito} onPressedChange={setNegrito}>
              <Bold />
            </Toggle>
            <Toggle aria-label="Itálico" pressed={italico} onPressedChange={setItalico}>
              <Italic />
            </Toggle>
            <Toggle aria-label="Sublinhado" pressed={sublinhado} onPressedChange={setSublinhado}>
              <Underline />
            </Toggle>
          </div>
          <p className={`p-4 text-sm ${negrito ? 'font-bold' : ''} ${italico ? 'italic' : ''} ${sublinhado ? 'underline' : ''}`}>Proposta comercial para a Lumi Tecnologia — válida até 30/10/2026.</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Contorno com rótulo</p>
        <div className="flex flex-wrap gap-2">
          <Toggle variant="outline" defaultPressed>
            <Code data-icon="inline-start" /> Código
          </Toggle>
          <Toggle variant="outline">
            <Quote data-icon="inline-start" /> Citação
          </Toggle>
          <Toggle variant="outline">
            <Strikethrough data-icon="inline-start" /> Tachado
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tamanhos</p>
        <div className="flex items-center gap-2">
          <Toggle size="sm" aria-label="Negrito pequeno" defaultPressed>
            <Bold />
          </Toggle>
          <Toggle aria-label="Negrito padrão" defaultPressed>
            <Bold />
          </Toggle>
          <Toggle size="lg" aria-label="Negrito grande" defaultPressed>
            <Bold />
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
        <div className="flex items-center gap-2">
          <Toggle disabled aria-label="Itálico (bloqueado)">
            <Italic />
          </Toggle>
          <Toggle disabled defaultPressed variant="outline">
            <Underline data-icon="inline-start" /> Sublinhado
          </Toggle>
        </div>
      </div>
    </div>
  )
}
