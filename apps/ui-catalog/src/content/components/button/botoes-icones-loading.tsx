'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Download, Mail, Plus, Save, Search, Settings, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type Estado = 'idle' | 'saving' | 'saved'

export default function BotoesIconesLoading() {
  const [estado, setEstado] = useState<Estado>('idle')

  // Simula uma requisição: "Salvando…" → "Salvo" → volta ao normal.
  useEffect(() => {
    if (estado === 'idle') return
    const t = setTimeout(() => setEstado((e) => (e === 'saving' ? 'saved' : 'idle')), estado === 'saving' ? 1400 : 1800)
    return () => clearTimeout(t)
  }, [estado])

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Row title="Ícone no início e no fim">
        <Button>
          <Mail data-icon="inline-start" /> Enviar e-mail
        </Button>
        <Button variant="secondary">
          <Download data-icon="inline-start" /> Exportar CSV
        </Button>
        <Button variant="outline">
          Próximo passo <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="link">
          Ver relatório <ArrowRight data-icon="inline-end" />
        </Button>
      </Row>

      <Row title="Só ícone (quatro tamanhos e variantes)">
        <Button size="icon-xs" variant="outline" aria-label="Adicionar">
          <Plus />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Buscar">
          <Search />
        </Button>
        <Button size="icon" variant="outline" aria-label="Configurações">
          <Settings />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Excluir" className="text-destructive hover:text-destructive">
          <Trash2 />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button size="icon" aria-label="Adicionar">
          <Plus />
        </Button>
        <Button size="icon" variant="secondary" aria-label="Buscar">
          <Search />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Configurações">
          <Settings />
        </Button>
      </Row>

      <Row title="Loading">
        <Button disabled>
          <Spinner /> Processando…
        </Button>
        <Button variant="outline" disabled>
          <Spinner /> Sincronizando
        </Button>
        <Button size="icon" variant="outline" disabled aria-label="Carregando">
          <Spinner />
        </Button>
        <Button onClick={() => setEstado('saving')} disabled={estado !== 'idle'} className="min-w-28">
          {estado === 'saving' ? (
            <>
              <Spinner /> Salvando…
            </>
          ) : estado === 'saved' ? (
            <>
              <Check data-icon="inline-start" /> Salvo
            </>
          ) : (
            <>
              <Save data-icon="inline-start" /> Salvar
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">← clique para simular</span>
      </Row>

      <Row title="Desabilitado">
        <Button disabled>Primário</Button>
        <Button variant="secondary" disabled>
          Secundário
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="destructive" disabled>
          <Trash2 data-icon="inline-start" /> Excluir
        </Button>
      </Row>
    </div>
  )
}

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
