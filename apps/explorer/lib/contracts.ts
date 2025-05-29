import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerV2FileContract,
  ExplorerV2FileContractResolutionType,
  FileContractID,
  SiacoinOutput,
} from '@siafoundation/explored-types'
import BigNumber from 'bignumber.js'

export const CONTRACT_STATUS = {
  IN_PROGRESS: 'in progress',
  COMPLETE: 'complete',
  FAILED: 'failed',
  RENEWED: 'renewed',
  INVALID: 'invalid',
} as const

type ObjectValues<T> = T[keyof T]

type ContractStatus = ObjectValues<typeof CONTRACT_STATUS>

export function determineV1ContractStatus({
  resolved,
  valid,
  validProofOutputs,
  missedProofOutputs,
}: ExplorerFileContract): ContractStatus {
  if (!resolved) return 'in progress'

  const successful =
    valid || validProofOutputs?.[1].value === missedProofOutputs?.[1].value

  return successful ? 'complete' : 'failed'
}

export function determineV2ContractStatus(
  status?: ExplorerV2FileContractResolutionType | 'invalid'
): ContractStatus {
  if (!status) return 'in progress'
  switch (status) {
    case 'expiration':
      return 'failed'
    case 'storage_proof':
      return 'complete'
    case 'renewal':
      return 'renewed'
    case 'invalid':
      return 'invalid'
  }
}

export function determineContractStatusColor(status: ContractStatus) {
  switch (status) {
    case 'complete':
    case 'renewed':
    case 'in progress':
      return 'green'
    case 'failed':
    case 'invalid':
      return 'red'
  }
}

export type ContractData = {
  confirmationIndex: ChainIndex
  fileMerkleRoot: string
  filesize: number
  hostBurned: SiacoinOutput | undefined
  hostPayoutValid: SiacoinOutput
  hostPayoutMissed: SiacoinOutput
  id: string
  payout: string
  renewedFromContractID: FileContractID | undefined
  renewedToContractID: FileContractID | undefined
  renterPayoutMissed: SiacoinOutput
  renterPayoutValid: SiacoinOutput
  resolutionWindowStart: number
  resolutionWindowEnd: number
  revisionNumber: number
  status: ContractStatus
  transactionID: string
  resolutionIndex?: ChainIndex
  resolutionTransactionID?: string
  unlockHash?: string
}

export function normalizeContract(
  contract: ExplorerFileContract | ExplorerV2FileContract
): ContractData {
  if ('v2FileContract' in contract) {
    return {
      confirmationIndex: contract.confirmationIndex,
      fileMerkleRoot: contract.v2FileContract.fileMerkleRoot,
      filesize: contract.v2FileContract.filesize,
      hostBurned: undefined,
      hostPayoutMissed: {
        address: contract.v2FileContract.hostOutput.address,
        value: contract.v2FileContract.missedHostValue,
      },
      hostPayoutValid: contract.v2FileContract.hostOutput,
      id: contract.id,
      payout: new BigNumber(contract.v2FileContract.hostOutput.value)
        .plus(contract.v2FileContract.renterOutput.value)
        .toString(),
      renewedFromContractID: contract.renewedFrom,
      renewedToContractID: contract.renewedTo,
      renterPayoutMissed: contract.v2FileContract.renterOutput,
      renterPayoutValid: contract.v2FileContract.renterOutput,
      resolutionWindowStart: contract.v2FileContract.proofHeight,
      resolutionWindowEnd: contract.v2FileContract.expirationHeight,
      revisionNumber: contract.v2FileContract.revisionNumber,
      status: determineV2ContractStatus(contract.resolutionType),
      transactionID: contract.transactionID,

      resolutionIndex: contract.resolutionIndex,
      resolutionTransactionID: contract.resolutionTransactionID,
    }
  }
  return {
    confirmationIndex: contract.confirmationIndex,
    fileMerkleRoot: contract.fileMerkleRoot,
    filesize: contract.filesize,
    hostBurned: contract.validProofOutputs[0],
    hostPayoutMissed: contract.missedProofOutputs[0],
    hostPayoutValid: contract.validProofOutputs[1],
    id: contract.id,
    payout: contract.payout,
    renewedFromContractID: undefined,
    renewedToContractID: undefined,
    renterPayoutMissed: contract.missedProofOutputs[1],
    renterPayoutValid: contract.validProofOutputs[1],
    resolutionWindowStart: contract.windowStart,
    resolutionWindowEnd: contract.windowEnd,
    revisionNumber: contract.revisionNumber,
    status: determineV1ContractStatus(contract),
    transactionID: contract.transactionID,

    resolutionIndex: contract.proofIndex,
    resolutionTransactionID: contract.proofTransactionID,
    unlockHash: contract.unlockHash,
  }
}
