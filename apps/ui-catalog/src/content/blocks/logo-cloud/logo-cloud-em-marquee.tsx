'use client'

import { BarChart3, Boxes, CreditCard, FileText, Globe, Instagram, Layers, MessageSquare, Package, Send, ShoppingBag, Slack, Table2, Wallet, Workflow, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const ROW_A = [
  ['WhatsApp', MessageSquare],
  ['Instagram', Instagram],
  ['Shopify', ShoppingBag],
  ['Hotmart', Zap],
  ['RD Station', BarChart3],
  ['Pipedrive', Layers],
  ['Slack', Slack],
  ['Notion', FileText],
] as const

const ROW_B = [
  ['Google Sheets', Table2],
  ['Zapier', Workflow],
  ['Stripe', CreditCard],
  ['Pagar.me', Wallet],
  ['Nuvemshop', Package],
  ['Bling', Boxes],
  ['Telegram', Send],
  ['Mercado Livre', Globe],
] as const

export default function LogoCloudEmMarquee() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Conecta com o que seu time já usa</h2>
          <p className="mt-2 text-sm text-muted-foreground">Mais de 300 integrações nativas, sem código.</p>
        </div>
        <div className="mt-10 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="overflow-hidden">
            <motion.div className="flex w-max gap-3" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}>
              {[...ROW_A, ...ROW_A].map(([name, Icon], i) => (
                <span key={`${name}-${i}`} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
                  <Icon className="size-4" /> {name}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div className="flex w-max gap-3" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}>
              {[...ROW_B, ...ROW_B].map(([name, Icon], i) => (
                <span key={`${name}-${i}`} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
                  <Icon className="size-4" /> {name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
