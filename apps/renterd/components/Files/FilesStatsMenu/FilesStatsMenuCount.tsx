import { Text, Tooltip } from '@siafoundation/design-system'
import { useFiles } from '../../../contexts/files'
import { useObjectStats } from '@siafoundation/react-renterd'

export function FilesStatsMenuCount() {
  const { isViewingABucket, pageCount } = useFiles()
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

  if (isViewingABucket) {
    return (
      <Tooltip side="bottom" content="Number of files in current directory">
        <Text size="12" font="mono">
          {pageCount.toLocaleString()}
          {stats.data
            ? ` of ${stats.data?.numObjects.toLocaleString()} files`
            : ' files'}
        </Text>
      </Tooltip>
    )
  }
  return (
    <Tooltip side="bottom" content="Number of files across all buckets">
      <Text size="12" font="mono">
        {stats.data ? `${stats.data?.numObjects.toLocaleString()} files` : ''}
      </Text>
    </Tooltip>
  )
}
