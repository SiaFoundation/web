import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsSectors } from '@siafoundation/indexd-react'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsSectors() {
  const sectors = useAdminStatsSectors()
  const stats = useRemoteData(
    {
      sectors,
    },
    (data) => ({
      ...data.sectors,
    }),
  )
  return (
    <RemoteDataStates
      data={stats}
      error={
        <StateError message="Error loading sector metrics. Please try again later." />
      }
      loading={
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Migrated Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Pinned Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Unpinnable Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Unpinned Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow label="Slabs" value={stats.slabs.toLocaleString()} />
          <InfoRow
            label="Migrated Sectors"
            value={stats.migrated.toLocaleString()}
          />
          <InfoRow
            label="Pinned Sectors"
            value={stats.pinned.toLocaleString()}
          />
          <InfoRow
            label="Unpinnable Sectors"
            value={stats.unpinnable.toLocaleString()}
          />
          <InfoRow
            label="Unpinned Sectors"
            value={stats.unpinned.toLocaleString()}
          />
        </div>
      )}
    />
  )
}
