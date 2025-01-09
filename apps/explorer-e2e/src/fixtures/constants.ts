// General/Shared
export const SEARCHBAR = `input[name="query"]`
export const APP_NAME = 'explorer-identity-appName'
export const APP_NETWORK = 'explorer-identity-network'
export const DATUM_VALUE = 'explorer-datum-value'

// Home page
export const METRICS_ITEM = 'explorer-metrics-item'
export const LATEST_BLOCKS_ITEM = 'explorer-latestBlocks-item'
export const TOP_HOSTS_ITEMS = 'explorer-topHosts-item'

// Contract page
export const RENEWED_FROM_BUTTON = 'explorer-contract-renewedFrom'
export const RENEWED_TO_BUTTON = 'explorer-contract-renewedTo'

// Host page
export const HOST_PRICING = 'explorer-hostPricing'
export const HOST_SETTINGS_PATTERNS = [
  '\\b\\d+(?:\\.\\d{1,2})?\\s?(TB|GB|MB|KB|B)\\b', // 3.00 TB
  '(\\$\\d+(?:\\.\\d{1,3})?|\\d+(?:\\.\\d{1,3})?\\s?[A-Z]{2})\\/(TB|GB|MB|KB|B)\\/(month|year|day)', // $1.16/TB/month
  '(\\$\\d+(?:\\.\\d{1,3})?|\\d+(?:\\.\\d{1,3})?\\s?[A-Z]{2})\\/(TB|GB|MB|KB|B)', // $1.12/TB
  '\\b\\d+\\s?(days?|months?|years?)\\b', // 6 months
  '^\\$\\d+(?:\\.\\d+)?$', // $4.50
  '(\\$\\d+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?\\s?[A-Z]{2})\\/million', // $0.0045 SC/million
  '^(\\d+(?:\\.\\d+)?|0)\\s?(KS|mS|SC)$', // 1.000 KS, 200.000 mS, 0 SC
  '\\b\\d+\\s?blocks\\b', // 25920 blocks
  '^(6553[0-5]|(655[0-2][0-9]|64[0-9]{3}|6[0-3][0-9]{2}|[1-5]?[0-9]{0,4}))$', // 9883
  '^\\d{1,16}$', // 2592000000000000
  '\\b\\d+(?:\\.\\d{1,2})?\\s?(Mbps|Gbps|Kbps)\\b', // 998.64 Mbps
]

// Test data
export const TEST_BLOCK_1 = {
  height: '25000',
  id: '0000000016920b69bfbe192005cfed7c9c5369bb83ff8406320f77f74f7b40cb',
  display: {
    title: 'Block 25,000',
    blockHash: '000000...7b40cb',
    minerPayoutAddress: '13caad1b4eea...',
    transactionHeader: '2 transactions',
    lastTransactionID: '8a03682f2285...',
  },
}

export const TEST_TX_1 = {
  id: '8a03682f22857f306a95f55a28fa9edf111e1d11803f8b4a91bd01d2803a4eb6',
  display: {
    title: 'Transaction 8a03682f22857f3...',
    confirmationHeight: '25,000',
    numberOfConfirmations: '72+ confirmations',
    inputAddress: '83cc8e810db6...',
    outputAddress: 'e3ed23ed389f...',
    inputAmount: '+8.979 KS',
    outputAmount: '+107.674 SC',
    contractID: '25c94822bf7b...',
  },
}

export const TEST_ADDRESS_1 = {
  id: '68bf48e81536f2221f3809aa9d1c89c1c869a17c6f186a088e49fd2605e4bfaaa24f26e4c42c',
  display: {
    title: 'Address 68bf48e81536f22...',
    transactionNumber: '500 transactions',
    transactionID: 'c0b92135ca06...',
  },
}

export const TEST_CONTRACT_1 = {
  id: '25c94822bf7bd86a92d28a148d9d30151949f3599bf93af0df7b4f1e1b3c990d',
  renewedFromTitle: 'Contract 494d147a8028217...',
  renewedToTitle: 'Contract 43a81d1a21ebf6f...',
  display: {
    title: 'Contract 25c94822bf7bd86...',
    transactionID: 'a3a4a6808e33...',
    unlockHash: 'c50b70e7dd79...',
    revisionNumber: '18,446,744,0...',
    status: 'obligation succeeded',
    missedProofTitle: 'Missed proof outputs (2)',
    validProofTitle: 'Valid proof outputs (2)',
  },
}

export const TEST_HOST_1 = {
  pubkey:
    'ed25519:3926a0434232bba9eaca2041303a1039d4f65bf54d7bd4e2a9164ea2d778b714',
  display: {
    pubkey: 'ed25519:3926a0434232bba9eaca20...',
    title: '51.81.242.140:9882',
    location: 'US',
  },
}
