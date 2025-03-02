import {
  Address,
  ChainIndex,
  Currency,
  Hash256,
  MerkleProof,
  PublicKey,
  SiacoinElement,
  SiacoinOutput,
  SiafundElement,
  SiafundOutput,
  Signature,
  StateElement,
  UnlockConditions,
} from './core'

export type SpendPolicy = {
  type: 'uc'
  policy: UnlockConditions
}

export type V2SiacoinInput = {
  parent: SiacoinElement
  satisfiedPolicy: SatisfiedPolicy
}

export interface V2TransactionInput {
  satisfiedPolicy: SatisfiedPolicy
}

export type V2SiafundInput = {
  parent: SiafundElement
  claimAddress: Address
  satisfiedPolicy: SatisfiedPolicy
}

export type V2FileContractRevision = {
  parent: V2FileContractElement
  revision: V2FileContract
}

export type V2FileContract = {
  filesize: number
  fileMerkleRoot: Hash256
  proofHeight: number
  expirationHeight: number
  renterOutput: SiacoinOutput
  hostOutput: SiacoinOutput
  missedHostValue: Currency
  totalCollateral: Currency
  renterPublicKey: PublicKey
  hostPublicKey: PublicKey
  revisionNumber: number
  renterSignature?: Signature
  hostSignature?: Signature
}

export type V2FileContractResolution = {
  parent: V2FileContractElement
  resolution: V2FileContractResolutionType
}

export type V2FileContractRenewal = {
  finalRevision: V2FileContract
  initialRevision: V2FileContract
  renterRollover: Currency
  hostRollover: Currency
  renterSignature?: Signature
  hostSignature?: Signature
}

export type V2Transaction = {
  siacoinInputs?: V2SiacoinInput[]
  siacoinOutputs?: SiacoinOutput[]
  siafundInputs?: V2SiafundInput[]
  siafundOutputs?: SiafundOutput[]
  fileContracts?: V2FileContract[]
  fileContractRevisions?: V2FileContractRevision[]
  fileContractResolutions?: V2FileContractResolution[]
  attestations?: Attestation[]
  arbitraryData?: Uint8Array
  newFoundationAddress?: Address
  minerFee: Currency
}

export type Attestation = {
  publicKey: PublicKey
  key: string
  value: Uint8Array
  signature: Signature
}

export type SatisfiedPolicy = {
  policy: SpendPolicy
  signatures?: Signature[]
  preimages?: string[]
}

export type V2FileContractElement = StateElement & {
  v2FileContract: V2FileContract
}

export type AttestationElement = StateElement & {
  attestation: Attestation
}

type V2FileContractResolutionTypeBase = {
  parent: V2FileContractElement
}

export type V2FileContractResolutionTypeExpiration =
  V2FileContractResolutionTypeBase & {
    type: 'expiration'
    resolution: Record<string, never> // is this always empty for expiration type?
  }
export type V2FileContractResolutionTypeFinalization =
  V2FileContractResolutionTypeBase & {
    type: 'finalization'
    resolution: V2FileContract
  }

export type V2FileContractResolutionTypeRenewal =
  V2FileContractResolutionTypeBase & {
    type: 'renewal'
    resolution: {
      finalRevision: V2FileContract
      newContract: V2FileContract
      renterRollover: Currency
      hostRollover: Currency
      renterSignature: Signature
      hostSignature: Signature
    }
  }

export type V2FileContractResolutionDataStorageProof =
  V2FileContractResolutionTypeBase & {
    type: 'storage proof'
    resolution: {
      proofIndex: StateElement & {
        chainIndex: ChainIndex
      }
      leaf: string
      proof: MerkleProof
    }
  }

export type V2FileContractResolutionType =
  | V2FileContractResolutionTypeExpiration
  | V2FileContractResolutionTypeFinalization
  | V2FileContractResolutionTypeRenewal
  | V2FileContractResolutionDataStorageProof
