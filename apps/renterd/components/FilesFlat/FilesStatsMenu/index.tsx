import { PaginatorMarker } from '@siafoundation/design-system'
import { useFilesFlat } from '../../../contexts/filesFlat'
import { FilesFilterDirectoryMenu } from '../../Files/FilesFilterDirectoryMenu'
import { FilesStatsMenuShared } from '../../Files/FilesStatsMenuShared'

export function FilesStatsMenu() {
  const { limit, pageCount, dataState, nextMarker, isMore } = useFilesFlat()
  return (
    <div className="flex gap-3 w-full">
      <FilesFilterDirectoryMenu placeholder="Filter files in current bucket" />
      <FilesStatsMenuShared />
      <PaginatorMarker
        marker={nextMarker}
        isMore={isMore}
        limit={limit}
        pageTotal={pageCount}
        isLoading={dataState === 'loading'}
      />
    </div>
  )
}
