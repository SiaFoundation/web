import { useApp } from '../../../contexts/app'
import { useIsApcsEqDcs } from '../../../hooks/useIsApcsEqDcs'

export function useContractSetMismatch() {
  const { autopilot } = useApp()
  const isApcsEqDcs = useIsApcsEqDcs()

  // warn about contract set mismatch
  const active =
    autopilot.status === 'on' && !isApcsEqDcs.isValidating && !isApcsEqDcs.data

  return {
    active,
  }
}
