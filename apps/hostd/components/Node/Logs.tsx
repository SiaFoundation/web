import {
  Codeblock,
  Heading,
  Panel,
  Skeleton,
  Text,
  useDatasetEmptyState,
} from '@siafoundation/design-system'
import { useLogsSearch } from '@siafoundation/react-hostd'
import { humanDate } from '@siafoundation/units'
import { cx } from 'class-variance-authority'
import { times } from 'lodash'

const filters = []

export function Logs() {
  const logs = useLogsSearch({
    payload: {
      levels: ['info'],
      limit: 100,
    },
  })

  const loadingState = useDatasetEmptyState(
    logs.data?.entries,
    logs.isValidating,
    logs.error,
    filters
  )

  return (
    <Panel>
      <div className="flex flex-col rounded overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-graydark-300">
          <Heading size="20" font="mono" ellipsis>
            Logs
          </Heading>
          <div className="flex-1" />
        </div>
        <div className="flex flex-col">
          {loadingState === 'noneYet' && (
            <div
              className={cx(
                'flex items-center justify-center h-[100px]',
                itemBorderStyles()
              )}
            >
              <Text size="18" color="subtle">
                No logs yet.
              </Text>
            </div>
          )}
          {loadingState === 'error' && (
            <div
              className={cx(
                'flex items-center justify-center h-[100px]',
                itemBorderStyles()
              )}
            >
              <Text size="18" color="subtle">
                {logs.error.message}
              </Text>
            </div>
          )}
          {loadingState === 'loading' && <EntityListSkeleton />}
          {!loadingState &&
            logs.data.entries.map((e) => (
              <div
                key={e.timestamp + e.caller + e.name}
                className={cx(
                  'flex flex-col gap-1 w-full p-4',
                  'border-t border-gray-200 dark:border-graydark-300',
                  'first:border-none'
                )}
              >
                <div className="flex justify-between w-full">
                  <Text weight="medium">{e.name}</Text>
                  <Text color="subtle">
                    {humanDate(e.timestamp, { timeStyle: 'medium' })}
                  </Text>
                </div>
                <Text color="subtle">{e.message}</Text>
                <Text>{e.caller}</Text>
                <Codeblock color="subtle">
                  {JSON.stringify(e.fields, null, 2)}
                </Codeblock>
              </div>
            ))}
        </div>
      </div>
    </Panel>
  )
}

export function EntityListSkeleton() {
  return (
    <>
      {times(10, (i) => (
        <div
          key={i}
          className={cx('relative flex gap-4 p-3.5', itemBorderStyles())}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between gap-2 w-full">
              <Skeleton className="w-[160px] h-[20px]" />
              <Skeleton className="w-[160px] h-[20px]" />
            </div>
            <Skeleton className="w-[100px] h-[20px]" />
            <Skeleton className="w-full h-[120px]" />
          </div>
        </div>
      ))}
    </>
  )
}

export function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
