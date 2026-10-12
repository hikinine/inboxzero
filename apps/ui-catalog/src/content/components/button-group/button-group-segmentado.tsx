'use client'

import { useState, type ReactNode } from 'react'
import { AlignCenter, AlignLeft, AlignRight, LayoutGrid, List, Table2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'

const PERIODOS = ['Dia', 'Semana', 'Mês', 'Ano'] as const
type Periodo = (typeof PERIODOS)[number]

const VISOES = [
  { id: 'lista', icon: List, label: 'Lista' },
  { id: 'grade', icon: LayoutGrid, label: 'Grade' },
  { id: 'tabela', icon: Table2, label: 'Tabela' },
] as const
type Visao = (typeof VISOES)[number]['id']

const ALINHAMENTOS = [
  { id: 'esquerda', icon: AlignLeft, label: 'Alinhar à esquerda' },
  { id: 'centro', icon: AlignCenter, label: 'Centralizar' },
  { id: 'direita', icon: AlignRight, label: 'Alinhar à direita' },
] as const
type Alinhamento = (typeof ALINHAMENTOS)[number]['id']

export default function ButtonGroupSegmentado() {
  const [periodo, setPeriodo] = useState<Periodo>('Semana')
  const [visao, setVisao] = useState<Visao>('grade')
  const [alinhamento, setAlinhamento] = useState<Alinhamento>('esquerda')

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Período (texto)</Legenda>
        <ButtonGroup>
          {PERIODOS.map((p) => (
            <Button key={p} variant={periodo === p ? 'default' : 'outline'} aria-pressed={periodo === p} onClick={() => setPeriodo(p)}>
              {p}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <Legenda>Visualização (ícone + rótulo)</Legenda>
        <ButtonGroup>
          {VISOES.map((v) => {
            const Icon = v.icon
            const ativo = visao === v.id
            return (
              <Button
                key={v.id}
                variant="outline"
                aria-pressed={ativo}
                onClick={() => setVisao(v.id)}
                className={ativo ? 'bg-muted text-foreground' : 'text-muted-foreground'}
              >
                <Icon data-icon="inline-start" /> {v.label}
              </Button>
            )
          })}
        </ButtonGroup>
      </div>

      <div>
        <Legenda>Com texto fixo (só ícone)</Legenda>
        <ButtonGroup>
          <ButtonGroupText>Alinhar</ButtonGroupText>
          {ALINHAMENTOS.map((a) => {
            const Icon = a.icon
            const ativo = alinhamento === a.id
            return (
              <Button
                key={a.id}
                variant={ativo ? 'secondary' : 'outline'}
                size="icon"
                aria-label={a.label}
                aria-pressed={ativo}
                onClick={() => setAlinhamento(a.id)}
              >
                <Icon />
              </Button>
            )
          })}
        </ButtonGroup>
      </div>

      <div>
        <Legenda>Vertical</Legenda>
        <ButtonGroup orientation="vertical">
          {PERIODOS.slice(0, 3).map((p) => (
            <Button key={p} variant={periodo === p ? 'default' : 'outline'} className="w-28 justify-start" onClick={() => setPeriodo(p)}>
              {p}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
