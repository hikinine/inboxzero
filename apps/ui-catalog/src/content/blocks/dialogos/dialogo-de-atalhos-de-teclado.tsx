'use client'

import { useEffect, useState } from 'react'
import { Keyboard, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Sistema = 'mac' | 'win'

interface Atalho {
  acao: string
  teclas: string[]
}

const GRUPOS: { titulo: string; atalhos: Atalho[] }[] = [
  {
    titulo: 'Geral',
    atalhos: [
      { acao: 'Abrir busca', teclas: ['mod', 'K'] },
      { acao: 'Ver atalhos', teclas: ['?'] },
      { acao: 'Abrir configurações', teclas: ['mod', ','] },
    ],
  },
  {
    titulo: 'Navegação',
    atalhos: [
      { acao: 'Ir para a caixa de entrada', teclas: ['G', 'I'] },
      { acao: 'Ir para projetos', teclas: ['G', 'P'] },
      { acao: 'Próximo item', teclas: ['J'] },
      { acao: 'Item anterior', teclas: ['K'] },
    ],
  },
  {
    titulo: 'Tarefas',
    atalhos: [
      { acao: 'Nova tarefa', teclas: ['C'] },
      { acao: 'Atribuir a mim', teclas: ['I'] },
      { acao: 'Alterar prioridade', teclas: ['P'] },
      { acao: 'Marcar como concluída', teclas: ['mod', 'Enter'] },
    ],
  },
  {
    titulo: 'Edição',
    atalhos: [
      { acao: 'Negrito', teclas: ['mod', 'B'] },
      { acao: 'Inserir link', teclas: ['mod', 'shift', 'U'] },
      { acao: 'Desfazer', teclas: ['mod', 'Z'] },
    ],
  },
]

function rotulo(t: string, sistema: Sistema) {
  if (t === 'mod') return sistema === 'mac' ? '⌘' : 'Ctrl'
  if (t === 'shift') return sistema === 'mac' ? '⇧' : 'Shift'
  if (t === 'Enter') return '↵'
  return t
}

function PainelAtalhos({ prefixo }: { prefixo: string }) {
  const [busca, setBusca] = useState('')
  const [sistema, setSistema] = useState<Sistema>('mac')
  const termo = busca.trim().toLowerCase()
  const grupos = GRUPOS.map((g) => ({ ...g, atalhos: g.atalhos.filter((a) => !termo || a.acao.toLowerCase().includes(termo) || g.titulo.toLowerCase().includes(termo)) })).filter((g) => g.atalhos.length)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <InputGroup className="flex-1">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput id={`${prefixo}-busca`} placeholder="Buscar ação…" aria-label="Buscar atalho" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </InputGroup>
        <ToggleGroup value={[sistema]} onValueChange={(v) => v[0] && setSistema(v[0] as Sistema)} variant="outline" size="sm" aria-label="Sistema operacional">
          <ToggleGroupItem value="mac">macOS</ToggleGroupItem>
          <ToggleGroupItem value="win">Windows</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid max-h-80 gap-x-8 gap-y-5 overflow-y-auto pr-1 sm:grid-cols-2">
        {grupos.map((g) => (
          <div key={g.titulo}>
            <p className="mb-1.5 text-xs font-medium tracking-wider text-muted-foreground uppercase">{g.titulo}</p>
            <ul className="divide-y">
              {g.atalhos.map((a) => (
                <li key={a.acao} className="flex items-center justify-between gap-4 py-2 text-sm">
                  <span>{a.acao}</span>
                  <KbdGroup>
                    {a.teclas.map((t, i) => (
                      <span key={t} className="flex items-center gap-1">
                        {i > 0 && a.teclas[0] === 'G' && <span className="text-[10px] text-muted-foreground">depois</span>}
                        <Kbd>{rotulo(t, sistema)}</Kbd>
                      </span>
                    ))}
                  </KbdGroup>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {grupos.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">Nenhum atalho para “{busca}”.</p>}
      </div>
    </div>
  )
}

export default function DialogoDeAtalhosDeTeclado() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null
      if (alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA')) return
      if (e.key === '?') setAberto(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="w-full px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4 rounded-xl border bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Pressione <Kbd>?</Kbd> em qualquer tela para ver todos os atalhos.
          </p>
          <Dialog open={aberto} onOpenChange={setAberto}>
            <DialogTrigger render={<Button variant="outline" size="sm" />}>
              <Keyboard data-icon="inline-start" /> Atalhos
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Atalhos de teclado</DialogTitle>
                <DialogDescription>Trabalhe sem tirar as mãos do teclado.</DialogDescription>
              </DialogHeader>
              <PainelAtalhos prefixo="dlg" />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b px-6 py-4">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Keyboard className="size-4" />
            </span>
            <div>
              <h3 className="font-medium">Atalhos de teclado</h3>
              <p className="text-sm text-muted-foreground">Trabalhe sem tirar as mãos do teclado.</p>
            </div>
          </div>
          <div className="p-6">
            <PainelAtalhos prefixo="inl" />
          </div>
          <div className="flex items-center justify-between border-t bg-muted/40 px-6 py-3 text-xs text-muted-foreground">
            <span>14 atalhos em 4 grupos</span>
            <span className="flex items-center gap-1">
              Fechar <Kbd>Esc</Kbd>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
