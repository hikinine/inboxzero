'use client'

import { Apple, BadgeCheck, Clock, Facebook, Headset, Instagram, Lock, Mail, MessageCircle, Phone, Play, ShieldCheck, Star, Youtube, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const COLS: Array<{ title: string; links: string[] }> = [
  { title: 'Comprar', links: ['Lançamentos', 'Ofertas da semana', 'Tênis', 'Fones e áudio', 'Casa e café', 'Vale-presente'] },
  { title: 'Ajuda', links: ['Rastrear pedido', 'Trocas e devoluções', 'Prazos de entrega', 'Formas de pagamento', 'Garantia'] },
  { title: 'Institucional', links: ['Sobre a Aero', 'Nossas lojas', 'Trabalhe conosco', 'Programa de afiliados', 'Imprensa'] },
]
const SEALS: Array<{ Icon: LucideIcon; title: string; text: string }> = [
  { Icon: ShieldCheck, title: 'Site seguro', text: 'Certificado SSL de 256 bits' },
  { Icon: BadgeCheck, title: 'Loja verificada', text: 'CNPJ ativo e loja física' },
  { Icon: Lock, title: 'Compra protegida', text: 'Devolução garantida em 7 dias' },
  { Icon: Star, title: 'Avaliada por clientes', text: '4,8 de 5 em 12.400 avaliações' },
]
const PAYMENTS = ['Visa', 'Mastercard', 'Elo', 'Amex', 'Hipercard', 'Pix', 'Boleto']
const CARRIERS = ['Correios', 'Loggi', 'Jadlog', 'Retirada em loja']
const QR = [
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1],
]

export default function MegaFooterComSelosEApp() {
  return (
    <footer className="w-full border-t bg-background px-6 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 rounded-2xl bg-muted/50 p-6 sm:p-10 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Aplicativo</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Baixe o app e ganhe 10% na primeira compra</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">Rastreio em tempo real, ofertas exclusivas e checkout em um toque com Pix.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 gap-3 px-4" nativeButton={false} render={<a href="#" aria-label="Baixar na App Store" />}>
                <Apple className="size-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-normal opacity-80">Baixar na</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </Button>
              <Button size="lg" className="h-12 gap-3 px-4" nativeButton={false} render={<a href="#" aria-label="Disponível no Google Play" />}>
                <Play className="size-5 fill-current" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-normal opacity-80">Disponível no</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5" aria-label="Nota 4,9 de 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3 fill-amber-500 text-amber-500" />
                ))}
              </span>
              4,9 · 38 mil avaliações nas lojas
            </div>
          </div>

          <div className="hidden flex-col items-center gap-2 lg:flex">
            <div className="grid grid-cols-9 gap-px rounded-lg border bg-background p-2" aria-hidden="true">
              {QR.flatMap((row, y) => row.map((on, x) => <span key={`${x}-${y}`} className={cn('size-1.5', on ? 'bg-foreground' : 'bg-transparent')} />))}
            </div>
            <span className="text-[11px] text-muted-foreground">Aponte a câmera</span>
          </div>

          <div className="relative mx-auto h-64 w-32 rounded-[2rem] border-[6px] border-foreground/85 bg-background shadow-xl" aria-hidden="true">
            <span className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-foreground/85" />
            <div className="absolute inset-2 top-6 overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-primary/90 to-primary/60 p-2.5 text-primary-foreground">
              <div className="h-1.5 w-10 rounded bg-white/70" />
              <div className="mt-1 h-1.5 w-16 rounded bg-white/40" />
              <div className="mt-3 rounded-lg bg-background/95 p-2 text-foreground">
                <div className="h-1.5 w-12 rounded bg-foreground/70" />
                <div className="mt-1 h-1.5 w-8 rounded bg-emerald-500" />
                <div className="mt-2 h-1 w-full rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="aspect-square rounded-md bg-white/25" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="size-7 rounded-lg bg-primary" /> Aero Loja
            </div>
            <div className="mt-5 rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Headset className="size-4 text-muted-foreground" /> Atendimento
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Clock className="size-3.5" /> Seg a sex, 8h às 20h · sáb, 9h às 14h</li>
                <li className="flex items-center gap-2"><Phone className="size-3.5" /> 0800 591 0400</li>
                <li className="flex items-center gap-2"><MessageCircle className="size-3.5" /> WhatsApp (11) 91234-5678</li>
                <li className="flex items-center gap-2"><Mail className="size-3.5" /> ajuda@aeroloja.com.br</li>
              </ul>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-medium">{c.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SEALS.map((s) => (
            <div key={s.title} className="flex items-center gap-3 rounded-xl border p-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <s.Icon className="size-5 text-foreground" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium">{s.title}</div>
                <div className="truncate text-xs text-muted-foreground">{s.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-muted-foreground">Pagamento</span>
            {PAYMENTS.map((p) => (
              <span key={p} className="rounded-md border bg-card px-2 py-1 text-[11px] font-semibold text-muted-foreground">{p}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-muted-foreground">Entrega</span>
            {CARRIERS.map((c) => (
              <span key={c} className="rounded-md border bg-card px-2 py-1 text-[11px] font-semibold text-muted-foreground">{c}</span>
            ))}
          </div>
        </div>

        <Separator className="mt-8" />
        <div className="flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Aero Comércio Ltda · CNPJ 12.345.678/0001-90 · Av. Paulista, 1000, 10º andar · São Paulo, SP · 01310-100
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
            <div className="flex gap-1">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <Button key={label} variant="ghost" size="icon-sm" aria-label={label} nativeButton={false} render={<a href="#" />}>
                  <Icon />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
