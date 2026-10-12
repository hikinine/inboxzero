'use client'

import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Bell, Cloud, Headset, Shield, Users, Zap } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

const ADDONS = [
  { id: 'usuarios', icon: Users, titulo: 'Usuários extras', desc: '5 assentos adicionais para a equipe', preco: 'R$ 29/mês' },
  { id: 'armazenamento', icon: Cloud, titulo: 'Armazenamento 1 TB', desc: 'Anexos e gravações sem limite prático', preco: 'R$ 19/mês' },
  { id: 'suporte', icon: Headset, titulo: 'Suporte prioritário', desc: 'Resposta em até 1 hora, 7 dias por semana', preco: 'R$ 49/mês' },
]

const INTERESSES = [
  { id: 'auto', icon: Zap, label: 'Automações' },
  { id: 'seg', icon: Shield, label: 'Segurança' },
  { id: 'notif', icon: Bell, label: 'Notificações' },
  { id: 'equipe', icon: Users, label: 'Equipe' },
]

function alternar(set: Dispatch<SetStateAction<string[]>>, id: string, v: boolean) {
  set((a) => (v ? (a.includes(id) ? a : [...a, id]) : a.filter((x) => x !== id)))
}

export default function CheckboxEmCards() {
  const [addons, setAddons] = useState<string[]>(['suporte'])
  const [interesses, setInteresses] = useState<string[]>(['auto', 'seg'])

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Add-ons do plano</Legenda>
        <div className="space-y-2">
          {ADDONS.map((a) => {
            const on = addons.includes(a.id)
            const Icon = a.icon
            return (
              <label
                key={a.id}
                htmlFor={`addon-${a.id}`}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${on ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
              >
                <Checkbox id={`addon-${a.id}`} className="mt-0.5" checked={on} onCheckedChange={(v) => alternar(setAddons, a.id, v)} />
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{a.titulo}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
                <div className="text-sm font-medium tabular-nums">{a.preco}</div>
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <Legenda>Grade de interesses</Legenda>
        <div className="grid grid-cols-2 gap-2">
          {INTERESSES.map((i) => {
            const on = interesses.includes(i.id)
            const Icon = i.icon
            return (
              <label
                key={i.id}
                htmlFor={`int-${i.id}`}
                className={`relative flex cursor-pointer flex-col gap-2 rounded-xl border p-3 transition-colors ${on ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
              >
                <Checkbox id={`int-${i.id}`} className="absolute right-3 top-3" checked={on} onCheckedChange={(v) => alternar(setInteresses, i.id, v)} />
                <Icon className={`size-5 ${on ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{i.label}</span>
              </label>
            )
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{interesses.length} de {INTERESSES.length} selecionados</p>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
