import { busStateRoute } from '@siafoundation/renterd-types'

export const routes = {
  home: '/',
  buckets: {
    index: '/buckets',
    files: '/buckets/[bucket]/files/[path]',
    uploads: '/buckets/[bucket]/uploads',
  },
  config: {
    index: '/config',
    storage: '/config#storage',
    pricing: '/config#pricing',
    hosts: '/config#hosts',
    wallet: '/config#wallet',
    contracts: '/config#contracts',
    uploads: '/config#uploads',
    redundancy: '/config#redundancy',
    pinning: '/config#pinning',
  },
  contracts: {
    index: '/contracts',
  },
  hosts: {
    index: '/hosts',
  },
  wallet: {
    view: '/wallet',
  },
  keys: {
    index: '/keys',
  },
  alerts: {
    index: '/alerts',
  },
  node: {
    index: '/node',
  },
  login: '/login',
}

export const connectivityRoute = busStateRoute
