// NOTE: File must be .js so that `downloadsCounterMiddleware` can be imported
// into server.js.

const { storage, initStorage } = require('../storage')

const keys = {
  siaui: 'siaui',
  siad: 'siad',
}

async function downloadCountersMiddleware(req, res, next) {
  await initStorage()

  if (req.url.includes('UI')) {
    console.log('Incrementing siaui counter')
    let siauiCount = await storage.getItem(keys.siaui)
    storage.setItem(keys.siaui, siauiCount + 1)
  } else if (req.url.includes('Sia')) {
    console.log('Incrementing siad counter')
    let siadCount = await storage.getItem(keys.siad)
    await storage.setItem(keys.siad, siadCount + 1)
  }

  next()
}

async function initDownloadCounters() {
  await initStorage()

  let siauiCount = await storage.getItem(keys.siaui)
  if (!siauiCount) {
    storage.setItem(keys.siaui, 925283)
  }
  let siadCount = await storage.getItem(keys.siad)
  if (!siadCount) {
    storage.setItem(keys.siad, 134294)
  }

  siauiCount = await storage.getItem(keys.siaui)
  siadCount = await storage.getItem(keys.siad)

  console.log('Download counters initialized', {
    siaui: siauiCount,
    siad: siadCount,
  })
}

async function getDownloadCounts() {
  await initStorage()

  const siadCount = await storage.getItem(keys.siad)
  const siauiCount = await storage.getItem(keys.siaui)

  const result = {
    sia: siadCount || 0,
    siaui: siauiCount || 0,
    total: (siadCount || 0) + (siauiCount || 0),
  }

  return {
    status: 200,
    data: result,
  }
}

module.exports = {
  keys,
  downloadCountersMiddleware,
  getDownloadCounts,
  initDownloadCounters,
}
