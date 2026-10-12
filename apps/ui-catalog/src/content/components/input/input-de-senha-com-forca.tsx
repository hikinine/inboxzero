'use client'

import { useState } from 'react'
import { Check, CircleCheck, CircleX, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const REGRAS = [
  { id: 'tam', label: '8+ caracteres', ok: (s: string) => s.length >= 8 },
  { id: 'mai', label: 'Maiúscula', ok: (s: string) => /[A-Z]/.test(s) },
  { id: 'num', label: 'Número', ok: (s: string) => /\d/.test(s) },
  { id: 'sim', label: 'Símbolo', ok: (s: string) => /[^\w\s]/.test(s) },
] as const

const NIVEIS = [
  { label: 'Digite uma senha', cor: 'bg-muted', texto: 'text-muted-foreground' },
  { label: 'Muito fraca', cor: 'bg-rose-500', texto: 'text-rose-600 dark:text-rose-400' },
  { label: 'Fraca', cor: 'bg-amber-500', texto: 'text-amber-600 dark:text-amber-400' },
  { label: 'Boa', cor: 'bg-emerald-500', texto: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Forte', cor: 'bg-emerald-600', texto: 'text-emerald-700 dark:text-emerald-300' },
] as const

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*'

function gerarSenha(tamanho = 14) {
  let out = ''
  for (let i = 0; i < tamanho; i++) out += ALFABETO[Math.floor(Math.random() * ALFABETO.length)]
  return out
}

const pontosDe = (s: string) => REGRAS.filter((r) => r.ok(s)).length

export default function InputDeSenhaComForca() {
  const [senha, setSenha] = useState('Lumi2026')
  const [confirma, setConfirma] = useState('Lumi2026')
  const [mostrar, setMostrar] = useState(false)
  const [compacta, setCompacta] = useState('kavo@Pix!2026')

  const pontos = pontosDe(senha)
  const nivel = NIVEIS[pontos]
  const confere = confirma.length > 0 && confirma === senha
  const pontosCompacta = pontosDe(compacta)

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Medidor de quatro níveis com requisitos</p>
        <div className="space-y-1.5">
          <Label htmlFor="pw-nova" className="justify-between">
            Nova senha
            <span className={cn('text-xs font-normal', nivel.texto)}>{nivel.label}</span>
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <KeyRound />
            </InputGroupAddon>
            <InputGroupInput id="pw-nova" type={mostrar ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setMostrar((m) => !m)}>
                {mostrar ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex gap-1" role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={pontos} aria-label="Força da senha">
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={cn('h-1.5 flex-1 rounded-full bg-muted transition-colors duration-300', n <= pontos && nivel.cor)} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {REGRAS.map((r) => {
            const ok = r.ok(senha)
            return (
              <span key={r.id} className={cn('inline-flex h-6 items-center gap-1 rounded-full border px-2 text-xs transition-colors', ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'text-muted-foreground')}>
                {ok ? <Check className="size-3" /> : <span className="size-1.5 rounded-full bg-muted-foreground/50" aria-hidden />}
                {r.label}
              </span>
            )
          })}
          <Button
            variant="ghost"
            size="xs"
            className="ml-auto"
            onClick={() => {
              const s = gerarSenha()
              setSenha(s)
              setConfirma('')
              setMostrar(true)
            }}
          >
            <Sparkles data-icon="inline-start" /> Gerar senha forte
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Confirmação</p>
        <Label htmlFor="pw-confirma">Confirmar senha</Label>
        <div className="relative">
          <Input id="pw-confirma" type={mostrar ? 'text' : 'password'} value={confirma} onChange={(e) => setConfirma(e.target.value)} aria-invalid={confirma ? !confere : undefined} className="pr-8" autoComplete="new-password" />
          {confirma && (
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2">
              {confere ? <CircleCheck className="size-4 text-emerald-500" /> : <CircleX className="size-4 text-destructive" />}
            </span>
          )}
        </div>
        <p className={cn('text-xs', confirma && !confere ? 'text-destructive' : 'text-muted-foreground')}>{!confirma ? 'Repita a senha escolhida acima.' : confere ? 'As senhas conferem.' : 'As senhas não conferem.'}</p>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Compacta, nível dentro do campo</p>
        <Label htmlFor="pw-compacta">Senha</Label>
        <InputGroup className={cn(pontosCompacta >= 3 && 'border-emerald-500/60', pontosCompacta > 0 && pontosCompacta < 3 && 'border-amber-500/60')}>
          <InputGroupInput id="pw-compacta" type="password" value={compacta} onChange={(e) => setCompacta(e.target.value)} />
          <InputGroupAddon align="inline-end">
            <InputGroupText className={cn('text-xs', NIVEIS[pontosCompacta].texto)}>
              <span className={cn('size-1.5 rounded-full', NIVEIS[pontosCompacta].cor)} aria-hidden /> {NIVEIS[pontosCompacta].label}
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
