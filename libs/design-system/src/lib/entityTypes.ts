import { Transaction } from '@siafoundation/types'
import BigNumber from 'bignumber.js'

export type EntityType =
  | 'contract'
  | 'transaction'
  | 'block'
  | 'output'
  | 'address'
  | 'ip'
  | 'hostIp'
  | 'hostPublicKey'
  | 'contract'
  | 'blockHash'

export type TxType =
  | 'siacoin'
  | 'siafund'
  | 'storageProof'
  | 'contractFormation'
  | 'contractRevision'
  | 'contractRenewal'
  | 'contractPayout'
  | 'minerPayout'
  | 'siafundClaim'
  | 'foundationSubsidy'
  | 'hostAnnouncement'
// | 'block'
// | 'defrag'
// | 'setup'

export function getTransactionTotals(txn: Transaction) {
  const sc = (txn.siacoinOutputs || []).reduce(
    (acc, i) => acc.plus(i.value),
    new BigNumber(0)
  )
  const sf = (txn.siafundOutputs || []).reduce(
    (acc, i) => acc.plus(i.value),
    new BigNumber(0)
  )

  return {
    sc,
    sf: sf.toNumber(),
  }
}

export function getTransactionType(
  txn: Transaction,
  source?: string
): TxType | undefined {
  if (source === 'miner') {
    return 'minerPayout'
  }
  if (source === 'siafundClaim') {
    return 'siafundClaim'
  }
  if (source === 'contract') {
    return 'contractPayout'
  }
  if (source === 'foundation') {
    return 'foundationSubsidy'
  }
  if (txn.storageProofs && txn.storageProofs.length > 0) {
    return 'storageProof'
  }
  if (
    txn.fileContracts &&
    txn.fileContracts.length > 0 &&
    txn.fileContractRevisions &&
    txn.fileContractRevisions.length > 0
  ) {
    return 'contractRenewal'
  }
  if (txn.fileContractRevisions && txn.fileContractRevisions.length > 0) {
    return 'contractRevision'
  }
  if (txn.fileContracts && txn.fileContracts.length > 0) {
    return 'contractFormation'
  }
  if (
    txn.arbitraryData &&
    txn.arbitraryData.length > 0 &&
    atob(txn.arbitraryData[0]).indexOf('HostAnnouncement') === 0
  ) {
    return 'hostAnnouncement'
  }
  if (txn.siafundOutputs && txn.siafundOutputs.length > 0) {
    return 'siafund'
  }
  if (txn.siacoinOutputs && txn.siacoinOutputs.length > 0) {
    return 'siacoin'
  }

  return undefined

  // if (
  //   txn.siacoinOutputs &&
  //   txn.siacoinInputs?.length === 0 &&
  //   txn.siafundInputs?.length === 0
  // ) {
  //   return 'block'
  // }
  // if (
  //   (txn.siacoinInputs?.length || 0) >= 20 &&
  //   txn.siacoinOutputs?.length === 1
  // ) {
  //   return 'defrag'
  // }

  // return undefined
}

const entityLabels: Record<EntityType, string> = {
  transaction: 'transaction',
  contract: 'contract',
  block: 'block',
  output: 'output',
  address: 'address',
  hostIp: 'host',
  hostPublicKey: 'host',
  ip: 'IP',
  blockHash: 'block hash',
}

const entityCopyLabels: Record<EntityType, string> = {
  transaction: 'transaction ID',
  contract: 'contract ID',
  block: 'block',
  output: 'output ID',
  address: 'address',
  hostIp: 'host address',
  hostPublicKey: 'host public key',
  ip: 'IP',
  blockHash: 'block hash',
}

const txTypeMap: Record<TxType, string> = {
  siacoin: 'siacoin transfer',
  siafund: 'siafund transfer',
  contractFormation: 'contract formation',
  contractRenewal: 'contract renewal',
  contractRevision: 'contract revision',
  contractPayout: 'contract payout',
  storageProof: 'storage proof',
  minerPayout: 'miner payout',
  siafundClaim: 'siafund claim',
  foundationSubsidy: 'foundation subsidy',
  hostAnnouncement: 'host announcement',
  // block: 'block',
  // defrag: 'defrag',
  // setup: 'setup',
}

export function getEntityTypeLabel(type?: EntityType): string | undefined {
  return type ? entityLabels[type] : undefined
}

export function getEntityTypeCopyLabel(type?: EntityType): string | undefined {
  return type ? entityCopyLabels[type] : undefined
}

export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}

export function getEntityDisplayLength(type?: EntityType): number {
  const longList: EntityType[] = ['ip', 'hostIp']
  return type && longList.includes(type) ? 20 : 12
}

export function doesEntityHaveSiascanUrl(type?: EntityType) {
  const includeList: EntityType[] = [
    'hostIp',
    'hostPublicKey',
    'contract',
    'address',
    'transaction',
    'block',
  ]
  return type && includeList.includes(type)
}

export function getEntitySiascanUrl(
  baseUrl: string,
  type: EntityType,
  value: string
) {
  switch (type) {
    case 'hostIp':
      return `${baseUrl}/host/${value}`
    case 'hostPublicKey':
      return `${baseUrl}/host/${value}`
    case 'contract':
      return `${baseUrl}/contract/${value}`
    case 'transaction':
      return `${baseUrl}/tx/${value}`
    case 'address':
      return `${baseUrl}/address/${value}`
    case 'block':
      return `${baseUrl}/block/${value}`
    default:
      return ''
  }
}

export function defaultFormatValue(text: string, maxLength: number) {
  return `${text?.slice(0, maxLength)}${
    (text?.length || 0) > maxLength ? '...' : ''
  }`
}

export function formatEntityValue(
  type: EntityType,
  text: string,
  maxLength: number
) {
  switch (type) {
    case 'blockHash': {
      const halfMax = maxLength / 2
      // Floor and ceil here to handle odd maxLengths.
      // .slice() will round down on floats.
      const firstHalf = text.slice(0, Math.floor(halfMax))
      const lastHalf = text.slice(text.length - Math.ceil(halfMax))
      return firstHalf + '...' + lastHalf
    }
    default: {
      // We could also return null here, forcing the issue of defining
      // formats for the missing cases in the switch above.
      return defaultFormatValue(text, maxLength)
    }
  }
}
