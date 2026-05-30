// Thin line icon set — stroke = currentColor

export type IconName =
  | 'home' | 'tasks' | 'checklist' | 'calendar' | 'settings'
  | 'plus' | 'clock' | 'flag' | 'tag' | 'bell' | 'search'
  | 'chevronL' | 'chevronR' | 'x' | 'check' | 'sun' | 'repeat'
  | 'inbox' | 'dot' | 'pin' | 'chat' | 'card' | 'mail' | 'send'
  | 'doc' | 'plug' | 'spark' | 'sliders' | 'copy' | 'eye'
  | 'arrowR' | 'globe';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
  className?: string;
}

const PATHS: Record<IconName, React.ReactNode> = {
  home: <><path d="M3.5 10.5 12 4l8.5 6.5" /><path d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1V9.5" /></>,
  tasks: <><path d="M4 6.5h11" /><path d="M4 12h11" /><path d="M4 17.5h7" /><path d="M18.5 5.5l1.5 1.5 2.5-3" transform="translate(-1 0)" /></>,
  checklist: <><path d="M9 6.5h11" /><path d="M9 12h11" /><path d="M9 17.5h11" /><path d="M3.5 6.2l1.1 1.1 1.9-2.2" /><path d="M3.5 11.7l1.1 1.1 1.9-2.2" /><path d="M3.6 16.4h.01" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17" /><path d="M8 3.2v3.4" /><path d="M16 3.2v3.4" /></>,
  settings: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.2M12 19v2.2M4.3 7l1.9 1.1M17.8 15.9l1.9 1.1M4.3 17l1.9-1.1M17.8 8.1l1.9-1.1" /></>,
  plus: <><path d="M12 5.5v13" /><path d="M5.5 12h13" /></>,
  clock: <><circle cx="12" cy="12" r="8.2" /><path d="M12 7.6V12l3 1.8" /></>,
  flag: <><path d="M6 21V4" /><path d="M6 4.5h11l-2.2 3.4L17 11.3H6" /></>,
  tag: <><path d="M4 4.8h6.2a2 2 0 0 1 1.4.6l7 7a1.6 1.6 0 0 1 0 2.3l-4.5 4.5a1.6 1.6 0 0 1-2.3 0l-7-7a2 2 0 0 1-.6-1.4V4.8Z" /><circle cx="8" cy="8.6" r="1.2" /></>,
  bell: <><path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 5 1.6 6.5 1.6 6.5H4.9s1.6-1.5 1.6-6.5Z" /><path d="M10.2 19.5a2 2 0 0 0 3.6 0" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-3.6-3.6" /></>,
  chevronL: <path d="M14.5 6 9 12l5.5 6" />,
  chevronR: <path d="M9.5 6 15 12l-5.5 6" />,
  x: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  check: <path d="M5 12.5l4 4 10-10.5" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M5.6 18.4l1.7-1.7M16.7 7.3l1.7-1.7" /></>,
  repeat: <><path d="M4.5 8.5a5 5 0 0 1 9-3l1.5 1.5" /><path d="M15.5 4.5l.5 2.7-2.7.3" /><path d="M19.5 15.5a5 5 0 0 1-9 3L9 17" /><path d="M8.5 19.5 8 16.8l2.7-.3" /></>,
  inbox: <><path d="M4 13.5 6 5.5a2 2 0 0 1 2-1.5h8a2 2 0 0 1 2 1.5l2 8" /><path d="M4 13.5h4l1.2 2.2h5.6L16 13.5h4v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18Z" /></>,
  dot: <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />,
  pin: <><path d="M12 21v-7" /><path d="M8 4h8l-1 6H9L8 4Z" /><path d="M6.5 10h11" /></>,
  chat: <><path d="M5 6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9.5L6 18.5V15.5H7a2 2 0 0 1-2-2Z" transform="translate(0 -0.3)" /></>,
  card: <><rect x="3.5" y="6" width="17" height="12" rx="2.5" /><path d="M3.5 10h17" /><path d="M6.5 14.2h3.5" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4.5 7.5 7.5 5 7.5-5" /></>,
  send: <><path d="M20 4 3.5 11l6 2.2L11.8 20 20 4Z" /><path d="M9.5 13.2 20 4" /></>,
  doc: <><path d="M6 3.5h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" /><path d="M13 3.5V8.5h5" /><path d="M8.5 13h7M8.5 16.5h5" /></>,
  plug: <><path d="M9 3.5v4M15 3.5v4" /><path d="M7 7.5h10v3a5 5 0 0 1-10 0Z" /><path d="M12 15.5V20" /></>,
  spark: <path d="M12 3.2l1.7 5.6 5.6 1.7-5.6 1.7L12 17.8l-1.7-5.6L4.7 10.5l5.6-1.7Z" />,
  sliders: <><path d="M5 7h9M18 7h1.5M5 12h2M11 12h8.5M5 17h6M15 17h4.5" /><circle cx="16" cy="7" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="13" cy="17" r="2" /></>,
  copy: <><rect x="8" y="8" width="11.5" height="11.5" rx="2.5" /><path d="M5.5 15.5A1.5 1.5 0 0 1 4 14V6a2 2 0 0 1 2-2h8a1.5 1.5 0 0 1 1.5 1.5" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
  arrowR: <><path d="M4 12h14.5" /><path d="M13 6l6 6-6 6" /></>,
  globe: <><circle cx="12" cy="12" r="8.2" /><path d="M3.8 12h16.4" /><path d="M12 3.8c2.3 2.2 3.5 5.1 3.5 8.2S14.3 18 12 20.2C9.7 18 8.5 15.1 8.5 12S9.7 5.9 12 3.8Z" /></>,
};

export function Icon({ name, size = 22, stroke = 1.6, style, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', ...style }}
      className={className}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
