'use client'

import { File, Folder, FolderOpen, Terminal } from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

interface Arquivo {
  nome: string
  nivel: number
  pasta?: boolean
  aberta?: boolean
  ativo?: boolean
}

const ARQUIVOS: Arquivo[] = [
  { nome: 'src', nivel: 0, pasta: true, aberta: true },
  { nome: 'app.tsx', nivel: 1, ativo: true },
  { nome: 'rotas.ts', nivel: 1 },
  { nome: 'componentes', nivel: 1, pasta: true },
  { nome: 'package.json', nivel: 0 },
  { nome: 'LEIAME.md', nivel: 0 },
]

const CODIGO = [
  "import { Painel } from './componentes/painel'",
  '',
  'export function App() {',
  '  // Dashboard inicial do atendente',
  '  return <Painel titulo="Visão geral" />',
  '}',
]

const TERMINAL = ['$ pnpm dev', '▲ Next.js 15.3 — pronto em 1,2 s', '○ http://localhost:3000', '✓ Compilado /app em 412 ms']

export default function ResizablePaineis() {
  return (
    <div className="w-full max-w-2xl space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Horizontal com grupo vertical aninhado — arraste as divisórias</p>
      <ResizablePanelGroup orientation="horizontal" className="h-[320px] overflow-hidden rounded-lg border bg-card text-sm">
        <ResizablePanel defaultSize="28" minSize="18">
          <div className="flex h-full flex-col">
            <div className="border-b px-3 py-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Explorador</div>
            <ul className="p-2">
              {ARQUIVOS.map((a) => (
                <li key={a.nome} style={{ paddingLeft: 8 + a.nivel * 14 }} className={`flex items-center gap-1.5 rounded-md py-1 pr-2 text-xs ${a.ativo ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground'}`}>
                  {a.pasta ? a.aberta ? <FolderOpen className="size-3.5" /> : <Folder className="size-3.5" /> : <File className="size-3.5" />}
                  {a.nome}
                </li>
              ))}
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="72">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="62" minSize="30">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b px-3 py-1.5 text-xs">
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono">app.tsx</span>
                  <span className="text-muted-foreground">src/app.tsx</span>
                </div>
                <pre className="flex-1 overflow-auto p-3 font-mono text-xs leading-6">
                  {CODIGO.map((l, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-4 select-none text-right text-muted-foreground/60">{i + 1}</span>
                      <span className={l.trimStart().startsWith('//') ? 'text-muted-foreground' : ''}>{l || ' '}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="38" minSize="20">
              <div className="flex h-full flex-col bg-muted/40">
                <div className="flex items-center gap-2 border-b px-3 py-1.5 text-xs font-medium">
                  <Terminal className="size-3.5" /> Terminal
                </div>
                <pre className="flex-1 overflow-auto p-3 font-mono text-xs leading-5 text-muted-foreground">
                  {TERMINAL.map((l, i) => (
                    <div key={i} className={i === 0 ? 'text-foreground' : ''}>
                      {l}
                    </div>
                  ))}
                </pre>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
