'use client'

import { useEffect, useState } from 'react'
import { Check, GitBranch, GitMerge, GitPullRequest } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Git Merge Beam": grafo de commits com a main e uma branch de feature. O feixe percorre a branch desde o ponto
// de saída; cada commit acende quando o feixe passa (com a mensagem acima), os checks do CI ficam verdes e o feixe
// desce de volta na main criando o commit de merge, que pulsa, e o selo do PR vira "Merged". Recomeça em loop.
const W = 500
const H = 250
const MAIN_Y = 170
const FEAT_Y = 82
const FORK_X = 70
const MERGE_X = 410
const FEATURE_D = `M ${FORK_X} ${MAIN_Y} C ${FORK_X + 40} ${MAIN_Y}, ${FORK_X + 20} ${FEAT_Y}, ${FORK_X + 70} ${FEAT_Y} L ${MERGE_X - 70} ${FEAT_Y} C ${MERGE_X - 20} ${FEAT_Y}, ${MERGE_X - 40} ${MAIN_Y}, ${MERGE_X} ${MAIN_Y}`
const COMMITS = [
  { x: 170, msg: 'feat: checkout com Pix', at: 0.3 },
  { x: 245, msg: 'fix: arredondamento', at: 0.5 },
  { x: 320, msg: 'test: cenário de boleto', at: 0.7 },
] as const
const DRAW = 3.2
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function GitMergeBeam() {
  const [cycle, setCycle] = useState(0)
  const [lit, setLit] = useState(0)
  const [merged, setMerged] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setLit(0)
        setMerged(false)
        let prev = 0
        for (let i = 0; i < COMMITS.length; i++) {
          await sleep((COMMITS[i].at - prev) * DRAW * 1000)
          if (cancelled) return
          prev = COMMITS[i].at
          setLit(i + 1)
        }
        await sleep((1 - prev) * DRAW * 1000)
        if (cancelled) return
        setMerged(true)
        await sleep(2600)
        setCycle((c) => c + 1)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-full border bg-card px-2 py-0.5 font-mono text-[10px]">
          <GitBranch className="size-3 text-violet-500" /> feat/pix-checkout
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={merged ? 'm' : 'o'}
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${merged ? 'bg-violet-500' : 'bg-emerald-500'}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
          >
            {merged ? <GitMerge className="size-3" /> : <GitPullRequest className="size-3" />}
            {merged ? 'Merged' : 'Open'} · PR #128
          </motion.span>
        </AnimatePresence>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Grafo git com branch de feature sendo mesclada na main">
        <line x1="20" y1={MAIN_Y} x2={W - 20} y2={MAIN_Y} stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
        <motion.line
          x1="20"
          y1={MAIN_Y}
          x2={W - 20}
          y2={MAIN_Y}
          stroke="var(--muted-foreground)"
          strokeOpacity="0.5"
          strokeWidth="3"
          strokeDasharray="4 12"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <path d={FEATURE_D} fill="none" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
        <motion.path
          key={cycle}
          d={FEATURE_D}
          fill="none"
          stroke="currentColor"
          className="text-violet-500"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DRAW, ease: 'linear' }}
        />
        {/* commits da main */}
        {[40, FORK_X, 220].map((x) => (
          <circle key={x} cx={x} cy={MAIN_Y} r="6" fill="var(--card)" stroke="var(--muted-foreground)" strokeWidth="2.5" />
        ))}
        {/* commits da feature */}
        {COMMITS.map((c, i) => (
          <g key={c.x}>
            <circle cx={c.x} cy={FEAT_Y} r="7" fill="var(--card)" stroke="var(--border)" strokeWidth="2.5" />
            <motion.circle
              cx={c.x}
              cy={FEAT_Y}
              r="7"
              fill="var(--card)"
              stroke="currentColor"
              className="text-violet-500"
              strokeWidth="3"
              style={{ transformOrigin: `${c.x}px ${FEAT_Y}px` }}
              initial={false}
              animate={{ scale: lit > i ? [1.6, 1] : 0, opacity: lit > i ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            />
          </g>
        ))}
        {/* merge */}
        <motion.circle
          cx={MERGE_X}
          cy={MAIN_Y}
          r="16"
          fill="currentColor"
          className="text-violet-500"
          style={{ transformOrigin: `${MERGE_X}px ${MAIN_Y}px` }}
          initial={false}
          animate={merged ? { scale: [0.5, 1.6], opacity: [0.35, 0] } : { scale: 0.5, opacity: 0 }}
          transition={merged ? { duration: 1.1, repeat: Infinity, ease: 'easeOut' } : { duration: 0.2 }}
        />
        <circle cx={MERGE_X} cy={MAIN_Y} r="8" fill="var(--card)" stroke={merged ? 'rgb(139 92 246)' : 'var(--muted-foreground)'} strokeWidth="3" />
      </svg>

      {COMMITS.map((c, i) => (
        <AnimatePresence key={c.x}>
          {lit > i && (
            <motion.span
              className="absolute -translate-x-1/2 whitespace-nowrap rounded-md border bg-card px-1.5 py-0.5 font-mono text-[9px] shadow-sm"
              style={{ left: c.x, top: FEAT_Y - (i % 2 === 0 ? 60 : 36) }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-muted-foreground">{['a3f9c1', 'b72e0d', 'c51a88'][i]}</span> {c.msg}
            </motion.span>
          )}
        </AnimatePresence>
      ))}

      <div className="absolute flex -translate-x-1/2 items-center gap-1.5" style={{ left: 260, top: FEAT_Y + 18 }}>
        {['lint', 'tipos', 'testes'].map((ch, i) => {
          const ok = lit > i
          return (
            <span key={ch} className={`flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] transition-colors duration-300 ${ok ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
              {ok ? (
                <Check className="size-2.5" strokeWidth={3} />
              ) : (
                <motion.span className="size-1.5 rounded-full bg-amber-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
              )}
              {ch}
            </span>
          )
        })}
      </div>

      <span className="absolute font-mono text-[10px] text-muted-foreground" style={{ left: 22, top: MAIN_Y + 14 }}>
        main
      </span>
      <AnimatePresence>
        {merged && (
          <motion.span
            className="absolute -translate-x-1/2 whitespace-nowrap rounded-md bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] text-violet-600 dark:text-violet-400"
            style={{ left: MERGE_X, top: MAIN_Y + 20 }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Merge pull request #128
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
