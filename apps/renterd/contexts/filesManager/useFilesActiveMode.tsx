import { useFilesManager } from './index'
import { useFilesFlat } from '../filesFlat'
import { useFilesDirectory } from '../filesDirectory'

/**
 * Returns the active files context based on the current explorer mode.
 * Uses filesFlat when in 'flat' mode and not viewing buckets,
 * otherwise uses filesDirectory.
 */
export function useFilesActiveMode() {
  const { activeExplorerMode, isViewingBuckets } = useFilesManager()
  const filesFlat = useFilesFlat()
  const filesDirectory = useFilesDirectory()
  return activeExplorerMode === 'flat' && !isViewingBuckets
    ? filesFlat
    : filesDirectory
}
