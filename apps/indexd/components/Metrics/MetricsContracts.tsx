import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
  ValueWithTooltip,
} from '@siafoundation/design-system'
import { useAdminStatsContracts } from '@siafoundation/indexd-react'
import { humanBytes } from '@siafoundation/units'
import { InfoRow } from '../Data/PanelInfoRow'
import { useCurrencyDisplayProps } from './useCurrencyDisplayProps'

export function MetricsContracts() {
  const contracts = useAdminStatsContracts()
  const currencyDisplayProps = useCurrencyDisplayProps()
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
        <div className="flex flex-col gap-2 w-full">
          {[
            'Contracts',
            'Bad Contracts',
            'Renewing Contracts',
            'Contract Tax',
            'Locked Allowance',
            'Remaining Allowance',
            'Total Capacity',
            'Total Size',
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
            label="Contract Tax"
            value={
              <ValueWithTooltip {...currencyDisplayProps(stats.contractTax)} />
            }
          />
          <InfoRow
            label="Locked Allowance"
            value={
              <ValueWithTooltip
                {...currencyDisplayProps(stats.lockedAllowance)}
              />
            }
          />
          <InfoRow
            label="Remaining Allowance"
            value={
              <ValueWithTooltip
                {...currencyDisplayProps(stats.remainingAllowance)}
              />
            }
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
