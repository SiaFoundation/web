import {
  AppConnectivity16,
  Earth16,
  Filter16,
  Folders16,
  Globe16,
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
          <Tooltip side="bottom" content="Filtered statistics">
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
        {stats.data && (
          <>
            <Separator variant="vertical" className="h-full" />
            <div className="flex gap-4">
              <Tooltip
                side="bottom"
                content={
                  <div className="flex flex-col gap-1">
                    <Text size="12" color="subtle">
                      Size of all files
                    </Text>
                    <Text size="12" color="subtle">
                      {humanBytes(stats.data?.totalObjectsSize)}
                    </Text>
                  </div>
                }
              >
                <div className="flex gap-2">
                  <Text size="12" color="verySubtle">
                    <Folders16 />
                  </Text>
                  <Text size="12" font="mono">
                    {humanBytes(stats.data?.totalObjectsSize)}
                  </Text>
                </div>
              </Tooltip>
              <Tooltip
                align="end"
                side="bottom"
                content={
                  <div className="flex flex-col gap-1">
                    <Text size="12" color="subtle">
                      Size of all files
                    </Text>
                    <Text size="12" color="subtle">
                      {humanBytes(stats.data?.totalSectorsSize)} with redundancy
                    </Text>
                    <Text size="12" color="subtle">
                      {humanBytes(stats.data?.totalUploadedSize)} with
                      redundancy and repairs
                    </Text>
                  </div>
                }
              >
                <div className="flex gap-2">
                  <Text size="12" color="verySubtle">
                    <Earth16 />
                  </Text>
                  <Text size="12" font="mono">
                    {humanBytes(stats.data?.totalSectorsSize)}
                  </Text>
                </div>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
