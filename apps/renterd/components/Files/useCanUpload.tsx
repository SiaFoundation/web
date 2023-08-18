import { useAutopilotNotConfigured } from './checks/useAutopilotNotConfigured'
import { useNotEnoughContracts } from './checks/useNotEnoughContracts'

export function useCanUpload() {
  const autopilotNotConfigured = useAutopilotNotConfigured()
  const notEnoughContracts = useNotEnoughContracts()
  return !autopilotNotConfigured.active && !notEnoughContracts.active
}
