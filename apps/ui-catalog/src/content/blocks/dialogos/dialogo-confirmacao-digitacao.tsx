'use client'

import { useState } from 'react'
import { ArrowRightLeft, ShieldAlert, Trash2, TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const WORKSPACE = 'lumi-tecnologia'
const CONSEQUENCIAS = ['12 membros perdem o acesso imediatamente', '4.820 contatos e 31 automações são apagados', 'A assinatura Pro é cancelada sem reembolso proporcional', 'Um backup fica disponível por 30 dias para restauração']

function ConfirmacaoForm({ idPrefix, valor, onChange }: { idPrefix: string; valor: string; onChange: (v: string) => void }) {
  const confere = valor === WORKSPACE
  const errado = valor.length > 0 && !WORKSPACE.startsWith(valor)
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>Esta ação não pode ser desfeita</AlertTitle>
        <AlertDescription>O workspace {WORKSPACE} e tudo que está nele serão excluídos permanentemente.</AlertDescription>
      </Alert>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {CONSEQUENCIAS.map((c) => (
          <li key={c} className="flex gap-2">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            {c}
          </li>
        ))}
      </ul>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-confirmar`}>
          Digite <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{WORKSPACE}</code> para confirmar
        </FieldLabel>
        <Input id={`${idPrefix}-confirmar`} value={valor} onChange={(e) => onChange(e.target.value)} autoComplete="off" spellCheck={false} aria-invalid={errado} className="font-mono" placeholder={WORKSPACE} />
        <FieldDescription>{confere ? 'Confere. O botão de exclusão foi liberado.' : errado ? 'O texto não corresponde ao nome do workspace.' : `${valor.length} de ${WORKSPACE.length} caracteres`}</FieldDescription>
      </Field>
    </div>
  )
}

export default function DialogoConfirmacaoDigitacao() {
  const [aberto, setAberto] = useState(false)
  const [valorDlg, setValorDlg] = useState('')
  const [valorInl, setValorInl] = useState('')
  const [excluido, setExcluido] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Confirmação com digitação</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Para ações destrutivas, o botão só libera quando a pessoa digita exatamente o nome do recurso. O gatilho real está na zona de perigo; ao lado, o mesmo conteúdo inline.</p>

          <div className="mt-8 overflow-hidden rounded-xl border border-destructive/40">
            <div className="border-b border-destructive/40 bg-destructive/5 px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
                <ShieldAlert className="size-4" /> Zona de perigo
              </p>
            </div>
            <ul className="divide-y">
              <li className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-medium">Transferir propriedade</p>
                  <p className="text-xs text-muted-foreground">Passe o workspace para outra pessoa administradora.</p>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowRightLeft data-icon="inline-start" /> Transferir
                </Button>
              </li>
              <li className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-medium">Excluir workspace</p>
                  <p className="text-xs text-muted-foreground">Apaga contatos, conversas, automações e membros.</p>
                </div>
                <Dialog
                  open={aberto}
                  onOpenChange={(o) => {
                    setAberto(o)
                    if (!o) setValorDlg('')
                  }}
                >
                  <DialogTrigger render={<Button variant="destructive" size="sm" />}>
                    <Trash2 data-icon="inline-start" /> Excluir workspace
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Excluir {WORKSPACE}?</DialogTitle>
                      <DialogDescription>Leia com atenção antes de confirmar.</DialogDescription>
                    </DialogHeader>
                    <ConfirmacaoForm idPrefix="dlg" valor={valorDlg} onChange={setValorDlg} />
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                      <Button
                        variant="destructive"
                        disabled={valorDlg !== WORKSPACE}
                        onClick={() => {
                          setAberto(false)
                          setExcluido(true)
                        }}
                      >
                        Excluir permanentemente
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
          {excluido && (
            <p className="mt-3 text-sm text-muted-foreground">
              Workspace excluído (simulação).{' '}
              <button type="button" onClick={() => setExcluido(false)} className="font-medium text-foreground underline underline-offset-4">
                Restaurar do backup
              </button>
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-medium">Excluir {WORKSPACE}?</h3>
            <p className="text-sm text-muted-foreground">Leia com atenção antes de confirmar.</p>
          </div>
          <ConfirmacaoForm idPrefix="inl" valor={valorInl} onChange={setValorInl} />
          <div className="-mx-6 -mb-6 mt-6 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 px-6 py-4">
            <Button variant="outline" onClick={() => setValorInl('')}>
              Cancelar
            </Button>
            <Button variant="destructive" disabled={valorInl !== WORKSPACE}>
              Excluir permanentemente
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
