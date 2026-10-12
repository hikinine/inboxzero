'use client'

import { useState, type ReactNode } from 'react'
import { CircleHelp, Mail } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function LabelComObrigatorio() {
  const [bio, setBio] = useState('Head de Vendas na Lumi.')
  return (
    <div className="grid w-full max-w-lg gap-x-6 gap-y-5 sm:grid-cols-2">
      <Demo title="Obrigatório">
        <Label htmlFor="lb-nome">
          Nome completo <span className="text-destructive">*</span>
        </Label>
        <Input id="lb-nome" required placeholder="Ana Souza" />
      </Demo>

      <Demo title="Opcional">
        <Label htmlFor="lb-apelido">
          Como quer ser chamada <span className="font-normal text-muted-foreground">(opcional)</span>
        </Label>
        <Input id="lb-apelido" placeholder="Ana" />
      </Demo>

      <Demo title="Com ajuda em tooltip">
        <Label htmlFor="lb-cnpj">
          CNPJ
          <Tooltip>
            <TooltipTrigger className="text-muted-foreground hover:text-foreground" aria-label="Por que pedimos o CNPJ">
              <CircleHelp className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Usamos o CNPJ para emitir a nota fiscal.</TooltipContent>
          </Tooltip>
        </Label>
        <Input id="lb-cnpj" placeholder="00.000.000/0000-00" />
      </Demo>

      <Demo title="Com contador">
        <Label htmlFor="lb-bio">
          Bio <span className="ml-auto text-xs font-normal text-muted-foreground tabular-nums">{bio.length}/80</span>
        </Label>
        <Input id="lb-bio" value={bio} onChange={(e) => setBio(e.target.value.slice(0, 80))} />
      </Demo>

      <Demo title="Com ícone">
        <Label htmlFor="lb-email">
          <Mail className="size-3.5 text-muted-foreground" /> E-mail de cobrança
        </Label>
        <Input id="lb-email" type="email" placeholder="financeiro@empresa.com.br" />
      </Demo>

      <Demo title="Desabilitado">
        <div className="group space-y-1.5" data-disabled="true">
          <Label htmlFor="lb-plano">Plano atual</Label>
          <Input id="lb-plano" defaultValue="Profissional" disabled />
        </div>
      </Demo>

      <Demo title="Em checkbox e switch">
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <Checkbox id="lb-news" defaultChecked />
            <Label htmlFor="lb-news" className="font-normal">
              Receber novidades por e-mail
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="lb-2fa" size="sm" />
            <Label htmlFor="lb-2fa" className="font-normal">
              Autenticação em duas etapas
            </Label>
          </div>
        </div>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
