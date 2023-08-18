import { syncerPeersKey } from '@siafoundation/react-walletd'

export const routes = {
  home: '/',
  wallet: {
    base: '/wallets/',
    view: '/wallets/[id]',
    addresses: '/wallets/[id]/addresses',
  },
  node: {
    index: '/node',
    txPool: '/node/txpool',
    peers: '/node/peers',
  },
  login: '/login',
}

export const connectivityRoute = syncerPeersKey
