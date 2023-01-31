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
  unlock: '/unlock',
}
