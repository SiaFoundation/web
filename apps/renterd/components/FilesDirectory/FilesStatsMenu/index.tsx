import { PaginatorUnknownTotal } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { FilesStatsMenuShared } from '../../Files/FilesStatsMenuShared'
import { FilesFilterDirectoryMenu } from '../../Files/FilesFilterDirectoryMenu'
import { useFilesManager } from '../../../contexts/filesManager'

export function FilesStatsMenu() {
  const { isViewingABucket, isViewingBuckets } = useFilesManager()
  const { limit, offset, pageCount, dataState } = useFilesDirectory()
  return (
    <div className="flex gap-3 w-full">
      {isViewingBuckets ? (
        <div className="flex-1" />
      ) : (
        <FilesFilterDirectoryMenu />
      )}
      <FilesStatsMenuShared />
      {isViewingABucket && (
        <PaginatorUnknownTotal
          offset={offset}
          limit={limit}
          pageTotal={pageCount}
          isLoading={dataState === 'loading'}
        />
      )}
    </div>
  )
}
