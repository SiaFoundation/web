import {
  Box,
  Button,
  Flex,
  Panel,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useConsensus } from '../../hooks/useConsensus'
import { useSiaStats } from '../../hooks/useSiaStats'
import { useWallet } from '../../hooks/useWallet'
import { UserDropdownMenu } from './UserDropdownMenu'

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
      {/* <Text>{isIndexing ? 'indexing..' : 'up to date'}</Text>
        <Text>{wallet?.unlocked ? 'Unlocked' : 'Locked'}</Text> */}
      <Panel>
        <Flex gap="2" align="center" css={{ height: '$6', padding: '0 $2' }}>
          <Text css={{ fontWeight: '600' }}>
            {(
              Number(wallet?.confirmedsiacoinbalance || 0) / Math.pow(10, 24)
            ).toLocaleString()}{' '}
            SC
          </Text>
          <Separator orientation="vertical" />
          <Text css={{ fontWeight: '600' }}>
            {Number(wallet?.siafundbalance || 0).toLocaleString()} SF
          </Text>
        </Flex>
      </Panel>
      {/* <Text>${siaStats?.coin_price_USD?.toLocaleString()} / SC</Text> */}
      <UserDropdownMenu size="2" />
    </Flex>
  )
}
