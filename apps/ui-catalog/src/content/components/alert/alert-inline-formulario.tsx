'use client'

import { useState } from 'react'
import { CircleAlert, CircleCheck, Info, Plus, TriangleAlert, Users } from 'lucide-react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const LIMITE = 10
const EM_USO = 7
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AlertInlineFormulario() {
  const [email, setEmail] = useState('ana.souza@lumi')
  const [extras, setExtras] = useState<string[]>(['bruno@rochaefilhos.com.br'])
  const total = EM_USO + 1 + extras.length
  const restantes = LIMITE - total
  const emailInvalido = email.length > 0 && !EMAIL.test(email)
  const interno = EMAIL.test(email) && email.endsWith('@lumi.com.br')
  const tom = restantes <= 0 ? 'erro' : restantes <= 2 ? 'aviso' : 'ok'

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Convidar para a equipe</CardTitle>
        <CardDescription>Os convidados recebem um link válido por 7 dias.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="conv-email">E-mail</Label>
          <Input
            id="conv-email"
            type="email"
            value={email}
            aria-invalid={emailInvalido || undefined}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@empresa.com.br"
          />
          {emailInvalido && (
            <Alert variant="destructive" className="border-destructive/30 bg-destructive/5 px-2 py-1.5">
              <CircleAlert />
              <AlertTitle className="text-xs">E-mail incompleto</AlertTitle>
              <AlertDescription className="text-xs">Inclua o domínio, por exemplo ana@lumi.com.br.</AlertDescription>
            </Alert>
          )}
          {interno && (
            <Alert className="border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5 text-emerald-700 dark:text-emerald-400">
              <CircleCheck />
              <AlertTitle className="text-xs">Domínio verificado</AlertTitle>
              <AlertDescription className="text-xs">Pessoas @lumi.com.br entram sem aprovação manual.</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="conv-funcao">Função</Label>
          <NativeSelect id="conv-funcao" defaultValue="atendente" className="w-full">
            <NativeSelectOption value="admin">Administrador</NativeSelectOption>
            <NativeSelectOption value="gestor">Gestor</NativeSelectOption>
            <NativeSelectOption value="atendente">Atendente</NativeSelectOption>
          </NativeSelect>
          <Alert className="border-transparent bg-muted/60 px-2 py-1.5">
            <Info />
            <AlertDescription className="text-xs">Atendentes veem só as conversas das filas em que estão.</AlertDescription>
          </Alert>
        </div>

        {extras.length > 0 && (
          <ul className="space-y-1 text-sm">
            {extras.map((e) => (
              <li key={e} className="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5">
                <span className="truncate">{e}</span>
                <Button variant="ghost" size="xs" onClick={() => setExtras((a) => a.filter((x) => x !== e))}>
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          disabled={restantes <= 0}
          onClick={() => setExtras((a) => [...a, `convidado${a.length + 2}@parceiro.com.br`])}
        >
          <Plus data-icon="inline-start" /> Adicionar outro
        </Button>

        <Alert
          className={cn(
            'px-2.5 py-2',
            tom === 'erro' && 'border-destructive/30 bg-destructive/5 text-destructive',
            tom === 'aviso' && 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400',
          )}
        >
          {tom === 'erro' ? <TriangleAlert /> : <Users />}
          <AlertTitle className="text-xs">{tom === 'erro' ? 'Limite do plano atingido' : `${total} de ${LIMITE} assentos em uso`}</AlertTitle>
          <AlertDescription className="text-xs">
            <span className="block">
              {tom === 'erro' ? 'Remova um convite ou aumente o limite para continuar.' : `Restam ${restantes} assento${restantes === 1 ? '' : 's'} no plano Pro.`}
            </span>
            <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-foreground/10">
              <span
                className={cn('block h-full rounded-full', tom === 'erro' ? 'bg-destructive' : tom === 'aviso' ? 'bg-amber-500' : 'bg-primary')}
                style={{ width: `${Math.min(100, (total / LIMITE) * 100)}%` }}
              />
            </span>
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" size="xs">
              Aumentar
            </Button>
          </AlertAction>
        </Alert>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button disabled={emailInvalido || !email || restantes < 0}>
          Enviar {1 + extras.length} convite{extras.length ? 's' : ''}
        </Button>
      </CardFooter>
    </Card>
  )
}
