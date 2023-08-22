import { Badge, Text, Tooltip } from '@siafoundation/design-system'
import { humanDate, humanNumber } from '@siafoundation/sia-js'
import { useStatus } from '../hooks/useStatus'
import { NvgEntityTx, getNvgEntityTypeLabel } from '../config/navigatorTypes'
import { routes } from '../config/routes'
import { EntityHeading } from './EntityHeading'

type Props = {
  entity: NvgEntityTx
}

export function TxEntityHeader({ entity }: Props) {
  const { data } = entity
  const status = useStatus()
  const txHash = data[0].MasterHash
  const confirmations = data[1]?.Height
    ? Math.min(72, status.data?.lastblock - data[1].Height)
    : undefined
  const height = data[1]?.Height ? humanNumber(data[1].Height) : undefined
  const timestamp = data[1]?.Timestamp
    ? humanDate(data[1].Timestamp * 1000, { timeStyle: 'short' })
    : undefined

  return (
    <div className="flex flex-wrap gap-y-4 items-center justify-between">
      <EntityHeading
        label={getNvgEntityTypeLabel(entity.type)}
        type={entity.type}
        value={txHash}
        href={routes.tx.view.replace('[id]', txHash)}
      />
      <div className="flex gap-4 items-center overflow-hidden">
        {!!timestamp && (
          <Tooltip content={timestamp}>
            <Text font="mono" color="subtle" ellipsis>
              {timestamp}
            </Text>
          </Tooltip>
        )}
        {!!height && (
          <Badge variant="accent">
            <div className="flex gap-2">
              <Tooltip content="Block height">
                <div className="">{height}</div>
              </Tooltip>
              <div className="">|</div>
              <div className="">
                {confirmations === 72 ? '72+' : confirmations} confirmations
              </div>
            </div>
          </Badge>
        )}
      </div>
    </div>
  )
}
