'use client'

import { ArrowRight, Building2, ChartPie, FileText, Landmark, QrCode, ShieldCheck } from 'lucide-react'

const RECURSOS = [
  { Icon: FileText, titulo: 'NF-e e NFS-e em segundos', texto: 'Emita, cancele e envie por e-mail ou WhatsApp sem sair da tela de venda.' },
  { Icon: Landmark, titulo: 'Conciliação bancária', texto: 'Extratos do Itaú, Nubank, Inter e Sicoob conciliados automaticamente, todo dia.' },
  { Icon: QrCode, titulo: 'Boletos e Pix', texto: 'Cobre com QR Code ou boleto registrado e deixe o lembrete de vencimento por nossa conta.' },
  { Icon: ChartPie, titulo: 'DRE sem planilha', texto: 'Resultado por centro de custo, atualizado a cada lançamento, pronto para o contador.' },
  { Icon: Building2, titulo: 'Multiempresa', texto: 'Troque de CNPJ com um clique e consolide os números do grupo num só painel.' },
  { Icon: ShieldCheck, titulo: 'Permissões por papel', texto: 'O contador vê o que precisa; o vendedor, só o dele. Tudo com trilha de auditoria.' },
]

export default function FeaturesEmGradeComIcones() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Recursos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O financeiro inteiro, sem abrir o Excel</h2>
          <p className="mt-3 text-muted-foreground">Seis módulos que conversam entre si. Comece pela emissão de notas e ligue o resto quando fizer sentido.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECURSOS.map((r) => (
            <div key={r.titulo} className="group rounded-2xl bg-muted/40 p-6 transition-colors hover:bg-muted/70">
              <span className="flex size-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <r.Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-medium">{r.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.texto}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Saiba mais <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
