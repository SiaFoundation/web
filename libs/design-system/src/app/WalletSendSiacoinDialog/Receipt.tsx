import { Text } from '../../core/Text'
import { ValueSc } from '../../components/ValueSc'
import BigNumber from 'bignumber.js'
import { ValueCopyable } from '../../components/ValueCopyable'
import { SendSiacoinParams } from './types'

type Props = SendSiacoinParams & {
  fee: BigNumber
  transactionId?: string
}

export function WalletSendSiacoinReceipt({
  address,
  hastings,
  fee,
  transactionId,
}: Props) {
  const total = hastings.plus(fee)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Address
        </Text>
        <ValueCopyable testId="address" value={address} type="address" />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Amount
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            testId="amount"
            size="14"
            value={hastings}
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
          <ValueSc
            testId="networkFee"
            size="14"
            value={fee}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text color="verySubtle" noWrap>
          Total
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            testId="total"
            size="14"
            value={total}
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
          <ValueCopyable
            testId="transactionId"
            value={transactionId}
            type="transaction"
          />
        </div>
      )}
    </div>
  )
}
