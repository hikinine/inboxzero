'use client';

// Canvas de automação (estilo builder do Clickmax): entradas → funil → sanitização
// (Email Checker) → disparos. Conectores com "marching ants" + pontos viajando (SMIL).

const IG_PATH =
  'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077';

const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

const FONT = { fontFamily: 'inherit' } as const;

function Node({
  x,
  y,
  w = 170,
  h = 54,
  title,
  sub,
  children,
  accent,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  children?: React.ReactNode; // ícone (28x28 em x+13,y+13)
  accent?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={accent ? '#161718' : '#0f1011'} stroke={accent ? '#e4f222' : '#23252a'} strokeWidth={accent ? 1.5 : 1} />
      {children}
      <text x={x + 52} y={y + (sub ? 24 : 32)} fontSize={12.5} fill="#d0d6e0" style={{ ...FONT, fontWeight: 510 }}>
        {title}
      </text>
      {sub && (
        <text x={x + 52} y={y + 40} fontSize={10.5} fill="#8a8f98" style={FONT}>
          {sub}
        </text>
      )}
    </g>
  );
}

function IconTile({ x, y, fill, children }: { x: number; y: number; fill: string; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={28} height={28} rx={7.5} fill={fill} />
      {children}
    </g>
  );
}

export function AutomationFlow() {
  return (
    <div className="card overflow-x-auto p-2 sm:p-3" style={{ boxShadow: 'var(--shadow-xl)' }}>
      <svg viewBox="0 0 980 440" className="min-w-[860px]" role="img" aria-label="Fluxo de automação: Instagram e formulários entram no funil, o Email Checker sanitiza e só contatos válidos seguem para WhatsApp, e-mail e CRM">
        <defs>
          <pattern id="af-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#17181a" />
          </pattern>
          <linearGradient id="af-ig" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#FEDA75" />
            <stop offset="0.35" stopColor="#FA7E1E" />
            <stop offset="0.6" stopColor="#D62976" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>

        <rect width="980" height="440" rx="10" fill="url(#af-grid)" />

        {/* ---------- conectores ---------- */}
        {[
          ['af-e1', 'M200 97 C 246 97, 246 200, 272 204'],
          ['af-e2', 'M200 192 C 240 192, 240 208, 272 210'],
          ['af-e3', 'M200 287 C 246 287, 246 224, 272 218'],
          ['af-fs', 'M420 211 C 452 211, 458 211, 490 211'],
          ['af-s1', 'M700 176 C 748 176, 748 97, 790 97'],
          ['af-s2', 'M700 211 C 748 211, 748 192, 790 192'],
          ['af-s3', 'M700 246 C 748 246, 748 287, 790 287'],
        ].map(([id, d]) => (
          <path key={id} id={id} d={d} fill="none" stroke="#383b3f" strokeWidth="1.5" className="ec-ants" />
        ))}
        {/* rejeitados */}
        <path id="af-rej" d="M595 300 C 595 322, 595 336, 595 356" fill="none" stroke="#eb5757" strokeOpacity="0.55" strokeWidth="1.5" className="ec-ants" />

        {/* pontos viajando */}
        <g className="ec-flow-dots">
          {[
            ['af-e1', '#8a8f98', '0s', '3.2s'],
            ['af-e2', '#8a8f98', '1.1s', '3.2s'],
            ['af-e3', '#8a8f98', '2.2s', '3.2s'],
            ['af-fs', '#d0d6e0', '0.6s', '1.6s'],
            ['af-s1', '#e4f222', '0s', '2.6s'],
            ['af-s2', '#e4f222', '0.9s', '2.6s'],
            ['af-s3', '#e4f222', '1.8s', '2.6s'],
          ].map(([href, fill, begin, dur], i) => (
            <circle key={i} r="3" fill={fill}>
              <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                <mpath href={`#${href}`} />
              </animateMotion>
            </circle>
          ))}
          <circle r="2.5" fill="#eb5757">
            <animateMotion dur="2.2s" begin="0.4s" repeatCount="indefinite">
              <mpath href="#af-rej" />
            </animateMotion>
          </circle>
        </g>

        {/* ---------- entradas ---------- */}
        <text x={30} y={52} fontSize={10} fill="#62666d" letterSpacing="2" style={FONT}>
          ENTRADAS
        </text>
        <Node x={30} y={70} title="Instagram" sub="leads do direct/bio">
          <IconTile x={43} y={83} fill="url(#af-ig)">
            <g transform="translate(48.2, 88.2) scale(0.73)">
              <path d={IG_PATH} fill="#fff" />
            </g>
          </IconTile>
        </Node>
        <Node x={30} y={165} title="Formulário / LP" sub="captura no site">
          <IconTile x={43} y={178} fill="#161718">
            <rect x={49} y={185} width={16} height={3} rx={1.5} fill="#8a8f98" />
            <rect x={49} y={191} width={16} height={3} rx={1.5} fill="#8a8f98" />
            <rect x={49} y={197} width={9} height={3} rx={1.5} fill="#e4f222" />
          </IconTile>
        </Node>
        <Node x={30} y={260} title="Lista CSV" sub="importação em massa">
          <IconTile x={43} y={273} fill="#161718">
            <path d="M51 279 h8 l4 4 v10 h-12 Z" fill="none" stroke="#8a8f98" strokeWidth="1.4" />
            <path d="M59 279 v4 h4" fill="none" stroke="#8a8f98" strokeWidth="1.4" />
          </IconTile>
        </Node>

        {/* ---------- funil ---------- */}
        <Node x={270} y={140} w={150} h={142} title="Funil" sub="qualificação">
          <IconTile x={283} y={153} fill="#161718">
            <path d="M288 159 h18 l-7 8 v7 l-4 3 v-10 Z" fill="none" stroke="#d0d6e0" strokeWidth="1.4" strokeLinejoin="round" />
          </IconTile>
        </Node>
        {/* níveis do funil */}
        <rect x={290} y={200} width={110} height={16} rx={4} fill="#23252a" />
        <rect x={303} y={222} width={84} height={16} rx={4} fill="#2c2e33" />
        <rect x={317} y={244} width={56} height={16} rx={4} fill="#383b3f" />

        {/* ---------- sanitização (o nó-herói) ---------- */}
        <text x={490} y={118} fontSize={10} fill="#62666d" letterSpacing="2" style={FONT}>
          SANITIZAÇÃO
        </text>
        <Node x={490} y={130} w={210} h={170} title="Email Checker" sub="valida antes do disparo" accent>
          <IconTile x={503} y={143} fill="#e4f222">
            <path d="M517 149 l8 3 v6 c0 5 -3.4 8.4 -8 10 c-4.6 -1.6 -8 -5 -8 -10 v-6 Z" fill="none" stroke="#08090a" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M513.5 158 l2.6 2.6 l4.8 -5" fill="none" stroke="#08090a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </IconTile>
        </Node>
        {[
          ['válido', '→ segue pro disparo', '#e4f222', 196],
          ['descartável', '→ removido', '#fbbf24', 224],
          ['sem caixa (SMTP)', '→ removido', '#eb5757', 252],
        ].map(([k, v, c, y]) => (
          <g key={k as string}>
            <circle cx={512} cy={(y as number) - 4} r={3} fill={c as string} />
            <text x={524} y={y as number} fontSize={11} fill="#d0d6e0" className="mono" style={FONT}>
              {k}
            </text>
            <text x={524} y={(y as number) + 13} fontSize={9.5} fill="#62666d" className="mono" style={FONT}>
              {v}
            </text>
          </g>
        ))}

        {/* bandeja de descartados */}
        <rect x={520} y={356} width={150} height={50} rx={10} fill="#0f1011" stroke="#eb5757" strokeOpacity="0.35" />
        <text x={536} y={377} fontSize={11} fill="#8a8f98" style={{ ...FONT, fontWeight: 510 }}>
          descartados
        </text>
        <text x={536} y={393} fontSize={9.5} fill="#62666d" className="mono" style={FONT}>
          disposable · no_mx · not_found
        </text>

        {/* ---------- disparos ---------- */}
        <text x={790} y={52} fontSize={10} fill="#62666d" letterSpacing="2" style={FONT}>
          DISPAROS
        </text>
        <Node x={790} y={70} w={162} title="WhatsApp" sub="disparo + atendimento">
          <IconTile x={803} y={83} fill="#25D366">
            <g transform="translate(807.8, 87.8) scale(0.77)">
              <path d={WA_PATH} fill="#fff" />
            </g>
          </IconTile>
        </Node>
        <Node x={790} y={165} w={162} title="E-mail" sub="campanhas sem bounce">
          <IconTile x={803} y={178} fill="#161718">
            <rect x={808} y={185} width={18} height={13} rx={2.5} fill="none" stroke="#d0d6e0" strokeWidth="1.4" />
            <path d="M808 187 l9 6.5 l9 -6.5" fill="none" stroke="#d0d6e0" strokeWidth="1.4" />
          </IconTile>
        </Node>
        <Node x={790} y={260} w={162} title="CRM" sub="pipeline limpo">
          <IconTile x={803} y={273} fill="#161718">
            <ellipse cx={817} cy={280.5} rx={8} ry={3} fill="none" stroke="#d0d6e0" strokeWidth="1.3" />
            <path d="M809 280.5 v10 c0 1.7 3.6 3 8 3 s8 -1.3 8 -3 v-10" fill="none" stroke="#d0d6e0" strokeWidth="1.3" />
            <path d="M809 285.5 c0 1.7 3.6 3 8 3 s8 -1.3 8 -3" fill="none" stroke="#d0d6e0" strokeWidth="1.3" />
          </IconTile>
        </Node>
      </svg>
    </div>
  );
}
