import { ControlGroup, Button, Close16 } from '@siafoundation/design-system'
import { Text } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterDropdownMenu } from './ContractsFilterDropdownMenu'

export function ContractsFilters() {
  const { filters, removeFilter } = useContracts()
  return (
    <div className="flex gap-2 flex-1">
      {Object.entries(filters).map(([id, filter]) => (
        <ControlGroup key={id}>
          {/* <Button disabled>
            <Text size="12">{id}</Text>
          </Button>
          <Button disabled>
            <Text size="12" color="subtle">
              is
            </Text>
          </Button> */}
          <Button disabled>
            <Text size="12">{filter.label}</Text>
          </Button>
          <Button variant="gray" size="small" onClick={() => removeFilter(id)}>
            <Close16 />
          </Button>
        </ControlGroup>
      ))}
      <ContractsFilterDropdownMenu />
    </div>
  )
}
