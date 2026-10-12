'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Testimonial Marquee": duas faixas de cards de depoimento (estrelas, citação, autor) rolando em sentidos opostos,
// com fade nas bordas.
interface Testimonial {
  initials: string
  name: string
  role: string
  text: string
}
const ROW_A: Testimonial[] = [
  { initials: 'AS', name: 'Ana Souza', role: 'CEO · Nexa Digital', text: 'Automatizamos o follow-up e dobramos a taxa de resposta em um mês.' },
  { initials: 'BR', name: 'Bruno Rocha', role: 'Head de Vendas · Vetta', text: 'O pipeline ficou visual e o time parou de perder lead no caminho.' },
  { initials: 'CM', name: 'Camila Mendes', role: 'Fundadora · Loja Maré', text: 'Checkout com Pix em dois cliques. A conversão subiu 18%.' },
  { initials: 'DL', name: 'Diego Lima', role: 'CTO · Orbe', text: 'Integrou com o nosso ERP sem uma linha de código.' },
]
const ROW_B: Testimonial[] = [
  { initials: 'EF', name: 'Elisa Freitas', role: 'Marketing · Bloom', text: 'Os relatórios por canal viraram a pauta da nossa segunda-feira.' },
  { initials: 'FN', name: 'Felipe Nunes', role: 'Suporte · Kura', text: 'Atendimento no WhatsApp com fila e etiquetas. Chega de planilha.' },
  { initials: 'GH', name: 'Gabriela Horta', role: 'Diretora · Studio GH', text: 'Landing pages no ar em uma tarde, sem depender da agência.' },
  { initials: 'IJ', name: 'Igor Jardim', role: 'Financeiro · Pulso', text: 'Cobranças recorrentes automáticas. A inadimplência caiu pela metade.' },
]

function Row({ items, reverse = false, duration = 36 }: { items: Testimonial[]; reverse?: boolean; duration?: number }) {
  const cells = [...items, ...items]
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)' }}>
      <motion.div className="flex w-max gap-3" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {cells.map((t, i) => (
          <div key={`${t.name}-${i}`} className="w-[250px] shrink-0 rounded-xl border bg-card p-4">
            <div className="flex gap-0.5 text-amber-500">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="size-3 fill-current" />
              ))}
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground">“{t.text}”</p>
            <div className="mt-3 flex items-center gap-2">
              <Avatar className="size-7 border bg-muted">
                <AvatarFallback className="text-[10px]">{t.initials}</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-xs font-medium">{t.name}</div>
                <div className="text-[10px] text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <div className="w-[600px] space-y-3 text-foreground">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse duration={44} />
    </div>
  )
}
