import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsContracts } from '@siafoundation/indexd-react'
import { humanBytes } from '@siafoundation/units'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsContracts() {
  const contracts = useAdminStatsContracts()
  const stats = useRemoteData(
    {
      contracts,
    },
    (data) => ({
      ...data.contracts,
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
            label="Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Bad Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Renewing Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Total Capacity"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Total Size"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow label="Contracts" value={stats.contracts.toLocaleString()} />
          <InfoRow
            label="Bad Contracts"
            value={stats.badContracts.toLocaleString()}
          />
          <InfoRow
            label="Renewing Contracts"
            value={stats.renewing.toLocaleString()}
          />
          <InfoRow
            label="Total Capacity"
            value={humanBytes(stats.totalCapacity)}
          />
          <InfoRow label="Total Size" value={humanBytes(stats.totalSize)} />
        </div>
      )}
    />
  )
}
