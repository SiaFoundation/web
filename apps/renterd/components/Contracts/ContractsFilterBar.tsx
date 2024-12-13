import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function ContractsFilterBar() {
  const { datasetState, offset, limit, datasetFilteredTotal } = useContracts()

  return (
    <div className="flex gap-2 w-full">
      <ContractsFilterMenu />
      <div className="flex-1" />
      <PaginatorKnownTotal
        isLoading={datasetState === 'loading'}
        offset={offset}
        limit={limit}
        total={datasetFilteredTotal}
      />
    </div>
  )
}
