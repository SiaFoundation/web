import { Button, PaginatorMarker } from '@siafoundation/design-system'
import { useUploads } from '../../../contexts/uploads'

export function UploadsStatsMenu() {
  const { abortAll, limit, pageCount, dataState, nextMarker, hasMore } =
    useUploads()
  return (
    <div className="flex gap-3 w-full">
      <div className="flex-1" />
      {pageCount > 0 && <Button onClick={abortAll}>Abort ({pageCount})</Button>}
      <PaginatorMarker
        marker={nextMarker}
        isMore={hasMore}
        limit={limit}
        pageTotal={pageCount}
        isLoading={dataState === 'loading'}
      />
    </div>
  )
}
