'use client'

import { useState } from 'react'
import { Barcode, Check, Copy, CreditCard, QrCode, type LucideIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

type Metodo = 'pix' | 'cartao' | 'boleto'

interface Opcao {
  id: Metodo
  nome: string
  detalhe: string
  Icon: LucideIcon
  selo?: string
}

const OPCOES: Opcao[] = [
  { id: 'pix', nome: 'Pix', detalhe: 'Aprovação na hora', Icon: QrCode, selo: '5% off' },
  { id: 'cartao', nome: 'Cartão', detalhe: 'Até 12x sem juros', Icon: CreditCard },
  { id: 'boleto', nome: 'Boleto', detalhe: 'Compensa em 2 dias úteis', Icon: Barcode },
]

const VALOR = 1290
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function RadioGroupMetodosDePagamento() {
  const [metodo, setMetodo] = useState<Metodo>('pix')
  const [parcelas, setParcelas] = useState(3)
  const [copiado, setCopiado] = useState(false)
  const total = metodo === 'pix' ? VALOR * 0.95 : VALOR

  return (
    <div className="w-full max-w-md space-y-4">
      <RadioGroup value={metodo} onValueChange={(v) => setMetodo(v as Metodo)} aria-label="Forma de pagamento" className="grid-cols-3 gap-3">
        {OPCOES.map((o) => {
          const ativo = metodo === o.id
          return (
            <Label key={o.id} htmlFor={`pag-${o.id}`} className={cn('relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-center leading-snug transition-colors', ativo ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50')}>
              <RadioGroupItem id={`pag-${o.id}`} value={o.id} className="absolute top-2.5 left-2.5" />
              {o.selo && <span className="absolute top-2 right-2 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">{o.selo}</span>}
              <span className={cn('mt-2 flex size-11 items-center justify-center rounded-full', ativo ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                <o.Icon className="size-5" />
              </span>
              <span className="text-sm">{o.nome}</span>
              <span className="text-[11px] font-normal text-muted-foreground">{o.detalhe}</span>
            </Label>
          )
        })}
      </RadioGroup>

      <div className="rounded-xl border bg-card p-4 text-sm">
        {metodo === 'pix' && (
          <div className="flex items-center gap-4">
            <div className="grid size-16 shrink-0 grid-cols-6 gap-px overflow-hidden rounded-md bg-background p-1 ring-1 ring-border" aria-hidden>
              {Array.from({ length: 36 }, (_, i) => (
                <span key={i} className={cn('rounded-[1px]', (i * 7) % 3 === 0 || i % 5 === 0 ? 'bg-foreground' : 'bg-transparent')} />
              ))}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="font-medium">Pague com o QR code ou copie a chave</div>
              <div className="text-xs text-muted-foreground">O pedido é liberado em segundos após o pagamento.</div>
              <button
                type="button"
                onClick={() => {
                  setCopiado(true)
                  setTimeout(() => setCopiado(false), 1500)
                }}
                className="mt-1 inline-flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 font-mono text-xs hover:bg-muted"
              >
                {copiado ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />} 00020126580014br.gov.bcb.pix…
              </button>
            </div>
          </div>
        )}
        {metodo === 'cartao' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Parcelamento</span>
              <NativeSelect size="sm" value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} aria-label="Número de parcelas">
                {[1, 2, 3, 6, 12].map((n) => (
                  <NativeSelectOption key={n} value={n}>
                    {n}x de {brl(VALOR / n)}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="flex gap-1.5">
              {['Visa', 'Master', 'Elo', 'Amex'].map((b) => (
                <span key={b} className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}
        {metodo === 'boleto' && (
          <div className="space-y-1">
            <div className="font-medium">Boleto gerado após a confirmação</div>
            <div className="text-xs text-muted-foreground">Vence em 3 dias úteis. O acesso é liberado quando o banco compensar.</div>
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between border-t pt-3">
        <span className="text-sm text-muted-foreground">Total {metodo === 'pix' && <span className="text-emerald-600 dark:text-emerald-400">(com 5% de desconto)</span>}</span>
        <span className="text-lg font-semibold tabular-nums">{metodo === 'cartao' && parcelas > 1 ? `${parcelas}x ${brl(VALOR / parcelas)}` : brl(total)}</span>
      </div>
    </div>
  )
}
