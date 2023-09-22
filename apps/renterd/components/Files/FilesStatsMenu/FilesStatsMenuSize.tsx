import {
  LoadingDots,
  Separator,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { useObjectStats } from '@siafoundation/react-renterd'
import { humanBytes } from '@siafoundation/sia-js'

export function FilesStatsMenuSize() {
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

  if (!stats.data && stats.isValidating) {
    return <LoadingDots className="pr-1" />
  }

  if (!stats.data) {
    return null
  }

  const averageRedundancyFactor = stats.data.totalObjectsSize
    ? stats.data.totalSectorsSize / stats.data.totalObjectsSize
    : 0

  return (
    <Tooltip
      side="bottom"
      content={
        <Text className="flex justify-between gap-6">
          <Text className="flex flex-col gap-1">
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
              reclaimable space
            </Text>
            <Text size="12" color="subtle">
              total storage utilization
            </Text>
          </Text>
          <Text className="flex flex-col gap-1 items-end">
            <Text size="12">{humanBytes(stats.data.totalObjectsSize)}</Text>
            <Text size="12">{humanBytes(stats.data.totalSectorsSize)}</Text>
            {!!averageRedundancyFactor && (
              <Text size="12" font="mono">
                {averageRedundancyFactor.toFixed(1)}x
              </Text>
            )}
            <Separator className="w-full my-1" />
            <Text size="12">
              {humanBytes(
                stats.data.totalUploadedSize - stats.data.totalSectorsSize
              )}
            </Text>
            <Text size="12">{humanBytes(stats.data.totalUploadedSize)}</Text>
          </Text>
        </Text>
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
