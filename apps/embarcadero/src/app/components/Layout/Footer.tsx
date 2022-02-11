import {
  Box,
  Button,
  Flex,
  keyframes,
  Panel,
  Separator,
  Status,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { useConsensus } from '../../hooks/useConsensus'
import { useSiaStats } from '../../hooks/useSiaStats'
import { useWallet } from '../../hooks/useWallet'

const pulse = keyframes({
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '30%': {
    transform: 'scale(2)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(2)',
    opacity: 0,
  },
})

export function Footer() {
  const { data: siaStats, error: errorS } = useSiaStats()
  const { data: consensus, error: errorC } = useConsensus()
  const { data: wallet, error: errorW } = useWallet()

  const haveData = consensus && siaStats && wallet

  const isIndexing = wallet?.height !== consensus?.height

  const isSynced = haveData && consensus.height >= siaStats.block_height

  const color = errorC ? 'red' : isSynced ? 'green' : 'yellow'

  return (
    <Panel
      css={{
        position: 'fixed',
        bottom: '$3',
        right: '$5',
        padding: '$2 $3',
      }}
    >
      <Flex gap="2" align="center">
        <Tooltip content="Current transaction fee">
          <Text size="1">
            {((Number(wallet?.dustthreshold) / Math.pow(10, 24)) * 1024) /
              0.001}{' '}
            mS / KB
          </Text>
        </Tooltip>
        <Separator orientation="vertical" />
        <Tooltip
          content={
            isSynced
              ? 'Block height'
              : `Block height: ${consensus?.height} / ${siaStats?.block_height}`
          }
        >
          <Text size="1">{consensus?.height}</Text>
        </Tooltip>
        <Separator orientation="vertical" />
        <Tooltip content={isSynced ? 'Synced' : 'Syncing'}>
          <Box css={{ position: 'relative', top: '-0.5px', marginLeft: '$1' }}>
            <Status variant={color} />
            <Status
              variant={color}
              css={{
                animation: `${pulse} 5s infinite`,
                position: 'absolute',
                top: 0,
              }}
            />
          </Box>
        </Tooltip>
      </Flex>
    </Panel>
  )
}
