import { PublicKey, V2HostSettings } from '@siafoundation/types'

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
  countryCode: string
  latitude: number
  longitude: number
  settings: V2HostSettings
  usability: Usability
  blocked: boolean
  blockedReason: string
  lostSectors: number
}
