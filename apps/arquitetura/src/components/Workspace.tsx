'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Block =
  | { type: 'text'; text: string }
  | { type: 'attachment'; id: string; name: string; mediaType: string }
  | { type: 'mockup'; version: number };
type Message = { id: string; role: 'user' | 'assistant'; blocks: Block[] };
type Mockup = { version: number; slug: string };
type ProjectSummary = { id: string; title: string; updatedAt: string; versions: number };
type Project = { id: string; title: string; generating: boolean; mockups: Mockup[]; messages: Message[] };
type Pending = { id: string; name: string; mediaType: string; preview?: string; uploading: boolean; error?: string };
type Live = { text: string; status: string; htmlChars: number };

const SUGGESTIONS = [
  'Quero montar a maquete da minha casa. Vou mandar o croqui e as fotos.',
  'Tenho a planta da casa em PDF e quero planejar uma ampliação.',
  'Quero ver como ficaria integrar a sala com a cozinha.',
];

export default function Workspace({ projectId }: { projectId?: string }) {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loadError, setLoadError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<'chat' | 'maquete'>('chat');
  const [version, setVersion] = useState<number | null>(null);
  const [live, setLive] = useState<Live | null>(null);
  const [pendingUser, setPendingUser] = useState<Message | null>(null);
  const [chatError, setChatError] = useState('');

  const loadProjects = useCallback(async () => {
    const res = await fetch('/api/projects');
    if (res.ok) setProjects(await res.json());
  }, []);

  const loadProject = useCallback(async (id: string) => {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) {
      setLoadError(res.status === 404 ? 'Projeto não encontrado.' : 'Não deu para abrir o projeto.');
      return null;
    }
    const data: Project = await res.json();
    setProject(data);
    setLoadError('');
    return data;
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (!projectId) return;
    loadProject(projectId).then((p) => {
      if (p?.mockups.length) setVersion(p.mockups[p.mockups.length - 1].version);
    });
  }, [projectId, loadProject]);

  // Se o projeto foi aberto no meio de uma geração (outra aba, recarregou), acompanha até terminar.
  useEffect(() => {
    if (!project?.generating || live) return;
    const t = setInterval(async () => {
      const p = await loadProject(project.id);
      if (p && !p.generating) {
        if (p.mockups.length) setVersion(p.mockups[p.mockups.length - 1].version);
        loadProjects();
      }
    }, 4000);
    return () => clearInterval(t);
  }, [project?.generating, project?.id, live, loadProject, loadProjects]);

  async function newProject() {
    const res = await fetch('/api/projects', { method: 'POST' });
    if (!res.ok) return;
    const { id } = await res.json();
    window.location.href = `/p/${id}`;
  }

  async function send(text: string, attachments: Pending[]) {
    if (!project) return;
    setChatError('');
    const blocks: Block[] = [
      ...attachments.map((a) => ({ type: 'attachment' as const, id: a.id, name: a.name, mediaType: a.mediaType })),
      ...(text ? [{ type: 'text' as const, text }] : []),
    ];
    setPendingUser({ id: 'pending', role: 'user', blocks });
    setLive({ text: '', status: 'Lendo…', htmlChars: 0 });

    let res: Response;
    try {
      res = await fetch(`/api/projects/${project.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, attachmentIds: attachments.map((a) => a.id) }),
      });
    } catch {
      setChatError('Sem conexão com o servidor. Tente de novo.');
      setLive(null);
      setPendingUser(null);
      return false;
    }
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      setChatError(data.error ?? 'Não deu para enviar. Tente de novo.');
      setLive(null);
      setPendingUser(null);
      return false;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    let newVersion: number | null = null;
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl = buf.indexOf('\n');
        while (nl !== -1) {
          const line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          nl = buf.indexOf('\n');
          if (!line.trim()) continue;
          const ev = JSON.parse(line);
          if (ev.t === 'status') {
            const label = { thinking: 'Pensando…', writing: 'Escrevendo…', building: 'Salvando a maquete…' }[
              ev.s as string
            ];
            setLive((l) => (l ? { ...l, status: label ?? l.status } : l));
          } else if (ev.t === 'text') {
            setLive((l) => (l ? { ...l, text: ev.v } : l));
          } else if (ev.t === 'html') {
            setLive((l) => (l ? { ...l, htmlChars: ev.n, status: 'Montando a maquete…' } : l));
          } else if (ev.t === 'done') {
            if (ev.mockup) newVersion = ev.mockup.version;
          } else if (ev.t === 'error') {
            setChatError(ev.msg);
          }
        }
      }
    } catch {
      setChatError('A conexão caiu, mas a resposta continua sendo gerada. Ela aparece aqui quando terminar.');
    }

    const p = await loadProject(project.id);
    setLive(null);
    setPendingUser(null);
    if (newVersion !== null) {
      setVersion(newVersion);
      setTab('maquete');
    } else if (p?.mockups.length && version === null) {
      setVersion(p.mockups[p.mockups.length - 1].version);
    }
    loadProjects();
    return true;
  }

  async function rename() {
    if (!project) return;
    const title = window.prompt('Nome do projeto', project.title);
    if (!title?.trim()) return;
    await fetch(`/api/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setProject({ ...project, title: title.trim() });
    loadProjects();
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  const mockup = project?.mockups.find((m) => m.version === version) ?? null;
  const busy = live !== null || !!project?.generating;

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`} data-tab={tab}>
      <aside className="sidebar">
        <div className="sidebar-head">
          <a className="brand" href="/">
            <img className="brand-mark" src="/icon.svg" alt="" />
            <span>Arquitetura</span>
          </a>
          <button className="icon-btn only-mobile" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
            ✕
          </button>
        </div>
        <button className="btn primary block" onClick={newProject}>
          + Novo projeto
        </button>
        <nav className="project-list" aria-label="Projetos">
          {projects.length === 0 && <p className="muted small">Nenhum projeto ainda.</p>}
          {projects.map((p) => (
            <a key={p.id} href={`/p/${p.id}`} className={`project-item ${p.id === projectId ? 'active' : ''}`}>
              <span className="project-title">{p.title}</span>
              <span className="project-meta">
                {p.versions > 0 ? `${p.versions} ${p.versions === 1 ? 'versão' : 'versões'}` : 'sem maquete'}
              </span>
            </a>
          ))}
        </nav>
        <button className="btn ghost block" onClick={logout}>
          Sair
        </button>
      </aside>
      <div className="scrim" onClick={() => setSidebarOpen(false)} />

      <main className="main">
        <header className="topbar">
          <button className="icon-btn only-mobile" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            ☰
          </button>
          <h1 className="topbar-title" title={project?.title}>
            {project ? project.title : 'Arquitetura'}
          </h1>
          {project && (
            <button className="icon-btn" onClick={rename} aria-label="Renomear projeto" title="Renomear">
              ✎
            </button>
          )}
          {project && (
            <div className="tabs only-mobile" role="tablist">
              <button role="tab" aria-selected={tab === 'chat'} onClick={() => setTab('chat')}>
                Chat
              </button>
              <button role="tab" aria-selected={tab === 'maquete'} onClick={() => setTab('maquete')}>
                Maquete{project.mockups.length ? ` v${version ?? ''}` : ''}
              </button>
            </div>
          )}
        </header>

        {!projectId ? (
          <Home onNew={newProject} hasProjects={projects.length > 0} />
        ) : loadError ? (
          <div className="center-note">{loadError}</div>
        ) : !project ? (
          <div className="center-note muted">Abrindo…</div>
        ) : (
          <div className="split">
            <Chat
              project={project}
              pendingUser={pendingUser}
              live={live}
              busy={busy}
              error={chatError}
              onSend={send}
              onShowVersion={(v) => {
                setVersion(v);
                setTab('maquete');
              }}
            />
            <Preview
              mockups={project.mockups}
              mockup={mockup}
              onVersion={setVersion}
              building={live !== null && live.htmlChars > 0}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function Home({ onNew, hasProjects }: { onNew: () => void; hasProjects: boolean }) {
  return (
    <div className="home">
      <div className="home-card">
        <h2>Monte a maquete 3D da sua casa</h2>
        <p className="muted">
          Mande o croqui ou a planta, as medidas que você sabe e fotos da fachada e do terreno. A maquete aparece ao
          lado do chat e você pede as mudanças conversando: ampliar, integrar ambientes, piscina, garagem, placas
          solares.
        </p>
        <button className="btn primary" onClick={onNew}>
          Começar um projeto
        </button>
        {hasProjects && <p className="muted small">Ou abra um projeto no menu.</p>}
      </div>
    </div>
  );
}

function Chat(props: {
  project: Project;
  pendingUser: Message | null;
  live: Live | null;
  busy: boolean;
  error: string;
  onSend: (text: string, attachments: Pending[]) => Promise<boolean | undefined>;
  onShowVersion: (v: number) => void;
}) {
  const { project, pendingUser, live, busy, error, onSend, onShowVersion } = props;
  const [text, setText] = useState('');
  const [files, setFiles] = useState<Pending[]>([]);
  const [dragging, setDragging] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const stick = useRef(true);

  const messages = pendingUser ? [...project.messages, pendingUser] : project.messages;

  useEffect(() => {
    const el = listRef.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [messages.length, live?.text, live?.status]);

  async function addFiles(list: FileList | File[]) {
    for (const file of Array.from(list).slice(0, 12)) {
      const tempId = `tmp-${Math.random().toString(36).slice(2)}`;
      const isPdf = file.type === 'application/pdf';
      setFiles((f) => [...f, { id: tempId, name: file.name, mediaType: file.type, uploading: true }]);
      try {
        const prepared = isPdf ? file : await shrinkImage(file);
        const preview = isPdf ? undefined : URL.createObjectURL(prepared);
        const form = new FormData();
        form.append('file', prepared, file.name);
        const res = await fetch(`/api/projects/${project.id}/attachments`, { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Falhou o envio.');
        setFiles((f) =>
          f.map((x) =>
            x.id === tempId ? { id: data.id, name: data.name, mediaType: data.mediaType, preview, uploading: false } : x,
          ),
        );
      } catch (e) {
        setFiles((f) =>
          f.map((x) => (x.id === tempId ? { ...x, uploading: false, error: (e as Error).message } : x)),
        );
      }
    }
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const ready = files.filter((f) => !f.uploading && !f.error);
    if (busy || files.some((f) => f.uploading) || (!text.trim() && ready.length === 0)) return;
    const msg = text.trim();
    setText('');
    setFiles([]);
    stick.current = true;
    const ok = await onSend(msg, ready);
    if (ok === false) {
      setText(msg);
      setFiles(ready);
    }
  }

  const empty = messages.length === 0;

  return (
    <section
      className={`chat ${dragging ? 'dragging' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
      }}
    >
      <div
        className="messages"
        ref={listRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
      >
        {empty && <Welcome onPick={(s) => setText(s)} />}
        {messages.map((m) => (
          <MessageView key={m.id} message={m} onShowVersion={onShowVersion} />
        ))}
        {live && (
          <div className="msg assistant">
            {live.text ? <AssistantText text={live.text} building={live.htmlChars} /> : null}
            <div className="live-status">
              <span className="dot" aria-hidden /> {live.status}
              {live.htmlChars > 0 && <span className="muted"> · {(live.htmlChars / 1000).toFixed(1)} mil caracteres</span>}
            </div>
          </div>
        )}
        {!live && project.generating && (
          <div className="msg assistant">
            <div className="live-status">
              <span className="dot" aria-hidden /> Respondendo… (a resposta aparece aqui quando terminar)
            </div>
          </div>
        )}
        {error && <div className="chat-error">{error}</div>}
      </div>

      <form className="composer" onSubmit={submit}>
        {files.length > 0 && (
          <div className="chips">
            {files.map((f) => (
              <div key={f.id} className={`chip ${f.error ? 'chip-error' : ''}`} title={f.error ?? f.name}>
                {f.preview ? <img src={f.preview} alt="" /> : <span className="chip-icon">PDF</span>}
                <span className="chip-name">{f.uploading ? 'Enviando…' : f.error ? f.error : f.name}</span>
                <button
                  type="button"
                  aria-label={`Remover ${f.name}`}
                  onClick={() => setFiles((all) => all.filter((x) => x.id !== f.id))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="composer-row">
          <button
            type="button"
            className="icon-btn attach"
            onClick={() => fileRef.current?.click()}
            aria-label="Anexar fotos ou PDF"
            title="Anexar fotos, planta ou PDF"
          >
            📎
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <textarea
            id="composer-text"
            value={text}
            placeholder={busy ? 'Aguarde a resposta…' : 'Descreva a casa ou peça uma mudança'}
            rows={1}
            onChange={(e) => setText(e.target.value)}
            onPaste={(e) => {
              const imgs = Array.from(e.clipboardData.files).filter((f) => f.type.startsWith('image/'));
              if (imgs.length) {
                e.preventDefault();
                addFiles(imgs);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <button className="btn primary send" type="submit" disabled={busy || files.some((f) => f.uploading)}>
            Enviar
          </button>
        </div>
        <p className="hint">Enter envia · Shift+Enter quebra linha · arraste ou cole fotos aqui</p>
      </form>
    </section>
  );
}

function Welcome({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="welcome">
      <h2>Do que eu preciso para montar a maquete</h2>
      <ul className="needs">
        <li>
          <strong>Croqui ou planta</strong>
          <span>Pode ser foto de um desenho à mão.</span>
        </li>
        <li>
          <strong>Medidas que você sabe</strong>
          <span>Frente, fundo e laterais do terreno, e o tamanho dos cômodos.</span>
        </li>
        <li>
          <strong>Fotos</strong>
          <span>Fachada, terreno, laterais e o que você quer mudar.</span>
        </li>
        <li>
          <strong>Matrícula ou IPTU</strong>
          <span>Opcional. Em PDF ou foto, para eu conferir as áreas.</span>
        </li>
      </ul>
      <p className="muted">Não precisa ter tudo. Com o croqui e uma ou duas medidas eu já monto a primeira versão.</p>
      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" className="suggestion" onClick={() => onPick(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageView({ message, onShowVersion }: { message: Message; onShowVersion: (v: number) => void }) {
  const files = message.blocks.filter((b) => b.type === 'attachment') as Extract<Block, { type: 'attachment' }>[];
  if (message.role === 'user') {
    const text = message.blocks
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('\n');
    return (
      <div className="msg user">
        {files.length > 0 && (
          <div className="msg-files">
            {files.map((f) =>
              f.mediaType.startsWith('image/') ? (
                <a key={f.id} href={`/api/attachments/${f.id}`} target="_blank" rel="noreferrer">
                  <img src={f.id.startsWith('tmp-') ? undefined : `/api/attachments/${f.id}`} alt={f.name} />
                </a>
              ) : (
                <a key={f.id} className="file-pill" href={`/api/attachments/${f.id}`} target="_blank" rel="noreferrer">
                  PDF · {f.name}
                </a>
              ),
            )}
          </div>
        )}
        {text && <div className="bubble">{text}</div>}
      </div>
    );
  }
  return (
    <div className="msg assistant">
      {message.blocks.map((b, i) =>
        b.type === 'text' ? (
          <AssistantText key={i} text={b.text} />
        ) : b.type === 'mockup' ? (
          <button key={i} type="button" className="version-card" onClick={() => onShowVersion(b.version)}>
            <span className="version-badge">v{b.version}</span>
            <span>
              <strong>Maquete versão {b.version}</strong>
              <span className="muted small">Abrir ao lado</span>
            </span>
          </button>
        ) : null,
      )}
    </div>
  );
}

function AssistantText({ text, building }: { text: string; building?: number }) {
  const parts = text.split('[[maquete]]');
  return (
    <>
      {parts.map((p, i) => (
        <div key={i}>
          {p.trim() && (
            <div className="md">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{p}</ReactMarkdown>
            </div>
          )}
          {i < parts.length - 1 && (
            <div className="version-card building">
              <span className="version-badge">3D</span>
              <span>
                <strong>Montando a maquete</strong>
                <span className="muted small">{building ? `${(building / 1000).toFixed(1)} mil caracteres` : '…'}</span>
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

function Preview(props: {
  mockups: Mockup[];
  mockup: Mockup | null;
  onVersion: (v: number) => void;
  building: boolean;
}) {
  const { mockups, mockup, onVersion, building } = props;
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    if (!mockup) return;
    const url = `${window.location.origin}/m/${mockup.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copie o link', url);
    }
  }

  return (
    <section className="preview">
      <div className="preview-bar">
        {mockups.length > 0 ? (
          <>
            <label htmlFor="version" className="sr-only">
              Versão
            </label>
            <select id="version" value={mockup?.version ?? ''} onChange={(e) => onVersion(Number(e.target.value))}>
              {[...mockups].reverse().map((m) => (
                <option key={m.version} value={m.version}>
                  Versão {m.version}
                </option>
              ))}
            </select>
            {mockup && (
              <div className="preview-actions">
                <a className="btn ghost sm" href={`/m/${mockup.slug}`} target="_blank" rel="noreferrer">
                  Abrir
                </a>
                <button className="btn ghost sm" onClick={copyLink}>
                  {copied ? 'Link copiado' : 'Copiar link'}
                </button>
                <a className="btn ghost sm" href={`/m/${mockup.slug}?download=1`}>
                  Baixar
                </a>
              </div>
            )}
          </>
        ) : (
          <span className="muted small">Maquete</span>
        )}
      </div>
      <div className="preview-frame">
        {mockup ? (
          <iframe
            key={mockup.slug}
            src={`/m/${mockup.slug}`}
            title={`Maquete versão ${mockup.version}`}
            sandbox="allow-scripts allow-popups"
          />
        ) : (
          <div className="preview-empty">
            <div className="iso" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <p>{building ? 'Montando a primeira versão…' : 'A maquete 3D aparece aqui.'}</p>
            <p className="muted small">Arraste para girar, pinça ou roda do mouse para zoom.</p>
          </div>
        )}
        {building && mockup && <div className="preview-overlay">Montando uma nova versão…</div>}
      </div>
    </section>
  );
}

/** Reduz fotos do celular para no máximo 1800 px e JPEG 0,85: cabe no limite da API e o upload fica rápido. */
async function shrinkImage(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  const max = 1800;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file;
  } catch {
    return file;
  }
}
