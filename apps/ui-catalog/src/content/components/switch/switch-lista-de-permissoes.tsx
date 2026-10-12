'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Acao = 'ver' | 'editar' | 'excluir'
type Permissoes = Record<Acao, boolean>

const MODULOS = [
  { id: 'negocios', nome: 'Negócios', desc: 'Pipeline, propostas e valores' },
  { id: 'contatos', nome: 'Contatos', desc: 'Leads, empresas e histórico' },
  { id: 'relatorios', nome: 'Relatórios', desc: 'Métricas e exportações' },
]
const ACOES: { id: Acao; label: string }[] = [
  { id: 'ver', label: 'Ver' },
  { id: 'editar', label: 'Editar' },
  { id: 'excluir', label: 'Excluir' },
]

const INICIAL: Record<string, Permissoes> = {
  negocios: { ver: true, editar: true, excluir: false },
  contatos: { ver: true, editar: true, excluir: true },
  relatorios: { ver: true, editar: false, excluir: false },
}

// Editar exige Ver; Excluir exige Editar (e Ver). Desligar um nível desliga os acima dele.
function aplicar(p: Permissoes, acao: Acao, on: boolean): Permissoes {
  if (on) {
    if (acao === 'ver') return { ...p, ver: true }
    if (acao === 'editar') return { ...p, ver: true, editar: true }
    return { ver: true, editar: true, excluir: true }
  }
  if (acao === 'ver') return { ver: false, editar: false, excluir: false }
  if (acao === 'editar') return { ...p, editar: false, excluir: false }
  return { ...p, excluir: false }
}

export default function SwitchListaDePermissoes() {
  const [perm, setPerm] = useState(INICIAL)
  const [admin, setAdmin] = useState(false)

  const ativas = admin ? MODULOS.length * ACOES.length : Object.values(perm).reduce((a, p) => a + Object.values(p).filter(Boolean).length, 0)
  const total = MODULOS.length * ACOES.length

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <div>
          <div className="text-sm font-medium">Permissões de Bruno Rocha</div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {ativas} de {total} permissões ativas
          </div>
        </div>
        <Label htmlFor="perm-admin" className={cn('flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-normal transition-colors', admin && 'border-primary bg-primary/5')}>
          <ShieldCheck className={cn('size-4', admin ? 'text-primary' : 'text-muted-foreground')} /> Administrador
          <Switch id="perm-admin" size="sm" checked={admin} onCheckedChange={setAdmin} />
        </Label>
      </div>

      <div className="grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-x-2 border-b bg-muted/40 px-4 py-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        <span>Módulo</span>
        {ACOES.map((a) => (
          <span key={a.id} className="text-center">
            {a.label}
          </span>
        ))}
      </div>

      <div className={cn('divide-y', admin && 'opacity-60')}>
        {MODULOS.map((m) => {
          const p = perm[m.id]!
          return (
            <div key={m.id} className="grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-x-2 px-4 py-3">
              <div>
                <div className="text-sm font-medium">{m.nome}</div>
                <div className="text-xs text-muted-foreground">{m.desc}</div>
              </div>
              {ACOES.map((a) => (
                <div key={a.id} className="flex justify-center">
                  <Switch size="sm" aria-label={`${a.label} ${m.nome}`} checked={admin || p[a.id]} disabled={admin} onCheckedChange={(on) => setPerm((s) => ({ ...s, [m.id]: aplicar(p, a.id, on) }))} />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <p className="border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">{admin ? 'Administradores têm acesso total; as permissões individuais ficam bloqueadas.' : 'Editar depende de Ver, e Excluir depende de Editar — os níveis se ajustam sozinhos.'}</p>
    </div>
  )
}
