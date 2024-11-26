import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useFilesManager } from '../../contexts/filesManager'
import { useNotEnoughContracts } from './checks/useNotEnoughContracts'

export function useCanUpload() {
  const { isViewingABucket } = useFilesManager()
  const syncStatus = useSyncStatus()
  const notEnoughContracts = useNotEnoughContracts()
  return isViewingABucket && !notEnoughContracts.active && syncStatus.isSynced
}
