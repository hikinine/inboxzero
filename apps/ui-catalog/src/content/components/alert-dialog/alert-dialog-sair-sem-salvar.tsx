'use client'

import { useState, type ReactNode } from 'react'
import { ArrowLeft, FileWarning, Save } from 'lucide-react'
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
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ORIGINAL = {
  titulo: 'Proposta comercial · Lumi',
  corpo: 'Olá, Ana! Segue a proposta revisada com os ajustes de escopo que conversamos na reunião de terça.',
}

export default function AlertDialogSairSemSalvar() {
  const [doc, setDoc] = useState(ORIGINAL)
  const [salvo, setSalvo] = useState(ORIGINAL)
  const [aberto, setAberto] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const sujo = doc.titulo !== salvo.titulo || doc.corpo !== salvo.corpo

  function sair() {
    if (sujo) setAberto(true)
    else setStatus('Editor fechado — nada para salvar.')
  }
  function salvar() {
    setSalvo(doc)
    setStatus('Alterações salvas.')
  }
  function salvarESair() {
    setSalvo(doc)
    setAberto(false)
    setStatus('Alterações salvas e editor fechado.')
  }
  function descartar() {
    setDoc(salvo)
    setAberto(false)
    setStatus('Alterações descartadas.')
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Editor (altere o texto e clique em voltar)</Legenda>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Button variant="ghost" size="icon-sm" aria-label="Voltar" onClick={sair}>
              <ArrowLeft />
            </Button>
            <span className="text-sm font-medium">Rascunho</span>
            {sujo ? (
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">
                <span className="size-1.5 rounded-full bg-current" /> Não salvo
              </Badge>
            ) : (
              <Badge variant="outline">Salvo</Badge>
            )}
            <Button size="xs" className="ml-auto" disabled={!sujo} onClick={salvar}>
              <Save data-icon="inline-start" /> Salvar
            </Button>
          </div>
          <div className="grid gap-3 p-3">
            <div className="grid gap-1.5">
              <Label htmlFor="ad-titulo">Título</Label>
              <Input id="ad-titulo" value={doc.titulo} onChange={(e) => setDoc((d) => ({ ...d, titulo: e.target.value }))} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ad-corpo">Mensagem</Label>
              <Textarea id="ad-corpo" rows={3} value={doc.corpo} onChange={(e) => setDoc((d) => ({ ...d, corpo: e.target.value }))} />
            </div>
          </div>
          {status && <div className="border-t px-3 py-2 text-xs text-muted-foreground">{status}</div>}
        </div>

        <AlertDialog open={aberto} onOpenChange={setAberto}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <FileWarning />
              </AlertDialogMedia>
              <AlertDialogTitle>Sair sem salvar?</AlertDialogTitle>
              <AlertDialogDescription>Você tem alterações em “{doc.titulo || 'Sem título'}” que ainda não foram salvas.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction variant="ghost" className="text-destructive hover:text-destructive sm:mr-auto" onClick={descartar}>
                Descartar
              </AlertDialogAction>
              <AlertDialogCancel>Continuar editando</AlertDialogCancel>
              <AlertDialogAction onClick={salvarESair}>Salvar e sair</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div>
        <Legenda>Como o diálogo aparece (inline, empilhado)</Legenda>
        <div className="mx-auto max-w-xs rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="mb-1 inline-flex size-10 items-center justify-center rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <FileWarning className="size-5" />
            </div>
            <div className="font-medium">Sair sem salvar?</div>
            <p className="text-sm text-muted-foreground">Você tem alterações em “Proposta comercial · Lumi” que ainda não foram salvas.</p>
          </div>
          <div className="-mx-4 -mb-4 mt-4 grid gap-2 rounded-b-xl border-t bg-muted/50 p-4">
            <Button>Salvar e sair</Button>
            <Button variant="outline">Continuar editando</Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              Descartar alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
