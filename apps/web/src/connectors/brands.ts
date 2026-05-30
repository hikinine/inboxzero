import type { IconName } from '../components/icon.tsx';

export interface Brand {
  bg:     string;
  logo?:  string;        // path under /logos/ (preferred)
  icon:   IconName;      // fallback icon
  dark?:  boolean;       // dark text on light bg (Notion)
  border?: boolean;      // show subtle border on dark tiles
}

export const BRANDS: Record<string, Brand> = {
  'WhatsApp':           { bg: '#1FAE5A', logo: '/logos/whatsapp.svg',        icon: 'chat' },
  'Slack':              { bg: '#4A154B', logo: '/logos/slack.svg',            icon: 'send' },
  'Gmail':              { bg: '#FFFFFF', logo: '/logos/gmail.svg',            icon: 'mail',     dark: true, border: true },
  'Nubank':             { bg: '#820ad1', logo: '/logos/nubank.png',           icon: 'card' },
  'Telegram':           { bg: '#229ED9', logo: '/logos/telegram.svg',         icon: 'send' },
  'Notion':             { bg: '#FFFFFF', logo: '/logos/notion.png',           icon: 'doc',      dark: true, border: true },
  'Google Agenda':      { bg: '#FFFFFF', logo: '/logos/google-calendar.svg',  icon: 'calendar', dark: true, border: true },
  'Notificações iOS':   { bg: '#000000', logo: '/logos/apple.jpg',            icon: 'bell' },
  'Linear':             { bg: '#1a1a1f', logo: '/logos/linear.svg',           icon: 'checklist' },
  'Google Drive':       { bg: '#FFFFFF', logo: '/logos/google-drive.svg',     icon: 'doc',      dark: true, border: true },
  'ChatGPT':            { bg: '#0E8F71',                                      icon: 'spark' },
  'GitHub':             { bg: '#1B1B20',                                      icon: 'doc',      border: true },
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
  { brand: 'WhatsApp',         desc: 'Pedidos e combinados nas conversas viram tarefas.',        on: true },
  { brand: 'Slack',            desc: 'Menções e mensagens marcadas viram tarefas e lembretes.',  on: true },
  { brand: 'Nubank',           desc: 'Compras e faturas viram lembretes no financeiro.',          on: true, isNew: true },
  { brand: 'Notificações iOS', desc: 'Push de apps — entregas, check-in — viram tarefas.' },
  { brand: 'Gmail',            desc: 'E-mails com pedidos e prazos viram tarefas sozinhos.' },
  { brand: 'Google Agenda',    desc: 'Eventos e convites entram direto na sua agenda.' },
  { brand: 'Notion',           desc: 'Sincroniza suas páginas e bancos de dados de tarefas.' },
  { brand: 'Telegram',         desc: 'Mensagens salvas e encaminhadas viram tarefas rápidas.',   isNew: true },
  { brand: 'Linear',           desc: 'Issues atribuídas a você viram tarefas de trabalho.',      isNew: true },
  { brand: 'Google Drive',     desc: 'Comentários e compartilhamentos viram tarefas.' },
];
