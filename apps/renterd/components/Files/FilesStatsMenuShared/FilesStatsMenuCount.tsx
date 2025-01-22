import { LoadingDots, Text, Tooltip } from '@siafoundation/design-system'
import { useObjectStats } from '@siafoundation/renterd-react'
import { useFilesManager } from '../../../contexts/filesManager'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { useFilesFlat } from '../../../contexts/filesFlat'

export function FilesStatsMenuCount() {
  const { isViewingABucket, activeExplorerMode } = useFilesManager()
  const { datasetPageTotal: directoryPageTotal } = useFilesDirectory()
  const { datasetPageTotal: flatPageTotal } = useFilesFlat()
  const datasetPageTotal =
    activeExplorerMode === 'flat' ? flatPageTotal : directoryPageTotal

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

  const totalObjects = stats.data?.numObjects || 0

  if (isViewingABucket) {
    return (
      <div className="flex gap-1">
        <Tooltip
          side="bottom"
          content="Number of files in page of current directory"
        >
          <Text size="12" font="mono">
            {datasetPageTotal.toLocaleString()}
          </Text>
        </Tooltip>
        <Tooltip side="bottom" content="Number of files across all buckets">
          <Text size="12" font="mono">
            {stats.data
              ? `of ${totalObjects.toLocaleString()} files`
              : ' files'}
          </Text>
        </Tooltip>
      </div>
    )
  }
  return (
    <Tooltip side="bottom" content="Number of files across all buckets">
      {stats.data ? (
        <Text size="12" font="mono">
          {totalObjects.toLocaleString()} files
        </Text>
      ) : (
        <LoadingDots />
      )}
    </Tooltip>
  )
}
