'use client'

import { useState } from 'react'
import { CircleCheck, MessageSquare, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const ROTULOS = ['Escolha uma nota', 'Muito ruim', 'Ruim', 'Ok', 'Boa', 'Excelente']
const TAGS = ['Rápido', 'Fácil de usar', 'Bonito', 'Faltou um recurso', 'Encontrei um bug', 'Confuso']

function useFeedback() {
  const [nota, setNota] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [comentario, setComentario] = useState('')
  const [contato, setContato] = useState(true)
  const [enviado, setEnviado] = useState(false)
  function alternarTag(t: string) {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }
  function reiniciar() {
    setNota(0)
    setTags([])
    setComentario('')
    setContato(true)
    setEnviado(false)
  }
  return { nota, setNota, tags, alternarTag, comentario, setComentario, contato, setContato, enviado, setEnviado, reiniciar }
}
type Feedback = ReturnType<typeof useFeedback>

function Estrelas({ valor, onChange }: { valor: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  const ativo = hover || valor
  return (
    <div>
      <div className="flex gap-1" role="radiogroup" aria-label="Nota de 1 a 5" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={valor === n} aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}`} onMouseEnter={() => setHover(n)} onClick={() => onChange(n)} className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
            <Star className={cn('size-8 transition-colors', n <= ativo ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40')} />
          </button>
        ))}
      </div>
      <p className={cn('mt-1 h-4 text-xs', ativo ? 'font-medium text-foreground' : 'text-muted-foreground')}>{ROTULOS[ativo]}</p>
    </div>
  )
}

function Campos({ f, idPrefix }: { f: Feedback; idPrefix: string }) {
  if (f.enviado) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CircleCheck className="size-6" />
        </span>
        <p className="font-medium">Obrigado pelo feedback!</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Você deu {f.nota} {f.nota === 1 ? 'estrela' : 'estrelas'}
          {f.tags.length ? ` e marcou “${f.tags.join('”, “')}”` : ''}. A equipe de produto lê tudo.
        </p>
      </div>
    )
  }
  return (
    <div className="space-y-5">
      <Estrelas valor={f.nota} onChange={f.setNota} />
      <div>
        <p className="mb-2 text-sm font-medium">O que mais chamou atenção?</p>
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((t) => {
            const on = f.tags.includes(t)
            return (
              <button key={t} type="button" onClick={() => f.alternarTag(t)} aria-pressed={on} className={cn('rounded-full border px-2.5 py-1 text-xs transition-colors', on ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
                {t}
              </button>
            )
          })}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-comentario`}>Quer contar mais? (opcional)</Label>
        <Textarea id={`${idPrefix}-comentario`} rows={3} value={f.comentario} onChange={(e) => f.setComentario(e.target.value)} placeholder="O que podemos melhorar na tela de relatórios?" />
      </div>
      <Label htmlFor={`${idPrefix}-contato`} className="font-normal">
        <Checkbox id={`${idPrefix}-contato`} checked={f.contato} onCheckedChange={(v) => f.setContato(v === true)} />
        Podem me chamar para falar sobre isso
      </Label>
    </div>
  )
}

export default function DialogoFeedbackRating() {
  const dlg = useFeedback()
  const inl = useFeedback()

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Feedback com avaliação</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Estrelas, tags de um toque e um comentário opcional. O botão flutuante abre o diálogo real; à direita, o mesmo formulário inline.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          <div className="relative overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center gap-3 border-b px-4 py-2.5">
              <Skeleton className="h-4 w-24" />
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="size-7 rounded-full" />
              </div>
            </div>
            <div className="space-y-4 p-4">
              <Skeleton className="h-5 w-48" />
              <div className="grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-3">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-44 w-full" />
            </div>
            <Dialog
              onOpenChange={(o) => {
                if (!o) dlg.reiniciar()
              }}
            >
              <DialogTrigger render={<Button className="absolute right-4 bottom-4 rounded-full shadow-lg" />}>
                <MessageSquare data-icon="inline-start" /> Feedback
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Como foi usar os relatórios?</DialogTitle>
                  <DialogDescription>Leva menos de um minuto e ajuda a decidir o que construímos a seguir.</DialogDescription>
                </DialogHeader>
                <Campos f={dlg} idPrefix="dlg" />
                <DialogFooter>
                  {dlg.enviado ? (
                    <DialogClose render={<Button />}>Fechar</DialogClose>
                  ) : (
                    <>
                      <DialogClose render={<Button variant="outline" />}>Agora não</DialogClose>
                      <Button disabled={dlg.nota === 0} onClick={() => dlg.setEnviado(true)}>
                        Enviar feedback
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-base font-medium">Como foi usar os relatórios?</h3>
              <p className="text-sm text-muted-foreground">Leva menos de um minuto e ajuda a decidir o que construímos a seguir.</p>
            </div>
            <Campos f={inl} idPrefix="inl" />
            <div className="-mx-6 -mb-6 mt-6 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 px-6 py-4">
              {inl.enviado ? (
                <Button variant="outline" onClick={inl.reiniciar}>
                  Enviar outro
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={inl.reiniciar}>
                    Agora não
                  </Button>
                  <Button disabled={inl.nota === 0} onClick={() => inl.setEnviado(true)}>
                    Enviar feedback
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
