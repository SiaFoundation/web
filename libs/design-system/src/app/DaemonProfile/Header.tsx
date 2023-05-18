/* eslint-disable react/jsx-pascal-case */
import { Text } from '../../core/Text'
import { Button } from '../../core/Button'
import { Network_416 } from '../../icons/carbon'
import { Tooltip } from '../../core/Tooltip'

type Props = {
  name: string
  peerCount: number
  connectPeer: () => void
}

export function Header({ name, peerCount, connectPeer }: Props) {
  return (
    <div className="flex justify-between">
      <Text font="mono" weight="bold" size="20">
        {name}
      </Text>
      {peerCount ? (
        <Tooltip content={`${peerCount} connected peers`}>
          <Button variant="ghost" onClick={connectPeer}>
            <Text color="subtle">{peerCount}</Text>
            <Network_416 />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  )
}
