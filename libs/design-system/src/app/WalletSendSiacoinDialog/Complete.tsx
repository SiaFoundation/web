import BigNumber from 'bignumber.js'
import { Text } from '../../core/Text'
import { CheckmarkFilled32 } from '../../icons/carbon'
import { WalletSendSiacoinReceipt } from './Receipt'

type Props = {
  data: {
    address: string
    siacoin: BigNumber
  }
  fee: BigNumber
  transactionId?: string
}

export function WalletSendSiacoinComplete({
  data: { address, siacoin },
  fee,
  transactionId,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <WalletSendSiacoinReceipt
        address={address}
        siacoin={siacoin}
        fee={fee}
        transactionId={transactionId}
      />
      <div className="flex flex-col items-center justify-center gap-2 my-4">
        <Text>
          <CheckmarkFilled32 />
        </Text>
        <Text>Transaction successfully broadcasted.</Text>
      </div>
    </div>
  )
}
