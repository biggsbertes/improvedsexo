import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'
import helmet from 'helmet'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8080

// Confia nos cabeçalhos do proxy (Nginx)
app.set('trust proxy', 1)

const distPath = path.join(__dirname, 'dist')

// Segurança básica
app.use(
  helmet({
    contentSecurityPolicy: false, // SPA com scripts inline do Vite podem quebrar com CSP estrito sem ajustes
  })
)

// Compressão gzip
app.use(compression())

// Arquivos estáticos (cache longo para assets versionados)
app.use(
  express.static(distPath, {
    etag: true,
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      // Não faça cache do index.html
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache')
      }
    },
  })
)

// Healthcheck simples
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

// (fallback do SPA será registrado após as rotas /api)

// ===== SQLite setup e API mínima =====
let db
async function initDb() {
  db = await open({
    filename: process.env.SQLITE_PATH || path.join(__dirname, 'data.sqlite'),
    driver: sqlite3.Database,
  })
  await db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cpf TEXT NOT NULL,
      email TEXT NOT NULL,
      telephone TEXT NOT NULL,
      country TEXT,
      state TEXT,
      city TEXT,
      address TEXT,
      zipcode TEXT,
      merchant TEXT,
      product TEXT,
      provider TEXT,
      service TEXT,
      tracking TEXT UNIQUE,
      providerInfo1 TEXT,
      providerInfo2 TEXT,
      providerInfo3 TEXT,
      created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transactionId INTEGER UNIQUE,
      tracking TEXT,
      amount INTEGER,
      paymentMethod TEXT,
      status TEXT,
      customerName TEXT,
      customerEmail TEXT,
      externalId TEXT,
      secureId TEXT,
      secureUrl TEXT,
      created_at TEXT,
      updated_at TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `)
}

app.use(express.json({ limit: process.env.JSON_LIMIT || '500mb' }))
app.use(express.urlencoded({ extended: true, limit: process.env.JSON_LIMIT || '500mb' }))

// Trata erro de payload grande de forma amigável
app.use((err, _req, res, next) => {
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({ error: 'payload_too_large', max: process.env.JSON_LIMIT || '25mb' })
  }
  next(err)
})

// Lista leads
app.get('/api/leads', async (_req, res) => {
  try {
    const rows = await db.all('SELECT * FROM leads ORDER BY datetime(created_at) DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'failed_list', details: String(err) })
  }
})

// Busca por tracking
app.get('/api/leads/by-tracking/:tracking', async (req, res) => {
  try {
    const row = await db.get('SELECT * FROM leads WHERE tracking = ?', req.params.tracking)
    if (!row) return res.status(404).json({ error: 'not_found' })
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: 'failed_get', details: String(err) })
  }
})

// Cria lead (idempotente por tracking)
app.post('/api/leads', async (req, res) => {
  const lead = req.body || {}
  const now = new Date().toISOString()
  try {
    const result = await db.run(
      `INSERT OR IGNORE INTO leads (
        name, cpf, email, telephone, country, state, city, address, zipcode, merchant, product, provider, service, tracking, providerInfo1, providerInfo2, providerInfo3, created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        lead.name, lead.cpf, lead.email, lead.telephone, lead.country, lead.state, lead.city, lead.address, lead.zipcode,
        lead.merchant, lead.product, lead.provider, lead.service, lead.tracking, lead.providerInfo1, lead.providerInfo2,
        lead.providerInfo3, lead.created_at || now,
      ]
    )
    const row = await db.get('SELECT * FROM leads WHERE tracking = ?', lead.tracking)
    if (result.changes && result.changes > 0) {
      return res.status(201).json(row)
    }
    return res.status(200).json(row)
  } catch (err) {
    res.status(500).json({ error: 'failed_create', details: String(err) })
  }
})

// Cria leads em lote (idempotente por tracking)
app.post('/api/leads/bulk', async (req, res) => {
  const leads = Array.isArray(req.body) ? req.body : []
  if (leads.length === 0) return res.status(400).json({ error: 'empty_payload' })
  const now = new Date().toISOString()
  try {
    await db.exec('BEGIN TRANSACTION')
    let inserted = 0
    for (const lead of leads) {
      const r = await db.run(
        `INSERT OR IGNORE INTO leads (
          name, cpf, email, telephone, country, state, city, address, zipcode, merchant, product, provider, service, tracking, providerInfo1, providerInfo2, providerInfo3, created_at
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          lead.name, lead.cpf, lead.email, lead.telephone, lead.country, lead.state, lead.city, lead.address, lead.zipcode,
          lead.merchant, lead.product, lead.provider, lead.service, lead.tracking, lead.providerInfo1, lead.providerInfo2,
          lead.providerInfo3, lead.created_at || now,
        ]
      )
      if (r.changes && r.changes > 0) inserted++
    }
    await db.exec('COMMIT')
    const trackings = leads.map(l => l.tracking).filter(Boolean)
    const placeholders = trackings.map(() => '?').join(',')
    const rows = trackings.length > 0
      ? await db.all(`SELECT * FROM leads WHERE tracking IN (${placeholders})`, trackings)
      : []
    return res.status(201).json({ items: rows, insertedCount: inserted, ignoredCount: leads.length - inserted })
  } catch (err) {
    await db.exec('ROLLBACK')
    res.status(500).json({ error: 'failed_bulk_create', details: String(err) })
  }
})

// Atualiza lead
app.put('/api/leads/:id', async (req, res) => {
  const id = Number(req.params.id)
  const lead = req.body || {}
  try {
    const existing = await db.get('SELECT * FROM leads WHERE id = ?', id)
    if (!existing) return res.status(404).json({ error: 'not_found' })
    await db.run(
      `UPDATE leads SET
        name = ?, cpf = ?, email = ?, telephone = ?, country = ?, state = ?, city = ?, address = ?, zipcode = ?,
        merchant = ?, product = ?, provider = ?, service = ?, tracking = ?, providerInfo1 = ?, providerInfo2 = ?, providerInfo3 = ?
       WHERE id = ?`,
      [
        lead.name, lead.cpf, lead.email, lead.telephone, lead.country, lead.state, lead.city, lead.address, lead.zipcode,
        lead.merchant, lead.product, lead.provider, lead.service, lead.tracking, lead.providerInfo1, lead.providerInfo2,
        lead.providerInfo3, id,
      ]
    )
    const updated = await db.get('SELECT * FROM leads WHERE id = ?', id)
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: 'failed_update', details: String(err) })
  }
})

// Deleta lead
app.delete('/api/leads/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.run('DELETE FROM leads WHERE id = ?', id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'failed_delete', details: String(err) })
  }
})

// Limpa todos os leads
app.delete('/api/leads', async (_req, res) => {
  try {
    await db.run('DELETE FROM leads')
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'failed_clear', details: String(err) })
  }
})

// ===== Orders API =====
// Lista pedidos
app.get('/api/orders', async (_req, res) => {
  try {
    const rows = await db.all('SELECT * FROM orders ORDER BY datetime(created_at) DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'failed_list', details: String(err) })
  }
})

// Busca pedido por transactionId
app.get('/api/orders/by-transaction/:transactionId', async (req, res) => {
  try {
    const txId = Number(req.params.transactionId)
    const row = await db.get('SELECT * FROM orders WHERE transactionId = ?', txId)
    if (!row) return res.status(404).json({ error: 'not_found' })
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: 'failed_get', details: String(err) })
  }
})

// Cria pedido
app.post('/api/orders', async (req, res) => {
  const order = req.body || {}
  const now = new Date().toISOString()
  try {
    const stmt = await db.run(
      `INSERT INTO orders (
        transactionId, tracking, amount, paymentMethod, status, customerName, customerEmail, externalId, secureId, secureUrl, created_at, updated_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(transactionId) DO UPDATE SET
        tracking=excluded.tracking,
        amount=excluded.amount,
        paymentMethod=excluded.paymentMethod,
        status=excluded.status,
        customerName=excluded.customerName,
        customerEmail=excluded.customerEmail,
        externalId=excluded.externalId,
        secureId=excluded.secureId,
        secureUrl=excluded.secureUrl,
        created_at=COALESCE(orders.created_at, excluded.created_at),
        updated_at=excluded.updated_at
      `,
      [
        order.transactionId,
        order.tracking,
        order.amount,
        order.paymentMethod,
        order.status,
        order.customerName,
        order.customerEmail,
        order.externalId,
        order.secureId,
        order.secureUrl,
        order.created_at || now,
        order.updated_at || now,
      ]
    )
    // Recupera pelo transactionId (único)
    const created = await db.get('SELECT * FROM orders WHERE transactionId = ?', order.transactionId)
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: 'failed_create', details: String(err) })
  }
})

// Atualiza pedido parcial por transactionId
app.put('/api/orders/by-transaction/:transactionId', async (req, res) => {
  const txId = Number(req.params.transactionId)
  const data = req.body || {}
  try {
    const existing = await db.get('SELECT * FROM orders WHERE transactionId = ?', txId)
    if (!existing) return res.status(404).json({ error: 'not_found' })
    const updatedAt = new Date().toISOString()
    const merged = { ...existing, ...data, updated_at: updatedAt }
    await db.run(
      `UPDATE orders SET
        tracking = ?, amount = ?, paymentMethod = ?, status = ?, customerName = ?, customerEmail = ?, externalId = ?, secureId = ?, secureUrl = ?, created_at = ?, updated_at = ?
       WHERE transactionId = ?`,
      [
        merged.tracking,
        merged.amount,
        merged.paymentMethod,
        merged.status,
        merged.customerName,
        merged.customerEmail,
        merged.externalId,
        merged.secureId,
        merged.secureUrl,
        merged.created_at,
        merged.updated_at,
        txId,
      ]
    )
    const row = await db.get('SELECT * FROM orders WHERE transactionId = ?', txId)
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: 'failed_update', details: String(err) })
  }
})

// Limpa todos os pedidos
app.delete('/api/orders', async (_req, res) => {
  try {
    await db.run('DELETE FROM orders')
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'failed_clear', details: String(err) })
  }
})

// ===== Settings & Auth =====
async function getSetting(key) {
  const row = await db.get('SELECT value FROM settings WHERE key = ?', key)
  return row ? row.value : undefined
}

async function setSetting(key, value) {
  await db.run('INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', key, value)
}

function hashPassword(password, salt) {
  const s = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, s, 64).toString('hex')
  return `${s}:${hash}`
}

function verifyPassword(password, stored) {
  if (!stored) return false
  const [s, h] = stored.split(':')
  const hash = crypto.scryptSync(password, s, 64).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(h, 'hex'), Buffer.from(hash, 'hex'))
}

// Read settings (mask secrets)
app.get('/api/settings', async (_req, res) => {
  try {
    const apiBase = 'https://api.novaera-pagamentos.com/api/v1/transactions'
    const sk = await getSetting('novaera_sk')
    const pk = await getSetting('novaera_pk')
    const hasPassword = Boolean(await getSetting('admin_password_hash'))
    const mask = (v) => (v ? `${v.slice(0, 2)}***${v.slice(-2)}` : '')
    res.json({
      payment: { apiBase: apiBase || '', skMasked: mask(sk || ''), pkMasked: mask(pk || '') },
      security: { hasPassword }
    })
  } catch (err) {
    res.status(500).json({ error: 'failed_get_settings', details: String(err) })
  }
})

// Update payment keys
app.put('/api/settings/payment', async (req, res) => {
  const { sk, pk } = req.body || {}
  try {
    if (typeof sk === 'string') await setSetting('novaera_sk', sk)
    if (typeof pk === 'string') await setSetting('novaera_pk', pk)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'failed_update_payment_settings', details: String(err) })
  }
})

// Update admin password
app.put('/api/settings/admin-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body || {}
  try {
    if (!newPassword || newPassword.length < 8) return res.status(400).json({ error: 'weak_password' })
    const stored = await getSetting('admin_password_hash')
    if (stored) {
      if (!oldPassword || !verifyPassword(oldPassword, stored)) return res.status(401).json({ error: 'invalid_old_password' })
    }
    const hashed = hashPassword(newPassword)
    await setSetting('admin_password_hash', hashed)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'failed_update_admin_password', details: String(err) })
  }
})

// Auth login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {}
  try {
    if (username !== 'admin') return res.status(401).json({ ok: false })
    const stored = await getSetting('admin_password_hash')
    if (stored) {
      const ok = verifyPassword(password || '', stored)
      return res.status(ok ? 200 : 401).json({ ok })
    }
    // fallback: default password when none set
    const DEFAULT_PASSWORD = 'S9p#V3m!bQ7@L2xZ'
    const ok = password === DEFAULT_PASSWORD
    return res.status(ok ? 200 : 401).json({ ok })
  } catch (err) {
    res.status(500).json({ error: 'failed_login', details: String(err) })
  }
})

// ===== Payments proxy (server-side secrets) =====
async function getPaymentAuthHeader() {
  const sk = await getSetting('novaera_sk')
  const pk = await getSetting('novaera_pk')
  if (!sk || !pk) throw new Error('payment_keys_missing')
  const token = Buffer.from(`${sk}:${pk}`).toString('base64')
  return `Basic ${token}`
}

async function getPaymentBaseUrl() {
  return 'https://api.novaera-pagamentos.com/api/v1/transactions'
}

app.post('/api/payments/charge', async (req, res) => {
  try {
    const base = await getPaymentBaseUrl()
    const auth = await getPaymentAuthHeader()
    const response = await fetch(base, {
      method: 'POST',
      headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {})
    })
    const json = await response.json()
    res.status(response.status).json(json)
  } catch (err) {
    res.status(500).json({ success: false, message: 'payment_proxy_error', details: String(err) })
  }
})

app.get('/api/payments/:id/status', async (req, res) => {
  try {
    const base = await getPaymentBaseUrl()
    const auth = await getPaymentAuthHeader()
    const url = `${base}/${encodeURIComponent(req.params.id)}`
    const response = await fetch(url, { method: 'GET', headers: { 'Authorization': auth, 'Content-Type': 'application/json' } })
    const json = await response.json()
    res.status(response.status).json(json)
  } catch (err) {
    res.status(500).json({ success: false, message: 'payment_proxy_error', details: String(err) })
  }
})
// Fallback para SPA (react-router) — use regex para capturar todas as rotas
app.get(/.*/, (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(path.join(distPath, 'index.html'))
})

// Inicializa DB e inicia servidor
initDb()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Servidor iniciado na porta ${port}`)
    })
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Erro ao iniciar banco de dados:', err)
    process.exit(1)
  })

