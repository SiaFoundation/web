import { V2HostSettings } from '@siafoundation/types'

function uniqueId() {
  return `ed25519:${
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  }`
}

export type HostState = 'good' | 'bad'
export type Usability = 'usable' | 'not_usable'
export type Blocked = boolean
export type ContractState = 'active' | 'failed' | 'complete'

// Add types for v2Settings and location
export type Currency = string

export type HostLocation = {
  latitude: number
  longitude: number
  countryCode: string
}

export type ContractTimelineData = {
  contractHeightStart: number
  contractHeightEnd: number
  proofWindowHeightStart: number
  proofWindowHeightEnd: number
  revisionHeight: number
  resolutionHeight: number
  payoutHeight: number
  range: {
    startHeight: number
    endHeight: number
  }
}

export interface Host {
  id: string
  dns: string
  state: HostState
  usable: Usability
  blocked: Blocked
  hasActiveContracts: boolean
  hasAnyContracts: boolean
  countryCode: string // e.g. 'US'
  totalStorageTB: number
  availableStorageTB: number
  priceStorageTBMo: number // in SC
  priceUploadTB: number // in SC
  priceDownloadTB: number // in SC
  contracts: Contract[]
  location: HostLocation
  v2Settings: V2HostSettings
}

export interface Contract {
  id: string
  hostId: string
  state: ContractState
  size: number
  capacity: number
  spendingStorage: number // in SC
  spendingUpload: number // in SC
  spendingDownload: number // in SC
  accountCount: number
  accountIds: string[]
  host: Host
  timeline: ContractTimelineData
}

export interface Account {
  id: string // ad25299 key
  pubkey: string
  spendingStorage: number // in SC
  spendingUpload: number // in SC
  spendingDownload: number // in SC
  contractIds: string[]
}

function generateTimeline(): ContractTimelineData {
  // contract start: 122100 +/- random 100
  const contractHeightStart = 122100 + Math.floor(Math.random() * 200 - 100)
  // contract end: 6048 after start
  const contractHeightEnd = contractHeightStart + 6048
  // proof window start: same as contract end
  const proofWindowHeightStart = contractHeightEnd
  // proof window end: 288 after proof window start
  const proofWindowHeightEnd = proofWindowHeightStart + 288
  // revision height: anywhere in contract range
  const revisionHeight =
    contractHeightStart +
    Math.floor(Math.random() * (contractHeightEnd - contractHeightStart))
  // resolution height: anywhere in proof window
  const resolutionHeight =
    proofWindowHeightStart +
    Math.floor(Math.random() * (proofWindowHeightEnd - proofWindowHeightStart))
  // payout: 144 after proof window end
  const payoutHeight = proofWindowHeightEnd + 144
  return {
    contractHeightStart,
    contractHeightEnd,
    proofWindowHeightStart,
    proofWindowHeightEnd,
    revisionHeight,
    resolutionHeight,
    payoutHeight,
    range: {
      startHeight: contractHeightStart,
      endHeight: payoutHeight,
    },
  }
}

// 20 real-world city coordinates
const geoLocations: HostLocation[] = [
  { latitude: 40.7128, longitude: -74.006, countryCode: 'US' }, // New York
  { latitude: 51.5074, longitude: -0.1278, countryCode: 'GB' }, // London
  { latitude: 48.8566, longitude: 2.3522, countryCode: 'FR' }, // Paris
  { latitude: 35.6895, longitude: 139.6917, countryCode: 'JP' }, // Tokyo
  { latitude: -33.8688, longitude: 151.2093, countryCode: 'AU' }, // Sydney
  { latitude: 52.52, longitude: 13.405, countryCode: 'DE' }, // Berlin
  { latitude: 55.7558, longitude: 37.6173, countryCode: 'RU' }, // Moscow
  { latitude: 34.0522, longitude: -118.2437, countryCode: 'US' }, // Los Angeles
  { latitude: 43.65107, longitude: -79.347015, countryCode: 'CA' }, // Toronto
  { latitude: -23.5505, longitude: -46.6333, countryCode: 'BR' }, // São Paulo
  { latitude: 19.076, longitude: 72.8777, countryCode: 'IN' }, // Mumbai
  { latitude: -33.9249, longitude: 18.4241, countryCode: 'ZA' }, // Cape Town
  { latitude: 1.3521, longitude: 103.8198, countryCode: 'SG' }, // Singapore
  { latitude: 22.3193, longitude: 114.1694, countryCode: 'HK' }, // Hong Kong
  { latitude: 41.0082, longitude: 28.9784, countryCode: 'TR' }, // Istanbul
  { latitude: 19.4326, longitude: -99.1332, countryCode: 'MX' }, // Mexico City
  { latitude: 25.2048, longitude: 55.2708, countryCode: 'AE' }, // Dubai
  { latitude: 41.9028, longitude: 12.4964, countryCode: 'IT' }, // Rome
  { latitude: 37.5665, longitude: 126.978, countryCode: 'KR' }, // Seoul
  { latitude: 41.8781, longitude: -87.6298, countryCode: 'US' }, // Chicago
]

const hosts: Host[] = Array.from({ length: 10_000 }).map((_, i) => {
  const hostId = uniqueId()
  const contracts: Contract[] =
    i % 10 === 0
      ? Array.from({ length: 10 }).map((_, j) => ({
          id: uniqueId(),
          hostId,
          state: ['active', 'failed', 'complete'][j % 3] as ContractState,
          size: 10 + j,
          capacity: 5 + j,
          spendingStorage: 1000 + j * 10,
          spendingUpload: 500 + j * 5,
          spendingDownload: 200 + j * 2,
          accountCount: 1 + (j % 3),
          host: undefined as unknown as Host,
          accountIds: [], // will be filled below
          timeline: generateTimeline(),
        }))
      : []
  const v2Settings: V2HostSettings = {
    protocolVersion: [1, 2, 3],
    release: `v1.${i + 1}.0`,
    walletAddress: `wallet${i + 1}`,
    acceptingContracts: i % 2 === 0,
    maxCollateral: String(10000 + i * 1000),
    maxContractDuration: 1000 + i * 100,
    remainingStorage: 100000 + i * 10000,
    totalStorage: 200000 + i * 20000,
    prices: {
      contractPrice: String(1000 + i * 100),
      storagePrice: String(1000 + i * 100),
      ingressPrice: String(200 + i * 20),
      egressPrice: String(150 + i * 15),
      collateral: String(1000 + i * 100),
      freeSectorPrice: String(100 + i * 10),
      tipHeight: 1000 + i * 100,
      validUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      signature: `signature${i + 1}`,
    },
    validity: 365,
  }
  return {
    id: hostId,
    dns: `host${i + 1}.example.com`,
    state: i % 2 === 0 ? 'good' : 'bad',
    usable: i % 2 === 0 ? 'usable' : 'not_usable',
    blocked: i % 10 === 0,
    hasActiveContracts: contracts.some((c) => c.state === 'active'),
    hasAnyContracts: contracts.length > 0,
    countryCode: geoLocations[i % geoLocations.length].countryCode,
    totalStorageTB: 100 + i * 2,
    availableStorageTB: 50 + i,
    priceStorageTBMo: 1000 + i * 10,
    priceUploadTB: 200 + i * 2,
    priceDownloadTB: 150 + i * 1.5,
    contracts,
    location: geoLocations[i % geoLocations.length],
    v2Settings,
  }
})
// Set host reference on each contract
hosts.forEach((host) => {
  host.contracts.forEach((contract) => {
    contract.host = host
  })
})

const accounts: Account[] = Array.from({ length: 100 }).map((_, i) => {
  const uuid = uniqueId()
  return {
    id: `ed25519:${uuid}`,
    pubkey: `ed25519:${uuid}`,
    spendingStorage: 1000 + i * 10,
    spendingUpload: 500 + i * 5,
    spendingDownload: 200 + i * 2,
    contractIds: [], // will be filled below
  }
})

const contracts: Contract[] = hosts.flatMap((h) => h.contracts)

// Distribute accounts across contracts
contracts.forEach((contract, idx) => {
  // Each contract is used by 1-3 accounts for variety
  const numAccounts = 1 + (idx % 3)
  contract.accountIds = Array.from({ length: numAccounts }).map(
    (_, j) => accounts[(idx + j) % accounts.length].id
  )
  // Add this contract to each account's contractIds
  contract.accountIds.forEach((accountId) => {
    const account = accounts.find((a) => a.id === accountId)
    if (account && !account.contractIds.includes(contract.id)) {
      account.contractIds.push(contract.id)
    }
  })
})

export const mock = {
  hosts: hosts,
  contracts: contracts,
  accounts: accounts,
}
