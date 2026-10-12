'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CreditCard, Landmark, QrCode, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const PASSOS = ['Endereço', 'Pagamento', 'Revisão']

const PAGAMENTOS = [
  { value: 'cartao', Icon: CreditCard, titulo: 'Cartão de crédito', descricao: 'Até 12× sem juros' },
  { value: 'pix', Icon: QrCode, titulo: 'Pix', descricao: 'Aprovação imediata · 5% de desconto' },
  { value: 'boleto', Icon: Landmark, titulo: 'Boleto', descricao: 'Compensa em até 2 dias úteis' },
] as const

type Pagamento = (typeof PAGAMENTOS)[number]['value']

const ITENS = [
  { nome: 'Plano Pro · anual', valor: 'R$ 1.428,00' },
  { nome: '2 números extras de WhatsApp', valor: 'R$ 98,00' },
  { nome: 'Cupom LUMI10', valor: '− R$ 142,80' },
]

export default function MultiEtapasCheckout() {
  const [passo, setPasso] = useState(1)
  const [pagamento, setPagamento] = useState<Pagamento>('cartao')
  const [termos, setTermos] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Finalizar assinatura</h2>
          <p className="mt-2 text-muted-foreground">Três passos curtos. Seus dados ficam salvos se você sair e voltar.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr_320px]">
          <ol className="flex gap-2 lg:flex-col lg:gap-1">
            {PASSOS.map((p, i) => {
              const feito = i < passo
              const atual = i === passo
              return (
                <li key={p}>
                  <button type="button" onClick={() => i < passo && setPasso(i)} disabled={i > passo} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors', atual && 'bg-muted font-medium', feito && 'hover:bg-muted/60', i > passo && 'text-muted-foreground')}>
                    <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full border text-xs', feito && 'border-primary bg-primary text-primary-foreground', atual && 'border-primary text-primary')}>{feito ? <Check className="size-3" /> : i + 1}</span>
                    <span className="hidden sm:inline">{p}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="rounded-xl border bg-card">
            <div className="border-b px-6 py-4">
              <h3 className="font-semibold">{PASSOS[passo]}</h3>
              <p className="text-sm text-muted-foreground">{passo === 0 ? 'Para emissão da nota fiscal.' : passo === 1 ? 'Escolha como quer pagar.' : 'Confira tudo antes de confirmar.'}</p>
            </div>
            <div className="p-6">
              {passo === 0 && (
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="ck-nome">Nome completo</FieldLabel>
                      <Input id="ck-nome" defaultValue="Ana Souza" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-doc">CPF ou CNPJ</FieldLabel>
                      <Input id="ck-doc" defaultValue="12.345.678/0001-90" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-cep">CEP</FieldLabel>
                      <Input id="ck-cep" defaultValue="01310-200" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-rua">Endereço</FieldLabel>
                      <Input id="ck-rua" defaultValue="Av. Paulista" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-num">Número</FieldLabel>
                      <Input id="ck-num" defaultValue="1578" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-comp">Complemento</FieldLabel>
                      <Input id="ck-comp" defaultValue="Conj. 1204" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-cidade">Cidade</FieldLabel>
                      <Input id="ck-cidade" defaultValue="São Paulo" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ck-uf">Estado</FieldLabel>
                      <NativeSelect id="ck-uf" defaultValue="SP" className="w-full">
                        <NativeSelectOption value="SP">São Paulo</NativeSelectOption>
                        <NativeSelectOption value="RJ">Rio de Janeiro</NativeSelectOption>
                        <NativeSelectOption value="MG">Minas Gerais</NativeSelectOption>
                        <NativeSelectOption value="PR">Paraná</NativeSelectOption>
                        <NativeSelectOption value="RS">Rio Grande do Sul</NativeSelectOption>
                      </NativeSelect>
                    </Field>
                  </div>
                </FieldGroup>
              )}

              {passo === 1 && (
                <FieldGroup>
                  <RadioGroup value={pagamento} onValueChange={(v) => setPagamento(v as Pagamento)} className="gap-3">
                    {PAGAMENTOS.map((p) => (
                      <FieldLabel key={p.value} htmlFor={`ck-pg-${p.value}`}>
                        <Field orientation="horizontal">
                          <p.Icon className="size-4 shrink-0 text-muted-foreground" />
                          <FieldContent>
                            <FieldTitle>{p.titulo}</FieldTitle>
                            <FieldDescription>{p.descricao}</FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value={p.value} id={`ck-pg-${p.value}`} />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>

                  {pagamento === 'cartao' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field className="sm:col-span-2">
                        <FieldLabel htmlFor="ck-cartao">Número do cartão</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>
                            <CreditCard />
                          </InputGroupAddon>
                          <InputGroupInput id="ck-cartao" inputMode="numeric" defaultValue="5412 7512 3412 3456" />
                          <InputGroupAddon align="inline-end">
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold tracking-wider">MASTERCARD</span>
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                      <Field className="sm:col-span-2">
                        <FieldLabel htmlFor="ck-titular">Nome impresso no cartão</FieldLabel>
                        <Input id="ck-titular" defaultValue="ANA C SOUZA" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="ck-validade">Validade</FieldLabel>
                        <Input id="ck-validade" placeholder="MM/AA" defaultValue="09/28" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="ck-cvv">CVV</FieldLabel>
                        <Input id="ck-cvv" inputMode="numeric" placeholder="123" defaultValue="804" />
                      </Field>
                      <Field className="sm:col-span-2">
                        <FieldLabel htmlFor="ck-parcelas">Parcelas</FieldLabel>
                        <NativeSelect id="ck-parcelas" defaultValue="12" className="w-full">
                          <NativeSelectOption value="1">1× de R$ 1.383,20</NativeSelectOption>
                          <NativeSelectOption value="6">6× de R$ 230,53</NativeSelectOption>
                          <NativeSelectOption value="12">12× de R$ 115,27</NativeSelectOption>
                        </NativeSelect>
                      </Field>
                    </div>
                  )}
                  {pagamento === 'pix' && <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">O QR code aparece na próxima tela e vale por 30 minutos. Com Pix, o total cai para R$ 1.314,04.</p>}
                  {pagamento === 'boleto' && <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">O boleto vence em 3 dias úteis. O acesso ao plano é liberado após a compensação.</p>}
                </FieldGroup>
              )}

              {passo === 2 && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Endereço de cobrança</p>
                        <Button variant="link" size="xs" onClick={() => setPasso(0)}>
                          Editar
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Ana Souza · 12.345.678/0001-90
                        <br />
                        Av. Paulista, 1578 · Conj. 1204
                        <br />
                        São Paulo, SP · 01310-200
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Pagamento</p>
                        <Button variant="link" size="xs" onClick={() => setPasso(1)}>
                          Editar
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {pagamento === 'cartao' ? 'Mastercard •••• 3456' : pagamento === 'pix' ? 'Pix (5% de desconto)' : 'Boleto bancário'}
                        <br />
                        {pagamento === 'cartao' ? '12× de R$ 115,27 sem juros' : 'Pagamento único'}
                      </p>
                    </div>
                  </div>
                  <Label htmlFor="ck-termos" className="flex items-start gap-3 rounded-lg border p-3 font-normal">
                    <Checkbox id="ck-termos" checked={termos} onCheckedChange={setTermos} className="mt-0.5" />
                    <span className="text-sm">
                      Li e concordo com os <span className="underline underline-offset-4">termos de uso</span> e a <span className="underline underline-offset-4">política de privacidade</span>.
                    </span>
                  </Label>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t bg-muted/40 px-6 py-4">
              <Button variant="ghost" disabled={passo === 0} onClick={() => setPasso(passo - 1)}>
                <ArrowLeft data-icon="inline-start" /> Voltar
              </Button>
              {passo < 2 ? (
                <Button onClick={() => setPasso(passo + 1)}>
                  Continuar <ArrowRight data-icon="inline-end" />
                </Button>
              ) : (
                <Button disabled={!termos}>
                  <ShieldCheck data-icon="inline-start" /> Confirmar pedido
                </Button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-xl border bg-card p-5">
            <h3 className="font-semibold">Resumo</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {ITENS.map((it) => (
                <li key={it.nome} className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">{it.nome}</span>
                  <span className={cn('tabular-nums', it.valor.startsWith('−') && 'text-emerald-600 dark:text-emerald-400')}>{it.valor}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="text-xl font-semibold tabular-nums">R$ 1.383,20</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Equivale a R$ 115,27/mês. Renovação automática em 12 out 2027.</p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-emerald-500" /> Pagamento criptografado e garantia de 14 dias.
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
