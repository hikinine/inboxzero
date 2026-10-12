'use client'

import { useEffect, useState } from 'react'

// "Scramble Text": a palavra em destaque é embaralhada com símbolos e se resolve letra a letra, da esquerda para a
// direita; segura e passa para o próximo termo. Caracteres ainda embaralhados ficam na cor primária.
const WORDS = ['automação', 'integração', 'atendimento', 'conversão']
const POOL = '!<>-_\\/[]{}—=+*^?#'

interface Char {
  ch: string
  done: boolean
}

export default function ScrambleText() {
  const [chars, setChars] = useState<Char[]>(() => Array.from(WORDS[0]!, (ch) => ({ ch, done: true })))

  useEffect(() => {
    let wordIndex = 0
    let frame = 0
    let hold = 40
    const id = setInterval(() => {
      if (hold > 0) {
        hold -= 1
        if (hold === 0) {
          wordIndex = (wordIndex + 1) % WORDS.length
          frame = 0
        }
        return
      }
      const word = WORDS[wordIndex]!
      const next = Array.from(word, (ch, i) => {
        if (frame >= i * 3 + 8) return { ch, done: true }
        return { ch: POOL[Math.floor(Math.random() * POOL.length)]!, done: false }
      })
      setChars(next)
      frame += 1
      if (next.every((c) => c.done)) hold = 45
    }, 40)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-center text-foreground">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Mais tempo para</p>
      <h2 className="mt-2 font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
        {chars.map((c, i) => (
          <span key={i} className={c.done ? 'text-foreground' : 'text-primary/70'}>
            {c.ch}
          </span>
        ))}
      </h2>
    </div>
  )
}
