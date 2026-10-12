'use client'

import type { ReactNode } from 'react'
import { PenSquare, Save, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Atalho {
  desc: string
  keys: string[]
  sequencia?: boolean
}

const GRUPOS: { nome: string; atalhos: Atalho[] }[] = [
  {
    nome: 'Geral',
    atalhos: [
      { desc: 'Abrir busca', keys: ['⌘', 'K'] },
      { desc: 'Salvar', keys: ['⌘', 'S'] },
      { desc: 'Paleta de comandos', keys: ['⇧', '⌘', 'P'] },
      { desc: 'Fechar painel', keys: ['Esc'] },
    ],
  },
  {
    nome: 'Navegação',
    atalhos: [
      { desc: 'Ir para a inbox', keys: ['G', 'I'], sequencia: true },
      { desc: 'Ir para contatos', keys: ['G', 'C'], sequencia: true },
      { desc: 'Próximo / anterior', keys: ['J', 'K'] },
    ],
  },
  {
    nome: 'Edição',
    atalhos: [
      { desc: 'Enviar mensagem', keys: ['⌘', '↵'] },
      { desc: 'Desfazer', keys: ['⌘', 'Z'] },
      { desc: 'Negrito', keys: ['⌘', 'B'] },
    ],
  },
]

function Teclas({ a }: { a: Atalho }) {
  return (
    <KbdGroup>
      {a.keys.map((k, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-[10px] text-muted-foreground">{a.sequencia ? 'depois' : '+'}</span>}
          <Kbd>{k}</Kbd>
        </span>
      ))}
    </KbdGroup>
  )
}

export default function KbdAtalhos() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Lista de atalhos">
        <div className="divide-y rounded-xl border bg-card">
          {GRUPOS.map((g) => (
            <div key={g.nome} className="py-2">
              <div className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{g.nome}</div>
              {g.atalhos.map((a) => (
                <div key={a.desc} className="flex items-center justify-between px-4 py-1.5 text-sm">
                  <span>{a.desc}</span>
                  <Teclas a={a} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Demo>

      <Demo title="No texto, em botões e em tooltip">
        <div className="space-y-3 rounded-xl border bg-card p-4 text-sm">
          <p className="text-muted-foreground">
            Pressione <Kbd>⌘</Kbd> <Kbd>K</Kbd> para buscar em qualquer tela, ou <Kbd>?</Kbd> para ver todos os atalhos.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">
              <Save data-icon="inline-start" /> Salvar <Kbd className="ml-1">⌘S</Kbd>
            </Button>
            <Button variant="secondary">
              <Search data-icon="inline-start" /> Buscar
              <KbdGroup className="ml-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Nova mensagem" />}>
                <PenSquare />
              </TooltipTrigger>
              <TooltipContent>
                Nova mensagem <Kbd>C</Kbd>
              </TooltipContent>
            </Tooltip>
            <span className="text-xs text-muted-foreground">← passe o mouse</span>
          </div>
        </div>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
