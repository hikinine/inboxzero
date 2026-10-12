'use client'

import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, BookOpen, Mail, MessageCircle, Phone } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const CANAIS: Array<{ Icon: LucideIcon; nome: string; valor: string; resposta: string; acao: string; cor: string }> = [
  { Icon: MessageCircle, nome: 'WhatsApp', valor: '(11) 99123-4567', resposta: 'Responde em cerca de 5 min', acao: 'Abrir conversa', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { Icon: Mail, nome: 'E-mail', valor: 'ola@acme.com.br', resposta: 'Até 1 dia útil', acao: 'Enviar e-mail', cor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
  { Icon: Phone, nome: 'Telefone', valor: '0800 591 2026', resposta: 'Seg. a sex., 9h às 18h', acao: 'Ligar agora', cor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { Icon: BookOpen, nome: 'Central de ajuda', valor: '340 artigos', resposta: 'Disponível 24/7', acao: 'Buscar resposta', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
]

const FAQ = [
  { q: 'Quanto tempo leva para começar a usar?', a: 'Entre 20 minutos e dois dias, dependendo dos canais. WhatsApp e Instagram conectam na hora; a migração de histórico de outra ferramenta é feita pelo nosso time.' },
  { q: 'Vocês atendem fora do horário comercial?', a: 'O chat para clientes funciona 24/7 com plantão humano. Telefone e e-mail seguem o horário comercial de Brasília.' },
  { q: 'Tem contrato de fidelidade?', a: 'Não. Os planos são mensais e você cancela quando quiser pela própria plataforma, sem ligar para ninguém.' },
  { q: 'Posso testar antes de contratar?', a: 'Sim: 14 dias grátis com todos os recursos e sem cartão de crédito. Se precisar de mais tempo, é só pedir no chat.' },
  { q: 'Como funciona o suporte durante a implantação?', a: 'Um especialista acompanha as duas primeiras semanas com reuniões semanais e um canal direto no WhatsApp.' },
]

export default function ContatoComFaqECanais() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Fale com a gente</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha o canal, a gente responde</h2>
          <p className="mt-3 text-muted-foreground">Quem atende é gente do time, não robô. O tempo de resposta de cada canal está indicado abaixo.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {CANAIS.map(({ Icon, nome, valor, resposta, acao, cor }) => (
              <li key={nome} className="flex flex-col rounded-xl border bg-card p-5">
                <span className={`flex size-10 items-center justify-center rounded-lg ${cor}`}>
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-semibold">{nome}</p>
                <p className="text-sm text-muted-foreground">{valor}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> {resposta}
                </p>
                <Button nativeButton={false} render={<a href="#" />} variant="outline" size="sm" className="mt-4 w-fit">
                  {acao} <ArrowUpRight data-icon="inline-end" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Antes de escrever, veja se já respondemos</h3>
          <p className="mt-1 text-sm text-muted-foreground">As cinco perguntas que mais chegam no chat.</p>
          <div className="mt-6 rounded-xl border bg-card px-5">
            <Accordion defaultValue={['faq-0']}>
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger className="py-4 text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Não achou sua dúvida?{' '}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">
              Veja a central de ajuda completa
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
