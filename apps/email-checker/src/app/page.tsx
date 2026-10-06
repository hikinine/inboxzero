import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { AutomationFlow } from '@/components/landing/AutomationFlow';
import { HeroDemo } from '@/components/landing/HeroDemo';
import { ApiShowcase, AuditLedger, Pipeline, Reveal, Stats, VerdictTicker } from '@/components/landing/Sections';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mono mb-3 text-[11px] uppercase tracking-widest text-ash">{children}</div>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display text-[32px] sm:text-[40px]" style={{ color: '#fff' }}>
      {children}
    </h2>
  );
}

export default async function LandingPage() {
  const user = await getSessionUser();

  return (
    <main className="min-h-screen">
      {/* ---------- 1. Nav ---------- */}
      <header className="sticky top-0 z-40 border-b border-graphite/70 bg-void/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-page items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-[15px] text-white" style={{ fontWeight: 510 }}>
            <BrandMark size={19} />
            MX Check
            <span className="mono ml-1 hidden text-[10px] text-ash sm:inline">por Clickmax</span>
          </Link>
          <nav className="flex items-center gap-1 text-[13px]">
            <Link href="/docs" className="rounded-md px-3 py-1.5 text-mist hover:bg-white/5">
              Documentação
            </Link>
            {user ? (
              <Link href="/dashboard" className="btn-pill ml-2">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="rounded-md px-3 py-1.5 text-mist hover:bg-white/5">
                  Entrar
                </Link>
                <Link href="/register" className="btn-pill ml-2">
                  Criar conta
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ---------- 2. Hero: a demo é o headline ---------- */}
      <section className="ec-floor">
        <div className="mx-auto max-w-page px-6 pb-20 pt-24 text-center sm:pt-28">
          <Reveal>
            <span className="badge mx-auto inline-flex items-center gap-1.5 bg-white/5 !px-2.5 text-fog">
              <BrandMark size={13} /> MX Check — o “CX Check” da Clickmax
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mx-auto mt-5 max-w-3xl text-[44px] sm:text-[64px]">Esse e-mail existe?</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-fog">
              Formato, domínios descartáveis, MX e a caixa de verdade — via SMTP. Descubra antes de enviar, não no
              bounce.
            </p>
          </Reveal>
          <Reveal delay={260} className="mt-10">
            <HeroDemo />
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-4 text-[12px] text-ash">
              Grátis e sem conta — inclusive a caixa via SMTP (com limite por IP).{' '}
              <Link href="/register" className="text-fog underline decoration-graphite underline-offset-4 hover:text-mist">
                Batch e API exigem conta
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 3. Ticker ---------- */}
      <VerdictTicker />

      {/* ---------- 4. Pipeline ---------- */}
      <section className="mx-auto max-w-page px-6 py-24">
        <Reveal>
          <SectionLabel>como funciona</SectionLabel>
          <H2>Quatro estágios. Um veredito.</H2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
            Cada e-mail atravessa o pipeline inteiro em milissegundos — e para no primeiro estágio que reprovar. Você
            recebe o motivo exato, não um “inválido” genérico.
          </p>
        </Reveal>
        <div className="mt-10">
          <Pipeline />
        </div>
      </section>

      {/* ---------- 4b. Fluxo de automação ---------- */}
      <section className="hairline-t">
        <div className="mx-auto max-w-page px-6 py-24">
          <Reveal>
            <SectionLabel>na sua automação</SectionLabel>
            <H2>Feito pra viver no meio do fluxo.</H2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
              Capte no Instagram, formulários ou CSV, afunile — e deixe a sanitização acontecer{' '}
              <span className="text-mist" style={{ fontWeight: 510 }}>
                antes
              </span>{' '}
              do disparo. WhatsApp, campanhas e CRM só recebem contato que existe: menos bounce, menos crédito queimado,
              número protegido.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10">
            <AutomationFlow />
          </Reveal>
        </div>
      </section>

      {/* ---------- 5. Product shot ---------- */}
      <section className="mx-auto max-w-page px-6 pb-24">
        <Reveal>
          <SectionLabel>o painel</SectionLabel>
          <H2>Créditos, chaves e histórico num só lugar.</H2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
            Crie API keys, teste no playground e acompanhe cada checagem — com busca, filtros e o motivo de cada
            resultado.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-10">
          <div className="card overflow-hidden p-2 sm:p-3" style={{ boxShadow: 'var(--shadow-xl)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/shots/dashboard.png"
              alt="Dashboard do MX Check: créditos, API keys, playground e histórico de checagens"
              className="w-full rounded-lg border border-graphite"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------- 6. API ---------- */}
      <section className="hairline-t">
        <div className="mx-auto grid max-w-page items-center gap-10 px-6 py-24 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>para devs</SectionLabel>
            <H2>Uma chamada. Sete status possíveis.</H2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fog">
              Autentique com Bearer token e valide um e-mail ou mil. A resposta diz exatamente o que aconteceu —
              incluindo <span className="mono text-[13px] text-mist">mailbox_not_found</span> quando o SMTP do provedor
              confirma que a caixa não existe.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-mist">
              {['Batch de até 1.000 e-mails por requisição', 'SMTP opt-in com detecção de catch-all', '1 crédito por e-mail · 402 quando acabar — sem surpresa', 'Estorno automático se a validação falhar'].map(
                (t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <Link href="/docs" className="mt-7 inline-flex items-center gap-1.5 text-[14px] text-mist hover:text-white">
              Ler a documentação <ArrowRight size={15} />
            </Link>
          </Reveal>
          <ApiShowcase />
        </div>
      </section>

      {/* ---------- 7. Auditável ---------- */}
      <section className="hairline-t">
        <div className="mx-auto grid max-w-page items-center gap-10 px-6 py-24 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <AuditLedger />
          </div>
          <Reveal className="order-1 lg:order-2">
            <SectionLabel>auditável por padrão</SectionLabel>
            <H2>Cada e-mail. Cada crédito. Cada evento.</H2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fog">
              Todo resultado fica retido com motivo e origem. Créditos viram um livro-razão com saldo após cada
              operação. Logins, chaves e checagens entram na trilha de auditoria — com IP e user-agent.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/cx-convergencia.svg" alt="" className="mt-8 hidden w-80 max-w-full opacity-95 lg:block" />
          </Reveal>
        </div>
      </section>

      {/* ---------- 8. Números ---------- */}
      <section className="hairline-t">
        <div className="mx-auto max-w-page px-6 py-24">
          <Reveal>
            <SectionLabel>números honestos</SectionLabel>
            <H2>Precisão sem caixa-preta.</H2>
          </Reveal>
          <div className="mt-10">
            <Stats />
          </div>
          <Reveal delay={120}>
            <div className="card mt-3 flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[13.5px] leading-relaxed text-fog">
                <span className="text-mist" style={{ fontWeight: 510 }}>
                  O que não prometemos:
                </span>{' '}
                adivinhar caixa em domínio catch-all. Quando o servidor aceita qualquer endereço, respondemos{' '}
                <span className="mono text-[12.5px]">catch_all</span> — não um “válido” de mentira.
              </p>
              <span className="badge shrink-0 bg-white/5 text-fog">honestidade &gt; marketing</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 9. Créditos ---------- */}
      <section className="hairline-t">
        <div className="mx-auto max-w-page px-6 py-24">
          <div className="card mx-auto max-w-2xl p-8 text-center" style={{ boxShadow: 'var(--shadow-xl)' }}>
            <Reveal>
              <SectionLabel>preço</SectionLabel>
              <h3 className="display text-[28px]" style={{ color: '#fff' }}>
                Comece com 500 créditos. Grátis.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-fog">
                1 crédito = 1 e-mail validado, em qualquer camada — inclusive SMTP. Sem cartão, sem assinatura, sem
                pegadinha de “resultado desconhecido cobrado”.
              </p>
              <div className="mt-7 flex items-center justify-center gap-3">
                <Link href="/register" className="btn-primary px-6 py-2.5">
                  Criar conta grátis
                </Link>
                <Link href="/docs" className="btn-ghost px-5 py-2.5">
                  Ver a API
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 10. CTA final + footer ---------- */}
      <section className="hairline-t">
        <div className="mx-auto flex max-w-page flex-col items-center gap-8 px-6 py-28 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/illustrations/cx-jornada.svg" alt="" className="w-full max-w-lg opacity-95" />
          <Reveal>
            <h2 className="display mx-auto max-w-2xl text-[36px] sm:text-[48px]">Pare de enviar para o vazio.</h2>
          </Reveal>
          <Reveal delay={120}>
            <Link href="/register" className="btn-primary px-7 py-3 text-[15px]">
              Começar agora <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="hairline-t">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-3 px-6 py-8 text-[12.5px] text-ash sm:flex-row">
          <span className="flex items-center gap-2">
            <BrandMark size={15} />
            MX Check
            <span className="text-ash">· por Clickmax</span>
          </span>
          <div className="flex items-center gap-5">
            <Link href="/docs" className="hover:text-fog">
              Documentação
            </Link>
            <Link href="/login" className="hover:text-fog">
              Entrar
            </Link>
            <span className="mono text-[11px]">powered by disposable-email-domains</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
