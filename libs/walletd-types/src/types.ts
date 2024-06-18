import {
  ChainIndex,
  Transaction,
  SiacoinElement,
  SiafundElement,
  FileContractElement,
  Hash256,
  FileContract,
  PublicKey,
  SpendPolicy,
  UnlockConditions,
  V2Transaction,
  V2FileContractResolutionType,
  Address,
} from '@siafoundation/types'

export type GatewayPeer = {
  addr: string
  inbound: boolean
  version: string

  firstSeen?: string
  connectedSince?: string
  syncedBlocks?: number
  syncDuration?: number
}

export type WalletEventBase = {
  id: Hash256
  timestamp: string
  index: ChainIndex
  maturityHeight: number
  relevant: Address[]
}

export type WalletSiafundInput = {
  siafundElement: SiafundElement
  claimElement: SiacoinElement
}

export type WalletFileContract = {
  fileContract: FileContractElement
  revision?: FileContract
  validOutputs?: SiacoinElement[]
}

export type WalletV2FileContract = {
  fileContract: FileContractElement
  revision?: FileContract
  resolution?: V2FileContractResolutionType
  outputs?: SiacoinElement[]
}

export type WalletHostAnnouncement = {
  publicKey: PublicKey
  netAddress: string
}

export type WalletEventTransactionV1 = WalletEventBase & {
  type: 'v1Transaction'
  data: {
    transaction: Transaction
    spentSiacoinElements?: SiacoinElement[]
    spentSiafundElements?: SiafundElement[]
  }
}

export type WalletEventTransactionV2 = WalletEventBase & {
  type: 'v2Transaction'
  data: V2Transaction
}

export type WalletEventContractResolutionV1 = WalletEventBase & {
  type: 'v1ContractResolution'
  data: {
    fileContract: FileContractElement
    siacoinElement: SiacoinElement
    missed: boolean
  }
}

export type WalletEventContractResolutionV2 = WalletEventBase & {
  type: 'v2ContractResolution'
  data: {
    fileContract: FileContractElement
    resolution: V2FileContractResolutionType
    siacoinElement: SiacoinElement
    missed: boolean
  }
}

export type WalletEventMinerPayout = WalletEventBase & {
  type: 'miner'
  data: {
    siacoinOutput: SiacoinElement
  }
}

export type WalletEventSiafundClaim = WalletEventBase & {
  type: 'siafundClaim'
  data: {
    siacoinElement: SiacoinElement
  }
}

export type WalletEventFoundationSubsidy = WalletEventBase & {
  type: 'foundation'
  data: {
    siacoinOutput: SiacoinElement
  }
}

export type WalletEvent =
  | WalletEventTransactionV1
  | WalletEventTransactionV2
  | WalletEventContractResolutionV1
  | WalletEventContractResolutionV2
  | WalletEventMinerPayout
  | WalletEventFoundationSubsidy
  | WalletEventSiafundClaim

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
  unlockConditions?: UnlockConditions
}

export type WalletAddress = {
  address: string
  description: string
  spendPolicy?: SpendPolicy
  metadata: WalletAddressMetadata
}
