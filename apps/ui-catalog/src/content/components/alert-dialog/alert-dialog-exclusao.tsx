'use client'

import type { ReactNode } from 'react'
import { Trash2, TriangleAlert } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function AlertDialogExclusao() {
  return (
    <div className="w-full max-w-md space-y-5">
      <div>
        <Legenda>Gatilhos</Legenda>
        <div className="flex flex-wrap gap-2">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              <Trash2 data-icon="inline-start" /> Excluir projeto
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Excluir “Site Lumi”?</AlertDialogTitle>
                <AlertDialogDescription>
                  O projeto, 14 páginas e o histórico de publicações serão removidos. Essa ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Excluir projeto</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>Cancelar assinatura</AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <TriangleAlert />
                </AlertDialogMedia>
                <AlertDialogTitle>Cancelar o plano Pro?</AlertDialogTitle>
                <AlertDialogDescription>Você mantém o acesso até 12/11 e perde as automações depois disso.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Manter plano</AlertDialogCancel>
                <AlertDialogAction>Cancelar mesmo assim</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div>
        <Legenda>Como o diálogo aparece (inline)</Legenda>
        <div className="rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10">
          <div className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[auto_1fr]">
            <div className="inline-flex size-10 items-center justify-center rounded-md bg-destructive/10 text-destructive sm:row-span-2">
              <Trash2 className="size-5" />
            </div>
            <div className="font-medium">Excluir “Site Lumi”?</div>
            <p className="text-sm text-muted-foreground">
              O projeto, 14 páginas e o histórico de publicações serão removidos. Essa ação não pode ser desfeita.
            </p>
          </div>
          <div className="-mx-4 -mb-4 mt-4 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">
            <Button variant="outline">Cancelar</Button>
            <Button variant="destructive">Excluir projeto</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
