'use client'

import { useState } from 'react'
import { Heart, MapPin, MessageCircle, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'

const POSTS = [
  { ini: 'AS', nome: 'Ana Souza', quando: 'há 2 h', texto: 'Fechamos a implantação do CRM na Kavo em 3 semanas — uma a menos que o previsto. Obrigada ao time!', imagem: true, grad: 'from-sky-500/50 to-indigo-500/50', curtidas: 48, comentarios: 6 },
  { ini: 'BR', nome: 'Bruno Rocha', quando: 'ontem', texto: 'Dica rápida: automação de follow-up em 3 toques dobrou a taxa de resposta dos leads frios.', imagem: false, grad: '', curtidas: 23, comentarios: 4 },
]

export default function SkeletonPerfilEFeed() {
  const [carregado, setCarregado] = useState(false)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">Perfil e feed</p>
        <div className="flex items-center gap-2">
          <Label htmlFor="sk-carregado" className="text-xs font-normal text-muted-foreground">
            Mostrar conteúdo
          </Label>
          <Switch id="sk-carregado" size="sm" checked={carregado} onCheckedChange={setCarregado} />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {carregado ? <div className="h-20 bg-gradient-to-r from-primary/40 via-sky-500/30 to-violet-500/40" /> : <Skeleton className="h-20 rounded-none" />}
        <div className="px-4 pb-4">
          <div className="-mt-6 flex items-end justify-between">
            {carregado ? (
              <Avatar size="lg" className="size-12 ring-4 ring-card">
                <AvatarFallback className="text-sm">AS</AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="size-12 rounded-full ring-4 ring-card" />
            )}
            {carregado ? (
              <Button size="sm" variant="outline">
                Seguir
              </Button>
            ) : (
              <Skeleton className="h-7 w-16" />
            )}
          </div>
          <div className="mt-3 space-y-1.5">
            {carregado ? (
              <>
                <div className="text-sm font-medium">Ana Souza</div>
                <div className="text-xs text-muted-foreground">Head de Vendas na Lumi · CRM, automação e café.</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> São Paulo, SP
                </div>
              </>
            ) : (
              <>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-56" />
                <Skeleton className="h-3 w-24" />
              </>
            )}
          </div>
          <div className="mt-3 flex gap-5 text-xs">
            {[
              ['1.284', 'seguidores'],
              ['312', 'seguindo'],
              ['96', 'posts'],
            ].map(([n, l]) =>
              carregado ? (
                <span key={l}>
                  <span className="font-semibold tabular-nums">{n}</span> <span className="text-muted-foreground">{l}</span>
                </span>
              ) : (
                <Skeleton key={l} className="h-3 w-16" />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {POSTS.map((p) => (
          <div key={p.nome} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2.5">
              {carregado ? (
                <Avatar>
                  <AvatarFallback>{p.ini}</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="size-8 rounded-full" />
              )}
              <div className="flex-1 space-y-1">
                {carregado ? (
                  <>
                    <div className="text-sm leading-none font-medium">{p.nome}</div>
                    <div className="text-xs text-muted-foreground">{p.quando}</div>
                  </>
                ) : (
                  <>
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-12" />
                  </>
                )}
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {carregado ? (
                <p className="text-sm leading-snug">{p.texto}</p>
              ) : (
                <>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </>
              )}
            </div>
            {p.imagem && (carregado ? <div className={`mt-3 h-32 rounded-lg bg-gradient-to-br ${p.grad}`} /> : <Skeleton className="mt-3 h-32 rounded-lg" />)}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              {carregado ? (
                <>
                  <span className="flex items-center gap-1">
                    <Heart className="size-3.5" /> {p.curtidas}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3.5" /> {p.comentarios}
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    <Share2 className="size-3.5" /> Compartilhar
                  </span>
                </>
              ) : (
                <>
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="ml-auto h-3 w-20" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
