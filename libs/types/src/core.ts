export type ID = string
export type BlockID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type BlockHeight = number
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string
export type PrivateKey = string
export type TransactionID = Hash256
export type SiacoinOutputID = Hash256
export type SiafundOutputID = Hash256
export type Address = string
export type MerkleProof = Hash256[] | null

export type StateElement = {
  id: string
  leafIndex: number
  merkleProof: MerkleProof
}

export type UnlockConditions = {
  timelock: number
  publicKeys?: PublicKey[] | null
  signaturesRequired: number
}

export type FileContractRevision = {
  parentID: string
  unlockConditions: UnlockConditions
  revisionNumber: number
  filesize: number
  fileMerkleRoot: string
  windowStart: number
  windowEnd: number
  validProofOutputs?: SiacoinOutput[]
  missedProofOutputs?: SiacoinOutput[]
  unlockHash: string
}

export type TransactionSignature = {
  parentID: string
  publicKeyIndex: number
  timelock?: number
  coveredFields: CoveredFields
  signature?: string
}

export type SiacoinInput = {
  parentID: string
  unlockConditions: UnlockConditions
}

export type SiacoinOutput = {
  value: Currency
  address: string
}

export type SiacoinElement = StateElement & {
  siacoinOutput: SiacoinOutput
  maturityHeight: number
}

export type SiafundElement = StateElement & {
  siafundOutput: SiafundOutput
  claimStart: string
}

export type CoveredFields = {
  wholeTransaction: boolean
  siacoinInputs?: number[]
  siacoinOutputs?: number[]
  fileContracts?: number[]
  fileContractRevisions?: number[]
  storageProofs?: number[]
  siafundInputs?: number[]
  siafundOutputs?: number[]
  minerFees?: number[]
  arbitraryData?: number[]
  signatures?: number[]
}

export type FileContractElement = StateElement & {
  fileContract: FileContract
}

export type FileContract = {
  filesize: number
  fileMerkleRoot: string
  windowStart: number
  windowEnd: number
  payout: Currency
  validProofOutputs?: SiacoinOutput[]
  missedProofOutputs?: SiacoinOutput[]
  unlockHash: string
  revisionNumber: number
}

export type StorageProof = {
  parentID: string
  segment: string
  hashset?: Hash[]
}

export type SiafundInput = {
  parentID: string
  unlockConditions: UnlockConditions
  claimAddress: string
}

export type SiafundOutput = {
  value: number
  address: string
}

export type Transaction = {
  siacoinInputs?: SiacoinInput[]
  siacoinOutputs?: SiacoinOutput[]
  fileContracts?: FileContract[]
  fileContractRevisions?: FileContractRevision[]
  storageProofs?: StorageProof[]
  siafundInputs?: SiafundInput[]
  siafundOutputs?: SiafundOutput[]
  minerFees?: Currency[]
  arbitraryData?: string[]
  signatures?: TransactionSignature[]
}

export type Block = {
  parentID: string
  nonce: string
  timestamp: number
  minerPayouts?: SiacoinOutput[]
  transactions?: Transaction[]
}

export type ChainIndex = {
  height: number
  id: string
}

export type ConsensusNetwork = {
  name: 'mainnet' | 'zen'
  initialCoinbase: Currency
  minimumCoinbase: Currency
  initialTarget: string
  hardforkDevAddr: {
    height: number
    oldAddress: string
    newAddress: string
  }
  hardforkTax: {
    height: number
  }
  hardforkStorageProof: {
    height: number
  }
  hardforkOak: {
    height: number
    fixHeight: number
    genesisTimestamp: string
  }
  hardforkASIC: {
    height: number
    oakTime: number
    oakTarget: string
  }
  hardforkFoundation: {
    height: number
    primaryAddress: string
    failsafeAddress: string
  }
  hardforkV2: {
    allowHeight: number
    requireHeight: number
  }
}

export type ConsensusState = {
  index: ChainIndex
  prevTimestamps: string[]
  depth: string
  childTarget: string
  siafundPool: string
  oakTime: number
  oakTarget: string
  foundationPrimaryAddress: string
  foundationFailsafeAddress: string
  totalWork: string
  difficulty: string
  oakWork: string
  elements: {
    numLeaves: number
    trees: string[]
  }
  attestations: number
}

/**
 * HostSettings are the settings and prices used when interacting with a host.
 */
export type HostSettings = {
  acceptingcontracts: boolean
  maxdownloadbatchsize: number
  maxduration: number
  maxrevisebatchsize: number
  netaddress: string
  remainingstorage: number
  sectorsize: number
  totalstorage: number
  unlockhash: Address
  windowsize: number
  collateral: Currency
  maxcollateral: Currency
  baserpcprice: Currency
  contractprice: Currency
  downloadbandwidthprice: Currency
  sectoraccessprice: Currency
  storageprice: Currency
  uploadbandwidthprice: Currency
  ephemeralaccountexpiry: string
  maxephemeralaccountbalance: Currency
  revisionnumber: number
  version: string
  release: string
  siamuxport: string
}

export type V2HostPrices = {
  contractPrice: Currency
  collateral: Currency
  storagePrice: Currency
  ingressPrice: Currency
  egressPrice: Currency
  freeSectorPrice: Currency
  tipHeight: number
  validUntil: string
  signature: Signature
}

/**
 * HostSettingsV2 are the settings and prices used when interacting with a host.
 */
export type V2HostSettings = {
  protocolVersion: [number, number, number]
  release: string
  walletAddress: string
  acceptingContracts: boolean
  maxCollateral: Currency
  maxContractDuration: number
  // Remaining storage in sectors.
  remainingStorage: number
  // Total storage in sectors.
  totalStorage: number
  prices: V2HostPrices
  validity: number
}

/**
 * An HostPriceTable contains the host's current prices for each RPC.
 */
export type HostPriceTable = {
  // UID is a unique specifier that identifies this price table
  uid: string

  // Validity is a duration that specifies how long the host guarantees these
  // prices for and are thus considered valid.
  validity: string

  // HostBlockHeight is the block height of the host. This allows the renter
  // to create valid withdrawal messages in case it is not synced yet.
  hostblockheight: number

  // UpdatePriceTableCost refers to the cost of fetching a new price table
  // from the host.
  updatepricetablecost: Currency

  // AccountBalanceCost refers to the cost of fetching the balance of an
  // ephemeral account.
  accountbalancecost: Currency

  // FundAccountCost refers to the cost of funding an ephemeral account on the
  // host.
  fundaccountcost: Currency

  // LatestRevisionCost refers to the cost of asking the host for the latest
  // revision of a contract.
  latestrevisioncost: Currency

  // SubscriptionMemoryCost is the cost of storing a byte of data for
  // SubscriptionPeriod time.
  subscriptionmemorycost: Currency

  // SubscriptionNotificationCost is the cost of a single notification on top
  // of what is charged for bandwidth.
  subscriptionnotificationcost: Currency

  // MDM related costs
  //
  // InitBaseCost is the amount of cost that is incurred when an MDM program
  // starts to run. This doesn't include the memory used by the program data.
  // The total cost to initialize a program is calculated as
  // InitCost = InitBaseCost + MemoryTimeCost * Time
  initbasecost: Currency

  // MemoryTimeCost is the amount of cost per byte per time that is incurred
  // by the memory consumption of the program.
  memorytimecost: Currency

  // Cost values specific to the bandwidth consumption.
  downloadbandwidthcost: Currency
  uploadbandwidthcost: Currency

  // Cost values specific to the DropSectors instruction.
  dropsectorsbasecost: Currency
  dropsectorsunitcost: Currency

  // Cost values specific to the HasSector command.
  hassectorbasecost: Currency

  // Cost values specific to the Read instruction.
  readbasecost: Currency
  readlengthcost: Currency

  // Cost values specific to the RenewContract instruction.
  renewcontractcost: Currency

  // Cost values specific to the Revision command.
  revisionbasecost: Currency

  // SwapSectorBaseCost is the cost of swapping 2 full sectors by root.
  swapsectorcost: Currency

  // Cost values specific to the Write instruction.
  writebasecost: Currency
  writelengthcost: Currency
  writestorecost: Currency

  // TxnFee estimations.
  txnfeeminrecommended: Currency
  txnfeemaxrecommended: Currency

  // ContractPrice is the additional fee a host charges when forming/renewing
  // a contract to cover the miner fees when submitting the contract and
  // revision to the blockchain.
  contractprice: Currency

  // CollateralCost is the amount of money per byte the host is promising to
  // lock away as collateral when adding new data to a contract. It's paid out
  // to the host regardless of the outcome of the storage proof.
  collateralcost: Currency

  // MaxCollateral is the maximum amount of collateral the host is willing to
  // put into a single file contract.
  maxcollateral: Currency

  // MaxDuration is the max duration for which the host is willing to form a
  // contract.
  maxduration: number

  // WindowSize is the minimum time in blocks the host requests the
  // renewWindow of a new contract to be.
  windowsize: number

  // Registry related fields.
  registryentriesleft: number
  registryentriestotal: number
}
