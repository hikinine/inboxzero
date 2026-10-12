'use client'

import { useState } from 'react'
import { Check, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Passo {
  titulo: string
  desc: string
  quando?: string
}

const ONBOARDING: Passo[] = [
  { titulo: 'Criar conta', desc: 'Conta criada com ana@acme.com.br.' },
  { titulo: 'Conectar WhatsApp', desc: 'Número (11) 9 8765-4321 verificado.' },
  { titulo: 'Importar contatos', desc: 'Envie uma planilha CSV ou conecte o CRM atual.' },
  { titulo: 'Convidar equipe', desc: 'Adicione atendentes e defina permissões.' },
  { titulo: 'Primeira automação', desc: 'Responda leads automaticamente fora do horário.' },
]

const SUPORTE: Passo[] = [
  { titulo: 'Chamado aberto', desc: 'Erro ao exportar relatório mensal.', quando: '09:12' },
  { titulo: 'Em análise', desc: 'Bruno Rocha assumiu o atendimento.', quando: '09:40' },
  { titulo: 'Resolvido', desc: 'Aguardando sua confirmação.', quando: '—' },
]

type Estado = 'done' | 'current' | 'pending'
const estadoDe = (i: number, atual: number): Estado => (i < atual ? 'done' : i === atual ? 'current' : 'pending')

const MARCADOR: Record<Estado, string> = {
  done: 'border-primary bg-primary text-primary-foreground',
  current: 'border-primary bg-background text-primary ring-4 ring-primary/15',
  pending: 'border-border bg-background text-muted-foreground',
}

export default function StepperVertical() {
  const [atual, setAtual] = useState(2)
  const avancar = () => setAtual((a) => Math.min(ONBOARDING.length, a + 1))

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Onboarding com ação na etapa atual</p>
          <span className="text-xs tabular-nums text-muted-foreground">
            {Math.min(atual, ONBOARDING.length)} de {ONBOARDING.length}
          </span>
        </div>
        <ol>
          {ONBOARDING.map((p, i) => {
            const estado = estadoDe(i, atual)
            const ultimo = i === ONBOARDING.length - 1
            return (
              <li key={p.titulo} className="relative flex gap-4 pb-6 last:pb-0">
                {!ultimo && <span className={`absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5 ${i < atual ? 'bg-primary' : 'bg-border'}`} aria-hidden />}
                <span className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium ${MARCADOR[estado]}`} aria-current={estado === 'current' ? 'step' : undefined}>
                  {estado === 'done' ? <Check className="size-4" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1 pt-1.5">
                  <div className={`text-sm leading-none ${estado === 'pending' ? 'text-muted-foreground' : 'font-medium'}`}>{p.titulo}</div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{p.desc}</p>
                  {estado === 'current' && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={avancar}>
                        <Upload data-icon="inline-start" /> Importar CSV
                      </Button>
                      <Button size="sm" variant="ghost" onClick={avancar}>
                        Pular
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
        {atual >= ONBOARDING.length && (
          <Button variant="outline" size="sm" onClick={() => setAtual(2)}>
            Reiniciar demonstração
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Compacto com horário</p>
        <ol className="rounded-xl border bg-card p-4">
          {SUPORTE.map((p, i) => {
            const estado = estadoDe(i, 1)
            const ultimo = i === SUPORTE.length - 1
            return (
              <li key={p.titulo} className="relative flex gap-3 pb-4 last:pb-0">
                {!ultimo && <span className={`absolute top-6 left-[11px] h-[calc(100%-1.5rem)] w-0.5 ${i < 1 ? 'bg-primary' : 'bg-border'}`} aria-hidden />}
                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-medium ${MARCADOR[estado]}`}>{estado === 'done' ? <Check className="size-3" /> : i + 1}</span>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pt-0.5">
                  <div>
                    <div className={`text-sm leading-none ${estado === 'pending' ? 'text-muted-foreground' : 'font-medium'}`}>{p.titulo}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{p.quando}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
