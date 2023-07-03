export const routes = {
  home: '/',
  wallet: {
    view: '/wallets/:id',
    addresses: '/wallets/:id/addresses',
  },
  node: {
    index: '/node',
    txPool: '/node/txpool',
    peers: '/node/peers',
  },
  login: '/login',
}

export const connectivityRoute = '/consensus/tip'
