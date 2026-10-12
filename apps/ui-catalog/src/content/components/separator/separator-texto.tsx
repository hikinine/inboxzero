'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SeparatorTexto() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Horizontal e vertical</p>
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Catálogo de UI</h4>
            <p className="text-sm text-muted-foreground">Blocos, componentes e páginas prontos para copiar.</p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center gap-4 text-sm">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Documentação</span>
            <Separator orientation="vertical" />
            <span>Suporte</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com texto no meio</p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Continuar com Google
          </Button>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground uppercase">ou</span>
            <Separator className="flex-1" />
          </div>
          <Button className="w-full">Entrar com e-mail</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com rótulo, ícone e tracejado</p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">Hoje</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="flex size-7 items-center justify-center rounded-full border bg-background text-muted-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <Separator className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <Separator className="flex-1 border-t border-dashed bg-transparent" />
            <span className="text-xs text-muted-foreground">12 mensagens não lidas</span>
            <Separator className="flex-1 border-t border-dashed bg-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
