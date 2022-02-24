import { join } from 'path'
import { errorResponse500 } from './error'

const ui = 939_111
const daemon = 135_612

const defaultCounts = {
  ui,
  daemon,
  total: ui + daemon,
}

let _db = null

async function initDb() {
  const { Low, JSONFile } = await import('lowdb')
  const file = join('persist', 'counters.json')
  const adapter = new JSONFile(file)
  return new Low(adapter)
}

async function getDb() {
  if (!_db) {
    _db = await initDb()
  }
  return _db
}

export async function getCounts() {
  try {
    const db = await getDb()
    await db.read()
    return {
      status: 200,
      data: db.data || defaultCounts,
    }
  } catch (e) {
    return errorResponse500
  }
}

export async function counterMiddleware(req, res, next) {
  const key = req.url.replace('/', '')
  let db = null

  try {
    db = await getDb()
    await db.read()
  } catch (e) {
    next()
    return
  }

  db.data = db.data || defaultCounts

  // Current value
  const val = db.data[key] || 0

  // Increment key
  db.data[key] = val + 1
  // Increment grand total
  db.data.total += 1

  // Increment category total
  if (key.includes('UI')) {
    db.data.ui += 1
  } else if (key.includes('Sia')) {
    db.data.daemon += 1
  }

  await db.write()

  next()
}
