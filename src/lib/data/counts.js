const { join } = require('path')
const { errorResponse500 } = require('../error.js')

const siaui = 925283
const siad = 134294

const defaultCounts = {
  siaui,
  siad,
  total: siaui + siad,
}

let _db = null

async function initDb() {
  const { Low, JSONFile } = await import('lowdb')
  // const __dirname = dirname((import.meta.url))
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

async function getCounts() {
  const db = await getDb()

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

async function counterMiddleware(req, res, next) {
  const key = req.url

  const db = await getDb()

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

module.exports = {
  getCounts,
  counterMiddleware,
}
