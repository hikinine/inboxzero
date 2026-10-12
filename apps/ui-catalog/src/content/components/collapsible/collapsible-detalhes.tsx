'use client'

import { Fragment, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const INTEGRACOES = ['WhatsApp Business', 'Instagram Direct', 'Gmail', 'RD Station', 'Pipedrive', 'Zapier', 'Slack']
const VISIVEIS = 3

const ESPECIFICACOES: [string, string][] = [
  ['Processador', 'Apple M4 · 10 núcleos'],
  ['Memória', '16 GB unificada'],
  ['Armazenamento', 'SSD 512 GB'],
  ['Tela', '14" Liquid Retina XDR'],
  ['Peso', '1,55 kg'],
  ['Garantia', '12 meses'],
]

export default function CollapsibleDetalhes() {
  const [texto, setTexto] = useState(false)
  const [lista, setLista] = useState(false)
  const [specs, setSpecs] = useState(true)

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Mostrar mais em texto</Legenda>
        <Collapsible open={texto} onOpenChange={setTexto} className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            A Lumi Tecnologia começou em 2019 como um estúdio de design em Curitiba e hoje atende 120 clientes em todo o Brasil.
          </p>
          <CollapsibleContent className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>Em 2022 a empresa abriu a área de produto e, em 2024, lançou o próprio CRM com atendimento por WhatsApp integrado.</p>
            <p>Hoje são 38 pessoas, 70% em regime remoto, com escritórios em Curitiba e São Paulo.</p>
          </CollapsibleContent>
          <CollapsibleTrigger render={<Button variant="link" size="sm" className="mt-2 h-auto p-0" />}>
            {texto ? 'Mostrar menos' : 'Mostrar mais'}
            <ChevronDown data-icon="inline-end" className={`transition-transform ${texto ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <div>
        <Legenda>Lista com itens ocultos</Legenda>
        <Collapsible open={lista} onOpenChange={setLista} className="overflow-hidden rounded-xl border">
          <ul className="divide-y text-sm">
            {INTEGRACOES.slice(0, VISIVEIS).map((i) => (
              <li key={i} className="flex items-center gap-2 px-4 py-2.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {i}
              </li>
            ))}
          </ul>
          <CollapsibleContent>
            <ul className="divide-y border-t text-sm">
              {INTEGRACOES.slice(VISIVEIS).map((i) => (
                <li key={i} className="flex items-center gap-2 px-4 py-2.5">
                  <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                  {i}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
          <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="w-full rounded-none border-t" />}>
            {lista ? 'Ver menos' : `Ver mais ${INTEGRACOES.length - VISIVEIS} integrações`}
            <ChevronDown data-icon="inline-end" className={`transition-transform ${lista ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <div>
        <Legenda>Detalhes técnicos</Legenda>
        <Collapsible open={specs} onOpenChange={setSpecs} className="rounded-xl border">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-sm font-medium">MacBook Pro 14"</div>
              <div className="text-xs text-muted-foreground">Especificações técnicas</div>
            </div>
            <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Alternar especificações" />}>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t px-4 py-3 text-sm">
              {ESPECIFICACOES.map(([k, v]) => (
                <Fragment key={k}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </Fragment>
              ))}
            </dl>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
