import {
  FileContractID,
  Hash256,
  Signature,
  UnlockConditions,
  SiacoinOutput,
} from '@siafoundation/types'
import {
  ContractFilterSortField,
  ContractStatus,
} from '@siafoundation/hostd-types'
import BigNumber from 'bignumber.js'

export type ContractData = {
  id: string
  revision: {
    parentID: FileContractID
    unlockConditions: UnlockConditions
    filesize: BigNumber
    fileMerkleRoot: Hash256
    windowStart: number
    windowEnd: number
    payout: BigNumber
    remainingRenterFunds: BigNumber
    validProofOutputs: SiacoinOutput[]
    missedProofOutputs: SiacoinOutput[]
    unlockHash: Hash256
    revisionNumber: number
  }
  usage: {
    total: BigNumber
    accountFunding: BigNumber
    egress: BigNumber
    ingress: BigNumber
    riskedCollateral: BigNumber
    rpc: BigNumber
    storage: BigNumber
  }

  hostSignature: Signature
  renterSignature: Signature

  status: ContractStatus
  lockedCollateral: BigNumber
  negotiationHeight: number
  formationConfirmed: boolean
  revisionConfirmed: boolean
  payoutHeight: number
  contractHeightStart: number
  contractHeightEnd: number
  resolutionHeight: number
  renewedTo: FileContractID
  renewedFrom: FileContractID
  isRenewedTo: boolean
  isRenewedFrom: boolean
}

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'status'
  | 'usageTotal'
  | 'usageAccountFunding'
  | 'usageEgress'
  | 'usageIngress'
  | 'usageRiskedCollateral'
  | 'usageRpc'
  | 'usageStorage'
  | 'lockedCollateral'
  | 'timeline'
  | 'contractHeightStart'
  | 'contractHeightEnd'
  | 'payoutHeight'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'status',
  'usageTotal',
  'lockedCollateral',
  'timeline',
]

export type SortField =
  | 'status'
  | 'timeline'
  | 'contractHeightStart'
  | 'contractHeightEnd'

export const sortOptions: {
  id: SortField
  value: ContractFilterSortField
  label: string
  category: string
}[] = [
  {
    id: 'status',
    value: 'status',
    label: 'status',
    category: 'general',
  },
  {
    id: 'timeline',
    value: 'negotiationHeight',
    label: 'timeline',
    category: 'time',
  },
  {
    id: 'contractHeightStart',
    value: 'negotiationHeight',
    label: 'start height',
    category: 'time',
  },
  {
    id: 'contractHeightEnd',
    value: 'expirationHeight',
    label: 'expiration height',
    category: 'time',
  },
]

export const defaultSortField: SortField = 'timeline'
