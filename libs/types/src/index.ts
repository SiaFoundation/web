export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type BlockHeight = number
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string
export type TransactionID = string
export type SiacoinOutputID = Hash256
export type SiafundOutputID = Hash256
export type Address = string

export type UnlockConditions = {
  timelock: number
  publicKeys?: PublicKey[]
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
  timelock: number
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

export type SiacoinElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
  siacoinOutput: SiacoinOutput
  maturityHeight: number
}

export type SiafundElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
  siafundOutput: SiafundOutput
  claimStart: string
}

export type SiafundElementAndClaim = {
  siafundElement: SiafundElement
  claimElement: SiacoinElement
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

export type FileContractElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
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
