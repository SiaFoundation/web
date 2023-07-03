export const routes = {
  home: '/',
  files: {
    index: '/files',
  },
  autopilot: {
    index: '/autopilot',
    contracts: '/autopilot#contracts',
    hosts: '/autopilot#hosts',
    wallet: '/autopilot#wallet',
  },
  config: {
    index: '/config',
    gouging: '/config#gouging',
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
  node: {
    index: '/node',
  },
  login: '/login',
}

export const connectivityRoute = '/bus/consensus/state'
