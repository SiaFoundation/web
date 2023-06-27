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
  lockscreen: '/login',
}

export const connectivityRoute = '/consensus/tip'
