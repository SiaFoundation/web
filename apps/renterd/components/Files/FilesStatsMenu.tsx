import {
  Earth16,
  Filter16,
  Folders16,
  Link,
  Separator,
  Text,
  Tooltip,
  Warning16,
} from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import {
  useAutopilotConfig,
  useObjectStats,
} from '@siafoundation/react-renterd'
import { humanBytes } from '@siafoundation/sia-js'
import { useIsApcsEqDcs } from '../../hooks/useIsApcsEqDcs'
import { routes } from '../../config/routes'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { useApp } from '../../contexts/app'

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
  const { autopilot } = useApp()
  const apc = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const css = useContractSetSettings()
  const isApcsEqDcs = useIsApcsEqDcs()

  let warning = 'none'

  if (
    autopilot.state === 'on' &&
    !isApcsEqDcs.isValidating &&
    !isApcsEqDcs.data
  ) {
    warning = 'contractSetMismatch'
  }

  if (autopilot.state === 'on' && apc.error) {
    warning = 'setupAutopilot'
  }

  if (css.data && !css.data?.default) {
    warning = 'setupDefaultContractSet'
  }

  return (
    <div className="flex gap-2 w-full">
      {warning === 'setupDefaultContractSet' && (
        <div className="flex gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            <Warning16 />
          </Text>
          <Text size="12" font="mono" weight="medium" color="amber">
            Configure a default contract set to get started.{' '}
            <Link
              underline="hover"
              size="12"
              font="mono"
              weight="medium"
              color="amber"
              href={routes.config.index}
            >
              Configuration →
            </Link>
          </Text>
        </div>
      )}
      {warning === 'setupAutopilot' && (
        <div className="flex gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            <Warning16 />
          </Text>
          <Text size="12" font="mono" weight="medium" color="amber">
            Configure autopilot to get started.{' '}
            <Link
              underline="hover"
              size="12"
              font="mono"
              weight="medium"
              color="amber"
              href={routes.autopilot.index}
            >
              Autopilot →
            </Link>
          </Text>
        </div>
      )}
      {warning === 'contractSetMismatch' && (
        <Tooltip
          align="start"
          content={
            <>
              The autopilot contract set does not match the default contract
              set. This means that by default workers will not upload data to
              contracts that autopilot manages. Unless these contract are being
              manually maintained, this will result in data loss. Continue with
              caution or update the autopilot contract set to match the default
              contract set.
            </>
          }
        >
          <div className="flex gap-1">
            <Text size="12" font="mono" weight="medium" color="amber">
              <Warning16 />
            </Text>
            <Text size="12" font="mono" weight="medium" color="amber">
              Uploaded data will not be managed by autopilot.
            </Text>
          </div>
        </Tooltip>
      )}
      <div className="flex-1" />
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Tooltip side="bottom" content="Filtered statistics">
            <Text size="12" color="verySubtle">
              <Filter16 />
            </Text>
          </Tooltip>
          <Tooltip side="bottom" content="Number of files in current directory">
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
                align="end"
                content={
                  <Text className="flex justify-between gap-6">
                    <Text className="flex flex-col gap-1">
                      <Text size="12" color="subtle">
                        size of all files
                      </Text>
                      <Text size="12" color="subtle">
                        with redundancy
                      </Text>
                      <Text size="12" color="subtle">
                        average redundancy factor
                      </Text>
                      <Separator className="w-full my-1" />
                      <Text size="12" color="subtle">
                        reclaimable space
                      </Text>
                      <Text size="12" color="subtle">
                        total storage utilization
                      </Text>
                    </Text>
                    <Text className="flex flex-col gap-1 items-end">
                      <Text size="12">
                        {humanBytes(stats.data.totalObjectsSize)}
                      </Text>
                      <Text size="12">
                        {humanBytes(stats.data.totalSectorsSize)}
                      </Text>
                      <Text size="12" font="mono">
                        {(
                          stats.data.totalSectorsSize /
                          stats.data.totalObjectsSize
                        ).toFixed(1)}
                        x
                      </Text>
                      <Separator className="w-full my-1" />
                      <Text size="12">
                        {humanBytes(
                          stats.data.totalUploadedSize -
                            stats.data.totalSectorsSize
                        )}
                      </Text>
                      <Text size="12">
                        {humanBytes(stats.data.totalUploadedSize)}
                      </Text>
                    </Text>
                  </Text>
                }
              >
                <div className="flex gap-2">
                  <Text size="12" color="verySubtle">
                    <Folders16 />
                  </Text>
                  <Text size="12" font="mono">
                    {humanBytes(stats.data.totalObjectsSize)} @{' '}
                    {(
                      stats.data.totalSectorsSize / stats.data.totalObjectsSize
                    ).toFixed(1)}
                    x
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
