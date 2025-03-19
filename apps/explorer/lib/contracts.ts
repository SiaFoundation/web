import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerV2FileContract,
  SiacoinOutput,
  SiacoinOutputID,
} from '@siafoundation/explored-types'
import BigNumber from 'bignumber.js'

export const CONTRACT_STATUS = {
  IN_PROGRESS: 'in progress',
  OBLIGATION_SUCCESSFUL: 'obligation succeeded',
  OBLIGATION_FAILURE: 'obligation failure',
} as const

type ObjectValues<T> = T[keyof T]

type ContractStatus = ObjectValues<typeof CONTRACT_STATUS>

export function determineContractStatus({
  resolved,
  valid,
  validProofOutputs,
  missedProofOutputs,
}: ExplorerFileContract): ContractStatus {
  if (!resolved) return 'in progress'

  const successful =
    valid || validProofOutputs?.[1].value === missedProofOutputs?.[1].value

  return successful ? 'obligation succeeded' : 'obligation failure'
}

export type ContractData = {
  confirmationIndex: ChainIndex
  fileMerkleRoot: string
  filesize: number
  hostBurned: (SiacoinOutput & { id: SiacoinOutputID }) | undefined
  hostPayoutValid: (SiacoinOutput & { id: SiacoinOutputID }) | SiacoinOutput
  hostPayoutMissed: (SiacoinOutput & { id: SiacoinOutputID }) | SiacoinOutput
  id: string
  payout: string
  renterPayoutMissed: (SiacoinOutput & { id: SiacoinOutputID }) | SiacoinOutput
  renterPayoutValid: (SiacoinOutput & { id: SiacoinOutputID }) | SiacoinOutput
  resolutionWindowStart: number
  resolutionWindowEnd: number
  revisionNumber: number
  status: string
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
        id: contract.v2FileContract.hostOutput.address,
        address: contract.v2FileContract.hostOutput.address,
        value: contract.v2FileContract.missedHostValue,
      },
      hostPayoutValid: contract.v2FileContract.hostOutput,
      id: contract.id,
      payout: new BigNumber(contract.v2FileContract.hostOutput.value)
        .plus(contract.v2FileContract.renterOutput.value)
        .toString(),
      renterPayoutMissed: contract.v2FileContract.renterOutput,
      renterPayoutValid: contract.v2FileContract.renterOutput,
      resolutionWindowStart: contract.v2FileContract.proofHeight,
      resolutionWindowEnd: contract.v2FileContract.expirationHeight,
      revisionNumber: contract.v2FileContract.revisionNumber,
      status: 'UNKNOWN',
      transactionID: contract.transactionID,

      resolutionIndex: contract.resolutionIndex,
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
    renterPayoutMissed: contract.missedProofOutputs[1],
    renterPayoutValid: contract.validProofOutputs[1],
    resolutionWindowStart: contract.windowStart,
    resolutionWindowEnd: contract.windowEnd,
    revisionNumber: contract.revisionNumber,
    status: determineContractStatus(contract),
    transactionID: contract.transactionID,
    resolutionIndex: contract.proofIndex,
    unlockHash: contract.unlockHash,
  }
}
