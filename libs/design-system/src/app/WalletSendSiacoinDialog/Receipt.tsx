import { Text } from '../../core/Text'
import { ValueSc } from '../../components/ValueSc'
import BigNumber from 'bignumber.js'
import { ValueCopyable } from '../../components/ValueCopyable'

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
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Address
        </Text>
        <ValueCopyable value={address} type="address" />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Amount
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            size="14"
            value={siacoin}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Network fee
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc size="14" value={fee} variant="value" dynamicUnits={false} />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text color="verySubtle" noWrap>
          Total
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            size="14"
            value={includeFee ? siacoin : siacoin.plus(fee)}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      {transactionId && (
        <div className="flex gap-6 items-center justify-between">
          <Text color="verySubtle" noWrap>
            Transaction ID
          </Text>
          <ValueCopyable value={transactionId} type="transaction" />
        </div>
      )}
    </div>
  )
}
