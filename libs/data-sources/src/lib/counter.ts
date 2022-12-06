import { Low } from 'lowdb'
import { join } from 'path'
import { RequestHandler } from 'express'
import { buildErrorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

const ui = 939_111
const daemon = 135_612

const defaultCounts = {
  ui,
  daemon,
  total: ui + daemon,
}

type DB = {
  ui: number
  daemon: number
  total: number
  [key: string]: number
}

let _db: Low<DB> | null = null

async function initDb(): Promise<Low<DB>> {
  const { Low, JSONFile } = await import('lowdb')
  const file = join('persist', 'counters.json')
  const adapter = new JSONFile<DB>(file)
  return new Low<DB>(adapter)
}

async function getDb() {
  if (!_db) {
    _db = await initDb()
  }
  return _db
}

export async function getCounts(): AsyncDataSourceResponse<DB> {
  try {
    const db = await getDb()
    await db.read()
    return {
      status: 200,
      data: db.data || defaultCounts,
    }
  } catch (e) {
    return buildErrorResponse500()
  }
}

export const counterMiddleware: RequestHandler = async (req, res, next) => {
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
