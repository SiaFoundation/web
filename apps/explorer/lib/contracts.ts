import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerV2FileContract,
  FileContractID,
  SiacoinOutput,
} from '@siafoundation/explored-types'
import BigNumber from 'bignumber.js'

type ContractStatus = 'active' | 'complete' | 'failed' | 'renewed' | 'invalid'

export function determineV1ContractStatus({
  resolved,
  valid,
  validProofOutputs,
  missedProofOutputs,
}: ExplorerFileContract): ContractStatus {
  if (!resolved) return 'active'

  const successful =
    valid || validProofOutputs?.[1].value === missedProofOutputs?.[1].value

  return successful ? 'complete' : 'failed'
}

export function determineV2ContractStatus(
  contract: ExplorerV2FileContract,
  currentHeight: number
): ContractStatus {
  const {
    resolutionType,
    v2FileContract: { expirationHeight, hostOutput, missedHostValue },
  } = contract

  switch (resolutionType) {
    case 'storage_proof':
      return 'complete'
    case 'renewal':
      return 'renewed'
    default:
      if (expirationHeight > currentHeight) return 'active'
      return hostOutput.value === missedHostValue ? 'complete' : 'failed'
  }
}

export function determineContractStatusColor(status: ContractStatus) {
  switch (status) {
    case 'complete':
    case 'renewed':
    case 'active':
      return 'green'
    case 'failed':
    case 'invalid':
      return 'red'
  }
}

export type ContractData = {
  version: 'v2' | 'v1'
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
  contract: ExplorerFileContract | ExplorerV2FileContract,
  currentHeight: number
): ContractData {
  if ('v2FileContract' in contract) {
    return {
      version: 'v2',
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
      status: determineV2ContractStatus(contract, currentHeight),
      transactionID: contract.transactionID,

      resolutionIndex: contract.resolutionIndex,
      resolutionTransactionID: contract.resolutionTransactionID,
    }
  }
  return {
    version: 'v1',
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

export const contractResolutionLabels = {
  storage_proof: 'Storage Proof',
  expiration: 'Contract Expiration',
  renewal: 'Contract Renewal',
}
