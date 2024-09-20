import {
  Transaction,
  V2FileContractResolutionType,
  V2Transaction,
} from '@siafoundation/types'

export type TxType =
  | 'siacoin'
  | 'siafund'
  | 'storageProof'
  | 'contractFormation'
  | 'contractRevision'
  | 'contractRenewal'
  | 'contractExpiration'
  | 'contractFinalization'
  | 'contractPayout'
  | 'minerPayout'
  | 'siafundClaim'
  | 'foundationSubsidy'
  | 'hostAnnouncement'
  | 'unknown'

export function getTransactionType(txn: Transaction): TxType {
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

  return 'unknown'
}

export function getV2TransactionType(txn: V2Transaction): TxType {
  if (txn.fileContractResolutions && txn.fileContractResolutions.length > 0) {
    const mapping: Record<V2FileContractResolutionType['type'], TxType> = {
      expiration: 'contractExpiration',
      finalization: 'contractFinalization',
      renewal: 'contractRenewal',
      'storage proof': 'storageProof',
    }
    return mapping[txn.fileContractResolutions[0].resolution.type]
  }
  if (txn.fileContractRevisions && txn.fileContractRevisions.length > 0) {
    return 'contractRevision'
  }
  if (txn.fileContracts && txn.fileContracts.length > 0) {
    return 'contractFormation'
  }
  const announcement = txn.attestations?.filter(
    (at) => at.key === 'HostAnnouncement'
  )
  if (announcement && announcement.length > 0) return 'hostAnnouncement'
  if (txn.siafundOutputs && txn.siafundOutputs.length > 0) {
    return 'siafund'
  }
  if (txn.siacoinOutputs && txn.siacoinOutputs.length > 0) {
    return 'siacoin'
  }

  return 'unknown'
}

const txTypeMap: Record<TxType, string> = {
  siacoin: 'siacoin transfer',
  siafund: 'siafund transfer',
  contractFormation: 'contract formation',
  contractRenewal: 'contract renewal',
  contractRevision: 'contract revision',
  contractExpiration: 'contract expiration',
  contractFinalization: 'contract finalization',
  contractPayout: 'contract payout',
  storageProof: 'storage proof',
  minerPayout: 'miner payout',
  siafundClaim: 'siafund claim',
  foundationSubsidy: 'foundation subsidy',
  hostAnnouncement: 'host announcement',
  unknown: 'unknown transaction type',
}
export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}
