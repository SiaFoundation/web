import {
  Flex,
  DialogContent,
  getTitleId,
  Codeblock,
  Box,
  ValueSc,
  Text,
} from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-renterd'
import { humanDate } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useDialog } from '../contexts/dialog'

export function TransactionDetailsDialog() {
  const { id } = useDialog()

  // TODO: add transaction endpoint
  const transactions = useWalletTransactions()
  const transaction = transactions.data?.find((t) => String(t.ID) === id)

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
            <ValueSc value={new BigNumber(transaction?.Inflow)} />
          </Flex>
          <Flex gap="1">
            <Text>Outflow</Text>
            <ValueSc value={new BigNumber(-transaction?.Outflow)} />
          </Flex>
          <Flex gap="1">
            <Text>Miner fee</Text>
            <ValueSc value={new BigNumber(transaction?.Raw.MinerFee)} />
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
