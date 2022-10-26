import BigNumber from 'bignumber.js'
import { Flex } from '../../core/Flex'
import { Text } from '../../core/Text'
import { CheckmarkFilled32 } from '../../icons/carbon'
import { WalletSendSiacoinReceipt } from './Receipt'

type Props = {
  formData: {
    address: string
    siacoin: BigNumber
    includeFee: boolean
  }
  fee: BigNumber
  transactionId: string
}

export function WalletSendSiacoinComplete({
  formData: { address, siacoin, includeFee },
  fee,
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
