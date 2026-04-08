import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  Skeleton,
  useRemoteData,
} from '@siafoundation/design-system'
import { useAdminStatsConnectKeys } from '@siafoundation/indexd-react'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsConnectKeys() {
  const connectKeys = useAdminStatsConnectKeys()
  const stats = useRemoteData(
    {
      connectKeys,
    },
    (data) => ({
      ...data.connectKeys,
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
            label="Total Connect Keys"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Total Connect Keys"
            value={stats.total.toLocaleString()}
          />
          {stats.quotas?.map((q) => (
            <InfoRow
              key={q.quota}
              label={q.quota}
              value={q.total.toLocaleString()}
            />
          ))}
        </div>
      )}
    />
  )
}
