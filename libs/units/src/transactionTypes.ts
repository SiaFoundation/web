import { V2FileContractResolution } from '@siafoundation/types'

export type TxType =
  | 'siacoin'
  | 'siafund'
  | 'storageProof'
  | 'contractFormation'
  | 'contractRevision'
  | 'contractRenewal'
  | 'contractRefresh'
  | 'contractExpiration'
  | 'contractFinalization'
  | 'contractPayout'
  | 'minerPayout'
  | 'siafundClaim'
  | 'foundationSubsidy'
  | 'hostAnnouncement'
  | 'arbitraryData'
  | 'unknown'

export function getV1TransactionType(txn: {
  storageProofs?: unknown[]
  fileContracts?: unknown[]
  fileContractRevisions?: unknown[]
  siacoinInputs?: unknown[]
  siafundInputs?: unknown[]
  siacoinOutputs?: unknown[]
  siafundOutputs?: unknown[]
  arbitraryData?: string[]
}): TxType {
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

export function getV2TransactionType(txn: {
  siafundOutputs?: unknown[]
  siacoinOutputs?: unknown[]
  fileContracts?: unknown[]
  arbitraryData?: Uint8Array
  fileContractResolutions?:
    | (
        | {
            type: 'renewal'
            parent: {
              v2FileContract: {
                proofHeight: number
                expirationHeight: number
              }
            }
            resolution: {
              newContract: {
                proofHeight: number
                expirationHeight: number
              }
            }
          }
        | {
            type: 'expiration' | 'finalization' | 'storageProof'
          }
      )[]
  fileContractRevisions?: {
    parent: {
      v2FileContract: {
        proofHeight: number
        expirationHeight: number
      }
    }
    revision: {
      proofHeight: number
      expirationHeight: number
    }
  }[]
  attestations?: {
    key: string
  }[]
}): TxType {
  if (txn.fileContractResolutions && txn.fileContractResolutions.length > 0) {
    const mapping: Record<V2FileContractResolution['type'], TxType> = {
      expiration: 'contractExpiration',
      finalization: 'contractFinalization',
      renewal: 'contractRenewal',
      storageProof: 'storageProof',
    }
    if (txn.fileContractResolutions[0].type === 'renewal') {
      const oldContract = txn.fileContractResolutions[0].parent.v2FileContract
      const newContract = txn.fileContractResolutions[0].resolution.newContract
      return oldContract.proofHeight === newContract.proofHeight &&
        oldContract.expirationHeight === newContract.expirationHeight
        ? 'contractRefresh'
        : 'contractRenewal'
    }
    return mapping[txn.fileContractResolutions[0].type]
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
  if (txn.arbitraryData && txn.arbitraryData.length > 0) {
    return 'arbitraryData'
  }

  return 'unknown'
}

const txTypeMap: Record<TxType, string> = {
  siacoin: 'siacoin transfer',
  siafund: 'siafund transfer',
  contractFormation: 'contract formation',
  contractRenewal: 'contract renewal',
  contractRefresh: 'contract refresh',
  contractRevision: 'contract revision',
  contractExpiration: 'contract expiration',
  contractFinalization: 'contract finalization',
  contractPayout: 'contract payout',
  storageProof: 'storage proof',
  minerPayout: 'miner payout',
  siafundClaim: 'siafund claim',
  foundationSubsidy: 'foundation subsidy',
  hostAnnouncement: 'host announcement',
  arbitraryData: 'arbitrary data',
  unknown: 'unknown transaction type',
}
export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}
