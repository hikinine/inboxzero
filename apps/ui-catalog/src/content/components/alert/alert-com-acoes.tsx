'use client'

import { useState, type ReactNode } from 'react'
import { Archive, CloudUpload, CreditCard, RotateCcw } from 'lucide-react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export default function AlertComAcoes() {
  const [arquivado, setArquivado] = useState(true)
  return (
    <div className="w-full max-w-md space-y-5">
      <div>
        <Legenda>Com desfazer</Legenda>
        <Alert>
          <Archive />
          <AlertTitle>{arquivado ? 'Contato arquivado' : 'Contato restaurado'}</AlertTitle>
          <AlertDescription>
            {arquivado ? 'Ana Souza saiu da lista de leads ativos.' : 'Ana Souza voltou para a lista de leads ativos.'}
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" size="xs" onClick={() => setArquivado((v) => !v)}>
              {arquivado ? (
                <>
                  <RotateCcw data-icon="inline-start" /> Desfazer
                </>
              ) : (
                'Arquivar'
              )}
            </Button>
          </AlertAction>
        </Alert>
      </div>

      <div>
        <Legenda>Com link de detalhes</Legenda>
        <Alert variant="destructive">
          <CreditCard />
          <AlertTitle>Cobrança recusada</AlertTitle>
          <AlertDescription>O cartão final 4242 foi recusado pela operadora.</AlertDescription>
          <AlertAction>
            <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
              Ver detalhes
            </Button>
          </AlertAction>
        </Alert>
      </div>

      <div>
        <Legenda>Ações no rodapé</Legenda>
        <Alert>
          <CloudUpload />
          <AlertTitle>Nova versão disponível</AlertTitle>
          <AlertDescription>A versão 2.5 traz relatórios por canal e correções no inbox.</AlertDescription>
          <div className="col-start-2 mt-2 flex gap-2">
            <Button size="xs">Atualizar agora</Button>
            <Button size="xs" variant="ghost">
              Depois
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
