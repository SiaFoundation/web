import { Text, Tooltip, ValueCopyable } from '@siafoundation/design-system'
import { HostContextMenuFromKey } from '../../components/Hosts/HostContextMenuFromKey'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { humanBytes } from '@siafoundation/units'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { Add16, Subtract16 } from '@siafoundation/react-icons'
import { cx } from 'class-variance-authority'
import { uniq } from '@technically/lodash'

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
    return contractIds.map((contractId) => {
      const additions = setAdditions[contractId]?.additions || []
      const removals = setRemovals[contractId]?.removals || []
      return {
        contractId,
        hostKey:
          setAdditions[contractId]?.hostKey || setRemovals[contractId]?.hostKey,
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
          new Date(a.time).getTime() > new Date(b.time).getTime() ? 1 : -1
        ) as ChangeEvent[],
      }
    })
  }, [setAdditions, setRemovals])
  return (
    <div className="flex flex-col gap-2">
      <Text size="12" color="subtle" ellipsis>
        contract set changes
      </Text>
      <div className="flex flex-col gap-3 mb-2">
        {changes.map(({ contractId, hostKey, events }, i) => (
          <ContractSetChange
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

function ContractSetChange({
  contractId,
  hostKey,
  events,
  i,
}: Change & {
  i: number
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <Text size="12" ellipsis>
          {i + 1}.
        </Text>
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
                contentProps={{
                  align: 'end',
                }}
              />
            }
          />
        </div>
      </div>
      {events.map(({ type, reasons, size, time }) => (
        <Tooltip
          key={type + reasons + time}
          content={type === 'addition' ? 'added' : `removed: ${reasons}`}
          align="start"
          side="bottom"
        >
          <div
            className={cx(
              'flex gap-2 justify-between',
              type === 'addition' ? 'bg-green-400/20' : 'bg-red-400/20'
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
              <Text size="12" color="subtle" ellipsis>
                time
              </Text>
              <Text size="12" ellipsis>
                {format(new Date(time), 'yyyy-MM-dd HH:mm a')}
              </Text>
            </div>
            <div className="flex gap-2">
              <Text size="12" color="subtle" ellipsis>
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
