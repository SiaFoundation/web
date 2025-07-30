import { Button } from '../core/Button'
import { Heading } from '../core/Heading'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { Skeleton } from '../core/Skeleton'
import { cx } from 'class-variance-authority'

type Props = {
  peers?: string[]
  isLoading?: boolean
  connectPeer: () => void
}

export function PeerList({ peers, isLoading, connectPeer }: Props) {
  const showSkeleton = isLoading && (!peers || peers.length === 0)
  const showPeers = peers && peers.length > 0

  return (
    <Panel>
      <div className="flex flex-col rounded overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-graydark-300">
          <Heading size="20" font="mono" ellipsis>
            Peers
          </Heading>
          <div className="flex-1" />
          <Button onClick={connectPeer}>Connect</Button>
        </div>
        <div className="flex flex-col rounded overflow-hidden">
          {showSkeleton &&
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={cx(
                  'flex items-center gap-4 p-4',
                  itemBorderStyles(),
                )}
              >
                <Skeleton className="w-[60px] h-[20px]" />
              </div>
            ))}
          {showPeers &&
            peers.map((ip, i) => (
              <div
                key={ip}
                className={cx(
                  'flex items-center gap-4 p-4',
                  itemBorderStyles(),
                )}
              >
                <Text size="16" weight="medium" ellipsis>
                  {ip}
                </Text>
              </div>
            ))}
          {!showSkeleton && (!peers || peers.length === 0) && (
            <div
              className={cx(
                'flex items-center justify-center h-[84px]',
                itemBorderStyles(),
              )}
            >
              <Text size="18" color="subtle">
                No peers
              </Text>
            </div>
          )}
        </div>
      </div>
    </Panel>
  )
}

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none',
  )
}
