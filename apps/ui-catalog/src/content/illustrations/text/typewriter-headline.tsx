'use client'

import { useEffect, useState } from 'react'

// "Typewriter Headline": digita e apaga uma lista de frases, com cursor piscando.
const PHRASES = ['landing pages que convertem.', 'dashboards em minutos.', 'automações sem código.', 'ilustrações animadas.']

export default function TypewriterHeadline() {
  const [i, setI] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[i]!
    const t = setTimeout(
      () => {
        if (!deleting && len < phrase.length) setLen(len + 1)
        else if (!deleting && len === phrase.length) setDeleting(true)
        else if (deleting && len > 0) setLen(len - 1)
        else {
          setDeleting(false)
          setI((i + 1) % PHRASES.length)
        }
      },
      deleting ? 35 : len === phrase.length ? 1400 : 55,
    )
    return () => clearTimeout(t)
  }, [i, len, deleting])

  return (
    <div className="max-w-xl text-center text-foreground">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Construa{' '}
        <span className="text-muted-foreground">
          {PHRASES[i]!.slice(0, len)}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-1 animate-pulse bg-primary align-baseline" />
        </span>
      </h2>
    </div>
  )
}
