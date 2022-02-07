import { Box, Button, Flex, Text } from '@siafoundation/design-system'
import { useConsensus } from '../useConsensus'
import { useSiaStats } from '../useSiaStats'
import { useWallet } from '../useWallet'
import { UserContextMenu } from './UserContextMenu'

export function Wallet() {
  const { data: siaStats, error: errorS } = useSiaStats()
  const { data: consensus, error: errorC } = useConsensus()
  const { data: wallet, error: errorW } = useWallet()

  const haveData = consensus && wallet && siaStats
  const isIndexing = haveData && wallet?.height >= consensus?.height

  const isSynced = !errorC && consensus?.height === siaStats?.block_height

  const color = errorC ? 'red' : isSynced ? 'green' : 'yellow'

  return (
    <Flex gap="2" align="center">
      <Box>
        <Text>{isIndexing ? 'indexing..' : 'up to date'}</Text>
        <Text>{wallet?.unlocked ? 'Unlocked' : 'Locked'}</Text>
        <Button size="2">
          {(
            Number(wallet?.confirmedsiacoinbalance || 0) / Math.pow(10, 24)
          ).toLocaleString()}{' '}
          SC / {Number(wallet?.siafundbalance || 0).toLocaleString()} SF
        </Button>
      </Box>
      {/* <Text>${siaStats?.coin_price_USD?.toLocaleString()} / SC</Text> */}
      <UserContextMenu size="2" />
    </Flex>
  )
}
