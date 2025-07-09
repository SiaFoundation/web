import { webLinks } from '@siafoundation/design-system'

const mainnet = {
  network: 'mainnet',
  networkName: 'Sia Mainnet',
  siteName: 'siascan.com',
  appName: 'siascan',
  appLink: webLinks.explore.mainnet,
  isMainnet: true,
  faucetApi: 'https://api.siascan.com',
  exploredApi: 'https://api.siascan.com',
}

const zen = {
  network: 'zen',
  networkName: 'Zen Testnet',
  siteName: 'zen.siascan.com',
  appName: 'siascan',
  appLink: webLinks.explore.testnetZen,
  isMainnet: false,
  faucetApi: 'https://api.siascan.com/zen/faucet',
  exploredApi: 'https://api.siascan.com/zen',
}

const config = process.env.NETWORK === 'zen' ? zen : mainnet

export const network = config.network as 'mainnet' | 'zen'
export const networkName = config.networkName
export const siteName = config.siteName
export const appName = config.appName
export const appLink = config.appLink
export const isMainnet = config.isMainnet
export const faucetApi = config.faucetApi
export const exploredApi = config.exploredApi
