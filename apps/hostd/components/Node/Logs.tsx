import { Codeblock, Heading, Panel, Text } from '@siafoundation/design-system'
import { useLogsSearch } from '@siafoundation/react-hostd'
import { humanDate } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'

export function Logs() {
  const logs = useLogsSearch({
    payload: {
      levels: ['info'],
      limit: 100,
    },
  })

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
          {logs.data?.entries.map((e) => (
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
