'use client'

import { useState } from 'react'
import { Check, Copy, Globe, Link2, Lock, Mail, QrCode, Share2, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

type Acesso = 'restrito' | 'link' | 'publico'

const ACESSO: Record<Acesso, { label: string; desc: string; Icon: typeof Lock }> = {
  restrito: { label: 'Restrito', desc: 'Só quem foi convidado abre.', Icon: Lock },
  link: { label: 'Qualquer pessoa com o link', desc: 'Sem precisar de conta.', Icon: Link2 },
  publico: { label: 'Público na web', desc: 'Indexado por buscadores.', Icon: Globe },
}

const PESSOAS = [
  { ini: 'AS', nome: 'Ana Souza', email: 'ana@lumi.com.br', papel: 'dono' },
  { ini: 'BR', nome: 'Bruno Rocha', email: 'bruno@lumi.com.br', papel: 'editar' },
  { ini: 'CM', nome: 'Carla Mendes', email: 'carla@kavo.com.br', papel: 'ver' },
]

function Painel({ prefix }: { prefix: string }) {
  const [acesso, setAcesso] = useState<Acesso>('link')
  const [copiado, setCopiado] = useState(false)
  const [email, setEmail] = useState('')
  const A = ACESSO[acesso]

  const copiar = () => {
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  return (
    <div className="space-y-3 text-sm">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setEmail('')
        }}
      >
        <Label htmlFor={`${prefix}-convite`} className="sr-only">
          Convidar por e-mail
        </Label>
        <Input id={`${prefix}-convite`} type="email" placeholder="Convidar por e-mail…" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" variant="secondary" disabled={!email.includes('@')}>
          Convidar
        </Button>
      </form>

      <div className="space-y-2">
        {PESSOAS.map((p) => (
          <div key={p.email} className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>{p.ini}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-xs font-medium">{p.nome}</div>
              <div className="truncate text-[11px] text-muted-foreground">{p.email}</div>
            </div>
            {p.papel === 'dono' ? (
              <span className="text-xs text-muted-foreground">Dono</span>
            ) : (
              <NativeSelect size="sm" defaultValue={p.papel} aria-label={`Permissão de ${p.nome}`}>
                <NativeSelectOption value="editar">Pode editar</NativeSelectOption>
                <NativeSelectOption value="comentar">Pode comentar</NativeSelectOption>
                <NativeSelectOption value="ver">Pode ver</NativeSelectOption>
              </NativeSelect>
            )}
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <A.Icon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <NativeSelect size="sm" value={acesso} onChange={(e) => setAcesso(e.target.value as Acesso)} aria-label="Acesso geral" className="[&_select]:h-6 [&_select]:border-0 [&_select]:bg-transparent [&_select]:px-0 [&_select]:pr-6 [&_select]:text-sm [&_select]:font-medium [&_svg]:right-1">
            {(Object.keys(ACESSO) as Acesso[]).map((k) => (
              <NativeSelectOption key={k} value={k}>
                {ACESSO[k].label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <div className="text-[11px] text-muted-foreground">{A.desc}</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t pt-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={copiar}>
          {copiado ? <Check data-icon="inline-start" className="text-emerald-500" /> : <Copy data-icon="inline-start" />} {copiado ? 'Link copiado' : 'Copiar link'}
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Enviar por e-mail">
          <Mail />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Mostrar QR code">
          <QrCode />
        </Button>
      </div>
    </div>
  )
}

export default function PopoverDeCompartilhar() {
  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Gatilho na barra do documento</p>
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Proposta comercial — Kavo</div>
            <div className="text-xs text-muted-foreground">Editado há 3 min · 3 pessoas</div>
          </div>
          <Popover>
            <PopoverTrigger render={<Button size="sm" />}>
              <Share2 data-icon="inline-start" /> Compartilhar
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 gap-3 p-4">
              <PopoverHeader>
                <PopoverTitle className="flex items-center gap-2">
                  <Users className="size-4" /> Compartilhar proposta
                </PopoverTitle>
                <PopoverDescription>Convide pessoas ou copie o link.</PopoverDescription>
              </PopoverHeader>
              <Painel prefix="pop" />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Conteúdo (inline)</p>
        <div className="w-80 max-w-full space-y-3 rounded-lg bg-popover p-4 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="space-y-0.5">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Users className="size-4" /> Compartilhar proposta
            </p>
            <p className="text-sm text-muted-foreground">Convide pessoas ou copie o link.</p>
          </div>
          <Painel prefix="inline" />
        </div>
      </div>
    </div>
  )
}
