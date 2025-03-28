import { FileContractID, Hash256 } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { V2ContractFilterSortField } from '@siafoundation/hostd-types'

export type ContractData = {
  id: string
  version: 1 | 2
  filesize: BigNumber
  fileMerkleRoot: Hash256
  payout: BigNumber | null
  remainingRenterFunds: BigNumber
  usage: {
    total: BigNumber
    accountFunding: BigNumber
    egress: BigNumber
    ingress: BigNumber
    riskedCollateral: BigNumber
    rpc: BigNumber
    storage: BigNumber
  }
  status:
    | 'pending'
    | 'active'
    | 'rejected'
    | 'failed'
    | 'renewed'
    | 'successful'
  lockedCollateral: BigNumber
  negotiationHeight: number
  formationConfirmed: boolean
  revisionConfirmed: boolean
  payoutHeight: number
  contractHeightStart: number
  contractHeightEnd: number
  resolutionHeight: number
  proofWindowHeightStart: number
  proofWindowHeightEnd: number
  renewedTo: FileContractID
  renewedFrom: FileContractID
  isRenewedTo: boolean
  isRenewedFrom: boolean
}

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'status'
  | 'version'
  | 'usageTotal'
  | 'usageAccountFunding'
  | 'usageEgress'
  | 'usageIngress'
  | 'usageRiskedCollateral'
  | 'usageRpc'
  | 'usageStorage'
  | 'lockedCollateral'
  | 'timeline'
  | 'negotiationHeight'
  | 'contractHeightStart'
  | 'contractHeightEnd'
  | 'payoutHeight'
  | 'resolutionHeight'

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
  | 'negotiationHeight'
  | 'proofWindowHeightEnd'

export const sortOptions: {
  id: SortField
  label: string
  category: string
  serverId: V2ContractFilterSortField
}[] = [
  {
    id: 'status',
    serverId: 'status',
    label: 'status',
    category: 'general',
  },
  {
    id: 'timeline',
    serverId: 'negotiationHeight',
    label: 'timeline',
    category: 'time',
  },
  {
    id: 'negotiationHeight',
    serverId: 'negotiationHeight',
    label: 'negotiation height',
    category: 'time',
  },
  {
    id: 'proofWindowHeightEnd',
    serverId: 'expirationHeight',
    label: 'expiration height',
    category: 'time',
  },
]

export const defaultSortField: SortField = 'timeline'
