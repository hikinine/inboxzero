'use client'

import type { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQ = [
  {
    id: 'prazo',
    pergunta: 'Qual é o prazo de entrega?',
    resposta: 'Pedidos confirmados até as 14h saem no mesmo dia. O prazo médio é de 2 dias úteis para capitais e 5 para o interior.',
  },
  {
    id: 'troca',
    pergunta: 'Posso trocar ou devolver?',
    resposta: 'Sim. Você tem 7 dias corridos após o recebimento para solicitar a troca ou a devolução, sem custo de frete.',
  },
  {
    id: 'pagamento',
    pergunta: 'Quais formas de pagamento são aceitas?',
    resposta: 'Pix com 5% de desconto, cartão de crédito em até 12x e boleto bancário com compensação em 1 dia útil.',
  },
  {
    id: 'rastreio',
    pergunta: 'Como acompanho o meu pedido?',
    resposta: 'O código de rastreio chega por e-mail e WhatsApp assim que o pedido é postado. Você também vê o status em “Meus pedidos”.',
  },
]

const CONTA = [
  {
    id: 'senha',
    pergunta: 'Esqueci minha senha. E agora?',
    resposta: 'Clique em “Esqueci a senha” na tela de login. Enviamos um link válido por 30 minutos para o seu e-mail.',
  },
  {
    id: 'email',
    pergunta: 'Posso mudar o e-mail da conta?',
    resposta: 'Sim, em Configurações → Conta. Pedimos uma confirmação no e-mail antigo e no novo.',
  },
  {
    id: 'excluir',
    pergunta: 'Como excluo minha conta?',
    resposta: 'Em Configurações → Privacidade. Os dados são removidos definitivamente em até 30 dias.',
  },
]

export default function AccordionFaq() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Um aberto por vez</Legenda>
        <Accordion defaultValue={['prazo']}>
          {FAQ.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.pergunta}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <Legenda>Vários abertos (multiple)</Legenda>
        <Accordion multiple defaultValue={['senha', 'email']}>
          {CONTA.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.pergunta}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
