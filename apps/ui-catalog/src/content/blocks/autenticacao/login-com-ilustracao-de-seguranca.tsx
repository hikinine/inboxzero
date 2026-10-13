'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Fingerprint, KeyRound, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const SELOS = [
  { Icon: LockKeyhole, texto: 'Criptografia AES-256', x: '4%', y: '16%', d: 0 },
  { Icon: KeyRound, texto: 'Verificação em 2 etapas', x: '58%', y: '8%', d: 0.8 },
  { Icon: Fingerprint, texto: 'Login com passkey', x: '62%', y: '78%', d: 1.5 },
]

function IlustracaoSeguranca() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <svg viewBox="0 0 300 300" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="lis-escudo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.55" />
          </linearGradient>
          <clipPath id="lis-clip">
            <path d="M150 62 L212 86 V146 C212 188 186 216 150 232 C114 216 88 188 88 146 V86 Z" />
          </clipPath>
        </defs>

        {/* anéis */}
        <motion.circle cx="150" cy="150" r="128" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 8" style={{ transformOrigin: '150px 150px' }} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        <motion.circle cx="150" cy="150" r="104" fill="none" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="60 260" strokeLinecap="round" style={{ transformOrigin: '150px 150px' }} animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />
        <motion.circle cx="150" cy="150" r="96" fill="var(--primary)" fillOpacity="0.06" style={{ transformOrigin: '150px 150px' }} animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.9, 0.3, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />

        {/* escudo */}
        <path d="M150 62 L212 86 V146 C212 188 186 216 150 232 C114 216 88 188 88 146 V86 Z" fill="url(#lis-escudo)" />
        <g clipPath="url(#lis-clip)">
          <motion.rect x="80" width="140" height="26" fill="var(--primary-foreground)" fillOpacity="0.25" initial={{ y: 50 }} animate={{ y: [50, 220, 50] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
        </g>
        <path d="M150 62 L212 86 V146 C212 188 186 216 150 232 C114 216 88 188 88 146 V86 Z" fill="none" stroke="var(--primary-foreground)" strokeOpacity="0.4" strokeWidth="1.5" />

        {/* cadeado */}
        <motion.path d="M134 140 V126 a16 16 0 0 1 32 0 V140" fill="none" stroke="var(--primary-foreground)" strokeWidth="6" strokeLinecap="round" animate={{ y: [-6, 0, 0, -6] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }} />
        <rect x="124" y="138" width="52" height="42" rx="9" fill="var(--primary-foreground)" />
        <circle cx="150" cy="156" r="5" fill="var(--primary)" />
        <rect x="148" y="158" width="4" height="10" rx="2" fill="var(--primary)" />

        {/* partículas */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2
          return (
            <motion.circle
              key={i}
              cx={150 + Math.cos(a) * 118}
              cy={150 + Math.sin(a) * 118}
              r="3"
              fill="var(--primary)"
              style={{ transformOrigin: `${150 + Math.cos(a) * 118}px ${150 + Math.sin(a) * 118}px` }}
              animate={{ scale: [0.5, 1.4, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.33 }}
            />
          )
        })}
      </svg>

      {SELOS.map((s) => (
        <motion.div
          key={s.texto}
          className="absolute flex items-center gap-2 rounded-full border bg-card/90 px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: s.d }, scale: { delay: s.d }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: s.d } }}
        >
          <s.Icon className="size-3.5 text-primary" />
          {s.texto}
        </motion.div>
      ))}
    </div>
  )
}

export default function LoginComIlustracaoDeSeguranca() {
  const [ver, setVer] = useState(false)
  const [senha, setSenha] = useState('')

  return (
    <section className="w-full px-6 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border bg-card lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-muted/50 p-10 lg:flex">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-5 text-primary" /> Cofre Contábil
          </div>
          <IlustracaoSeguranca />
          <p className="text-sm text-muted-foreground">Seus documentos fiscais protegidos com o mesmo padrão dos bancos. Dados armazenados no Brasil, em conformidade com a LGPD.</p>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h1 className="text-2xl font-semibold tracking-tight">Entrar com segurança</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acesse o cofre do seu escritório.</p>

          <Button variant="outline" className="mt-8 w-full">
            <Fingerprint data-icon="inline-start" /> Entrar com passkey
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" /> ou com e-mail <Separator className="flex-1" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="lis-email">E-mail</Label>
              <InputGroup>
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput id="lis-email" type="email" placeholder="voce@escritorio.com.br" autoComplete="email" />
              </InputGroup>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="lis-senha">Senha</Label>
                <a href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                  Esqueci a senha
                </a>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupInput id="lis-senha" type={ver ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" aria-label={ver ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setVer((v) => !v)}>
                    {ver ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {senha.length > 0 && (
                <div className="flex gap-1 pt-1" aria-label="Força da senha">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={cn('h-1 flex-1 rounded-full transition-colors', i < Math.min(4, Math.ceil(senha.length / 3)) ? (senha.length >= 10 ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-muted')}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="lis-lembrar" defaultChecked />
              <Label htmlFor="lis-lembrar" className="font-normal text-muted-foreground">
                Confiar neste dispositivo por 30 dias
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-500" /> Conexão protegida · último acesso ontem, 18:42 em Curitiba
          </p>
        </div>
      </div>
    </section>
  )
}
