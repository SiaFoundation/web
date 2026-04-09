import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsAccounts } from '@siafoundation/indexd-react'
import { humanBytes } from '@siafoundation/units'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsAccounts() {
  const accounts = useAdminStatsAccounts()
  const stats = useRemoteData(
    {
      accounts,
    },
    (data) => ({
      ...data.accounts,
    }),
  )
  return (
    <RemoteDataStates
      data={stats}
      error={
        <StateError message="Error loading metrics. Please try again later." />
      }
      loading={
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Registered Accounts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Active Accounts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Pinned Data"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Pinned Size"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Registered Accounts"
            value={stats.registered.toLocaleString()}
          />
          <InfoRow
            label="Active Accounts"
            value={stats.active.toLocaleString()}
          />
          <InfoRow
            label="Pinned Data"
            value={humanBytes(stats.pinnedData)}
          />
          <InfoRow
            label="Pinned Size"
            value={humanBytes(stats.pinnedSize)}
          />
        </div>
      )}
    />
  )
}
