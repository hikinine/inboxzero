'use client'

import { useState } from 'react'
import { Bold, Code, Italic, Link2, List, ListOrdered, Underline } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const FERRAMENTAS = [
  { Icon: Bold, label: 'Negrito', keys: ['⌘', 'B'] },
  { Icon: Italic, label: 'Itálico', keys: ['⌘', 'I'] },
  { Icon: Underline, label: 'Sublinhado', keys: ['⌘', 'U'] },
  { Icon: Link2, label: 'Inserir link', keys: ['⌘', 'K'] },
  { Icon: List, label: 'Lista', keys: ['⇧', '⌘', '8'] },
  { Icon: ListOrdered, label: 'Lista numerada', keys: ['⇧', '⌘', '7'] },
  { Icon: Code, label: 'Código', keys: ['⌘', 'E'] },
]

const TERMOS = [
  { termo: 'MRR', desc: 'Receita recorrente mensal: soma das assinaturas ativas no mês.' },
  { termo: 'churn', desc: 'Percentual de clientes que cancelaram no período.' },
  { termo: 'ticket médio', desc: 'Valor médio por venda fechada.' },
]

export default function TooltipTeclasEAtraso() {
  const [atraso, setAtraso] = useState(600)

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">Barra de ferramentas com atalhos</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            Atraso
            <ToggleGroup value={[String(atraso)]} onValueChange={(v) => { const n = Number(v[0]); if (!Number.isNaN(n) && v[0] !== undefined) setAtraso(n) }} variant="outline" size="sm" spacing={0} aria-label="Atraso do tooltip">
              {[0, 300, 600, 1000].map((ms) => (
                <ToggleGroupItem key={ms} value={String(ms)} className="px-2 text-xs tabular-nums">
                  {ms} ms
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <TooltipProvider key={atraso} delay={atraso} closeDelay={80}>
          <div className="flex items-center gap-0.5 rounded-lg border bg-card p-1">
            {FERRAMENTAS.map((f, i) => (
              <span key={f.label} className="flex items-center">
                {(i === 4) && <span className="mx-1 h-5 w-px bg-border" aria-hidden />}
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label={f.label} />}>
                    <f.Icon />
                  </TooltipTrigger>
                  <TooltipContent>
                    {f.label}
                    <KbdGroup>
                      {f.keys.map((k) => (
                        <Kbd key={k}>{k}</Kbd>
                      ))}
                    </KbdGroup>
                  </TooltipContent>
                </Tooltip>
              </span>
            ))}
          </div>
        </TooltipProvider>
        <p className="text-xs text-muted-foreground">O primeiro tooltip espera o atraso; os vizinhos abrem na hora enquanto o mouse se move pela barra.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tooltip rico: título, descrição e tecla</p>
        <TooltipProvider delay={300}>
          <div className="flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger render={<Button size="sm" />}>Publicar</TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-56 flex-col items-start gap-1 py-2">
                <span className="font-medium">Publicar para 1.284 contatos</span>
                <span className="text-background/70">Vai para a fila de envio e pode ser cancelado em até 1 minuto.</span>
                <span className="mt-0.5 flex items-center gap-1">
                  <Kbd>⌘</Kbd>
                  <Kbd>↵</Kbd>
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button size="sm" variant="outline" />}>Agendar</TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-56 flex-col items-start gap-1 py-2">
                <span className="font-medium">Escolher data e hora</span>
                <span className="text-background/70">Respeita o fuso de cada contato.</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Sem atraso, em termos do texto</p>
        <TooltipProvider delay={0}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            O{' '}
            <Termo t={TERMOS[0]!} /> cresceu 18% no mês, o <Termo t={TERMOS[1]!} /> caiu para 2,1% e o <Termo t={TERMOS[2]!} /> passou de R$ 1.900.
          </p>
        </TooltipProvider>
      </div>
    </div>
  )
}

function Termo({ t }: { t: { termo: string; desc: string } }) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-help rounded-sm font-medium text-foreground underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">{t.termo}</TooltipTrigger>
      <TooltipContent className="max-w-56">{t.desc}</TooltipContent>
    </Tooltip>
  )
}
