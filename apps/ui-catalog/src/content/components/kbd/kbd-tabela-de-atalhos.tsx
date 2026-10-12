'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Plataforma = 'mac' | 'win'

interface Atalho {
  acao: string
  mac: string[]
  win: string[]
  sequencia?: boolean
}

const GRUPOS: { nome: string; atalhos: Atalho[] }[] = [
  {
    nome: 'Geral',
    atalhos: [
      { acao: 'Busca global', mac: ['⌘', 'K'], win: ['Ctrl', 'K'] },
      { acao: 'Novo negócio', mac: ['⌘', 'N'], win: ['Ctrl', 'N'] },
      { acao: 'Salvar', mac: ['⌘', 'S'], win: ['Ctrl', 'S'] },
      { acao: 'Ver todos os atalhos', mac: ['?'], win: ['?'] },
    ],
  },
  {
    nome: 'Navegação',
    atalhos: [
      { acao: 'Ir para a inbox', mac: ['G', 'I'], win: ['G', 'I'], sequencia: true },
      { acao: 'Ir para o pipeline', mac: ['G', 'P'], win: ['G', 'P'], sequencia: true },
      { acao: 'Alternar barra lateral', mac: ['⌘', 'B'], win: ['Ctrl', 'B'] },
    ],
  },
  {
    nome: 'Conversa',
    atalhos: [
      { acao: 'Enviar mensagem', mac: ['⌘', '↵'], win: ['Ctrl', 'Enter'] },
      { acao: 'Arquivar', mac: ['E'], win: ['E'] },
      { acao: 'Atribuir a alguém', mac: ['⇧', 'A'], win: ['Shift', 'A'] },
      { acao: 'Inserir resposta rápida', mac: ['/'], win: ['/'] },
    ],
  },
]

function Teclas({ a, plataforma }: { a: Atalho; plataforma: Plataforma }) {
  const keys = plataforma === 'mac' ? a.mac : a.win
  return (
    <KbdGroup>
      {keys.map((k, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-[10px] text-muted-foreground">{a.sequencia ? 'então' : '+'}</span>}
          <Kbd className="min-w-6 border border-b-2">{k}</Kbd>
        </span>
      ))}
    </KbdGroup>
  )
}

const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

export default function KbdTabelaDeAtalhos() {
  const [plataforma, setPlataforma] = useState<Plataforma>('mac')
  const [busca, setBusca] = useState('')

  const grupos = GRUPOS.map((g) => ({ ...g, atalhos: g.atalhos.filter((a) => normalizar(a.acao).includes(normalizar(busca))) })).filter((g) => g.atalhos.length > 0)

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Filtrar atalhos…" aria-label="Filtrar atalhos" className="pl-8" />
        </div>
        <ToggleGroup
          value={[plataforma]}
          onValueChange={(v) => {
            const p = v[0]
            if (p === 'mac' || p === 'win') setPlataforma(p)
          }}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label="Plataforma"
        >
          <ToggleGroupItem value="mac">macOS</ToggleGroupItem>
          <ToggleGroupItem value="win">Windows</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Ação</TableHead>
            <TableHead className="pr-4 text-right">Atalho</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grupos.map((g) => (
            <GrupoLinhas key={g.nome} nome={g.nome} atalhos={g.atalhos} plataforma={plataforma} />
          ))}
          {grupos.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="py-8 text-center text-muted-foreground">
                Nenhum atalho para “{busca}”.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center gap-2 border-t bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
        Pressione <Kbd>?</Kbd> em qualquer tela para abrir esta tabela.
      </div>
    </div>
  )
}

function GrupoLinhas({ nome, atalhos, plataforma }: { nome: string; atalhos: Atalho[]; plataforma: Plataforma }) {
  return (
    <>
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={2} className="bg-muted/40 py-1.5 pl-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          {nome}
        </TableCell>
      </TableRow>
      {atalhos.map((a) => (
        <TableRow key={a.acao}>
          <TableCell className="pl-4">{a.acao}</TableCell>
          <TableCell className="pr-4 text-right">
            <Teclas a={a} plataforma={plataforma} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
