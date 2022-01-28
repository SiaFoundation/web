import {
  Box,
  Flex,
  keyframes,
  Status,
  Text,
} from '@siafoundation/design-system'
import { useConsensus } from '../useConsensus'
import { useSiaStats } from '../useSiaStats'
import { useWallet } from '../useWallet'

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

  const isIndexing = wallet?.height !== consensus?.height

  const isSynced = !errorC && consensus?.height === siaStats?.block_height

  const color = errorC ? 'red' : isSynced ? 'green' : 'yellow'

  return (
    <Flex
      gap="2"
      align="center"
      css={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '$5',
      }}
    >
      <Box css={{ flex: 1 }} />
      <Text>
        {((Number(wallet?.dustthreshold) / Math.pow(10, 24)) * 1024) / 0.001} mS
        / KB
      </Text>
      <Text>{'•'}</Text>
      <Text>{consensus?.height}</Text>
      <Box css={{ position: 'relative' }}>
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
    </Flex>
  )
}
