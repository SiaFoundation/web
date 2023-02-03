import { ControlGroup, Button, Close16 } from '@siafoundation/design-system'
import { Text } from '@siafoundation/design-system'
import { useContracts } from '../../hooks/useContracts'
import { ContractsFilterDropdownMenu } from './ContractsFilterDropdownMenu'

export function ContractsFilters() {
  const { filters, removeFilter } = useContracts()

  return (
    <div className="flex gap-2 flex-1">
      {Object.entries(filters).map(([key, filter]) => (
        <ControlGroup key={key}>
          <Button disabled>
            <Text size="12">{key}</Text>
          </Button>
          <Button disabled>
            <Text size="12" color="subtle">
              is
            </Text>
          </Button>
          <Button disabled>
            {filter.value && <Text size="12">{filter.value}</Text>}
            {filter.values && (
              <Text size="12">
                {filter.values.reduce((acc, val) => acc.concat(` or ${val}`))}
              </Text>
            )}
          </Button>
          <Button variant="gray" size="small" onClick={() => removeFilter(key)}>
            <Close16 />
          </Button>
        </ControlGroup>
      ))}
      <ContractsFilterDropdownMenu />
    </div>
  )
}
