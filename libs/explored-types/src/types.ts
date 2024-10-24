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
  PublicKey,
  SiacoinElement,
  SiacoinInput,
  SiacoinOutput,
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
  SiacoinOutput,
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
//   1. New keys ExplorerSiacoinInput/Output and ExplorerSiafundInput/Output, which cascades
//      into Transaction and Block.
//   2. The Resolved and Valid keys with a FileContract.
//   3. Payout included with FileContractRevision, where the core type removes payout
//      because a revision cannot change this field. This is still true here but included
//      for more independent data types--one would not need the original contract to display
//      a list of revisions, for example.

/**
 * HostAnnouncement represents a signed announcement of a host's network address.
 * Announcements may be made via arbitrary data (in a v1 transaction) or via attestation
 * (in a v2 transaction).
 */
type HostAnnouncement = {
  publicKey: PublicKey
  netAddress: string
}

/**
 * The origin of a `SiacoinOutput`--whether it came from a miner or a transaction.
 */
type Source = string

/**
 * An `ExplorerSiacoinInput` is a core type SiacoinInput with added `address` and `value` keys.
 */
export type ExplorerSiacoinInput = SiacoinInput & {
  address: string
  value: string
}

/**
 * An `ExplorerSiacoinOutput` is a core type `SiacoinElement` with added `source` and
 * `spentIndex` keys.
 */
export type ExplorerSiacoinOutput = SiacoinElement & {
  source: Source
  spentIndex: ChainIndex
}

/**
 * An `ExplorerSiafundInput` is a core type SiacoinInput with added `address` and `value` keys.
 */
export type ExplorerSiafundInput = SiafundInput & {
  address: string
  value: string
}

/**
 * An `ExplorerSiafundOutput` is a core type `SiafundElement` with added `spentIndex` keys.
 */
export type ExplorerSiafundOutput = SiafundElement & { spentIndex: ChainIndex }

/**
 * An `ExplorerFileContract` is a core type FileContractElement with added resolved/
 * valid state, transactionID, and confirmation transaction and proof transaction information.
 */
export type ExplorerFileContract = FileContractElement & {
  resolved: boolean
  valid: boolean

  transactionID: TransactionID

  confirmationIndex: ChainIndex | null
  confirmationTransactionID: TransactionID | null

  proofIndex: ChainIndex | null
  proofTransactionID: TransactionID | null
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
  siacoinInputs?: ExplorerSiacoinInput[]
  siacoinOutputs?: ExplorerSiacoinOutput[]
  siafundInputs?: ExplorerSiafundInput[]
  siafundOutputs?: ExplorerSiafundOutput[]
  fileContracts?: ExplorerFileContract[]
  fileContractRevisions?: ExplorerFileContractRevision[]
  storageProofs?: StorageProof[]
  minerFees?: Currency
  arbitraryData?: string[][]
  signatures?: TransactionSignature[]
  hostAnnouncements?: HostAnnouncement[]
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
