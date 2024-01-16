import { busStateKey } from '@siafoundation/react-renterd'

export const routes = {
  home: '/',
  files: {
    index: '/files',
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
  node: {
    index: '/node',
  },
  login: '/login',
}

export const connectivityRoute = busStateKey
