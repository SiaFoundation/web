import {
  Currency,
  ChainIndex,
  Transaction,
  Address,
  SiacoinElement,
  SiafundElement,
  FileContractElement,
  Hash256,
  FileContract,
  V2FileContractResolutionType,
  PublicKey,
  TransactionID,
  SpendPolicy,
  UnlockConditions,
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

export type PoolTransaction = {
  id: TransactionID
  raw: Transaction
  type: string
  sent: Currency
  received: Currency
  locked: Currency
}

export type WalletEventBase = {
  id: Hash256
  timestamp: string
  index: ChainIndex
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

export type WalletEventTransaction = WalletEventBase & {
  type: 'transaction'
  val: {
    siacoinInputs?: SiacoinElement[]
    siacoinOutputs?: SiacoinElement[]
    siafundInputs?: WalletSiafundInput[]
    siafundOutputs?: SiafundElement[]
    fileContracts?: WalletFileContract[]
    v2FileContracts?: WalletV2FileContract[]
    hostAnnouncements?: WalletHostAnnouncement[]
    fee: number
  }
}

export type WalletEventMinerPayout = WalletEventBase & {
  type: 'miner payout'
  val: {
    siacoinOutput: SiacoinElement
  }
}

export type WalletEventContractPayout = WalletEventBase & {
  type: 'contract payout'
  val: {
    fileContract: FileContractElement
    siacoinOutput: SiacoinElement
    missed: boolean
  }
}

export type WalletEventSiafundClaim = WalletEventBase & {
  type: 'siafund claim'
}

export type WalletEventFoundationSubsidy = WalletEventBase & {
  type: 'foundation subsidy'
  val: {
    siacoinOutput: SiacoinElement
  }
}

export type WalletEvent =
  | WalletEventTransaction
  | WalletEventMinerPayout
  | WalletEventContractPayout
  | WalletEventSiafundClaim
  | WalletEventFoundationSubsidy

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
