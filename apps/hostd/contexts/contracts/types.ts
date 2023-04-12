import {
  FileContractID,
  Hash256,
  Signature,
  UnlockConditions,
  SiacoinOutput,
} from '@siafoundation/react-core'
import { ContractStatus } from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'

export type ContractData = {
  id: string
  revision: {
    parentID: FileContractID
    unlockConditions: UnlockConditions
    filesize: number
    fileMerkleRoot: Hash256
    windowStart: number
    windowEnd: number
    payout: BigNumber
    validProofOutputs: SiacoinOutput[]
    missedProofOutputs: SiacoinOutput[]
    unlockHash: Hash256
    revisionNumber: number
  }

  hostSignature: Signature
  renterSignature: Signature

  status: ContractStatus
  lockedCollateral: BigNumber
  usage: BigNumber
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

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'status'
  | 'usage'
  | 'lockedCollateral'
  | 'timeline'
  | 'negotiationHeight'
  | 'formationConfirmed'
  | 'revisionConfirmed'
  | 'resolutionConfirmed'
  | 'renewedTo'
  | 'renewedFrom'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'status',
  'usage',
  'lockedCollateral',
  'timeline',
  'negotiationHeight',
  'formationConfirmed',
  'revisionConfirmed',
  'resolutionConfirmed',
  'renewedTo',
  'renewedFrom',
]

export const columnsDefaultSort = 'contractId'
