import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useKeys } from '../../../contexts/keys'

export function KeysStatsMenu() {
  const { limit, offset, datasetTotal, datasetState } = useKeys()
  return (
    <div className="flex w-full">
      <div className="flex-1" />
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        total={datasetTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
