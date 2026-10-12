'use client'

import { useState, type ReactNode } from 'react'
import { Eye, PenLine } from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { cn } from '@/lib/utils'

const INICIAL = `# Proposta — Kavo Ltda

Implantação do **CRM Lumi** em 4 semanas, com integração ao WhatsApp e ao \`ERP Omie\`.

## Entregas
- Pipeline configurado com 5 etapas
- Automação de follow-up em 3 toques
- Treinamento do time comercial (2 h)

> Investimento: **R$ 12.900,00** em 3 parcelas.`

function Inline({ t }: { t: string }) {
  const partes = t.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {partes.map((p, i) => {
        if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('`')) return (
          <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
            {p.slice(1, -1)}
          </code>
        )
        return p
      })}
    </>
  )
}

function Preview({ texto }: { texto: string }) {
  const blocos: ReactNode[] = []
  texto.split('\n').forEach((l, i) => {
    if (l.startsWith('# ')) blocos.push(<h1 key={i} className="text-xl font-semibold tracking-tight"><Inline t={l.slice(2)} /></h1>)
    else if (l.startsWith('## ')) blocos.push(<h2 key={i} className="mt-4 text-base font-semibold"><Inline t={l.slice(3)} /></h2>)
    else if (l.startsWith('- ')) blocos.push(<li key={i} className="ml-4 list-disc"><Inline t={l.slice(2)} /></li>)
    else if (l.startsWith('> ')) blocos.push(<blockquote key={i} className="mt-2 border-l-2 pl-3 text-muted-foreground italic"><Inline t={l.slice(2)} /></blockquote>)
    else if (!l.trim()) blocos.push(<div key={i} className="h-2" />)
    else blocos.push(<p key={i} className="leading-relaxed"><Inline t={l} /></p>)
  })
  return <>{blocos}</>
}

export default function ResizableEditorEPreview() {
  const [texto, setTexto] = useState(INICIAL)
  const linhas = texto.split('\n')
  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0

  return (
    <div className="w-full max-w-2xl space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Editor Markdown e prévia ao vivo — arraste a divisória</p>
      <div className="overflow-hidden rounded-xl border bg-card">
        <ResizablePanelGroup orientation="horizontal" className="h-[340px] text-sm">
          <ResizablePanel defaultSize="50" minSize="25">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-1.5 text-xs font-medium">
                <PenLine className="size-3.5 text-muted-foreground" /> proposta-kavo.md
              </div>
              <div className="flex min-h-0 flex-1">
                <div className="w-8 shrink-0 border-r bg-muted/20 pt-2 text-right font-mono text-[11px] leading-5 text-muted-foreground/60 select-none" aria-hidden>
                  {linhas.map((_, i) => (
                    <div key={i} className="pr-1.5">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Editor Markdown" spellCheck={false} className="min-h-0 flex-1 resize-none bg-transparent p-2 font-mono text-xs leading-5 outline-none" />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50" minSize="25">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-1.5 text-xs font-medium">
                <Eye className="size-3.5 text-muted-foreground" /> Prévia
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-4">
                <Preview texto={texto} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="flex items-center gap-3 border-t bg-muted/40 px-3 py-1 text-[11px] text-muted-foreground tabular-nums">
          <span>{linhas.length} linhas</span>
          <span>{palavras} palavras</span>
          <span className={cn('ml-auto flex items-center gap-1', texto === INICIAL ? '' : 'text-amber-600 dark:text-amber-400')}>
            <span className={cn('size-1.5 rounded-full', texto === INICIAL ? 'bg-emerald-500' : 'bg-amber-500')} aria-hidden /> {texto === INICIAL ? 'Salvo' : 'Alterações não salvas'}
          </span>
        </div>
      </div>
    </div>
  )
}
