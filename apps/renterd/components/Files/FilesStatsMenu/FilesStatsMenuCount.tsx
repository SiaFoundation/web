import { Text, Tooltip } from '@siafoundation/design-system'
import { useFiles } from '../../../contexts/files'
import { useObjectStats } from '@siafoundation/react-renterd'

export function FilesStatsMenuCount() {
  const { pageCount } = useFiles()
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
