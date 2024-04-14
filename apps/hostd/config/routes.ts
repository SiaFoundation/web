import { stateHostKey } from '@siafoundation/hostd-react'

export const routes = {
  home: '/',
  volumes: {
    index: '/volumes',
  },
  contracts: {
    index: '/contracts',
  },
  config: {
    index: '/config',
    host: '/config#host',
    pricing: '/config#pricing',
    dns: '/config#dns',
    bandwidth: '/config#bandwidth',
    registry: '/config#registry',
    accounts: '/config#accounts',
  },
  wallet: {
    view: '/wallet',
  },
  node: {
    index: '/node',
    txPool: '/node/txpool',
    peers: '/node/peers',
  },
  login: '/login',
}

export const connectivityRoute = stateHostKey
