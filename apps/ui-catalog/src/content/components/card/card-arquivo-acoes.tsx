'use client'

import { useState } from 'react'
import { Download, Ellipsis, FileImage, FileSpreadsheet, FileText, FolderInput, Link2, Pencil, Share2, Star, Trash2, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type Tipo = 'pdf' | 'xlsx' | 'png'
interface Arquivo {
  id: string
  nome: string
  tipo: Tipo
  tamanho: string
  editado: string
  dono: string
  favorito: boolean
}
const TIPO: Record<Tipo, { icon: LucideIcon; classe: string; label: string }> = {
  pdf: { icon: FileText, classe: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', label: 'PDF' },
  xlsx: { icon: FileSpreadsheet, classe: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', label: 'Planilha' },
  png: { icon: FileImage, classe: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', label: 'Imagem' },
}
const INICIAIS: Arquivo[] = [
  { id: 'a1', nome: 'Proposta comercial Lumi.pdf', tipo: 'pdf', tamanho: '2,4 MB', editado: 'há 2 h', dono: 'AS', favorito: true },
  { id: 'a2', nome: 'Pipeline Q4.xlsx', tipo: 'xlsx', tamanho: '860 KB', editado: 'ontem', dono: 'BR', favorito: false },
  { id: 'a3', nome: 'Logo horizontal.png', tipo: 'png', tamanho: '312 KB', editado: 'há 3 dias', dono: 'DL', favorito: false },
]

export default function CardArquivoAcoes() {
  const [arquivos, setArquivos] = useState<Arquivo[]>(INICIAIS)
  const [selecionados, setSelecionados] = useState<Set<string>>(() => new Set(['a2']))

  const selecionar = (id: string, v: boolean) =>
    setSelecionados((prev) => {
      const n = new Set(prev)
      if (v) n.add(id)
      else n.delete(id)
      return n
    })
  const favoritar = (id: string) => setArquivos((as) => as.map((a) => (a.id === id ? { ...a, favorito: !a.favorito } : a)))
  const remover = (ids: string[]) => {
    setArquivos((as) => as.filter((a) => !ids.includes(a.id)))
    setSelecionados((prev) => new Set([...prev].filter((id) => !ids.includes(id))))
  }
  const qtd = selecionados.size

  return (
    <div className="w-full max-w-2xl">
      <div className="grid gap-3 sm:grid-cols-3">
        {arquivos.map((a) => {
          const t = TIPO[a.tipo]
          const sel = selecionados.has(a.id)
          return (
            <Card key={a.id} className={cn('group/arquivo gap-0 py-0 transition-shadow', sel && 'ring-2 ring-primary')}>
              <div className={cn('relative flex h-24 items-center justify-center rounded-t-xl', t.classe)}>
                <t.icon className="size-8" />
                <Checkbox
                  className={cn('absolute top-2 left-2 bg-background transition-opacity', !sel && 'opacity-0 group-hover/arquivo:opacity-100 focus-visible:opacity-100')}
                  checked={sel}
                  onCheckedChange={(v) => selecionar(a.id, v)}
                  aria-label={`Selecionar ${a.nome}`}
                />
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="absolute top-1.5 right-1.5 text-foreground hover:bg-background/60"
                  aria-label={a.favorito ? 'Remover dos favoritos' : 'Favoritar'}
                  aria-pressed={a.favorito}
                  onClick={() => favoritar(a.id)}
                >
                  <Star className={cn(a.favorito && 'fill-amber-400 text-amber-400')} />
                </Button>
                <span className="absolute right-2 bottom-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground">{t.label}</span>
              </div>
              <div className="p-3">
                <div className="truncate text-sm font-medium" title={a.nome}>
                  {a.nome}
                </div>
                <div className="text-xs text-muted-foreground">
                  {a.tamanho} · {a.editado}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px]">{a.dono}</AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Ações de ${a.nome}`} />}>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Download /> Baixar <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 /> Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 /> Copiar link
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Pencil /> Renomear <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FolderInput /> Mover para…
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive" onClick={() => remover([a.id])}>
                          <Trash2 /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          )
        })}
        {arquivos.length < INICIAIS.length && (
          <button
            type="button"
            onClick={() => setArquivos(INICIAIS)}
            className="flex min-h-40 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-xs text-muted-foreground hover:bg-muted/50"
          >
            <Trash2 className="size-4" />
            {INICIAIS.length - arquivos.length} na lixeira · clique para restaurar
          </button>
        )}
      </div>
      <div className="mt-3 flex min-h-9 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-xs">
        {qtd > 0 ? (
          <>
            <span className="font-medium">{qtd} selecionado{qtd > 1 ? 's' : ''}</span>
            <span className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="xs">
                <Download data-icon="inline-start" /> Baixar
              </Button>
              <Button variant="ghost" size="xs">
                <FolderInput data-icon="inline-start" /> Mover
              </Button>
              <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive" onClick={() => remover([...selecionados])}>
                <Trash2 data-icon="inline-start" /> Excluir
              </Button>
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">
            {arquivos.length} arquivo{arquivos.length === 1 ? '' : 's'} · passe o mouse para selecionar
          </span>
        )}
      </div>
    </div>
  )
}
