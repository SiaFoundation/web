import { useFiles } from '../../contexts/files'
import { useAutopilotNotConfigured } from './checks/useAutopilotNotConfigured'

export function useCanUpload() {
  const { isViewingABucket } = useFiles()
  const autopilotNotConfigured = useAutopilotNotConfigured()
  return isViewingABucket && !autopilotNotConfigured.active
}
