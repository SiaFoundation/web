import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { useContracts } from '../../contexts/contracts'

export function ContractsActionsMenu() {
  const { dataState, offset, limit, datasetCount, pageCount } = useContracts()

  return (
    <div className="flex gap-2">
      <PaginatorKnownTotal
        isLoading={dataState === 'loading'}
        offset={offset}
        limit={limit}
        datasetTotal={datasetCount}
        pageTotal={pageCount}
      />
      <ContractsViewDropdownMenu />
    </div>
  )
}
