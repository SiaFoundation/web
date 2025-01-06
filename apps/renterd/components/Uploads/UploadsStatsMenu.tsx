import {
  Button,
  PaginatorKnownTotal,
  PaginatorMarker,
} from '@siafoundation/design-system'
import { useUploads } from '../../contexts/uploads'

export function UploadsStatsMenu() {
  const {
    activeData,
    abortAll,
    activeView,
    remoteUploads,
    localUploads,
    setActiveView,
  } = useUploads()

  const paginatorEl =
    activeView === 'globalUploads' ? (
      <PaginatorMarker
        marker={remoteUploads.marker}
        nextMarker={remoteUploads.nextMarker}
        isMore={remoteUploads.hasMore}
        limit={remoteUploads.limit}
        pageTotal={remoteUploads.datasetPageTotal}
        isLoading={remoteUploads.datasetState === 'loading'}
      />
    ) : (
      <PaginatorKnownTotal
        offset={localUploads.offset}
        limit={localUploads.limit}
        total={localUploads.datasetTotal}
        isLoading={localUploads.datasetState === 'loading'}
      />
    )

  return (
    <div className="flex gap-3 w-full">
      <Button
        onClick={() => setActiveView('localUploads')}
        variant={activeView === 'localUploads' ? 'active' : 'inactive'}
      >
        Local uploads
      </Button>
      <Button
        onClick={() => setActiveView('globalUploads')}
        variant={activeView === 'globalUploads' ? 'active' : 'inactive'}
      >
        All uploads
      </Button>
      <div className="flex-1" />
      {activeData.datasetPageTotal > 0 && (
        <Button onClick={abortAll}>
          Abort ({activeData.datasetPageTotal})
        </Button>
      )}
      {paginatorEl}
    </div>
  )
}
