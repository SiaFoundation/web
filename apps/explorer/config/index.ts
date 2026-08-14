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

// The public explored API address. This is the address that is handed to the
// browser, so it must always be publicly reachable.
export const exploredApi = config.exploredApi

// An optional internal explored API address used for server-side requests.
// When the app runs alongside explored in a private network, this lets server
// requests reach it directly rather than routing back out over the public
// internet. Read at runtime so a single build can be deployed with different
// values, and never exposed to the browser. Falls back to the public address.
export const exploredInternalApi =
  process.env.EXPLORED_INTERNAL_API || config.exploredApi
