'use client'

import type { ReactNode } from 'react'
import { Archive, CircleCheck, OctagonX, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster, toast } from '@/components/ui/toast'

function ToastInline({ icon, titulo, desc, acao, progresso }: { icon: ReactNode; titulo: string; desc?: string; acao?: string; progresso?: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg">
      <span className="shrink-0 [&_svg]:size-4">{icon}</span>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium">{titulo}</p>
        {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
        {progresso !== undefined && (
          <div className="flex items-center gap-2 pt-1">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${progresso}%` }} />
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">{progresso}%</span>
          </div>
        )}
      </div>
      {acao && (
        <Button variant="outline" size="sm" className="shrink-0">
          {acao}
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" aria-label="Fechar" className="shrink-0 text-muted-foreground">
        <X />
      </Button>
    </div>
  )
}

export default function ToastVariantes() {
  const comAcao = () => {
    const id = toast.add({
      title: 'Conversa arquivada',
      description: 'Você pode desfazer nos próximos 5 segundos.',
      timeout: 5000,
      actionProps: { children: 'Desfazer', onClick: () => toast.close(id) },
    })
  }

  return (
    <Toaster>
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Disparar um toast real</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.add({ type: 'success', title: 'Contato salvo', description: 'Ana Souza entrou na lista Leads quentes.' })}>
              Sucesso
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.add({ type: 'error', title: 'Falha ao enviar', description: 'O WhatsApp não respondeu. Tente de novo.' })}>
              Erro
            </Button>
            <Button variant="outline" size="sm" onClick={comAcao}>
              Com ação
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.promise(new Promise<void>((resolve) => setTimeout(resolve, 1800)), { loading: 'Exportando relatório…', success: 'Relatório exportado', error: 'Não foi possível exportar' })}>
              Promessa
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Variações (inline)</p>
          <div className="space-y-3">
            <ToastInline icon={<CircleCheck className="text-emerald-500" />} titulo="Pagamento confirmado" desc="Pix de R$ 1.290,00 recebido às 09:15." />
            <ToastInline icon={<OctagonX className="text-destructive" />} titulo="Não foi possível salvar" desc="Verifique a conexão e tente novamente." />
            <ToastInline icon={<Archive className="text-muted-foreground" />} titulo="Conversa arquivada" acao="Desfazer" />
            <ToastInline icon={<Upload className="text-primary" />} titulo="Enviando contatos.csv" desc="1.284 linhas · 2,1 MB" progresso={68} />
          </div>
        </div>
      </div>
    </Toaster>
  )
}
