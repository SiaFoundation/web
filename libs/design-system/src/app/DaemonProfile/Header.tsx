/* eslint-disable react/jsx-pascal-case */
import { Text } from '../../core/Text'
import { Button } from '../../core/Button'
import { CheckmarkFilled16, Network_416 } from '../../icons/carbon'
import { Tooltip } from '../../core/Tooltip'

type Props = {
  name: string
  isSynced: boolean
  nodeBlockHeight: number
  peerCount: number
  connectPeer: () => void
}

export function Header({
  name,
  peerCount,
  isSynced,
  nodeBlockHeight,
  connectPeer,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Text font="mono" weight="bold" size="20">
        {name}
      </Text>
      <div className="flex items-center">
        {peerCount ? (
          <Button
            className="relative left-2 only:left-0"
            variant="ghost"
            onClick={connectPeer}
            tip={`${peerCount} connected peers`}
          >
            <Text color="subtle">{peerCount.toLocaleString()}</Text>
            <Network_416 />
          </Button>
        ) : null}
        {nodeBlockHeight && isSynced ? (
          <Tooltip content="Blockchain is synced">
            <div className="relative left-2">
              <Button variant="ghost" state="waiting">
                <Text color="subtle">{nodeBlockHeight.toLocaleString()}</Text>
                <Text color="green">
                  <CheckmarkFilled16 />
                </Text>
              </Button>
            </div>
          </Tooltip>
        ) : null}
      </div>
    </div>
  )
}
