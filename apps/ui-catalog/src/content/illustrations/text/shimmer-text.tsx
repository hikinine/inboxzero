'use client'

import { motion } from 'motion/react'

// "Shimmer Text": brilho atravessa o título em loop (gradiente com background-clip: text).
export default function ShimmerText() {
  return (
    <div className="text-center">
      <motion.h2
        className="bg-[length:200%_100%] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
        style={{
          backgroundImage: 'linear-gradient(110deg, var(--muted-foreground) 0%, var(--foreground) 45%, var(--muted-foreground) 55%, var(--muted-foreground) 100%)',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      >
        Gerando sua landing page…
      </motion.h2>
      <p className="mt-3 text-sm text-muted-foreground">Enquanto a IA escreve, o texto brilha.</p>
    </div>
  )
}
