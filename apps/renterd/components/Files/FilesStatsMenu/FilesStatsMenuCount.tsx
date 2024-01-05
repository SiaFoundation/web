import { LoadingDots, Text, Tooltip } from '@siafoundation/design-system'
import { useFiles } from '../../../contexts/files'
import { useObjectStats } from '@siafoundation/react-renterd'

export function FilesStatsMenuCount() {
  const { isViewingABucket, pageCount, uploadsList } = useFiles()
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

  const numberObject = stats.data?.numObjects || 0
  const uploadsInProgress = uploadsList.length
  const totalObjects = numberObject + uploadsInProgress

  if (isViewingABucket) {
    return (
      <div className="flex gap-1">
        <Tooltip
          side="bottom"
          content="Number of files in page of current directory"
        >
          <Text size="12" font="mono">
            {pageCount.toLocaleString()}
          </Text>
        </Tooltip>
        <Text size="12" font="mono">
          of
        </Text>
        <Tooltip side="bottom" content="Number of files across all buckets">
          <Text size="12" font="mono">
            {stats.data ? `${totalObjects.toLocaleString()} files` : ' files'}
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
