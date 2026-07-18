import { promises as dnsp } from 'node:dns';
import path from 'node:path';
import { DisposableEmailChecker } from '@usex/disposable-email-domains';
import { checkMicrosoft365, detectProvider } from './providers';
import { type MailboxResult, verifyMailbox } from './smtp';

// Provedores legítimos que NÃO devem ser marcados como descartáveis.
const TRUSTED_DOMAINS = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  'yahoo.com', 'ymail.com', 'icloud.com', 'me.com', 'proton.me', 'protonmail.com',
  'zoho.com', 'aol.com', 'gmx.com', 'mail.com',
];

const DATA_PATH =
  process.env.DISPOSABLE_DOMAINS_PATH ?? path.join(process.cwd(), 'data', 'disposable-domains.txt');

// Singleton: carrega a lista de 119k domínios uma vez (formato + descartável, offline).
let checker: DisposableEmailChecker | null = null;
function getChecker(): DisposableEmailChecker {
  if (!checker) {
    checker = new DisposableEmailChecker({
      localDataPath: DATA_PATH,
      autoUpdate: false,
      strictValidation: true,
      enableCaching: true,
      cacheSize: 20000,
      enableSubdomainChecking: true,
      trustedDomains: TRUSTED_DOMAINS,
    });
  }
  return checker;
}

export type CheckStatus =
  | 'valid'
  | 'invalid_format'
  | 'disposable'
  | 'no_mx'
  | 'mailbox_not_found'
  | 'catch_all'
  | 'unknown';

export type CheckOutcome = {
  email: string;
  status: CheckStatus;
  isValid: boolean;
  isDisposable: boolean;
  domain: string | null;
  confidence: number;
  reason: string | null;
  mxChecked: boolean;
  hasMx: boolean | null;
  smtpProvider: string | null; // rótulo do provedor (microsoft, g-suite, gmail…)
  smtpChecked: boolean;
  mailbox: MailboxResult | null; // resultado da prova de caixa (exists/not_found/catch_all/unknown)
  method: 'microsoft' | 'smtp' | null; // como a caixa foi checada
  durationMs: number | null;
};

// ---- MX nativo (node:dns) — captura também o host do MX p/ a prova SMTP -----------
type MxInfo = { has: boolean | null; host: string | null };
const mxCache = new Map<string, MxInfo>();

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}
async function hasAddress(domain: string): Promise<boolean> {
  try {
    const a = await withTimeout(dnsp.resolve(domain), 3000);
    return Array.isArray(a) && a.length > 0;
  } catch {
    return false;
  }
}
async function resolveMx(domain: string): Promise<MxInfo> {
  const key = domain.toLowerCase();
  if (mxCache.has(key)) return mxCache.get(key)!;
  let info: MxInfo;
  try {
    const mx = await withTimeout(dnsp.resolveMx(key), 4000);
    if (Array.isArray(mx) && mx.length > 0) {
      const host = mx.slice().sort((a, b) => a.priority - b.priority)[0].exchange;
      info = { has: true, host };
    } else {
      info = { has: await hasAddress(key), host: key };
    }
  } catch (e: any) {
    const code = e?.code;
    if (code === 'ENODATA') info = { has: await hasAddress(key), host: key };
    else if (code === 'ENOTFOUND' || code === 'ENOTIMP') info = { has: false, host: null };
    else info = { has: null, host: null };
  }
  mxCache.set(key, info);
  return info;
}

async function mapLimited<T, R>(items: T[], limit: number, fn: (x: T) => Promise<R>): Promise<Map<T, R>> {
  const out = new Map<T, R>();
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const it = items[i++];
      out.set(it, await fn(it));
    }
  });
  await Promise.all(workers);
  return out;
}

function baseOutcome(raw: any): CheckOutcome {
  const domain = raw?.domain || null;
  const isFormatValid = Boolean(raw?.isValid);
  const isDisposable = Boolean(raw?.isDisposable);
  return {
    email: raw?.email ?? '',
    status: !isFormatValid ? 'invalid_format' : isDisposable ? 'disposable' : 'valid',
    isValid: isFormatValid,
    isDisposable,
    domain,
    confidence: typeof raw?.confidence === 'number' ? raw.confidence : 0,
    reason: !isFormatValid ? 'formato_invalido' : isDisposable ? 'dominio_descartavel' : null,
    mxChecked: false,
    hasMx: null,
    smtpProvider: null,
    smtpChecked: false,
    mailbox: null,
    method: null,
    durationMs: typeof raw?.validationTime === 'number' ? raw.validationTime : null,
  };
}

// Valida e-mails: formato + descartável (offline), MX do domínio (default), e — se { smtp:true } —
// a existência da caixa via SMTP (RCPT TO). SMTP requer porta 25 de saída liberada.
export async function verifyEmails(
  emails: string[],
  opts: { mx?: boolean; smtp?: boolean } = {},
): Promise<CheckOutcome[]> {
  const doSmtp = opts.smtp === true;
  const doMx = opts.mx !== false || doSmtp; // SMTP precisa do host MX, então força o MX
  const results = await getChecker().checkEmailsBatch(emails);
  const outcomes = results.map(baseOutcome);

  if (!doMx) return outcomes;

  // 1) MX por domínio (dedupe + concorrência) + fingerprint do provedor.
  const domains = [...new Set(outcomes.filter((o) => o.status === 'valid' && o.domain).map((o) => o.domain as string))];
  const mxMap = await mapLimited(domains, 20, resolveMx);
  for (const o of outcomes) {
    if (!o.domain) continue;
    const info = mxMap.get(o.domain);
    if (!info) continue;
    o.mxChecked = true;
    o.hasMx = info.has;
    o.smtpProvider = detectProvider(info.host).label;
    if (o.status === 'valid' && info.has === false) {
      o.status = 'no_mx';
      o.isValid = false;
      o.reason = 'sem_registro_mx';
    }
  }

  if (!doSmtp) return outcomes;

  // 2) Verificação de caixa CONSCIENTE DO PROVEDOR. Concorrência baixa (throttle/reputação).
  const candidates = outcomes.filter((o) => o.status === 'valid' && o.domain);
  const boxMap = await mapLimited(candidates, 4, async (o) => {
    const host = (mxMap.get(o.domain as string) ?? {}).host;
    const { provider } = detectProvider(host);

    // Microsoft 365 CORPORATIVO: GetCredentialType é definitivo (até em catch-all) e mais rápido que SMTP.
    if (provider === 'microsoft') {
      const r = await checkMicrosoft365(o.email);
      if (r !== 'unknown') return { result: r, reason: undefined as string | undefined, method: 'microsoft' as const };
      // inconclusivo (throttle/federado) → tenta SMTP como fallback
      if (host) return { ...(await verifyMailbox(o.email, host)), method: 'smtp' as const };
      return { result: 'unknown' as MailboxResult, reason: undefined as string | undefined, method: null };
    }

    // Outlook CONSUMER (hotmail/outlook/live) e demais provedores: SMTP RCPT (com detecção de catch-all).
    // A GetCredentialType NÃO serve p/ consumer (mente), então aqui é SMTP. De um IP LIMPO (não em
    // blocklist) o Outlook consumer responde a verdade no RCPT; de IP sujo ele bloqueia no MAIL FROM
    // (→ verifyMailbox devolve unknown/mail_from_rejeitado, nunca not_found). Seguro nos dois casos.
    if (!host) return { result: 'unknown' as MailboxResult, reason: undefined as string | undefined, method: null };
    return { ...(await verifyMailbox(o.email, host, { timeoutMs: 12000 })), method: 'smtp' as const };
  });

  for (const o of candidates) {
    const r = boxMap.get(o);
    if (!r) continue;
    o.smtpChecked = true;
    o.mailbox = r.result;
    o.method = r.method;
    if (r.result === 'not_found') {
      o.status = 'mailbox_not_found';
      o.isValid = false;
      o.reason = 'caixa_inexistente';
    } else if (r.result === 'catch_all') {
      o.status = 'catch_all';
      o.reason = 'catch_all';
    } else if (r.result === 'unknown') {
      o.status = 'unknown';
      o.reason = (r as any).reason === 'port25_blocked' ? 'smtp_indisponivel' : 'caixa_indeterminada';
    }
    // 'exists' → mantém status 'valid'
  }
  return outcomes;
}
