import { Transaction } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type EntityType =
  | 'contract'
  | 'transaction'
  | 'block'
  | 'output'
  | 'address'
  | 'ip'
  | 'contract'

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

const entityTypeMap: Record<EntityType, string> = {
  transaction: 'transaction',
  contract: 'contract',
  block: 'block',
  output: 'output',
  address: 'address',
  ip: 'IP',
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
  return type ? entityTypeMap[type] : undefined
}

export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}
