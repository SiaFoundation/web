import { PaginatorUnknownTotal } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { FilesStatsMenuShared } from '../../Files/FilesStatsMenuShared'
import { FilesFilterDirectoryMenu } from '../../Files/FilesFilterDirectoryMenu'

export function FilesStatsMenu() {
  const {
    limit,
    offset,
    pageCount,
    dataState,
    isViewingABucket,
    isViewingBuckets,
  } = useFilesDirectory()
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
