'use client'

import { FilePlus2, FolderOpen } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

function Documento({ delay }: { delay: number }) {
  return (
    <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}>
      <rect width="44" height="54" rx="5" className="fill-background stroke-border" strokeWidth="1.5" />
      <rect x="9" y="11" width="26" height="3" rx="1.5" className="fill-muted-foreground/40" />
      <rect x="9" y="20" width="20" height="3" rx="1.5" className="fill-muted-foreground/25" />
      <rect x="9" y="29" width="24" height="3" rx="1.5" className="fill-muted-foreground/25" />
      <rect x="9" y="38" width="14" height="3" rx="1.5" className="fill-primary/70" />
    </motion.g>
  )
}

const MODELOS = ['Proposta comercial', 'Contrato de serviço', 'Orçamento', 'Relatório mensal']

export default function EstadoVazioIlustracao() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <svg viewBox="0 0 240 180" className="h-auto w-60" aria-hidden="true">
          <ellipse cx="120" cy="166" rx="74" ry="7" className="fill-muted" />
          <path d="M60 96 L120 74 L180 96 L120 118 Z" className="fill-muted-foreground/10 stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
          <g transform="translate(64 30) rotate(-12 22 27)">
            <Documento delay={0} />
          </g>
          <g transform="translate(98 14)">
            <Documento delay={0.5} />
          </g>
          <g transform="translate(132 28) rotate(12 22 27)">
            <Documento delay={1} />
          </g>
          <path d="M60 96 L120 118 L120 170 L60 148 Z" className="fill-muted stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M120 118 L180 96 L180 148 L120 170 Z" className="fill-muted-foreground/15 stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M60 96 L34 86 L94 64 L120 74 Z" className="fill-muted stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M180 96 L206 86 L146 64 L120 74 Z" className="fill-muted stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
          <motion.circle cx="40" cy="44" r="3" className="fill-primary" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.4, repeat: Infinity }} />
          <motion.circle cx="208" cy="36" r="2.5" className="fill-primary" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.path d="M188 54 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 z" className="fill-amber-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
        </svg>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Nenhum documento ainda</h2>
        <p className="mt-2 max-w-md text-muted-foreground">Crie propostas, contratos e relatórios a partir dos seus negócios. Tudo fica versionado e pronto para assinar.</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button>
            <FilePlus2 data-icon="inline-start" /> Novo documento
          </Button>
          <Button variant="outline">
            <FolderOpen data-icon="inline-start" /> Importar do Google Drive
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Ou comece por um modelo:</span>
          {MODELOS.map((m) => (
            <Button key={m} variant="outline" size="xs" className="rounded-full">
              {m}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
