import {
  Earth16,
  Filter16,
  Separator,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import { useObjectStats } from '@siafoundation/react-renterd'
import { humanBytes } from '@siafoundation/sia-js'

export function FilesStatsMenu() {
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
    <div className="flex gap-2 justify-end w-full">
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Tooltip content="Filtered statistics">
            <Text size="12" color="verySubtle">
              <Filter16 />
            </Text>
          </Tooltip>
          <Tooltip content="Number of files in current directory">
            <Text size="12" font="mono">
              {pageCount.toLocaleString()}
              {stats.data
                ? ` of ${stats.data?.numObjects.toLocaleString()} files`
                : ' files'}
            </Text>
          </Tooltip>
        </div>
        <Separator variant="vertical" className="h-full" />
        {stats.data && (
          <div className="flex gap-2">
            <Tooltip content="Global statistics">
              <Text size="12" color="verySubtle">
                <Earth16 />
              </Text>
            </Tooltip>
            <Tooltip content="Size of all files">
              <Text size="12" font="mono">
                {humanBytes(stats.data?.totalUploadedSize)}
              </Text>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}
