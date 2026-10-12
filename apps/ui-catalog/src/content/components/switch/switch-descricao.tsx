'use client'

import { useState } from 'react'
import { Moon, Shield, Sparkles, type LucideIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const PREFS = [
  { id: 'email', titulo: 'Notificações por e-mail', desc: 'Resumo diário e alertas de negócios parados.' },
  { id: 'dois-fatores', titulo: 'Autenticação em dois fatores', desc: 'Pede um código do app a cada novo login.' },
  { id: 'ia', titulo: 'Sugestões da IA', desc: 'Rascunhos de resposta e resumo das conversas.' },
]

const PEQUENOS: { id: string; titulo: string; Icon: LucideIcon; on: boolean }[] = [
  { id: 'escuro', titulo: 'Modo escuro', Icon: Moon, on: true },
  { id: 'privado', titulo: 'Modo privado', Icon: Shield, on: false },
]

export default function SwitchDescricao() {
  const [on, setOn] = useState<Record<string, boolean>>({ email: true, 'dois-fatores': false, ia: true })
  const [anual, setAnual] = useState(true)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com título e descrição</p>
        <div className="divide-y rounded-xl border bg-card">
          {PREFS.map((p) => (
            <div key={p.id} className="flex items-start justify-between gap-4 p-4">
              <div className="space-y-1">
                <Label htmlFor={`sw-${p.id}`}>{p.titulo}</Label>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Switch id={`sw-${p.id}`} checked={on[p.id] ?? false} onCheckedChange={(c) => setOn((s) => ({ ...s, [p.id]: c }))} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tamanho pequeno, com ícone</p>
        <div className="space-y-3">
          {PEQUENOS.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <Label htmlFor={`sm-${p.id}`} className="font-normal">
                <p.Icon className="size-4 text-muted-foreground" /> {p.titulo}
              </Label>
              <Switch id={`sm-${p.id}`} size="sm" defaultChecked={p.on} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch id="sw-d1" disabled defaultChecked />
            <Label htmlFor="sw-d1" className="font-normal text-muted-foreground">
              Ligado
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw-d2" disabled />
            <Label htmlFor="sw-d2" className="font-normal text-muted-foreground">
              Desligado
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Em card com estado</p>
        <label className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${anual ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
          <span className="flex items-center gap-2 text-sm">
            <Sparkles className="size-4 text-primary" /> Cobrança anual
            <span className="text-xs text-muted-foreground">2 meses grátis</span>
          </span>
          <Switch checked={anual} onCheckedChange={setAnual} aria-label="Cobrança anual" />
        </label>
      </div>
    </div>
  )
}
