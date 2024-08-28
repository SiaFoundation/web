import { Text } from '@siafoundation/design-system'
import { useAddresses } from '../../contexts/addresses'
import { pluralize } from '@siafoundation/units'

export function AddressesFiltersBar() {
  const { datasetCount } = useAddresses()

  return (
    <div className="flex gap-2 justify-end w-full">
      <Text size="12" font="mono">
        {pluralize(datasetCount, 'address', 'addresses')}
      </Text>
    </div>
  )
}
