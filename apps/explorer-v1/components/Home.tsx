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
import { useMemo } from 'react'
import { SWRResponse } from 'swr'
import { BlockList } from '../components/BlockList'
import { EntityList } from '../components/EntityList'
import { HomeSkeleton } from '../components/HomeSkeleton'
import { BlockEntity } from '../config/types'
import { useEntity } from '../hooks/useEntity'
import { useLanding } from '../hooks/useLanding'
import { useStatus } from '../hooks/useStatus'

export function Home() {
  const status = useStatus()
  const landing = useLanding()
  const height = status.data?.lastblock
  const block = useEntity(
    height ? String(height) : null
  ) as SWRResponse<BlockEntity>

  const values = useMemo(() => {
    if (!landing.data || !status.data || !block.data) {
      return []
    }
    const list = [
      {
        label: 'Blockchain height',
        value: (
          <>
            <Text
              size={{
                '@initial': '24',
                '@bp1': '32',
              }}
              font="mono"
              weight="semibold"
            >
              {humanNumber(status.data?.consensusblock)}
            </Text>
            {status.data &&
              status.data.consensusblock !== status.data.lastblock && (
                <Text size="16" font="mono" color="subtle">
                  {humanNumber(status.data?.lastblock)} synced
                </Text>
              )}
          </>
        ),
      },
      {
        label: 'Difficulty',
        value: humanDifficulty(block.data?.data[1].Difficulty),
      },
      {
        label: 'Hash rate',
        value: humanHashrate(block.data?.data[1].Hashrate),
      },
      {
        label: 'Blockchain transactions',
        value: humanNumber(status.data?.totalTx),
      },
      {
        label: 'Unconfirmed transactions',
        value: humanNumber(status.data?.mempool),
      },
      {
        label: 'Market cap',
        value: humanNumber(
          status.data?.consensusblock
            ? status.data.coinsupply / 1_000_000_000
            : 0,
          {
            units: 'B SC',
            fixed: 2,
          }
        ),
      },
    ]
    return list
  }, [status, landing, block])

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
            <Grid
              columns={{
                '@initial': 2,
                '@bp2': 3,
              }}
              gap={{
                '@initial': 3,
                '@bp2': 6,
              }}
              gapY="6"
            >
              {values.map(({ label, value }) => (
                <Flex
                  key={label}
                  direction="column"
                  gap="3"
                  align="start"
                  css={{ overflow: 'hidden' }}
                >
                  <Text
                    color="subtle"
                    size={{
                      '@initial': 12,
                      '@bp1': 14,
                    }}
                  >
                    {label}
                  </Text>
                  <Text
                    font="mono"
                    weight="semibold"
                    size={{
                      '@initial': 24,
                      '@bp1': 32,
                    }}
                    ellipsis
                  >
                    {value}
                  </Text>
                </Flex>
              ))}
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
