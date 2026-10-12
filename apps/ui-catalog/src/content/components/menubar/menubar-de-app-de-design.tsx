'use client'

import { useState } from 'react'
import { AlignCenterVertical, AlignEndVertical, AlignStartVertical, Circle, Layers, Share2, Square, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { cn } from '@/lib/utils'

type Alinhamento = 'esquerda' | 'centro' | 'direita'

const CAMADAS = [
  { nome: 'Botão / Primário', Icon: Square, ativa: true },
  { nome: 'Avatar', Icon: Circle },
  { nome: 'Título', Icon: Type },
]

const POSICAO: Record<Alinhamento, string> = { esquerda: 'left-6', centro: 'left-1/2 -translate-x-1/2', direita: 'right-6' }

export default function MenubarDeAppDeDesign() {
  const [reguas, setReguas] = useState(true)
  const [grade, setGrade] = useState(true)
  const [zoom, setZoom] = useState('100')
  const [alinhamento, setAlinhamento] = useState<Alinhamento>('centro')
  const [bloqueada, setBloqueada] = useState(false)

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-2 py-1.5">
        <span className="mr-1 flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Layers className="size-3.5" />
        </span>
        <Menubar className="border-0 bg-transparent p-0">
          <MenubarMenu>
            <MenubarTrigger>Arquivo</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Novo arquivo <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Duplicar</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Exportar</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PNG · 2x</MenubarItem>
                  <MenubarItem>SVG</MenubarItem>
                  <MenubarItem>PDF</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                Histórico de versões <MenubarShortcut>⌥⌘H</MenubarShortcut>
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
                Copiar propriedades <MenubarShortcut>⌥⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Colar propriedades <MenubarShortcut>⌥⌘V</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Objeto</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarLabel>Botão / Primário</MenubarLabel>
                <MenubarSub>
                  <MenubarSubTrigger>Alinhar</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarRadioGroup value={alinhamento} onValueChange={(v) => setAlinhamento(v as Alinhamento)}>
                      <MenubarRadioItem value="esquerda">
                        <AlignStartVertical /> À esquerda
                      </MenubarRadioItem>
                      <MenubarRadioItem value="centro">
                        <AlignCenterVertical /> Centralizar
                      </MenubarRadioItem>
                      <MenubarRadioItem value="direita">
                        <AlignEndVertical /> À direita
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem>
                  Agrupar <MenubarShortcut>⌘G</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Criar componente <MenubarShortcut>⌥⌘K</MenubarShortcut>
                </MenubarItem>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarCheckboxItem checked={bloqueada} onCheckedChange={(v) => setBloqueada(v)} closeOnClick={false}>
                Bloquear camada <MenubarShortcut>⇧⌘L</MenubarShortcut>
              </MenubarCheckboxItem>
              <MenubarItem variant="destructive">Excluir</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Visualizar</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={reguas} onCheckedChange={(v) => setReguas(v)} closeOnClick={false}>
                Réguas <MenubarShortcut>⇧R</MenubarShortcut>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={grade} onCheckedChange={(v) => setGrade(v)} closeOnClick={false}>
                Grade de layout <MenubarShortcut>⌃G</MenubarShortcut>
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup value={zoom} onValueChange={(v) => setZoom(String(v))}>
                <MenubarRadioItem value="50">50%</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="200">200%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <span className="ml-auto hidden text-xs text-muted-foreground sm:block">Onboarding · Tela 3</span>
        <Button size="sm">
          <Share2 data-icon="inline-start" /> Compartilhar
        </Button>
      </div>

      <div className="flex h-72">
        <div className="hidden w-44 shrink-0 border-r p-2 text-xs sm:block">
          <div className="mb-1 px-2 py-1 font-medium text-muted-foreground">Camadas</div>
          {CAMADAS.map((c) => (
            <div key={c.nome} className={cn('flex items-center gap-2 rounded-md px-2 py-1.5', c.ativa ? 'bg-muted font-medium' : 'text-muted-foreground')}>
              <c.Icon className="size-3.5" /> {c.nome}
              {c.ativa && bloqueada && <span className="ml-auto text-[10px] text-muted-foreground">🔒</span>}
            </div>
          ))}
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden bg-muted/40">
          {reguas && (
            <>
              <div className="absolute inset-x-0 top-0 h-4 border-b bg-background/80 [background-image:repeating-linear-gradient(to_right,var(--color-border)_0_1px,transparent_1px_24px)] [background-size:24px_6px] [background-position:16px_bottom] [background-repeat:repeat-x]" aria-hidden />
              <div className="absolute inset-y-0 left-0 w-4 border-r bg-background/80 [background-image:repeating-linear-gradient(to_bottom,var(--color-border)_0_1px,transparent_1px_24px)] [background-size:6px_24px] [background-position:right_16px] [background-repeat:repeat-y]" aria-hidden />
            </>
          )}
          <div className={cn('absolute inset-0 flex items-center justify-center transition-[padding]', reguas && 'pt-4 pl-4')}>
            <div className={cn('relative aspect-[9/14] h-[88%] origin-center rounded-lg border bg-background shadow-sm transition-transform', grade && '[background-image:linear-gradient(to_right,color-mix(in_oklch,var(--color-primary)_14%,transparent)_1px,transparent_1px)] [background-size:12.5%_100%]')} style={{ transform: `scale(${Number(zoom) / 100})` }}>
              <div className="absolute inset-x-6 top-8 h-2.5 w-1/2 rounded bg-foreground/80" />
              <div className="absolute inset-x-6 top-14 h-1.5 w-2/3 rounded bg-muted-foreground/40" />
              <div className="absolute top-20 left-6 size-8 rounded-full bg-gradient-to-br from-muted to-muted-foreground/30" />
              <div className={cn('absolute bottom-8 h-7 w-24 rounded-md bg-primary transition-[left,right,transform]', POSICAO[alinhamento])}>
                <span className="absolute -inset-1 rounded-md ring-1 ring-sky-500" aria-hidden />
                {(['-top-1.5 -left-1.5', '-top-1.5 -right-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'] as const).map((p) => (
                  <span key={p} className={cn('absolute size-2 rounded-[2px] border border-sky-500 bg-background', p)} aria-hidden />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-2 bottom-2 rounded-md border bg-background px-2 py-0.5 text-[11px] text-muted-foreground tabular-nums">{zoom}%</div>
        </div>
      </div>
    </div>
  )
}
