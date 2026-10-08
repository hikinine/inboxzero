'use client'

import { Boxes, Cloud, Cpu, Globe, Layers, Rocket, Shield, Zap } from 'lucide-react'

const LOGOS = [
  ['Vercel', Rocket],
  ['Stripe', Zap],
  ['Supabase', Boxes],
  ['Cloudflare', Cloud],
  ['Linear', Layers],
  ['OpenAI', Cpu],
  ['Auth0', Shield],
  ['Resend', Globe],
] as const

export default function LogoCloudGrid() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm text-muted-foreground">Integra com as ferramentas que seu time já usa</p>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
          {LOGOS.map(([name, Icon]) => (
            <div key={name} className="flex items-center justify-center gap-2 bg-background py-6 text-muted-foreground transition-colors hover:text-foreground">
              <Icon className="size-5" />
              <span className="text-base font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
