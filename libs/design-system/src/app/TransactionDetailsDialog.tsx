import { Flex, DialogContent, Codeblock, Box, Text } from '../core'
import { ValueSc } from '../components'
import { getTitleId } from '../lib/utils'
import { useWalletTransactions } from '@siafoundation/react-core'
import { humanDate } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  id: string
}

export function TransactionDetailsDialog({ id }: Props) {
  // TODO: add transaction endpoint
  const transactions = useWalletTransactions()
  const transaction = transactions.data?.find((t) => t.ID === id)

  if (transactions.data && !transaction) {
    return (
      <DialogContent
        title={getTitleId('Transaction', id, 6)}
        css={{
          maxWidth: '800px',
          overflow: 'hidden',
        }}
      >
        <Text>Could not find transaction in wallet</Text>
      </DialogContent>
    )
  }

  return (
    <DialogContent
      title={getTitleId('Transaction', id, 16)}
      css={{
        maxWidth: '800px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <Flex gap="2">
          <Flex gap="1">
            <Text>Inflow</Text>
            <ValueSc value={new BigNumber(transaction?.Inflow || 0)} />
          </Flex>
          <Flex gap="1">
            <Text>Outflow</Text>
            <ValueSc
              value={new BigNumber(transaction?.Outflow || 0).negated()}
            />
          </Flex>
          <Flex gap="1">
            <Text>Miner fee</Text>
            <ValueSc
              value={
                new BigNumber(
                  transaction?.Raw.minerfees?.reduce(
                    (acc, val) => acc.plus(val),
                    new BigNumber(0)
                  ) || 0
                )
              }
            />
          </Flex>
          <Box css={{ flex: 1 }} />
          <Flex gap="1">
            <Text>Timestamp</Text>
            <Text>
              {humanDate(transaction?.Timestamp || 0, { time: true })}
            </Text>
          </Flex>
        </Flex>
        <Box>
          <Codeblock>{JSON.stringify(transaction?.Raw, null, 2)}</Codeblock>
        </Box>
      </Flex>
    </DialogContent>
  )
}
