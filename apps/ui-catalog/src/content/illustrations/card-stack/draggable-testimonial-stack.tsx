'use client'

import { useEffect, useRef, useState } from 'react'
import { MoveHorizontal, Star } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Draggable Testimonial Stack": depoimentos em leque. O card da frente é arrastável (drag="x" do motion): solte
// além do limiar e ele voa para o lado, indo para o fundo da pilha; solte antes e ele volta com mola. Sem interação,
// um card é lançado sozinho a cada 3,8s para o loop nunca parar.
interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  stars: number
  tone: string
}

const ITEMS: Testimonial[] = [
  { id: 'ana', name: 'Ana Souza', role: 'Head de Growth · Nexa', quote: 'Em duas semanas o time parou de perder lead no WhatsApp. O funil ficou visível de ponta a ponta.', stars: 5, tone: 'from-violet-500 to-fuchsia-500' },
  { id: 'bruno', name: 'Bruno Rocha', role: 'Fundador · Loja Verde', quote: 'Migramos o checkout num fim de semana e o Pix passou a cair na hora, sem suporte manual.', stars: 5, tone: 'from-sky-500 to-cyan-500' },
  { id: 'camila', name: 'Camila Mendes', role: 'Gerente de CS · Vitta', quote: 'As automações responderam 70% dos tickets antes de chegarem na equipe.', stars: 4, tone: 'from-rose-500 to-orange-500' },
  { id: 'diego', name: 'Diego Lima', role: 'Diretor comercial · Prisma', quote: 'Relatórios que levavam uma manhã inteira agora chegam prontos às 8h.', stars: 5, tone: 'from-emerald-500 to-teal-500' },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')

function CardBody({ t }: { t: Testimonial }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${t.tone}`}>{initials(t.name)}</span>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-medium">{t.name}</div>
          <div className="truncate text-[11px] text-muted-foreground">{t.role}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`size-3.5 ${i < t.stars ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-foreground/90">“{t.quote}”</p>
    </>
  )
}

function TopCard({ t, onSwiped }: { t: Testimonial; onSwiped: () => void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-240, 240], [-14, 14])
  const opacity = useTransform(x, [-320, -160, 0, 160, 320], [0, 1, 1, 1, 0])
  const dragging = useRef(false)
  const leaving = useRef(false)
  const swipedRef = useRef(onSwiped)
  swipedRef.current = onSwiped

  const fly = (dir: 1 | -1) => {
    if (leaving.current) return
    leaving.current = true
    animate(x, dir * 460, { duration: 0.4, ease: 'easeIn' }).then(() => swipedRef.current())
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (dragging.current || leaving.current) return
      leaving.current = true
      animate(x, 460, { duration: 0.4, ease: 'easeIn' }).then(() => swipedRef.current())
    }, 3800)
    return () => clearInterval(timer)
  }, [x])

  return (
    <motion.div
      drag="x"
      dragMomentum={false}
      style={{ x, rotate, opacity }}
      initial={{ y: 12, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      whileDrag={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      onDragStart={() => {
        dragging.current = true
      }}
      onDragEnd={(_, info) => {
        dragging.current = false
        if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) fly(info.offset.x + info.velocity.x * 0.1 > 0 ? 1 : -1)
        else animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
      }}
      className="absolute inset-x-0 top-0 z-20 cursor-grab rounded-2xl border bg-card p-5 shadow-lg active:cursor-grabbing"
    >
      <CardBody t={t} />
    </motion.div>
  )
}

export default function DraggableTestimonialStack() {
  const [order, setOrder] = useState(ITEMS.map((t) => t.id))
  const byId = (id: string) => ITEMS.find((t) => t.id === id) ?? ITEMS[0]
  const top = byId(order[0])
  const activeIndex = ITEMS.findIndex((t) => t.id === top.id)

  return (
    <div className="w-[360px] select-none text-foreground">
      <div className="relative h-[228px]">
        {order.slice(1, 3).map((id, idx) => {
          const depth = idx + 1
          const t = byId(id)
          return (
            <motion.div
              key={`back-${t.id}`}
              className="absolute inset-x-0 top-0 rounded-2xl border bg-card p-5 shadow-sm"
              initial={{ y: 14 * depth + 8, scale: 1 - depth * 0.06, opacity: 0 }}
              animate={{ y: 14 * depth, scale: 1 - depth * 0.05, opacity: 1 - depth * 0.3, rotate: depth === 1 ? -3 : 3, zIndex: 10 - depth }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <CardBody t={t} />
            </motion.div>
          )
        })}
        <TopCard key={`top-${top.id}`} t={top} onSwiped={() => setOrder((o) => [...o.slice(1), o[0]])} />
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex gap-1.5">
          {ITEMS.map((t, i) => (
            <span key={t.id} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 bg-primary' : 'w-1.5 bg-border'}`} />
          ))}
        </div>
        <motion.span className="flex items-center gap-1.5" animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <MoveHorizontal className="size-3.5" />
          Arraste para o lado
        </motion.span>
      </div>
    </div>
  )
}
