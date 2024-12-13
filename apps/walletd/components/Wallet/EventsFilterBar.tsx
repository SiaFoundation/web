import { PaginatorUnknownTotal } from '@siafoundation/design-system'
import { useEvents } from '../../contexts/events'

export function EventsFilterBar() {
  const { offset, limit, datasetPageTotal, datasetState } = useEvents()
  return (
    <div className="flex gap-2 w-full">
      <div className="flex-1" />
      <PaginatorUnknownTotal
        offset={offset}
        limit={limit}
        pageTotal={datasetPageTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
