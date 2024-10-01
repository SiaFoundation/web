import { ExplorerFileContract } from '@siafoundation/explored-types'

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
