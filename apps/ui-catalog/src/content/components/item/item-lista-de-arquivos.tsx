'use client'

import type { ReactNode } from 'react'
import { ChevronRight, Download, FileArchive, FileSpreadsheet, FileText, Image, MoreHorizontal, UploadCloud, X, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Arquivo {
  nome: string
  meta: string
  icon: LucideIcon
  tom: string
}

const ARQUIVOS: Arquivo[] = [
  { nome: 'Proposta comercial — Lumi.pdf', meta: '2,4 MB · PDF · Ana Souza, há 2 h', icon: FileText, tom: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  { nome: 'Planilha de custos Q3.xlsx', meta: '860 KB · Planilha · Bruno Rocha, ontem', icon: FileSpreadsheet, tom: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { nome: 'Mockup dashboard v2.png', meta: '3,1 MB · Imagem · Carla Mendes, há 3 dias', icon: Image, tom: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
  { nome: 'Assets de marca.zip', meta: '48 MB · Compactado · Diego Lima, há 1 sem.', icon: FileArchive, tom: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
]

function Icone({ a, className }: { a: Arquivo; className?: string }) {
  return (
    <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', a.tom, className)}>
      <a.icon className="size-4" />
    </div>
  )
}

export default function ItemListaDeArquivos() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Com ações">
        <ItemGroup className="gap-2">
          {ARQUIVOS.slice(0, 3).map((a) => (
            <Item key={a.nome} variant="outline">
              <ItemMedia>
                <Icone a={a} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{a.nome}</ItemTitle>
                <ItemDescription>{a.meta}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon-sm" variant="ghost" aria-label="Baixar">
                  <Download />
                </Button>
                <Button size="icon-sm" variant="ghost" aria-label="Mais opções">
                  <MoreHorizontal />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </Demo>

      <Demo title="Enviando (muted)">
        <Item variant="muted">
          <ItemMedia>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UploadCloud className="size-4" />
            </div>
          </ItemMedia>
          <ItemContent className="gap-2">
            <ItemTitle>contrato-assinado.pdf</ItemTitle>
            <Progress value={64} className="gap-1">
              <ProgressLabel className="text-xs text-muted-foreground">1,6 MB de 2,5 MB</ProgressLabel>
              <ProgressValue className="text-xs" />
            </Progress>
          </ItemContent>
          <ItemActions>
            <Button size="icon-sm" variant="ghost" aria-label="Cancelar envio">
              <X />
            </Button>
          </ItemActions>
        </Item>
      </Demo>

      <Demo title="Compacta, como link">
        <ItemGroup className="gap-0 rounded-lg border px-1">
          {ARQUIVOS.map((a, i) => (
            <div key={a.nome}>
              {i > 0 && <ItemSeparator className="my-0" />}
              <Item size="xs" render={<a href="#" />}>
                <ItemMedia>
                  <Icone a={a} className="size-7 rounded-md [&_svg]:size-3.5" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{a.nome}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="text-xs text-muted-foreground">{a.meta.split(' · ')[0]}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
            </div>
          ))}
        </ItemGroup>
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
