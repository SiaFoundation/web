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
  id: string
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
    ParentID: FileContractID
    UnlockConditions: UnlockConditions
    Filesize: number
    FileMerkleRoot: Hash256
    WindowStart: number
    WindowEnd: number
    Payout: Currency
    ValidProofOutputs: SiacoinOutput[]
    MissedProofOutputs: SiacoinOutput[]
    UnlockHash: Hash256
    RevisionNumber: number
  }

  hostSignature: Signature
  renterSignature: Signature

  status: ContractStatus
  lockedCollateral: Currency
  usage: number
  // NegotiationHeight is the height the contract was negotiated at.
  negotiationHeight: number
  // FormationConfirmed is true if the contract formation transaction
  // has been confirmed on the blockchain.
  formationConfirmed: boolean
  // RevisionConfirmed is true if the contract revision transaction has
  // been confirmed on the blockchain.
  revisionConfirmed: boolean
  // ResolutionConfirmed is true if the contract's resolution has been
  // confirmed on the blockchain.
  resolutionConfirmed: boolean
  // RenewedTo is the ID of the contract that renewed this contract. If
  // this contract was not renewed, this field is the zero value.
  renewedTo: FileContractID
  // RenewedFrom is the ID of the contract that this contract renewed. If
  // this contract is not a renewal, the field is the zero value.
  renewedFrom: FileContractID
}
