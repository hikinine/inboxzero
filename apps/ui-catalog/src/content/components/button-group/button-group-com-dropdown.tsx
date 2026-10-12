'use client'

import type { ReactNode } from 'react'
import { Calendar, ChevronDown, Download, FileSpreadsheet, FileText, GitMerge, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ButtonGroupComDropdown() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Ação principal + opções</Legenda>
        <ButtonGroup>
          <Button>
            <Save data-icon="inline-start" /> Salvar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="icon" aria-label="Mais opções de salvar" />}>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Send /> Salvar e publicar <DropdownMenuShortcut>⌘⏎</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText /> Salvar como rascunho
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar /> Agendar publicação
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div>
        <Legenda>Outline com formatos</Legenda>
        <ButtonGroup>
          <Button variant="outline">
            <Download data-icon="inline-start" /> Exportar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Escolher formato" />}>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <FileSpreadsheet /> Planilha (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText /> CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText /> PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div>
        <Legenda>Com separador</Legenda>
        <ButtonGroup>
          <Button variant="secondary">
            <GitMerge data-icon="inline-start" /> Mesclar pull request
          </Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="secondary" size="icon" aria-label="Estratégias de merge" />}>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>Criar merge commit</DropdownMenuItem>
              <DropdownMenuItem>Squash e mesclar</DropdownMenuItem>
              <DropdownMenuItem>Rebase e mesclar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
