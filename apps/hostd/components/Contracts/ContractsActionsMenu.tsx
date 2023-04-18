import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { useContracts } from '../../contexts/contracts'

export function ContractsActionsMenu() {
  const { offset, limit, totalCount, pageCount, isLoading } = useContracts()

  return (
    <div className="flex gap-2">
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={isLoading}
        datasetTotal={totalCount}
        pageTotal={pageCount}
      />
      <ContractsViewDropdownMenu />
    </div>
  )
}
