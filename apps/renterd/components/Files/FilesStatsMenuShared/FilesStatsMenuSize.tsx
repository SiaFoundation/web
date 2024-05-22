import {
  LoadingDots,
  Separator,
  Text,
  Tooltip,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import {
  useContractsPrunable,
  useObjectStats,
} from '@siafoundation/renterd-react'
import { humanBytes } from '@siafoundation/units'
import { useContracts } from '../../../contexts/contracts'
import { useMemo } from 'react'

export function FilesStatsMenuSize() {
  const stats = useObjectStats({
    config: {
      swr: {
        // slow operation
        refreshInterval: minutesInMilliseconds(5),
        keepPreviousData: true,
        revalidateOnFocus: false,
      },
    },
  })

  const prunable = useContractsPrunable({
    config: {
      swr: {
        // slow operation
        refreshInterval: minutesInMilliseconds(10),
        keepPreviousData: true,
        revalidateOnFocus: false,
      },
    },
  })

  const { dataset } = useContracts()

  const prunableSpaceAutopilot = useMemo(
    () =>
      prunable.data?.contracts.reduce((acc, prunableContract) => {
        const datum = dataset.find(
          (d) =>
            d.id === prunableContract.id &&
            d.contractSets?.includes('autopilot')
        )
        if (!datum) return acc
        return acc + prunableContract.prunable
      }, 0),
    [prunable.data?.contracts, dataset]
  )
  const prunableSpaceNotAutopilot = useMemo(
    () =>
      prunable.data?.contracts.reduce((acc, prunableContract) => {
        const datum = dataset.find(
          (d) =>
            d.id === prunableContract.id &&
            !d.contractSets?.includes('autopilot')
        )
        if (!datum) return acc
        return acc + prunableContract.prunable
      }, 0),
    [prunable.data?.contracts, dataset]
  )

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
              prunable space
            </Text>
            <Text size="12" color="subtle">
              expiring space
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
            <Text size="12">{humanBytes(prunableSpaceAutopilot)}</Text>
            <Text size="12">{humanBytes(prunableSpaceNotAutopilot)}</Text>
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
