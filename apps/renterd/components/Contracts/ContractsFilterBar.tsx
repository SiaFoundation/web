import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function ContractsFilterBar() {
  const { dataState, offset, limit, datasetCount, pageCount } = useContracts()

  return (
    <div className="flex gap-2 w-full">
      <ContractsFilterMenu />
      <div className="flex-1" />
      <PaginatorKnownTotal
        isLoading={dataState === 'loading'}
        offset={offset}
        limit={limit}
        datasetTotal={datasetCount}
        pageTotal={pageCount}
      />
    </div>
  )
}
