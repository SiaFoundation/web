import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useKeys } from '../../../contexts/keys'

export function KeysStatsMenu() {
  const { limit, offset, datasetCount, pageCount, dataState } = useKeys()
  return (
    <div className="flex w-full">
      <div className="flex-1" />
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        datasetTotal={datasetCount}
        pageTotal={pageCount}
        isLoading={dataState === 'loading'}
      />
    </div>
  )
}
