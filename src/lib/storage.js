import storage from 'node-persist'

let initialized = false

export async function initStorage() {
  if (initialized) {
    return
  }
  await storage.init({ dir: 'persist', logging: true })
  initialized = true
}

export { storage }
