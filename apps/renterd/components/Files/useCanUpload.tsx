import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useFilesManager } from '../../contexts/filesManager'
import { useAutopilotNotConfigured } from './checks/useAutopilotNotConfigured'
import { useNotEnoughContracts } from './checks/useNotEnoughContracts'

export function useCanUpload() {
  const { isViewingABucket } = useFilesManager()
  const syncStatus = useSyncStatus()
  const autopilotNotConfigured = useAutopilotNotConfigured()
  const notEnoughContracts = useNotEnoughContracts()
  return (
    isViewingABucket &&
    !autopilotNotConfigured.active &&
    !notEnoughContracts.active &&
    syncStatus.isSynced
  )
}
