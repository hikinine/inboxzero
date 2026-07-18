import type { MailboxResult } from './smtp';

// Verificação de existência de caixa CONSCIENTE DO PROVEDOR (fingerprint do MX → rotina específica).
// A joia é a Microsoft 365: o endpoint público GetCredentialType (usado pela própria tela de login
// do Office) revela se a caixa existe no tenant — mesmo em domínio catch-all, sem SMTP.

export type Provider = 'microsoft' | 'google' | 'other';

// Identifica o provedor pelo host do MX e devolve um rótulo amigável (estilo ZeroBounce).
export function detectProvider(mxHost: string | null | undefined): { provider: Provider; label: string } {
  const h = (mxHost || '').toLowerCase();
  if (!h) return { provider: 'other', label: 'desconhecido' };
  if (h.includes('protection.outlook.com') || h.endsWith('.outlook.com') || h.includes('office365'))
    return { provider: 'microsoft', label: 'microsoft' };
  if (h.includes('gmail-smtp-in')) return { provider: 'google', label: 'gmail' };
  if (h.includes('google.com') || h.includes('googlemail.com') || h.includes('aspmx'))
    return { provider: 'google', label: 'g-suite' };
  if (h.includes('zoho')) return { provider: 'other', label: 'zoho' };
  if (h.includes('secureserver.net')) return { provider: 'other', label: 'godaddy' };
  if (h.includes('mimecast')) return { provider: 'other', label: 'mimecast' };
  if (h.includes('pphosted') || h.includes('proofpoint')) return { provider: 'other', label: 'proofpoint' };
  if (h.includes('mx.yandex') || h.includes('yandex')) return { provider: 'other', label: 'yandex' };
  const parts = h.replace(/\.$/, '').split('.');
  return { provider: 'other', label: parts.slice(-2).join('.') };
}

// Cache (6h) — evita rebater o endpoint e reduz throttle.
const msCache = new Map<string, { r: MailboxResult; at: number }>();
const MS_TTL = 6 * 60 * 60 * 1000;

// Microsoft 365 / Entra: existe a caixa? (login.microsoftonline.com/common/GetCredentialType)
// IfExistsResult: 0 = existe · 1 = não existe · 5/6/throttle = indeterminado.
export async function checkMicrosoft365(email: string, timeoutMs = 6000): Promise<MailboxResult> {
  const key = email.toLowerCase();
  const cached = msCache.get(key);
  if (cached && Date.now() - cached.at < MS_TTL) return cached.r;

  let result: MailboxResult = 'unknown';
  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);
    const res = await fetch('https://login.microsoftonline.com/common/GetCredentialType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      },
      body: JSON.stringify({ Username: email }),
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const j: any = await res.json();
      const throttled = typeof j?.ThrottleStatus === 'number' && j.ThrottleStatus !== 0;
      const ife = j?.IfExistsResult;
      if (throttled) result = 'unknown';
      else if (ife === 0) result = 'exists';
      else if (ife === 1) result = 'not_found';
      else result = 'unknown'; // 5 = federado/outro IdP, 6 = throttle, etc.
    }
  } catch {
    result = 'unknown';
  }
  msCache.set(key, { r: result, at: Date.now() });
  return result;
}
