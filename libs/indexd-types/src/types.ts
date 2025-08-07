import {
  Currency,
  FileContractID,
  PublicKey,
  V2HostSettings,
} from '@siafoundation/types'

export type WalletBalance = {
  confirmed: Currency
  unconfirmed: Currency
  spendable: Currency
  immature: Currency
}

// ContractState describes the current state of the contract on the network.
// - pending: the contract has not yet been seen on-chain
// - active: the contract was mined on-chain
// - resolved: the contract has been renewed or a valid storage proof has been submitted
// - expired: the contract has expired without a valid storage proof
// - rejected: the contract didn't make it into a block
export type ContractState =
  | 'pending'
  | 'active'
  | 'resolved'
  | 'expired'
  | 'rejected'

// ContractSpending describes the spending of a contract. Every time
// contract funds are moved from the indexer to a host, the spending is
// recorded.
export type ContractSpending = {
  appendSector: Currency
  freeSector: Currency
  fundAccount: Currency
  sectorRoots: Currency
}

export type Contract = {
  id: FileContractID
  hostKey: PublicKey
  formation: string
  renewedFrom: FileContractID
  nextPrune: string
  lastBroadcastAttempt: string
  revisionNumber: number
  proofHeight: number
  expirationHeight: number
  capacity: number
  size: number
  initialAllowance: Currency
  remainingAllowance: Currency
  totalCollateral: Currency
  renewedTo: FileContractID
  usedCollateral: Currency
  contractPrice: Currency
  minerFee: Currency
  good: boolean
  state: ContractState
  spending: ContractSpending
}

// Usability represents a series of host checks that can be used to
// determine whether the host is usable or not.
export type Usability = {
  uptime: boolean
  maxContractDuration: boolean
  maxCollateral: boolean
  protocolVersion: boolean
  priceValidity: boolean
  acceptingContracts: boolean
  contractPrice: boolean
  collateral: boolean
  storagePrice: boolean
  ingressPrice: boolean
  egressPrice: boolean
  freeSectorPrice: boolean
}

export type HostAddress = {
  protocol: 'siamux' | 'quic'
  address: string
}

export type Host = {
  publicKey: PublicKey
  lastAnnouncement: string
  lastFailedScan: string
  lastSuccessfulScan: string
  nextScan: string
  consecutiveFailedScans: number
  recentUptime: number
  addresses: HostAddress[]
  networks: string[]
  settings: V2HostSettings
  usability: Usability
  blocked: boolean
  blockedReason: string
  lostSectors: number
}

export type Pin = number

export type MaintenanceSettings = {
  enabled: boolean
  period: number
  renewWindow: number
  wantedContracts: number
}

export type UsabilitySettings = {
  maxEgressPrice: Currency
  maxIngressPrice: Currency
  maxStoragePrice: Currency
  minCollateral: Currency
  minProtocolVersion: `v${number}.${number}.${number}`
}

export type PinnedSettings = {
  currency: string
  maxEgressPrice: Pin
  maxIngressPrice: Pin
  maxStoragePrice: Pin
  minCollateral: Pin
}
