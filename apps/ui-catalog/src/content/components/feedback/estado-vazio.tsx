'use client'

import { Inbox, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export default function EstadoVazio() {
  return (
    <Empty className="w-full max-w-md rounded-xl border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nenhuma conversa ainda</EmptyTitle>
        <EmptyDescription>Conecte um canal ou importe contatos para começar a atender por aqui.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <Plus data-icon="inline-start" /> Conectar canal
          </Button>
          <Button variant="outline">Importar CSV</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
