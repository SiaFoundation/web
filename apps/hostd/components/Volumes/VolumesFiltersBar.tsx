import { PaginatorKnownTotal } from '@siafoundation/design-system'
import { Text, Separator } from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/units'
import { useVolumes } from '../../contexts/volumes'

export function VolumesFiltersBar() {
  const { dataset, datasetState, datasetFilteredTotal, offset, limit } =
    useVolumes()

  const total = dataset?.reduce((acc, i) => acc + i.totalBytes, 0)
  const used = dataset?.reduce((acc, i) => acc + i.usedBytes, 0)
  const free = total - used

  return (
    <div className="flex gap-2 justify-between w-full">
      <div className="flex gap-4">
        <Text size="12" font="mono" weight="medium">{`${humanBytes(
          used
        )} used`}</Text>
        <Separator variant="vertical" />
        <Text size="12" font="mono" weight="medium">{`${humanBytes(
          free
        )} free`}</Text>
        <Separator variant="vertical" />
        <Text size="12" font="mono" weight="medium">{`${humanBytes(
          total
        )} total`}</Text>
      </div>
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={datasetState === 'loading'}
        total={datasetFilteredTotal}
      />
    </div>
  )
}
