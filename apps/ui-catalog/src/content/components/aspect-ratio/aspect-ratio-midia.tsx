'use client'

import { ImageIcon, Play, User } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

export default function AspectRatioMidia() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 items-start gap-3">
      <div className="col-span-2">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-gradient-to-br from-sky-500/30 via-muted to-indigo-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              aria-label="Reproduzir vídeo"
              className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur transition-transform hover:scale-105"
            >
              <Play className="ml-0.5 size-5 fill-current" />
            </button>
          </div>
          <Badge variant="secondary" className="absolute left-2 top-2">
            16:9 · vídeo
          </Badge>
          <span className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[11px] tabular-nums">12:34</span>
        </AspectRatio>
      </div>

      <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/30 via-muted to-rose-500/30">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <ImageIcon className="size-7" />
        </div>
        <Badge variant="secondary" className="absolute left-2 top-2">
          4:3 · foto
        </Badge>
      </AspectRatio>

      <AspectRatio ratio={1} className="overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/30 via-muted to-teal-500/30">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <User className="size-7" />
        </div>
        <Badge variant="secondary" className="absolute left-2 top-2">
          1:1 · perfil
        </Badge>
      </AspectRatio>
    </div>
  )
}
