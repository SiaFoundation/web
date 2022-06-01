export type EntityType =
  | 'ScTx'
  | 'SfTx'
  | 'contract'
  | 'contractform'
  | 'contractrenewal'
  | 'block'
  | 'contractresol'
  | 'storageproof'
  | 'revision'
  | 'host ann'
  | 'blockreward'
  | 'allowancePost'
  | 'collateralPost'
  | 'output'
  | 'address'
  | 'SfClaim'
  | 'foundationsub'
  | 'unconfirmed'

export const entityTypes = [
  'ScTx',
  'SfTx',
  'contract',
  'contractform',
  'contractrenewal',
  'block',
  'contractresol',
  'storageproof',
  'revision',
  'host ann',
  'blockreward',
  'allowancePost',
  'collateralPost',
  'output',
  'address',
  'SfClaim',
  'foundationsub',
  'unconfirmed',
]

const entityTypeMap: Record<EntityType, string> = {
  block: 'block',
  ScTx: 'siacoin transfer',
  SfTx: 'siafund transfer',
  contract: 'contract formation',
  contractform: 'contract formation',
  contractrenewal: 'contract renewal',
  contractresol: 'contract resolution',
  storageproof: 'storage proof',
  revision: 'revision',
  'host ann': 'host announcement',
  blockreward: 'block reward',
  allowancePost: 'allowance post',
  collateralPost: 'collateral post',
  output: 'output',
  address: 'address',
  SfClaim: 'siafund claim',
  foundationsub: 'foundation subsidy',
  unconfirmed: 'unconfirmed',
}

const entityTypeInitialsMap: Record<EntityType, string> = {
  block: 'Bk',
  ScTx: 'Tx',
  SfTx: 'Tx',
  contract: 'Tx',
  contractform: 'Tx',
  contractrenewal: 'Tx',
  contractresol: 'Tx',
  storageproof: 'Tx',
  revision: 'Tx',
  'host ann': 'Tx',
  blockreward: 'Tx',
  allowancePost: 'Tx',
  collateralPost: 'Tx',
  output: 'O',
  address: 'A',
  SfClaim: 'Tx',
  foundationsub: 'Tx',
  unconfirmed: 'Tx',
}

export function getEntityTypeLabel(txType: EntityType): string {
  return entityTypeMap[txType]
}

export function getEntityTypeInitials(txType: EntityType): string {
  return entityTypeInitialsMap[txType]
}

export type EntityTypeInfo<T extends EntityType> = {
  Type: T
  MasterHash: string
}

export type BlockInfo = {
  Height: number
  Timestamp: number
  TransactionCount: number
  Hash: string
  MinerPayoutAddress: string
  MinerArbitraryData: string
  Difficulty: number
  Hashrate: number
  TotalCoins: number
  SiacoinInputCount: number
  SiacoinOutputCount: number
  FileContractRevisionCount: number
  StorageProofCount: number
  SiafundInputCount: number
  SiafundOutputCount: number
  ActiveContractCost: number
  ActiveContractCount: number
  ActiveContractSize: number
  TotalContractCost: number
  TotalContractCount: number
  TotalContractSize: number
  NewContracts: number
  NewTx: number
  MiningPool: string
  FeeCount: number
  FeeCountHastings: number
}

type ContractInfo = {
  MasterHash: string
  ContractId: string
  AllowancePosting: string
  RenterValue: number
  Allowance2Posting: string | 'null'
  Renter2Value: number
  Allowance3Posting: string | 'null'
  Renter3Value: number
  CollateralPosting: string
  HostValue: number
  Fees: number
  WindowStart: number
  WindowEnd: number
  RevisionNum: number
  OriginalFileSize: number
  CurrentFileSize: number
  ValidProof1Output: string
  ValidProof1Address: string
  ValidProof1Value: number
  ValidProof2Output: string
  ValidProof2Address: string
  ValidProof2Value: number
  MissedProof1Output: string
  MissedProof1Address: string
  MissedProof1Value: number
  MissedProof2Output: string
  MissedProof2Address: string
  MissedProof2Value: number
  MissedProof3Output: string
  MissedProof3Address: string
  MissedProof3Value: number
  Height: number
  Timestamp: number
  Status: string
  Renew: number
  AtomicRenewal: number
  RenewsContractId?: string
  SfFees: number
}

type RevisionInfo = {
  MasterHash: string
  ContractId: string
  Fees: number
  NewRevisionNum: number
  NewFileSize: number
  ValidProof1Address: string
  ValidProof1Value: number
  ValidProof2Address: string
  ValidProof2Value: number
  MissedProof1Address: string
  MissedProof1Value: number
  MissedProof2Address: string
  MissedProof2Value: number
  MissedProof3Address: string
  MissedProof3Value: number
  Height: number
  Timestamp: number
  HashSynonyms: string
}

type ContractResolution = {
  MasterHash: string
  ContractId: string
  Fees: number
  Result: string
  Height: number
  Timestamp: number
  Output0Address: string
  Output0Value: number
  Output1Address: string
  Output1Value: number
  Output2Address: string
  Output2Value: number
}

type StorageProofInfo = {
  MasterHash: string
  ContractId: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
}

export type AddressChange = {
  MasterHash: string
  Address: string
  ScChange: number
  SfChange: number
  Height: number
  Timestamp: number
  TxType: string
}

type UnconfirmedBalance = {
  Address: string
  TxHash: string
  Timestamp: number
  ScValue: number
  SfValue: number
  TxType: string
}

type HostAnnInfo = {
  TxHash: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
  IP: string
}

type TxInfo = {
  TxHash: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
}

export type BlockTransaction = {
  Height: number
  TxHash: string
  TxType: EntityType
  TotalAmountSc: number
  TotalAmountSf: number
}

type AddressInfo = {
  balanceSc: number
  receivedSc: number
  sentSc: number
  balanceSf: number
  TotalTxCount: number
  firstSeen: number | '-'
  last100Transactions: Pick<
    AddressChange,
    'MasterHash' | 'ScChange' | 'SfChange' | 'Height' | 'Timestamp' | 'TxType'
  >[]
  pendingSc: number
  pendingSf: number
  unconfirmedTransactions: Pick<
    UnconfirmedBalance,
    'ScValue' | 'SfValue' | 'TxType' | 'Timestamp' | 'TxHash'
  >[]
}

type OutputInfo = {
  OutputId: string
  ScValue: number
  SfValue: number
  Address: string
  CreatedOnBlock: number
  Spent: number
  SpentOnBlock: number
  FoundationUnclaimed: number
}

export type AddressEntity = {
  type: 'address'
  data: [EntityTypeInfo<'address'>, AddressInfo]
}

export type OutputEntity = {
  type: 'output'
  data: [EntityTypeInfo<'output'>, OutputInfo]
}

export type BlockEntity = {
  type: 'block'
  data: [
    EntityTypeInfo<'block'>,
    BlockInfo,
    {
      transactions: Pick<
        BlockTransaction,
        'TxHash' | 'TxType' | 'TotalAmountSc' | 'TotalAmountSf'
      >[]
    }
  ]
}

export type SimpleTxEntity<T extends EntityType> = {
  type: T
  data: [
    EntityTypeInfo<T>,
    Pick<TxInfo, 'HashSynonyms' | 'Height' | 'Timestamp' | 'Fees'>,
    {
      transactions: Pick<
        AddressChange,
        'Address' | 'ScChange' | 'SfChange' | 'TxType'
      >[]
    }
  ]
}
export type ScTxEntity = SimpleTxEntity<'ScTx'>
export type SfTxEntity = SimpleTxEntity<'SfTx'>
export type BlockRewardEntity = SimpleTxEntity<'blockreward'>
export type AllowancePostEntity = SimpleTxEntity<'allowancePost'>
export type CollateralPostEntity = SimpleTxEntity<'collateralPost'>

export type HostAnnEntity = {
  type: 'host ann'
  data: [
    // 0: type
    EntityTypeInfo<'host ann'>,
    // 1: hostanninfo
    (
      | Record<string, never>
      | Pick<
          HostAnnInfo,
          'HashSynonyms' | 'Height' | 'Timestamp' | 'Fees' | 'IP'
        >
    ),
    { transactions: Pick<AddressChange, 'Address' | 'ScChange' | 'SfChange'>[] }
  ]
}

export type ContractEntity = {
  type: 'contract'
  data: [
    // 0: type
    EntityTypeInfo<'contract'>,
    // 1: contract
    ContractInfo,
    // 2: revision
    Record<string, never> | RevisionInfo,
    // 3: resolution
    Record<string, never> | ContractResolution,
    // 4: storage proof
    Record<string, never> | StorageProofInfo,
    // 5: transactions
    { transactions: Pick<AddressChange, 'Address' | 'ScChange'>[] },
    // 6: atomic renewal
    Record<string, never> | ContractInfo
  ]
}

export type ContractResEntity = {
  type: 'contractresol'
  data: [
    // 0: type
    EntityTypeInfo<'contractresol'>,
    // 1: contractresolutions
    Record<string, never> | ContractResolution,
    { transactions: Pick<AddressChange, 'Address' | 'ScChange' | 'SfChange'>[] }
  ]
}

export type RevisionEntity = {
  type: 'revision'
  data: [
    // 0: type
    EntityTypeInfo<'revision'>,
    // 1: revisioninfo
    Record<string, never> | RevisionInfo,
    { transactions: Pick<AddressChange, 'Address' | 'ScChange' | 'SfChange'>[] }
  ]
}

export type StorageProofEntity = {
  type: 'storageproof'
  data: [
    // 0: type
    EntityTypeInfo<'storageproof'>,
    // 1: storageproofsinfo
    Record<string, never> | RevisionInfo,
    { transactions: Pick<AddressChange, 'Address' | 'ScChange' | 'SfChange'>[] }
  ]
}

export type UnconfirmedEntity = {
  type: 'unconfirmed'
  data: [
    // 0: type
    EntityTypeInfo<'unconfirmed'>
  ]
}

export type ErrorEntity = {
  type: 'error'
  data: []
}

export type Entity =
  | AddressEntity
  | OutputEntity
  | BlockEntity
  | ScTxEntity
  | SfTxEntity
  | BlockRewardEntity
  | AllowancePostEntity
  | CollateralPostEntity
  | HostAnnEntity
  | ContractEntity
  | ContractResEntity
  | RevisionEntity
  | StorageProofEntity
  | UnconfirmedEntity
  | ErrorEntity

export type EntityTx =
  | ScTxEntity
  | SfTxEntity
  | BlockRewardEntity
  | AllowancePostEntity
  | CollateralPostEntity
  | HostAnnEntity
  | ContractEntity
  | ContractResEntity
  | RevisionEntity
  | StorageProofEntity

// Tx entity types that have a transactions list in the 2 index of their data array
export type EntityTxns2Index =
  | ScTxEntity
  | SfTxEntity
  | BlockRewardEntity
  | AllowancePostEntity
  | CollateralPostEntity
  | HostAnnEntity
  // | ContractEntity
  | ContractResEntity
  | RevisionEntity
  | StorageProofEntity

export type AddressUtxo = {
  hastings?: string
  output: string
  sf?: number
}

export type AddressUtxos = AddressUtxo[]
