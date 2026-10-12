'use client'

import { Building2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Switch } from '@/components/ui/switch'

function Secao({ titulo, descricao, children }: { titulo: string; descricao: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 py-10 first:pt-0 md:grid-cols-3">
      <div className="md:pr-8">
        <h3 className="text-base font-semibold">{titulo}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  )
}

export default function FormularioEmSecoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dados da empresa</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Essas informações aparecem nas propostas, nos contratos e nas notas fiscais emitidas pelo Lumi.</p>
        </div>

        <form className="divide-y" onSubmit={(e) => e.preventDefault()}>
          <Secao titulo="Identificação" descricao="Razão social e marca, como constam na Receita Federal.">
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-center gap-4 sm:col-span-2">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border bg-muted">
                  <Building2 className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload data-icon="inline-start" /> Enviar logo
                  </Button>
                  <p className="mt-1.5 text-xs text-muted-foreground">PNG ou SVG com fundo transparente, até 1 MB.</p>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="fs-razao">Razão social</FieldLabel>
                <Input id="fs-razao" defaultValue="Lumi Tecnologia Ltda." />
              </Field>
              <Field>
                <FieldLabel htmlFor="fs-fantasia">Nome fantasia</FieldLabel>
                <Input id="fs-fantasia" defaultValue="Lumi" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fs-cnpj">CNPJ</FieldLabel>
                <Input id="fs-cnpj" defaultValue="12.345.678/0001-90" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fs-ie">Inscrição estadual</FieldLabel>
                <Input id="fs-ie" defaultValue="123.456.789.012" />
                <FieldDescription>Deixe em branco se for isenta.</FieldDescription>
              </Field>
            </FieldGroup>
          </Secao>

          <Secao titulo="Endereço" descricao="Endereço fiscal, usado no rodapé dos documentos.">
            <FieldGroup className="grid gap-5 sm:grid-cols-6">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fs-cep">CEP</FieldLabel>
                <Input id="fs-cep" defaultValue="01310-200" />
              </Field>
              <Field className="sm:col-span-4">
                <FieldLabel htmlFor="fs-logradouro">Logradouro</FieldLabel>
                <Input id="fs-logradouro" defaultValue="Avenida Paulista" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fs-numero">Número</FieldLabel>
                <Input id="fs-numero" defaultValue="1578" />
              </Field>
              <Field className="sm:col-span-4">
                <FieldLabel htmlFor="fs-complemento">Complemento</FieldLabel>
                <Input id="fs-complemento" defaultValue="Conjunto 1204" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fs-bairro">Bairro</FieldLabel>
                <Input id="fs-bairro" defaultValue="Bela Vista" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fs-cidade">Cidade</FieldLabel>
                <Input id="fs-cidade" defaultValue="São Paulo" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fs-uf">Estado</FieldLabel>
                <NativeSelect id="fs-uf" defaultValue="SP" className="w-full">
                  <NativeSelectOption value="SP">SP</NativeSelectOption>
                  <NativeSelectOption value="RJ">RJ</NativeSelectOption>
                  <NativeSelectOption value="MG">MG</NativeSelectOption>
                  <NativeSelectOption value="PR">PR</NativeSelectOption>
                  <NativeSelectOption value="RS">RS</NativeSelectOption>
                </NativeSelect>
              </Field>
            </FieldGroup>
          </Secao>

          <Secao titulo="Faturamento" descricao="Para onde enviamos cobranças e notas fiscais.">
            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fs-email-cobranca">E-mail de cobrança</FieldLabel>
                  <Input id="fs-email-cobranca" type="email" defaultValue="financeiro@lumi.com.br" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fs-vencimento">Dia de vencimento</FieldLabel>
                  <NativeSelect id="fs-vencimento" defaultValue="12" className="w-full">
                    <NativeSelectOption value="5">Dia 5</NativeSelectOption>
                    <NativeSelectOption value="12">Dia 12</NativeSelectOption>
                    <NativeSelectOption value="20">Dia 20</NativeSelectOption>
                    <NativeSelectOption value="28">Dia 28</NativeSelectOption>
                  </NativeSelect>
                </Field>
              </div>
              <div className="divide-y rounded-lg border">
                <div className="flex items-center justify-between gap-4 p-3">
                  <div>
                    <p className="text-sm font-medium">Receber nota fiscal por e-mail</p>
                    <p className="text-xs text-muted-foreground">O PDF e o XML vão junto com a fatura.</p>
                  </div>
                  <Switch defaultChecked aria-label="Receber nota fiscal por e-mail" />
                </div>
                <div className="flex items-center justify-between gap-4 p-3">
                  <div>
                    <p className="text-sm font-medium">Lembrete 3 dias antes do vencimento</p>
                    <p className="text-xs text-muted-foreground">Enviado para o e-mail de cobrança e pelo WhatsApp.</p>
                  </div>
                  <Switch aria-label="Lembrete antes do vencimento" />
                </div>
              </div>
            </FieldGroup>
          </Secao>

          <div className="flex items-center justify-end gap-2 pt-6">
            <Button variant="ghost">Descartar</Button>
            <Button>Salvar alterações</Button>
          </div>
        </form>
      </div>
    </section>
  )
}
