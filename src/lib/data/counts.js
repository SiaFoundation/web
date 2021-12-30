import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { errorResponse500 } from '../error.js'

const siaui = 925283
const siad = 134294

const defaultCounts = {
  siaui,
  siad,
  total: siaui + siad,
}

let _db = null

function initDb() {
  // const __dirname = dirname((import.meta.url))
  const file = join('persist', 'counters.json')
  const adapter = new JSONFile(file)
  return new Low(adapter)
}

function getDb() {
  if (!_db) {
    _db = initDb()
  }
  return _db
}

export async function getCounts() {
  const db = getDb()

  try {
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
  const key = req.url

  const db = getDb()

  await db.read()

  db.data = db.data || defaultCounts

  const val = db.data[key] || 0

  db.data[key] = val + 1
  db.data.total += 1

  if (key.includes('UI')) {
    db.data.siaui += 1
  } else if (key.includes('Sia')) {
    db.data.siad += 1
  }

  console.log(db.data)

  await db.write()

  next()
}
