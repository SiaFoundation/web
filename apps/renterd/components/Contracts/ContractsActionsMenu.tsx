import { Button } from '@siafoundation/design-system'
import { ChartArea16 } from '@siafoundation/react-icons'
import { useContracts } from '../../contexts/contracts'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'

export function ContractsActionsMenu() {
  const { setViewMode } = useContracts()
  return (
    <div className="flex gap-2">
      <Button
        tip="Toggle graphs"
        onClick={() =>
          setViewMode((mode) => (mode === 'detail' ? 'list' : 'detail'))
        }
      >
        <ChartArea16 />
      </Button>
      <ContractsViewDropdownMenu />
    </div>
  )
}
