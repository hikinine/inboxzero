'use client'

import { useEffect, useState } from 'react'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'

const STATUS = [
  { label: 'Importação de contatos', value: 100, cls: '[&_[data-slot=progress-indicator]]:bg-emerald-500' },
  { label: 'Cota de armazenamento', value: 82, cls: '[&_[data-slot=progress-indicator]]:bg-amber-500' },
  { label: 'Falhas de envio (24 h)', value: 23, cls: '[&_[data-slot=progress-indicator]]:bg-rose-500' },
]

export default function ProgressLinearRotulo() {
  const [upload, setUpload] = useState(12)

  useEffect(() => {
    const id = setInterval(() => setUpload((v) => (v >= 100 ? 100 : v + 2)), 120)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com rótulo e porcentagem</p>
        <Progress value={upload}>
          <ProgressLabel>Enviando 3 arquivos</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Cores de status</p>
        <div className="space-y-4">
          {STATUS.map((s) => (
            <Progress key={s.label} value={s.value} className={s.cls}>
              <ProgressLabel className="text-xs font-normal">{s.label}</ProgressLabel>
              <ProgressValue className="text-xs" />
            </Progress>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Espessa, sem rótulo</p>
        <Progress value={58} aria-label="Progresso do curso" className="[&_[data-slot=progress-track]]:h-2.5" />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Indeterminada</p>
        <Progress value={null} className="[&_[data-slot=progress-indicator]]:w-2/5 [&_[data-slot=progress-indicator]]:animate-pulse [&_[data-slot=progress-indicator]]:rounded-full">
          <ProgressLabel className="text-xs font-normal text-muted-foreground">Processando planilha…</ProgressLabel>
        </Progress>
      </div>
    </div>
  )
}
