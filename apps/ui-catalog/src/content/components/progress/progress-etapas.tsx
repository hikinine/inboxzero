'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ETAPAS = ['Dados pessoais', 'Endereço', 'Pagamento', 'Revisão', 'Confirmação']
const CHECKOUT = ['Carrinho', 'Entrega', 'Pagamento', 'Concluído']

export default function ProgressEtapas() {
  const [step, setStep] = useState(2)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Segmentos interativos</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{ETAPAS[step - 1]}</span>
          <span className="tabular-nums text-muted-foreground">
            Passo {step} de {ETAPAS.length}
          </span>
        </div>
        <div className="flex gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={ETAPAS.length} aria-label="Etapas do cadastro">
          {ETAPAS.map((e, i) => (
            <span key={e} className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            <ArrowLeft data-icon="inline-start" /> Voltar
          </Button>
          <Button size="sm" disabled={step === ETAPAS.length} onClick={() => setStep((s) => Math.min(ETAPAS.length, s + 1))}>
            Avançar <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com rótulos</p>
        <div className="grid grid-cols-4 gap-2">
          {CHECKOUT.map((l, i) => (
            <div key={l} className="space-y-1.5">
              <span className="block h-1 overflow-hidden rounded-full bg-muted">
                <span className={`block h-full bg-emerald-500 ${i < 2 ? 'w-full' : i === 2 ? 'w-1/2' : 'w-0'}`} />
              </span>
              <span className={`block text-xs ${i <= 2 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Pontos compactos</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={`size-2 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">4 de 6 lições concluídas</span>
        </div>
      </div>
    </div>
  )
}
