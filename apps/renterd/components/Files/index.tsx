import { FilesDirectory } from '../FilesDirectory'
import { useSearchParams } from '@siafoundation/next'
import { FilesFlat } from '../FilesFlat'
import { useFilesManager } from '../../contexts/filesManager'

export function Files() {
  const { isViewingBuckets } = useFilesManager()
  const params = useSearchParams()

  if (params.get('view') === 'flat' && !isViewingBuckets) {
    return <FilesFlat />
  }

  return <FilesDirectory />
}
