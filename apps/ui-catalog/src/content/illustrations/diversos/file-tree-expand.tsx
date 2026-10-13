'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight, FileCode, FileJson, FileText, Folder, FolderOpen } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "File Tree Expand": explorador de arquivos navegando sozinho. Pastas abrem com a seta girando e os filhos
// deslizando (altura auto), a seleção pula entre arquivos e o painel ao lado abre a aba do arquivo com as linhas de
// código entrando em cascata; ao fim tudo recolhe e a navegação recomeça.
interface TreeNode {
  name: string
  children?: readonly TreeNode[]
}

const TREE: TreeNode = {
  name: 'loja-online',
  children: [
    {
      name: 'src',
      children: [
        { name: 'app', children: [{ name: 'page.tsx' }, { name: 'layout.tsx' }] },
        { name: 'components', children: [{ name: 'ui', children: [{ name: 'button.tsx' }, { name: 'card.tsx' }] }, { name: 'carrinho.tsx' }] },
        { name: 'lib', children: [{ name: 'frete.ts' }] },
      ],
    },
    { name: 'package.json' },
    { name: 'README.md' },
  ],
}

// roteiro: abrir pasta (caminho) ou selecionar arquivo
const SCRIPT: readonly (readonly ['open' | 'select' | 'reset', string])[] = [
  ['open', 'loja-online/src'],
  ['open', 'loja-online/src/components'],
  ['open', 'loja-online/src/components/ui'],
  ['select', 'loja-online/src/components/ui/button.tsx'],
  ['select', 'loja-online/src/components/carrinho.tsx'],
  ['open', 'loja-online/src/lib'],
  ['select', 'loja-online/src/lib/frete.ts'],
  ['open', 'loja-online/src/app'],
  ['select', 'loja-online/src/app/page.tsx'],
  ['select', 'loja-online/package.json'],
  ['reset', ''],
]

function stateAt(step: number) {
  const open = new Set<string>(['loja-online'])
  let selected = 'loja-online/README.md'
  if (SCRIPT[step]![0] === 'reset') return { open, selected }
  for (let i = 0; i <= step; i++) {
    const [kind, path] = SCRIPT[i]!
    if (kind === 'open') open.add(path)
    else if (kind === 'select') selected = path
  }
  return { open, selected }
}

function iconFor(name: string): { Icon: LucideIcon; cls: string } {
  if (name.endsWith('.tsx')) return { Icon: FileCode, cls: 'text-sky-500' }
  if (name.endsWith('.ts')) return { Icon: FileCode, cls: 'text-blue-500' }
  if (name.endsWith('.json')) return { Icon: FileJson, cls: 'text-amber-500' }
  return { Icon: FileText, cls: 'text-muted-foreground' }
}

function Node({ node, path, depth, open, selected }: { node: TreeNode; path: string; depth: number; open: Set<string>; selected: string }) {
  const isDir = !!node.children
  const isOpen = open.has(path)
  const isSel = selected === path
  const file = iconFor(node.name)
  return (
    <div>
      <div className={cn('relative flex h-[19px] items-center gap-1 rounded-md pr-2 text-xs', isSel ? 'text-foreground' : 'text-muted-foreground')} style={{ paddingLeft: 6 + depth * 12 }}>
        {isSel && <motion.span layoutId="fte-sel" className="absolute inset-0 rounded-md bg-primary/10 ring-1 ring-primary/30" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
        {isDir ? (
          <>
            <motion.span className="relative" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="size-3" />
            </motion.span>
            {isOpen ? <FolderOpen className="relative size-3.5 text-amber-500" /> : <Folder className="relative size-3.5 text-amber-500" />}
          </>
        ) : (
          <>
            <span className="w-3" />
            <file.Icon className={cn('relative size-3.5', file.cls)} />
          </>
        )}
        <span className={cn('relative truncate', isDir && 'font-medium text-foreground')}>{node.name}</span>
      </div>
      <AnimatePresence initial={false}>
        {isDir && isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} className="overflow-hidden">
            {node.children!.map((c) => (
              <Node key={c.name} node={c} path={`${path}/${c.name}`} depth={depth + 1} open={open} selected={selected} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const widths = (seed: string) => {
  let h = 7
  for (const ch of seed) h = (h * 33 + ch.charCodeAt(0)) % 9973
  return Array.from({ length: 8 }, (_, i) => 30 + ((h * (i + 3)) % 60))
}

export default function FileTreeExpand() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % SCRIPT.length), 950)
    return () => clearInterval(id)
  }, [])
  const { open, selected } = stateAt(step)
  const fileName = selected.split('/').pop()!
  const fi = iconFor(fileName)

  return (
    <div className="flex h-[320px] w-[460px] overflow-hidden rounded-xl border bg-card text-foreground shadow-sm">
      <div className="w-[200px] shrink-0 border-r bg-muted/30 p-2">
        <p className="mb-1.5 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Explorador</p>
        <Node node={TREE} path="loja-online" depth={0} open={open} selected={selected} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-8 items-end border-b px-2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={selected}
              className="flex items-center gap-1.5 rounded-t-md border border-b-0 bg-background px-2.5 py-1 text-[11px]"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <fi.Icon className={cn('size-3', fi.cls)} />
              {fileName}
            </motion.span>
          </AnimatePresence>
        </div>
        <div key={selected} className="flex-1 space-y-2 p-3">
          {widths(selected).map((w, i) => (
            <motion.div key={i} className="flex items-center gap-2" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <span className="w-3 text-right font-mono text-[9px] text-muted-foreground/60">{i + 1}</span>
              <span className={cn('h-2 rounded-full', i % 3 === 0 ? 'bg-violet-500/40' : i % 3 === 1 ? 'bg-muted-foreground/25' : 'bg-sky-500/35')} style={{ width: `${w}%`, marginLeft: (i % 4) * 8 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
