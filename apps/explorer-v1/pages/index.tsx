import {
  AnimatedPanel,
  Container,
  Flex,
  Grid,
  Text,
} from '@siafoundation/design-system'
import {
  humanDifficulty,
  humanHashrate,
  humanNumber,
} from '@siafoundation/sia-js'
import { SWRResponse } from 'swr'
import { BlockList } from '../components/BlockList'
import { EntityList } from '../components/EntityList'
import { HomeSkeleton } from '../components/HomeSkeleton'
import { BlockEntity } from '../config/types'
import { useEntity } from '../hooks/useEntity'
import { useLanding } from '../hooks/useLanding'
import { useStatus } from '../hooks/useStatus'

export function Index() {
  const status = useStatus()
  const landing = useLanding()
  const height = status.data?.lastblock
  const block = useEntity(
    height ? String(height) : null
  ) as SWRResponse<BlockEntity>

  if (!landing.data || !status.data || !block.data) {
    return <HomeSkeleton />
  }

  return (
    <>
      <Container>
        <Flex direction="column" gap="8">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Grid columns="3" gap="6">
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Blockchain height
                </Text>
                <Text size="32" font="mono">
                  {humanNumber(status.data?.consensusblock)}
                </Text>
                {status.data &&
                  status.data.consensusblock !== status.data.lastblock && (
                    <Text size="16" font="mono" color="subtle">
                      {humanNumber(status.data?.lastblock)} synced
                    </Text>
                  )}
              </Flex>
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Difficulty
                </Text>
                <Text size="32" font="mono">
                  {humanDifficulty(block.data?.data[1].Difficulty)}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Hash rate
                </Text>
                <Text size="32" font="mono">
                  {humanHashrate(block.data?.data[1].Hashrate)}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Blockchain transactions
                </Text>
                <Text size="32" font="mono">
                  {humanNumber(status.data?.totalTx)}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Unconfirmed transactions
                </Text>
                <Text size="32" font="mono">
                  {humanNumber(status.data?.mempool)}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text color="subtle" font="mono">
                  Market cap
                </Text>
                <Text size="32" font="mono">
                  {humanNumber(
                    status.data?.consensusblock
                      ? status.data.coinsupply / 1_000_000_000
                      : 0,
                    {
                      units: 'B SC',
                      fixed: 2,
                    }
                  )}
                </Text>
              </Flex>
            </Grid>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container size="4">
        <Grid
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 4,
          }}
          gap="3"
        >
          <BlockList
            title="Latest blocks"
            blocks={landing.data?.last10Blocks?.map((block) => ({
              height: block.Height,
              timestamp: block.Timestamp,
              miningPool: block.MiningPool,
            }))}
          />
          <EntityList
            title="Latest siacoin transactions"
            entities={landing.data?.last10ScTx?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              type: 'ScTx',
            }))}
          />
          <EntityList
            title="Latest contract transactions"
            entities={landing.data?.last10Contracts?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              type: tx.TxType,
            }))}
          />
          <EntityList
            title="Latest other transactions"
            entities={landing.data?.last10Others?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              type: tx.TxType,
            }))}
          />
        </Grid>
      </Container>
    </>
  )
}

export default Index
