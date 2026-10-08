'use client'

import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Spinner } from '@/components/ui/spinner'

const VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const

export default function BotoesVariantes() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <Row title="Variantes">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </Row>
      <Row title="Tamanhos">
        {SIZES.map((s) => (
          <Button key={s} size={s} variant="outline">
            {s}
          </Button>
        ))}
        <Button size="icon" variant="outline" aria-label="Adicionar">
          <Plus />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Excluir">
          <Trash2 />
        </Button>
      </Row>
      <Row title="Com ícone e estados">
        <Button>
          <Download data-icon="inline-start" /> Baixar relatório
        </Button>
        <Button variant="secondary">
          Continuar <ArrowRight data-icon="inline-end" />
        </Button>
        <Button disabled>
          <Spinner /> Salvando…
        </Button>
        <Button variant="destructive">
          <Trash2 data-icon="inline-start" /> Remover
        </Button>
      </Row>
      <Row title="Grupo">
        <ButtonGroup>
          <Button variant="outline">Dia</Button>
          <Button variant="outline">Semana</Button>
          <Button variant="outline">Mês</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Ano</Button>
        </ButtonGroup>
      </Row>
    </div>
  )
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
