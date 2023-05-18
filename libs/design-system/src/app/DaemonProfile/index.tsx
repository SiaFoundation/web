import { HoverCard } from '../../core/HoverCard'
import { Logo } from '../../core/Logo'
import { Separator } from '../../core/Separator'
import { Text } from '../../core/Text'
import { Header } from './Header'
import { SyncStatus } from './SyncStatus'

type Props = {
  name: string
  peerCount: number
  connectPeer: () => void
  isSynced: boolean
  percent: number
  nodeBlockHeight: number
  estimatedBlockHeight: number
  firstTimeSyncing: boolean
  moreThan100BlocksToSync: boolean
  children?: React.ReactNode
}

export function DaemonProfile({
  name,
  peerCount,
  connectPeer,
  isSynced,
  percent,
  nodeBlockHeight,
  estimatedBlockHeight,
  firstTimeSyncing,
  moreThan100BlocksToSync,
  children,
}: Props) {
  return (
    <HoverCard
      rootProps={{
        openDelay: 100,
      }}
      contentProps={{
        side: 'right',
        align: 'start',
        sideOffset: 5,
        className: '!max-w-none',
      }}
      trigger={
        <div className="relative hover:scale-105 transition-transform">
          {isSynced || percent === 100 || percent === 0 ? null : (
            <div className="absolute -bottom-2.5 w-full flex justify-center">
              <Text
                className="bg-amber-500 py-px px-1 rounded-sm scale-75"
                size="10"
              >
                {percent}%
              </Text>
            </div>
          )}
          <Logo size={30} />
        </div>
      }
    >
      <div className="flex flex-col gap-2 px-1 pt-1 pb-2 w-[300px]">
        <Header
          nodeBlockHeight={nodeBlockHeight}
          isSynced={isSynced}
          name={name}
          peerCount={peerCount}
          connectPeer={connectPeer}
        />
        {isSynced ? (
          <Separator className="w-full mb-0.5" />
        ) : (
          <SyncStatus
            percent={percent}
            nodeBlockHeight={nodeBlockHeight}
            networkBlockHeight={estimatedBlockHeight}
            moreThan100BlocksToSync={moreThan100BlocksToSync}
          />
        )}
        {firstTimeSyncing && (
          <>
            <Text color="contrast" size="14">
              Welcome to Sia! The blockchain is syncing to the current network
              height. Depending on your system this process may take a while.
            </Text>
            <Separator className="w-full mb-1" />
          </>
        )}
        {children}
      </div>
    </HoverCard>
  )
}
