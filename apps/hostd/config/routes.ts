export const routes = {
  home: '/',
  storage: {
    index: '/storage',
  },
  contracts: {
    index: '/contracts',
  },
  config: {
    index: '/config',
  },
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
