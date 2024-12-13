import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function ContractsFiltersBar() {
  const { offset, limit, datasetFilteredTotal, datasetState } = useContracts()

  return (
    <div className="flex gap-2 justify-between w-full">
      <ContractsFilterMenu />
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={datasetState === 'loading'}
        total={datasetFilteredTotal}
      />
    </div>
  )
}
