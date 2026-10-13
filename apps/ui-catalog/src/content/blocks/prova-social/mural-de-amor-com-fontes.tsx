'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Fonte = 'x' | 'g2' | 'reddit'

interface Post {
  nome: string
  usuario: string
  texto: string
  fonte: Fonte
  data: string
}

function IconeFonte({ fonte, className }: { fonte: Fonte; className?: string }) {
  if (fonte === 'x') {
    return (
      <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-label="Publicado no X" role="img">
        <path d="M4 4 L20 20 M20 4 L4 20" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (fonte === 'g2') {
    return (
      <svg viewBox="0 0 24 24" className={cn('size-4 text-rose-500', className)} aria-label="Avaliação no G2" role="img">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">
          G2
        </text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4 text-orange-500', className)} aria-label="Comentário no Reddit" role="img">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <ellipse cx="12" cy="14" rx="6" ry="4" fill="white" />
      <circle cx="9.6" cy="13.6" r="1" fill="currentColor" />
      <circle cx="14.4" cy="13.6" r="1" fill="currentColor" />
      <circle cx="16.5" cy="6.5" r="1.4" fill="white" />
      <path d="M12 10 L13 6.2 L16.5 6.5" stroke="white" strokeWidth="1" fill="none" />
    </svg>
  )
}

const POSTS: Post[] = [
  { nome: 'Rafaela Nunes', usuario: '@rafanunes', fonte: 'x', data: '12 set', texto: 'Migrei o financeiro da agência em uma tarde. A conciliação do Pix sozinha já pagou a assinatura do ano.' },
  { nome: 'Thiago M.', usuario: 'Gerente de operações', fonte: 'g2', data: 'ago 2026', texto: 'Suporte responde em minutos, em português, e entende o problema de primeira. Raro em software.' },
  { nome: 'u/devdoceara', usuario: 'r/brdev', fonte: 'reddit', data: '3 sem', texto: 'API bem documentada, webhooks confiáveis e sandbox que não cai. Recomendo pra quem integra ERP.' },
  { nome: 'Camila Rocha', usuario: '@camilarocha', fonte: 'x', data: '2 out', texto: 'Fechamos o mês sem planilha pela primeira vez. Até o contador elogiou.' },
  { nome: 'Eduardo Lima', usuario: 'CFO, varejo', fonte: 'g2', data: 'jul 2026', texto: 'Os relatórios de fluxo de caixa substituíram três ferramentas. Implantação em duas semanas.' },
  { nome: 'u/lojinha_sp', usuario: 'r/empreendedorismo', fonte: 'reddit', data: '1 mês', texto: 'Testei quatro. Esse foi o único que emite nota e cobra no mesmo fluxo sem gambiarra.' },
  { nome: 'Juliana Prado', usuario: '@jupradodesign', fonte: 'x', data: '28 set', texto: 'O app no celular é tão bom quanto o web. Aprovo pagamento na fila do pão.' },
  { nome: 'Marcos Vieira', usuario: 'Dono, oficina', fonte: 'g2', data: 'set 2026', texto: 'Lembrete automático de cobrança reduziu nossa inadimplência de 14% para 4%.' },
  { nome: 'u/contabilnerd', usuario: 'r/contabilidade', fonte: 'reddit', data: '2 sem', texto: 'Exporta SPED certinho e o plano de contas é editável. Indico pros meus clientes.' },
]

const ROTULO: Record<Fonte, string> = { x: 'X', g2: 'G2', reddit: 'Reddit' }

function CardPost({ p }: { p: Post }) {
  const iniciais = p.nome.replace('u/', '').split(/[ _]/).map((s) => s[0]?.toUpperCase()).slice(0, 2).join('')
  return (
    <figure className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback className="text-[10px]">{iniciais}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{p.nome}</p>
          <p className="truncate text-xs text-muted-foreground">{p.usuario}</p>
        </div>
        <IconeFonte fonte={p.fonte} />
      </div>
      {p.fonte === 'g2' && (
        <div className="mt-3 flex gap-0.5 text-amber-500" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
      )}
      <blockquote className="mt-3 text-sm leading-relaxed">{p.texto}</blockquote>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        {ROTULO[p.fonte]} · {p.data}
      </figcaption>
    </figure>
  )
}

function Coluna({ itens, duracao, reverso, className }: { itens: Post[]; duracao: number; reverso?: boolean; className?: string }) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex flex-col gap-4 pb-4"
        animate={{ y: reverso ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}
      >
        {[...itens, ...itens].map((p, i) => (
          <CardPost key={`${p.nome}-${i}`} p={p} />
        ))}
      </motion.div>
    </div>
  )
}

export default function MuralDeAmorComFontes() {
  const contagem = (f: Fonte) => POSTS.filter((p) => p.fonte === f).length
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Mural de amor</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">O que dizem por aí, sem filtro</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['x', 'g2', 'reddit'] as const).map((f) => (
              <span key={f} className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs">
                <IconeFonte fonte={f} className="size-3.5" />
                {ROTULO[f]}
                <span className="text-muted-foreground">{contagem(f) * 214}+</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-12 grid h-[560px] grid-cols-1 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
          <Coluna itens={POSTS.slice(0, 3)} duracao={26} />
          <Coluna itens={POSTS.slice(3, 6)} duracao={32} reverso className="hidden sm:block" />
          <Coluna itens={POSTS.slice(6, 9)} duracao={29} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
