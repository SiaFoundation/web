import { Text } from '@siafoundation/design-system'
import { useAddresses } from '../../contexts/addresses'

export function AddressesFiltersBar() {
  const { datasetCount } = useAddresses()

  return (
    <div className="flex gap-2 justify-end w-full">
      <Text size="12" font="mono">
        {datasetCount === 1
          ? '1 address'
          : `${datasetCount.toLocaleString()} addresses`}
      </Text>
    </div>
  )
}
