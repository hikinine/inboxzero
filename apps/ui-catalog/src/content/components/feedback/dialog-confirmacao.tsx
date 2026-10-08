'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function DialogConfirmacao() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Trash2 data-icon="inline-start" /> Excluir workspace
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir o workspace “Acme”?</DialogTitle>
          <DialogDescription>Todas as conversas, contatos e automações serão apagados. Essa ação não pode ser desfeita.</DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">
            Digite <span className="font-mono">Acme</span> para confirmar
          </Label>
          <Input id="confirm" placeholder="Acme" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <Button variant="destructive">Excluir definitivamente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
