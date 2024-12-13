import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { useAddresses } from '../../contexts/addresses'

export function AddressesFiltersBar() {
  const { datasetTotal, offset, limit, datasetState } = useAddresses()

  return (
    <div className="flex gap-2 justify-end w-full">
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        total={datasetTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
