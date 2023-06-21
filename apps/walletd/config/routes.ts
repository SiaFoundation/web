export const routes = {
  home: '/',
  wallet: {
    view: '/wallets/:name',
    addresses: '/wallets/:name/addresses',
  },
  node: {
    index: '/node',
    txPool: '/node/txpool',
    peers: '/node/peers',
  },
  lockscreen: '/login',
}

export const connectivityRoute = '/consensus/tip'
