'use client'

import { Facebook, Headset, Instagram, Lock, Mail, MessageCircle, Phone, ShieldCheck, Truck, Youtube } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const COLS: Array<{ title: string; links: string[] }> = [
  { title: 'Institucional', links: ['Sobre a Aero', 'Nossas lojas', 'Trabalhe conosco', 'Sustentabilidade', 'Imprensa'] },
  { title: 'Ajuda', links: ['Central de ajuda', 'Trocas e devoluções', 'Prazos de entrega', 'Formas de pagamento', 'Rastrear pedido'] },
  { title: 'Categorias', links: ['Tênis', 'Fones e áudio', 'Cafeteiras', 'Mochilas', 'Relógios', 'Ofertas'] },
  { title: 'Minha conta', links: ['Meus pedidos', 'Favoritos', 'Endereços', 'Cartões salvos', 'Vale-presente'] },
]
const PAYMENTS = ['Visa', 'Mastercard', 'Elo', 'Amex', 'Hipercard', 'Pix', 'Boleto']
const CARRIERS = ['Correios', 'Loggi', 'Jadlog']

export default function MegaFooterDeLoja() {
  return (
    <footer className="w-full border-t bg-background px-6 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="size-7 rounded-lg bg-primary" /> Aero Loja
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Ofertas da semana e lançamentos antes de todo mundo. Sem spam, cancele quando quiser.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Label htmlFor="news-email" className="sr-only">Seu e-mail</Label>
              <Input id="news-email" type="email" placeholder="seu@email.com" />
              <Button type="submit">Assinar</Button>
            </form>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <Button key={label} variant="outline" size="icon" aria-label={label} nativeButton={false} render={<a href="#" />}>
                  <Icon />
                </Button>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-medium">{col.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="text-sm font-medium">Atendimento</div>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="size-4" /> 0800 591 2026</li>
              <li className="flex items-center gap-2"><MessageCircle className="size-4" /> WhatsApp</li>
              <li className="flex items-center gap-2"><Mail className="size-4" /> ajuda@aeroloja.com.br</li>
              <li className="flex items-start gap-2"><Headset className="mt-0.5 size-4 shrink-0" /> Seg. a sex., 8h às 20h<br />Sáb., 9h às 15h</li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Formas de pagamento</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PAYMENTS.map((p) => (
                <Badge key={p} variant="outline">{p}</Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Parcele em até 10x sem juros. 5% de desconto no Pix.</p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Segurança</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="outline"><ShieldCheck data-icon="inline-start" className="text-emerald-600" /> SSL 256 bits</Badge>
              <Badge variant="outline"><Lock data-icon="inline-start" /> Compra protegida</Badge>
              <Badge variant="outline"><ShieldCheck data-icon="inline-start" /> Loja verificada</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Seus dados são criptografados e nunca compartilhados.</p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Entrega</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CARRIERS.map((c) => (
                <Badge key={c} variant="outline"><Truck data-icon="inline-start" /> {c}</Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Frete grátis acima de R$ 299 para todo o Brasil.</p>
          </div>
        </div>

        <Separator className="mt-10" />

        <div className="flex flex-col gap-2 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <span>Aero Comércio Eletrônico Ltda. · CNPJ 12.345.678/0001-90 · Av. Paulista, 1578 · São Paulo – SP</span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
            <span>© 2026 Aero Loja</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
