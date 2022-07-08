export type NvgEntityType =
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

export const nvgEntityTypes = [
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

const nvgEntityTypeMap: Record<NvgEntityType, string> = {
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

const nvgEntityTypeInitialsMap: Record<NvgEntityType, string> = {
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

export function getNvgEntityTypeLabel(txType: NvgEntityType): string {
  return nvgEntityTypeMap[txType]
}

export function getNvgEntityTypeInitials(txType: NvgEntityType): string {
  return nvgEntityTypeInitialsMap[txType]
}

export type NvgEntityTypeInfo<T extends NvgEntityType> = {
  Type: T
  MasterHash: string
}

export type NvgBlockInfo = {
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

type NvgContractInfo = {
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

type NvgRevisionInfo = {
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

type NvgContractResolution = {
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

type NvgStorageProofInfo = {
  MasterHash: string
  ContractId: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
}

export type NvgAddressChange = {
  MasterHash: string
  Address: string
  ScChange: number
  SfChange: number
  Height: number
  Timestamp: number
  TxType: NvgEntityType
}

type NvgUnconfirmedBalance = {
  Address: string
  TxHash: string
  Timestamp: number
  ScValue: number
  SfValue: number
  TxType: NvgEntityType
}

type NvgHostAnnInfo = {
  TxHash: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
  IP: string
}

type NvgTxInfo = {
  TxHash: string
  HashSynonyms: string
  Height: number
  Timestamp: number
  Fees: number
}

export type BlockTransaction = {
  Height: number
  TxHash: string
  TxType: NvgEntityType
  TotalAmountSc: number
  TotalAmountSf: number
}

type NvgAddressInfo = {
  balanceSc: number
  receivedSc: number
  sentSc: number
  balanceSf: number
  TotalTxCount: number
  firstSeen: number | '-'
  last100Transactions: Pick<
    NvgAddressChange,
    'MasterHash' | 'ScChange' | 'SfChange' | 'Height' | 'Timestamp' | 'TxType'
  >[]
  pendingSc: number
  pendingSf: number
  unconfirmedTransactions: Pick<
    NvgUnconfirmedBalance,
    'ScValue' | 'SfValue' | 'TxType' | 'Timestamp' | 'TxHash'
  >[]
}

type NvgOutputInfo = {
  OutputId: string
  ScValue: number
  SfValue: number
  Address: string
  CreatedOnBlock: number
  Spent: number
  SpentOnBlock: number
  FoundationUnclaimed: number
}

export type NvgAddressEntity = {
  type: 'address'
  data: [NvgEntityTypeInfo<'address'>, NvgAddressInfo]
}

export type NvgOutputEntity = {
  type: 'output'
  data: [NvgEntityTypeInfo<'output'>, NvgOutputInfo]
}

export type NvgBlockEntity = {
  type: 'block'
  data: [
    NvgEntityTypeInfo<'block'>,
    NvgBlockInfo,
    {
      transactions: Pick<
        BlockTransaction,
        'TxHash' | 'TxType' | 'TotalAmountSc' | 'TotalAmountSf'
      >[]
    }
  ]
}

export type NvgSimpleTxEntity<T extends NvgEntityType> = {
  type: T
  data: [
    NvgEntityTypeInfo<T>,
    Pick<NvgTxInfo, 'HashSynonyms' | 'Height' | 'Timestamp' | 'Fees'>,
    {
      transactions: Pick<
        NvgAddressChange,
        'Address' | 'ScChange' | 'SfChange' | 'TxType'
      >[]
    }
  ]
}
export type NvgScTxEntity = NvgSimpleTxEntity<'ScTx'>
export type NvgSfTxEntity = NvgSimpleTxEntity<'SfTx'>
export type NvgBlockRewardEntity = NvgSimpleTxEntity<'blockreward'>
export type NvgAllowancePostEntity = NvgSimpleTxEntity<'allowancePost'>
export type NvgCollateralPostEntity = NvgSimpleTxEntity<'collateralPost'>

export type NvgHostAnnEntity = {
  type: 'host ann'
  data: [
    // 0: type
    NvgEntityTypeInfo<'host ann'>,
    // 1: hostanninfo
    (
      | Record<string, never>
      | Pick<
          NvgHostAnnInfo,
          'HashSynonyms' | 'Height' | 'Timestamp' | 'Fees' | 'IP'
        >
    ),
    {
      transactions: Pick<
        NvgAddressChange,
        'Address' | 'ScChange' | 'SfChange'
      >[]
    }
  ]
}

export type NvgContractEntity = {
  type: 'contract'
  data: [
    // 0: type
    NvgEntityTypeInfo<'contract'>,
    // 1: contract
    NvgContractInfo,
    // 2: revision
    Record<string, never> | NvgRevisionInfo,
    // 3: resolution
    Record<string, never> | NvgContractResolution,
    // 4: storage proof
    Record<string, never> | NvgStorageProofInfo,
    // 5: transactions
    { transactions: Pick<NvgAddressChange, 'Address' | 'ScChange'>[] },
    // 6: atomic renewal
    Record<string, never> | NvgContractInfo
  ]
}

export type NvgContractResEntity = {
  type: 'contractresol'
  data: [
    // 0: type
    NvgEntityTypeInfo<'contractresol'>,
    // 1: contractresolutions
    Record<string, never> | NvgContractResolution,
    {
      transactions: Pick<
        NvgAddressChange,
        'Address' | 'ScChange' | 'SfChange'
      >[]
    }
  ]
}

export type NvgRevisionEntity = {
  type: 'revision'
  data: [
    // 0: type
    NvgEntityTypeInfo<'revision'>,
    // 1: revisioninfo
    Record<string, never> | NvgRevisionInfo,
    {
      transactions: Pick<
        NvgAddressChange,
        'Address' | 'ScChange' | 'SfChange'
      >[]
    }
  ]
}

export type NvgStorageProofEntity = {
  type: 'storageproof'
  data: [
    // 0: type
    NvgEntityTypeInfo<'storageproof'>,
    // 1: storageproofsinfo
    Record<string, never> | NvgRevisionInfo,
    {
      transactions: Pick<
        NvgAddressChange,
        'Address' | 'ScChange' | 'SfChange'
      >[]
    }
  ]
}

export type NvgUnconfirmedEntity = {
  type: 'unconfirmed'
  data: [
    // 0: type
    NvgEntityTypeInfo<'unconfirmed'>
  ]
}

export type NvgErrorEntity = {
  type: 'error'
  data: []
}

export type Entity =
  | NvgAddressEntity
  | NvgOutputEntity
  | NvgBlockEntity
  | NvgScTxEntity
  | NvgSfTxEntity
  | NvgBlockRewardEntity
  | NvgAllowancePostEntity
  | NvgCollateralPostEntity
  | NvgHostAnnEntity
  | NvgContractEntity
  | NvgContractResEntity
  | NvgRevisionEntity
  | NvgStorageProofEntity
  | NvgUnconfirmedEntity
  | NvgErrorEntity

export type NvgEntityTx =
  | NvgScTxEntity
  | NvgSfTxEntity
  | NvgBlockRewardEntity
  | NvgAllowancePostEntity
  | NvgCollateralPostEntity
  | NvgHostAnnEntity
  | NvgContractEntity
  | NvgContractResEntity
  | NvgRevisionEntity
  | NvgStorageProofEntity

// Tx entity types that have a transactions list in the 2 index of their data array
export type NvgEntityTxns2Index =
  | NvgScTxEntity
  | NvgSfTxEntity
  | NvgBlockRewardEntity
  | NvgAllowancePostEntity
  | NvgCollateralPostEntity
  | NvgHostAnnEntity
  // | ContractEntity
  | NvgContractResEntity
  | NvgRevisionEntity
  | NvgStorageProofEntity

export type NvgAddressUtxo = {
  hastings?: string
  output: string
  sf?: number
}

export type NvgAddressUtxos = NvgAddressUtxo[]
