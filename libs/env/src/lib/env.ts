const dev = process.env.NODE_ENV !== 'production'

const current = process.env.SIA_CURRENT || '1.5.5'
const rc = process.env.SIA_RC || '1.5.5'

// Used to bind vhosts and route requests on the assets server.
const hostnames = {
  app: dev ? 'localhost' : 'sia.tech',
  api: dev ? 'api.localhost' : 'api.sia.tech',
}

// Used to start the servers listening on port, and for links in dev mode.
// NOTE: values are currently hardcoded in other places too.
const ports = {
  app: '3001',
  api: '3002',
}

// Used to generate links in the frontend apps.
const hosts = {
  app: dev ? `${hostnames.app}:${ports.app}` : hostnames.app,
  api: dev ? `${hostnames.api}:${ports.api}` : hostnames.api,
}

const siaVersion = {
  current,
  rc,
}

export { hosts, ports, hostnames, siaVersion, dev }
