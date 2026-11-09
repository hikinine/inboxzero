// golive — compartilhamento de tela por sala, sem login.
// Mídia vai P2P via WebRTC; este servidor só serve a página e faz a sinalização
// (SSE para receber, POST para enviar). Estado só em memória.
import { createHmac, randomBytes } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOSTNAME ?? '0.0.0.0'
const PUBLIC = join(import.meta.dirname, 'public')
const ROOM_RE = /^[a-z0-9]{2,16}(-[a-z0-9]{2,16}){0,4}$/
const PEER_RE = /^[a-zA-Z0-9]{8,40}$/
// TURN (coturn com --use-auth-secret): credencial = HMAC-SHA1(TURN_SECRET, "<expira>:golive").
const TURN_SECRET = process.env.TURN_SECRET
const TURN_HOST = process.env.TURN_HOST
const STUN = { urls: ['stun:stun.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] }

function iceServers() {
  if (!TURN_SECRET || !TURN_HOST) return { iceServers: [STUN] }
  // Usuário único por pessoa: a cota do coturn (--user-quota) vale por usuário.
  const username = `${Math.floor(Date.now() / 1000) + 12 * 3600}:${randomBytes(6).toString('hex')}`
  const credential = createHmac('sha1', TURN_SECRET).update(username).digest('base64')
  const urls = [`turn:${TURN_HOST}:3479?transport=udp`, `turn:${TURN_HOST}:3479?transport=tcp`, `turns:${TURN_HOST}:443?transport=tcp`]
  return { iceServers: [STUN, { urls, username, credential }] }
}

// Até MAX_SHARERS pessoas compartilham ao mesmo tempo; a próxima substitui quem está há mais tempo.
const MAX_SHARERS = 2
/** @type {Map<string, { sharers: string[], peers: Map<string, import('node:http').ServerResponse> }>} */
const rooms = new Map()

const indexHtml = await readFile(join(PUBLIC, 'index.html'))

function randomRoom() {
  const abc = 'abcdefghijkmnopqrstuvwxyz'
  const part = (n) => Array.from({ length: n }, () => abc[Math.floor(Math.random() * abc.length)]).join('')
  return `${part(3)}-${part(4)}-${part(3)}`
}

function send(res, event, data) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

function broadcast(room, event, data, except) {
  for (const [id, res] of room.peers) if (id !== except) send(res, event, data)
}

function leave(roomId, peerId) {
  const room = rooms.get(roomId)
  if (!room) return
  room.peers.delete(peerId)
  if (room.sharers.includes(peerId)) {
    room.sharers = room.sharers.filter((p) => p !== peerId)
    broadcast(room, 'sharers', { sharers: room.sharers })
  }
  broadcast(room, 'leave', { peer: peerId })
  if (room.peers.size === 0) rooms.delete(roomId)
}

async function readJson(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > 64_000) throw new Error('too large')
  }
  return JSON.parse(body)
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://x')
  const parts = url.pathname.split('/').filter(Boolean)

  if (url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
    return
  }

  if (url.pathname === '/api/ice') {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }).end(JSON.stringify(iceServers()))
    return
  }

  if (url.pathname === '/') {
    res.writeHead(302, { location: `/${randomRoom()}`, 'cache-control': 'no-store' }).end()
    return
  }

  // GET /:room → página
  if (req.method === 'GET' && parts.length === 1 && ROOM_RE.test(parts[0])) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' }).end(indexHtml)
    return
  }

  // /api/:room/events?peer=ID (SSE) e /api/:room/signal (POST)
  if (parts[0] === 'api' && parts.length === 3 && ROOM_RE.test(parts[1])) {
    const roomId = parts[1]

    if (req.method === 'GET' && parts[2] === 'events') {
      const peerId = url.searchParams.get('peer') ?? ''
      if (!PEER_RE.test(peerId)) return void res.writeHead(400).end()

      let room = rooms.get(roomId)
      if (!room) {
        room = { sharers: [], peers: new Map() }
        rooms.set(roomId, room)
      }
      // Reconexão do mesmo peer: troca a conexão antiga sem anunciar saída.
      room.peers.get(peerId)?.end()

      res.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
        'x-accel-buffering': 'no',
      })
      res.flushHeaders()
      room.peers.set(peerId, res)
      send(res, 'hello', { sharers: room.sharers, peers: [...room.peers.keys()].filter((p) => p !== peerId) })
      broadcast(room, 'join', { peer: peerId }, peerId)

      const ping = setInterval(() => res.write(': ping\n\n'), 20_000)
      req.on('close', () => {
        clearInterval(ping)
        if (rooms.get(roomId)?.peers.get(peerId) === res) leave(roomId, peerId)
      })
      return
    }

    if (req.method === 'POST' && parts[2] === 'signal') {
      let msg
      try {
        msg = await readJson(req)
      } catch {
        return void res.writeHead(400).end()
      }
      const room = rooms.get(roomId)
      const from = msg?.from
      if (!room || typeof from !== 'string' || !room.peers.has(from)) return void res.writeHead(409).end()

      if (msg.type === 'share') {
        if (!room.sharers.includes(from)) {
          room.sharers = [...room.sharers, from].slice(-MAX_SHARERS)
        }
        broadcast(room, 'sharers', { sharers: room.sharers })
      } else if (msg.type === 'unshare') {
        if (room.sharers.includes(from)) {
          room.sharers = room.sharers.filter((p) => p !== from)
          broadcast(room, 'sharers', { sharers: room.sharers })
        }
      } else if (msg.type === 'draw') {
        // Canetinha: repassa o pedaço do traço (desenhado sobre a tela de `t`) pra todo mundo da sala.
        const pts = Array.isArray(msg.p) ? msg.p.slice(0, 2000) : []
        if (
          !Number.isInteger(msg.s) ||
          typeof msg.t !== 'string' ||
          !PEER_RE.test(msg.t) ||
          !pts.every((pt) => Array.isArray(pt) && pt.length === 2 && pt.every(Number.isFinite))
        ) {
          return void res.writeHead(400).end()
        }
        broadcast(room, 'draw', { from, t: msg.t, s: msg.s, p: pts, end: !!msg.end }, from)
      } else if (msg.type === 'signal') {
        const target = room.peers.get(msg.to)
        if (target) send(target, 'signal', { from, data: msg.data })
      }
      res.writeHead(204).end()
      return
    }
  }

  res.writeHead(404, { 'content-type': 'text/plain' }).end('not found')
})

server.requestTimeout = 0
server.listen(PORT, HOST, () => console.log(`golive em http://${HOST}:${PORT}`))
