import {
  Address,
  BlockID,
  ChainIndex,
  Currency,
  FileContractID,
  Hash256,
  SiacoinElement,
  SiacoinInput,
  SiafundElement,
  SiafundInput,
  StateElement,
  StorageProof,
  Transaction,
  TransactionID,
  TransactionSignature,
  UnlockConditions,
  V2Transaction,
} from '@siafoundation/types'

type Source = number

export type ExplorerAddress = Address
export type ExplorerBlockID = BlockID
export type ExplorerChainIndex = ChainIndex
export type ExplorerCurrency = Currency
export type ExplorerFileContractID = FileContractID
export type ExplorerHash256 = Hash256
export type ExplorerTransactionID = TransactionID
export type ExplorerSiacoinElement = SiacoinElement & { source: Source }
export type ExplorerSiafundElement = SiafundElement

export type ExplorerFileContract = StateElement & {
  resolved: boolean
  valid: boolean
  filesize: number
  windowStart: number
  windowEnd: number
  payout: Currency
  validProofOutputs: ExplorerSiacoinElement[]
  missedProofOutputs: ExplorerSiacoinElement[]
  unlockHash: Hash256
  revisionNumber: number
}

export type ExplorerFileContractRevision = ExplorerFileContract & {
  parentID: FileContractID
  unlockConditions: UnlockConditions
}

export type ExplorerTransaction = {
  siacionInputs?: SiacoinInput[]
  siacoinOutputs?: ExplorerSiacoinElement[]
  siafundInputs?: SiafundInput
  siafundOutputs?: ExplorerSiafundElement
  fileContracts?: ExplorerFileContract[]
  fileContractRevisions?: ExplorerFileContractRevision[]
  storageProofs?: StorageProof[]
  minerFees?: Currency
  arbitraryData?: string[]
  signatures?: TransactionSignature[]
}

export type ExplorerBlock = {
  parentID: BlockID
  nonce: number
  timestamp: string
  minerPayouts: ExplorerSiacoinElement[]
  transactions: ExplorerTransaction[]
}

export type ExplorerMetrics = {
  index: ChainIndex
  difficulty: string
  totalHosts: number
  activeContracts: number
  partialContracts: number
  successfulContracts: number
  storageUtilization: number
  circulatingSupply: Currency
  contractRevenue: Currency
}

export type ExplorerSearchResultType =
  | 'invalid'
  | 'address'
  | 'block'
  | 'transaction'
  | 'siacoinElement'
  | 'siafundElement'
  | 'contract'

// Request types

export type ExplorerTxpoolBroadcast = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

// Response types

export type ExplorerPeer = {
  connAddr: string
  inbound: boolean
  mu: {
    state: number
    sema: number
  }
  synced: boolean
  err: string
}

export type ExplorerEvent = {
  id: Hash256
  index: ChainIndex
  timestamp: string
  maturityHeight: number
  addresses: Address[]
  data: string
}

export type ExplorerTxpoolTransactions = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

export type ExplorerAddressUTXOs = {
  unspentSiacoinOutputs: ExplorerSiacoinElement[]
  unspentSiafundOutputs: ExplorerSiafundElement[]
}

export type ExplorerAddressBalance = {
  unspentSiacoins: Currency
  immatureSiacoins: Currency
  unspentSiafunds: number
}
