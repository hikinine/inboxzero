'use client'

import { useState, type ReactNode } from 'react'
import { AtSign, CheckCircle2, Eye, EyeOff, Mail, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

const ICONE_ESQ = 'pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground'
const ICONE_DIR = 'absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground'

export default function InputComIcones() {
  const [busca, setBusca] = useState('propostas em aberto')
  const [senha, setSenha] = useState('lumi@2026')
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className="grid w-full max-w-lg gap-x-6 gap-y-5 sm:grid-cols-2">
      <Campo label="Ícone à esquerda" htmlFor="ic-busca">
        <div className="relative">
          <Search className={ICONE_ESQ} />
          <Input id="ic-busca" placeholder="Buscar…" className="pl-8" />
        </div>
      </Campo>

      <Campo label="Ícone à direita" htmlFor="ic-email">
        <div className="relative">
          <Input id="ic-email" type="email" placeholder="voce@empresa.com.br" className="pr-8" />
          <Mail className={`${ICONE_DIR} pointer-events-none`} />
        </div>
      </Campo>

      <Campo label="Com botão limpar" htmlFor="ic-limpar">
        <div className="relative">
          <Search className={ICONE_ESQ} />
          <Input id="ic-limpar" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Filtrar resultados" className="px-8" />
          {busca && (
            <button type="button" onClick={() => setBusca('')} aria-label="Limpar" className={`${ICONE_DIR} flex items-center justify-center rounded-sm hover:text-foreground`}>
              <X className="size-4" />
            </button>
          )}
        </div>
      </Campo>

      <Campo label="Senha com olho" htmlFor="ic-senha">
        <div className="relative">
          <Input id="ic-senha" type={mostrar ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} className="pr-8" />
          <button type="button" onClick={() => setMostrar((m) => !m)} aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'} className={`${ICONE_DIR} flex items-center justify-center hover:text-foreground`}>
            {mostrar ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Campo>

      <Campo label="Carregando" htmlFor="ic-user">
        <div className="relative">
          <AtSign className={ICONE_ESQ} />
          <Input id="ic-user" defaultValue="anasouza" className="px-8" />
          <Spinner className={`${ICONE_DIR} pointer-events-none`} />
        </div>
        <p className="text-xs text-muted-foreground">Verificando disponibilidade…</p>
      </Campo>

      <Campo label="Sucesso" htmlFor="ic-ok">
        <div className="relative">
          <AtSign className={ICONE_ESQ} />
          <Input id="ic-ok" defaultValue="ana.souza" className="border-emerald-500/60 px-8 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30" />
          <CheckCircle2 className={`${ICONE_DIR} pointer-events-none text-emerald-500`} />
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">Nome de usuário disponível.</p>
      </Campo>
    </div>
  )
}

function Campo({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <Label htmlFor={htmlFor} className="sr-only">
        {label}
      </Label>
      {children}
    </div>
  )
}
