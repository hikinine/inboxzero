'use client'

import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AlertasVariantes() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Alert>
        <Info />
        <AlertTitle>Sincronização em andamento</AlertTitle>
        <AlertDescription>Estamos importando 1.284 contatos. Isso leva cerca de 2 minutos.</AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2 className="text-emerald-500" />
        <AlertTitle>Número conectado</AlertTitle>
        <AlertDescription>O WhatsApp (11) 99999-0000 já recebe mensagens no inbox.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Pagamento recusado</AlertTitle>
        <AlertDescription>Atualize o cartão até 12/11 para manter as automações ativas.</AlertDescription>
      </Alert>
    </div>
  )
}
