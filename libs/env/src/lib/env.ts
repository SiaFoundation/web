export function isDev() {
  return process.env.NODE_ENV !== 'production'
}

const current = process.env.SIA_CURRENT || '1.5.5'
const rc = process.env.SIA_RC || '1.5.5'

// Used to bind vhosts and route requests on the assets server.
export function getHostnames() {
  return {
    app: process.env.HOST_APP || (isDev() ? 'localhost' : 'sia.tech'),
    api: process.env.HOST_API || (isDev() ? 'api.localhost' : 'api.sia.tech'),
  }
}

// Used to start the servers listening on port, and for links in dev mode.
// NOTE: values are currently hardcoded in other places too.
export function getPorts() {
  return {
    website: '3001',
    assets: '3002',
  }
}

// Used to generate links in the frontend apps.
export function getHosts() {
  const hostnames = getHostnames()
  const ports = getPorts()

  return {
    app: isDev() ? `${hostnames.app}:${ports.website}` : hostnames.app,
    api: isDev() ? `${hostnames.api}:${ports.assets}` : hostnames.api,
  }
}

export function getSiaVersion() {
  return {
    current,
    rc,
  }
}
