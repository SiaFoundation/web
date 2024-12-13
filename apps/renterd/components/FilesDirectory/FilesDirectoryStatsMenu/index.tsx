import { PaginatorMarker } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { FilesStatsMenuShared } from '../../Files/FilesStatsMenuShared'
import { FilesFilterDirectoryMenu } from '../../Files/FilesFilterDirectoryMenu'
import { useFilesManager } from '../../../contexts/filesManager'

export function FilesDirectoryStatsMenu() {
  const { isViewingABucket, isViewingBuckets } = useFilesManager()
  const { limit, marker, nextMarker, isMore, datasetPageTotal, datasetState } =
    useFilesDirectory()
  return (
    <div className="flex gap-3 w-full">
      {isViewingBuckets ? (
        <div className="flex-1" />
      ) : (
        <FilesFilterDirectoryMenu />
      )}
      <FilesStatsMenuShared />
      {isViewingABucket && (
        <PaginatorMarker
          isMore={isMore}
          marker={marker}
          nextMarker={nextMarker}
          limit={limit}
          pageTotal={datasetPageTotal}
          isLoading={datasetState === 'loading'}
        />
      )}
    </div>
  )
}
