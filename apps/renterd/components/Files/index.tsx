import { useFilesManager } from '../../contexts/filesManager'
import { FilesDirectory } from '../FilesDirectory'
import { FilesFlat } from '../FilesFlat'

export function Files() {
  const { isViewingBuckets, activeExplorerMode } = useFilesManager()

  if (activeExplorerMode === 'directory' || isViewingBuckets) {
    return <FilesDirectory />
  }

  return <FilesFlat />
}
