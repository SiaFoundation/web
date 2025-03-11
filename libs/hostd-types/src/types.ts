import {
  SiacoinOutput,
  UnlockConditions,
  Hash256,
  Signature,
  Currency,
  FileContractID,
  V2FileContract,
  ChainIndex,
} from '@siafoundation/types'

export type ContractStatus =
  | 'pending'
  | 'active'
  | 'rejected'
  | 'failed'
  | 'successful'

export type V2ContractStatus =
  | 'pending'
  | 'active'
  | 'rejected'
  | 'failed'
  | 'renewed'
  | 'successful'

export type Contract = {
  revision: {
    parentID: FileContractID
    unlockConditions: UnlockConditions
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

  usage: {
    accountFunding: string
    egress: string
    ingress: string
    riskedCollateral: string
    rpc: string
    storage: string
  }

  hostSignature: Signature
  renterSignature: Signature

  status: ContractStatus
  lockedCollateral: Currency
  negotiationHeight: number
  formationConfirmed: boolean
  revisionConfirmed: boolean
  resolutionHeight: number
  renewedTo: FileContractID
  renewedFrom: FileContractID
}

export type Usage = {
  rpc: Currency
  storage: Currency
  egress: Currency
  ingress: Currency
  accountFunding: Currency
  collateral: Currency
}

export type V2Contract = V2FileContract & {
  id: FileContractID
  status: V2ContractStatus
  usage: Usage
  negotiationHeight: number
  revisionConfirmed: boolean
  formationIndex: ChainIndex
  resolutionHeight: ChainIndex
  renewedTo: FileContractID
  renewedFrom: FileContractID
}
