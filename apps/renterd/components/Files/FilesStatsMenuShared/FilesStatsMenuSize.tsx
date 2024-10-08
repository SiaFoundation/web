import {
  LoadingDots,
  Separator,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { useObjectStats } from '@siafoundation/renterd-react'
import { humanBytes, minutesInMilliseconds } from '@siafoundation/units'

export function FilesStatsMenuSize() {
  const stats = useObjectStats({
    config: {
      swr: {
        // slow operation
        refreshInterval: minutesInMilliseconds(5),
        revalidateOnFocus: false,
      },
    },
  })

  if (!stats.data && stats.isValidating) {
    return <LoadingDots className="pr-1" />
  }

  if (!stats.data) {
    return null
  }

  const totalObjectsSize =
    stats.data.totalObjectsSize + stats.data.totalUnfinishedObjectsSize
  const averageRedundancyFactor = totalObjectsSize
    ? stats.data.totalSectorsSize / totalObjectsSize
    : 0

  return (
    <Tooltip
      side="bottom"
      content={
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-1">
            <Text size="12" color="subtle">
              size of all files
            </Text>
            <Text size="12" color="subtle">
              with redundancy
            </Text>
            {!!averageRedundancyFactor && (
              <Text size="12" color="subtle">
                average redundancy factor
              </Text>
            )}
            <Separator className="w-full my-1" />
            <Text size="12" color="subtle">
              total storage utilization
            </Text>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <Text size="12">{humanBytes(stats.data.totalObjectsSize)}</Text>
            <Text size="12">{humanBytes(stats.data.totalSectorsSize)}</Text>
            {!!averageRedundancyFactor && (
              <Text size="12" font="mono">
                {averageRedundancyFactor.toFixed(1)}x
              </Text>
            )}
            <Separator className="w-full my-1" />
            <Text size="12">{humanBytes(stats.data.totalUploadedSize)}</Text>
          </div>
        </div>
      }
    >
      <Text size="12" font="mono">
        {`${humanBytes(stats.data.totalObjectsSize)}${
          averageRedundancyFactor
            ? ` @ ${averageRedundancyFactor.toFixed(1)}x`
            : ''
        }`}
      </Text>
    </Tooltip>
  )
}
