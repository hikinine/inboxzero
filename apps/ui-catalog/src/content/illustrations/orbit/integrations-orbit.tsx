'use client'

import { motion } from 'motion/react'
import { Bot, Calendar, CreditCard, Database, Mail, MessageCircle, Sparkles, Table } from 'lucide-react'

// "Integrations Orbit": ícones orbitando um núcleo em dois anéis com velocidades opostas.
const INNER = [Mail, MessageCircle, Calendar]
const OUTER = [Database, CreditCard, Table, Bot]

function Ring({ icons, radius, duration, reverse = false }: { icons: typeof INNER; radius: number; duration: number; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-border"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {icons.map((Icon, i) => {
        const a = (i / icons.length) * Math.PI * 2
        const x = Math.cos(a) * radius
        const y = Math.sin(a) * radius
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 flex size-10 items-center justify-center rounded-full border bg-card shadow-sm"
            style={{ x: x - 20, y: y - 20 }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className="size-4 text-foreground" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function IntegrationsOrbit() {
  return (
    <div className="relative size-[340px] text-foreground">
      <Ring icons={INNER} radius={80} duration={18} />
      <Ring icons={OUTER} radius={150} duration={32} reverse />
      <motion.div
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="size-7" />
      </motion.div>
    </div>
  )
}
