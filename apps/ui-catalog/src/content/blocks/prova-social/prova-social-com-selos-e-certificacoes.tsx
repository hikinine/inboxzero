'use client'

import { useId } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, CreditCard, Fingerprint, Lock, Server, ShieldCheck } from 'lucide-react'

interface SeloInfo {
  sigla: string
  nome: string
  Icon: LucideIcon
  descricao: string
  anel: string
  cor: string
}

const SELOS: SeloInfo[] = [
  { sigla: 'ISO 27001', nome: 'Segurança da informação', Icon: ShieldCheck, descricao: 'Sistema de gestão auditado anualmente por certificadora independente.', anel: 'CERTIFICADO · ISO/IEC 27001 · 2026 · ', cor: 'text-emerald-600 dark:text-emerald-400' },
  { sigla: 'SOC 2', nome: 'Tipo II', Icon: Lock, descricao: 'Controles de segurança, disponibilidade e confidencialidade observados por 12 meses.', anel: 'AUDITADO · SOC 2 TIPO II · 2026 · ', cor: 'text-sky-600 dark:text-sky-400' },
  { sigla: 'LGPD', nome: 'Proteção de dados', Icon: Fingerprint, descricao: 'DPO nomeado, registro de tratamento e contrato de processamento para clientes.', anel: 'ADEQUADO · LGPD · LEI 13.709 · ', cor: 'text-violet-600 dark:text-violet-400' },
  { sigla: 'PCI DSS', nome: 'Nível 1', Icon: CreditCard, descricao: 'Dados de cartão nunca passam pelos nossos servidores: tokenização ponta a ponta.', anel: 'CONFORME · PCI DSS 4.0 · 2026 · ', cor: 'text-amber-600 dark:text-amber-400' },
  { sigla: 'BR', nome: 'Dados no Brasil', Icon: Server, descricao: 'Hospedagem na região de São Paulo, com réplica em outra zona e backups diários.', anel: 'HOSPEDADO · SÃO PAULO · BRASIL · ', cor: 'text-rose-600 dark:text-rose-400' },
]

function Selo({ sigla, Icon, anel, cor }: Pick<SeloInfo, 'sigla' | 'Icon' | 'anel' | 'cor'>) {
  const id = `selo-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <div className="relative mx-auto size-36">
      <svg viewBox="0 0 160 160" className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id={id} d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
        </defs>
        <circle cx="80" cy="80" r="77" className="fill-none stroke-border" strokeWidth="1.5" strokeDasharray="2 5" />
        <circle cx="80" cy="80" r="48" className="fill-muted" />
        <text className="fill-muted-foreground text-[8.5px] font-semibold tracking-[0.22em]">
          <textPath href={`#${id}`}>{anel}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Icon className={`size-7 ${cor}`} />
        <span className="mt-1.5 text-xs font-bold tracking-tight">{sigla}</span>
      </div>
    </div>
  )
}

export default function ProvaSocialComSelosECertificacoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Segurança e conformidade</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Certificados por quem audita de verdade</h2>
          <p className="mt-3 text-muted-foreground">Os selos abaixo não são autodeclarados: cada um tem auditoria externa, relatório e data de validade.</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {SELOS.map((s) => (
            <li key={s.sigla} className="flex flex-col items-center text-center">
              <Selo sigla={s.sigla} Icon={s.Icon} anel={s.anel} cor={s.cor} />
              <h3 className="mt-5 text-sm font-semibold">
                {s.sigla}
                <span className="block text-xs font-normal text-muted-foreground">{s.nome}</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.descricao}</p>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-medium hover:underline">
                Ver certificado <ArrowUpRight className="size-3" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-14 border-t pt-6 text-center text-xs text-muted-foreground">Relatórios completos disponíveis no Trust Center, mediante NDA. Última auditoria externa: agosto de 2026.</p>
      </div>
    </section>
  )
}
