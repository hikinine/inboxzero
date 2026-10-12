'use client'

import type { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function InputVariantesEEstados() {
  return (
    <div className="grid w-full max-w-2xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Campo label="Padrão" htmlFor="in-nome">
        <Input id="in-nome" placeholder="Ana Souza" />
      </Campo>
      <Campo label="Com valor" htmlFor="in-empresa">
        <Input id="in-empresa" defaultValue="Lumi Tecnologia" />
      </Campo>
      <Campo label="Desabilitado" htmlFor="in-plano">
        <Input id="in-plano" defaultValue="Plano Profissional" disabled />
      </Campo>
      <Campo label="Somente leitura" htmlFor="in-id">
        <Input id="in-id" defaultValue="cus_8f2k1q" readOnly className="bg-muted/50 font-mono" />
      </Campo>
      <Campo label="Inválido" htmlFor="in-email">
        <Input id="in-email" type="email" defaultValue="ana@lumi" aria-invalid />
        <p className="text-xs text-destructive">Informe um e-mail válido.</p>
      </Campo>
      <Campo label="Com ajuda" htmlFor="in-site">
        <Input id="in-site" placeholder="suaempresa.com.br" />
        <p className="text-xs text-muted-foreground">Sem “https://”. Usado no rodapé dos e-mails.</p>
      </Campo>
      <Campo label="Tamanhos" htmlFor="in-sm">
        <div className="space-y-2">
          <Input id="in-sm" placeholder="Pequeno" className="h-7 px-2 text-xs md:text-xs" />
          <Input placeholder="Padrão" aria-label="Padrão" />
          <Input placeholder="Grande" aria-label="Grande" className="h-9 px-3" />
        </div>
      </Campo>
      <Campo label="Tipos" htmlFor="in-qtd">
        <div className="space-y-2">
          <Input id="in-qtd" type="number" min={0} defaultValue={12} aria-label="Quantidade" />
          <Input type="file" aria-label="Anexo" />
        </div>
      </Campo>
    </div>
  )
}

function Campo({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <Label htmlFor={htmlFor} className="sr-only">
        {label}
      </Label>
      {children}
    </div>
  )
}
