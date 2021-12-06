const storage = require('node-persist')

let initialized = false

async function initStorage() {
  if (initialized) {
    return
  }
  await storage.init({ dir: 'persist', logging: true })
  initialized = true
}

module.exports = { storage, initStorage }
