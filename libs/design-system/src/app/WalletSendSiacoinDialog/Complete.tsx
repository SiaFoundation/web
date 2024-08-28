import BigNumber from 'bignumber.js'
import { Text } from '../../core/Text'
import { CheckmarkFilled32 } from '@siafoundation/react-icons'
import { WalletSendSiacoinReceipt } from './Receipt'
import { SendSiacoinParams } from './types'

type Props = {
  data: SendSiacoinParams
  fee: BigNumber
  transactionId?: string
}

export function WalletSendSiacoinComplete({
  data: { address, hastings },
  fee,
  transactionId,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <WalletSendSiacoinReceipt
        address={address}
        hastings={hastings}
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
