'use client'

import { CreditCard, LifeBuoy, Shield } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TOPICS = [
  {
    value: 'geral',
    label: 'Geral',
    Icon: LifeBuoy,
    items: [
      { q: 'O que é a plataforma, em uma frase?', a: 'Uma caixa de entrada única para WhatsApp, Instagram e e-mail, com CRM, automações e IA para o seu time atender mais rápido.' },
      { q: 'Preciso instalar alguma coisa?', a: 'Não. Funciona no navegador e nos apps para iOS e Android. A conexão com o WhatsApp é feita pela API oficial, sem celular ligado.' },
      { q: 'Quais canais são suportados?', a: 'WhatsApp, Instagram Direct, Messenger, Telegram, e-mail e chat no site. Novos canais entram a cada trimestre.' },
      { q: 'Tem limite de atendentes?', a: 'Não. Todos os planos têm atendentes ilimitados; a cobrança é por conversa.' },
    ],
  },
  {
    value: 'cobranca',
    label: 'Cobrança',
    Icon: CreditCard,
    items: [
      { q: 'Como funciona a cobrança?', a: 'Mensal ou anual, no cartão de crédito, Pix ou boleto. O plano anual tem 2 meses de desconto.' },
      { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim. O upgrade vale na hora, com valor proporcional. O downgrade entra na próxima renovação.' },
      { q: 'Vocês emitem nota fiscal?', a: 'Sim, automaticamente todo mês, com o CNPJ cadastrado. Ela fica disponível na área de cobrança.' },
      { q: 'O que acontece se eu passar do limite de conversas?', a: 'Nada para. Cobramos as conversas excedentes a R$ 0,19 cada, e avisamos quando você chega a 80% do limite.' },
    ],
  },
  {
    value: 'seguranca',
    label: 'Segurança',
    Icon: Shield,
    items: [
      { q: 'Onde os dados ficam hospedados?', a: 'Em datacenters no Brasil (região de São Paulo), com backups diários e replicação em outra zona.' },
      { q: 'Vocês são adequados à LGPD?', a: 'Sim. Temos DPO nomeado, registro de operações de tratamento e contrato de processamento de dados disponível para clientes.' },
      { q: 'Tem autenticação em dois fatores?', a: 'Sim, por aplicativo autenticador ou SMS, e SSO com Google e Microsoft nos planos Business e Enterprise.' },
      { q: 'Como funcionam as permissões?', a: 'Perfis de administrador, gestor e atendente, com controle por canal e por fila. Todo acesso fica registrado na trilha de auditoria.' },
    ],
  },
]

export default function FaqComAbasPorTema() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Central de dúvidas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Como podemos ajudar?</h2>
          <p className="mt-3 text-muted-foreground">Escolha um tema. Se não encontrar, o chat no canto da tela responde em minutos.</p>
        </div>
        <Tabs defaultValue="geral" className="mt-10 gap-6">
          <TabsList className="mx-auto">
            {TOPICS.map(({ value, label, Icon }) => (
              <TabsTrigger key={value} value={value} className="px-3">
                <Icon /> {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TOPICS.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              <div className="rounded-xl border bg-card px-5">
                <Accordion defaultValue={[`${t.value}-0`]}>
                  {t.items.map((item, i) => (
                    <AccordionItem key={item.q} value={`${t.value}-${i}`}>
                      <AccordionTrigger className="py-4 text-base">{item.q}</AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
