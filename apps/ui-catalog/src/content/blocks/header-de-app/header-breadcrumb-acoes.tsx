'use client'

import { CalendarDays, Download, ListChecks, MoreHorizontal, Plus, Share2, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function HeaderBreadcrumbAcoes() {
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projetos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Lançamento Q4</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="hidden items-center gap-3 sm:flex">
            <AvatarGroup>
              {['AS', 'BR', 'CM'].map((n) => (
                <Avatar key={n} size="sm">
                  <AvatarFallback>{n}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
            <Button variant="ghost" size="sm">
              <Share2 data-icon="inline-start" /> Compartilhar
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Lançamento Q4</h1>
              <Badge variant="secondary" className="gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Em andamento
              </Badge>
              <Button variant="ghost" size="icon-xs" aria-label="Favoritar">
                <Star />
              </Button>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>Campanha de lançamento do plano Business</span>
              <span className="flex items-center gap-1.5">
                <ListChecks className="size-3.5" /> 24 tarefas
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" /> Prazo 30/11/2026
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download data-icon="inline-start" /> Exportar
            </Button>
            <Button>
              <Plus data-icon="inline-start" /> Novo
            </Button>
            <Button variant="outline" size="icon" aria-label="Mais ações">
              <MoreHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
