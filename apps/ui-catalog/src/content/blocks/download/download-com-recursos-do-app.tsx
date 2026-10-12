'use client'

import type { LucideIcon } from 'lucide-react'
import { Battery, Bell, ChartColumn, Download, Fingerprint, Inbox, Moon, Signal, Users, Wifi, WifiOff } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

const RECURSOS: Array<{ Icon: LucideIcon; titulo: string; texto: string }> = [
  { Icon: Bell, titulo: 'Notificações em tempo real', texto: 'Nova conversa, transferência ou menção: o aviso chega no segundo em que acontece.' },
  { Icon: WifiOff, titulo: 'Funciona sem sinal', texto: 'Respostas ficam na fila e são enviadas quando a conexão volta. Nada se perde.' },
  { Icon: Fingerprint, titulo: 'Entrada por biometria', texto: 'Face ID, Touch ID ou digital do Android. Sessão protegida mesmo com o celular emprestado.' },
  { Icon: ChartColumn, titulo: 'Relatórios no bolso', texto: 'Volume por canal, tempo de resposta e fila do dia, sem abrir o notebook.' },
  { Icon: Moon, titulo: 'Modo escuro de verdade', texto: 'Acompanha o sistema e poupa bateria em telas OLED.' },
]

const BARRAS = [46, 62, 55, 78, 70, 88, 64]
const DIAS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
const CANAIS = [
  { nome: 'WhatsApp', pct: 62, cor: 'bg-emerald-500' },
  { nome: 'Instagram', pct: 24, cor: 'bg-pink-500' },
  { nome: 'E-mail', pct: 14, cor: 'bg-sky-500' },
]

export default function DownloadComRecursosDoApp() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex justify-center rounded-3xl bg-gradient-to-br from-primary/15 via-muted/70 to-muted p-8 sm:p-12">
          <div className="w-[260px] rounded-[2.5rem] border-[8px] border-foreground/90 bg-background shadow-2xl">
            <div className="relative overflow-hidden rounded-[2rem]">
              <div className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/90" aria-hidden="true" />
              <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-medium">
                <span>09:41</span>
                <span className="flex items-center gap-1">
                  <Signal className="size-3" /> <Wifi className="size-3" /> <Battery className="size-3.5" />
                </span>
              </div>
              <div className="px-4 pt-7">
                <p className="text-xs text-muted-foreground">Esta semana</p>
                <p className="font-semibold">Relatórios</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border p-2.5">
                    <p className="text-[10px] text-muted-foreground">Conversas</p>
                    <p className="text-lg font-semibold tabular-nums">842</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">+12% vs. semana passada</p>
                  </div>
                  <div className="rounded-xl border p-2.5">
                    <p className="text-[10px] text-muted-foreground">Tempo médio</p>
                    <p className="text-lg font-semibold tabular-nums">1m 38s</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">21 s mais rápido</p>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border p-2.5">
                  <p className="text-[10px] text-muted-foreground">Conversas por dia</p>
                  <div className="mt-2 flex h-16 items-end gap-1.5">
                    {BARRAS.map((b, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${b}%` }} transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }} className={`flex-1 rounded-t ${i === 5 ? 'bg-primary' : 'bg-primary/35'}`} />
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1.5">
                    {DIAS.map((d, i) => (
                      <span key={i} className="flex-1 text-center text-[9px] text-muted-foreground">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {CANAIS.map((c) => (
                    <div key={c.nome}>
                      <div className="flex justify-between text-[10px]">
                        <span>{c.nome}</span>
                        <span className="tabular-nums text-muted-foreground">{c.pct}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-muted">
                        <div className={`h-full rounded-full ${c.cor}`} style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-around border-t px-4 py-3 text-muted-foreground">
                <Inbox className="size-5" />
                <Users className="size-5" />
                <ChartColumn className="size-5 text-foreground" />
                <Bell className="size-5" />
              </div>
              <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-foreground/80" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">App para iOS e Android</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo o que o painel faz, agora no bolso</h2>
          <p className="mt-3 text-muted-foreground">O mesmo inbox, as mesmas filas e os mesmos relatórios, pensados para uma mão só.</p>
          <ul className="mt-8 divide-y">
            {RECURSOS.map(({ Icon, titulo, texto }) => (
              <li key={titulo} className="flex gap-4 py-4 first:pt-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="font-medium">{titulo}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg">
              <Download data-icon="inline-start" /> App Store
            </Button>
            <Button size="lg" variant="outline">
              <Download data-icon="inline-start" /> Google Play
            </Button>
            <span className="text-xs text-muted-foreground">Grátis · iOS 16+ · Android 10+</span>
          </div>
        </div>
      </div>
    </section>
  )
}
