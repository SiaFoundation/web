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
        <div className="flex flex-col gap-2 w-full">
          {[
            'Slabs',
            'Stuck Slabs',
            'Unrecoverable Slabs',
            'Migrated Sectors',
            'Pinned Sectors',
            'Unpinnable Sectors',
            'Unpinned Sectors',
            'Lost Sectors',
            'Checked Sectors',
            'Check Failed Sectors',
          ].map((label) => (
            <InfoRow
              key={label}
              label={label}
              value={<Skeleton className="h-5 w-[150px]" />}
            />
          ))}
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-2 w-full">
          <InfoRow label="Slabs" value={stats.slabs.toLocaleString()} />
          <InfoRow
            label="Stuck Slabs"
            value={stats.stuckSlabs.toLocaleString()}
          />
          <InfoRow
            label="Unrecoverable Slabs"
            value={stats.unrecoverableSlabs.toLocaleString()}
          />
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
          <InfoRow
            label="Lost Sectors"
            value={stats.lost.toLocaleString()}
          />
          <InfoRow
            label="Checked Sectors"
            value={stats.checked.toLocaleString()}
          />
          <InfoRow
            label="Check Failed Sectors"
            value={stats.checkFailed.toLocaleString()}
          />
        </div>
      )}
    />
  )
}
