'use client'

import { useState, type ReactNode } from 'react'
import { Check, ChevronRight, FileText, FolderOpen } from 'lucide-react'
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { cn } from '@/lib/utils'

const LINHAS = ['# Proposta comercial — Lumi', '', '## Escopo', '- Implantação do CRM em 4 semanas', '- Integração com WhatsApp e e-mail', '- Treinamento do time comercial', '', '## Investimento', 'R$ 12.900,00 em 3 parcelas', '', '> Validade da proposta: 30 dias']
const ARQUIVOS = ['proposta-lumi.md', 'roadmap-2027.md', 'notas-reuniao.md']

export default function MenubarDeEditor() {
  const [barraLateral, setBarraLateral] = useState(true)
  const [minimapa, setMinimapa] = useState(false)
  const [quebra, setQuebra] = useState(true)
  const [zoom, setZoom] = useState('100')

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Demo title="Gatilho (clique em um menu)">
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-2 py-1.5">
            <Menubar className="border-0 bg-transparent p-0">
              <MenubarMenu>
                <MenubarTrigger>Arquivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Novo arquivo <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Abrir… <MenubarShortcut>⌘O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger>Abrir recente</MenubarSubTrigger>
                    <MenubarSubContent>
                      {ARQUIVOS.map((a) => (
                        <MenubarItem key={a}>
                          <FileText /> {a}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    Salvar <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Salvar como… <MenubarShortcut>⇧⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Exportar</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>PDF</MenubarItem>
                      <MenubarItem>Markdown</MenubarItem>
                      <MenubarItem>HTML</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    Fechar <MenubarShortcut>⌘W</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Editar</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    Recortar <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Copiar <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Colar <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    Localizar… <MenubarShortcut>⌘F</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Substituir… <MenubarShortcut>⌥⌘F</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Exibir</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem checked={barraLateral} onCheckedChange={(v) => setBarraLateral(v)} closeOnClick={false}>
                    Barra lateral <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={minimapa} onCheckedChange={(v) => setMinimapa(v)} closeOnClick={false}>
                    Minimapa
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={quebra} onCheckedChange={(v) => setQuebra(v)} closeOnClick={false}>
                    Quebra de linha <MenubarShortcut>⌥Z</MenubarShortcut>
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarRadioGroup value={zoom} onValueChange={(v) => setZoom(String(v))}>
                    <MenubarRadioItem value="90">Zoom 90%</MenubarRadioItem>
                    <MenubarRadioItem value="100">Zoom 100%</MenubarRadioItem>
                    <MenubarRadioItem value="125">Zoom 125%</MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Ajuda</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Documentação</MenubarItem>
                  <MenubarItem>
                    Atalhos de teclado <MenubarShortcut>⌘/</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Sobre o editor</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <span className="ml-auto truncate text-xs text-muted-foreground">proposta-lumi.md · salvo</span>
          </div>

          <div className="flex h-60">
            {barraLateral && (
              <div className="w-40 shrink-0 border-r bg-muted/20 p-2 text-xs">
                <div className="mb-1 flex items-center gap-1 px-1 font-medium text-muted-foreground">
                  <FolderOpen className="size-3.5" /> propostas
                </div>
                {ARQUIVOS.map((a, i) => (
                  <div key={a} className={cn('flex items-center gap-1.5 rounded-md px-2 py-1', i === 0 ? 'bg-muted font-medium' : 'text-muted-foreground')}>
                    <FileText className="size-3.5" /> {a}
                  </div>
                ))}
              </div>
            )}
            <div className="min-w-0 flex-1 overflow-hidden p-3 font-mono leading-5" style={{ fontSize: `${(12 * Number(zoom)) / 100}px` }}>
              {LINHAS.map((l, i) => (
                <div key={i} className={cn('flex gap-3', quebra ? 'whitespace-pre-wrap' : 'whitespace-pre')}>
                  <span className="w-5 shrink-0 text-right text-muted-foreground/60 select-none">{i + 1}</span>
                  <span className={cn(l.startsWith('#') && 'font-semibold', l.startsWith('>') && 'text-muted-foreground italic')}>{l || ' '}</span>
                </div>
              ))}
            </div>
            {minimapa && (
              <div className="w-12 shrink-0 space-y-1 border-l p-1.5" aria-hidden>
                {LINHAS.map((l, i) => (
                  <div key={i} className="h-0.5 rounded bg-muted-foreground/30" style={{ width: `${Math.min(100, l.length * 4)}%` }} />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 border-t bg-muted/40 px-3 py-1 text-[11px] text-muted-foreground">
            <span>Ln 9, Col 14</span>
            <span>UTF-8</span>
            <span>Markdown</span>
            <span className="ml-auto">Zoom {zoom}%</span>
          </div>
        </div>
      </Demo>

      <Demo title="Menu Exibir (inline, reflete o estado)">
        <div className="w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <Linha label="Barra lateral" kbd="⌘B" marcado={barraLateral} onClick={() => setBarraLateral((v) => !v)} />
          <Linha label="Minimapa" marcado={minimapa} onClick={() => setMinimapa((v) => !v)} />
          <Linha label="Quebra de linha" kbd="⌥Z" marcado={quebra} onClick={() => setQuebra((v) => !v)} />
          <div className="-mx-1 my-1 h-px bg-border" />
          {['90', '100', '125'].map((z) => (
            <Linha key={z} label={`Zoom ${z}%`} marcado={zoom === z} onClick={() => setZoom(z)} />
          ))}
          <div className="-mx-1 my-1 h-px bg-border" />
          <div className="flex items-center gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm">
            Aparência <ChevronRight className="ml-auto size-4" />
          </div>
        </div>
      </Demo>
    </div>
  )
}

function Linha({ label, kbd, marcado, onClick }: { label: string; kbd?: string; marcado: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="relative flex w-full items-center gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-left text-sm hover:bg-accent hover:text-accent-foreground">
      {marcado && <Check className="absolute left-1.5 size-4" />}
      {label}
      {kbd && <span className="ml-auto text-xs tracking-widest text-muted-foreground">{kbd}</span>}
    </button>
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
