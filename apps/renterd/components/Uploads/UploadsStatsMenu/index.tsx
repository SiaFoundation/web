import { Button, PaginatorMarker } from '@siafoundation/design-system'
import { useUploads } from '../../../contexts/uploads'

export function UploadsStatsMenu() {
  const {
    abortAll,
    limit,
    datasetPageTotal,
    datasetState,
    marker,
    nextMarker,
    hasMore,
  } = useUploads()
  return (
    <div className="flex gap-3 w-full">
      <div className="flex-1" />
      {datasetPageTotal > 0 && (
        <Button onClick={abortAll}>Abort ({datasetPageTotal})</Button>
      )}
      <PaginatorMarker
        marker={marker}
        nextMarker={nextMarker}
        isMore={hasMore}
        limit={limit}
        pageTotal={datasetPageTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
