'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// "Terminal Typing": janela de terminal que digita comandos, imprime as saídas linha a linha e recomeça em loop.
const SCRIPT = [
  { cmd: 'pnpm install', out: ['Packages: +184', 'Progress: resolved 184, reused 180, downloaded 4', 'Pronto em 2,1s'] },
  { cmd: 'pnpm build', out: ['▲ Next.js 15.5', '✓ Compilado em 3,2s', '✓ 12 rotas estáticas geradas'] },
  { cmd: 'git push origin main', out: ['Enumerating objects: 24, done.', 'To github.com:clickmax/app.git', '   9b109fb..4d1a744  main -> main'] },
] as const

interface Line {
  kind: 'cmd' | 'out'
  text: string
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function TerminalTyping() {
  const [lines, setLines] = useState<Line[]>([])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setLines([])
        setCurrent('')
        await sleep(600)
        for (const step of SCRIPT) {
          for (let k = 1; k <= step.cmd.length; k++) {
            if (cancelled) return
            setCurrent(step.cmd.slice(0, k))
            await sleep(55)
          }
          await sleep(350)
          setLines((l) => [...l, { kind: 'cmd', text: step.cmd }])
          setCurrent('')
          for (const o of step.out) {
            if (cancelled) return
            await sleep(260)
            setLines((l) => [...l, { kind: 'out', text: o }])
          }
          await sleep(900)
        }
        await sleep(2000)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[280px] w-[460px] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-[12px] leading-relaxed text-zinc-200 shadow-xl">
      <div className="relative flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
        <span className="size-2.5 rounded-full bg-rose-500" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-500" />
        <span className="absolute inset-x-0 text-center text-[11px] text-zinc-500">paulo@clickmax — zsh</span>
      </div>
      <div className="flex flex-1 flex-col justify-end overflow-hidden p-4">
        {lines.map((l, i) =>
          l.kind === 'cmd' ? (
            <div key={i}>
              <span className="text-emerald-400">❯</span> <span className="text-zinc-100">{l.text}</span>
            </div>
          ) : (
            <div key={i} className={l.text.startsWith('✓') ? 'text-emerald-400' : 'whitespace-pre text-zinc-400'}>
              {l.text}
            </div>
          ),
        )}
        <div>
          <span className="text-emerald-400">❯</span> <span className="text-zinc-100">{current}</span>
          <motion.span className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-zinc-200 align-baseline" animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, times: [0, 0.5, 0.51, 1], repeat: Infinity }} />
        </div>
      </div>
    </div>
  )
}
