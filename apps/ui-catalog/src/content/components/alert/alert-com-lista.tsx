'use client'

import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, CircleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const ERROS = ['CPF inválido na linha 12', 'E-mail duplicado: joao@lumi.com.br', 'Telefone sem DDD na linha 40']
const PENDENCIAS = ['Confirmar o domínio de envio', 'Conectar o número do WhatsApp', 'Convidar pelo menos um atendente']
const RESUMO = [
  { label: 'Importados', valor: '1.284' },
  { label: 'Atualizados', valor: '312' },
  { label: 'Ignorados', valor: '7' },
]

export default function AlertComLista() {
  return (
    <div className="w-full max-w-md space-y-5">
      <div>
        <Legenda>Erro com lista de problemas</Legenda>
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Não foi possível importar a planilha</AlertTitle>
          <AlertDescription>
            <p className="mb-1!">Corrija os itens abaixo e envie novamente:</p>
            <ul className="list-disc space-y-0.5 pl-4">
              {ERROS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Legenda>Pendências numeradas</Legenda>
        <Alert>
          <CircleAlert className="text-amber-500" />
          <AlertTitle>Faltam 3 passos para ativar o envio</AlertTitle>
          <AlertDescription>
            <ul className="mt-1 space-y-1.5">
              {PENDENCIAS.map((p, i) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium text-foreground">
                    {i + 1}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Legenda>Resumo em lista</Legenda>
        <Alert>
          <CheckCircle2 className="text-emerald-500" />
          <AlertTitle>Importação concluída</AlertTitle>
          <AlertDescription className="w-full">
            <ul className="mt-1 divide-y">
              {RESUMO.map((r) => (
                <li key={r.label} className="flex justify-between py-1">
                  <span>{r.label}</span>
                  <span className="font-medium tabular-nums text-foreground">{r.valor}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
