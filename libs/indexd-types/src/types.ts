import { Currency, PublicKey, V2HostSettings } from '@siafoundation/types'

// Usability represents a series of host checks that can be used to
// determine whether the host is usable or not.
export type Usability = {
  uptime: boolean
  maxContractDuration: boolean
  maxCollateral: boolean
  protocolVersion: boolean
  priceValidity: boolean
  acceptingContracts: boolean
  quic: boolean
  siamux: boolean
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
  countryCode: string
  latitude: number
  longitude: number
  settings: V2HostSettings
  usability: Usability
  blocked: boolean
  blockedReasons?: string[]
  lostSectors: number
  unpinnedSectors: number
  accountFunding: Currency
  totalSpent: Currency
  // The zero time when the host is not stuck.
  stuckSince: string
}
