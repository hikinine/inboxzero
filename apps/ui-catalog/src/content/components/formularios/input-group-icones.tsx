'use client'

import { useState } from 'react'
import { Eye, EyeOff, Link2, Mail, Search } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'

export default function InputGroupIcones() {
  const [show, setShow] = useState(false)
  const [bio, setBio] = useState('Cuido do time comercial.')
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="busca">Busca</Label>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput id="busca" placeholder="Buscar contatos…" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="site">Site</Label>
        <InputGroup>
          <InputGroupText>https://</InputGroupText>
          <InputGroupInput id="site" placeholder="suaempresa.com.br" />
          <InputGroupAddon align="inline-end">
            <Link2 />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <InputGroup>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="voce@empresa.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs" variant="secondary">
              Verificar
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="senha">Senha</Label>
        <InputGroup>
          <InputGroupInput id="senha" type={show ? 'text' : 'password'} placeholder="••••••••" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="ghost" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShow((s) => !s)}>
              {show ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <InputGroup>
          <InputGroupTextarea id="bio" value={bio} onChange={(e) => setBio(e.target.value.slice(0, 120))} rows={3} />
          <InputGroupAddon align="block-end">
            <InputGroupText className="ml-auto tabular-nums">{bio.length}/120</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
