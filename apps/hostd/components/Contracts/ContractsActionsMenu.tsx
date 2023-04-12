import { PaginatorUnknownTotal } from '@siafoundation/design-system'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { useContracts } from '../../contexts/contracts'

export function ContractsActionsMenu() {
  const { offset, limit, pageCount } = useContracts()

  return (
    <div className="flex gap-2">
      <PaginatorUnknownTotal
        offset={offset}
        limit={limit}
        pageTotal={pageCount}
      />
      <ContractsViewDropdownMenu />
    </div>
  )
}
