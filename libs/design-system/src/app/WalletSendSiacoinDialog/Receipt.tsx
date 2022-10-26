import { Flex } from '../../core/Flex'
import { Text } from '../../core/Text'
import { Tooltip } from '../../core/Tooltip'
import { ValueSc } from '../../components/ValueSc'
import BigNumber from 'bignumber.js'

type Props = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
  transactionId?: string
}

export function WalletSendSiacoinReceipt({
  address,
  siacoin,
  fee,
  includeFee,
  transactionId,
}: Props) {
  return (
    <Flex direction="column" gap="1">
      <Flex gap="3" justify="between" align="center">
        <Text color="verySubtle">Address</Text>
        <Tooltip content={address} css={{ maxWidth: 'inherit' }}>
          <Text font="mono" ellipsis>
            {address}
          </Text>
        </Tooltip>
      </Flex>
      <Flex gap="1" justify="between" align="center">
        <Text color="verySubtle">Amount</Text>
        <Flex css={{ position: 'relative', top: '-0.5px' }}>
          <ValueSc
            size="14"
            value={siacoin}
            variant="value"
            dynamicUnits={false}
          />
        </Flex>
      </Flex>
      <Flex gap="1" justify="between" align="center">
        <Text color="verySubtle">Network fee</Text>
        <Flex css={{ position: 'relative', top: '-0.5px' }}>
          <ValueSc size="14" value={fee} variant="value" dynamicUnits={false} />
        </Flex>
      </Flex>
      <Flex justify="between" gap="1" align="center">
        <Text color="verySubtle">Total</Text>
        <Flex css={{ position: 'relative', top: '-0.5px' }}>
          <ValueSc
            size="14"
            value={includeFee ? siacoin : siacoin.plus(fee)}
            variant="value"
            dynamicUnits={false}
          />
        </Flex>
      </Flex>
      {transactionId && (
        <Flex gap="3" justify="between" align="center">
          <Text color="verySubtle">Transaction ID</Text>
          <Tooltip content={transactionId} css={{ maxWidth: 'inherit' }}>
            <Text font="mono" ellipsis>
              {transactionId}
            </Text>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  )
}
