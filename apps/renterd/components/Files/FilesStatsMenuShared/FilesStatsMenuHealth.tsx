import { Separator, Text, Tooltip } from '@siafoundation/design-system'
import { useObjectStats } from '@siafoundation/renterd-react'
import { healthThresholds, getFileHealth } from '../../../lib/fileHealth'

export function FilesStatsMenuHealth() {
  const stats = useObjectStats({
    config: {
      swr: {
        // slow operation
        refreshInterval: 60_000,
        keepPreviousData: true,
        revalidateOnFocus: false,
      },
    },
  })

  const { displayHealth, label } = getFileHealth({
    health: stats.data?.minHealth,
    size: 1,
    isDirectory: true,
  })

  const noDataYet = stats.data?.totalObjectsSize === 0
  if (!stats.data || noDataYet) {
    return null
  }

  return (
    <Tooltip
      align="end"
      content={
        <div className="flex flex-col overflow-hidden mb-1">
          <div className="flex justify-between gap-2">
            <Text size="12">{label}</Text>
            <Text size="12">{(displayHealth * 100).toFixed(0)}%</Text>
          </div>
          <Separator className="w-full my-1.5" />
          <div className="flex flex-col gap-2">
            <Text size="12" color="subtle">
              Health is calculated as the minimum health value from across all
              file slabs. For directories this is across all contained files.
            </Text>
            <Text size="12" color="subtle">
              Slab health is calculated as the number of shards with active
              contracts in the autopilot contract set above the minimum required
              shards and expressed as a percentage.
            </Text>
          </div>
          <Separator className="w-full my-1.5" />
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <Text size="12" color="subtle">
                excellent health
              </Text>
              <Text size="12" color="subtle">
                good health
              </Text>
              <Text size="12" color="subtle">
                poor health
              </Text>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <Text size="12" color="subtle">
                {healthThresholds.excellent * 100}%
              </Text>
              <Text size="12" color="subtle">
                {healthThresholds.good * 100}% -{' '}
                {healthThresholds.excellent * 100}%
              </Text>
              <Text size="12" color="subtle">
                {healthThresholds.poor * 100}% - {healthThresholds.good * 100}%
              </Text>
            </div>
          </div>
        </div>
      }
    >
      <Text size="12" font="mono" className="flex">
        {label}
      </Text>
    </Tooltip>
  )
}
