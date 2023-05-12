import {
  SiacoinOutput,
  Transaction,
  UnlockConditions,
  Hash256,
  Signature,
  Currency,
  FileContractID,
} from '@siafoundation/react-core'

export interface WalletTransaction {
  ID: string
  index: string // ChainIndex
  inflow: Currency
  outflow: Currency
  source: string
  timestamp: string
  transaction: Transaction
}

export type ContractStatus =
  | 'pending'
  | 'active'
  | 'rejected'
  | 'failed'
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
