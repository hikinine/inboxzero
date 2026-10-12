'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Cake, Flower2, Gift, GraduationCap, Heart, Mail, MessageCircle, Snowflake, Sparkles, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Pattern = 'confetti' | 'stars' | 'rings'
interface Theme {
  id: string
  label: string
  Icon: LucideIcon
  gradient: string
  pattern: Pattern
  greeting: string
}

const THEMES: Theme[] = [
  { id: 'aniversario', label: 'Aniversário', Icon: Cake, gradient: 'from-pink-500 via-rose-500 to-orange-400', pattern: 'confetti', greeting: 'Feliz aniversário!' },
  { id: 'natal', label: 'Natal', Icon: Snowflake, gradient: 'from-emerald-600 via-emerald-700 to-teal-900', pattern: 'stars', greeting: 'Feliz Natal!' },
  { id: 'obrigado', label: 'Obrigado', Icon: Heart, gradient: 'from-amber-400 via-orange-500 to-rose-500', pattern: 'rings', greeting: 'Muito obrigado!' },
  { id: 'casamento', label: 'Casamento', Icon: Sparkles, gradient: 'from-slate-700 via-slate-800 to-neutral-950', pattern: 'rings', greeting: 'Felicidades aos noivos!' },
  { id: 'maes', label: 'Dia das Mães', Icon: Flower2, gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500', pattern: 'confetti', greeting: 'Feliz Dia das Mães!' },
  { id: 'formatura', label: 'Formatura', Icon: GraduationCap, gradient: 'from-sky-500 via-blue-600 to-indigo-700', pattern: 'stars', greeting: 'Parabéns, formando!' },
]
const AMOUNTS = [50, 100, 150, 200, 300] as const
const CONFETTI = [
  [8, 14, 20],
  [22, 70, -15],
  [36, 28, 40],
  [48, 82, 10],
  [60, 18, -30],
  [72, 60, 25],
  [84, 30, -10],
  [92, 76, 35],
  [16, 90, 50],
  [66, 92, -40],
] as const
const STARS = [
  [10, 20, 1.6],
  [26, 64, 1],
  [40, 12, 1.2],
  [58, 78, 1.8],
  [70, 30, 1],
  [84, 56, 1.4],
  [92, 16, 1],
  [18, 86, 1.2],
] as const

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function PatternLayer({ kind }: { kind: Pattern }) {
  return (
    <svg className="absolute inset-0 size-full text-white" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
      {kind === 'confetti' &&
        CONFETTI.map(([x, y, r], i) => <rect key={i} x={x} y={y} width={3} height={1.4} rx={0.4} fill="currentColor" opacity={0.35} transform={`rotate(${r} ${x} ${y})`} />)}
      {kind === 'stars' && STARS.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={0.35} />)}
      {kind === 'rings' && (
        <g fill="none" stroke="currentColor" opacity={0.25}>
          <circle cx={92} cy={8} r={14} strokeWidth={1} />
          <circle cx={92} cy={8} r={24} strokeWidth={0.8} />
          <circle cx={92} cy={8} r={34} strokeWidth={0.6} />
          <circle cx={6} cy={58} r={12} strokeWidth={1} />
          <circle cx={6} cy={58} r={22} strokeWidth={0.8} />
        </g>
      )}
    </svg>
  )
}

export default function GiftCardComTemas() {
  const [themeId, setThemeId] = useState('aniversario')
  const [amount, setAmount] = useState<number>(100)
  const [to, setTo] = useState('Mariana')
  const [from, setFrom] = useState('Rafael')
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email')

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]!

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Vale-presente</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha a arte, o valor e pronto</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Seis temas prontos para cada ocasião. O cartão chega por e-mail ou WhatsApp na hora e vale por 12 meses.</p>
        </div>

        <div className="mt-10 [perspective:1200px]">
          <motion.div
            key={theme.id}
            initial={{ rotateY: -70, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={cn('relative mx-auto aspect-[1.6] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-xl', theme.gradient)}
          >
            <PatternLayer kind={theme.pattern} />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Gift className="size-4" /> Aero Loja
                </span>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <theme.Icon className="size-4" />
                </span>
              </div>
              <div>
                <div className="text-lg font-medium">{theme.greeting}</div>
                <div className="mt-1 text-4xl font-semibold tabular-nums">{brl(amount)}</div>
              </div>
              <div className="flex items-end justify-between text-xs opacity-90">
                <span>
                  Para {to.trim() || 'alguém especial'}
                  {from.trim() && ` · de ${from.trim()}`}
                </span>
                <span className="font-mono tracking-wider">•••• 4821</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8">
          <div className="text-sm font-medium">Arte do cartão</div>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={themeId === t.id}
                onClick={() => setThemeId(t.id)}
                className="group text-center"
              >
                <span className={cn('relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-white ring-2 ring-offset-2 ring-offset-background transition', t.gradient, themeId === t.id ? 'ring-primary' : 'ring-transparent group-hover:ring-border')}>
                  <PatternLayer kind={t.pattern} />
                  <t.Icon className="relative size-6" />
                </span>
                <span className={cn('mt-1.5 block text-xs', themeId === t.id ? 'font-medium' : 'text-muted-foreground')}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form className="mt-8 rounded-2xl border bg-card p-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="text-sm font-medium">Valor</div>
              <ToggleGroup
                variant="outline"
                className="mt-2 flex-wrap"
                aria-label="Valor do vale-presente"
                value={[String(amount)]}
                onValueChange={(v) => {
                  const next = v[0]
                  if (typeof next === 'string') setAmount(Number(next))
                }}
              >
                {AMOUNTS.map((a) => (
                  <ToggleGroupItem key={a} value={String(a)} className="min-w-[4.5rem] aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
                    R$ {a}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div>
              <div className="text-sm font-medium">Enviar por</div>
              <RadioGroup value={channel} onValueChange={(v) => setChannel(v === 'whatsapp' ? 'whatsapp' : 'email')} className="mt-2 flex gap-2">
                {[
                  { value: 'email', label: 'E-mail', Icon: Mail },
                  { value: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },
                ].map((c) => (
                  <Label key={c.value} htmlFor={`gct-${c.value}`} className={cn('flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-normal transition-colors', channel === c.value && 'border-primary bg-primary/5')}>
                    <RadioGroupItem id={`gct-${c.value}`} value={c.value} />
                    <c.Icon className="size-4 text-muted-foreground" /> {c.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="gct-to">Para</Label>
              <Input id="gct-to" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gct-from">De</Label>
              <Input id="gct-from" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gct-contact">{channel === 'email' ? 'E-mail de quem recebe' : 'WhatsApp de quem recebe'}</Label>
              <Input id="gct-contact" placeholder={channel === 'email' ? 'nome@exemplo.com' : '(11) 91234-5678'} />
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">Sem taxas. Entrega imediata ou agendada no checkout.</p>
            <Button type="submit" size="lg">
              <Gift data-icon="inline-start" /> Comprar vale de {brl(amount)}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
