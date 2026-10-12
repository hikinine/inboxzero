'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const MAX = 280

export default function TextareaContador() {
  const [mensagem, setMensagem] = useState('Olá, Ana! Vi que você se interessou pelo plano Pro. Posso te mostrar a automação de WhatsApp em 10 minutos?')
  const [bio, setBio] = useState('')
  const [motivo, setMotivo] = useState('')
  const restante = MAX - mensagem.length
  const tom = restante === 0 ? 'text-destructive' : restante <= 40 ? 'text-amber-600 dark:text-amber-400' : ''

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com contador de caracteres</p>
        <Label htmlFor="ta-msg">Mensagem</Label>
        <InputGroup>
          <InputGroupTextarea id="ta-msg" rows={3} maxLength={MAX} value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
          <InputGroupAddon align="block-end" className="justify-between border-t">
            <InputGroupText className={`text-xs tabular-nums ${tom}`}>
              {mensagem.length}/{MAX}
            </InputGroupText>
            <InputGroupButton variant="default">
              <Send data-icon="inline-start" /> Enviar
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Cresce com o texto</p>
        <Label htmlFor="ta-bio">Bio</Label>
        <Textarea id="ta-bio" rows={2} placeholder="Conte um pouco sobre você…" value={bio} onChange={(e) => setBio(e.target.value)} className="max-h-48" />
        <p className="text-xs text-muted-foreground">Começa com duas linhas e acompanha o conteúdo até 12 rem de altura.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com erro</p>
        <Label htmlFor="ta-motivo">Motivo do cancelamento</Label>
        <Textarea id="ta-motivo" rows={2} aria-invalid={motivo.trim().length < 10} value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Descreva em pelo menos 10 caracteres" />
        {motivo.trim().length < 10 && <p className="text-xs text-destructive">Conte um pouco mais para a gente melhorar.</p>}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
        <Label htmlFor="ta-obs" className="text-muted-foreground">
          Observações internas
        </Label>
        <Textarea id="ta-obs" rows={2} disabled defaultValue="Somente administradores podem editar este campo." />
      </div>
    </div>
  )
}
