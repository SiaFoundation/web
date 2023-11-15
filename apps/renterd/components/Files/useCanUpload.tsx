import { useFiles } from '../../contexts/files'
import { useAutopilotNotConfigured } from './checks/useAutopilotNotConfigured'
import { useNotEnoughContracts } from './checks/useNotEnoughContracts'

export function useCanUpload() {
  const { isViewingABucket } = useFiles()
  const autopilotNotConfigured = useAutopilotNotConfigured()
  const notEnoughContracts = useNotEnoughContracts()
  return (
    isViewingABucket &&
    !autopilotNotConfigured.active &&
    !notEnoughContracts.active
  )
}
