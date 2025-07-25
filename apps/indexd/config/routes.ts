import { stateRoute } from '@siafoundation/indexd-types'

export const routes = {
  home: '/',
  config: {
    index: '/config',
    hosts: '/config#hosts',
    contracts: '/config#contracts',
    pricePinning: '/config#price-pinning',
  },
  wallet: {
    view: '/wallet',
  },
  node: {
    index: '/node',
  },
  login: '/login',
}

export const connectivityRoute = stateRoute
