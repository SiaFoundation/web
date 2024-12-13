import { PaginatorMarker } from '@siafoundation/design-system'
import { useFilesFlat } from '../../../contexts/filesFlat'
import { FilesFilterDirectoryMenu } from '../../Files/FilesFilterDirectoryMenu'
import { FilesStatsMenuShared } from '../../Files/FilesStatsMenuShared'

export function FilesFlatStatsMenu() {
  const { limit, datasetPageTotal, datasetState, marker, nextMarker, isMore } =
    useFilesFlat()
  return (
    <div className="flex gap-3 w-full">
      <FilesFilterDirectoryMenu placeholder="Filter files in current bucket" />
      <FilesStatsMenuShared />
      <PaginatorMarker
        marker={marker}
        nextMarker={nextMarker}
        isMore={isMore}
        limit={limit}
        pageTotal={datasetPageTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
