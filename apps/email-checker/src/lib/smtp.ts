import net from 'node:net';

// Verificação de caixa via SMTP (RCPT TO). Funciona quando a porta 25 de saída está liberada
// e o provedor revela existência (Gmail/Outlook revelam; catch-all não).

export type MailboxResult = 'exists' | 'not_found' | 'catch_all' | 'unknown';

const HELO_HOST = process.env.SMTP_HELO_HOST ?? 'email-checker.codehall.io';
const MAIL_FROM = process.env.SMTP_MAIL_FROM ?? 'verify@email-checker.codehall.io';

function isAccept(code: number): boolean {
  return code === 250 || code === 251;
}
function isReject(code: number): boolean {
  // 550/551/553/554 = mailbox inexistente/rejeitada; 501/500 = endereço inválido.
  return code === 550 || code === 551 || code === 553 || code === 554 || code === 501 || code === 500;
}

// Lê uma resposta SMTP completa (trata multi-linha "250-..." até "250 ...").
function readReply(sock: net.Socket, timeoutMs: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let buf = '';
    const onData = (d: Buffer) => {
      buf += d.toString('utf8');
      const lines = buf.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve(Number.parseInt(last.slice(0, 3), 10));
      }
    };
    const onErr = (e: Error) => {
      cleanup();
      reject(e);
    };
    const onTimeout = () => {
      cleanup();
      reject(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' }));
    };
    const timer = setTimeout(onTimeout, timeoutMs);
    const cleanup = () => {
      clearTimeout(timer);
      sock.removeListener('data', onData);
      sock.removeListener('error', onErr);
    };
    sock.on('data', onData);
    sock.once('error', onErr);
  });
}

function send(sock: net.Socket, cmd: string): void {
  sock.write(`${cmd}\r\n`);
}

// Verifica uma caixa. Faz duas provas: o endereço real + um aleatório (detecção de catch-all).
export async function verifyMailbox(
  email: string,
  mxHost: string,
  opts: { timeoutMs?: number } = {},
): Promise<{ result: MailboxResult; code: number | null; reason?: string }> {
  const timeoutMs = opts.timeoutMs ?? 8000;
  const domain = email.split('@')[1];
  const randomAddr = `no-existe-${Math.random().toString(36).slice(2, 12)}@${domain}`;

  return new Promise((resolve) => {
    let settled = false;
    const done = (r: { result: MailboxResult; code: number | null; reason?: string }) => {
      if (settled) return;
      settled = true;
      try {
        sock.end('QUIT\r\n');
      } catch {}
      try {
        sock.destroy();
      } catch {}
      resolve(r);
    };

    const sock = net.createConnection({ host: mxHost, port: 25 });
    sock.setTimeout(timeoutMs);
    sock.on('timeout', () => done({ result: 'unknown', code: null, reason: 'timeout' }));
    sock.on('error', (e: any) => {
      const code = e?.code;
      const reason = code === 'ECONNREFUSED' || code === 'ETIMEDOUT' || code === 'EHOSTUNREACH' || code === 'ENETUNREACH' ? 'port25_blocked' : code || 'conn_error';
      done({ result: 'unknown', code: null, reason });
    });

    (async () => {
      try {
        await readReply(sock, timeoutMs); // saudação 220
        send(sock, `EHLO ${HELO_HOST}`);
        await readReply(sock, timeoutMs);
        send(sock, `MAIL FROM:<${MAIL_FROM}>`);
        const fromCode = await readReply(sock, timeoutMs);
        if (!isAccept(fromCode)) return done({ result: 'unknown', code: fromCode, reason: 'mail_from_rejeitado' });

        send(sock, `RCPT TO:<${email}>`);
        const realCode = await readReply(sock, timeoutMs);

        if (isReject(realCode)) return done({ result: 'not_found', code: realCode });
        if (!isAccept(realCode)) return done({ result: 'unknown', code: realCode, reason: 'greylist_ou_temp' });

        // Real foi aceito → testa catch-all com endereço aleatório.
        send(sock, `RCPT TO:<${randomAddr}>`);
        let randomCode: number;
        try {
          randomCode = await readReply(sock, timeoutMs);
        } catch {
          return done({ result: 'exists', code: realCode }); // aceitou o real; catch-all indeterminado
        }
        if (isAccept(randomCode)) return done({ result: 'catch_all', code: realCode });
        return done({ result: 'exists', code: realCode });
      } catch (e: any) {
        done({ result: 'unknown', code: null, reason: e?.code || 'erro' });
      }
    })();
  });
}
