'use client'

import { motion } from 'motion/react'
import { Boxes, Cloud, Cpu, Globe, Layers, Rocket, Shield, Zap } from 'lucide-react'

// "Logo Marquee": duas faixas de logos rolando em sentidos opostos com fade nas bordas.
const ROW_A = [
  ['Vercel', Rocket],
  ['Stripe', Zap],
  ['Supabase', Boxes],
  ['Cloudflare', Cloud],
  ['Linear', Layers],
] as const
const ROW_B = [
  ['OpenAI', Cpu],
  ['Auth0', Shield],
  ['Resend', Globe],
  ['Neon', Boxes],
  ['Clerk', Shield],
] as const

function Row({ items, reverse = false, duration = 28 }: { items: typeof ROW_A | typeof ROW_B; reverse?: boolean; duration?: number }) {
  const cells = [...items, ...items]
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)' }}>
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {cells.map(([name, Icon], i) => (
          <div key={`${name}-${i}`} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            <Icon className="size-4" />
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <div className="w-full max-w-xl space-y-3 text-foreground">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse duration={34} />
    </div>
  )
}
