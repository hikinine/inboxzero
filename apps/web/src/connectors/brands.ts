import type { IconName } from '../components/icon.tsx';

export interface Brand {
  bg: string;
  icon: IconName;
  dark?: boolean;
  border?: boolean;
}

export const BRANDS: Record<string, Brand> = {
  'WhatsApp':           { bg: '#1FAE5A', icon: 'chat' },
  'Slack':              { bg: '#6B2C84', icon: 'send' },
  'Gmail':              { bg: '#E5453A', icon: 'mail' },
  'Nubank':             { bg: '#820AD1', icon: 'card' },
  'Telegram':           { bg: '#229ED9', icon: 'send' },
  'Notion':             { bg: '#ECECEC', icon: 'doc', dark: true },
  'Google Agenda':      { bg: '#2F6BE5', icon: 'calendar' },
  'Notificações iOS':   { bg: '#1B1B20', icon: 'bell', border: true },
  'Linear':             { bg: '#5B62D6', icon: 'checklist' },
  'Google Drive':       { bg: '#1BA463', icon: 'doc' },
  'ChatGPT':            { bg: '#0E8F71', icon: 'spark' },
  'GitHub':             { bg: '#1B1B20', icon: 'doc', border: true },
};

export const SCATTER = [
  { brand: 'WhatsApp',          left: 44,  top: 58  },
  { brand: 'Telegram',          left: 252, top: 46  },
  { brand: 'Slack',             left: 150, top: 150 },
  { brand: 'ChatGPT',           left: 292, top: 152 },
  { brand: 'Nubank',            left: 40,  top: 232 },
  { brand: 'Notion',            left: 176, top: 250 },
  { brand: 'Gmail',             left: 302, top: 252 },
  { brand: 'Google Agenda',     left: 96,  top: 350 },
  { brand: 'Notificações iOS',  left: 252, top: 352 },
  { brand: 'Linear',            left: 42,  top: 448 },
  { brand: 'GitHub',            left: 178, top: 452 },
];

export const ROWS = [
  { brand: 'WhatsApp',         desc: 'Pedidos e combinados nas conversas viram tarefas.', on: true },
  { brand: 'Slack',            desc: 'Menções e mensagens marcadas viram tarefas e lembretes.', on: true },
  { brand: 'Nubank',           desc: 'Compras e faturas viram lembretes no financeiro.', on: true, isNew: true },
  { brand: 'Notificações iOS', desc: 'Push de apps — entregas, check-in — viram tarefas.' },
  { brand: 'Gmail',            desc: 'E-mails com pedidos e prazos viram tarefas sozinhos.' },
  { brand: 'Google Agenda',    desc: 'Eventos e convites entram direto na sua agenda.' },
  { brand: 'Notion',           desc: 'Sincroniza suas páginas e bancos de dados de tarefas.' },
  { brand: 'Telegram',         desc: 'Mensagens salvas e encaminhadas viram tarefas rápidas.', isNew: true },
  { brand: 'Linear',           desc: 'Issues atribuídas a você viram tarefas de trabalho.', isNew: true },
  { brand: 'Google Drive',     desc: 'Comentários e compartilhamentos viram tarefas.' },
];
