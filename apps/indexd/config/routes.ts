import { adminStateRoute } from '@siafoundation/indexd-types'

export const routes = {
  home: '/',
  config: {
    index: '/config',
    hosts: '/config#hosts',
    contracts: '/config#contracts',
    pricing: '/config#pricing',
  },
  wallet: {
    view: '/wallet',
  },
  node: {
    index: '/node',
  },
  metrics: {
    index: '/metrics',
  },
  login: '/login',
}

export const connectivityRoute = adminStateRoute
