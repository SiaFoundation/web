import {
  DatumCard,
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import {
  useAdminStatsSectors,
  useAdminStatsAccounts,
} from '@siafoundation/indexd-react'

export function Metrics() {
  const sectors = useAdminStatsSectors()
  const accounts = useAdminStatsAccounts()
  const stats = useRemoteData(
    {
      sectors,
      accounts,
    },
    (data) => ({
      ...data.sectors,
      ...data.accounts,
    }),
  )
  return (
    <div className="flex flex-col gap-5 p-5">
      <RemoteDataStates
        data={stats}
        error={
          <StateError message="Error loading metrics. Please try again later." />
        }
        loading={
          <div className="flex flex-wrap gap-7">
            <DatumCard
              label="Slabs"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
            <DatumCard
              label="Migrated Sectors"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
            <DatumCard
              label="Pinned Sectors"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
            <DatumCard
              label="Unpinnable Sectors"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
            <DatumCard
              label="Unpinned Sectors"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
            <DatumCard
              label="Registered Accounts"
              value={<Skeleton className="h-12 w-[150px]" />}
            />
          </div>
        }
        notFound={<StateNoneYet message="No metrics found." />}
        loaded={(stats) => (
          <div className="flex flex-wrap gap-7">
            <DatumCard label="Slabs" value={stats.numSlabs.toLocaleString()} />
            <DatumCard
              label="Migrated Sectors"
              value={stats.numMigratedSectors.toLocaleString()}
            />
            <DatumCard
              label="Pinned Sectors"
              value={stats.numPinnedSectors.toLocaleString()}
            />
            <DatumCard
              label="Unpinnable Sectors"
              value={stats.numUnpinnableSectors.toLocaleString()}
            />
            <DatumCard
              label="Unpinned Sectors"
              value={stats.numUnpinnedSectors.toLocaleString()}
            />
            <DatumCard
              label="Registered Accounts"
              value={stats.registered.toLocaleString()}
            />
          </div>
        )}
      />
    </div>
  )
}
