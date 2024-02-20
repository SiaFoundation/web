import { FilesDirectory } from '../FilesDirectory'
import { FilesFlat } from '../FilesFlat'
import { useFilesManager } from '../../contexts/filesManager'

export function Files() {
  const { isViewingBuckets, activeExplorerMode } = useFilesManager()

  if (activeExplorerMode === 'directory' || isViewingBuckets) {
    return <FilesDirectory />
  }

  return <FilesFlat />
}
