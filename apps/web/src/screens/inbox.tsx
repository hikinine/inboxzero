import { Icon } from '../components/icon.tsx';
import type { IconName } from '../components/icon.tsx';

interface SignalProps {
  icon: IconName;
  name: string;
  time: string;
  quote: string;
  sender?: string;
  task: string;
  meta?: React.ReactNode;
  pending?: boolean;
}

function Source({ icon, name }: { icon: IconName; name: string }) {
  return (
    <span className="tk-src">
      <span className="ico"><Icon name={icon} size={16} /></span>
      {name}
    </span>
  );
}

function Signal({ icon, name, time, quote, sender, task, meta, pending }: SignalProps) {
  return (
    <div className="tk-signal">
      <div className="tk-sig-head">
        <Source icon={icon} name={name} />
        <span className="tk-sig-time">{time}</span>
      </div>
      <div className="tk-sig-quote">
        {sender && <b>{sender}: </b>}"{quote}"
      </div>
      <div className="tk-sig-conv">
        <Icon name="spark" size={14} />
        <span>Tasky criou</span>
        <span className="ln" />
      </div>
      <div className="tk-sig-result">
        {pending ? (
          <>
            <div className="label">{task}</div>
            <div className="tk-sig-actions">
              <span className="tk-mini-ghost">Editar</span>
              <span className="tk-mini-primary">Adicionar</span>
            </div>
          </>
        ) : (
          <>
            <div className="tk-check" />
            <div className="label">{task}</div>
            <div className="meta">{meta}</div>
          </>
        )}
      </div>
    </div>
  );
}

export function InboxScreen() {
  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Inbox</h1>
              <div className="tk-date">A Tasky transformou 6 sinais em tarefas hoje</div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="sliders" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            <div className="tk-feedgrp">
              <p className="tk-feedlbl">Agora há pouco</p>
              <Signal
                icon="card"
                name="Nubank"
                time="13:02"
                quote="Compra aprovada: R$ 248,90 — Drogaria São Paulo"
                task="Categorizar despesa de saúde"
                pending
              />
              <Signal
                icon="chat"
                name="WhatsApp"
                time="12:48"
                sender="Marina"
                quote="confirma o jantar de hoje? 19h no Oro"
                task="Confirmar jantar com a Marina"
                meta={<><span><Icon name="clock" size={13} /></span>Hoje 19:00</>}
              />
            </div>

            <div className="tk-feedgrp">
              <p className="tk-feedlbl">Mais cedo</p>
              <Signal
                icon="send"
                name="Slack"
                time="09:21"
                sender="Rafael"
                quote="consegue revisar a proposta da Vértice antes das 13h?"
                task="Revisar proposta da Vértice"
                meta={<><Icon name="flag" size={13} />Alta · até 13h</>}
              />
              <Signal
                icon="bell"
                name="Notificações iOS"
                time="08:05"
                quote="Latam: check-in aberto para o voo GRU → GIG"
                task="Fazer check-in do voo"
                meta={<>Amanhã 08:00</>}
              />
              <Signal
                icon="mail"
                name="Gmail"
                time="07:40"
                sender="RH"
                quote="Lembrete: enviar o relatório de horas até sexta-feira"
                task="Enviar relatório de maio"
                meta={<>Sex 30 mai</>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
