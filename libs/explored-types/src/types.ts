import type {
  Address,
  BlockID,
  Block,
  ChainIndex,
  ConsensusNetwork,
  ConsensusState,
  Currency,
  FileContractID,
  Hash256,
  HostSettings,
  HostPriceTable,
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
  V2HostSettings,
  Signature,
  V2FileContractElement,
  V2FileContractResolution,
  V2FileContractRevision,
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
  PublicKey,
  SiacoinOutput,
  SiacoinOutputID,
  SiafundElement,
  SiafundOutputID,
  Transaction,
  TransactionID,
  V2FileContractElement,
  V2FileContractRevision,
  V2Transaction,
}

// Types based only on core types (@siafoundation/types) or primitives.

export type AddressBalance = {
  unspentSiacoins: Currency
  immatureSiacoins: Currency
  unspentSiafunds: number
}

export type EventPayout = {
  siacoinElement: ExplorerSiacoinOutput
}

export type EventV1Transaction = {
  transaction: ExplorerTransaction
}

export type EventV1ContractResolution = {
  parent: ExplorerFileContract
  siacoinElement: ExplorerSiacoinOutput
  missed: boolean
}

export type EventV2ContractResolution = {
  resolution: V2FileContractResolution
  siacoinElement: ExplorerSiacoinOutput
  missed: boolean
}

export type EventV2Transaction = ExplorerV2Transaction

type ExplorerEventBase = {
  id: Hash256
  index: ChainIndex
  confirmations: number
  maturityHeight: number
  timestamp: string
  relevant?: Address[]
}

type ExplorerMinerPayoutEvent = ExplorerEventBase & {
  type: 'payout'
  data: EventPayout
}

type ExplorerV1TransactionEvent = ExplorerEventBase & {
  type: 'v1Transaction'
  data: EventV1Transaction
}

type ExplorerV1ContractResolutionEvent = ExplorerEventBase & {
  type: 'v1ContractResolution'
  data: EventV1ContractResolution
}

type ExplorerV2TransactionEvent = ExplorerEventBase & {
  type: 'v2Transaction'
  data: EventV2Transaction
}

type ExplorerV2ContractResolutionEvent = ExplorerEventBase & {
  type: 'v2ContractResolution'
  data: EventV2ContractResolution
}

export type ExplorerEvent =
  | ExplorerMinerPayoutEvent
  | ExplorerV1TransactionEvent
  | ExplorerV1ContractResolutionEvent
  | ExplorerV2TransactionEvent
  | ExplorerV2ContractResolutionEvent

export type BlockMetrics = {
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
  | 'address'
  | 'block'
  | 'contract'
  | 'host'
  | 'invalid'
  | 'siacoinElement'
  | 'siafundElement'
  | 'transaction'
  | 'v2Contract'
  | 'v2Transaction'

export type TxpoolBroadcast = {
  transactions: Transaction[]
  v2transactions: ExplorerV2Transaction[]
}

export type TxpoolTransactions = {
  transactions: Transaction[]
  v2transactions: ExplorerV2Transaction[]
}

export type HostMetrics = {
  // Number of hosts that were up as of last scan.
  activeHosts: number
  // Total storage of all active hosts, in bytes.
  totalStorage: number
  // Remaining storage of all active hosts, in bytes.
  remainingStorage: number

  settings: HostSettings
  priceTable: HostPriceTable
  v2Settings: V2HostSettings
}

export type CurrencyID =
  | 'usd'
  | 'cad'
  | 'eur'
  | 'gbp'
  | 'jpy'
  | 'aud'
  | 'cny'
  | 'btc'
  | 'eth'

export type HostQuery = {
  v2?: boolean
  publicKeys?: PublicKey[]
  netAddresses?: string[]
  minUptime?: number
  minDuration?: number
  maxStoragePrice?: Currency
  maxContractPrice?: Currency
  maxUploadPrice?: Currency
  maxDownloadPrice?: Currency
  maxBaseRPCPrice?: Currency
  maxSectorAccessPrice?: Currency
  acceptContracts?: boolean
  online?: boolean
}

export type HostSortBy =
  | 'date_created'
  | 'net_address'
  | 'public_key'
  | 'accepting_contracts'
  | 'uptime'
  | 'storage_price'
  | 'contract_price'
  | 'download_price'
  | 'upload_price'
  | 'used_storage'
  | 'total_storage'

export type Location = {
  countryCode: string
  latitude: number
  longitude: number
}

// Novel Explored Types

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
export type ExplorerFileContract = {
  resolved: boolean
  valid: boolean

  transactionID: TransactionID

  confirmationIndex: ChainIndex
  confirmationTransactionID: TransactionID

  proofIndex?: ChainIndex
  proofTransactionID?: TransactionID

  id: FileContractID
  filesize: number
  fileMerkleRoot: Hash256
  windowStart: number
  windowEnd: number
  payout: Currency
  validProofOutputs: SiacoinOutput[]
  missedProofOutputs: SiacoinOutput[]
  unlockHash: Hash256
  revisionNumber: number
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

  v2?: V2BlockData
}

export type Protocol = 'siamux' | 'quic'

export type NetAddress = {
  protocol: Protocol
  address: string
}

/**
 * An ExplorerHost represents a host and the information gathered from scanning it.
 */
export type ExplorerHost = ExplorerV1Host | ExplorerV2Host

export type ExplorerV1Host = {
  v2: false

  publicKey: PublicKey
  netAddress: string

  location: Location

  knownSince: string
  lastScan: string
  lastScanSuccessful: boolean
  lastAnnouncement: string
  totalScans: number
  successfulInteractions: number
  failedInteractions: number

  settings: HostSettings
  priceTable: HostPriceTable
}

export type ExplorerV2Host = {
  v2: true

  publicKey: PublicKey
  v2NetAddresses: NetAddress[]

  location: Location

  knownSince: string
  lastScan: string
  lastScanSuccessful: boolean
  lastAnnouncement: string
  totalScans: number
  successfulInteractions: number
  failedInteractions: number

  v2Settings: V2HostSettings
}

export type ExplorerV2HostAnnouncement = {
  publicKey: PublicKey
  V2HostAnnouncement: NetAddress[]
}

export type ExplorerV2Transaction = V2Transaction & {
  id: string
  hostAnnouncements?: ExplorerV2HostAnnouncement[]
}

export type V2BlockData = {
  height: number
  commitment: Hash256
  transactions: ExplorerV2Transaction[]
}

export type ExplorerV2FileContractResolutionType =
  | 'renewal'
  | 'storage_proof'
  | 'expiration'

export type ExplorerV2FileContract = V2FileContractElement & {
  transactionID: TransactionID

  confirmationIndex: ChainIndex
  confirmationTransactionID: TransactionID

  resolutionIndex?: ChainIndex
  resolutionTransactionID?: TransactionID
  resolutionType?: ExplorerV2FileContractResolutionType | 'invalid'
}

export type ExplorerV2FileContractRevision = {
  parent: ExplorerV2FileContract
  revision: ExplorerV2FileContract
}

export type ExplorerV2FileContractRenewal = {
  finalRenterOutput: SiacoinOutput
  finalHostOutput: SiacoinOutput
  renterRollover: Currency
  hostRollover: Currency
  newContract: ExplorerV2FileContract

  renterSignature: Signature
  hostSignature: Signature
}

export type ExplorerV2ContractResolution = {
  parent: ExplorerV2FileContract
  type: ExplorerV2FileContractResolutionType
  resolution: string
}
