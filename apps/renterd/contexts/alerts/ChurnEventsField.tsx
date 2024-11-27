import {
  objectEntries,
  Text,
  Tooltip,
  ValueCopyable,
} from '@siafoundation/design-system'
import { HostContextMenuFromKey } from '../../components/Hosts/HostContextMenuFromKey'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { humanBytes } from '@siafoundation/units'
import { formatRelative } from 'date-fns'
import { useMemo } from 'react'
import { Add16, Subtract16 } from '@siafoundation/react-icons'
import { cx } from 'class-variance-authority'
import { AlertChurnEvent } from '@siafoundation/renterd-types'

type Change = {
  contractId: string
  hostKey: string
  events: AlertChurnEvent[]
}

export type ChurnData = Record<string, AlertChurnEvent[]>

export function ChurnEventsField({
  data,
}: {
  data: Record<string, AlertChurnEvent[]>
}) {
  const churnEvents = useMemo(() => {
    return objectEntries(data)
      .map(([contractId, events]) => {
        return {
          contractId,
          hostKey: events[0].hostKey,
          events: events.sort((a, b) =>
            new Date(a.time).getTime() < new Date(b.time).getTime() ? 1 : -1
          ),
        }
      })
      .sort((a, b) => {
        // size in latest event
        const aSize = a.events[0].size
        const bSize = b.events[0].size
        return aSize < bSize ? 1 : -1
      })
  }, [data])

  // calculate churn %: contracts bad size / total size
  const totalSize = useMemo(
    () => churnEvents.reduce((acc, { events }) => acc + events[0].size, 0),
    [churnEvents]
  )
  const bads = useMemo(
    () => churnEvents.filter(({ events }) => events[0].to === 'bad'),
    [churnEvents]
  )
  const goods = useMemo(
    () => churnEvents.filter(({ events }) => events[0].to === 'good'),
    [churnEvents]
  )
  const badSize = useMemo(
    () => bads.reduce((acc, { events }) => acc + events[0].size, 0),
    [bads]
  )
  const churn = useMemo(
    () => (totalSize > 0 ? (badSize / totalSize) * 100 : 0),
    [badSize, totalSize]
  )

  return (
    <div data-testid="churn" className="flex flex-col gap-2">
      <div className="flex gap-2 items-center pr-1">
        <Text size="12" color="subtle" ellipsis>
          contract changes
        </Text>
        <div className="flex-1" />
        <Tooltip
          content={`${humanBytes(badSize)} of ${humanBytes(
            totalSize
          )} contract size removed`}
        >
          <div className="flex gap-1 items-center">
            <Text size="12" color="contrast" ellipsis>
              churn: {churn.toFixed(2)}%
            </Text>
            <Text size="12" color="subtle" ellipsis>
              ({humanBytes(badSize)} / {humanBytes(totalSize)})
            </Text>
          </div>
        </Tooltip>
        <div className="flex gap-1 items-center">
          <Tooltip content={`${goods.length} contracts marked good`}>
            <Text
              size="12"
              color="green"
              ellipsis
              className="flex items-center"
            >
              <Add16 />
              {goods.length}
            </Text>
          </Tooltip>
          <Tooltip content={`${bads.length} contracts marked bad`}>
            <Text size="12" color="red" ellipsis className="flex items-center">
              <Subtract16 />
              {bads.length}
            </Text>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-2">
        {churnEvents.map(({ contractId, hostKey, events }, i) => (
          <ChurnEventItem
            key={contractId + hostKey}
            contractId={contractId}
            hostKey={hostKey}
            events={events}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

function ChurnEventItem({
  contractId,
  hostKey,
  events,
  i,
}: Change & {
  i: number
}) {
  return (
    <div data-testid={contractId} className="flex flex-col gap-[3px]">
      <div className="flex gap-2 items-center px-[3px]">
        <Text size="12" weight="medium" ellipsis>
          {i + 1}.
        </Text>
        <div className="flex-1" />
        <div className="flex gap-2 items-center">
          <Text size="12" color="subtle" ellipsis>
            contract
          </Text>
          <ValueCopyable
            size="12"
            value={contractId}
            contextMenu={
              <ContractContextMenuFromId
                id={contractId}
                buttonProps={{
                  size: 'none',
                }}
                contentProps={{
                  align: 'end',
                }}
              />
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <Text size="12" color="subtle" ellipsis>
            host
          </Text>
          <ValueCopyable
            size="12"
            value={hostKey}
            label="host key"
            contextMenu={
              <HostContextMenuFromKey
                hostKey={hostKey}
                buttonProps={{
                  size: 'none',
                }}
                contentProps={{
                  align: 'end',
                }}
              />
            }
          />
        </div>
      </div>
      {events.map(({ to, reason, size, time }, i) => (
        <Tooltip
          key={to + reason + time}
          content={to === 'good' ? 'good' : `bad: ${reason}`}
          align="start"
          side="bottom"
        >
          <div
            className={cx(
              'flex gap-2 justify-between mr-2 pr-1',
              i === 0
                ? to === 'good'
                  ? 'bg-green-400/20'
                  : 'bg-red-400/20'
                : 'opacity-50'
            )}
          >
            <div className="flex gap-1 items-center overflow-hidden">
              <Text size="12" color={to === 'good' ? 'green' : 'red'}>
                {to === 'good' ? <Add16 /> : <Subtract16 />}
              </Text>
              <Text size="12" ellipsis>
                {reason}
              </Text>
            </div>
            <div className="flex-1" />
            <div className="flex gap-2">
              <Text color="subtle" size="12" ellipsis>
                time
              </Text>
              <Text size="12" ellipsis>
                {formatRelative(new Date(time), new Date())}
              </Text>
            </div>
            <div className="flex gap-2">
              <Text color="subtle" size="12" ellipsis>
                size
              </Text>
              <Text size="12" ellipsis>
                {humanBytes(size)}
              </Text>
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
