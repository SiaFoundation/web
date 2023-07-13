import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function ContractsFiltersBar() {
  const { offset, limit, totalCount, pageCount, dataState } = useContracts()

  return (
    <div className="flex gap-2 justify-between w-full">
      <ContractsFilterMenu />
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={dataState === 'loading'}
        datasetTotal={totalCount}
        pageTotal={pageCount}
      />
    </div>
  )
}
