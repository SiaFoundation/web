import { Text, Tooltip, ValueCopyable } from '@siafoundation/design-system'
import { Add16, Subtract16 } from '@siafoundation/react-icons'
import { humanBytes } from '@siafoundation/units'
import { uniq } from '@technically/lodash'
import { cx } from 'class-variance-authority'
import { formatRelative } from 'date-fns'
import { useMemo } from 'react'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { HostContextMenuFromKey } from '../../components/Hosts/HostContextMenuFromKey'

type ChangeEvent = {
  type: 'addition' | 'removal'
  reasons?: string
  size: number
  time: string
}

type Change = {
  contractId: string
  hostKey: string
  events: ChangeEvent[]
}

export type SetAdditions = Record<
  string,
  {
    hostKey: string
    additions: { size: number; time: string }[]
  }
>

export type SetRemovals = Record<
  string,
  {
    hostKey: string
    removals: { reasons: string; size: number; time: string }[]
  }
>

export function SetChangesField({
  setAdditions,
  setRemovals,
}: {
  setAdditions: SetAdditions
  setRemovals: SetRemovals
}) {
  const changes = useMemo(() => {
    // Merge all unique contract ids from additions and removals together
    const contractIds = uniq([
      ...Object.keys(setAdditions),
      ...Object.keys(setRemovals),
    ])
    return contractIds
      .map((contractId) => {
        const additions = setAdditions[contractId]?.additions || []
        const removals = setRemovals[contractId]?.removals || []
        return {
          contractId,
          hostKey:
            setAdditions[contractId]?.hostKey ||
            setRemovals[contractId]?.hostKey,
          events: [
            ...additions.map((a) => ({
              type: 'addition',
              size: a.size,
              time: a.time,
            })),
            ...removals.map((r) => ({
              type: 'removal',
              size: r.size,
              time: r.time,
              reasons: r.reasons,
            })),
          ].sort((a, b) =>
            new Date(a.time).getTime() < new Date(b.time).getTime() ? 1 : -1,
          ) as ChangeEvent[],
        }
      })
      .sort((a, b) => {
        // size in latest event
        const aSize = a.events[0]!.size
        const bSize = b.events[0]!.size
        return aSize < bSize ? 1 : -1
      })
  }, [setAdditions, setRemovals])

  // calculate churn %: contracts removed size / total size
  const totalSize = useMemo(
    () => changes.reduce((acc, { events }) => acc + events[0]!.size, 0),
    [changes],
  )
  const removals = useMemo(
    () => changes.filter(({ events }) => events[0]!.type === 'removal'),
    [changes],
  )
  const additions = useMemo(
    () => changes.filter(({ events }) => events[0]!.type === 'addition'),
    [changes],
  )
  const removedSize = useMemo(
    () => removals.reduce((acc, { events }) => acc + events[0]!.size, 0),
    [removals],
  )
  const churn = useMemo(
    () => (totalSize > 0 ? (removedSize / totalSize) * 100 : 0),
    [removedSize, totalSize],
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center pr-1">
        <Text size="12" color="subtle" ellipsis>
          contract set changes
        </Text>
        <div className="flex-1" />
        <Tooltip
          content={`${humanBytes(removedSize)} of ${humanBytes(
            totalSize,
          )} contract size removed`}
        >
          <div className="flex gap-1 items-center">
            <Text size="12" color="contrast" ellipsis>
              churn: {churn.toFixed(2)}%
            </Text>
            <Text size="12" color="subtle" ellipsis>
              ({humanBytes(removedSize)} / {humanBytes(totalSize)})
            </Text>
          </div>
        </Tooltip>
        <div className="flex gap-1 items-center">
          <Tooltip content={`${additions.length} contracts added`}>
            <Text
              size="12"
              color="green"
              ellipsis
              className="flex items-center"
            >
              <Add16 />
              {additions.length}
            </Text>
          </Tooltip>
          <Tooltip content={`${removals.length} contracts removed`}>
            <Text size="12" color="red" ellipsis className="flex items-center">
              <Subtract16 />
              {removals.length}
            </Text>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-2">
        {changes.map(({ contractId, hostKey, events }, i) => (
          <ContractSetChange
            key={contractId + hostKey}
            contractId={contractId}
            hostKey={hostKey!}
            events={events}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

function ContractSetChange({
  contractId,
  hostKey,
  events,
  i,
}: Change & {
  i: number
}) {
  return (
    <div className="flex flex-col gap-[3px]">
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
      {events.map(({ type, reasons, size, time }, i) => (
        <Tooltip
          key={type + reasons + time}
          content={type === 'addition' ? 'added' : `removed: ${reasons}`}
          align="start"
          side="bottom"
        >
          <div
            className={cx(
              'flex gap-2 justify-between mr-2 pr-1',
              i === 0
                ? type === 'addition'
                  ? 'bg-green-400/20'
                  : 'bg-red-400/20'
                : 'opacity-50',
            )}
          >
            <div className="flex gap-1 items-center overflow-hidden">
              <Text size="12" color={type === 'addition' ? 'green' : 'red'}>
                {type === 'addition' ? <Add16 /> : <Subtract16 />}
              </Text>
              <Text size="12" ellipsis>
                {reasons}
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
