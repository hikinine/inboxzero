'use client'

import { useState } from 'react'
import { CloudUpload, FileImage, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const TIPOS = [
  { Icon: FileImage, label: 'PNG, JPG' },
  { Icon: FileText, label: 'PDF' },
]

export default function UploadDropzone() {
  const [arrastando, setArrastando] = useState(false)
  const [arquivos, setArquivos] = useState<string[]>([])

  function receber(lista: FileList | null) {
    if (!lista) return
    setArquivos((prev) => [...prev, ...Array.from(lista).map((f) => f.name)].slice(0, 5))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Documentos do contrato</CardTitle>
            <CardDescription>Envie o contrato assinado e os comprovantes. Aceitamos até 5 arquivos.</CardDescription>
          </CardHeader>
          <CardContent>
            <label
              htmlFor="dz-input"
              onDragOver={(e) => {
                e.preventDefault()
                setArrastando(true)
              }}
              onDragLeave={() => setArrastando(false)}
              onDrop={(e) => {
                e.preventDefault()
                setArrastando(false)
                receber(e.dataTransfer.files)
              }}
              className={cn('flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors', arrastando ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/40')}
            >
              <input id="dz-input" type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="sr-only" onChange={(e) => receber(e.target.files)} />
              <div className={cn('flex size-12 items-center justify-center rounded-full bg-muted transition-colors', arrastando && 'bg-primary/10 text-primary')}>
                <CloudUpload className="size-6" />
              </div>
              <p className="mt-4 text-sm font-medium">{arrastando ? 'Pode soltar!' : 'Arraste os arquivos até aqui'}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                ou <span className="font-medium text-primary underline underline-offset-4">clique para selecionar</span>
              </p>
              <p className="mt-3 text-xs text-muted-foreground">PNG, JPG ou PDF · até 10 MB por arquivo</p>
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Aceitos:</span>
              {TIPOS.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
                  <t.Icon className="size-3" /> {t.label}
                </span>
              ))}
            </div>

            {arquivos.length > 0 && (
              <ul className="mt-4 divide-y rounded-lg border">
                {arquivos.map((a) => (
                  <li key={a} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{a}</span>
                    <button type="button" aria-label={`Remover ${a}`} onClick={() => setArquivos((prev) => prev.filter((x) => x !== a))} className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <X className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter className="justify-between border-t">
            <p className="text-xs text-muted-foreground">{arquivos.length} de 5 arquivos</p>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setArquivos([])} disabled={arquivos.length === 0}>
                Limpar
              </Button>
              <Button nativeButton={false} render={<label htmlFor="dz-input" />}>
                <CloudUpload data-icon="inline-start" /> Selecionar arquivos
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
