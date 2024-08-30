import type {
  Address,
  BlockID,
  Block,
  ChainIndex,
  ConsensusNetwork,
  ConsensusState,
  Currency,
  FileContractElement,
  FileContractID,
  Hash256,
  SiacoinElement,
  SiacoinInput,
  SiacoinOutputID,
  SiafundElement,
  SiafundInput,
  SiafundOutputID,
  UnlockConditions,
  StorageProof,
  Transaction,
  TransactionID,
  TransactionSignature,
  V2Transaction,
} from '@siafoundation/types'

// Unchanged Types - Re-exported for a more straight-forward DX like:
// import { Address } from '@siafoundation/explored-types'
export {
  Address,
  Block,
  BlockID,
  ChainIndex,
  ConsensusNetwork,
  ConsensusState,
  Currency,
  FileContractID,
  Hash256,
  SiacoinOutputID,
  SiafundElement,
  SiafundOutputID,
  Transaction,
  TransactionID,
  V2Transaction,
}

// Types based only on core types (@siafoundation/types) or primitives.

export type AddressBalance = {
  unspentSiacoins: Currency
  immatureSiacoins: Currency
  unspentSiafunds: number
}

export type Event = {
  id: Hash256
  index: ChainIndex
  timestamp: string
  maturityHeight: number
  addresses: Address[]
  data: string
}

export type Metrics = {
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

export type Peer = {
  connAddr: string
  inbound: boolean
  mu: {
    state: number
    sema: number
  }
  synced: boolean
  err: string
}

export type SearchResultType =
  | 'invalid'
  | 'address'
  | 'block'
  | 'transaction'
  | 'siacoinElement'
  | 'siafundElement'
  | 'contract'

export type TxpoolBroadcast = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

export type TxpoolTransactions = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

// Novel Explored Types - There are three main differences that inform what's below:
//   1. New keys SiacoinOutput and SiafundOutput, which cascades into Transaction and Block.
//   2. The Resolved and Valid keys with a FileContract.
//   3. Payout included with FileContractRevision, where the core type removes payout
//      because a revision cannot change this field. This is still true here but included
//      for more independent data types--one would not need the original contract to display
//      a list of revisions, for example.

/**
 * The origin of a `SiacoinOutput`--whether it came from a miner or a transaction.
 */
type Source = string

/**
 * An `ExplorerSiacoinOutput` is a core type `SiacoinElement` with added `source` and
 * `spentIndex` keys.
 */
export type ExplorerSiacoinOutput = SiacoinElement & {
  source: Source
  spentIndex: ChainIndex
}

/**
 * An `ExplorerSiafundOutput` is a core type `SiafundElement` with added `spentIndex` keys.
 */
export type ExplorerSiafundOutput = SiafundElement & { spentIndex: ChainIndex }

/**
 * An `ExplorerFileContract` is a core type FileContractElement with added resolved/
 * valid state.
 */
export type ExplorerFileContract = FileContractElement & {
  resolved: boolean
  valid: boolean
}

/**
 * An `ExplorerFileContractRevision` is a core type FileContractElement with extra fields
 * for revision information.
 */
export type ExplorerFileContractRevision = ExplorerFileContract & {
  parentID: FileContractID
  unlockConditions: UnlockConditions
}

/**
 * An `ExplorerTransaction` differs from a core type `Transaction` in the `siacoinOutputs`,
 * `siafundOutputs`,`fileContracts`, and `fileContractRevisions` key values, which are custom
 * to explorerd.
 */
export type ExplorerTransaction = {
  id: string
  siacoinInputs: SiacoinInput[]
  siacoinOutputs: ExplorerSiacoinOutput[]
  siafundInputs: SiafundInput[]
  siafundOutputs: ExplorerSiafundOutput[]
  fileContracts: ExplorerFileContract[]
  fileContractRevisions: ExplorerFileContractRevision[]
  storageProofs: StorageProof[]
  minerFees: Currency
  arbitraryData: string[][]
  signatures: TransactionSignature[]
}

/**
 * An `ExplorerBlock` differs from a core type `Block` with the addition of the height
 * key and the use of the `ExplorerSiacoinOutput` and `ExplorerTransaction` values.
 */
export type ExplorerBlock = {
  height: number
  parentID: BlockID
  nonce: number
  timestamp: string
  minerPayouts: ExplorerSiacoinOutput[]
  transactions: ExplorerTransaction[]
}
