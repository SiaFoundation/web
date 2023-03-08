export const routes = {
  home: '/',
  wallet: {
    view: '/wallet/[id]',
    receive: '/wallet/[id]/receive',
  },
  node: {
    index: '/node',
    txPool: '/node/txpool',
    peers: '/node/peers',
  },
  lockscreen: '/unlock',
  syncscreen: '/sync',
}
