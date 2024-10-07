import { useIsApcsEqDcs } from '../../../hooks/useIsApcsEqDcs'
import { useApp } from '../../../contexts/app'

export function useContractSetMismatch() {
  const { isAutopilotEnabled } = useApp()
  const isApcsEqDcs = useIsApcsEqDcs()

  // warn about contract set mismatch
  const active =
    isAutopilotEnabled && !isApcsEqDcs.isValidating && !isApcsEqDcs.data

  return {
    active,
  }
}
