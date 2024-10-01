import { ExplorerFileContract } from '@siafoundation/explored-types'

export enum CONTRACT_STATUS {
  IN_PROGRESS = 'in progress',
  OBLIGATION_SUCCESSFUL = 'obligation successful',
  OBLIGATION_FAILURE = 'obligation failure',
}
export function determineContractStatus({
  resolved,
  valid,
  fileContract: { validProofOutputs, missedProofOutputs },
}: ExplorerFileContract) {
  if (!resolved) return CONTRACT_STATUS.IN_PROGRESS

  const successful =
    valid || validProofOutputs?.[1].value === missedProofOutputs?.[1].value

  return successful
    ? CONTRACT_STATUS.OBLIGATION_SUCCESSFUL
    : CONTRACT_STATUS.OBLIGATION_FAILURE
}
