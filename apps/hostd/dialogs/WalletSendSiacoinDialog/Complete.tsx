import { Flex, Text, CheckmarkFilled32 } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'

type Props = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
  transactionId: string
}

export function WalletSendSiacoinComplete({
  address,
  siacoin,
  fee,
  includeFee,
  transactionId,
}: Props) {
  return (
    <Flex direction="column" gap="2">
      <WalletSendSiacoinReceipt
        address={address}
        siacoin={siacoin}
        fee={fee}
        includeFee={includeFee}
        transactionId={transactionId}
      />
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="1"
        css={{ margin: '$2 0' }}
      >
        <CheckmarkFilled32 />
        <Text>Transaction successfully broadcasted.</Text>
      </Flex>
    </Flex>
  )
}
