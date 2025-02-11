import { SpendPolicy } from '@siafoundation/types'

export type GatewayPeer = {
  address: string
  inbound: boolean
  version: string
  firstSeen?: string
  connectedSince?: string
  syncedBlocks?: number
  syncDuration?: number
}

export type Metadata = Record<string, unknown>

export type WalletType = 'seed' | 'ledger' | 'watch'

export type WalletMetadata = {
  type: WalletType
  mnemonicHash?: string
  // ledger
  publicKey0?: string
  address0?: string
}

export type Wallet = {
  id: string
  name: string
  description: string
  dateCreated: string
  lastUpdated: string
  metadata: WalletMetadata
}

export type WalletAddressMetadata = {
  index?: number
}

export type WalletAddress = {
  address: string
  description: string
  spendPolicy?: SpendPolicy
  metadata: WalletAddressMetadata
}
