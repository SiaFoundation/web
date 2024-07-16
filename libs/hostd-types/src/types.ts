import type {
  Currency,
  FileContractID,
  Hash256,
  SiacoinOutput,
  Signature,
  Transaction,
  UnlockConditions,
} from '@siafoundation/types'

export interface WalletTransaction {
  id: string
  index: {
    id: string
    height: number
  }
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
